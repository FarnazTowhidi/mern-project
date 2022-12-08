import React, { useEffect, useState } from "react";
import { Input, Grid, TextField } from "@mui/material";
import "./Conversation.css";
import axios from "axios";
import { Avatar, Badge } from "@mui/material";
import Stack from "@mui/material/Stack";
// testing
import { styled } from "@mui/material/styles";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));
// testing

export default function Conversation({ currentUserId, chat, online, user }) {
  const [userData, setUserData] = useState(null);
  const [unreadMessages, setUnreadMessages] = useState(null);

  //find all users but the current user
  useEffect(() => {
    const friendId = chat.members.find((id) => id !== currentUserId);
    async function getUserData() {
      try {
        const { data } = await axios.get(`api/users/${friendId}`);
        setUserData(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
    getUserData();
  }, []);

  //still working on this
  useEffect(() => {
    const countUnreadMessages = async () => {
      try {
        let count = 0;
        let { data } = await axios.get(`api/messages/${chat._id}`);
        data.forEach((message) => {
          if (message.readStatus === null) {
            count++;
          }
        });
        setUnreadMessages(count);
      } catch (error) {
        console.log(error);
      }
    };
    countUnreadMessages();
  }, [unreadMessages]);

  return (
    <Grid
      container
      spacing={3}
      sx={
        {
          // padding: "5px", goes here
          // alignItems:center goes here
        }
      }
    >
      <Grid item xs={4}>
        {online ? (
          <Badge color="#50FC86" badgeContent=" ">
            <img
              className="profileImg"
              src={
                userData?.profilePicture === ""
                  ? "/logo192.png"
                  : userData?.profilePicture
              }
            />
          </Badge>
        ) : (
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
            color="primary"
          >
            <Avatar color="primary">N</Avatar>
          </StyledBadge>
        )}
      </Grid>
      <Grid item xs={4}>
        <span>
          {userData?.firstname}&nbsp;{userData?.lastname}
        </span>
{/* message preview goes here */}
      </Grid>
      <Grid
        item
        xs={4}
        sx={{
          justifyContent: "right",
        }}
      >
        {/* notification goes here */}
        <Badge color="primary" variant="dot"></Badge>
      </Grid>
      <Grid item xs={1}>
        {unreadMessages === 0 ? "" : <strong>{unreadMessages}</strong>}
      </Grid>
    </Grid>
  );
}
