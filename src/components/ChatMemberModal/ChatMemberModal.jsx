import React from "react";
import { Modal, useMantineTheme } from "@mantine/core";
import "./ChatMemberModal.css";

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
        <div className="chatmember-img">
          <img
            src={
              receiverData?.profilePicture === ""
                ? "./logo192.png"
                : receiverData?.profilePicture
            }
          />
        </div>
        <div className="chatmember">
          <h2>{`${receiverData?.firstname} ${receiverData?.lastname}`}</h2>
        </div>
        <div className="chatmember">
          <h3>@{receiverData?.username}</h3>
        </div>
        <div className="chatmember">{receiverData?.about}</div>
      </div>
    </Modal>
  );
}
