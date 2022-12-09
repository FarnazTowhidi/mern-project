import React from "react";
import { Modal, useMantineTheme } from "@mantine/core";

export default function ChatMemberModal({
  modalOpened,
  setModalOpened,
  receiverData,
}) {
  const theme = useMantineTheme();

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
      <div className="chatmember-modal">
        <img className="profileImg" src={receiverData?.profilePicture} />
        <br />
        {receiverData?.firstname}
        {receiverData?.lastname}
        <br />
        {receiverData?.username}
        <br />
        {receiverData?.email}
        <br />
        {receiverData?.about}
        <br />
      </div>
    </Modal>
  );
}
