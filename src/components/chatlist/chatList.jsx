import React, { useEffect, useRef, useState } from "react";
import "./chatlist.css";
import ChatListItems from "./chatListItems";
import axios from "axios";
import { Select, Box } from "@chakra-ui/react";
import _ from "lodash";
import { BASE_URL } from "../constants/constant";
import CstmDropdown from "../dropdown/dropdown";
const ChatList = ({
  setChatUserName,
  setCurrentChat,
  currentUser,
  allUsers,
  currentChat,
  setIsNewChat,
  isNewChat,
}) => {
  const [loading, setLoading] = useState(true); // Added loading state
  const [conversations, setConversations] = useState();
  const [markUnread, setMarkUnread] = useState(false);
  const chatListRef = useRef();
  const [isChatDelete, setIsChatDelete] = useState(false);

  // const [unreadChat, setUnreadChat] = useState();

  const handleSelectChat = async (conversation) => {
    setIsNewChat(false); // Reset isNewChat state before selecting a chat

    // Check if it's a new chat or an existing chat
    if (!conversation) {
      setIsNewChat(true);
      return; // If it's a new chat, return without setting the current chat
    }

    setCurrentChat(conversation);
    try {
      // Added a check for loginId
      if (conversation) {
        const res = await axios.put(
          `${BASE_URL}/messages/mark-message-as-read/${conversation._id}`
        );
        setMarkUnread(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenChat = async (user) => {
    setIsNewChat(true); // Set isNewChat state for new chat
    // Check if a conversation already exists between the current user and the selected user
    const existingConversation = await axios.post(`${BASE_URL}/conversation`, {
      senderId: currentUser,
      receiverId: user._id,
    });

    setCurrentChat(existingConversation.data);
  };

  useEffect(() => {
    // Scroll to the bottom of the chat list when a new chat is started
    if (isNewChat) {
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
    }
  }, [isNewChat]);

  useEffect(() => {
    const getConversation = async () => {
      try {
        if (currentUser) {
          // Added a check for loginId
          const res = await axios.get(
            `${BASE_URL}/conversation/${currentUser}/'null'`
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
  }, [currentUser, markUnread, currentChat, isChatDelete]);

  return (
    <div className="main__chatlist" ref={chatListRef}>
      <div className="align-div">
        <CstmDropdown
          currentUser={currentUser}
          allUsers={allUsers}
          conversation={conversations}
          handleOpenChat={handleOpenChat}
        />
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
                  setIsChatDelete={setIsChatDelete}
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
