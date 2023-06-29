import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Input,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import axios from "axios";

const ForgetPasswordModal = ({ isOpen, onClose, setShowAlert }) => {
  const [email, setEmail] = useState("");

  const handleForgetPasswordSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      "https://socket-chat-app-3v3p.onrender.com/api/forget-password-mail",
      { email: email }
    );
    if (response.status === 200) {
      setEmail("");
      onClose();
      setShowAlert(true);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Please enter email address</ModalHeader>
          <ModalBody>
            <form onSubmit={handleForgetPasswordSubmit}>
              <FormControl>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <Button mt="4" colorScheme="cyan" type="submit">
                Submit
              </Button>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ForgetPasswordModal;
