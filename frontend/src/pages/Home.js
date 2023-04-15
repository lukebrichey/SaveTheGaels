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
        <VStack
            spacing={20}        
        >
            {
                // TODO: Make blogs render in order of most recent
                blogs.map((blog) => {
                    return (
                        <Card 
                                key={blog.id} 
                                blog={blog}
                            />
                    )
                })
            }
        </VStack>
    )
};