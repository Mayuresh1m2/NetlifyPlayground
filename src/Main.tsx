import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import warmTheme from './Theme';
import { PerformanceProvider } from './contexts/PerformanceContext'; // Import the provider
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ThemeProvider theme={warmTheme}>
            <CssBaseline />
            <PerformanceProvider> {/* Wrap App with PerformanceProvider */}
                <App />
            </PerformanceProvider>
        </ThemeProvider>
    </React.StrictMode>
);
