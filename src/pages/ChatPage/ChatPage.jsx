import React from "react";
import ChatList from "../../components/ChatList/ChatList";

export default function ChatPage({ user, setUser }) {
  return (
    <>
      <div>
        <ChatList user={user} setUser={setUser} />
      </div>
    </>
  );
}
