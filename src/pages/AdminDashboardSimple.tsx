import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Stack,
  Button,
  Card,
  CardContent,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Divider,
  CircularProgress
} from '@mui/material';
import {
  Security as SecurityIcon,
  Business as BusinessIcon,
  Person as PersonIcon,
  Assessment as AssessmentIcon,
  Notifications as NotificationsIcon,
  Add as AddIcon,
  Check as CheckIcon,
  Error as ErrorIcon,
  Warning as WarningIcon,
  Info as InfoIcon
} from '@mui/icons-material';

// Create a simple dashboard that doesn't rely on backend API calls
const AdminDashboardSimple: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(false);

  // Mock data for stats
  const stats = {
    clients: { total: 24, active: 18, pending: 6 },
    threats: { total: 56, critical: 8, high: 15, medium: 22, low: 11 },
    scans: { total: 128, completed: 112, inProgress: 16 },
    consultants: { total: 12, active: 10, onLeave: 2 }
  };

  // Mock data for activity logs
  const activityLogs = [
    { id: 1, action: 'Client Added', user: 'John Doe', timestamp: '2025-04-26T14:30:00', severity: 'info' },
    { id: 2, action: 'Threat Detected', user: 'System', timestamp: '2025-04-26T13:45:00', severity: 'critical' },
    { id: 3, action: 'Scan Completed', user: 'Jane Smith', timestamp: '2025-04-26T12:15:00', severity: 'success' },
    { id: 4, action: 'User Login Failed', user: 'Unknown', timestamp: '2025-04-26T11:30:00', severity: 'warning' },
    { id: 5, action: 'Settings Updated', user: 'Admin', timestamp: '2025-04-26T10:00:00', severity: 'info' }
  ];

  // Mock data for consultants
  const consultants = [
    { id: 1, name: 'John Doe', status: 'active', specialization: 'Network Security' },
    { id: 2, name: 'Jane Smith', status: 'active', specialization: 'Application Security' },
    { id: 3, name: 'Bob Johnson', status: 'on-leave', specialization: 'Penetration Testing' },
    { id: 4, name: 'Alice Williams', status: 'active', specialization: 'Security Compliance' }
  ];

  // Mock data for system health
  const systemHealth = [
    { id: 1, name: 'API Server', status: 'healthy', uptime: '99.9%' },
    { id: 2, name: 'Database', status: 'healthy', uptime: '99.8%' },
    { id: 3, name: 'Authentication Service', status: 'warning', uptime: '98.5%' },
    { id: 4, name: 'Storage Service', status: 'healthy', uptime: '99.7%' }
  ];

  // Handle tab change
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Simulate loading data on mount
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Get severity icon based on severity level
  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <ErrorIcon color="error" />;
      case 'warning':
        return <WarningIcon color="warning" />;
      case 'success':
        return <CheckIcon color="success" />;
      default:
        return <InfoIcon color="info" />;
    }
  };

  // Get status chip based on status
  const getStatusChip = (status: string) => {
    switch (status) {
      case 'active':
        return <Chip size="small" label="Active" color="success" />;
      case 'on-leave':
        return <Chip size="small" label="On Leave" color="warning" />;
      case 'healthy':
        return <Chip size="small" label="Healthy" color="success" />;
      case 'warning':
        return <Chip size="small" label="Warning" color="warning" />;
      default:
        return <Chip size="small" label={status} />;
    }
  };

  // Render tab panel content
  const renderTabContent = () => {
    switch (tabValue) {
      case 0: // Clients tab
        return (
          <List>
            <ListItem>
              <ListItemText primary="ABC Corporation" secondary="Active Client" />
              <Chip size="small" label="Active" color="success" />
            </ListItem>
            <ListItem>
              <ListItemText primary="XYZ Industries" secondary="Active Client" />
              <Chip size="small" label="Active" color="success" />
            </ListItem>
            <ListItem>
              <ListItemText primary="123 Enterprises" secondary="Pending Approval" />
              <Chip size="small" label="Pending" color="warning" />
            </ListItem>
          </List>
        );
      case 1: // Consultants tab
        return (
          <List>
            {consultants.map(consultant => (
              <ListItem key={consultant.id}>
                <ListItemText 
                  primary={consultant.name} 
                  secondary={consultant.specialization} 
                />
                {getStatusChip(consultant.status)}
              </ListItem>
            ))}
          </List>
        );
      case 2: // Activity tab
        return (
          <List>
            {activityLogs.map(log => (
              <ListItem key={log.id}>
                <ListItemIcon>
                  {getSeverityIcon(log.severity)}
                </ListItemIcon>
                <ListItemText 
                  primary={log.action} 
                  secondary={`${log.user} • ${new Date(log.timestamp).toLocaleString()}`} 
                />
              </ListItem>
            ))}
          </List>
        );
      case 3: // System Status tab
        return (
          <List>
            {systemHealth.map(system => (
              <ListItem key={system.id}>
                <ListItemText 
                  primary={system.name} 
                  secondary={`Uptime: ${system.uptime}`} 
                />
                {getStatusChip(system.status)}
              </ListItem>
            ))}
          </List>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Paper
        variant="outlined"
        sx={{ borderRadius: 2, p: 3, mb: 4 }}
      >
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
          RockSEC Admin Dashboard
        </Typography>
        
        {/* Stats Cards */}
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 4 }}>
          <Card sx={{ flex: 1 }}>
            <CardContent>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                <BusinessIcon color="primary" />
                <Typography variant="h6">Clients</Typography>
              </Stack>
              <Typography variant="h4">{stats.clients.total}</Typography>
              <Typography variant="body2" color="text.secondary">
                {stats.clients.active} active, {stats.clients.pending} pending
              </Typography>
            </CardContent>
          </Card>
          
          <Card sx={{ flex: 1 }}>
            <CardContent>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                <SecurityIcon color="error" />
                <Typography variant="h6">Threats</Typography>
              </Stack>
              <Typography variant="h4">{stats.threats.total}</Typography>
              <Typography variant="body2" color="text.secondary">
                {stats.threats.critical} critical, {stats.threats.high} high
              </Typography>
            </CardContent>
          </Card>
          
          <Card sx={{ flex: 1 }}>
            <CardContent>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                <AssessmentIcon color="success" />
                <Typography variant="h6">Scans</Typography>
              </Stack>
              <Typography variant="h4">{stats.scans.total}</Typography>
              <Typography variant="body2" color="text.secondary">
                {stats.scans.completed} completed, {stats.scans.inProgress} in progress
              </Typography>
            </CardContent>
          </Card>
          
          <Card sx={{ flex: 1 }}>
            <CardContent>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                <PersonIcon color="info" />
                <Typography variant="h6">Consultants</Typography>
              </Stack>
              <Typography variant="h4">{stats.consultants.total}</Typography>
              <Typography variant="body2" color="text.secondary">
                {stats.consultants.active} active, {stats.consultants.onLeave} on leave
              </Typography>
            </CardContent>
          </Card>
        </Stack>
        
        {/* Quick Actions */}
        <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
          <Button variant="contained" startIcon={<AddIcon />}>Add Client</Button>
          <Button variant="outlined" startIcon={<AssessmentIcon />}>New Assessment</Button>
          <Button variant="outlined" startIcon={<SecurityIcon />}>Security Scan</Button>
        </Stack>
        
        {/* Tabs and Content */}
        <Paper variant="outlined" sx={{ borderRadius: 2 }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange}
            variant="fullWidth"
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            <Tab label="Clients" />
            <Tab label="Consultants" />
            <Tab label="Activity" />
            <Tab label="System Status" />
          </Tabs>
          
          <Box sx={{ p: 2 }}>
            {renderTabContent()}
          </Box>
        </Paper>
      </Paper>
    </Box>
  );
};

export default AdminDashboardSimple;
