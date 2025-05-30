import React from 'react';
import { Typography, Link } from '@mui/material';

const Contact: React.FC = () => (
    <section id="contact" style={{ marginTop: '2rem' }}>
        <Typography variant="h5" gutterBottom>
            Contact Me
        </Typography>
        <Typography paragraph>
            Connect with me on{' '}
            <Link
                href="https://www.linkedin.com/in/mayuresh-srivastava-38869839"
                target="_blank"
                rel="noopener noreferrer"
                color="primary"
                underline="hover"
            >
                LinkedIn
            </Link>
            .
        </Typography>
    </section>
);

export default Contact;
