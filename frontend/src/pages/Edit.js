import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  VStack,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Button,
  Textarea,
  Checkbox
} from '@chakra-ui/react';

export default function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const blog = location.state.blog;

  const [formValues, setFormValues] = useState({
    num: blog.num,
    title: blog.title,
    author: blog.author,
    tags: blog.tags.join(', '),
    description: blog.description,
    hidden: blog.hidden,
    body: blog.body,
  });

  const api_url = process.env.REACT_APP_API_URL || process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:5000/api'


  useEffect(() => {
    // Fetch the blog if it wasn't passed through the state
    if (!blog) {
      // Fetch the blog data by id and set the initial values
        const fetchBlog = async () => {
            try {
                const response = await fetch(`${api_url}/blogs/${id}`);
                const blog = await response.json();
                setFormValues({
                    num: blog.num,
                    title: blog.title,
                    author: blog.author,
                    tags: blog.tags.join(', '),
                    description: blog.description,
                    hidden: blog.hidden,
                    body: blog.body,
                });
            } catch (error) {
                console.log(error)
            }
        }
        fetchBlog();
    }
  }, [id, blog, api_url]);

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const response = await fetch(`${api_url}/admin/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...formValues, tags: formValues.tags.split(',').map(tag => tag.trim()) }),
    });
  
    if (response.ok) {
      const updatedBlog = await response.json();
      navigate(`/blogs/${updatedBlog._id}`, { state: { blog: updatedBlog } });
    } else {
      console.error(await response.json());
    }
  };
  

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="center">
          <Box
            bg="white"
            padding={6}
            borderRadius="lg"
            border="1px solid"
            borderColor="gray.200"
            minWidth={700}
            minHeight={800}
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

              <FormLabel htmlFor="author">Author</FormLabel>
              <Input
                type="text"
                id="author"
                placeholder="author"
                value={formValues.author}
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
              <FormHelperText mb={2}>
                Usage: tag1, tag2, tag3
              </FormHelperText>

              <FormLabel htmlFor="description">Description</FormLabel>
              <Textarea
                id="description"
                placeholder="description"
                value={formValues.description}
                onChange={handleChange}
                mb={6}
              />

              <FormLabel htmlFor="body">Body</FormLabel>
              <Textarea
                id="body"
                minHeight={250}
                placeholder="body"
                value={formValues.body}
                onChange={handleChange}
              />

              <Checkbox 
                id="hidden"
                mt={2}
                isChecked={!formValues.hidden}
                onChange={(e) => setFormValues({ ...formValues, hidden: !e.target.checked })}
                borderColor='black'
              >
                Public
              </Checkbox>
            </FormControl>
          </Box>

          <Button colorScheme="blue" type="submit" mt={6}>
            Save Changes
          </Button>
        </VStack>
      </form>
    </Box>
  );
}
