import { Box, Text, Tag, HStack, VStack, Center } from '@chakra-ui/react';


export default function Blog({ blog }) {
  return (
    <Center>
      <Box
        className="blog"
        borderRadius="lg"
        padding="6"
        marginBottom="4"
        maxWidth="800px"
        width="100%"
      >
        <Text fontSize="3xl" fontWeight="bold" marginBottom="2">
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
        <VStack spacing={1} alignItems="flex-start">
          <Text fontSize="md" lineHeight="tall">
            {blog.body}
          </Text>
        </VStack>
      </Box>
    </Center>
  );
}
