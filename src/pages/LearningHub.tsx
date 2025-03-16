import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const LearningHub: React.FC = () => {
  return (
    <Paper sx={{ p: 3, m: 3, borderRadius: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Security Learning Hub
      </Typography>
      <Typography variant="body1">
        Educational resources created by Manhattanville University cybersecurity students.
      </Typography>
    </Paper>
  );
};

export default LearningHub;