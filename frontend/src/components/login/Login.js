import React, { useState } from "react";
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);
    // Handle login logic here
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
            <FormControl id="email" mb={4}>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
              borderColor="gray.300"
              color="gray.600"
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
