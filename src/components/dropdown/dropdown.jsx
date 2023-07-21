import React, { useState } from "react";
import "./dropdown.css";

const CstmDropdown = ({
  currentUser,
  allUsers,
  conversation,
  handleOpenChat,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const currentUserChats = conversation
    ? conversation
        .filter((conversation) => conversation.members.includes(currentUser))
        .map((conversation) =>
          conversation.members.find((member) => member !== currentUser)
        )
    : [];

  // Filter out the users whose chat has not started with the current user
  const filteredUsers = allUsers.filter(
    (user) => user._id !== currentUser && !currentUserChats.includes(user._id)
  );

  const handleDropdownToggle = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const handleUserClick = (user) => {
    handleOpenChat(user);
    setIsDropdownOpen(false); // Close the dropdown after clicking a user
  };

  return (
    <div className="sec-center">
      <input
        className="dropdown"
        type="checkbox"
        id="dropdown"
        name="dropdown"
        checked={isDropdownOpen}
        onChange={handleDropdownToggle}
      />
      <label className="for-dropdown" htmlFor="dropdown">
        Add Conversations <i className="uil uil-arrow-down"></i>
      </label>
      <div className="section-dropdown">
        {filteredUsers.map((user) => (
          <a key={user._id} onClick={() => handleUserClick(user)}>
            <div className="avatarT">
              <img
                src="https://cdn-icons-png.flaticon.com/512/186/186313.png"
                alt="User Avatar"
              />
            </div>
            <span className="username">{user.name}</span>
            <i className="uil uil-arrow-right"></i>
          </a>
        ))}
      </div>
    </div>
  );
};

export default CstmDropdown;
