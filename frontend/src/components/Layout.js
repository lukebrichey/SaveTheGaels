// components/Layout.js
import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import Footer from './footer/Footer';
import Header from './header/Header';

function Layout({ children }) {
  return (
    <Flex direction="column" minHeight="100vh">
      <Header />
      <Box flex="1" paddingTop="2rem" bgColor="#fff7ed" pb={10}>
        {children}
      </Box>
      <Footer />
    </Flex>
  );
}

export default Layout;

