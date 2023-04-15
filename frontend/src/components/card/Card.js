import { Link } from 'react-router-dom';
import { 
    Card as ChakraCard, 
    CardBody,
    CardHeader, 
    Text, 
    Flex 
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
                p={8}
                borderRadius="10px"
                border='1px solid black'
            >
                <CardHeader ml={10} width="100%">
                    <Flex align='center' width="100%">
                        <Text mr={4} >#{ blog.id }</Text>
                        <Text fontSize="20px" mr="auto">{ blog.title }</Text>
                        <Text mr={10}>{ blog.date }</Text>
                    </Flex>
                </CardHeader>
                    <CardBody width="100%" ml={10} mr={10}>
                        <Flex align='center' justifyContent='spacebetween'>
                            {
                                blog.tags.map((tag, index) => {
                                    return <Text key={index} mr={5} mb={10}>{ tag }</Text>
                                })
                            }
                        </Flex>
                        <Text>{ blog.description }</Text>
                    </CardBody>
            </ChakraCard>
        </Link>
    )
} 
