import { Modal, useMantineTheme } from "@mantine/core";
import axios from "axios";

export default function DeleteMessageModal({
  modalOpened,
  setModalOpened,
  setMessages,
  messageId,
  messages,
  socket,
  currentChat,
  currentUserId,
}) {
  const theme = useMantineTheme();

  async function handleDelete() {
    const receiverId = currentChat?.members?.find((id) => id !== currentUserId);
    socket.current.emit("delete-message", {
      messages,
      receiverId,
      messageId,
      currentUserId,
    });
    try {
      await axios.delete(`/api/messages/${messageId}`);
    } catch (error) {
      console.log(error);
    }
    setMessages(messages.filter(msg => msg._id !== messageId))
    setModalOpened(false);
  }

  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    >
      <div className="container">
        <div>
          <span className="DeleteTitle" style={{verticalAlign: "middle"}}> 
          <img 
              src="https://ga-chatterbox.s3.ca-central-1.amazonaws.com/2234003.png"
              style={{margin:"auto", height:"20px", width:"20px"}} /> &nbsp;
              Delete Message</span>
        </div>
      
      <p>Are you sure you want to delete this message?</p>
      <button onClick={() => handleDelete(messageId)}>Delete</button>
      </div>
     
    </Modal>
  );
}
