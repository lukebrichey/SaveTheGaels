import React, { useState } from 'react';
import {
  Box,
  VStack,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Button,
  HStack,
  Textarea,
} from '@chakra-ui/react';
import Blog from '../components/blog/Blog';

export default function Create() {
  const [formValues, setFormValues] = useState({
    title: '',
    tags: '',
    body: '',
  });

  const [preview, setPreview] = useState(false);

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:5000/api/blogs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...formValues, tags: formValues.tags.split(',').map(tag => tag.trim()) }),
    });

    if (response.ok) {
      console.log(await response.json());
      // redirect to home page

    } else {
      console.error(await response.json());
    }
  };

  const handlePreview = () => {
    setPreview(!preview);
  };

  const blogData = {
    title: formValues.title,
    tags: formValues.tags.split(',').map(tag => tag.trim()),
    date: new Date().toLocaleDateString(),
    body: formValues.body,
  };

  return (
    <VStack spacing={4} align="center">
      {!preview ? (
        <form onSubmit={handleSubmit}>
          <Box
            bg="white"
            padding={6}
            borderRadius="lg"
            border="1px solid"
            borderColor="gray.200"
            minWidth={500}
            minHeight={600}
          >
            <FormControl>
              <FormLabel htmlFor="title">Title</FormLabel>
              <Input
                type="text"
                id="title"
                placeholder="title"
                value={formValues.title}
                onChange={handleChange}
                mb={6}
              />

              <FormLabel htmlFor="tags">Tags</FormLabel>
              <Input
                type="text"
                id="tags"
                placeholder="tags"
                value={formValues.tags}
                onChange={handleChange}
              />
              <FormHelperText mb={10}>
                Usage: tag1, tag2, tag3
              </FormHelperText>

              <FormLabel htmlFor="body">Body</FormLabel>
              <Textarea
                id="body"
                minHeight={250}
                placeholder="body"
                value={formValues.body}
                onChange={handleChange}
              />
            </FormControl>
          </Box>

          <HStack spacing={4} mt={6} >
            <Button colorScheme="blue" type="submit" ml="auto">
              Submit
            </Button>
            <Button colorScheme="blackAlpha" onClick={handlePreview}>
              Preview
            </Button>
          </HStack>
        </form>
      ) : (
        <>
            <Blog blog={blogData} />
            <Button mt={4} colorScheme="blackAlpha" onClick={handlePreview}>
                Back to Edit
            </Button>
        </>
      )}
    </VStack>
  );
}
