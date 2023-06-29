import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import ChatContent from "../../chatContent/chatContent";
import ChatList from "../../chatlist/chatList";
import UserProfile from "../../userProfile/userProfile";
import "./chatbody.css";
import axios from "axios";
import _ from "lodash";
import { io } from "socket.io-client";

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

  // Check if the socket ID is stored in localStorage
  const {
    user,
    user: { _id },
    // user: { profileImg },
  } = location.state;

  const isMountedRef = useRef(false);
  const isFirstRun = useRef(true);

  // Connect to the socket server using the stored socket ID or generate a new one
  const socket = io("https://socket-chat-app-3v3p.onrender.com");

  useEffect(() => {
    if (isFirstRun.current) {
      console.log("socketStart");
      socket.on("connect", () => {
        console.log("Connected to server", socket);
      });
      isFirstRun.current = false;
    }
  }, [socket]);

  useEffect(() => {
    console.log("arrival use effect");
    // Set the mounted state to true
    isMountedRef.current = true;
    const handleReceiveMessage = (data) => {
      console.log("arrival message :", data);
      if (isMountedRef.current) {
        setArrivalMessage({
          sender: data.senderId,
          text: data.text,
          createdAt: Date.now(),
        });
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
    console.log("add user useEffect runs", user._id);
    socket.emit("addUser", user._id);
  }, []);

  useEffect(() => {
    const getConversation = async () => {
      try {
        const res = await axios.get(
          `https://socket-chat-app-3v3p.onrender.com/conversation/${_id}`
        );

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
      const res = await axios.get(
        "https://socket-chat-app-3v3p.onrender.com/api/allUsers"
      );
      setAllUsers(res.data);
    };
    getAllUsers();
  }, [user]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(
          `https://socket-chat-app-3v3p.onrender.com/messages/${currentChat._id}`
        );
        setMessages(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMessages();
  }, [currentChat]);

  const sendMessages = async () => {
    const message = {
      conversationId: currentChat._id,
      sender: _id,
      text: msg,
    };
    const receiverId = currentChat.members.find((m) => m !== _id);
    try {
      socket.emit("sendMessage", {
        senderId: _id,
        receiverId: receiverId,
        text: msg,
      });
    } catch (error) {
      console.log("error while sending message", error);
    }

    try {
      const res = await axios.post(
        "https://socket-chat-app-3v3p.onrender.com/messages",
        message
      );
      setMessages([...userMessages, res.data]);
    } catch (error) {
      console.log(error);
    }
    return setMsg("");
  };

  return (
    <div className="main__chatbody">
      <ChatList
        setChatUserName={setChatUserName}
        setCurrentChat={setCurrentChat}
        currentUser={_id}
      />

      <ChatContent
        loginId={_id}
        userMessages={userMessages}
        sendMessages={sendMessages}
        allUsers={allUsers}
        chatUserName={chatUserName}
        setMsg={setMsg}
        msg={msg}
      />
      <UserProfile />
    </div>
  );
};

export default ChatPage;
