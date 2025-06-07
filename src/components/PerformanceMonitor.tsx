import React from 'react';
import { Box, Paper, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';
import { usePerformanceContext } from '../contexts/PerformanceContext';

const PerformanceMonitor: React.FC = () => {
  const { timings } = usePerformanceContext();

  const sortedTimings = Object.entries(timings)
    // Filter out any null/undefined timings if any, though current context only sets numbers
    .filter(([, duration]) => duration !== null && duration !== undefined)
    // Sort by component name for consistent order
    .sort(([nameA], [nameB]) => nameA.localeCompare(nameB));

  if (sortedTimings.length === 0) {
    // Optionally, don't render anything or render a placeholder if no timings yet
    // For debugging, it's good to see it's active:
    // return (
    //   <Paper
    //     elevation={3}
    //     sx={{
    //       position: 'fixed',
    //       bottom: 16,
    //       right: 16,
    //       p: 1,
    //       bgcolor: 'rgba(255, 255, 255, 0.9)',
    //       zIndex: 1500,
    //       maxWidth: '300px',
    //       fontSize: '0.75rem'
    //     }}
    //   >
    //     <Typography variant="caption">PerfMon: No timings yet.</Typography>
    //   </Paper>
    // );
    return null; // Render nothing if no timings, to be less intrusive
  }

  return (
    <Paper
      elevation={4}
      sx={{
        position: 'fixed',
        bottom: 16,
        right: 16,
        p: 1.5,
        bgcolor: 'rgba(255, 255, 255, 0.95)', // Slightly more opaque
        backdropFilter: 'blur(2px)', // Subtle blur for modern look
        zIndex: 1500, // Ensure it's above other content
        maxWidth: '350px', // Limit width
        maxHeight: '40vh', // Limit height
        overflowY: 'auto', // Scroll if many timings
        borderRadius: '8px', // Softer corners
        boxShadow: '0px 4px 20px rgba(0,0,0,0.2)' // More prominent shadow
      }}
    >
      <Typography variant="subtitle2" sx={{ pb: 0.5, color: '#3E2723', borderBottom: '1px solid #E0CDB6', mb:1 }}>
        Load Times:
      </Typography>
      <List dense disablePadding>
        {sortedTimings.map(([componentName, duration]) => (
          <ListItem key={componentName} disableGutters sx={{py: 0.25}}>
            <ListItemText
              primary={
                <Typography variant="caption" sx={{ color: '#5D4037', fontWeight:'medium' }}>
                  {componentName}
                </Typography>
              }
              secondary={
                <Typography variant="caption" sx={{ color: '#6B4226' }}>
                  {`${(duration as number).toFixed(2)} ms`}
                </Typography>
              }
              sx={{m:0}}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default React.memo(PerformanceMonitor);
