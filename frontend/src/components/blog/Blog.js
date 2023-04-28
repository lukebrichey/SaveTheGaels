import { Box, Text, Tag, HStack, VStack } from '@chakra-ui/react';

export default function Blog({ blog }) {
  const bodyLines = blog.body.split('\n');

  return (
    <Box
      borderRadius="lg"
      padding={6}
      marginBottom={4}
      maxWidth="800px"
      width="100%"
      bg="white"
      border="1px solid"
      borderColor="gray.200"
    >
      <Text fontSize="3xl" marginBottom="2">
        {blog.title}
      </Text>
      <HStack marginBottom="4" spacing={2}>
        {blog.tags.map((tag, index) => (
          <Tag key={index} size="sm" colorScheme="blue">
            {tag}
          </Tag>
        ))}
      </HStack>
      <Text fontSize="sm" color="gray.500" marginBottom="2">
        {blog.date}
      </Text>
      <Text fontSize="md" color="gray.500" marginBottom="2">
        By {blog.author}
      </Text>
      <VStack spacing={1} alignItems="flex-start">
        {bodyLines.map((line, index) => (
          <>
            <Text key={index} fontSize="md" lineHeight="tall">
              {line}
            </Text>
            {index < bodyLines.length - 1 && <br />}
          </>
        ))}
      </VStack>
    </Box>
  );
}

