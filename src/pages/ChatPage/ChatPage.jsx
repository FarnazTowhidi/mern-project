import React from "react";
import ChatList from "../../components/ChatList/ChatList";

export default function ChatPage({ user }) {
  return (
    <>
      <div>
        <ChatList user={user} />
      </div>
    </>
  );
}
