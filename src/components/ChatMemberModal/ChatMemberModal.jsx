import React from "react";
import { Modal, useMantineTheme } from "@mantine/core";

export default function ChatMemberModal({ modalOpened, setModalOpened, receiverData }) {
  const theme = useMantineTheme();
  console.log ({receiverData})
  
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
    ></Modal>
  );
}
