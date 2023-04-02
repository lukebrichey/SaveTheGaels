// components/Layout.js
import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import Footer from './footer/Footer';
import Header from './header/Header';

function Layout({ children }) {
  return (
    <Flex direction="column" minHeight="calc(100vh - 10%)">
      <Header />
      <Box flex="1" paddingTop="2rem">
        {children}
      </Box>
      <Footer />
    </Flex>
  );
}

export default Layout;

