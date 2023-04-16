import { Link as RRLink } from 'react-router-dom';
import { Flex, Button, Image } from '@chakra-ui/react';  

// Should take in IsAdmin prop in the future

export default function Header() {
    return (
        // Repalce Box with Flex 
        <Flex 
            flexDirection="row" 
            alignItems="center" 
            bg="green" 
            p={4}
            width="100%" 
            height="10%" 
            color="white"
            borderBottom="3px inset black"
        >
            <Image 
                src={require('./clover.png')} 
                alt='SaveTheGaels Logo'
                boxSize='40px' 
                ml={5}
                mb={1}
            />
            <Button 
                to="/" 
                as={RRLink} 
                pl={1} 
                mr="auto"
                fontSize="25px"
            >
                SaveTheGaels
            </Button>
            
            <Button
                to="/create"
                as={RRLink}
                mr={5}
                mt={0.9}
                p={1}
                borderRadius="10px"
                fontSize="20px"
                _hover={{textDecoration: 'underline'}}
            >
                Create
            </Button>

            <Button     
                to="/about"
                as={RRLink}
                mr={5}
                mt={0.9}
                p={1}   
                borderRadius="10px"
                fontSize="20px"
                _hover={{textDecoration: 'underline'}}
            >
                About
            </Button>
        
        </Flex>
    )
}