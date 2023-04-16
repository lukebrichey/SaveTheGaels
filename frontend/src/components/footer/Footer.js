import {
  Box,
  HStack,
  VStack,
  IconButton,
  Text,
  Link,
} from '@chakra-ui/react';
import { useState } from 'react';
import LoginModal from '../login/Login.js';
import { FaTwitter, FaGithub } from 'react-icons/fa';

function Footer() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  return (
    <Box 
      bg="green" 
      pt={8}
      pb={4}
      color="white" 
      width="100%"
    >
      <VStack spacing="2">
        <Text fontSize="sm">
          Made by Luke Richey
        </Text>
        <HStack spacing="1">
          <Link href="https://twitter.com/LukeRichey3" isExternal>
            <IconButton
              aria-label="Twitter"
              icon={<FaTwitter />}
              style={{
                width: '25px',
                height: '25px',
                padding: '2px',
                fontSize: '25px',
              }}
              colorScheme="gray"
            />
          </Link>
          <Link href="https://github.com/lukebrichey" isExternal>
            <IconButton
              aria-label="GitHub"
              icon={<FaGithub />}
              style={{
                width: '25px',
                height: '25px',
                padding: '2px',
                fontSize: '25px',
              }}
              colorScheme="gray"
            />
          </Link>
        </HStack>
        <Link onClick={openLoginModal} _hover={{ textDecoration: "underline" }}>
          Admin Log-in
        </Link>
      </VStack>
      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
    </Box>
  );
}

export default Footer;

