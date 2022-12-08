import React, { useEffect, useState } from "react";
import Messages from "../Messages/Messages";
import InputEmoji from "react-input-emoji";
import axios from "axios";
import { Button, IconButton } from "@mui/material";
import { Stack } from "@mui/system";
import SendIcon from "@mui/icons-material/Send";
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
  const [receiverData, setReceiverData] = useState(null)



 

  // get receiver data
  useEffect(() => {
    const userId = currentChat?.members?.find((id) => id !== currentUserId);
   
  }, [currentChat, currentUserId]);


  // get receiver profile
  useEffect(() => { 
    const getreceiver = async() => {
      console.log ("Helloooo")
      console.log (currentChat?.members)
      try {
        const userId = currentChat?.members?.find((id) => id !== currentUserId);
        console.log ("User ID")
        console.log(userId);
        let payload = await axios.get(`api/users/${userId}`)
        if (!payload.status === 200) throw new Error("No response received");
        console.log (payload.data)
        await setReceiverData(payload.data);
        console.log (receiverData)
      }
      catch (error) {
      console.log(error);
      }
    }
    getreceiver();
  },[])



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
console.log(messages)
  return (
    <>
      {/* chatmembermodal here */}
      {currentChat ? (
        <div>
          <hr />
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
          />
          <Messages
            messages={messages}
            setMessages={setMessages}
            socket={socket}
            currentChat={currentChat}
            currentUserId={currentUserId}
            user={user}
          />

          <Stack
            direction="row"
            alignItems="center"
            spacing={3}
            justifyContent="center"
            sx={{ width: "50vw", justifyItems: "center", margin: "auto" }}
          >
            <InputEmoji
              color="secondary"
              value={newMessage}
              onChange={handleChange}
            />
            <IconButton>
              <SendIcon color="secondary" onClick={handleSend}>
                Send
              </SendIcon>
            </IconButton>
          </Stack>
        </div>
      ) : (
        <span>Click a Chat to Start Conversation</span>
      )}
    </>
  );
}
