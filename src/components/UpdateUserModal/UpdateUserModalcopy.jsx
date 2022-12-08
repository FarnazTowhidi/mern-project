import React, { useState } from "react";
import { Modal, useMantineTheme } from "@mantine/core";
import { update } from '../../utilities/UserRequests/users-service';
import axios from 'axios';
import './UpdatUserModal.css';


export default function UpdateUserModal({ user, setUser, modalOpened, setModalOpened }) {
  const [selectedFile, setSelectedFile] = React.useState(null);
  const theme = useMantineTheme();
  const [formData, setFormData] = useState ({
    firstname: user.firstname ,
    lastname: user.lastname,
    email: user.email,
     profilePicture: "",
    about: user.about
  })

       

  function handleChange(e) {     
    setFormData({...formData, [e.target.name]:e.target.value })  
   }
  
  function handleFileSelect (e) {
      setFormData({...formData, [e.target.name]:e.target.value })  
     setSelectedFile(e.target.files[0]) 
     
  }

  function handleSubmit(e) {
     e.preventDefault()       
      try {          
        const user = update(formData)     
        setUser(user)
        const data = new FormData()
        data.append('file', selectedFile)      
         if (selectedFile) {  
       
          axios.post(`/api/users/uploadPicture/${formData.email}`, data , {
            headers: {
            "Content-type": "multipart/form-data",
          },
            }).then(res=>setUser({...user, profilePicture:`https://ga-chatterbox.s3.ca-central-1.amazonaws.com/${selectedFile.name}`} ))
          //  })
        }
      } catch (error) {
        console.log ({error}) 
     }
     setModalOpened(false)
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
      <form onSubmit={handleSubmit} encType="multipart/form-data">
      <div className="updateContainer">
        <h1>CHATTER BOX</h1>
        
        <img className="profileImg" src={user.profilePicture} alt="profileimage" /> 
          <div>
            <input
              value={formData.firstname}
              onChange={handleChange}
              type="text"
              className="infoInput"
              name="firstname"
              placeholder="First Name"
            />
            
            <input
              value={formData.lastname}
              onChange={handleChange}
              type="text"
              className="infoInput"
              name="lastname"
              placeholder="Last Name"
            />

              <input
                value={formData.email}
                onChange={handleChange}
                type="email"
                className="infoInput"
                name="email"
                placeholder="Email"       
              />
        
            <input          
              onChange={handleFileSelect}
              type="file"
              className="infoInput custom-file-input"
              name="profilePicture"
              placeholder="Profile Picture"
            />
            
            <textarea
              value={formData.about}
              onChange={handleChange}
              type="text"
              className="infoInput"
              rows="4" cols="40"
              name="about"
              placeholder="About ..."
            />
            <button 
            type="submit"
            className="submitBtn">Update</button>
          </div>     
      </div>
      </form>
    </Modal>     
  );
}
