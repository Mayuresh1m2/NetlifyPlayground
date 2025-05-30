import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ContentRenderer from '../components/ContentRenderer';

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
                    setContent(module.content || '');
                    setContentType(module.contentType || 'markdown');
                    return;
                }
            }
            setContent(null); // Not found
        })();
    }, [slug]);

    if (!content) return <p>Loading or Blog not found...</p>;

    return (
        <section>
            <ContentRenderer content={content} contentType={contentType ?? 'markdown'} />
        </section>
    );
};

export default BlogPost;
