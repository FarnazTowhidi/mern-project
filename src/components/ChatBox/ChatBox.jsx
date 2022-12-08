import React, { useEffect, useState } from "react";
import Messages from "../Messages/Messages";
import InputEmoji from "react-input-emoji";
import axios from "axios";
import { Button } from "@mui/material";
import { Container } from "react-bootstrap";
import ChatMemberModal from "../ChatMemberModal/ChatMemberModal";
export default function ChatBox({
  currentChat,
  currentUserId,
  setMessages,
  setNewMessage,
  messages,
  newMessage,
  socket,
  user,
}) {
  const [userData, setUserData] = useState(null);
  const [modalOpened, setModalOpened] = useState(false);
  const [receiverData, setreceiverData] = useState(null)

  // get receiver data
  useEffect(() => {
    const userId = currentChat?.members?.find((id) => id !== currentUserId);
    setUserData(userId);
  }, [currentChat, currentUserId]);

  // get receiver profile
  useEffect(() => { 
    const getreceiver = async() => {
      try {
        const userId = currentChat?.members?.find((id) => id !== currentUserId);
        let payload = await axios.get (`api/users/${userId}`)
        if (!payload.status === 200) throw new Error("No response received");
        setreceiverData(payload.data);
        console.log (payload.data)
      }
      catch (error) {
      console.log(error);
      }
    }
    getreceiver();
  },[currentChat])



  //handle functions
  function handleChange(inputText) {
    setNewMessage(inputText);
  }
  async function handleSend(e) {
    e.preventDefault();
    const messageInfo = {
      chatId: currentChat._id,
      senderId: currentUserId,
      text: newMessage,
    };
    const receiverId = currentChat?.members?.find((id) => id !== currentUserId);
    try {
      let newMessage = await axios.post(`api/messages`, messageInfo);
      socket.current.emit("send-message", {
        messageInfo: newMessage.data,
        receiverId,
      });
      setMessages([...messages, newMessage.data]);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {/* chatmembermodal here */}
      {currentChat ? (
        <>
          <div
            style={{
              border: "1px solid black",
              display: "flex",
              flexDirection: "row",
            }}
            onClick={() => {
              setModalOpened(true);
            }}
          >
            <div style={{ border: "1px solid black" }}>Profile Pic</div>
            Friend: {userData}
          </div>
          <ChatMemberModal
            modalOpened={modalOpened}
            setModalOpened={setModalOpened}
            receiverData={receiverData}
          />
          <div>
            <hr />
            <Messages
              messages={messages}
              setMessages={setMessages}
              socket={socket}
              currentChat={currentChat}
              currentUserId={currentUserId}
              user={user}
              receiverId={userData}
            />
            <InputEmoji value={newMessage} onChange={handleChange} />
            <Button color="primary" onClick={handleSend}>
              Send
            </Button>
          </div>
        </>
      ) : (
        <span>Click a Chat to Start Conversation</span>
      )}
    </>
  );
}
