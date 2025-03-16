import {
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Box
} from '@mui/material';

import DashboardIcon from '@mui/icons-material/Dashboard';
import SecurityIcon from '@mui/icons-material/Security';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PhishingIcon from '@mui/icons-material/Phishing';
import StorageIcon from '@mui/icons-material/Storage';
import PeopleIcon from '@mui/icons-material/People';
import TimelineIcon from '@mui/icons-material/Timeline';
import WarningIcon from '@mui/icons-material/Warning';
import DescriptionIcon from '@mui/icons-material/Description';
import SettingsIcon from '@mui/icons-material/Settings';

// Style for active list item
const activeStyle = {
  backgroundColor: 'rgba(98, 0, 234, 0.1)', 
  borderLeft: '4px solid #6200ea',
  paddingLeft: '12px',
};

// Main Sidebar Items
export const mainListItems = (
  <div>
    <ListItem 
      component="a" 
      href="#" 
      sx={{ 
        cursor: 'pointer',
        ...activeStyle,
        my: 0.5,
        borderRadius: 1,
        '&:hover': {
          backgroundColor: 'rgba(98, 0, 234, 0.1)',
        }
      }}
    >
      <ListItemIcon sx={{ minWidth: '40px', color: '#6200ea' }}>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText 
        primary={
          <Box component="span" sx={{ fontWeight: 600 }}>
            Dashboard
          </Box>
        } 
      />
    </ListItem>

    <ListItem 
      component="a" 
      href="#" 
      sx={{ 
        cursor: 'pointer',
        my: 0.5,
        borderRadius: 1,
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
        }
      }}
    >
      <ListItemIcon sx={{ minWidth: '40px' }}>
        <SecurityIcon />
      </ListItemIcon>
      <ListItemText primary="Security Overview" />
    </ListItem>

    <ListItem 
      component="a" 
      href="#" 
      sx={{ 
        cursor: 'pointer',
        my: 0.5,
        borderRadius: 1,
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
        }
      }}
    >
      <ListItemIcon sx={{ minWidth: '40px' }}>
        <ReportProblemIcon />
      </ListItemIcon>
      <ListItemText primary="Incident Response" />
      <Box 
        component="span" 
        sx={{ 
          backgroundColor: '#f44336',
          color: 'white',
          borderRadius: '12px',
          px: 1,
          py: 0.25,
          fontSize: '0.75rem',
          fontWeight: 600,
        }}
      >
        3
      </Box>
    </ListItem>

    <ListItem 
      component="a" 
      href="#" 
      sx={{ 
        cursor: 'pointer',
        my: 0.5,
        borderRadius: 1,
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
        }
      }}
    >
      <ListItemIcon sx={{ minWidth: '40px' }}>
        <VisibilityIcon />
      </ListItemIcon>
      <ListItemText primary="Threat Intelligence" />
    </ListItem>

    <ListItem 
      component="a" 
      href="#" 
      sx={{ 
        cursor: 'pointer',
        my: 0.5,
        borderRadius: 1,
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
        }
      }}
    >
      <ListItemIcon sx={{ minWidth: '40px' }}>
        <PhishingIcon />
      </ListItemIcon>
      <ListItemText primary="Phishing Defense" />
    </ListItem>

    <ListItem 
      component="a" 
      href="#" 
      sx={{ 
        cursor: 'pointer',
        my: 0.5,
        borderRadius: 1,
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
        }
      }}
    >
      <ListItemIcon sx={{ minWidth: '40px' }}>
        <StorageIcon />
      </ListItemIcon>
      <ListItemText primary="Data Protection" />
    </ListItem>

    <ListItem 
      component="a" 
      href="#" 
      sx={{ 
        cursor: 'pointer',
        my: 0.5,
        borderRadius: 1,
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
        }
      }}
    >
      <ListItemIcon sx={{ minWidth: '40px' }}>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="User Access" />
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader 
      component="div" 
      sx={{ 
        background: 'transparent', 
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: '0.75rem',
        letterSpacing: '1px',
        fontWeight: 700,
        textTransform: 'uppercase'
      }}
    >
      Reports & Analytics
    </ListSubheader>
    
    <ListItem 
      component="a" 
      href="#" 
      sx={{ 
        cursor: 'pointer',
        my: 0.5,
        borderRadius: 1,
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
        }
      }}
    >
      <ListItemIcon sx={{ minWidth: '40px' }}>
        <TimelineIcon />
      </ListItemIcon>
      <ListItemText primary="Threat Trends" />
    </ListItem>
    
    <ListItem 
      component="a" 
      href="#" 
      sx={{ 
        cursor: 'pointer',
        my: 0.5,
        borderRadius: 1,
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
        }
      }}
    >
      <ListItemIcon sx={{ minWidth: '40px' }}>
        <WarningIcon />
      </ListItemIcon>
      <ListItemText primary="Incident History" />
    </ListItem>
    
    <ListItem 
      component="a" 
      href="#" 
      sx={{ 
        cursor: 'pointer',
        my: 0.5,
        borderRadius: 1,
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
        }
      }}
    >
      <ListItemIcon sx={{ minWidth: '40px' }}>
        <DescriptionIcon />
      </ListItemIcon>
      <ListItemText primary="Compliance Reports" />
    </ListItem>

    <ListItem 
      component="a" 
      href="#" 
      sx={{ 
        cursor: 'pointer',
        my: 0.5,
        borderRadius: 1,
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
        }
      }}
    >
      <ListItemIcon sx={{ minWidth: '40px' }}>
        <SettingsIcon />
      </ListItemIcon>
      <ListItemText primary="Settings" />
    </ListItem>
  </div>
);