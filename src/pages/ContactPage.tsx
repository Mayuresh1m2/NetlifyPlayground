import React from 'react';
import { Typography, Link, Box } from '@mui/material';

const ContactPage: React.FC = () => (
    <Box sx={{ py: 4 }}> {/* Added Box for padding and consistency */}
        <Typography variant="h5" gutterBottom sx={{ color: '#6B4226' }}>
            Contact Me
        </Typography>
        <Typography paragraph>
            Connect with me on{' '}
            <Link
                href="https://www.linkedin.com/in/mayuresh-srivastava-38869839" // Ensure this is the correct link
                target="_blank"
                rel="noopener noreferrer"
                color="primary" // Standard MUI link color
                underline="hover"
                sx={{ color: '#8B5E3C', '&:hover': { color: '#6B4226' } }} // Custom link color
            >
                LinkedIn
            </Link>
            .
        </Typography>
        {/* You can add more contact methods or a form here in the future */}
    </Box>
);

export default ContactPage;
