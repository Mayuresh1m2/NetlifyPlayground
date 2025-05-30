// Required packages:
// - React
// - React Router DOM
// - Tailwind CSS
// - @mui/material
// - react-markdown
// - gray-matter

// ----- Core Imports -----
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from '@mui/material';

// ----- UI Components -----
import Header from './components/Header';
import Footer from './components/Footer';

// ----- Pages -----
import Home from './pages/Home';
import BlogPost from './pages/BlogPost';

const App: React.FC = () => {
    return (
        <Router>
            <Container maxWidth="md" sx={{ mt: 4 }}>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/blog/:slug" element={<BlogPost />} />
                </Routes>
                <Footer />
            </Container>
        </Router>
    );
};

export default App;