import React, { useState } from 'react';
import {
  AppBar,
  Badge,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  Toolbar,
  Typography,
  Divider,
  useTheme,
  ThemeProvider,
  createTheme,
  Box,
  Avatar,
  Paper,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ShieldIcon from '@mui/icons-material/Shield';
import { mainListItems, secondaryListItems } from '../components/dashboardComponents/listItems';
import SimpleLineChart from '../components/dashboardComponents/SimpleLineChart';
import SimpleTable from '../components/dashboardComponents/SimpleTable';

const drawerWidth = 260;

// Create a dark theme
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#6200ea',
    },
    secondary: {
      main: '#03dac6',
    },
    error: {
      main: '#cf6679',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
      letterSpacing: '-0.5px',
    },
    h6: {
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#121212',
          borderRight: '1px solid rgba(255, 255, 255, 0.12)',
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.12)',
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          margin: '4px 8px',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
          },
        },
      },
    },
  },
});

// Stats for summary cards
const statsData = [
  { title: 'Active Threats', value: '12', color: '#cf6679' },
  { title: 'Protected Systems', value: '247', color: '#03dac6' },
  { title: 'Weekly Scans', value: '1,430', color: '#bb86fc' },
  { title: 'Security Score', value: '89%', color: '#6200ea' },
];

const Dashboard = () => {
  const theme = useTheme(); // Get MUI theme values
  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            zIndex: theme.zIndex.drawer + 1,
            transition: theme.transitions.create(['width', 'margin'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
            marginLeft: open ? drawerWidth : 0,
            width: open ? `calc(100% - ${drawerWidth}px)` : '100%',
            backdropFilter: 'blur(10px)',
            backgroundColor: 'rgba(30, 30, 30, 0.8)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
          }}
        >
          <Toolbar sx={{ pr: '24px' }}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="Open drawer"
              onClick={handleDrawerOpen}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ShieldIcon sx={{ color: '#6200ea', fontSize: 28, mr: 1.5 }} />
              <Typography variant="h6" noWrap sx={{ fontWeight: 600 }}>
                CYBER<span style={{ color: '#03dac6' }}>SHIELD</span>
              </Typography>
            </Box>
            
            <Box sx={{ flexGrow: 1 }} />
            
            <IconButton color="inherit" sx={{ mr: 2 }}>
              <Badge badgeContent={4} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            
            <Avatar sx={{ bgcolor: '#6200ea', width: 36, height: 36 }}>JS</Avatar>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              boxShadow: '4px 0 10px rgba(0, 0, 0, 0.2)',
            },
          }}
          open={open}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              padding: theme.spacing(0, 1),
              ...theme.mixins.toolbar,
            }}
          >
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </Box>
          <Divider />
          <List>{mainListItems}</List>
          <Divider />
          <List>{secondaryListItems}</List>
        </Drawer>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            padding: theme.spacing(3),
            overflow: 'auto',
            backgroundColor: '#121212',
          }}
        >
          <Toolbar />
          <Box sx={{ mt: 2, mb: 4 }}>
            <Typography variant="h4" gutterBottom component="h1" sx={{ fontWeight: 700, color: '#fff' }}>
              Security Dashboard
            </Typography>
            <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
              Real-time overview of your security infrastructure and threat landscape
            </Typography>
            
            {/* Stats Cards */}
            <Box sx={{ 
              display: 'grid', 
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' }, 
              gap: 3,
              mb: 4 
            }}>
              {statsData.map((stat, index) => (
                <Paper
                  key={index}
                  elevation={3}
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    background: '#1e1e1e',
                    border: '1px solid rgba(255,255,255,0.05)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 8px 25px rgba(0,0,0,0.3)',
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
              ))}
            </Box>
          </Box>
          
          <Paper
            elevation={3}
            sx={{
              p: 3,
              mb: 4,
              borderRadius: 3,
              background: '#1e1e1e',
              boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
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
            elevation={3}
            sx={{
              p: 3,
              borderRadius: 3,
              background: '#1e1e1e',
              boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
            }}
          >
            <Typography variant="h5" gutterBottom component="h2" sx={{ fontWeight: 600, mb: 3 }}>
              Recent Threats
            </Typography>
            <SimpleTable />
          </Paper>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Dashboard;