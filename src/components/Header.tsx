import React from 'react';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Header: React.FC = () => (
    <header className="mb-6">
        <Typography variant="h4" gutterBottom>
            My Personal Website
        </Typography>
        <nav>
            <Link to="/">Home</Link> | <a href="#contact">Contact</a>
        </nav>
    </header>
);

export default Header;