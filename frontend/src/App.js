import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.js';
import About from './pages/About.js';
import Home from './pages/Home.js';
import BlogPg from './pages/BlogPg.js';
import Create from './pages/Create.js';
import { Box } from '@chakra-ui/react';

function App() {
  return (
    <Box height="100vh" bg="#fff7ed">
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/about" element={<Layout><About /></Layout>} />
        <Route
          path="/blogs/:id"
          loader={({ params }) => {
            return params.id;
          }}
          element={<Layout><BlogPg /></Layout>}
        />
        <Route path="/create" element={<Layout><Create /></Layout>} />
      </Routes>
    </Box>
  );
}

export default App;
