import React from 'react';
import { Typography, TextField, Button } from '@mui/material';

const NewsletterSignup: React.FC = () => (
    <section className="mt-8">
        <Typography variant="h5">Subscribe to My Newsletter</Typography>
        <form onSubmit={(e) => { e.preventDefault(); alert('Subscribed!'); }}>
            <TextField type="email" label="Your email" required fullWidth sx={{ my: 2 }} />
            <Button variant="contained" type="submit">Subscribe</Button>
        </form>
    </section>
);

export default NewsletterSignup;
