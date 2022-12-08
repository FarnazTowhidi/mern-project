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

export default function NavBar(props, user, setUser) {
  const [modalOpened, setModalOpened] = useState(false);
  function handleLogOut() {
    userService.logOut();
    props.setUser(null);
  }
  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <h1 className="logo">chatter[box]</h1>
        <Container>
          {props.user && <span>Welcome, {props.user?.firstname}!</span>}
        </Container>
        <AppBar
          position="static"
          color="transparent"
          sx={{
            zIndex: "0",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0",
          }}
        >
          {" "}
          <br></br>
          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
            justifyContent="center"
            sx={{
              width: "25vw",
              border: "3px solid #2f15d1",
              margin: "10px",
              borderRadius: "30px",
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
              user={user}
              setUser={setUser}
            />
            <br></br>
          </Stack>
        </AppBar>
      </Grid>
    </Grid>
  );
}
