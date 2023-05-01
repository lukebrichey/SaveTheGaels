import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.js';
import About from './pages/About.js';
import Home from './pages/Home.js';
import BlogPg from './pages/BlogPg.js';
import Create from './pages/Create.js';
import { Box } from '@chakra-ui/react';
import { useAdmin } from './context/AdminContext.js';

function App() {

  const { isAdmin, setIsAdmin } = useAdmin();

  useEffect(() => {
    // Fetch the admin status from the server and update the state
    const checkAdminStatus = async () => {
      const response = await fetch('http://localhost:5000/api/isAdmin');
      const { isAdmin } = await response.json();
      setIsAdmin(isAdmin);
    };

    checkAdminStatus();
  }, [setIsAdmin]);

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

        {isAdmin && <Route path="/create" element={<Layout><Create /></Layout>} />}
      </Routes>
    </Box>
  );
}

export default App;
