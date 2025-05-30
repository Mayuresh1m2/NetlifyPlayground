import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import ReactMarkdown from 'react-markdown';

interface Blog {
    slug: string;
    title: string;
    summary: string;
    date: string;
    contentType: 'markdown' | 'html' | 'text';
    content: string;
}

const BlogPost: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const [blog, setBlog] = useState<Blog | null>(null);

    useEffect(() => {
        if (!slug) return;

        import(`../blogs/${slug}.json`)
            .then(module => setBlog(module.default))
            .catch(error => {
                console.error('Failed to load blog:', error);
                setBlog(null);
            });
    }, [slug]);

    if (blog === null) return <Typography>Loading or Blog not found...</Typography>;

    return (
        <article>
            <Typography variant="h3" gutterBottom>{blog.title}</Typography>
            <Typography variant="subtitle1" color="textSecondary" gutterBottom>{blog.date}</Typography>

            {blog.contentType === 'markdown' && (
                <ReactMarkdown>{blog.content}</ReactMarkdown>
            )}

            {blog.contentType === 'html' && (
                <div dangerouslySetInnerHTML={{ __html: blog.content }} />
            )}

            {blog.contentType === 'text' && (
                <Typography>{blog.content}</Typography>
            )}
        </article>
    );
};

export default BlogPost;
