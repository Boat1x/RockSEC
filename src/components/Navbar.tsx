import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  IconButton, 
  Typography, 
  Badge, 
  Menu, 
  MenuItem, 
  Box, 
  Avatar, 
  Divider, 
  ListItemIcon, 
  Button,
  useTheme
} from '@mui/material';
import { Link } from 'react-router-dom';

// Icons
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ShieldIcon from '@mui/icons-material/Shield';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import SchoolIcon from '@mui/icons-material/School';
import BusinessIcon from '@mui/icons-material/Business';
import HelpIcon from '@mui/icons-material/Help';

interface NavbarProps {
  open?: boolean;
  handleDrawerOpen: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ open = false, handleDrawerOpen }) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notificationsAnchorEl, setNotificationsAnchorEl] = useState<null | HTMLElement>(null);
  
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

  // Notifications data
  const notifications = [
    { id: 1, message: "Critical vulnerability detected in system #247", time: "5 minutes ago", isNew: true },
    { id: 2, message: "Phishing attempt blocked on user account", time: "20 minutes ago", isNew: true },
    { id: 3, message: "Weekly security report available", time: "1 hour ago", isNew: false },
    { id: 4, message: "Software update available for endpoint protection", time: "3 hours ago", isNew: false },
  ];
  
  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          zIndex: theme.zIndex.drawer + 1,
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          marginLeft: open ? 260 : 0,
          width: open ? `calc(100% - 260px)` : '100%',
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
            
            {/* Manhattanville University branding */}
            <Box 
              component="span" 
              sx={{ 
                ml: 2, 
                px: 1.5, 
                py: 0.5, 
                backgroundColor: 'rgba(255, 255, 255, 0.1)', 
                borderRadius: 1,
                display: { xs: 'none', md: 'flex' },
                alignItems: 'center',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              <SchoolIcon sx={{ fontSize: 16, mr: 0.5 }} />
              <Typography variant="caption" sx={{ fontWeight: 500 }}>
                Manhattanville University
              </Typography>
            </Box>
          </Box>
          
          <Box sx={{ flexGrow: 1 }} />
          
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 2 }}>
            <Button 
              variant="contained" 
              color="primary"
              startIcon={<BusinessIcon />}
              sx={{ 
                borderRadius: 2, 
                textTransform: 'none',
                background: 'linear-gradient(45deg, #6200ea 30%, #7c4dff 90%)',
              }}
            >
              Client Portal
            </Button>
            
            <Button 
              variant="outlined" 
              color="secondary"
              startIcon={<HelpIcon />}
              sx={{ 
                borderRadius: 2, 
                textTransform: 'none',
                borderColor: 'rgba(3, 218, 198, 0.5)',
              }}
            >
              Learn Security
            </Button>
          </Box>
          
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
              <Avatar sx={{ bgcolor: '#6200ea', width: 36, height: 36 }}>JS</Avatar>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      
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
            backgroundColor: '#1e1e1e',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
            borderRadius: 2,
            minWidth: 200,
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box sx={{ px: 2, py: 1.5 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>John Smith</Typography>
          <Typography variant="body2" color="textSecondary">Student Consultant</Typography>
        </Box>
        
        <Divider sx={{ my: 1, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
        
        <MenuItem sx={{ py: 1.5 }}>
          <ListItemIcon>
            <PersonIcon fontSize="small" sx={{ color: theme.palette.primary.main }} />
          </ListItemIcon>
          <Typography variant="body2">My Profile</Typography>
        </MenuItem>
        
        <MenuItem sx={{ py: 1.5 }}>
          <ListItemIcon>
            <BusinessIcon fontSize="small" sx={{ color: theme.palette.secondary.main }} />
          </ListItemIcon>
          <Typography variant="body2">My Clients</Typography>
        </MenuItem>
        
        <MenuItem sx={{ py: 1.5 }}>
          <ListItemIcon>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="body2">Settings</Typography>
        </MenuItem>
        
        <Divider sx={{ my: 1, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
        
        <MenuItem sx={{ py: 1.5 }}>
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
            backgroundColor: '#1e1e1e',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
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
          <Typography variant="caption" color="primary" sx={{ cursor: 'pointer', fontWeight: 500 }}>
            Mark all as read
          </Typography>
        </Box>
        
        <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
        
        {notifications.map((notification) => (
          <MenuItem key={notification.id} sx={{ py: 1.5, px: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 0.5 }}>
                {notification.isNew && (
                  <Box 
                    component="span" 
                    sx={{ 
                      width: 8, 
                      height: 8, 
                      bgcolor: theme.palette.primary.main, 
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
        
        <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
        
        <Box sx={{ p: 1.5, textAlign: 'center' }}>
          <Typography 
            component={Link} 
            to="/notifications"
            variant="body2" 
            color="primary"
            sx={{ 
              cursor: 'pointer', 
              fontWeight: 500,
              textDecoration: 'none',
              '&:hover': { textDecoration: 'underline' }
            }}
          >
            View all notifications
          </Typography>
        </Box>
      </Menu>
    </>
  );
};

export default Navbar;