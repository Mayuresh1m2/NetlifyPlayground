import React, { useEffect, useState } from 'react';
import { Avatar, Box, Chip, Grid, Typography, CircularProgress, Paper } from '@mui/material';
import ContentRenderer from '../components/ContentRenderer';
import { DynamicSilhouette, StoryTile } from '../components';
import CodeIcon from '@mui/icons-material/Code';
import PublicIcon from '@mui/icons-material/Public'; // For "World changing"
import SmartToyIcon from '@mui/icons-material/SmartToy'; // For "Machines taking over"

const AboutMePage: React.FC = () => {
    const [profileImageUrl, setProfileImageUrl] = useState<string>("");
    const [mainContentMd, setMainContentMd] = useState<string>("");
    const [skills, setSkills] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [contentType, setContentType] = useState<'markdown' | 'html' | 'text'>('markdown');


    useEffect(() => {
        async function fetchAndParseAbout() {
            setIsLoading(true);
            try {
                // The dynamic import() needs to be exactly as written for Vite/Vitest to handle it,
                // especially with mocking. Using a variable for the path might complicate mocking.
                const aboutModule = await import('../data/about.json');

                setProfileImageUrl(aboutModule.profileImageUrl);
                setContentType(aboutModule.contentType as 'markdown' | 'html' | 'text' || 'markdown');

                const rawContent = aboutModule.content || "";
                const expertiseTitle = "## Key Expertise";
                const expertiseTitleAlternate = "### Key Expertise"; // Handle h3 as well

                let expertiseIndex = rawContent.indexOf(expertiseTitle);
                let actualExpertiseTitle = expertiseTitle;

                if (expertiseIndex === -1) {
                    expertiseIndex = rawContent.indexOf(expertiseTitleAlternate);
                    actualExpertiseTitle = expertiseTitleAlternate;
                }

                if (expertiseIndex !== -1) {
                    setMainContentMd(rawContent.substring(0, expertiseIndex).trim());
                    const skillsSection = rawContent.substring(expertiseIndex + actualExpertiseTitle.length).trim();

                    const skillItems = skillsSection.split('\n')
                        .map(line => line.trim())
                        .filter(line => line.startsWith('*   ') || line.startsWith('-   '))
                        .map(line => {
                            // Remove list marker (e.g., "*   ") and any bolding around the skill name itself
                            let skill = line.substring(line.indexOf('   ') + 3).trim();
                            // Example: "**Backend Development**: Java, Python, Go" -> "Backend Development: Java, Python, Go"
                            skill = skill.replace(/\*\*(.*?)\*\*:(.*)/, '$1:$2'); // More specific: removes ** from "Skill Name:**"
                            skill = skill.replace(/\*\*(.*?)\*\*/, '$1'); // General bold removal if any
                            return skill;
                        });
                    setSkills(skillItems);
                } else {
                    setMainContentMd(rawContent);
                    setSkills([]);
                }
            } catch (error) {
                console.error("Error fetching or parsing about data:", error);
                setMainContentMd("Error loading content.");
                setSkills([]);
            } finally {
                setIsLoading(false);
            }
        }

        fetchAndParseAbout();
    }, []);

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                <CircularProgress color="primary" /> {/* Use theme color */}
            </Box>
        );
    }

    return (
        <Box sx={{ py: { xs: 2, sm: 3, md: 4 } }}>
            <Grid container spacing={{ xs: 2, md: 4 }} alignItems="flex-start">
                {/* Left Column: Tiles, Avatar, Silhouette */}
                <Grid item xs={12} md={5}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Paper elevation={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 2, height: '100%', minHeight: {xs: 200, sm: 'auto'}, bgcolor: 'background.paper' }}>
                                <Avatar
                                    alt="Backend Developer"
                                    src={profileImageUrl}
                                    variant="rounded"
                                    sx={{
                                        width: { xs: 120, sm: 150 },
                                        height: { xs: 120, sm: 150 },
                                        boxShadow: 3,
                                        border: (theme) => `3px solid ${theme.palette.background.default}` // Contrast with paper
                                    }}
                                />
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                             <StoryTile
                                title="Dev Hard at Work"
                                icon={<CodeIcon />}
                                shortText="Crafting digital solutions."
                                animationDelay="0.1s"
                                minHeight={{xs: 120, sm: '100%'}}
                             />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Paper elevation={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 1, height: '100%', minHeight: {xs: 150, sm: 'auto'}, bgcolor: 'background.paper' }}>
                                <DynamicSilhouette />
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <StoryTile
                                title="Embracing Change"
                                icon={<PublicIcon />}
                                shortText="The ever-evolving tech landscape."
                                animationDelay="0.2s"
                                backgroundColor="secondary.main" // Example using secondary color
                                variant="highlight"
                                minHeight={{xs: 120, sm: '100%'}}
                            />
                        </Grid>
                         <Grid item xs={12}>
                            <StoryTile
                                title="Future of AI"
                                icon={<SmartToyIcon />}
                                shortText="Exploring new frontiers."
                                animationDelay="0.3s"
                                minHeight={{xs: 120, sm: 'auto'}}
                            />
                        </Grid>
                    </Grid>
                </Grid>

                {/* Right Column: Main Content */}
                <Grid item xs={12} md={7}>
                    <ContentRenderer content={mainContentMd} contentType={contentType} />
                </Grid>
            </Grid>

            {skills.length > 0 && (
                <Box sx={{ mt: { xs: 4, sm: 5, md: 6 } }}> {/* Responsive top margin */}
                    <Typography variant="h5" component="h2" gutterBottom
                        sx={{
                            color: 'text.primary', // Use theme color
                            fontWeight: 'bold',
                            borderBottom: (theme) => `2px solid ${theme.palette.divider}`, // Use theme color
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
                                variant="filled"
                                sx={{
                                    bgcolor: 'secondary.main', // Use theme color
                                    color: 'secondary.contrastText', // Use theme color
                                    fontWeight: 500,
                                    fontSize: '0.875rem',
                                    p: '0.5rem 0.75rem',
                                    '&:hover': {
                                        bgcolor: 'secondary.dark' // Use theme color (or a calculated darker shade)
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

export default AboutMePage;
