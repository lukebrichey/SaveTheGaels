import { 
    Card as ChakraCard, 
    CardBody,
    CardHeader, 
    Text, 
    Flex, 
    Tag,
    IconButton,
} from '@chakra-ui/react';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { useAdmin } from '../../context/AdminContext.js';
import { useNavigate } from 'react-router-dom';

export default function Card({ blog }) {

    const { isAdmin } = useAdmin();
    const navigate = useNavigate();

    // Navigate to the blog page
    const handleClick = () => {
        navigate(`/blogs/${blog._id}`, { state: { blog } });
    };

    const handleDelete = async (e) => {
            e.stopPropagation();
            const response = await fetch(`http://localhost:5000/api/admin/${blog._id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                console.log('Blog deleted successfully');
            } else {
                console.error('Error deleting blog');
            }
    };

    // Edit blog
    const editBlog = async () => {}

    return (
        <ChakraCard 
            bg='white'
            width="60vw"
            p={4}
            borderRadius="10px"
            border='1px solid black'
            onClick={handleClick}
        >
            <CardHeader ml={6} width="100%">
                <Flex align='center' width="100%">
                    <Text mr={4} >#{ blog.num }</Text>
                    <Text fontSize="20px" mr="auto">{ blog.title }</Text>
                    <Text mr={10} >{ blog.date }</Text>
                </Flex>
                <Flex align='center' justifyContent='spacebetween'>
                        {
                            blog.tags.map((tag, index) => {
                                return  <Tag key={index} size="sm" m={1} colorScheme="blue">
                                            {tag}
                                        </Tag>
                            })
                        }
                </Flex>
            </CardHeader>
            <CardBody width="100%" ml={6} mr={10}>
                <Text>{ blog.description }</Text>
            </CardBody>
            { isAdmin && (
                        <Flex align='center' width="100%">
                            <IconButton 
                                icon={<AiFillEdit />} 
                                aria-label="Edit Blog"
                                ml="auto"             
                                size="lg" 
                            />
                            <IconButton
                                icon={<AiFillDelete />}
                                aria-label="Delete Blog"
                                mr={5}
                                size="lg"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDelete(e);
                                }}
                            />
                        </Flex>
                )}
        </ChakraCard>
    )
} 
