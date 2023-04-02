// components/Login.js
import React, { useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Flex,
  Input,
  Button,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  useEffect(() => {
    onOpen();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = () => {
    onClose();
    navigate('/');
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="sm">
      <ModalOverlay />
      <ModalContent bg="fff7ed" pt="1rem" my="auto" borderRadius="md">
        <Flex justifyContent="space-between" alignItems="center" p="4">
          <ModalHeader fontSize="2xl" fontWeight="bold" px="0">
            Login
          </ModalHeader>
          <ModalCloseButton />
        </Flex>
        <ModalBody>
          <VStack spacing={6}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                variant="filled"
                focusBorderColor="teal.400"
                size="lg"
                border="1px"
                errorBorderColor='red.300'
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                variant="filled"
                focusBorderColor="teal.400"
                size="lg"
                border="1px"
                errorBorderColor='red.300'
              />
            </FormControl>
            <Button
              mt={4}
              bg="white"
              padding="0.5rem 1rem"
              border="1px"
              borderColor="black"
              borderRadius="15"
              type="submit"
              size="lg"
            >
              Log in
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default Login;
