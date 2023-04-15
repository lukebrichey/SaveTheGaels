import { Link as RRLink } from 'react-router-dom';
import { Box, Button, Image } from '@chakra-ui/react';  

// Should take in IsAdmin prop in the future

export default function Header() {
    return (
        <Box 
            display="flex" 
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
                className='logo'  
                ml={10}
            />
            <Button 
                to="/" 
                as={RRLink} 
                className='title' 
                pl={9} 
                mr="auto" 
                fontSize="25px"
            >
                SaveTheGaels
            </Button>
            <Button 
                to="/about"
                as={RRLink} 
                className='nav'
                mr={10}
                p={5}   
                borderRadius="10px"
                _hover={{ textDecoration: "underline" }}
                fontSize="20px"
            >
                About
            </Button>
        </Box>
    )
}