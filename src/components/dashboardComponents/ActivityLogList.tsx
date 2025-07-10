import React from 'react';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Typography,
  LinearProgress,
  Box,
  useTheme
} from '@mui/material';

// Icons
import SecurityIcon from '@mui/icons-material/Security';
import WarningIcon from '@mui/icons-material/Warning';
import PersonIcon from '@mui/icons-material/Person';
import DomainVerificationIcon from '@mui/icons-material/DomainVerification';
import SettingsIcon from '@mui/icons-material/Settings';

interface ActivityLog {
  id: string;
  type: string;
  description: string;
  timestamp: string;
  userId: string;
}

interface ActivityLogListProps {
  activities: ActivityLog[];
  loading: boolean;
}

const ActivityLogList: React.FC<ActivityLogListProps> = ({ activities, loading }) => {
  const theme = useTheme();

  if (loading) {
    return <LinearProgress />;
  }

  if (activities.length === 0) {
    return (
      <Typography variant="body2" color="text.secondary" sx={{ p: 2, textAlign: 'center' }}>
        No activity found
      </Typography>
    );
  }

  return (
    <List>
      {activities.map((activity, index) => {
        let icon;
        let color;
        
        switch(activity.type) {
          case 'SCAN':
            icon = <SecurityIcon />;
            color = theme.palette.primary.main;
            break;
          case 'THREAT':
            icon = <WarningIcon />;
            color = '#ff9800';
            break;
          case 'CLIENT':
            icon = <PersonIcon />;
            color = theme.palette.info.main;
            break;
          case 'COMPLIANCE':
            icon = <DomainVerificationIcon />;
            color = theme.palette.success.main;
            break;
          default:
            icon = <SettingsIcon />;
            color = theme.palette.grey[700];
        }
        
        return (
          <ListItem 
            key={activity.id} 
            sx={{ 
              bgcolor: index % 2 === 0 ? 'rgba(0, 0, 0, 0.02)' : 'transparent', 
              borderRadius: 1 
            }}
          >
            <ListItemIcon>
              {React.cloneElement(icon, { sx: { color } })}
            </ListItemIcon>
            <ListItemText 
              primary={activity.description} 
              secondary={new Date(activity.timestamp).toLocaleString()}
            />
            <Chip 
              label={activity.type} 
              color={
                activity.type === 'THREAT' ? 'warning' : 
                activity.type === 'COMPLIANCE' ? 'success' : 
                activity.type === 'CLIENT' ? 'info' : 
                'default'
              } 
              size="small" 
            />
          </ListItem>
        );
      })}
    </List>
  );
};

export default ActivityLogList;
