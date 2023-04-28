import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Checkbox
} from '@chakra-ui/react';
import Blog from '../components/blog/Blog';

export default function Create() {
  const [formValues, setFormValues] = useState({
    id: 0,
    title: '',
    author: '',
    tags: '',
    description: '',
    hidden: true,
    body: '',
  });

  const [preview, setPreview] = useState(false);

  const navigate = useNavigate();

  // Incrementing the number of blog
  useEffect(() => {
    const fetchLatestBlogId = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/blogs/latest');
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }
        const latestBlog = await response.json();
  
        // If there are no blogs in the database, set the initial ID to 1.
        if (latestBlog) {
          setFormValues((prevState) => ({ ...prevState, id: latestBlog.id + 1 }));
        } else {
          setFormValues((prevState) => ({ ...prevState, id: 1 }));
        }
      } catch (error) {
        console.error('Error fetching latest blog ID:', error);
      }
    };
  
    fetchLatestBlogId();
  }, []);
  
  // Handle form values
  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:5000/api/admin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...formValues, tags: formValues.tags.split(',').map(tag => tag.trim()) }),
    });

    if (response.ok) {
      console.log(await response.json());
      // redirect to home page
      navigate('/');

    } else {
      console.error(await response.json());
    }
  };

  const handlePreview = () => {
    setPreview(!preview);
  };

  const handleHidden = (e) => {
    setFormValues({ ...formValues, hidden: !e.target.checked });
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
                onChange={handleHidden} 
                value={formValues.hidden}
                borderColor='black'
              >
                Public
              </Checkbox>

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
