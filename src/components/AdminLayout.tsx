import {
    AppBar,
    Avatar,
    Badge,
    Box,
    CssBaseline,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Toolbar,
    Typography,
    useTheme
} from '@mui/material';
import React, { ReactNode, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

// Icons
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import BarChartIcon from '@mui/icons-material/BarChart';
import BusinessIcon from '@mui/icons-material/Business';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import HistoryIcon from '@mui/icons-material/History';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import PolicyIcon from '@mui/icons-material/Policy';
import SchoolIcon from '@mui/icons-material/School';
import SettingsIcon from '@mui/icons-material/Settings';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = React.useContext(AuthContext);
  
  const [open, setOpen] = useState<boolean>(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notificationsAnchorEl, setNotificationsAnchorEl] = useState<null | HTMLElement>(null);
  
  const drawerWidth = 260;
  
  // Navigation items
  const mainNavItems = [
    { 
      path: '/admin/dashboard', 
      name: 'Dashboard', 
      icon: <DashboardIcon />,
      isActive: location.pathname === '/admin/dashboard' 
    },
    { 
      path: '/admin/consultants', 
      name: 'Consultants', 
      icon: <PersonIcon />,
      isActive: location.pathname === '/admin/consultants' 
    },
    { 
      path: '/admin/clients', 
      name: 'Clients', 
      icon: <BusinessIcon />,
      isActive: location.pathname === '/admin/clients' 
    },
    { 
      path: '/admin/reports', 
      name: 'Reports & Analytics', 
      icon: <BarChartIcon />,
      isActive: location.pathname === '/admin/reports',
    },
  ];
  
  // System navigation items
  const systemNavItems = [
    { 
      path: '/admin/users', 
      name: 'User Management', 
      icon: <GroupIcon />,
      isActive: location.pathname === '/admin/users' 
    },
    { 
      path: '/admin/programs', 
      name: 'Program Settings', 
      icon: <SchoolIcon />,
      isActive: location.pathname === '/admin/programs' 
    },
    { 
      path: '/admin/logs', 
      name: 'Activity Logs', 
      icon: <HistoryIcon />,
      isActive: location.pathname === '/admin/logs' 
    },
    { 
      path: '/admin/security', 
      name: 'Security Settings', 
      icon: <PolicyIcon />,
      isActive: location.pathname === '/admin/security' 
    },
  ];
  
  const handleDrawerOpen = (): void => {
    setOpen(true);
  };
  
  const handleDrawerClose = (): void => {
    setOpen(false);
  };
  
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationsMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationsAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setNotificationsAnchorEl(null);
  };
  
  const handleLogout = () => {
    handleMenuClose();
    logout();
    navigate('/admin/login');
  };
  
  // Notifications data
  const notifications = [
    { id: 1, message: "New consultant registration pending approval", time: "10 minutes ago", isNew: true },
    { id: 2, message: "System update completed successfully", time: "1 hour ago", isNew: true },
    { id: 3, message: "Harbor Dental assessment report submitted", time: "3 hours ago", isNew: false },
  ];
  
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      
      {/* Admin AppBar */}
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
          backgroundColor: '#1a237e', // Darker blue for admin
        }}
        elevation={2}
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
            <AdminPanelSettingsIcon sx={{ color: '#fff', fontSize: 28, mr: 1.5 }} />
            <Typography variant="h6" noWrap sx={{ fontWeight: 600 }}>
              ROCKY SECURITY <span style={{ fontWeight: 400 }}>Admin</span>
            </Typography>
            
            {/* University branding */}
            <Box 
              component="span" 
              sx={{ 
                ml: 2, 
                px: 1.5, 
                py: 0.5, 
                backgroundColor: 'rgba(255, 255, 255, 0.15)', 
                borderRadius: 1,
                display: { xs: 'none', md: 'flex' },
                alignItems: 'center',
              }}
            >
              <SchoolIcon sx={{ fontSize: 16, mr: 0.5, color: '#fff' }} />
              <Typography variant="caption" sx={{ fontWeight: 500, color: '#fff' }}>
                Manhattanville University
              </Typography>
            </Box>
          </Box>
          
          <Box sx={{ flexGrow: 1 }} />
          
          <Box sx={{ display: 'flex', ml: 2 }}>
            <IconButton color="inherit" onClick={handleNotificationsMenuOpen}>
              <Badge badgeContent={2} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            
            <IconButton 
              edge="end"
              onClick={handleProfileMenuOpen}
              color="inherit"
              sx={{ ml: 1 }}
            >
              <Avatar sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)', width: 36, height: 36 }}>
                <AdminPanelSettingsIcon />
              </Avatar>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      
      {/* Admin Drawer */}
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
            boxShadow: '4px 0 15px rgba(0, 0, 0, 0.05)',
          },
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: [1],
            backgroundColor: '#1a237e', // Match AppBar color
            color: '#fff',
          }}
        >
          <Typography variant="subtitle1" sx={{ flexGrow: 1, fontWeight: 600, pl: 1 }}>
            Admin Panel
          </Typography>
          <IconButton onClick={handleDrawerClose} sx={{ color: '#fff' }}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        
        <Divider />
        
        {/* Admin Profile */}
        <Box sx={{ p: 2, textAlign: 'center' }}>
          <Avatar
            sx={{ 
              width: 64, 
              height: 64, 
              margin: '0 auto',
              backgroundColor: '#1a237e'
            }}
          >
            <AdminPanelSettingsIcon sx={{ fontSize: 36 }} />
          </Avatar>
          <Typography variant="subtitle1" sx={{ mt: 1, fontWeight: 600 }}>
            Admin User
          </Typography>
          <Typography variant="body2" color="textSecondary">
            System Administrator
          </Typography>
        </Box>
        
        <Divider sx={{ borderColor: 'rgba(0, 0, 0, 0.08)', mt: 2 }} />
        
        {/* Main Navigation */}
        <List sx={{ px: 2, pt: 2 }}>
          <Typography 
            variant="overline" 
            sx={{ 
              pl: 2, 
              color: 'rgba(0, 0, 0, 0.6)', 
              fontWeight: 600 
            }}
          >
            Management
          </Typography>
          
          {mainNavItems.map((item) => (
            <ListItem
              key={item.path}
              component={Link}
              to={item.path}
              disablePadding
              sx={{ display: 'block', mb: 0.5, color: 'inherit', textDecoration: 'none' }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  px: 2.5,
                  borderRadius: 1,
                  backgroundColor: item.isActive ? 'rgba(26, 35, 126, 0.08)' : 'transparent',
                  borderLeft: item.isActive ? '4px solid #1a237e' : '4px solid transparent',
                  pl: item.isActive ? 1.5 : 2.5,
                  '&:hover': {
                    backgroundColor: 'rgba(26, 35, 126, 0.05)',
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: '40px',
                    color: item.isActive ? '#1a237e' : 'inherit'
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
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        
        <Divider sx={{ borderColor: 'rgba(0, 0, 0, 0.08)', my: 1 }} />
        
        {/* System Navigation */}
        <List sx={{ px: 2 }}>
          <Typography 
            variant="overline" 
            sx={{ 
              pl: 2, 
              color: 'rgba(0, 0, 0, 0.6)', 
              fontWeight: 600 
            }}
          >
            System
          </Typography>
          
          {systemNavItems.map((item) => (
            <ListItem
              key={item.path}
              component={Link}
              to={item.path}
              disablePadding
              sx={{ display: 'block', mb: 0.5, color: 'inherit', textDecoration: 'none' }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  px: 2.5,
                  borderRadius: 1,
                  backgroundColor: item.isActive ? 'rgba(26, 35, 126, 0.08)' : 'transparent',
                  borderLeft: item.isActive ? '4px solid #1a237e' : '4px solid transparent',
                  pl: item.isActive ? 1.5 : 2.5,
                  '&:hover': {
                    backgroundColor: 'rgba(26, 35, 126, 0.05)',
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: '40px',
                    color: item.isActive ? '#1a237e' : 'inherit'
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
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        
        {/* Logout Button */}
        <Box sx={{ mt: 'auto', p: 2 }}>
          <ListItemButton
            onClick={handleLogout}
            sx={{
              py: 1,
              px: 2,
              borderRadius: 1,
              border: '1px solid rgba(244, 67, 54, 0.5)',
              color: '#f44336',
              '&:hover': {
                backgroundColor: 'rgba(244, 67, 54, 0.08)',
                borderColor: '#f44336',
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: '40px', color: '#f44336' }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText 
              primary={
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  Logout
                </Typography>
              } 
            />
          </ListItemButton>
        </Box>
      </Drawer>
      
      {/* Profile Menu */}
      <Menu
        anchorEl={anchorEl}
        id="profile-menu"
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            mt: 1.5,
            backgroundImage: 'none',
            backgroundColor: '#ffffff',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
            borderRadius: 2,
            minWidth: 200,
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleMenuClose} sx={{ py: 1.5 }}>
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="body2">My Profile</Typography>
        </MenuItem>
        
        <MenuItem onClick={handleMenuClose} sx={{ py: 1.5 }}>
          <ListItemIcon>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="body2">Settings</Typography>
        </MenuItem>
        
        <Divider />
        
        <MenuItem onClick={handleLogout} sx={{ py: 1.5 }}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" color="error" />
          </ListItemIcon>
          <Typography variant="body2" color="error">Logout</Typography>
        </MenuItem>
      </Menu>
      
      {/* Notifications Menu */}
      <Menu
        anchorEl={notificationsAnchorEl}
        id="notifications-menu"
        keepMounted
        open={Boolean(notificationsAnchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            mt: 1.5,
            backgroundImage: 'none',
            backgroundColor: '#ffffff',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
            borderRadius: 2,
            minWidth: 300,
            maxWidth: 360,
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box sx={{ px: 2, py: 1.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Notifications</Typography>
          <Typography 
            variant="caption" 
            color="primary" 
            sx={{ cursor: 'pointer', fontWeight: 500 }}
            onClick={handleMenuClose}
          >
            Mark all as read
          </Typography>
        </Box>
        
        <Divider />
        
        {notifications.map((notification) => (
          <MenuItem key={notification.id} onClick={handleMenuClose} sx={{ py: 1.5, px: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 0.5 }}>
                {notification.isNew && (
                  <Box 
                    component="span"
                    sx={{ 
                      width: 8, 
                      height: 8, 
                      bgcolor: '#1a237e', 
                      borderRadius: '50%',
                      mr: 1,
                      mt: 1
                    }} 
                  />
                )}
                <Typography 
                  variant="body2" 
                  sx={{ 
                    fontWeight: notification.isNew ? 600 : 400,
                    pl: notification.isNew ? 0 : 2.5
                  }}
                >
                  {notification.message}
                </Typography>
              </Box>
              <Typography 
                variant="caption" 
                color="textSecondary" 
                sx={{ pl: notification.isNew ? 2.5 : 2.5 }}
              >
                {notification.time}
              </Typography>
            </Box>
          </MenuItem>
        ))}
        
        <Divider />
        
        <Box sx={{ p: 1.5, textAlign: 'center' }}>
          <Typography 
            component={Link} 
            to="/admin/notifications"
            variant="body2" 
            color="primary"
            onClick={handleMenuClose}
            sx={{ 
              cursor: 'pointer', 
              fontWeight: 500,
              textDecoration: 'none',
              '&:hover': { textDecoration: 'underline' }
            }}
          >
            View All Notifications
          </Typography>
        </Box>
      </Menu>
      
      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          overflow: 'auto',
          minHeight: '100vh',
          backgroundColor: '#f5f7fa',
          pt: '64px', // AppBar height
          transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          ml: open ? `${drawerWidth}px` : 0,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default AdminLayout;