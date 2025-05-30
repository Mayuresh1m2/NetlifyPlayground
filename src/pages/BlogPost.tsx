import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

const BlogPost: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const [content, setContent] = useState<string | null>(null);
    const [contentType, setContentType] = useState<'markdown' | 'html' | 'text' | null>(null);

    useEffect(() => {
        const files = import.meta.glob('../blogs/*.json');

        (async () => {
            for (const path in files) {
                const module: any = await files[path]();
                if (module.slug === slug) {
                    setContentType(module.contentType || 'markdown');
                    setContent(module.content || '');
                    return;
                }
            }

            setContent(null); // Not found
        })();
    }, [slug]);

    if (!content) return <p>Loading or Blog not found...</p>;

    return (
        <section>
            {contentType === 'html' ? (
                <div dangerouslySetInnerHTML={{ __html: content }} />
            ) : contentType === 'markdown' ? (
                <ReactMarkdown>{content}</ReactMarkdown>
            ) : (
                <pre style={{ whiteSpace: 'pre-wrap' }}>{content}</pre>
            )}
        </section>
    );
};

export default BlogPost;
