import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { SvgIconComponent } from '@mui/icons-material'; // For MUI icons
import styles from './StoryTile.module.css'; // CSS Modules

interface StoryTileProps {
  title: string;
  icon?: React.ReactElement<SvgIconComponent>; // MUI Icon element
  shortText?: string;
  animationType?: 'fade-in' | 'slide-up'; // Example animation types
  animationDelay?: string; // e.g., '0.2s'
  backgroundColor?: string; // Allow custom background
  variant?: 'default' | 'highlight';
  minHeight?: string | number;
}

const StoryTile: React.FC<StoryTileProps> = ({
  title,
  icon,
  shortText,
  animationType = 'fade-in',
  animationDelay = '0s',
  backgroundColor,
  variant = 'default',
  minHeight = '150px', // Default min height
}) => {
  return (
    <Paper
      elevation={2}
      className={`${styles.storyTile} ${styles[animationType]}`}
      sx={{
        minHeight: minHeight,
        padding: 2,
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: backgroundColor ? backgroundColor : (variant === 'highlight' ? 'secondary.light' : 'background.paper'),
        animationDelay: animationDelay,
        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: (theme) => theme.shadows[6],
        },
      }}
    >
      {icon && (
        <Box mb={1} sx={{ color: variant === 'highlight' ? 'secondary.contrastText' : 'primary.main' }}>
          {React.cloneElement(icon, { sx: { fontSize: 40 } })}
        </Box>
      )}
      <Typography variant="h6" component="h3" sx={{ mb: shortText ? 0.5 : 0, color: variant === 'highlight' ? 'secondary.contrastText' : 'text.primary', fontWeight: 'bold' }}>
        {title}
      </Typography>
      {shortText && (
        <Typography variant="body2" sx={{ color: variant === 'highlight' ? 'secondary.contrastText' : 'text.secondary' }}>
          {shortText}
        </Typography>
      )}
    </Paper>
  );
};

export default StoryTile;
