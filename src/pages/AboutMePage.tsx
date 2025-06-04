import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Avatar, Box } from '@mui/material';
import ContentRenderer from '../components/ContentRenderer'; // Assuming ContentRenderer is in this path

interface AboutData {
    content: string;
    contentType: 'markdown' | 'html' | 'text';
    profileImageUrl: string;
}

const AboutMePage: React.FC = () => {
    const [aboutData, setAboutData] = useState<AboutData | null>(null);

    useEffect(() => {
        async function fetchAbout() {
            // Adjust the path if your about.json is located elsewhere
            const aboutModule = await import('../data/about.json');
            setAboutData(aboutModule);
        }

        fetchAbout();
    }, []);

    return (
        <>
            <Typography variant="h5" gutterBottom sx={{ mt: 2, mb: 3, color: '#6B4226' }}>
                About Me
            </Typography>

            {aboutData ? (
                <Card sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, mb: 6, boxShadow: '0 4px 12px rgba(0,0,0,0.08)', borderRadius: 3 /* Removed bgcolor to inherit from page */ }}>
                    <Box sx={{ p: { xs: 2, sm: 3 }, display: 'flex', justifyContent: { xs: 'center', sm: 'flex-start' }, alignItems: 'center' }}>
                        <Avatar
                            alt="User Profile" // Consider making alt text dynamic if possible
                            src={aboutData.profileImageUrl}
                            sx={{ width: { xs: 100, sm: 120 }, height: { xs: 100, sm: 120 }, borderRadius: 3, boxShadow: 2 }}
                        />
                    </Box>
                    <CardContent sx={{ flex: 1, paddingLeft: { sm: 2 }, paddingTop: { xs:1, sm:2 }, paddingBottom: {xs:2, sm:1} }}>
                        <ContentRenderer content={aboutData.content} contentType={aboutData.contentType} />
                    </CardContent>
                </Card>
            ) : (
                <Typography>Loading About Me information...</Typography>
            )}
        </>
    );
};

export default AboutMePage;
