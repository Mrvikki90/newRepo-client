import React from "react";
import { SERVE_STATIC_IMAGES_PATH } from "../constants/constant";
import _ from "lodash";
import "./userprofile.css";
import { Flex, Avatar, Text, VStack } from "@chakra-ui/react";

const UserProfile = ({ allUsers, filterUsers, currentUser }) => {
  const toggleInfo = (e) => {
    e.target.parentNode.classList.toggle("open");
  };

  return (
    <div className="main__userprofile">
      <div className="profile__card user__profile__image">
        <VStack spacing={4} align="start">
          {allUsers.map((item) => {
            return item._id !== currentUser &&
              !_.includes(filterUsers, item.currentUser) ? (
              <Flex alignItems="center" gap="2">
                <Avatar
                  size="sm"
                  name="Dan Abrahmov"
                  // src={`${SERVE_STATIC_IMAGES_PATH}${item.profileImg}`}
                />
                <Text>{item.name}</Text>
              </Flex>
            ) : null;
          })}
        </VStack>
      </div>
    </div>
  );
};

export default UserProfile;
