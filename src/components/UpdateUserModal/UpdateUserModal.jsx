import React, { useState } from "react";
import { Modal, useMantineTheme } from "@mantine/core";
import { update } from "../../utilities/UserRequests/users-service";
import axios from "axios";

// mui below
import CssBaseline from "@mui/material/CssBaseline";
import { Input, Button, TextareaAutosize, Box } from "@mui/material";
import { Container } from "@mui/system";
import "./UpdatUserModal.css";

export default function UpdateUserModal({
  user,
  setUser,
  modalOpened,
  setModalOpened,
}) {
  const [selectedFile, setSelectedFile] = React.useState(null);
  const theme = useMantineTheme();
  const [formData, setFormData] = useState({
    firstname: user.firstname,
    lastname: user.lastname,
    username: user.username,
    email: user.email,
    profilePicture: "",
    about: user.about,
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleFileSelect(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setSelectedFile(e.target.files[0]);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("file", selectedFile);
      if (selectedFile) {
        axios
          .post(`/api/users/uploadPicture/${formData.email}`, data, {
            headers: {
              "Content-type": "multipart/form-data",
            },
          })
          .then((res) =>
            setUser({
              ...user,
              profilePicture: `https://ga-chatterbox.s3.ca-central-1.amazonaws.com/${selectedFile.name}`,
            })
          );
        // })
      }
      const user = await update(formData);
      setUser(user);
    } catch (error) {
      console.log({ error });
    }
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
      maxWidth="sm"
    >
      <Container
        component="main"
        spacing={2}
        sx={{
          display: "flex",
          height: "100vh",
          flexDirection: "column",
          margin: "5px",
        }}
      >
        <CssBaseline />
        <Box
          component="form"
          autoComplete="off"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <img
            className="profileImg"
            src={
              user?.profilePicture === ""
                ? "./logo192.png"
                : user?.profilePicture
            }
            alt="profileimage"
            style={{ margin: "auto", height: "120px", width: "120px" }}
          />

          <Input
            className="outlined-basic"
            variant="outlined"
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            placeholder="First Name"
            margin="normal"
            fullWidth
            required
            autoFocus
            disableUnderline
          />

          <Input
            className="outlined-basic"
            variant="outlined"
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            placeholder="Last Name"
            margin="normal"
            fullWidth
            required
            autoFocus
            disableUnderline
          />

          <Input
            className="outlined-basic"
            variant="outlined"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Userame"
            margin="normal"
            fullWidth
            required
            autoFocus
            disableUnderline
          />

          <Input
            className="outlined-basic"
            variant="outlined"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            margin="normal"
            fullWidth
            required
            autoFocus
            disableUnderline
          />

          <Input
            className="outlined-basic custom-file-input"
            variant="outlined"
            type="file"
            name="profilePicture"
            onChange={handleFileSelect}
            placeholder="Profile Picture"
            margin="normal"
            fullWidth
            autoFocus
            disableUnderline
          />

          <TextareaAutosize
            className="outlined-basic"
            variant="outlined"
            type="text"
            name="about"
            value={formData.about}
            onChange={handleChange}
            placeholder="About ..."
            maxlength="200"
            margin="normal"
            fullWidth
            autoFocus
            disableUnderline
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, borderRadius: "30px" }}
            autoFocus
          >
            UPDATE
          </Button>
        </Box>
      </Container>
    </Modal>
  );
}
