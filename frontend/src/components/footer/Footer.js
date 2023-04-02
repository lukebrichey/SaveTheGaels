import {
  Box,
  HStack,
  VStack,
  IconButton,
  Text,
  Link,
} from '@chakra-ui/react';
import { FaTwitter, FaGithub } from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';

function Footer() {
  return (
    <Box 
      bg="green" 
      pt="8"
      pb="4"
      color="white" 
      position="absolute"
      left="0"
      right="0"
      bottom="0"
      width="100%"
    >
      <VStack spacing="2">
        <Text fontSize="sm">
          Made by Luke Richey
        </Text>
        <HStack spacing="4">
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
              colorScheme="twitter"
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
        <Link as={RouterLink} to="/login" _hover={{ textDecoration: "underline" }} >
          Admin Log-in
        </Link>
      </VStack>
    </Box>
  );
}

export default Footer;

