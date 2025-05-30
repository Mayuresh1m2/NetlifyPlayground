import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import NewsletterSignup from '../components/NewsletterSignup';
import ContactSection from '../components/ContactSection';

interface PostData {
    slug: string;
    title: string;
    summary: string;
    date: string;
    contentType: string;
    content: string;
}

const Home: React.FC = () => {
    const [posts, setPosts] = useState<PostData[]>([]);

    useEffect(() => {
        async function fetchPosts() {
            const files = import.meta.glob('../blogs/*.json');

            const loadedPosts: PostData[] = await Promise.all(
                Object.entries(files).map(async ([_, resolver]) => {
                    const blog = await resolver() as { default: PostData };
                    return blog.default;
                })
            );

            loadedPosts.sort((a, b) => (a.date < b.date ? 1 : -1));

            setPosts(loadedPosts);
        }

        fetchPosts();
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
                                <Typography variant="body2" color="textSecondary">{post.date}</Typography>
                                <Typography variant="body2" sx={{ mt: 1 }}>{post.summary}</Typography>
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
