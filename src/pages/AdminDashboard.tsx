import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  Grid as MuiGrid,
  IconButton,
  InputAdornment,
  LinearProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Paper,
  Tab,
  Tabs,
  TextField,
  Typography,
  useTheme
} from '@mui/material';
import { styled } from '@mui/material/styles';

// Icons
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AddIcon from '@mui/icons-material/Add';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import BusinessIcon from '@mui/icons-material/Business';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import DomainVerificationIcon from '@mui/icons-material/DomainVerification';
import ErrorIcon from '@mui/icons-material/Error';
import FilterListIcon from '@mui/icons-material/FilterList';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import WarningIcon from '@mui/icons-material/Warning';
import SecurityIcon from '@mui/icons-material/Security';

// Components
import SimpleTable from '../components/dashboardComponents/SimpleTable.backend';
import ActivityLogList from '../components/dashboardComponents/ActivityLogList';
import ConsultantsList from '../components/dashboardComponents/ConsultantsList';
import SystemHealthList from '../components/dashboardComponents/SystemHealthList';
import { 
  ThreatApi, 
  ClientApi, 
  SecurityMetricApi, 
  SecurityScanApi, 
  SystemApi, 
  ActivityLogApi, 
  UserApi
} from '../backend';

// Import directly from the source file
import type { ApiResponse } from '../backend/utils/apiResponse';

// Create a properly typed Grid component to fix TypeScript errors
interface GridProps {
  container?: boolean;
  item?: boolean;
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  spacing?: number;
  sx?: any;
  children?: React.ReactNode;
  [key: string]: any;
}

const Grid = (props: GridProps) => {
  return <MuiGrid {...props} />;
};

// Define interfaces for our state types
interface ClientStats {
  total: number;
  active: number;
  pending: number;
  inactive: number;
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
  scheduled: number;
}

interface SystemStats {
  total: number;
  healthy: number;
  warning: number;
  critical: number;
}

interface Consultant {
  id: string;
  name: string;
  role: string;
  status: string;
  avatarUrl?: string;
}

// Use the type from the backend
type ActivityLog = {
  id: string;
  type: string;
  description: string;
  timestamp: string;
  userId: string;
};

interface Client {
  id: number;
  name: string;
  type: string;
  consultants: number;
  securityScore: number;
  status: string;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`admin-tabpanel-${index}`}
      aria-labelledby={`admin-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const AdminDashboard: React.FC = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [clientStats, setClientStats] = useState<ClientStats>({ total: 0, active: 0, pending: 0, inactive: 0 });
  const [threatStats, setThreatStats] = useState<ThreatStats>({ total: 0, critical: 0, high: 0, medium: 0, low: 0 });
  const [scanStats, setScanStats] = useState<ScanStats>({ total: 0, completed: 0, inProgress: 0, scheduled: 0 });
  const [systemStats, setSystemStats] = useState<SystemStats>({ total: 0, healthy: 0, warning: 0, critical: 0 });
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [consultantsList, setConsultantsList] = useState<Consultant[]>([]);
  const [clientsList, setClientsList] = useState<Client[]>([]);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Fetch data from backend
  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        // In a real app, you would get the user ID from context
        const userId = 'admin123';
        const clientId = 'client123';
        
        // Fetch client statistics
        const clientResponse: ApiResponse<any> = await ClientApi.getClientStatistics(userId);
        if (clientResponse.success && clientResponse.data) {
          setClientStats({
            total: clientResponse.data.totalClients,
            active: clientResponse.data.byStatus.active,
            pending: clientResponse.data.byStatus.pending,
            inactive: clientResponse.data.byStatus.inactive
          });
        }
        
        // Fetch threat statistics
        const threatResponse: ApiResponse<any> = await ThreatApi.getThreatStatistics(clientId, userId);
        if (threatResponse.success && threatResponse.data) {
          setThreatStats({
            total: threatResponse.data.totalThreats,
            critical: threatResponse.data.bySeverity.critical,
            high: threatResponse.data.bySeverity.high,
            medium: threatResponse.data.bySeverity.medium,
            low: threatResponse.data.bySeverity.low
          });
        }

        // Fetch security scan statistics
        const scanResponse: ApiResponse<any> = await SecurityScanApi.getScanStatistics(clientId, userId);
        if (scanResponse.success && scanResponse.data) {
          setScanStats({
            total: scanResponse.data.totalScans,
            completed: scanResponse.data.byStatus.completed || 0,
            inProgress: scanResponse.data.byStatus.inProgress || 0,
            scheduled: scanResponse.data.byStatus.scheduled || 0
          });
        }

        // Fetch system statistics
        const systemResponse: ApiResponse<any> = await SystemApi.getSystemStatistics(clientId, userId);
        if (systemResponse.success && systemResponse.data) {
          setSystemStats({
            total: systemResponse.data.totalSystems,
            healthy: systemResponse.data.byStatus.protected || 0,
            warning: systemResponse.data.byStatus.atRisk || 0,
            critical: systemResponse.data.byStatus.compromised || 0
          });
        }

        // Fetch recent activity logs
        const activityResponse: ApiResponse<any> = await ActivityLogApi.getAllLogs(5, userId);
        if (activityResponse.success && activityResponse.data) {
          setActivityLogs(activityResponse.data);
        }

        // Fetch consultants - using mock data for now as the API method might not exist
        // In a real implementation, this would use the proper API method
        setConsultantsList([
          { id: '1', name: 'John Smith', role: 'Senior Consultant', status: 'Active' },
          { id: '2', name: 'Emma Wilson', role: 'Student Consultant', status: 'Active' },
          { id: '3', name: 'Michael Chen', role: 'Faculty Advisor', status: 'Active' },
          { id: '4', name: 'Sarah Johnson', role: 'Student Consultant', status: 'On Leave' },
          { id: '5', name: 'David Williams', role: 'Student Consultant', status: 'Active' },
        ]);
        
        // When the API method is available, use this code:
        // const consultantResponse: ApiResponseType<any> = await UserApi.getUsersByType('consultant', userId);
        // if (consultantResponse.success && consultantResponse.data) {
        //   setConsultantsList(consultantResponse.data.map(user => ({
        //     id: user.id,
        //     name: user.name || 'Unknown',
        //     role: user.role || 'Consultant',
        //     status: user.status || 'Active',
        //     avatarUrl: user.avatarUrl
        //   })));
        // }
        
        // Mock client data for now - will be replaced with real API call in future
        setClientsList([
          { id: 1, name: 'Harbor Dental Group', type: 'Healthcare', consultants: 2, securityScore: 68, status: 'Active' },
          { id: 2, name: 'Riverside Café', type: 'Restaurant', consultants: 1, securityScore: 85, status: 'Active' },
          { id: 3, name: 'Westfield Law Partners', type: 'Professional Services', consultants: 2, securityScore: 72, status: 'Active' },
          { id: 4, name: 'Grove Elementary School', type: 'Education', consultants: 3, securityScore: 90, status: 'Active' },
          { id: 5, name: 'Sunrise Senior Living', type: 'Healthcare', consultants: 2, securityScore: 63, status: 'Pending Review' },
        ]);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);

  // Dashboard statistics - using real data from backend
  const adminStats = [
    { title: 'Total Consultants', value: consultantsList.length.toString(), icon: <PersonIcon />, color: theme.palette.primary.main },
    { title: 'Active Clients', value: loading ? '...' : clientStats.active.toString(), icon: <BusinessIcon />, color: theme.palette.secondary.main },
    { title: 'Security Scans', value: loading ? '...' : scanStats.total.toString(), icon: <DomainVerificationIcon />, color: '#7e57c2' },
    { title: 'Active Threats', value: loading ? '...' : threatStats.total.toString(), icon: <SecurityIcon />, color: '#f44336' },
  ];

  // Pending approvals
  const pendingApprovals = [
    { id: 1, title: 'Security Assessment Report', client: 'Harbor Dental Group', requestedBy: 'John Smith', date: '2023-04-25' },
    { id: 2, title: 'Vulnerability Scan Results', client: 'Riverside Café', requestedBy: 'Emma Wilson', date: '2023-04-24' },
    { id: 3, title: 'Compliance Certificate', client: 'Grove Elementary School', requestedBy: 'Michael Chen', date: '2023-04-23' },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Paper
        variant="outlined"
        sx={{ borderRadius: 2, p: 3, mb: 4 }}
      >
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
          Admin Dashboard
        </Typography>
        
        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {adminStats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper
                elevation={1}
                sx={{
                  p: 2,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  borderLeft: `4px solid ${stat.color}`,
                  borderRadius: 2
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Box sx={{ mr: 1, color: stat.color }}>
                    {stat.icon}
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {stat.value}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {stat.title}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
        
        {/* Quick Actions & Pending Approvals */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Button 
              variant="contained" 
              fullWidth 
              startIcon={<PersonIcon />}
              sx={{ p: 1.5, borderRadius: 2, textTransform: 'none', justifyContent: 'flex-start' }}
            >
              <Box sx={{ textAlign: 'left' }}>
                <Typography variant="subtitle2">Add New Client</Typography>
                <Typography variant="caption" sx={{ opacity: 0.8 }}>
                  Create a new client profile
                </Typography>
              </Box>
            </Button>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Button 
              variant="contained" 
              fullWidth 
              color="secondary"
              startIcon={<DesignServicesIcon />}
              sx={{ p: 1.5, borderRadius: 2, textTransform: 'none', justifyContent: 'flex-start' }}
            >
              <Box sx={{ textAlign: 'left' }}>
                <Typography variant="subtitle2">New Assessment</Typography>
                <Typography variant="caption" sx={{ opacity: 0.8 }}>
                  Start a security assessment
                </Typography>
              </Box>
            </Button>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Button 
              variant="contained" 
              fullWidth 
              color="info"
              startIcon={<SecurityIcon />}
              sx={{ p: 1.5, borderRadius: 2, textTransform: 'none', justifyContent: 'flex-start' }}
            >
              <Box sx={{ textAlign: 'left' }}>
                <Typography variant="subtitle2">Security Scan</Typography>
                <Typography variant="caption" sx={{ opacity: 0.8 }}>
                  Run a new security scan
                </Typography>
              </Box>
            </Button>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Button 
              variant="contained" 
              fullWidth 
              color="warning"
              startIcon={<AdminPanelSettingsIcon />}
              sx={{ p: 1.5, borderRadius: 2, textTransform: 'none', justifyContent: 'flex-start' }}
            >
              <Box sx={{ textAlign: 'left' }}>
                <Typography variant="subtitle2">Program Settings</Typography>
                <Typography variant="caption" sx={{ opacity: 0.8 }}>
                  Manage security program
                </Typography>
              </Box>
            </Button>
          </Grid>
        </Grid>
        
        {/* Pending Approvals */}
        <Paper
          variant="outlined"
          sx={{ borderRadius: 2, p: 2, mb: 4 }}
        >
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
            Pending Approvals
          </Typography>
          
          {pendingApprovals.length > 0 ? (
            <List>
              {pendingApprovals.map((approval) => (
                <ListItem key={approval.id} sx={{ px: 2, py: 1 }}>
                  <ListItemIcon>
                    <AccessTimeIcon color="warning" />
                  </ListItemIcon>
                  <ListItemText 
                    primary={approval.title} 
                    secondary={`Client: ${approval.client} • Requested by: ${approval.requestedBy}`}
                  />
                  <Box>
                    <Button size="small" variant="contained" color="primary" sx={{ mr: 1 }}>
                      Approve
                    </Button>
                    <Button size="small" variant="outlined">
                      Review
                    </Button>
                  </Box>
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="body2" color="text.secondary" sx={{ p: 2, textAlign: 'center' }}>
              No pending approvals
            </Typography>
          )}
        </Paper>
        
        {/* Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            aria-label="admin dashboard tabs"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="Clients" />
            <Tab label="Consultants" />
            <Tab label="Activity" />
            <Tab label="System Status" />
          </Tabs>
        </Box>
        
        {/* Clients Tab */}
        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper
                variant="outlined"
                sx={{ borderRadius: 2, p: 3 }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Client List
                  </Typography>
                  <Box>
                    <TextField
                      size="small"
                      placeholder="Search clients..."
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon fontSize="small" />
                          </InputAdornment>
                        ),
                      }}
                      sx={{ mr: 1 }}
                    />
                    <Button
                      variant="contained"
                      startIcon={<AddIcon />}
                      size="small"
                    >
                      Add New
                    </Button>
                  </Box>
                </Box>
                
                {loading ? (
                  <LinearProgress />
                ) : (
                  <List>
                    {clientsList.map((client, index) => (
                      <ListItem key={client.id} sx={{ bgcolor: index % 2 === 0 ? 'rgba(0, 0, 0, 0.02)' : 'transparent', borderRadius: 1 }}>
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                            <BusinessIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText 
                          primary={client.name} 
                          secondary={`Type: ${client.type} • Consultants: ${client.consultants}`}
                        />
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Typography variant="body2" sx={{ mr: 2 }}>
                            Security Score: 
                            <Typography component="span" sx={{ ml: 0.5, fontWeight: 600, color: 
                              client.securityScore >= 80 ? 'success.main' : 
                              client.securityScore >= 60 ? 'warning.main' : 'error.main' 
                            }}>
                              {client.securityScore}%
                            </Typography>
                          </Typography>
                          <Chip 
                            label={client.status} 
                            color={client.status === 'Active' ? 'success' : 'warning'} 
                            size="small" 
                            sx={{ mr: 1 }} 
                          />
                          <IconButton size="small">
                            <MoreVertIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </ListItem>
                    ))}
                  </List>
                )}
              </Paper>
            </Grid>
          </Grid>
        </TabPanel>
        
        {/* Consultants Tab */}
        <TabPanel value={tabValue} index={1}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={7}>
              <Paper
                variant="outlined"
                sx={{ borderRadius: 2, p: 3 }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Security Consultants
                  </Typography>
                  <Box>
                    <TextField
                      size="small"
                      placeholder="Search consultants..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon fontSize="small" />
                          </InputAdornment>
                        ),
                      }}
                      sx={{ mr: 1 }}
                    />
                    <Button
                      variant="contained"
                      startIcon={<AddIcon />}
                      size="small"
                    >
                      Add New
                    </Button>
                  </Box>
                </Box>
                
                <ConsultantsList 
                  consultants={consultantsList}
                  loading={loading}
                  searchTerm={searchTerm}
                />
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={5}>
              <Paper
                variant="outlined"
                sx={{ borderRadius: 2, p: 3, height: '100%' }}
              >
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  Consultant Performance
                </Typography>
                
                <List>
                  <ListItem>
                    <ListItemText 
                      primary="Total Clients Managed" 
                      secondary="Across all consultants"
                    />
                    <Chip label={clientStats.total} color="primary" />
                  </ListItem>
                  
                  <ListItem>
                    <ListItemText 
                      primary="Average Security Score" 
                      secondary="All clients"
                    />
                    <Chip label="76%" color="success" />
                  </ListItem>
                  
                  <ListItem>
                    <ListItemText 
                      primary="Assessments Completed" 
                      secondary="Last 30 days"
                    />
                    <Chip label="12" color="info" />
                  </ListItem>
                  
                  <ListItem>
                    <ListItemText 
                      primary="Pending Assessments" 
                      secondary="Requiring attention"
                    />
                    <Chip label="5" color="warning" />
                  </ListItem>
                </List>
              </Paper>
            </Grid>
          </Grid>
        </TabPanel>
        
        {/* Activity Tab */}
        <TabPanel value={tabValue} index={2}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper
                variant="outlined"
                sx={{ borderRadius: 2, p: 3 }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Recent Activity
                  </Typography>
                  <Box>
                    <Button
                      variant="outlined"
                      startIcon={<FilterListIcon />}
                      size="small"
                      sx={{ mr: 1 }}
                    >
                      Filter
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<AnalyticsIcon />}
                      size="small"
                    >
                      Export
                    </Button>
                  </Box>
                </Box>
                
                <ActivityLogList 
                  activities={activityLogs}
                  loading={loading}
                />
              </Paper>
            </Grid>
          </Grid>
        </TabPanel>
        
        {/* System Status Tab */}
        <TabPanel value={tabValue} index={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={5}>
              <SimpleTable />
            </Grid>
            <Grid item xs={12} md={7}>
              <Paper
                variant="outlined"
                sx={{ borderRadius: 2, p: 3, height: '100%' }}
              >
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  System Health
                </Typography>
                
                <SystemHealthList 
                  systemStats={systemStats}
                  loading={loading}
                />
                
                <Divider sx={{ my: 2 }} />
                
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  System Resources
                </Typography>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid item xs={12} md={4}>
                    <Box>
                      <Typography variant="subtitle2" gutterBottom>
                        CPU Usage
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={23}
                        sx={{
                          height: 10,
                          borderRadius: 5,
                          backgroundColor: 'rgba(0, 0, 0, 0.08)',
                          mb: 1
                        }}
                      />
                      <Typography variant="caption" color="textSecondary">
                        23% - Normal
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Box>
                      <Typography variant="subtitle2" gutterBottom>
                        Memory Usage
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={48}
                        sx={{
                          height: 10,
                          borderRadius: 5,
                          backgroundColor: 'rgba(0, 0, 0, 0.08)',
                          mb: 1
                        }}
                      />
                      <Typography variant="caption" color="textSecondary">
                        48% - Normal
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Box>
                      <Typography variant="subtitle2" gutterBottom>
                        Disk Space
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={65}
                        sx={{
                          height: 10,
                          borderRadius: 5,
                          backgroundColor: 'rgba(0, 0, 0, 0.08)',
                          mb: 1
                        }}
                      />
                      <Typography variant="caption" color="textSecondary">
                        65% - Normal
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </TabPanel>
      </Paper>
    </Box>
  );
};

export default AdminDashboard;
