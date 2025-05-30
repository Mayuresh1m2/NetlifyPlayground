import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import matter from 'gray-matter';

const BlogPost: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const [content, setContent] = useState<string>('');

    useEffect(() => {
        if (slug) {
            import(`../blogs/${slug}.md`).then(module => {
                fetch(module.default).then(res => res.text()).then(text => {
                    const { content } = matter(text);
                    setContent(content);
                });
            });
        }
    }, [slug]);

    return (
        <section>
            <ReactMarkdown>{content}</ReactMarkdown>
        </section>
    );
};

export default BlogPost;