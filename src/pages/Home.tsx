import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import NewsletterSignup from '../components/NewsletterSignup';
import ContactSection from '../components/ContactSection';

interface PostData {
    slug: string;
    title: string;
    summary: string;
}

const Home: React.FC = () => {
    const [posts, setPosts] = useState<PostData[]>([]);

    useEffect(() => {
        const files = import.meta.glob('../blogs/*.json');

        (async () => {
            const allPosts: PostData[] = [];
            for (const path in files) {
                const mod: any = await files[path]();
                if (mod.slug && mod.title) {
                    allPosts.push({
                        slug: mod.slug,
                        title: mod.title,
                        summary: mod.summary || '',
                    });
                }
            }
            setPosts(allPosts);
        })();
    }, []);

    return (
        <>
            <Typography variant="h5" gutterBottom>About Me</Typography>
            <Typography paragraph>I am a developer who loves writing and building apps with React and Material UI.</Typography>

            <Typography variant="h5" gutterBottom>Blog</Typography>
            <Grid container spacing={2}>
                {posts.map(post => (
                    <Grid item xs={12} sm={6} key={post.slug}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">{post.title}</Typography>
                                <Typography variant="body2">{post.summary}</Typography>
                                <Button component={Link} to={`/blog/${post.slug}`} sx={{ mt: 1 }}>Read More</Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <NewsletterSignup />
            <ContactSection />
        </>
    );
};

export default Home;
