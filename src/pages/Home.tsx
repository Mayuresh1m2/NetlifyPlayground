import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography, Button, Avatar, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import ContentRenderer from '../components/ContentRenderer';

interface PostData {
    slug: string;
    title: string;
    summary: string;
    contentType?: 'markdown' | 'html' | 'text';
}

interface AboutData {
    content: string;
    contentType: 'markdown' | 'html' | 'text';
    profileImageUrl: string;
}

const Home: React.FC = () => {
    const [posts, setPosts] = useState<PostData[]>([]);
    const [aboutData, setAboutData] = useState<AboutData | null>(null);

    useEffect(() => {
        async function fetchAbout() {
            const aboutModule = await import('../data/about.json');
            setAboutData(aboutModule);
        }

        async function fetchPosts() {
            const files = import.meta.glob('../blogs/*.json');
            const loadedPosts: PostData[] = await Promise.all(
                Object.entries(files).map(async ([_, resolver]) => {
                    const module: any = await resolver();
                    return {
                        slug: module.slug,
                        title: module.title,
                        summary: module.summary,
                        contentType: module.contentType || 'markdown',
                    };
                })
            );
            setPosts(loadedPosts);
        }

        fetchAbout();
        fetchPosts();
    }, []);

    return (
        <>
            <Typography variant="h5" gutterBottom sx={{ mt: 2, mb: 3, color: '#6B4226' }}>
                About Me
            </Typography>

            {aboutData && (
                <Card sx={{ display: 'flex', mb: 6, bgcolor: '#FFF8F0', boxShadow: 3, borderRadius: 3 }}>
                    <Box sx={{ p: 3, display: 'flex', alignItems: 'center' }}>
                        <Avatar
                            alt="Mayuresh Srivastava"
                            src={aboutData.profileImageUrl}
                            sx={{ width: 120, height: 120, borderRadius: 3, boxShadow: 2 }}
                        />
                    </Box>
                    <CardContent sx={{ flex: 1, paddingLeft: 2 }}>
                        <ContentRenderer content={aboutData.content} contentType={aboutData.contentType} />
                    </CardContent>
                </Card>
            )}

            <Typography variant="h5" gutterBottom sx={{ mt: 2, mb: 2, color: '#6B4226' }}>
                Blog
            </Typography>
            <Grid container spacing={2}>
                {posts.map(post => (
                    <Grid item xs={12} sm={6} key={post.slug}>
                        <Card sx={{ boxShadow: 2, borderRadius: 2 }}>
                            <CardContent>
                                <Typography variant="h6" color="#8B5E3C">
                                    {post.title}
                                </Typography>
                                <Typography variant="body2" sx={{ mb: 1 }}>
                                    {post.summary}
                                </Typography>
                                <Button component={Link} to={`/blog/${post.slug}`} sx={{ mt: 1 }} variant="contained" color="secondary">
                                    Read More
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>
    );
};

export default Home;
