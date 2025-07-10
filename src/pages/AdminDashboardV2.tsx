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
  CircularProgress,
  Alert
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

// Import only the API classes, not the types
import { 
  ThreatApi, 
  ClientApi, 
  SecurityScanApi, 
  SystemApi, 
  ActivityLogApi, 
  UserApi 
} from '../backend';

// Create a type-safe Grid component
const StyledGrid: React.FC<{
  children: React.ReactNode;
  container?: boolean;
  item?: boolean;
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  spacing?: number;
}> = ({ children, ...props }) => {
  // This is just a placeholder to avoid TypeScript errors
  // In a real implementation, you would properly handle the Grid props
  return <div>{children}</div>;
};

// Interface for stats
interface ClientStats {
  total: number;
  active: number;
  pending: number;
}

interface ThreatStats {
  total: number;
  critical: number;
  high: number;
  medium: number;
  low: number;
}

interface ScanStats {
  total: number;
  completed: number;
  inProgress: number;
}

interface ConsultantStats {
  total: number;
  active: number;
  onLeave: number;
}

interface SystemStats {
  total: number;
  healthy: number;
  warning: number;
  critical: number;
}

interface ActivityLog {
  id: string;
  action: string;
  userId: string;
  timestamp: string;
  details: string;
  severity: string;
}

// AdminDashboardV2 component
const AdminDashboardV2: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // State for stats
  const [clientStats, setClientStats] = useState<ClientStats>({
    total: 0,
    active: 0,
    pending: 0
  });
  
  const [threatStats, setThreatStats] = useState<ThreatStats>({
    total: 0,
    critical: 0,
    high: 0,
    medium: 0,
    low: 0
  });
  
  const [scanStats, setScanStats] = useState<ScanStats>({
    total: 0,
    completed: 0,
    inProgress: 0
  });
  
  const [consultantStats, setConsultantStats] = useState<ConsultantStats>({
    total: 0,
    active: 0,
    onLeave: 0
  });
  
  const [systemStats, setSystemStats] = useState<SystemStats>({
    total: 0,
    healthy: 0,
    warning: 0,
    critical: 0
  });
  
  // State for data
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  
  // Mock data for consultants (will be replaced with API call later)
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
  
  // Fetch data from backend
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // For demo purposes, use hardcoded IDs
        const userId = 'user123';
        const clientId = 'client123';
        
        // Try to fetch client statistics
        try {
          const clientResponse = await ClientApi.getClientStatistics(userId);
          if (clientResponse.success && clientResponse.data) {
            setClientStats({
              total: clientResponse.data.totalClients || 0,
              active: clientResponse.data.byStatus?.active || 0,
              pending: clientResponse.data.byStatus?.pending || 0
            });
          }
        } catch (err) {
          console.error('Error fetching client stats:', err);
          // Fall back to mock data if API fails
          setClientStats({
            total: 24,
            active: 18,
            pending: 6
          });
        }
        
        // Try to fetch threat statistics
        try {
          const threatResponse = await ThreatApi.getThreatStatistics(clientId, userId);
          if (threatResponse.success && threatResponse.data) {
            setThreatStats({
              total: threatResponse.data.totalThreats || 0,
              critical: threatResponse.data.bySeverity?.critical || 0,
              high: threatResponse.data.bySeverity?.high || 0,
              medium: threatResponse.data.bySeverity?.medium || 0,
              low: threatResponse.data.bySeverity?.low || 0
            });
          }
        } catch (err) {
          console.error('Error fetching threat stats:', err);
          // Fall back to mock data if API fails
          setThreatStats({
            total: 56,
            critical: 8,
            high: 15,
            medium: 22,
            low: 11
          });
        }
        
        // Try to fetch scan statistics
        try {
          const scanResponse = await SecurityScanApi.getScanStatistics(clientId, userId);
          if (scanResponse.success && scanResponse.data) {
            setScanStats({
              total: scanResponse.data.totalScans || 0,
              completed: scanResponse.data.byStatus?.completed || 0,
              inProgress: scanResponse.data.byStatus?.inProgress || 0
            });
          }
        } catch (err) {
          console.error('Error fetching scan stats:', err);
          // Fall back to mock data if API fails
          setScanStats({
            total: 128,
            completed: 112,
            inProgress: 16
          });
        }
        
        // For now, use mock data for consultants
        setConsultantStats({
          total: 12,
          active: 10,
          onLeave: 2
        });
        
        // Try to fetch system statistics
        try {
          const systemResponse = await SystemApi.getSystemStatistics(clientId, userId);
          if (systemResponse.success && systemResponse.data) {
            setSystemStats({
              total: systemResponse.data.totalSystems || 0,
              healthy: systemResponse.data.byStatus?.protected || 0,
              warning: systemResponse.data.byStatus?.atRisk || 0,
              critical: systemResponse.data.byStatus?.compromised || 0
            });
          }
        } catch (err) {
          console.error('Error fetching system stats:', err);
          // Fall back to mock data if API fails
          setSystemStats({
            total: 8,
            healthy: 6,
            warning: 1,
            critical: 1
          });
        }
        
        // Try to fetch activity logs
        try {
          const activityResponse = await ActivityLogApi.getAllLogs(5, userId);
          if (activityResponse.success && activityResponse.data) {
            // Map the API response to our ActivityLog interface
            const mappedLogs = activityResponse.data.map(log => ({
              id: log.id,
              action: log.action,
              userId: log.userId,
              timestamp: log.timestamp,
              details: log.details || '',
              severity: log.details?.includes('Critical') ? 'critical' : 
                       log.details?.includes('Warning') ? 'warning' : 
                       log.action?.includes('Completed') ? 'success' : 'info'
            }));
            setActivityLogs(mappedLogs);
          }
        } catch (err) {
          console.error('Error fetching activity logs:', err);
          // Fall back to mock data if API fails
          setActivityLogs([
            { id: '1', action: 'Client Added', userId: 'user1', timestamp: '2025-04-26T14:30:00', details: 'Added new client: ABC Corp', severity: 'info' },
            { id: '2', action: 'Threat Detected', userId: 'system', timestamp: '2025-04-26T13:45:00', details: 'Critical vulnerability detected', severity: 'critical' },
            { id: '3', action: 'Scan Completed', userId: 'user2', timestamp: '2025-04-26T12:15:00', details: 'Security scan completed successfully', severity: 'success' },
            { id: '4', action: 'User Login Failed', userId: 'unknown', timestamp: '2025-04-26T11:30:00', details: 'Failed login attempt from IP 192.168.1.1', severity: 'warning' },
            { id: '5', action: 'Settings Updated', userId: 'admin', timestamp: '2025-04-26T10:00:00', details: 'System settings updated', severity: 'info' }
          ]);
        }
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
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
                  secondary={`${log.userId} • ${new Date(log.timestamp).toLocaleString()}`} 
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
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      
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
              <Typography variant="h4">{clientStats.total}</Typography>
              <Typography variant="body2" color="text.secondary">
                {clientStats.active} active, {clientStats.pending} pending
              </Typography>
            </CardContent>
          </Card>
          
          <Card sx={{ flex: 1 }}>
            <CardContent>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                <SecurityIcon color="error" />
                <Typography variant="h6">Threats</Typography>
              </Stack>
              <Typography variant="h4">{threatStats.total}</Typography>
              <Typography variant="body2" color="text.secondary">
                {threatStats.critical} critical, {threatStats.high} high
              </Typography>
            </CardContent>
          </Card>
          
          <Card sx={{ flex: 1 }}>
            <CardContent>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                <AssessmentIcon color="success" />
                <Typography variant="h6">Scans</Typography>
              </Stack>
              <Typography variant="h4">{scanStats.total}</Typography>
              <Typography variant="body2" color="text.secondary">
                {scanStats.completed} completed, {scanStats.inProgress} in progress
              </Typography>
            </CardContent>
          </Card>
          
          <Card sx={{ flex: 1 }}>
            <CardContent>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                <PersonIcon color="info" />
                <Typography variant="h6">Consultants</Typography>
              </Stack>
              <Typography variant="h4">{consultantStats.total}</Typography>
              <Typography variant="body2" color="text.secondary">
                {consultantStats.active} active, {consultantStats.onLeave} on leave
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

export default AdminDashboardV2;
