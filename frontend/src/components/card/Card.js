import { Link } from 'react-router-dom';
import { 
    Card as ChakraCard, 
    CardBody,
    CardHeader, 
    Text, 
    Flex, 
    Tag
} from '@chakra-ui/react';

export default function Card({ blog }) {

    return (
        <Link  
        to={{ pathname: `/blogs/${blog.id}` }}
        state= {{ blog }}
        key={blog.id}
        >
            <ChakraCard 
                bg='white'
                width="60vw"
                p={4}
                borderRadius="10px"
                border='1px solid black'
            >
                <CardHeader ml={6} width="100%">
                    <Flex align='center' width="100%">
                        <Text mr={4} >#{ blog.id }</Text>
                        <Text fontSize="20px" mr="auto">{ blog.title }</Text>
                        <Text mr={10}>{ blog.date }</Text>
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
            </ChakraCard>
        </Link>
    )
} 
