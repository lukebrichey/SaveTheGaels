import { useState, useEffect, useCallback } from 'react';
import { useAdmin } from '../context/AdminContext.js';
import { VStack } from '@chakra-ui/react';
import Card from '../components/card/Card.js';

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [triggerFetch, setTriggerFetch] = useState(false);
  
  const { isAdmin } = useAdmin();
  const api_url = process.env.REACT_APP_API_URL || process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:5000/api';
  
  const fetchBlogs = useCallback(async () => {
    const response = await fetch(`${api_url}/blogs`, {
      headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
      },
    });
    const blogs = await response.json();
    setBlogs(blogs);
  }, [api_url]);
  
  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs, triggerFetch]);
  
  const handleDelete = async (id) => {
    const response = await fetch(`${api_url}/admin/${id}`, {
      method: 'DELETE',
      headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
      },
    });
    if (response.ok) {
      console.log('Blog deleted successfully');
      setTriggerFetch(prev => !prev); // Toggle to trigger a refetch
    } else {
      console.error('Error deleting blog');
    }
  };
  
    
  return (
      <VStack spacing={10}>
        {
          blogs
            .sort((a, b) => b.num - a.num)
            .map((blog) => {
              if (blog.hidden) {
                if (!isAdmin) {
                  return null;
                }
              }
    
              return (
                <Card 
                  key={blog._id} 
                  blog={blog}
                  onDelete={isAdmin ? handleDelete : null}
                />
              )
            })
        }
      </VStack>
  );
};