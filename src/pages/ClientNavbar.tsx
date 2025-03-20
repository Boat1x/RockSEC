import React, { useState, useContext } from 'react';
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
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';

// Icons
import NotificationsIcon from '@mui/icons-material/Notifications';
import SecurityIcon from '@mui/icons-material/Security';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import SchoolIcon from '@mui/icons-material/School';
import BusinessIcon from '@mui/icons-material/Business';
import HelpIcon from '@mui/icons-material/Help';
import AssessmentIcon from '@mui/icons-material/Assessment';
import DashboardIcon from '@mui/icons-material/Dashboard';

interface ClientNavbarProps {
  companyName?: string;
}

const ClientNavbar: React.FC<ClientNavbarProps> = ({ companyName = "Harbor Dental Group" }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
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
  
  const handleLogout = () => {
    handleMenuClose();
    logout();
    navigate('/login');
  };

  // Notifications data
  const notifications = [
    { id: 1, message: "New security assessment completed", time: "2 days ago", isNew: true },
    { id: 2, message: "Security awareness training scheduled", time: "5 days ago", isNew: true },
    { id: 3, message: "Recommendation implemented: Multi-Factor Authentication", time: "1 week ago", isNew: false },
  ];
  
  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          zIndex: theme.zIndex.drawer + 1,
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          color: theme.palette.text.primary,
        }}
        elevation={2}
      >
        <Toolbar sx={{ pr: '24px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <SecurityIcon sx={{ color: theme.palette.primary.main, fontSize: 28, mr: 1.5 }} />
            <Typography variant="h6" noWrap sx={{ fontWeight: 600 }}>
              ROCKY <span style={{ color: theme.palette.secondary.main }}>SECURITY</span>
            </Typography>
            
            <Divider orientation="vertical" flexItem sx={{ mx: 2, height: 24 }} />
            
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center',
              }}
            >
              <BusinessIcon sx={{ fontSize: 18, mr: 1, color: 'text.secondary' }} />
              <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
                {companyName}
              </Typography>
            </Box>
          </Box>
          
          <Box sx={{ flexGrow: 1 }} />
          
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1 }}>
            <Button 
              component={Link}
              to="/"
              startIcon={<DashboardIcon />}
              sx={{ 
                borderRadius: 2, 
                textTransform: 'none',
              }}
            >
              Dashboard
            </Button>
            
            <Button 
              component={Link}
              to="/assessment"
              startIcon={<AssessmentIcon />}
              sx={{ 
                borderRadius: 2, 
                textTransform: 'none',
              }}
            >
              Assessments
            </Button>
            
            <Button 
              component={Link}
              to="/learning"
              startIcon={<HelpIcon />}
              sx={{ 
                borderRadius: 2, 
                textTransform: 'none',
              }}
            >
              Resources
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
              <Avatar sx={{ bgcolor: theme.palette.secondary.main, width: 36, height: 36 }}>HD</Avatar>
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
        <Box sx={{ px: 2, py: 1.5 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{companyName}</Typography>
          <Typography variant="body2" color="textSecondary">Client Account</Typography>
        </Box>
        
        <Divider sx={{ my: 1, borderColor: 'rgba(0, 0, 0, 0.08)' }} />
        
        <MenuItem sx={{ py: 1.5 }}>
          <ListItemIcon>
            <PersonIcon fontSize="small" sx={{ color: theme.palette.primary.main }} />
          </ListItemIcon>
          <Typography variant="body2">Account Settings</Typography>
        </MenuItem>
        
        <MenuItem sx={{ py: 1.5 }}>
          <ListItemIcon>
            <BusinessIcon fontSize="small" sx={{ color: theme.palette.secondary.main }} />
          </ListItemIcon>
          <Typography variant="body2">Company Profile</Typography>
        </MenuItem>
        
        <MenuItem sx={{ py: 1.5 }}>
          <ListItemIcon>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="body2">Preferences</Typography>
        </MenuItem>
        
        <Divider sx={{ my: 1, borderColor: 'rgba(0, 0, 0, 0.08)' }} />
        
        <MenuItem sx={{ py: 1.5 }} onClick={handleLogout}>
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
          <Typography variant="caption" color="primary" sx={{ cursor: 'pointer', fontWeight: 500 }}>
            Mark all as read
          </Typography>
        </Box>
        
        <Divider sx={{ borderColor: 'rgba(0, 0, 0, 0.08)' }} />
        
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
        
        <Divider sx={{ borderColor: 'rgba(0, 0, 0, 0.08)' }} />
        
        <Box sx={{ p: 1.5, textAlign: 'center' }}>
          <Typography 
            component={Link} 
            to="/"
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

export default ClientNavbar;