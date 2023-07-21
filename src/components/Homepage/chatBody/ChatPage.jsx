import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import ChatContent from "../../chatContent/chatContent";
import ChatList from "../../chatlist/chatList";
import UserProfile from "../../userProfile/userProfile";
import "./chatbody.css";
import axios from "axios";
import _ from "lodash";
import { io } from "socket.io-client";
import { BASE_URL } from "../../constants/constant";

const ChatPage = () => {
  const location = useLocation();

  const [conversations, setConversations] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [filterUsers, setFilterUsers] = useState();
  const [currentChat, setCurrentChat] = useState();
  const [arrivalMessage, setArrivalMessage] = useState();
  const [userMessages, setMessages] = useState([]);
  const [msg, setMsg] = useState();
  const [chatUserName, setChatUserName] = useState();
  const [isNewChat, setIsNewChat] = useState(false); // New state to track new chats
  const [hasNewMessage, setHasNewMessage] = useState(false);

  // Check if the socket ID is stored in localStorage
  const {
    user,
    user: { _id },
    lastChat,
    // user: { profileImg },
  } = location.state;

  const isMountedRef = useRef(false);
  const isFirstRun = useRef(true);

  // Connect to the socket server using the stored socket ID or generate a new one
  const socket = io(BASE_URL);

  useEffect(() => {
    if (isFirstRun.current) {
      socket.on("connect", () => {});
      isFirstRun.current = false;
    }
  }, [socket]);

  useEffect(() => {
    console.log("arrival use effect");
    // Set the mounted state to true
    isMountedRef.current = true;
    const handleReceiveMessage = (data) => {
      if (isMountedRef.current) {
        setArrivalMessage({
          sender: data.senderId,
          text: data.text,
          createdAt: Date.now(),
        });

        if (currentChat?.members.includes(data.senderId)) {
          setHasNewMessage(true);
        }
      }
    };
    // Attach the event listener
    socket.on("getMessage", handleReceiveMessage);
    // Clean up the event listener and reset the mounted state when the component unmounts
    return () => {
      isMountedRef.current = false;
      socket.off("getMessage", handleReceiveMessage);
    };
  }, []); // Empty dependency array

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.emit("addUser", user._id);
  }, []);

  useEffect(() => {
    const getConversation = async () => {
      try {
        // const receiverId = currentChat.members.find((m) => m !== _id);
        const res = await axios.get(`${BASE_URL}/conversation/${_id}/null`);
        setConversations(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getConversation();
  }, [_id]);

  useEffect(() => {
    if (conversations) {
      setFilterUsers(
        _.uniq(
          _.flatten(
            _.map(conversations, (item) => {
              return item.members;
            })
          )
        )
      );
    }
  }, [conversations]);

  useEffect(() => {
    const getAllUsers = async () => {
      const res = await axios.get(`${BASE_URL}/api/allUsers`);
      setAllUsers(res.data);
    };
    getAllUsers();
  }, [user]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/messages/${currentChat._id}`);
        setMessages(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMessages();
  }, [currentChat]);

  const sendMessages = async () => {
    const receiverId = currentChat.members.find((m) => m !== _id);
    try {
      socket.emit("sendMessage", {
        conversationId: currentChat._id,
        senderId: _id,
        receiverId: receiverId,
        text: msg,
      });

      // Update messages in the frontend directly with the message sent via the socket
      const newMessage = {
        conversationId: currentChat._id,
        sender: _id,
        text: msg,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      setMessages([...userMessages, newMessage]);
    } catch (error) {
      console.log("error while sending message", error);
    }
    return setMsg("");
  };

  return (
    <div className="main__chatbody">
      <ChatList
        setChatUserName={setChatUserName}
        setCurrentChat={setCurrentChat}
        currentUser={_id}
        allUsers={allUsers}
        currentChat={currentChat}
        setIsNewChat={setIsNewChat}
        isNewChat={isNewChat}
      />

      <ChatContent
        loginId={_id}
        userMessages={userMessages}
        sendMessages={sendMessages}
        allUsers={allUsers}
        chatUserName={chatUserName}
        setMsg={setMsg}
        msg={msg}
        isNewChat={isNewChat}
        hasNewMessage={hasNewMessage}
      />
      <UserProfile
        allUsers={allUsers}
        filterUsers={filterUsers}
        currentUser={_id}
      />
    </div>
  );
};

export default ChatPage;
