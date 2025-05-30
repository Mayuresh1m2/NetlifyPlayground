import React from 'react';
import ReactMarkdown from 'react-markdown';

interface ContentRendererProps {
    content: string;
    contentType: 'markdown' | 'html' | 'text';
}

const ContentRenderer: React.FC<ContentRendererProps> = ({ content, contentType }) => {
    switch (contentType) {
        case 'html':
            return <div dangerouslySetInnerHTML={{ __html: content }} />;
        case 'markdown':
            return <ReactMarkdown>{content}</ReactMarkdown>;
        case 'text':
        default:
            return <pre style={{ whiteSpace: 'pre-wrap' }}>{content}</pre>;
    }
};

export default ContentRenderer;
