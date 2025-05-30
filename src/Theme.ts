import { createTheme } from '@mui/material/styles';

const warmTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#D97706',  // warm amber/orange
            contrastText: '#fff',
        },
        secondary: {
            main: '#F97316',  // bright orange
        },
        background: {
            default: '#FFF7ED',  // soft warm off-white
            paper: '#FFF1E0',    // paper slightly warmer
        },
        text: {
            primary: '#4B2C20', // warm dark brownish
            secondary: '#7C4A32', // lighter brown
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
