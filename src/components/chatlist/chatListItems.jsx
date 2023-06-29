import React, { useEffect, useState } from "react";
import axios from "axios";

import Avatar from "./Avatar";
import { SERVE_STATIC_IMAGES_PATH } from "../constants/constant";

const ChatListItems = ({
  conversation,
  currentUser,
  animationDelay,
  setChatUserName,
}) => {
  const [user, setUser] = useState();

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser);

    const getUser = async () => {
      try {
        const res = await axios.get(
          "https://socket-chat-app-3v3p.onrender.com/api/getone?userId=" +
            friendId
        );
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [conversation]);

  return (
    <div
      style={{ animationDelay: `0.${animationDelay}s` }}
      className={`chatlist__item active`}
    >
      <Avatar
        image={
          user && user.profileImg
            ? `${SERVE_STATIC_IMAGES_PATH}${user.profileImg}`
            : "images/logo.png"
        }
        // isOnline={props.isOnline}
      />

      <div className="userMeta" onClick={() => setChatUserName(user.name)}>
        <p>{user && user?.name}</p>
        <span className="activeTime">32 mins ago</span>
      </div>
    </div>
  );
};

export default ChatListItems;
