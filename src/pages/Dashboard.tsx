import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Avatar,
  Chip,
  LinearProgress,
  useTheme,
} from '@mui/material';

// Icons
import WarningIcon from '@mui/icons-material/Warning';
import SecurityIcon from '@mui/icons-material/Security';
import ScannerIcon from '@mui/icons-material/Scanner';
import GppGoodIcon from '@mui/icons-material/GppGood';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

// Components
import SimpleLineChart from '../components/dashboardComponents/SimpleLineChart';
import SimpleTable from '../components/dashboardComponents/SimpleTable';

// Types
interface StatData {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
  trend?: {
    value: string;
    isUp: boolean;
  };
}

const Dashboard: React.FC = () => {
  const theme = useTheme();

  // Stats data for cards
  const statsData: StatData[] = [
    { 
      title: 'Active Threats', 
      value: '12', 
      icon: <WarningIcon />, 
      color: '#f44336',
      trend: {
        value: '8.5%',
        isUp: true
      }
    },
    { 
      title: 'Protected Systems', 
      value: '247', 
      icon: <SecurityIcon />, 
      color: '#03a9f4' 
    },
    { 
      title: 'Weekly Scans', 
      value: '1,430', 
      icon: <ScannerIcon />, 
      color: '#7e57c2' 
    },
    { 
      title: 'Security Score', 
      value: '89%', 
      icon: <GppGoodIcon />, 
      color: '#1976d2',
      trend: {
        value: '2.1%',
        isUp: true
      }
    },
  ];

  // Activity stats
  const activityStats = [
    {
      title: 'Total Scans',
      value: '1,630',
      trend: {
        value: '+12.5%',
        isUp: true,
        text: 'from last week'
      },
      color: theme.palette.primary.main
    },
    {
      title: 'Total Threats',
      value: '57',
      trend: {
        value: '+23.8%',
        isUp: true,
        text: 'from last week'
      },
      color: '#f44336'
    },
    {
      title: 'Defense Rate',
      value: '93.4%',
      trend: {
        value: '+2.1%',
        isUp: true,
        text: 'from last week'
      },
      color: theme.palette.secondary.main
    }
  ];

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
                {stat.trend && (
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    {stat.trend.isUp ? 
                      <TrendingUpIcon sx={{ color: stat.color, fontSize: 16, mr: 0.5 }} /> : 
                      <TrendingDownIcon sx={{ color: stat.color, fontSize: 16, mr: 0.5 }} />
                    }
                    <Typography variant="caption" sx={{ fontWeight: 500, color: stat.color }}>
                      {stat.trend.value} from last week
                    </Typography>
                  </Box>
                )}
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
        
        <Grid container spacing={3} sx={{ mb: 3 }}>
          {activityStats.map((stat, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper 
                elevation={1}
                sx={{
                  p: 2,
                  backgroundColor: `${stat.color}08`,
                  borderRadius: 2,
                  border: `1px solid ${stat.color}20`
                }}
              >
                <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                  {stat.title}
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 700, color: stat.color }}>
                  {stat.value}
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600, color: stat.color }}>
                  {stat.trend.value} {stat.trend.text}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
        
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