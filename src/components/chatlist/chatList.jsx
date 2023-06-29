import React, { useEffect, useState } from "react";
import "./chatlist.css";
import ChatListItems from "./chatListItems";
import axios from "axios";
import _ from "lodash";
// import { MDBSpinner } from "";

const ChatList = ({ setChatUserName, setCurrentChat, currentUser }) => {
  // const [loginId, setLoginId] = useState();
  const [loading, setLoading] = useState(true); // Added loading state
  const [conversations, setConversations] = useState();

  // useEffect(() => {
  //   const userid = localStorage.getItem("userId");
  //   setLoginId(userid);
  // }, []);

  const handleSelectChat = (conversation) => {
    console.log("Selected chat:", conversation);
    setCurrentChat(conversation);
  };

  useEffect(() => {
    const getConversation = async () => {
      try {
        if (currentUser) {
          // Added a check for loginId
          const res = await axios.get(
            `https://socket-chat-app-3v3p.onrender.com/conversation/${currentUser}`
          );
          setConversations(res.data);
        }
        setLoading(false); // Set loading to false after API call
      } catch (error) {
        console.log(error);
        setLoading(false); // Set loading to false in case of error
      }
    };
    getConversation();
  }, [currentUser]);

  return (
    <div className="main__chatlist">
      <div className="align-div">
        <button className="btn">
          <div className="chatlistadd">
            <span>New conversation</span>
            <i className="fa fa-plus"></i>
          </div>
        </button>
        <div className="chatlist__heading">
          <h3>Chats</h3>
        </div>
        <div className="chatList__search">
          <div className="search_wrap">
            <input type="text" placeholder="Search Here" required />
            <button className="search-btn">
              <i className="fa fa-search"></i>
            </button>
          </div>
        </div>
      </div>

      <div className="chatlist__items">
        {loading ? (
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          conversations &&
          _.map(conversations, (item, index) => {
            return (
              <div onClick={() => handleSelectChat(item)}>
                <ChatListItems
                  conversation={item}
                  currentUser={currentUser}
                  animationDelay={index + 1}
                  setChatUserName={setChatUserName}
                />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ChatList;
