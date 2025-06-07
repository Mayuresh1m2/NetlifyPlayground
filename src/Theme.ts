import { createTheme } from '@mui/material/styles';

const warmTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#5D737E',  // New primary color
            contrastText: '#FFFFFF', // Contrast for new primary
        },
        secondary: {
            main: '#8C9EA3',  // New secondary color
            contrastText: '#000000', // Contrast for new secondary
        },
        background: {
            default: '#EAEAEA',  // New background default
            paper: '#F5F5F5',    // New background paper
        },
        text: {
            primary: '#333333', // New text primary
            secondary: '#555555', // New text secondary
        },
    },
    typography: {
        fontFamily: `'Montserrat', 'Roboto', 'Helvetica', 'Arial', sans-serif`,
        h4: {
            fontWeight: 700,
            letterSpacing: '0.1em',
        },
        body1: {
            fontSize: '1.1rem',
            lineHeight: 1.6,
        },
    },
    shape: {
        borderRadius: 12,
    },
});

export default warmTheme;
