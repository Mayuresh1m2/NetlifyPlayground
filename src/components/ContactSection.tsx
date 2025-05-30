import React from 'react';
import { Typography } from '@mui/material';

const ContactSection: React.FC = () => (
    <section id="contact" className="mt-8">
        <Typography variant="h5">Contact Me</Typography>
        <Typography paragraph>
            Connect with me on <a href="https://www.linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer">LinkedIn</a>.
        </Typography>
    </section>
);

export default ContactSection;