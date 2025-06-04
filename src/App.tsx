import React, { useState, useEffect, useMemo } from 'react';
import { Container, Button, Box, AppBar, Toolbar, Typography } from '@mui/material';

import Footer from './components/Footer';
import AboutMePage from './pages/AboutMePage';
import ContactPage from './pages/ContactPage';
import BlogPage from './pages/BlogPage';

type Section = "About Me" | "Contact" | "Blog";

const App: React.FC = () => {
    const [currentSection, setCurrentSection] = useState<Section>("About Me");
    const [opacity, setOpacity] = useState(1);
    const [displayedSectionKey, setDisplayedSectionKey] = useState<Section>("About Me");

    // Debounce for scroll navigation
    const [isScrolling, setIsScrolling] = useState(false);


    useEffect(() => {
        const handleWheel = (event: WheelEvent) => {
            if (isScrolling) return;

            const scrollThreshold = 20; // Slightly increased threshold
            let navigated = false;

            if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) { // Horizontal
                if (event.deltaX > scrollThreshold && currentSection === "About Me") {
                    setCurrentSection("Contact");
                    navigated = true;
                } else if (event.deltaX < -scrollThreshold && currentSection === "Contact") {
                    setCurrentSection("About Me");
                    navigated = true;
                }
            } else { // Vertical
                if (event.deltaY > scrollThreshold && currentSection === "About Me") {
                    setCurrentSection("Blog");
                    navigated = true;
                } else if (event.deltaY < -scrollThreshold && currentSection === "Blog") {
                    setCurrentSection("About Me");
                    navigated = true;
                }
            }

            if (navigated) {
                setIsScrolling(true);
                setTimeout(() => setIsScrolling(false), 700); // Cooldown period for scroll
            }
        };

        window.addEventListener('wheel', handleWheel, { passive: false }); // Consider passive based on final behavior
        return () => {
            window.removeEventListener('wheel', handleWheel);
        };
    }, [currentSection, isScrolling]);

    useEffect(() => {
        setOpacity(0); // Start fade out
        const timer = setTimeout(() => {
            setDisplayedSectionKey(currentSection); // Change content after fade out starts
            setOpacity(1); // Start fade in
        }, 300); // Duration of fade out, should match CSS transition duration
        return () => clearTimeout(timer);
    }, [currentSection]);

    const renderedPage = useMemo(() => {
        switch (displayedSectionKey) {
            case "About Me":
                return <AboutMePage />;
            case "Contact":
                return <ContactPage />;
            case "Blog":
                return <BlogPage />;
            default:
                return <AboutMePage />;
        }
    }, [displayedSectionKey]);

    const NavButton = ({ sectionName }: { sectionName: Section }) => (
        <Button
            variant={currentSection === sectionName ? "contained" : "text"}
            onClick={() => setCurrentSection(sectionName)}
            sx={{
                mx: 1,
                color: currentSection === sectionName ? '#FFF' : '#6B4226', // White text for contained, theme color for text
                bgcolor: currentSection === sectionName ? '#6B4226' : 'transparent', // Theme color for contained background
                '&:hover': {
                    bgcolor: currentSection === sectionName ? '#5A3216' : '#F0EAE6', // Darker theme color on hover for contained
                }
            }}
        >
            {sectionName}
        </Button>
    );

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#FFF8F0' }}>
            <AppBar position="sticky" sx={{ bgcolor: '#FFF8F0', boxShadow: '0 2px 4px -1px rgba(107, 66, 38, 0.2)', zIndex: 1200 }}>
                <Container maxWidth="md">
                    <Toolbar sx={{ justifyContent: 'space-between', padding: { xs: 0 } }}>
                        <Typography variant="h6" sx={{ color: '#6B4226', fontWeight: 'bold' }}>
                            MySite
                        </Typography>
                        <Box>
                            <NavButton sectionName="About Me" />
                            <NavButton sectionName="Contact" />
                            <NavButton sectionName="Blog" />
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            <Container component="main" maxWidth="md" sx={{ flexGrow: 1, py: 3 }}>
                <Box
                    key={displayedSectionKey} // Ensures component re-renders for transition, not strictly needed with opacity alone
                    sx={{
                        opacity: opacity,
                        transition: 'opacity 0.3s ease-in-out',
                        minHeight: 'calc(100vh - 200px)', // Ensure content area doesn't jump too much
                    }}
                >
                    {renderedPage}
                </Box>
            </Container>
            <Footer />
        </Box>
    );
};

export default App;
