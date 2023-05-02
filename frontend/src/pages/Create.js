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
    num: 0,
    title: '',
    author: '',
    tags: '',
    description: '',
    hidden: true,
    body: '',
  });

  const [preview, setPreview] = useState(false);

  const navigate = useNavigate();

  const api_url = process.env.REACT_APP_API_URL || process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:5000/api'


  // Incrementing the number of blog
  useEffect(() => {
    const fetchLatestBlogNumber = async () => {
      try {
        const response = await fetch(`${api_url}/blogs/latest`);
        const latestBlog = await response.json();
    
        if (response.ok && latestBlog && latestBlog.num !== undefined) {
          setFormValues((prevState) => ({ ...prevState, num: latestBlog.num + 1 }));
        } else {
          setFormValues((prevState) => ({ ...prevState, num: 1 }));
        }
      } catch (error) {
        console.error('Error fetching latest blog number:', error);
        setFormValues((prevState) => ({ ...prevState, num: 1 }));
      }
    };    

    fetchLatestBlogNumber();
  }, [api_url]);


  
  // Handle form values
  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`${api_url}/admin`, {
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
    author: formValues.author,
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
