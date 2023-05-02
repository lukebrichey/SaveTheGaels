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
          Hello there! My name is Luke Richey, and I am currently a sophomore
          at Harvard College studying Computer Science. 
          This is my personal blog, dedicated to my late father Brent Richey.
          I've used the domain name my dad left me that was supposed to be our
          shared blog. We always talked about writing, but never got around to
          it. I'll be living out that dream for the both of us. I plan on
          writing about a lot of different subjects, mostly as an exercise in
          developing/communicating my ideas as well as forcing myself to dive
          deeper into subjects I'm interested in. I hope you enjoy! 
        </Text> 
      </Box>
    </Flex>
  );
}

