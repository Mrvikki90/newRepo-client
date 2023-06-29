import React, { useRef, useEffect } from "react";
import ChatItem from "./chatItems";
import "./chatcontent.css";
import Avatar from "../chatlist/Avatar";

const ChatContent = ({
  loginId,
  userMessages,
  sendMessages,
  chatUserName,
  setMsg,
  msg,
}) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [userMessages]);

  useEffect(() => {
    scrollToBottom();
  }, [msg]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="main__chatcontent">
      <div className="content__header">
        <div className="blocks">
          <div className="current-chatting-user">
            <Avatar
              isOnline="active"
              image="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU"
            />
            <p>{chatUserName}</p>
          </div>
        </div>

        <div className="blocks">
          <div className="settings">
            <button className="btn-nobg">
              <i className="fa fa-cog"></i>
            </button>
          </div>
        </div>
      </div>
      <div className="content__body">
        <div className="chat__items">
          {userMessages.map((itm, index) => {
            return (
              <ChatItem
                animationDelay={index + 2}
                key={itm._id}
                user={itm}
                loginId={loginId}
                msg={itm.text}
              />
            );
          })}

          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="content__footer">
        <div className="sendNewMessage">
          <button className="addFiles">
            <i className="fa fa-plus"></i>
          </button>
          <input
            type="text"
            placeholder="Type a message here"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
          />
          <button className="btnSendMsg" id="sendMsgBtn" onClick={sendMessages}>
            <i className="fa fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatContent;
