import {
    Avatar,
    Badge,
    Box,
    Collapse,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    ListSubheader,
    Typography,
    useTheme
} from '@mui/material';
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

// Icons
import AssessmentIcon from '@mui/icons-material/Assessment';
import BusinessIcon from '@mui/icons-material/Business';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import GroupIcon from '@mui/icons-material/Group';
import HistoryIcon from '@mui/icons-material/History';
import LogoutIcon from '@mui/icons-material/Logout';
import PeopleIcon from '@mui/icons-material/People';
import SchoolIcon from '@mui/icons-material/School';
import SecurityIcon from '@mui/icons-material/Security';
import SettingsIcon from '@mui/icons-material/Settings';
import WarningIcon from '@mui/icons-material/Warning';

interface SidebarProps {
  open: boolean;
  handleDrawerClose: () => void;
  isClient?: boolean;
}

interface NavItem {
  path: string;
  name: string;
  icon: React.ReactNode;
  isActive: boolean;
  badge?: number;
}

const Sidebar: React.FC<SidebarProps> = ({ open, handleDrawerClose, isClient = false }) => {
  const [clientsOpen, setClientsOpen] = useState<boolean>(false);
  const location = useLocation();
  const theme = useTheme();
  
  const handleClientsClick = (): void => {
    setClientsOpen(!clientsOpen);
  };
  
  // Navigation items for consultants
  const mainNavItems: NavItem[] = [
    { 
      path: '/', 
      name: 'Dashboard', 
      icon: <DashboardIcon />,
      isActive: location.pathname === '/' 
    },
    { 
      path: '/assessment', 
      name: 'Business Assessment', 
      icon: <AssessmentIcon />,
      isActive: location.pathname === '/assessment' 
    },
    { 
      path: '/learning', 
      name: 'Security Learning Hub', 
      icon: <SchoolIcon />,
      isActive: location.pathname === '/learning' 
    },
    { 
      path: '/consultant', 
      name: 'Consultant Portal', 
      icon: <PeopleIcon />,
      isActive: location.pathname === '/consultant',
      badge: 5
    },
  ];
  
  // Navigation items for clients
  const clientNavItems: NavItem[] = [
    { 
      path: '/', 
      name: 'Dashboard', 
      icon: <DashboardIcon />,
      isActive: location.pathname === '/' 
    },
    { 
      path: '/assessment', 
      name: 'Security Assessment', 
      icon: <AssessmentIcon />,
      isActive: location.pathname === '/assessment' 
    },
    { 
      path: '/vulnerabilities', 
      name: 'Vulnerabilities', 
      icon: <WarningIcon />,
      isActive: location.pathname === '/vulnerabilities' 
    },
    { 
      path: '/resources', 
      name: 'Security Resources', 
      icon: <SchoolIcon />,
      isActive: location.pathname === '/resources' 
    },
    { 
      path: '/settings', 
      name: 'Account Settings', 
      icon: <SettingsIcon />,
      isActive: location.pathname === '/settings' 
    },
  ];
  
  const clientsNavItems: NavItem[] = [
    { 
      path: '/clients/riverside', 
      name: 'Riverside Café', 
      icon: <BusinessIcon />,
      isActive: location.pathname === '/clients/riverside' 
    },
    { 
      path: '/clients/harbor', 
      name: 'Harbor Dental Group', 
      icon: <BusinessIcon />,
      isActive: location.pathname === '/clients/harbor' 
    },
    { 
      path: '/clients/westfield', 
      name: 'Westfield Law Partners', 
      icon: <BusinessIcon />,
      isActive: location.pathname === '/clients/westfield' 
    },
  ];
  
  const reportsNavItems: NavItem[] = [
    { 
      path: '/history', 
      name: 'Assessment History', 
      icon: <HistoryIcon />,
      isActive: location.pathname === '/history' 
    },
    { 
      path: '/threats', 
      name: 'Threat Monitoring', 
      icon: <WarningIcon />,
      isActive: location.pathname === '/threats' 
    },
    { 
      path: '/team', 
      name: 'Team Dashboard', 
      icon: <GroupIcon />,
      isActive: location.pathname === '/team' 
    },
  ];
  
  // Style for the drawer
  const drawerWidth = 260;
  
  // Choose the appropriate navigation items based on user type
  const navigationItems = isClient ? clientNavItems : mainNavItems;
  
  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={open}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: isClient ? '#f8faff' : '#ffffff',
          borderRight: '1px solid rgba(0, 0, 0, 0.08)',
          boxShadow: '4px 0 15px rgba(0, 0, 0, 0.05)',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          padding: '0 8px',
          minHeight: '64px',
          position: 'relative',
        }}
      >
        <Box sx={{ 
          position: 'absolute', 
          left: 16, 
          display: 'flex', 
          alignItems: 'center' 
        }}>
          <SecurityIcon sx={{ color: theme.palette.primary.main, fontSize: 24, mr: 1 }} />
          <Typography variant="subtitle1" noWrap sx={{ fontWeight: 600 }}>
            ROCKY <span style={{ color: theme.palette.secondary.main }}>SECURITY</span>
          </Typography>
        </Box>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </Box>
      
      <Divider sx={{ borderColor: 'rgba(0, 0, 0, 0.08)' }} />
      
      {/* User profile summary */}
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Avatar
          sx={{ 
            width: 64, 
            height: 64, 
            margin: '0 auto',
            backgroundColor: theme.palette.primary.main
          }}
        >
          {isClient ? 'HD' : 'JS'}
        </Avatar>
        <Typography variant="subtitle1" sx={{ mt: 1, fontWeight: 600 }}>
          {isClient ? 'Harbor Dental' : 'John Smith'}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {isClient ? 'Client Account' : 'Student Consultant'}
        </Typography>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          mt: 1,
          border: '1px solid rgba(0, 0, 0, 0.08)',
          borderRadius: 1,
          py: 0.5,
          backgroundColor: 'rgba(25, 118, 210, 0.04)'
        }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            px: 1,
            borderRight: '1px solid rgba(0, 0, 0, 0.08)'
          }}>
            <Typography variant="body2" sx={{ fontWeight: 600, mr: 0.5 }}>
              5
            </Typography>
            <Typography variant="caption" color="textSecondary">
              Clients
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', px: 1 }}>
            <Typography variant="body2" sx={{ fontWeight: 600, mr: 0.5 }}>
              12
            </Typography>
            <Typography variant="caption" color="textSecondary">
              Tasks
            </Typography>
          </Box>
        </Box>
      </Box>
      
      <Divider sx={{ borderColor: 'rgba(0, 0, 0, 0.08)', mt: 2 }} />
      
      {/* Main navigation */}
      <List>
        {navigationItems.map((item) => (
          <ListItem
            key={item.path}
            component={Link}
            to={item.path}
            sx={{
              py: 1,
              px: 2,
              mx: 1,
              my: 0.5,
              borderRadius: 1,
              color: 'inherit',
              textDecoration: 'none',
              ...(item.isActive && {
                backgroundColor: 'rgba(25, 118, 210, 0.08)', 
                borderLeft: `4px solid ${theme.palette.primary.main}`,
                pl: 1.5,
              }),
              '&:hover': {
                backgroundColor: 'rgba(25, 118, 210, 0.06)',
              },
            }}
          >
            <ListItemIcon 
              sx={{ 
                minWidth: '40px',
                color: item.isActive ? theme.palette.primary.main : 'inherit'
              }}
            >
              {item.badge ? (
                <Badge badgeContent={item.badge} color="error">
                  {item.icon}
                </Badge>
              ) : (
                item.icon
              )}
            </ListItemIcon>
            <ListItemText 
              primary={
                <Typography 
                  variant="body2" 
                  sx={{ 
                    fontWeight: item.isActive ? 600 : 400 
                  }}
                >
                  {item.name}
                </Typography>
              } 
            />
          </ListItem>
        ))}
      </List>
      
      <Divider sx={{ borderColor: 'rgba(0, 0, 0, 0.08)', my: 1 }} />
      
      {/* Client List with Collapsible */}
      <List
        subheader={
          <ListSubheader
            component="div"
            onClick={handleClientsClick}
            sx={{
              backgroundColor: 'transparent',
              color: 'rgba(0, 0, 0, 0.6)',
              fontSize: '0.75rem',
              letterSpacing: '1px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              textTransform: 'uppercase',
              '&:hover': {
                color: 'rgba(0, 0, 0, 0.8)',
              },
            }}
          >
            My Clients
            {clientsOpen ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
          </ListSubheader>
        }
      >
        <Collapse in={clientsOpen}>
          <List component="div" disablePadding sx={{ pl: 4 }}>
            {clientsNavItems.map((item) => (
              <ListItemButton 
                key={item.path}
                component={Link} 
                to={item.path}
                sx={{ 
                  borderRadius: '8px', 
                  mb: 1,
                  ...(item.isActive && {
                    backgroundColor: 'rgba(25, 118, 210, 0.08)', 
                    borderLeft: `4px solid ${theme.palette.primary.main}`,
                  }),
                  '&:hover': {
                    backgroundColor: 'rgba(25, 118, 210, 0.08)',
                  }
                }}
              >
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            ))}
          </List>
        </Collapse>
      </List>
      
      {/* Reports Section */}
      <Divider sx={{ borderColor: 'rgba(0, 0, 0, 0.08)', my: 1 }} />
      
      <List
        subheader={
          <ListSubheader
            component="div"
            sx={{
              backgroundColor: 'transparent',
              color: 'rgba(0, 0, 0, 0.6)',
              fontSize: '0.75rem',
              letterSpacing: '1px',
              fontWeight: 700,
              textTransform: 'uppercase',
            }}
          >
            Reports & Analytics
          </ListSubheader>
        }
      >
        {reportsNavItems.map((item) => (
          <ListItem
            key={item.path}
            component={Link}
            to={item.path}
            sx={{
              py: 1,
              px: 2,
              mx: 1,
              my: 0.5,
              borderRadius: 1,
              color: 'inherit',
              textDecoration: 'none',
              ...(item.isActive && {
                backgroundColor: 'rgba(25, 118, 210, 0.08)', 
                borderLeft: `4px solid ${theme.palette.primary.main}`,
                pl: 1.5,
              }),
              '&:hover': {
                backgroundColor: 'rgba(25, 118, 210, 0.06)',
              },
            }}
          >
            <ListItemIcon 
              sx={{ 
                minWidth: '40px',
                color: item.isActive ? theme.palette.primary.main : 'inherit'
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={
                <Typography 
                  variant="body2" 
                  sx={{ 
                    fontWeight: item.isActive ? 600 : 400 
                  }}
                >
                  {item.name}
                </Typography>
              } 
            />
          </ListItem>
        ))}
      </List>
      
      {/* Logout Button */}
      <Box sx={{ mt: 'auto', p: 2 }}>
        <ListItem
          component="button"
          sx={{
            py: 1,
            px: 2,
            borderRadius: 1,
            border: '1px solid rgba(0, 0, 0, 0.08)',
            color: 'inherit',
            textDecoration: 'none',
            cursor: 'pointer',
            backgroundColor: 'transparent',
            display: 'flex',
            width: '100%',
            '&:hover': {
              backgroundColor: 'rgba(25, 118, 210, 0.06)',
            },
          }}
        >
          <ListItemIcon sx={{ minWidth: '40px' }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText 
            primary={
              <Typography variant="body2">
                Logout
              </Typography>
            } 
          />
        </ListItem>
      </Box>
    </Drawer>
  );
};

export default Sidebar;