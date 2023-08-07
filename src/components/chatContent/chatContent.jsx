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
  isNewChat,
  hasNewMessage,
}) => {
  const messagesEndRef = useRef(null);
  const chatContentRef = useRef();

  useEffect(() => {
    scrollToBottom();
  }, [userMessages]);

  useEffect(() => {
    scrollToBottom();
  }, [msg]);

  useEffect(() => {
    // Scroll to the bottom of the chat content when a new chat is started or a new message arrives
    if (isNewChat || hasNewMessage) {
      chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
    }
  }, [isNewChat, hasNewMessage]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // console.log("userMessages", userMessages);

  return (
    <div className="main__chatcontent" ref={chatContentRef}>
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
          {userMessages.length > 0 ? (
            userMessages.map((itm, index) => (
              <ChatItem
                animationDelay={index + 2}
                key={itm._id}
                user={itm}
                loginId={loginId}
                msg={itm.text}
              />
            ))
          ) : (
            <div className="chat__item__content no-messages">
              <h1>Please send a message to start the conversation.</h1>
            </div>
          )}

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
