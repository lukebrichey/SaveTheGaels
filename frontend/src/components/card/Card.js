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

export default function Card({ blog, onDelete }) {

    const { isAdmin } = useAdmin();
    const navigate = useNavigate();

    // Navigate to the blog page
    const handleClick = () => {
        navigate(`/blogs/${blog._id}`, { state: { blog } });
    };

    // Edit blog
    const handleEdit = (e) => {
        e.stopPropagation();
        navigate(`/edit/${blog._id}`, { state: { blog } });
      };      

    return (
        <ChakraCard 
            bg='white'
            width="60vw"
            p={4}
            borderRadius="10px"
            border='1px solid black'
            onClick={handleClick}
            onMouseEnter={
                (e) => {
                    // Change the cursor to a pointer
                    e.currentTarget.style.cursor = 'pointer';
                }
            }
        >
            <CardHeader ml={6} width="100%">
                <Flex align='center' width="100%">
                    { isAdmin && blog.hidden && <Text mr={4}>Draft</Text> }
                    <Text fontSize="20px" mr="auto">{ blog.title }</Text>
                    <Text mr={10} >{ blog.date }</Text>
                </Flex>
                <Flex align='center' justifyContent='spacebetween'>
                    {
                        blog.tags.filter(tag => tag.trim() !== "").map((tag, index) => {
                        return (
                            <Tag key={index} size="sm" m={1} colorScheme="blue">
                            {tag}
                            </Tag>
                        );
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
                                size="sm"
                                colorScheme='blackAlpha'
                                borderWidth={1}
                                borderColor='blackAlpha.700'
                                onClick={handleEdit} 
                            />
                            <IconButton
                                icon={<AiFillDelete />}
                                aria-label="Delete Blog"
                                ml={2}
                                mr={5}
                                size="sm"
                                colorScheme='blackAlpha'
                                borderWidth={1}
                                borderColor='blackAlpha.700' 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDelete && onDelete(blog._id);
                                }}
                            />
                        </Flex>
                )}
        </ChakraCard>
    )
} 
