import React from "react";
import Avatar from "../chatlist/Avatar";

const ChatItems = (props) => {
  return (
    <div
      style={{ animationDelay: `0.8s` }}
      className={`chat__item ${
        props.user && props.user.sender === props.loginId ? "me" : "other"
      }`}
    >
      {props.msg ? (
        <>
          <div className="chat__item__content">
            <div className="chat__msg">{props.msg}</div>
            <div className="chat__meta">
              <span>16 mins ago</span>
              <span>Seen 1.03PM</span>
            </div>
          </div>
          <Avatar isOnline="active" image={props.image} />
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ChatItems;
