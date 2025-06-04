import React from 'react';
import { Typography, Box, Container } from '@mui/material';

const Footer: React.FC = () => (
    <Box
        component="footer"
        sx={{
            py: 3,
            px: 2,
            mt: 'auto', // Pushes footer to the bottom if content is short (already handled by App.tsx flex)
            backgroundColor: '#FFF8F0', // Match AppBar and page background
            borderTop: '1px solid rgba(107, 66, 38, 0.12)', // Subtle top border using theme color
            textAlign: 'center'
        }}
    >
        <Container maxWidth="md">
            <Typography variant="body2" sx={{ color: '#8B5E3C' /* Using a theme color */ }}>
                © {new Date().getFullYear()} My Personal Website
            </Typography>
        </Container>
    </Box>
);

export default Footer;