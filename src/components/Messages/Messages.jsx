import React, { useEffect, useRef, useState } from "react";
import DeleteMessageModal from "../DeleteMessageModal/DeleteMessageModal";
import "./Messages.css";
import Linkify from "react-linkify";
import { Button } from "@mui/material";
import ChatBox from "../ChatBox/ChatBox";
import moment from "moment";
import axios from "axios";

export default function Messages({
  messages,
  setMessages,
  socket,
  currentChat,
  currentUserId,
  user,
  receiverId,
}) {
  const scroll = useRef();
  const [modalOpened, setModalOpened] = useState(false);
  const [messageId, setMessageId] = useState(null);
  const [receiverData, setReceiverData] = useState({});

  let newDate = new Date();
  let sentDate = `${newDate.toLocaleTimeString()}`;
  // let moment = moment(newDate).format()

  // scroll to last message
  useEffect(() => {
    scroll.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);

  // get receiver data
  useEffect(() => {
    async function getReceiverData() {
      try {
        // if (receiverId) {
        let payload = await axios.get(`api/users/${receiverId}`);
        console.log(payload);
        if (payload.status === 200) {
          setReceiverData(payload.data);
        }
        // if (data) {
        // }
      } catch (error) {
        console.log(error);
      }
      // }
    }
    getReceiverData();
  }, []);

  return (
    <>
      <div className="message-data">
        <div>
          {messages.map((message, idx) => (
            <p
              className={
                message.senderId === currentUserId ? "message own" : "message"
              }
              ref={scroll}
              key={idx}
              onClick={() => {
                setMessageId(message._id);
                setModalOpened(true);
              }}
            >
              <span className="sender-text">
                {user._id === message.senderId
                  ? user?.firstname
                  : receiverData?.firstname}
              </span>
              <br />
              <Linkify>{message.text}</Linkify>
              <br />
              {moment(message.createdAt).format("LLL").slice(0)}
            </p>
          ))}
        </div>
          <DeleteMessageModal
            modalOpened={modalOpened}
            setModalOpened={setModalOpened}
            setMessages={setMessages}
            messageId={messageId}
            messages={messages}
            socket={socket}
            currentChat={currentChat}
            currentUserId={currentUserId}
          />
      </div>
    </>
  );
}
