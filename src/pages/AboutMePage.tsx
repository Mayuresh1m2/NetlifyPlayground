import React, { useEffect, useState } from 'react';
import { Avatar, Box, Chip, Grid, Typography, CircularProgress } from '@mui/material';
import ContentRenderer from '../components/ContentRenderer';
import usePerformanceMeasure from '../hooks/usePerformanceMeasure'; // Import the hook

const AboutMePage: React.FC = () => {
    usePerformanceMeasure('AboutMePage'); // Instrument AboutMePage component

    const [profileImageUrl, setProfileImageUrl] = useState<string>("");
    const [mainContentMd, setMainContentMd] = useState<string>(""); // For headline & intro
    const [skills, setSkills] = useState<string[]>([]); // For the keyExpertise array
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [contentType, setContentType] = useState<'markdown' | 'html' | 'text'>('markdown');


    useEffect(() => {
        async function fetchAboutData() {
            setIsLoading(true);
            try {
                const aboutModule = await import('../data/about.json');

                setProfileImageUrl(aboutModule.profileImageUrl);
                setContentType(aboutModule.contentType as 'markdown' | 'html' | 'text' || 'markdown');
                setMainContentMd(aboutModule.content || ""); // Main markdown content
                setSkills(aboutModule.keyExpertise || []); // Directly use the keyExpertise array

            } catch (error) {
                console.error("Error fetching about data:", error);
                setMainContentMd("Error loading content.");
                setSkills([]);
            } finally {
                setIsLoading(false);
            }
        }

        fetchAboutData();
    }, []);

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                <CircularProgress sx={{ color: '#6B4226' }} />
            </Box>
        );
    }

    return (
        <Box sx={{ py: { xs: 2, sm: 3, md: 4 } }}>
            <Grid container spacing={{ xs: 2, md: 4 }} alignItems="flex-start"> {/* Changed to flex-start for better alignment if text is short */}
                <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                    <Avatar
                        alt="Backend Developer" // Updated alt text
                        src={profileImageUrl}
                        variant="rounded" // Makes it a square with rounded corners, common for profiles
                        sx={{
                            width: { xs: 150, sm: 200, md: 220 }, // Responsive size
                            height: { xs: 150, sm: 200, md: 220 },
                            mb: { xs: 2, md: 0 }, // Margin bottom on small screens, none on medium+
                            mx: { xs: 'auto', md: 0 },
                            boxShadow: 3,
                            border: '3px solid #FFF8F0' // Optional: subtle border
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={8}>
                    {/* ContentRenderer will handle the markdown for headline and intro */}
                    <ContentRenderer content={mainContentMd} contentType={contentType} />
                </Grid>
            </Grid>

            {skills.length > 0 && (
                <Box sx={{ mt: { xs: 4, sm: 5, md: 6 } }}> {/* Responsive top margin */}
                    <Typography variant="h5" component="h2" gutterBottom
                        sx={{
                            color: '#6B4226',
                            fontWeight: 'bold',
                            borderBottom: '2px solid #8B5E3C', // Visual separator
                            pb: 1, // Padding bottom for the border
                            mb: 3 // Margin bottom for spacing before chips
                        }}
                    >
                        Key Expertise
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}> {/* Increased gap slightly */}
                        {skills.map((skill, index) => (
                            <Chip
                                key={index}
                                label={skill}
                                variant="filled" // Changed to filled for more pop
                                sx={{
                                    bgcolor: '#E0CDB6', // A lighter brown/beige shade from the palette
                                    color: '#3E2723', // Darker text for contrast
                                    fontWeight: 500,
                                    fontSize: '0.875rem',
                                    p: '0.5rem 0.75rem', // More padding
                                    '&:hover': {
                                        bgcolor: '#D3BFA8'
                                    }
                                }}
                            />
                        ))}
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default React.memo(AboutMePage);
