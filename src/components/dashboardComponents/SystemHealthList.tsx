import React from 'react';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Typography,
  LinearProgress
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';

interface SystemStats {
  total: number;
  healthy: number;
  warning: number;
  critical: number;
}

interface SystemHealthListProps {
  systemStats: SystemStats;
  loading: boolean;
}

const SystemHealthList: React.FC<SystemHealthListProps> = ({ systemStats, loading }) => {
  if (loading) {
    return <LinearProgress />;
  }

  return (
    <List dense>
      <ListItem>
        <ListItemIcon>
          <CheckCircleIcon sx={{ color: '#4caf50' }} />
        </ListItemIcon>
        <ListItemText 
          primary="Healthy Systems" 
          secondary={`${systemStats.healthy} systems operating normally`}
        />
        <Chip label="Healthy" color="success" size="small" />
      </ListItem>
      
      <ListItem>
        <ListItemIcon>
          <WarningIcon sx={{ color: '#ff9800' }} />
        </ListItemIcon>
        <ListItemText 
          primary="Systems with Warnings" 
          secondary={`${systemStats.warning} systems with warnings`}
        />
        <Chip label="Warning" color="warning" size="small" />
      </ListItem>
      
      <ListItem>
        <ListItemIcon>
          <ErrorIcon sx={{ color: '#f44336' }} />
        </ListItemIcon>
        <ListItemText 
          primary="Critical Systems" 
          secondary={`${systemStats.critical} systems in critical state`}
        />
        <Chip label="Critical" color="error" size="small" />
      </ListItem>
      
      <ListItem>
        <ListItemIcon>
          <CheckCircleIcon sx={{ color: '#4caf50' }} />
        </ListItemIcon>
        <ListItemText 
          primary="Database Status" 
          secondary="Online - Performance Optimal"
        />
        <Chip label="100%" color="success" size="small" />
      </ListItem>
      
      <ListItem>
        <ListItemIcon>
          <CheckCircleIcon sx={{ color: '#4caf50' }} />
        </ListItemIcon>
        <ListItemText 
          primary="API Services" 
          secondary="All endpoints operational"
        />
        <Chip label="100%" color="success" size="small" />
      </ListItem>
    </List>
  );
};

export default SystemHealthList;
