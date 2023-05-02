import React, { useState } from "react";
import { useAdmin } from "../../context/AdminContext.js";
import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";

function LoginModal({ isOpen, onClose }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { setIsAdmin } = useAdmin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const response = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        },
      body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        console.log(await response.json());
        console.log("Login successful");
        setIsAdmin(true);
      } else {
        console.log("Login failed");
      }

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay bg="rgba(0, 0, 0, 0.4)" />
      <ModalContent
        mx="auto"
        my="10"
        maxHeight="500px"
        maxWidth="400px"
        borderRadius="lg"
        bg="white"
        borderColor="black"
        p={4}
        boxShadow="md"
      >
        <ModalHeader textAlign="center" borderBottom="1px solid #E2E8F0" pb={2}>
          Admin Log-In
        </ModalHeader>
        <ModalCloseButton ml="auto" mt={2} />
        <Box as="form" onSubmit={handleSubmit}>
          <ModalBody>
            <FormControl id="username" mb={4}>
              <FormLabel>Username</FormLabel>
              <Input
                type="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                borderColor="gray.300"
                focusBorderColor="blue.500"
              />
            </FormControl>

            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                borderColor="gray.300"
                focusBorderColor="blue.500"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter borderTop="1px solid #E2E8F0" pt={2}>
            <Button
              colorScheme="blue"
              type="submit"
              mr={3}
              bgColor="blue.500"
              color="gray.600"
              _hover={{ bgColor: "blue.600" }}
              _active={{ bgColor: "blue.700" }}
            >
              Log In
            </Button>
            <Button
              variant="outline"
              onClick={onClose}
              _hover={{ borderColor: "gray.400", color: "gray.800" }}
              _active={{ borderColor: "gray.500", color: "gray.900" }}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Box>
      </ModalContent>
    </Modal>

  );
}

export default LoginModal;
