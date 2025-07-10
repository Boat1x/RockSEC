import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Stack
} from '@mui/material';

// Create a simple dashboard that doesn't rely on backend API calls
const SimpleDashboard: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Paper
        variant="outlined"
        sx={{ borderRadius: 2, p: 3, mb: 4 }}
      >
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
          RockSEC Dashboard
        </Typography>
        
        <Stack spacing={3}>
          <Typography variant="body1">
            Welcome to RockSEC Dashboard. This is a simplified version to test rendering.
          </Typography>
          
          <Box>
            <Button 
              variant="contained" 
              color="primary"
              onClick={() => alert('Button clicked!')}
            >
              Test Button
            </Button>
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
};

export default SimpleDashboard;
