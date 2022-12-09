import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import * as userService from "../../utilities/UserRequests/users-service";
import { AppBar, Grid, IconButton, Button } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import Stack from "@mui/material/Stack";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import LogoutIcon from "@mui/icons-material/Logout";
import { Container } from "react-bootstrap";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import UpdateUserModal from "../../components/UpdateUserModal/UpdateUserModal";

export default function NavBar(props) {
  const [modalOpened, setModalOpened] = useState(false);
  function handleLogOut() {
    userService.logOut();
    props.setUser(null);
  }
  return (
    <Grid container>
      <Grid item xs={12} md={12} lg={12} xl={12}>
        <h1 className="logo">chatter[box]</h1>
        <img
          className="profileImg"
          src={
            props.user?.profilePicture === ""
              ? "./logo192.png"
              : props.user?.profilePicture
          }
          alt="profileimage"
          style={{
            margin: "auto",
            height: "90px",
            width: "90px",
            borderRadius: "3px",
          }}
        />
        <div className="section-heading">
          {props.user && (
            <span>Welcome, {props.user?.firstname}! &nbsp;&nbsp;&nbsp;</span>
          )}
        </div>

        <AppBar
          position="static"
          color="transparent"
          sx={{
            zIndex: "0",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0",
            width: "100%",
          }}
        >
          <br></br>
          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
            justifyContent="center"
            sx={{
              border: "3px solid #2f15d1",
              margin: "10px",
              borderRadius: "30px",
              width: "70%",
            }}
          >
            <IconButton alignItems="center">
              <Link color="secondary" to="/profile">
                <PersonOutlineIcon color="primary"></PersonOutlineIcon>
              </Link>
            </IconButton>
            <IconButton>
              <Link onClick={() => setModalOpened(true)}>
                <SettingsOutlinedIcon color="primary"></SettingsOutlinedIcon>
              </Link>
            </IconButton>
            <IconButton>
              <Link to="/chats">
                <ChatBubbleOutlineIcon color="primary"></ChatBubbleOutlineIcon>
              </Link>
            </IconButton>
            <IconButton>
              <Link to="" onClick={handleLogOut}>
                <LogoutIcon color="primary"></LogoutIcon>
              </Link>
            </IconButton>
            <UpdateUserModal
              modalOpened={modalOpened}
              setModalOpened={setModalOpened}
              user={props.user}
              setUser={props.setUser}
            />
            <br></br>
          </Stack>
        </AppBar>
      </Grid>
    </Grid>
  );
}
