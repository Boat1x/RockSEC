import React, { useState, ReactNode } from 'react';
import {
  Box, 
  CssBaseline,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Avatar,
  Badge,
  Collapse,
  Chip,
  Theme
} from '@mui/material';

// Icons
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SecurityIcon from '@mui/icons-material/Security';
import WarningIcon from '@mui/icons-material/Warning';
import BugReportIcon from '@mui/icons-material/BugReport';
import SchoolIcon from '@mui/icons-material/School';
import HistoryIcon from '@mui/icons-material/History';
import SettingsIcon from '@mui/icons-material/Settings';
import PeopleIcon from '@mui/icons-material/People';
import SpeedIcon from '@mui/icons-material/Speed';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ArticleIcon from '@mui/icons-material/Article';
import LogoutIcon from '@mui/icons-material/Logout';
import HelpIcon from '@mui/icons-material/Help';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import DescriptionIcon from '@mui/icons-material/Description';
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import MoreIcon from '@mui/icons-material/MoreVert';

interface ClientDashboardLayoutProps {
  children: ReactNode;
}

const ClientDashboardLayout: React.FC<ClientDashboardLayoutProps> = ({ children }) => {
  const [open, setOpen] = useState<boolean>(true);
  const [resourcesExpanded, setResourcesExpanded] = useState<boolean>(false);
  
  const drawerWidth = 260;

  const handleDrawerOpen = (): void => {
    setOpen(true);
  };

  const handleDrawerClose = (): void => {
    setOpen(false);
  };
  
  const handleResourcesToggle = (): void => {
    setResourcesExpanded(!resourcesExpanded);
  };

  // Current location - would come from router in a real implementation
  const currentPath = '/'; // dashboard path
  
  // Check if a nav item is active based on path
  const isActive = (path: string): boolean => currentPath === path;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      
      {/* Top Navigation Bar */}
      <AppBar 
        position="fixed" 
        sx={{ 
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          color: 'text.primary',
          backdropFilter: 'blur(8px)',
          zIndex: (theme: Theme) => theme.zIndex.drawer + 1,
          boxShadow: '0 1px 8px rgba(0,0,0,0.1)',
          transition: (theme: Theme) => theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          ...(open && {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: (theme: Theme) => theme.transitions.create(['width', 'margin'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          }),
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 2,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <SecurityIcon sx={{ color: 'primary.main', fontSize: 28, mr: 1.5 }} />
            <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 600 }}>
              ROCKY <span style={{ color: '#03a9f4' }}>SECURITY</span>
            </Typography>
            
            <Divider orientation="vertical" flexItem sx={{ mx: 2, height: 24 }} />
            
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <BusinessIcon sx={{ fontSize: 18, mr: 1, color: 'text.secondary' }} />
              <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
                Harbor Dental Group
              </Typography>
            </Box>
          </Box>
          
          <Box sx={{ flexGrow: 1 }} />
          
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton size="large" color="inherit">
              <Badge badgeContent={4} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              color="inherit"
            >
              <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main' }}>HD</Avatar>
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Side Navigation */}
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#ffffff',
            borderRight: '1px solid rgba(0, 0, 0, 0.08)',
            boxShadow: open ? '4px 0 15px rgba(0, 0, 0, 0.05)' : 'none',
            overflowX: 'hidden',
            transition: (theme: Theme) => theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
            ...(!open && {
              overflowX: 'hidden',
              width: (theme: Theme) => theme.spacing(7),
              transition: (theme: Theme) => theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
              }),
            }),
          },
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: 1,
          }}
        >
          {open && (
            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, pl: 1 }}>
              <Typography variant="subtitle1" fontWeight={600}>
                CLIENT PORTAL
              </Typography>
            </Box>
          )}
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        
        <Divider />
        
        {/* Company Info */}
        {open && (
          <>
            <Box sx={{ p: 2, textAlign: 'center' }}>
              <Avatar
                sx={{ 
                  width: 64, 
                  height: 64, 
                  margin: '0 auto',
                  backgroundColor: 'secondary.main',
                  mb: 1
                }}
              >
                HD
              </Avatar>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                Harbor Dental Group
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                Client Account
              </Typography>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                mt: 1,
                border: '1px solid rgba(0, 0, 0, 0.08)',
                borderRadius: 1,
                py: 0.5,
                mx: 2,
                backgroundColor: 'rgba(25, 118, 210, 0.04)'
              }}>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  px: 1,
                  borderRight: '1px solid rgba(0, 0, 0, 0.08)'
                }}>
                  <Typography variant="body2" sx={{ fontWeight: 600, mr: 0.5 }}>
                    68
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    Score
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', px: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600, mr: 0.5 }}>
                    4
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    Pending
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Divider />
          </>
        )}
        
        {/* Main Navigation */}
        <List sx={{ px: open ? 2 : 0, pt: 1 }}>
          <ListItem
            component="a"
            href="/"
            disablePadding
            sx={{ display: 'block', mb: 0.5 }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
                borderRadius: 1,
                backgroundColor: isActive('/') ? 'rgba(25, 118, 210, 0.08)' : 'transparent',
                borderLeft: open && isActive('/') ? '3px solid #1976d2' : '3px solid transparent',
                pl: open && isActive('/') ? 1.7 : 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 2 : 'auto',
                  justifyContent: 'center',
                  color: isActive('/') ? 'primary.main' : 'inherit'
                }}
              >
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText 
                primary="Dashboard" 
                sx={{ opacity: open ? 1 : 0 }}
                primaryTypographyProps={{ 
                  fontWeight: isActive('/') ? 600 : 400,
                  variant: 'body2'
                }} 
              />
            </ListItemButton>
          </ListItem>
          
          <ListItem
            component="a"
            href="/assessment"
            disablePadding
            sx={{ display: 'block', mb: 0.5 }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
                borderRadius: 1,
                backgroundColor: isActive('/assessment') ? 'rgba(25, 118, 210, 0.08)' : 'transparent',
                borderLeft: open && isActive('/assessment') ? '3px solid #1976d2' : '3px solid transparent',
                pl: open && isActive('/assessment') ? 1.7 : 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 2 : 'auto',
                  justifyContent: 'center',
                  color: isActive('/assessment') ? 'primary.main' : 'inherit'
                }}
              >
                <AssessmentIcon />
              </ListItemIcon>
              <ListItemText 
                primary="Assessments" 
                sx={{ opacity: open ? 1 : 0 }}
                primaryTypographyProps={{ 
                  fontWeight: isActive('/assessment') ? 600 : 400,
                  variant: 'body2'
                }} 
              />
            </ListItemButton>
          </ListItem>
          
          <ListItem
            component="a"
            href="/recommendations"
            disablePadding
            sx={{ display: 'block', mb: 0.5 }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
                borderRadius: 1,
                backgroundColor: isActive('/recommendations') ? 'rgba(25, 118, 210, 0.08)' : 'transparent',
                borderLeft: open && isActive('/recommendations') ? '3px solid #1976d2' : '3px solid transparent',
                pl: open && isActive('/recommendations') ? 1.7 : 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 2 : 'auto',
                  justifyContent: 'center',
                  color: isActive('/recommendations') ? 'primary.main' : 'inherit'
                }}
              >
                <SecurityIcon />
              </ListItemIcon>
              <ListItemText 
                primary={
                  open ? (
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="body2" fontWeight={isActive('/recommendations') ? 600 : 400}>
                        Recommendations
                      </Typography>
                      <Badge badgeContent={4} color="error" />
                    </Box>
                  ) : "Recommendations"
                }
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
          
          <ListItem
            component="a"
            href="/vulnerabilities"
            disablePadding
            sx={{ display: 'block', mb: 0.5 }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
                borderRadius: 1,
                backgroundColor: isActive('/vulnerabilities') ? 'rgba(25, 118, 210, 0.08)' : 'transparent',
                borderLeft: open && isActive('/vulnerabilities') ? '3px solid #1976d2' : '3px solid transparent',
                pl: open && isActive('/vulnerabilities') ? 1.7 : 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 2 : 'auto',
                  justifyContent: 'center',
                  color: isActive('/vulnerabilities') ? 'primary.main' : 'inherit'
                }}
              >
                <BugReportIcon />
              </ListItemIcon>
              <ListItemText 
                primary={
                  open ? (
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="body2" fontWeight={isActive('/vulnerabilities') ? 600 : 400}>
                        Vulnerabilities
                      </Typography>
                      <Badge badgeContent={3} color="error" />
                    </Box>
                  ) : "Vulnerabilities"
                }
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
          
          <ListItem
            component="a"
            href="/monitoring"
            disablePadding
            sx={{ display: 'block', mb: 0.5 }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
                borderRadius: 1,
                backgroundColor: isActive('/monitoring') ? 'rgba(25, 118, 210, 0.08)' : 'transparent',
                borderLeft: open && isActive('/monitoring') ? '3px solid #1976d2' : '3px solid transparent',
                pl: open && isActive('/monitoring') ? 1.7 : 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 2 : 'auto',
                  justifyContent: 'center',
                  color: isActive('/monitoring') ? 'primary.main' : 'inherit'
                }}
              >
                <SpeedIcon />
              </ListItemIcon>
              <ListItemText 
                primary="Threat Monitoring"
                sx={{ opacity: open ? 1 : 0 }}
                primaryTypographyProps={{ 
                  fontWeight: isActive('/monitoring') ? 600 : 400,
                  variant: 'body2'
                }}
              />
            </ListItemButton>
          </ListItem>
          
          <ListItem
            component="a"
            href="/history"
            disablePadding
            sx={{ display: 'block', mb: 0.5 }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
                borderRadius: 1,
                backgroundColor: isActive('/history') ? 'rgba(25, 118, 210, 0.08)' : 'transparent',
                borderLeft: open && isActive('/history') ? '3px solid #1976d2' : '3px solid transparent',
                pl: open && isActive('/history') ? 1.7 : 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 2 : 'auto',
                  justifyContent: 'center',
                  color: isActive('/history') ? 'primary.main' : 'inherit'
                }}
              >
                <HistoryIcon />
              </ListItemIcon>
              <ListItemText 
                primary="History & Reports"
                sx={{ opacity: open ? 1 : 0 }}
                primaryTypographyProps={{ 
                  fontWeight: isActive('/history') ? 600 : 400,
                  variant: 'body2'
                }}
              />
            </ListItemButton>
          </ListItem>
          
          <ListItem
            component="a"
            href="/calendar"
            disablePadding
            sx={{ display: 'block', mb: 0.5 }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
                borderRadius: 1,
                backgroundColor: isActive('/calendar') ? 'rgba(25, 118, 210, 0.08)' : 'transparent',
                borderLeft: open && isActive('/calendar') ? '3px solid #1976d2' : '3px solid transparent',
                pl: open && isActive('/calendar') ? 1.7 : 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 2 : 'auto',
                  justifyContent: 'center',
                  color: isActive('/calendar') ? 'primary.main' : 'inherit'
                }}
              >
                <CalendarMonthIcon />
              </ListItemIcon>
              <ListItemText 
                primary="Calendar"
                sx={{ opacity: open ? 1 : 0 }}
                primaryTypographyProps={{ 
                  fontWeight: isActive('/calendar') ? 600 : 400,
                  variant: 'body2'
                }}
              />
            </ListItemButton>
          </ListItem>
        </List>
        
        {open && (
          <>
            <Divider sx={{ mt: 1, mb: 2 }} />
            
            {/* Resources Section */}
            <List sx={{ px: 2 }}>
              <ListItemButton 
                onClick={handleResourcesToggle}
                sx={{ borderRadius: 1, mb: 0.5 }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <SchoolIcon />
                </ListItemIcon>
                <ListItemText 
                  primary="Learning Resources"
                  primaryTypographyProps={{ variant: 'body2' }}
                />
                {resourcesExpanded ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              
              <Collapse in={resourcesExpanded} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton 
                    component="a"
                    href="/resources/guides"
                    sx={{ pl: 4, borderRadius: 1, mb: 0.5 }}
                  >
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <ArticleIcon />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Security Guides" 
                      primaryTypographyProps={{ variant: 'body2' }}
                    />
                  </ListItemButton>
                  
                  <ListItemButton 
                    component="a"
                    href="/resources/videos"
                    sx={{ pl: 4, borderRadius: 1, mb: 0.5 }}
                  >
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <VideoLibraryIcon />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Training Videos" 
                      primaryTypographyProps={{ variant: 'body2' }}
                    />
                  </ListItemButton>
                  
                  <ListItemButton 
                    component="a"
                    href="/resources/templates"
                    sx={{ pl: 4, borderRadius: 1, mb: 0.5 }}
                  >
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <DescriptionIcon />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Policy Templates" 
                      primaryTypographyProps={{ variant: 'body2' }}
                    />
                  </ListItemButton>
                </List>
              </Collapse>
            </List>
            
            <Divider sx={{ mt: 1, mb: 1 }} />
            
            {/* Support Section */}
            <List sx={{ px: 2, pt: 1 }}>
              <Typography 
                variant="caption" 
                color="textSecondary" 
                sx={{ 
                  px: 2, 
                  display: 'block', 
                  fontWeight: 600, 
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  mb: 1
                }}
              >
                Support
              </Typography>
              
              <ListItemButton
                component="a"
                href="/consultant"
                sx={{ 
                  borderRadius: 1,
                  mb: 0.5,
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText 
                  primary="Your Consultant" 
                  primaryTypographyProps={{ variant: 'body2' }}
                />
              </ListItemButton>
              
              <ListItemButton
                component="a"
                href="/help"
                sx={{ 
                  borderRadius: 1,
                  mb: 0.5,
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <HelpIcon />
                </ListItemIcon>
                <ListItemText 
                  primary="Get Help" 
                  primaryTypographyProps={{ variant: 'body2' }}
                />
              </ListItemButton>
              
              <ListItemButton
                component="a"
                href="/settings"
                sx={{ 
                  borderRadius: 1,
                  mb: 0.5,
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText 
                  primary="Settings" 
                  primaryTypographyProps={{ variant: 'body2' }}
                />
              </ListItemButton>
            </List>
          </>
        )}
        
        {/* Logout Button - Always visible but compact in closed state */}
        <Box sx={{ mt: 'auto', p: open ? 2 : 1, textAlign: 'center' }}>
          {open ? (
            <ListItem
              component="a"
              href="/logout"
              disablePadding
              sx={{ display: 'block' }}
            >
              <ListItemButton
                sx={{
                  borderRadius: 1,
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  '&:hover': {
                    backgroundColor: 'rgba(244, 67, 54, 0.04)',
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText 
                  primary="Logout" 
                  primaryTypographyProps={{ variant: 'body2' }}
                />
              </ListItemButton>
            </ListItem>
          ) : (
            <IconButton color="inherit">
              <LogoutIcon />
            </IconButton>
          )}
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${open ? drawerWidth : 56}px)` },
          ml: { sm: `${open ? drawerWidth : 56}px` },
          mt: '64px', // Height of the AppBar
          transition: (theme: Theme) => theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          backgroundColor: '#f5f7fa',
          minHeight: 'calc(100vh - 64px)'
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default ClientDashboardLayout;