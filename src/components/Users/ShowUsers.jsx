import { Avatar, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { SERVE_STATIC_IMAGES_PATH } from "../constants/constant";

const ShowUsers = ({ allUsers, starChat }) => {
  return (
    <Flex
      cursor="pointer"
      alignItems="center"
      justifyContent="start"
      onClick={() => starChat(allUsers._id)}
      gridGap="4"
    >
      {allUsers && allUsers.length < 1 ? (
        <Text fontSize="2xl" color="black">
          No Users Active
        </Text>
      ) : (
        <>
          <Avatar
            size="sm"
            name="Dan Abrahmov"
            src={`${SERVE_STATIC_IMAGES_PATH}${allUsers.profileImg}`}
          />
          <Text fontSize="lg">{allUsers.name}</Text>
        </>
      )}
    </Flex>
  );
};

export default ShowUsers;
