import React, { useEffect, useState, useCallback } from 'react';
import { Grid, Card, CardContent, Typography, Button, Box, IconButton } from '@mui/material';
import { ArrowBack as ArrowBackIcon, ArrowForward as ArrowForwardIcon, Toc as TocIcon } from '@mui/icons-material';
import ContentRenderer from '../components/ContentRenderer'; // Ensure this path is correct
import { PyramidAnimation } from '../components';

interface PostSummary {
    slug: string;
    title: string;
    summary: string;
    contentType?: 'markdown' | 'html' | 'text'; // For summary, usually text or markdown
}

interface PostFull extends PostSummary {
    content: string; // Full content for the blog post
    // contentType for full content is important, ensure it's part of the loaded data
}

const BlogPage: React.FC = () => {
    const [posts, setPosts] = useState<PostSummary[]>([]);
    const [selectedPostSlug, setSelectedPostSlug] = useState<string | null>(null);
    const [currentPost, setCurrentPost] = useState<PostFull | null>(null);
    const [isLoadingPost, setIsLoadingPost] = useState<boolean>(false);

    // Fetch all blog post summaries
    useEffect(() => {
        async function fetchPostsSummary() {
            // Assuming blog summaries are in individual json files in ../blogs/
            // And these files contain slug, title, summary, and optionally contentType for summary
            const files = import.meta.glob('../blogs/*.json');
            const loadedPosts: PostSummary[] = await Promise.all(
                Object.entries(files).map(async ([_, resolver]) => {
                    const module: any = await resolver();
                    return {
                        slug: module.slug,
                        title: module.title,
                        summary: module.summary,
                        contentType: module.contentType || 'markdown', // Default for summary
                    };
                })
            );
            // Sort posts, e.g., by title or a date if available. For now, by title.
            loadedPosts.sort((a, b) => a.title.localeCompare(b.title));
            setPosts(loadedPosts);
        }
        fetchPostsSummary();
    }, []);

    // Fetch full content when a post is selected
    useEffect(() => {
        if (!selectedPostSlug) {
            setCurrentPost(null);
            return;
        }

        async function fetchPostContent() {
            setIsLoadingPost(true);
            // This assumes the same JSON files also contain the full 'content' field
            // or reference to a markdown file. The structure from BlogPost.tsx was:
            // module.content || '' and module.contentType || 'markdown'
            const files = import.meta.glob('../blogs/*.json'); // Re-glob or pass module resolver
            let foundPost: PostFull | null = null;
            for (const path in files) {
                const module: any = await (files[path] as () => Promise<any>)();
                if (module.slug === selectedPostSlug) {
                    foundPost = {
                        slug: module.slug,
                        title: module.title,
                        summary: module.summary, // May not be needed here but good for consistency
                        content: module.content || '', // Ensure 'content' field exists in your JSON
                        contentType: module.contentType || 'markdown',
                    };
                    break;
                }
            }
            setCurrentPost(foundPost);
            setIsLoadingPost(false);
        }

        fetchPostContent();
    }, [selectedPostSlug]);

    const handleSelectPost = (slug: string) => {
        setSelectedPostSlug(slug);
    };

    const handleBackToList = () => {
        setSelectedPostSlug(null);
    };

    const navigatePost = useCallback((direction: 'next' | 'prev') => {
        if (!currentPost || posts.length === 0) return;

        const currentIndex = posts.findIndex(p => p.slug === currentPost.slug);
        if (currentIndex === -1) return;

        let newIndex;
        if (direction === 'next') {
            newIndex = (currentIndex + 1) % posts.length;
        } else {
            newIndex = (currentIndex - 1 + posts.length) % posts.length;
        }
        setSelectedPostSlug(posts[newIndex].slug);
    }, [currentPost, posts]);

    // Scroll navigation between posts
    useEffect(() => {
        if (!selectedPostSlug) return; // Only active when a post is selected

        const handleWheel = (event: WheelEvent) => {
            // Basic horizontal scroll detection for post navigation
            // Adjust threshold and logic as needed
            const scrollThreshold = 50;
            if (Math.abs(event.deltaX) > Math.abs(event.deltaY) && Math.abs(event.deltaX) > scrollThreshold) {
                if (event.deltaX > 0) { // Scroll Right
                    navigatePost('next');
                } else { // Scroll Left
                    navigatePost('prev');
                }
            }
        };

        window.addEventListener('wheel', handleWheel);
        return () => {
            window.removeEventListener('wheel', handleWheel);
        };
    }, [selectedPostSlug, navigatePost]);


    if (isLoadingPost) {
        return <Typography>Loading post...</Typography>;
    }

    if (selectedPostSlug && currentPost) {
        // Individual Post View
        return (
            <Box sx={{ py: { xs: 2, sm: 3, md: 4 } }}> {/* Standardized padding */}
                <PyramidAnimation />
                <Button
                    startIcon={<TocIcon />}
                    onClick={handleBackToList}
                    sx={{
                        mb: 2,
                        color: '#6B4226',
                        '&:hover': { bgcolor: '#F0EAE6' },
                        mt: 4 // Add margin top to separate from pyramid
                    }}
                >
                    Back to Blog List
                </Button>
                <Typography variant="h4" component="h1" gutterBottom sx={{ color: '#6B4226', mt: 1, mb: 2 }}>
                    {currentPost.title}
                </Typography>
                <ContentRenderer content={currentPost.content} contentType={currentPost.contentType || 'markdown'} />
                <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
                    <Button
                        startIcon={<ArrowBackIcon />}
                        onClick={() => navigatePost('prev')}
                        variant="outlined"
                        sx={{ borderColor: '#8B5E3C', color: '#8B5E3C', '&:hover': { borderColor: '#6B4226', bgcolor: '#F0EAE6', color: '#6B4226' } }}
                    >
                        Previous
                    </Button>
                    <Button
                        endIcon={<ArrowForwardIcon />}
                        onClick={() => navigatePost('next')}
                        variant="outlined"
                        sx={{ borderColor: '#8B5E3C', color: '#8B5E3C', '&:hover': { borderColor: '#6B4226', bgcolor: '#F0EAE6', color: '#6B4226' } }}
                    >
                        Next
                    </Button>
                </Box>
            </Box>
        );
    }

    // Blog List View
    return (
        <Box sx={{ py: { xs: 2, sm: 3, md: 4 } }}>
            <PyramidAnimation />
            <Typography variant="h5" gutterBottom sx={{ mb: 3, color: '#6B4226', mt: 4 /* Add margin top to separate from pyramid */ }}>
                Blog Posts
            </Typography>
            {posts.length === 0 && <Typography>No blog posts available yet.</Typography>}
            <Grid container spacing={3}>
                {posts.map(post => (
                    <Grid item xs={12} sm={6} md={4} key={post.slug}>
                        <Card sx={{ boxShadow: 2, borderRadius: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography variant="h6" color="#8B5E3C" gutterBottom sx={{ fontWeight: 'bold' }}>
                                    {post.title}
                                </Typography>
                                <Typography variant="body2" sx={{ mb: 1, color: '#544D45' }}>
                                    {post.summary}
                                </Typography>
                            </CardContent>
                            <Box sx={{ p: 2, pt: 0, mt: 'auto' }}>
                                <Button
                                    onClick={() => handleSelectPost(post.slug)}
                                    variant="contained"
                                    fullWidth
                                    sx={{
                                        bgcolor: '#6B4226',
                                        color: '#FFFFFF',
                                        '&:hover': { bgcolor: '#5A3216' }
                                    }}
                                >
                                    Read More
                                </Button>
                            </Box>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default BlogPage;
