import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
} from '@mui/material';
import SimpleLineChart from '../components/dashboardComponents/SimpleLineChart';
import SimpleTable from '../components/dashboardComponents/SimpleTable';

// Stats for summary cards
const statsData = [
  { title: 'Active Threats', value: '12', color: '#f44336' },  // Red
  { title: 'Protected Systems', value: '247', color: '#03a9f4' }, // Light blue
  { title: 'Weekly Scans', value: '1,430', color: '#7e57c2' }, // Purple
  { title: 'Security Score', value: '89%', color: '#1976d2' }, // Blue
];

const Dashboard: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mt: 2, mb: 4 }}>
        <Typography variant="h4" gutterBottom component="h1" sx={{ fontWeight: 700 }}>
          Security Dashboard
        </Typography>
        <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
          Real-time overview of your security infrastructure and threat landscape
        </Typography>
        
        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {statsData.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper
                elevation={1}
                sx={{
                  p: 3,
                  borderRadius: 2,
                  background: '#ffffff',
                  border: '1px solid rgba(0, 0, 0, 0.04)',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
                  },
                }}
              >
                <Typography variant="h3" component="p" sx={{ fontWeight: 700, mb: 1, color: stat.color }}>
                  {stat.value}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {stat.title}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
      
      <Paper
        elevation={1}
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 2,
          background: '#ffffff',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
        }}
      >
        <Typography variant="h5" gutterBottom component="h2" sx={{ fontWeight: 600, mb: 3 }}>
          Threat Activity
        </Typography>
        <Box sx={{ height: 350 }}>
          <SimpleLineChart />
        </Box>
      </Paper>
      
      <Paper
        elevation={1}
        sx={{
          p: 3,
          borderRadius: 2,
          background: '#ffffff',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
        }}
      >
        <Typography variant="h5" gutterBottom component="h2" sx={{ fontWeight: 600, mb: 3 }}>
          Recent Threats
        </Typography>
        <SimpleTable />
      </Paper>
    </Box>
  );
};

export default Dashboard;