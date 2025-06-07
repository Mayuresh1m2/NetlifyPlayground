import React from 'react';
import { Typography, Box, Container } from '@mui/material';

const Footer: React.FC = () => (
    <Box
        component="footer"
        sx={{
            py: 3,
            px: 2,
            mt: 'auto',
            backgroundColor: (theme) => theme.palette.background.paper, // Use theme's paper color
            borderTop: (theme) => `1px solid ${theme.palette.divider}`, // Use theme's divider color
            textAlign: 'center'
        }}
    >
        <Container maxWidth="md">
            <Typography variant="body2" sx={{ color: 'text.secondary' /* Use theme's secondary text color */ }}>
                © {new Date().getFullYear()} Developer Portfolio
            </Typography>
        </Container>
    </Box>
);

export default Footer;