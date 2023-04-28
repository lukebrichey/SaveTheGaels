import { useState, useEffect } from 'react';
import { VStack } from '@chakra-ui/react';
import Card from '../components/card/Card.js';

export default function Home() {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        async function fetchBlogs() {
            const response = await fetch('http://localhost:5000/api/blogs');
            const data = await response.json();
            setBlogs(data);
        }

        fetchBlogs();
    }, []);
    
    return (
        <VStack spacing={10}>
          {
            blogs
              .sort((a, b) => b.num - a.num)
              .map((blog) => {
                if (blog.hidden) {
                  return null;
                }
      
                return (
                  <Card 
                    key={blog.num} 
                    blog={blog}
                  />
                )
              })
          }
        </VStack>
    );
      
};