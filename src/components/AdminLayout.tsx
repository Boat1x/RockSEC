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
    useTheme,
    alpha,
    useMediaQuery,
    Tooltip
} from '@mui/material';
import React, { ReactNode, useState, useEffect } from 'react';
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
import SecurityIcon from '@mui/icons-material/Security';
import ShieldIcon from '@mui/icons-material/Shield';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

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
          background: 'linear-gradient(135deg, #0f2027 0%, #203a43 100%)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)'
        }}
        elevation={0}
      >
        <Toolbar sx={{ pr: '24px', minHeight: '70px' }}>
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
            <SecurityIcon sx={{ color: '#fff', fontSize: 32, mr: 2, filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }} />
            <Typography variant="h5" noWrap sx={{ fontWeight: 700, letterSpacing: '0.5px', textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
              ROCKY <span style={{ color: '#4fc3f7', fontWeight: 700 }}>SECURITY</span>
            </Typography>
            
            {/* University branding */}
            <Box 
              component="span" 
              sx={{ 
                ml: 2, 
                px: 2, 
                py: 0.75, 
                background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)', 
                borderRadius: 2,
                display: { xs: 'none', md: 'flex' },
                alignItems: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                border: '1px solid rgba(255,255,255,0.1)'
              }}
            >
              <SchoolIcon sx={{ fontSize: 18, mr: 1, color: '#4fc3f7' }} />
              <Typography variant="caption" sx={{ fontWeight: 600, color: '#fff', letterSpacing: '0.5px' }}>
                Manhattanville University
              </Typography>
            </Box>
          </Box>
          
          <Box sx={{ flexGrow: 1 }} />
          
          <Box sx={{ display: 'flex', ml: 2 }}>
            <Tooltip title="Notifications">
              <IconButton 
                color="inherit" 
                onClick={handleNotificationsMenuOpen}
                sx={{
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.2)'
                  },
                  mr: 1,
                  transition: 'all 0.2s ease'
                }}
              >
                <Badge 
                  badgeContent={2} 
                  color="error"
                  sx={{
                    '& .MuiBadge-badge': {
                      backgroundColor: '#ff5252',
                      boxShadow: '0 2px 5px rgba(255,82,82,0.5)'
                    }
                  }}
                >
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Account">
              <IconButton 
                edge="end"
                onClick={handleProfileMenuOpen}
                color="inherit"
                sx={{ 
                  ml: 1,
                  p: 0.5,
                  border: '2px solid rgba(255,255,255,0.2)',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    border: '2px solid rgba(255,255,255,0.4)'
                  }
                }}
              >
                <Avatar 
                  sx={{ 
                    bgcolor: 'rgba(255, 255, 255, 0.1)', 
                    width: 38, 
                    height: 38,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                  }}
                >
                  <Typography sx={{ fontWeight: 700, color: '#fff' }}>JS</Typography>
                </Avatar>
              </IconButton>
            </Tooltip>
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
            boxShadow: '4px 0 20px rgba(0, 0, 0, 0.08)',
            overflowX: 'hidden'
          },
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: [1],
            background: 'linear-gradient(135deg, #0f2027 0%, #203a43 100%)',
            color: '#fff',
            minHeight: '70px'
          }}
        >
          <Typography variant="subtitle1" sx={{ flexGrow: 1, fontWeight: 700, pl: 2, letterSpacing: '0.5px' }}>
            Security Console
          </Typography>
          <IconButton 
            onClick={handleDrawerClose} 
            sx={{ 
              color: '#fff',
              backgroundColor: 'rgba(255,255,255,0.1)',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.2)'
              },
            }}
          >
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        
        <Divider />
        
        {/* Admin Profile */}
        <Box sx={{ p: 3, textAlign: 'center', mt: 1 }}>
          <Avatar
            sx={{ 
              width: 80, 
              height: 80, 
              margin: '0 auto',
              background: 'linear-gradient(135deg, #0f2027 0%, #203a43 100%)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              border: '3px solid rgba(79, 195, 247, 0.5)'
            }}
          >
            <Typography sx={{ fontSize: 28, fontWeight: 700, color: '#fff' }}>JS</Typography>
          </Avatar>
          <Typography variant="h6" sx={{ mt: 2, fontWeight: 700, color: '#203a43' }}>
            John Smith
          </Typography>
          <Box 
            sx={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              backgroundColor: 'rgba(79, 195, 247, 0.1)', 
              px: 1.5, 
              py: 0.5, 
              borderRadius: 2,
              mt: 0.5
            }}
          >
            <ShieldIcon sx={{ fontSize: 16, mr: 0.5, color: '#4fc3f7' }} />
            <Typography variant="body2" sx={{ fontWeight: 600, color: '#203a43' }}>
              Student Consultant
            </Typography>
          </Box>
        </Box>
        
        <Divider sx={{ borderColor: 'rgba(0, 0, 0, 0.08)', mx: 2 }} />
        
        {/* Main Navigation */}
        <List sx={{ px: 2, pt: 3 }}>
          <Typography 
            variant="overline" 
            sx={{ 
              pl: 2, 
              color: '#203a43', 
              fontWeight: 700,
              letterSpacing: '1px',
              fontSize: '0.75rem'
            }}
          >
            MANAGEMENT
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
                  minHeight: 52,
                  px: 2.5,
                  borderRadius: 2,
                  my: 0.5,
                  backgroundColor: item.isActive ? 'rgba(79, 195, 247, 0.1)' : 'transparent',
                  borderLeft: item.isActive ? '4px solid #4fc3f7' : '4px solid transparent',
                  pl: item.isActive ? 1.5 : 2.5,
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(79, 195, 247, 0.05)',
                    transform: 'translateX(4px)'
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: '40px',
                    color: item.isActive ? '#4fc3f7' : 'rgba(0, 0, 0, 0.6)',
                    '& .MuiSvgIcon-root': {
                      fontSize: 22
                    }
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        fontWeight: item.isActive ? 700 : 500,
                        color: item.isActive ? '#203a43' : 'rgba(0, 0, 0, 0.7)'
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
        
        <Divider sx={{ borderColor: 'rgba(0, 0, 0, 0.08)', my: 2, mx: 2 }} />
        
        {/* System Navigation */}
        <List sx={{ px: 2 }}>
          <Typography 
            variant="overline" 
            sx={{ 
              pl: 2, 
              color: '#203a43', 
              fontWeight: 700,
              letterSpacing: '1px',
              fontSize: '0.75rem'
            }}
          >
            SYSTEM
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
                  minHeight: 52,
                  px: 2.5,
                  borderRadius: 2,
                  my: 0.5,
                  backgroundColor: item.isActive ? 'rgba(79, 195, 247, 0.1)' : 'transparent',
                  borderLeft: item.isActive ? '4px solid #4fc3f7' : '4px solid transparent',
                  pl: item.isActive ? 1.5 : 2.5,
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(79, 195, 247, 0.05)',
                    transform: 'translateX(4px)'
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: '40px',
                    color: item.isActive ? '#4fc3f7' : 'rgba(0, 0, 0, 0.6)',
                    '& .MuiSvgIcon-root': {
                      fontSize: 22
                    }
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        fontWeight: item.isActive ? 700 : 500,
                        color: item.isActive ? '#203a43' : 'rgba(0, 0, 0, 0.7)'
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
              py: 1.5,
              px: 2.5,
              borderRadius: 2,
              background: 'linear-gradient(135deg, rgba(244, 67, 54, 0.08) 0%, rgba(244, 67, 54, 0.12) 100%)',
              color: '#f44336',
              boxShadow: '0 2px 8px rgba(244, 67, 54, 0.15)',
              transition: 'all 0.2s ease',
              '&:hover': {
                backgroundColor: 'rgba(244, 67, 54, 0.15)',
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 12px rgba(244, 67, 54, 0.2)',
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: '40px', color: '#f44336' }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText 
              primary={
                <Typography variant="body2" sx={{ fontWeight: 700 }}>
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
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
            borderRadius: 3,
            minWidth: 220,
            overflow: 'hidden',
            '& .MuiMenuItem-root': {
              transition: 'background-color 0.2s ease',
            }
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box sx={{ px: 2, py: 1.5, backgroundColor: 'rgba(0, 0, 0, 0.02)', borderBottom: '1px solid rgba(0, 0, 0, 0.05)' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar 
              sx={{ 
                width: 40, 
                height: 40, 
                backgroundColor: '#203a43',
                mr: 1.5
              }}
            >
              <Typography sx={{ fontWeight: 700, color: '#fff' }}>JS</Typography>
            </Avatar>
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#203a43' }}>
                John Smith
              </Typography>
              <Typography variant="caption" sx={{ color: 'rgba(0, 0, 0, 0.6)' }}>
                Student Consultant
              </Typography>
            </Box>
          </Box>
        </Box>
        <MenuItem onClick={handleMenuClose} sx={{ py: 1.5 }}>
          <ListItemIcon sx={{ color: '#4fc3f7' }}>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="body2" sx={{ fontWeight: 500 }}>My Profile</Typography>
        </MenuItem>
        
        <MenuItem onClick={handleMenuClose} sx={{ py: 1.5 }}>
          <ListItemIcon sx={{ color: '#4fc3f7' }}>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="body2" sx={{ fontWeight: 500 }}>Settings</Typography>
        </MenuItem>
        
        <Divider />
        
        <MenuItem onClick={handleLogout} sx={{ py: 1.5 }}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" sx={{ color: '#f44336' }} />
          </ListItemIcon>
          <Typography variant="body2" sx={{ color: '#f44336', fontWeight: 500 }}>Logout</Typography>
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
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
            borderRadius: 3,
            minWidth: 320,
            maxWidth: 380,
            overflow: 'hidden'
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box sx={{ px: 2, py: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.02)', borderBottom: '1px solid rgba(0, 0, 0, 0.05)' }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#203a43' }}>Notifications</Typography>
          <Typography 
            variant="caption" 
            sx={{ cursor: 'pointer', fontWeight: 600, color: '#4fc3f7', transition: 'all 0.2s ease', '&:hover': { color: '#0288d1' } }}
            onClick={handleMenuClose}
          >
            Mark all as read
          </Typography>
        </Box>
        
        <Divider />
        
        {notifications.map((notification) => (
          <MenuItem key={notification.id} onClick={handleMenuClose} sx={{ py: 2, px: 2, borderBottom: '1px solid rgba(0, 0, 0, 0.04)', '&:hover': { backgroundColor: 'rgba(79, 195, 247, 0.04)' } }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 0.5 }}>
                {notification.isNew && (
                  <Box 
                    component="span"
                    sx={{ 
                      width: 8, 
                      height: 8, 
                      bgcolor: '#4fc3f7', 
                      borderRadius: '50%',
                      mr: 1.5,
                      mt: 1,
                      boxShadow: '0 0 0 3px rgba(79, 195, 247, 0.2)'
                    }} 
                  />
                )}
                <Typography 
                  variant="body2" 
                  sx={{ 
                    fontWeight: notification.isNew ? 600 : 500,
                    pl: notification.isNew ? 0 : 2.5,
                    color: notification.isNew ? '#203a43' : 'rgba(0, 0, 0, 0.7)'
                  }}
                >
                  {notification.message}
                </Typography>
              </Box>
              <Typography 
                variant="caption" 
                sx={{ 
                  pl: notification.isNew ? 2.5 : 2.5,
                  color: 'rgba(0, 0, 0, 0.5)',
                  fontWeight: 500
                }}
              >
                {notification.time}
              </Typography>
            </Box>
          </MenuItem>
        ))}
        
        <Divider />
        
        <Box sx={{ p: 2, textAlign: 'center', backgroundColor: 'rgba(79, 195, 247, 0.04)' }}>
          <Typography 
            component={Link} 
            to="/admin/notifications"
            variant="body2" 
            onClick={handleMenuClose}
            sx={{ 
              cursor: 'pointer', 
              fontWeight: 600,
              textDecoration: 'none',
              color: '#4fc3f7',
              transition: 'all 0.2s ease',
              '&:hover': { 
                color: '#0288d1',
                textDecoration: 'none' 
              }
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
          background: 'linear-gradient(135deg, #f5f7fa 0%, #eef2f7 100%)',
          pt: '70px', // AppBar height
          pb: 4,
          transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          ml: 'auto',
          mr: 'auto',
          maxWidth: '1300px',
          width: '100%',
          px: { xs: 2, sm: 3, md: 4 }, // Responsive horizontal padding
          '& > *': {
            animation: 'fadeIn 0.5s ease-out'
          },
          '@keyframes fadeIn': {
            '0%': {
              opacity: 0,
              transform: 'translateY(10px)'
            },
            '100%': {
              opacity: 1,
              transform: 'translateY(0)'
            }
          }
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default AdminLayout;