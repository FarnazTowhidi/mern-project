import { useState } from "react";
import UpdateUserModal from "../../components/UpdateUserModal/UpdateUserModal";
import { Button, IconButton, Link } from "@mui/material";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import Stack from "@mui/material/Stack";

export default function ProfilePage({user,setUser}) {
  const [modalOpened, setModalOpened] = useState(false);
  return (
    <>
      <div>Profile Page</div>
      <div>
        <Stack>
          <div>{user?.firstname}</div>
          <div>{user?.lastname}</div>
          <div>{user?.email}</div>
          <div>{user?.profilePicture} PROFILE PICTURE HERE</div>
          <div>{user?.about} BIO HERE</div>
        </Stack>
        <IconButton>
          <Link onClick={() => setModalOpened(true)}>
            <SettingsOutlinedIcon color="primary"></SettingsOutlinedIcon>
          </Link>
        </IconButton>
        <UpdateUserModal
          modalOpened={modalOpened}
          setModalOpened={setModalOpened}
          user={user}
          setUser={setUser}
        />
      </div>
    </>
  );
}
