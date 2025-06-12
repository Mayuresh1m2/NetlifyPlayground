import React from 'react';
import { Typography, Link, Box } from '@mui/material';
import { NetworkAnimation } from '../components';

const ContactPage: React.FC = () => (
    <Box sx={{
        py: { xs: 2, sm: 3, md: 4 }, // Standardized responsive vertical padding
        textAlign: 'center', // Center align content
        maxWidth: '600px', // Max width for content readability
        mx: 'auto' // Center the box itself
    }}>
        <NetworkAnimation />
        <Typography
            variant="h4" // Slightly larger heading
            component="h1"
            gutterBottom
            sx={{
                color: 'text.primary', // Use theme color
                fontWeight: 'bold',
                mb: 3 // Increased margin bottom
            }}
        >
            Contact Me
        </Typography>
        <Typography variant="body1" sx={{ mb: 2, color: 'text.secondary' }}> {/* Use theme color */}
            Feel free to connect with me on LinkedIn for professional inquiries or collaborations.
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}> {/* Use theme color */}
            You can reach out via my profile on{' '}
            <Link
                href="https://www.linkedin.com/in/mayuresh-srivastava-38869839"
                target="_blank"
                rel="noopener noreferrer"
                underline="hover"
                sx={{
                    color: 'primary.main', // Use theme color
                    fontWeight: 'medium',
                    transition: 'color 0.2s ease-in-out', // Smooth transition for color
                    '&:hover': {
                        color: 'primary.dark', // Use theme color
                        textDecoration: 'underline',
                    }
                }}
            >
                LinkedIn
            </Link>
            .
        </Typography>
        {/* Consider adding a call to action button or other contact methods if desired in the future */}
        {/* Example:
        <Button
            variant="contained"
            href="https://www.linkedin.com/in/mayuresh-srivastava-38869839"
            target="_blank"
            sx={{
                mt: 4,
                bgcolor: '#6B4226',
                '&:hover': { bgcolor: '#5A3216' },
                textTransform: 'none',
                fontSize: '1rem',
                py: 1,
                px: 3
            }}
        >
            View LinkedIn Profile
        </Button>
        */}
    </Box>
);

export default ContactPage;
