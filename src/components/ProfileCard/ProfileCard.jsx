import React from "react";

export default function ProfileCard({ user }) {
  return (
    <>
      <img
        className="profileImg"
        style={{
          margin: "auto",
          height: "200px",
          width: "200px",
          // borderRadius: "3px",
        }}
        src={
          user?.profilePicture === "" ? "./logo192.png" : user?.profilePicture
        }
      />
      <div>
        <div className="text-name">
          {user?.firstname}&nbsp;{user?.lastname}
        </div>
        <p>{user?.email}</p>
        <div className="bio-text">{user?.about} BIO HERE</div>
      </div>
    </>
  );
}
