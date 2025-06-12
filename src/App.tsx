import React, { useState, useEffect, useMemo } from 'react';
import { Container, Button, Box, AppBar, Toolbar, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

import Footer from './components/Footer';
import AboutMePage from './pages/AboutMePage';
import ContactPage from './pages/ContactPage';
import BlogPage from './pages/BlogPage';

type Section = "About Me" | "Contact" | "Blog";

const App: React.FC = () => {
    const [currentSection, setCurrentSection] = useState<Section>("About Me");
    const [opacity, setOpacity] = useState(1);
    const [transform, setTransform] = useState<string>('none');
    const [displayedSectionKey, setDisplayedSectionKey] = useState<Section>(currentSection);
    const [prevSectionKey, setPrevSectionKey] = useState<Section>(currentSection);

    // Debounce for scroll navigation
    const [isScrolling, setIsScrolling] = useState(false);


    useEffect(() => {
        const handleWheel = (event: WheelEvent) => {
            // --- CONSOLE LOG ADDED FOR DEBUGGING ---
            console.log(`handleWheel event: deltaX=${event.deltaX}, deltaY=${event.deltaY}, currentSection=${currentSection}, isScrolling=${isScrolling}`);

            if (isScrolling) return;

            const scrollThreshold = 20; // Slightly increased threshold
            let navigated = false;

            // --- CONSOLE LOG ADDED FOR DEBUGGING ---
            console.log(`Values before logic: abs(deltaX)=${Math.abs(event.deltaX)}, abs(deltaY)=${Math.abs(event.deltaY)}, scrollThreshold=${scrollThreshold}`);

            if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) { // Horizontal
                // --- CONSOLE LOG ADDED FOR DEBUGGING ---
                console.log("Processing horizontal scroll");
                if (event.deltaX > scrollThreshold && currentSection === "About Me") {
                    console.log("Condition met: Navigating About Me -> Contact");
                    setCurrentSection("Contact");
                    navigated = true;
                } else if (event.deltaX < -scrollThreshold && currentSection === "Contact") {
                    console.log("Condition met: Navigating Contact -> About Me");
                    setCurrentSection("About Me");
                    navigated = true;
                }
            } else { // Vertical
                // --- CONSOLE LOG ADDED FOR DEBUGGING ---
                console.log("Processing vertical scroll");
                if (event.deltaY > scrollThreshold && currentSection === "About Me") {
                    console.log("Condition met: Navigating About Me -> Blog");
                    setCurrentSection("Blog");
                    navigated = true;
                } else if (event.deltaY < -scrollThreshold && currentSection === "Blog") {
                    console.log("Condition met: Navigating Blog -> About Me");
                    setCurrentSection("About Me");
                    navigated = true;
                }
            }

            if (navigated) {
                console.log(`Navigation occurred, setting isScrolling=true. New section should be ${currentSection} (but state update is async)`);
                setIsScrolling(true);
                setTimeout(() => {
                    console.log("setIsScrolling(false) after timeout.");
                    setIsScrolling(false);
                }, 700); // Cooldown period for scroll
            } else {
                console.log("No navigation condition met.");
            }
        };

        window.addEventListener('wheel', handleWheel, { passive: false });
        return () => {
            window.removeEventListener('wheel', handleWheel);
        };
    }, [currentSection, isScrolling]);

    useEffect(() => {
        let exitTransform = 'none';
        let upcomingEnterTransform = 'none';
        const slideAmount = '30px'; // How much to slide

        if (prevSectionKey !== currentSection) { // Only run if section actually changed
            if (prevSectionKey === "About Me" && currentSection === "Contact") { // Slide Left
                exitTransform = `translateX(-${slideAmount})`;
                upcomingEnterTransform = `translateX(${slideAmount})`;
            } else if (prevSectionKey === "Contact" && currentSection === "About Me") { // Slide Right
                exitTransform = `translateX(${slideAmount})`;
                upcomingEnterTransform = `translateX(-${slideAmount})`;
            } else if (prevSectionKey === "About Me" && currentSection === "Blog") { // Slide Up (content moves up)
                exitTransform = `translateY(-${slideAmount})`;
                upcomingEnterTransform = `translateY(${slideAmount})`;
            } else if (prevSectionKey === "Blog" && currentSection === "About Me") { // Slide Down (content moves down)
                exitTransform = `translateY(${slideAmount})`;
                upcomingEnterTransform = `translateY(-${slideAmount})`;
            }
            // Default for other transitions (e.g., Contact <-> Blog) will be a fade if not specified here

            setOpacity(0);
            setTransform(exitTransform);

            const timer = setTimeout(() => {
                setDisplayedSectionKey(currentSection);
                setTransform(upcomingEnterTransform); // Set initial position for new content before fade-in

                // Use a nested requestAnimationFrame or a very short timeout to ensure the transform is applied before opacity change
                requestAnimationFrame(() => {
                    setOpacity(1);
                    setTransform('none'); // Slide to final position
                });

                setPrevSectionKey(currentSection); // Update prevSectionKey after transition starts for next cycle
            }, 300); // This duration should match the CSS transition for exit phase

            return () => clearTimeout(timer);
        }
    }, [currentSection, prevSectionKey]);

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

    const NavButton = ({ sectionName, startIcon, endIcon }: {
        sectionName: Section;
        startIcon?: React.ReactNode;
        endIcon?: React.ReactNode;
    }) => (
        <Button
            variant={currentSection === sectionName ? "contained" : "text"}
            onClick={() => setCurrentSection(sectionName)}
            startIcon={startIcon}
            endIcon={endIcon}
            sx={(theme) => ({ // Wrapped with (theme) => ({...})
                mx: 1,
                minWidth: 'auto', // Allow button to be smaller if only icon + short text
                paddingLeft: endIcon ? '12px' : (startIcon ? '8px' : '12px'), // Adjust padding based on icons
                paddingRight: startIcon ? '12px' : (endIcon ? '8px' : '12px'),
                transition: 'all 0.2s ease-in-out', // Smooth transitions
                // Updated colors to use theme.palette
                color: currentSection === sectionName ? theme.palette.primary.contrastText : theme.palette.text.primary,
                bgcolor: currentSection === sectionName ? theme.palette.primary.main : 'transparent',
                '&:hover': {
                    bgcolor: currentSection === sectionName ? theme.palette.primary.dark : theme.palette.action.hover,
                    transform: 'scale(1.03)', // Slight scale up on hover
                },
                '&:active': {
                    transform: 'scale(0.97)', // Slight scale down on click
                },
                // Styling for the icons themselves if needed
                '.MuiButton-startIcon .MuiSvgIcon-root': {
                    fontSize: '1.1rem', // Example size
                    marginRight: '4px', // Space between icon and text
                },
                '.MuiButton-endIcon .MuiSvgIcon-root': {
                    fontSize: '1.1rem', // Example size
                    marginLeft: '4px', // Space between text and icon
                } // End of styles object
            })}
        >
            {sectionName}
        </Button>
    );

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}> {/* Removed hardcoded bgcolor */}
            <AppBar position="sticky" sx={{ bgcolor: 'primary.main', boxShadow: '0 2px 4px -1px rgba(0,0,0,0.2)', zIndex: 1200 }}> {/* Use theme primary for AppBar */}
                <Container maxWidth="md">
                    <Toolbar sx={{ justifyContent: 'space-between', padding: { xs: 0 } }}>
                        <Typography variant="h6" sx={{ color: 'primary.contrastText', fontWeight: 'bold' }}> {/* Use contrast text for AppBar title */}
                            Developer Portfolio
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <NavButton sectionName="About Me" />
                            <NavButton
                                sectionName="Contact"
                                endIcon={currentSection === "About Me" ? <ArrowForwardIcon sx={{ fontSize: '1rem', color: currentSection === "Contact" ? 'primary.contrastText' : 'text.secondary' }} /> : undefined}
                            />
                            <NavButton
                                sectionName="Blog"
                                endIcon={currentSection === "About Me" ? <ArrowDownwardIcon sx={{ fontSize: '1rem', color: currentSection === "Blog" ? 'primary.contrastText' : 'text.secondary' }} /> : undefined}
                            />
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            <Container component="main" maxWidth="md" sx={{ flexGrow: 1, py: 3, bgcolor: 'background.default' }}> {/* Ensure main content area also uses theme background */}
                <Box
                    key={displayedSectionKey} // Ensures component re-renders for transition, not strictly needed with opacity alone
                    sx={{
                        opacity: opacity,
                        transform: transform,
                        transition: 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out',
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
