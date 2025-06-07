import { createTheme } from '@mui/material/styles';

const warmTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#007BFF',  // Professional Blue
            contrastText: '#FFFFFF',
        },
        secondary: {
            main: '#28A745',  // Professional Green
            contrastText: '#FFFFFF',
        },
        background: {
            default: '#F8F9FA',  // Off-white
            paper: '#FFFFFF',    // White
        },
        text: {
            primary: '#212529', // Near black
            secondary: '#495057', // Dark gray
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
