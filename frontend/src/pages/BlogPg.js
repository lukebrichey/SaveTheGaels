import { useLocation } from 'react-router-dom';
import { Box, Text, VStack } from '@chakra-ui/react';
import Blog from '../components/blog/Blog.js';

export default function BlogPg() {
  const location = useLocation();
  const blog = location.state.blog;

  return (
    <VStack spacing={4} align="center">
      {blog ? (
        <Blog blog={blog} />
      ) : (
        <Box>
          <Text>Loading...</Text>
        </Box>
      )}
    </VStack>
  );
}

