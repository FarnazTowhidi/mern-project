import React, { useEffect, useState } from "react";
import Messages from "../Messages/Messages";
import InputEmoji from "react-input-emoji";
import "./ChatBox.css";
import axios from "axios";
import { Stack } from "@mui/system";
import ChatMemberModal from "../ChatMemberModal/ChatMemberModal";
import SearchIcon from "@mui/icons-material/Search";

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
  const [receiverData, setReceiverData] = useState([]);
  const receiverId = currentChat?.members?.find((id) => id !== currentUserId);

  useEffect(() => {
    async function getReceiverData() {
      try {
        const rId = currentChat?.members?.find((id) => id !== currentUserId);
        const payload = await axios.get(`api/users/${rId}`);
        if (payload.status === 200) {
          setReceiverData(payload.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getReceiverData();
  }, [currentChat]);

  // get receiver data
  useEffect(() => {
    setUserData(receiverId);
  }, [currentChat, currentUserId]);

  //handle functions
  function handleChange(inputText) {
    setNewMessage(inputText);
  }
  async function handleSend(e) {
    // e.preventDefault();
    const messageInfo = {
      chatId: currentChat._id,
      senderId: currentUserId,
      text: newMessage,
    };

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
      {currentChat ? (
        <div className="chat-container">
          <div
            
            onClick={() => {
              setModalOpened(true);
            }}
          >

            <div className="section-heading chatmember-container">
            <img
              className="profileImg chatmember-image"
              src={
                receiverData?.profilePicture === ""
                  ? "./logo192.png"
                  : receiverData?.profilePicture
              }
            />
              <h2 className="chatmember-name">
                {`${receiverData?.firstname} ${receiverData?.lastname}`} <br/>
                @{`${receiverData?.username}`}
              </h2>


              <SearchIcon
                fontSizeLarge
                className="section-heading searchIcon"
              />
            </div>
          </div>

          <ChatMemberModal
            modalOpened={modalOpened}
            setModalOpened={setModalOpened}
            receiverData={receiverData}
          />
          <div className="messages-container">
            <Messages
              messages={messages}
              setMessages={setMessages}
              socket={socket}
              currentChat={currentChat}
              currentUserId={currentUserId}
              user={user}
              receiverId={userData}
              receiverData={receiverData}
            />
          </div>
          <Stack
            direction="row"
            alignItems="center"
            spacing={3}
            justifyContent="center"
          >
            <InputEmoji
              color="secondary"
              value={newMessage}
              onChange={handleChange}
              cleanOnEnter
              onEnter={handleSend}
              placeholder="Press Enter to Send..."
            />
            {/* </form> */}
          </Stack>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
