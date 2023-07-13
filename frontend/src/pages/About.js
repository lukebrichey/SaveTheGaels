import { Text, Flex, Box } from '@chakra-ui/react';

export default function About() {
  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="60vh"
    >
      <Box 
        lineHeight='tall'
        width="50vw"
        bg='white'
        p={4}
        borderRadius={8}
        borderWidth={1}
        borderColor="black"
        boxShadow="md"
      >
        <Text fontSize="md" textAlign="center">
          Hello there! My name is Luke Richey, and I am currently a junior
          at Harvard studying Computer Science and Economics. 
          This is my personal blog, dedicated to my late father Brent Richey.
          I plan on writing about a lot of different subjects, mostly as an 
          exercise in developing/communicating my ideas as well as forcing myself 
          to dive deeper into subjects I'm interested in. I hope you enjoy! 
        </Text> 
      </Box>
    </Flex>
  );
}

