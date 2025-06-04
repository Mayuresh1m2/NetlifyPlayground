import React, { useEffect, useState } from 'react';
import { Avatar, Box, Chip, Grid, Typography, CircularProgress } from '@mui/material';
import ContentRenderer from '../components/ContentRenderer';

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

export default AboutMePage;
