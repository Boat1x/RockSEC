import {
    Avatar,
    Box,
    Button,
    Chip,
    Divider,
    Grid,
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
import React, { useState } from 'react';

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

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Mock data for demonstration
  const adminStats = [
    { title: 'Total Consultants', value: '24', icon: <PersonIcon />, color: theme.palette.primary.main },
    { title: 'Active Clients', value: '47', icon: <BusinessIcon />, color: theme.palette.secondary.main },
    { title: 'Security Assessments', value: '156', icon: <DomainVerificationIcon />, color: '#7e57c2' },
    { title: 'Active Issues', value: '12', icon: <WarningIcon />, color: '#f44336' },
  ];

  // Mock consultant data
  const consultants = [
    { id: 1, name: 'John Smith', role: 'Senior Consultant', clients: 5, status: 'Active' },
    { id: 2, name: 'Emma Wilson', role: 'Student Consultant', clients: 3, status: 'Active' },
    { id: 3, name: 'Michael Chen', role: 'Faculty Advisor', clients: 0, status: 'Active' },
    { id: 4, name: 'Sarah Johnson', role: 'Student Consultant', clients: 2, status: 'On Leave' },
    { id: 5, name: 'David Williams', role: 'Student Consultant', clients: 4, status: 'Active' },
  ];

  // Mock client data
  const clients = [
    { id: 1, name: 'Harbor Dental Group', type: 'Healthcare', consultants: 2, securityScore: 68, status: 'Active' },
    { id: 2, name: 'Riverside Café', type: 'Restaurant', consultants: 1, securityScore: 85, status: 'Active' },
    { id: 3, name: 'Westfield Law Partners', type: 'Professional Services', consultants: 2, securityScore: 72, status: 'Active' },
    { id: 4, name: 'Grove Elementary School', type: 'Education', consultants: 3, securityScore: 90, status: 'Active' },
    { id: 5, name: 'Sunrise Senior Living', type: 'Healthcare', consultants: 2, securityScore: 63, status: 'Pending Review' },
  ];

  // Mock recent activity
  const recentActivity = [
    { action: 'New client onboarded', details: 'Lakeside Pharmacy added to client list', time: '2 hours ago', user: 'John Smith' },
    { action: 'Assessment completed', details: 'Grove Elementary School assessment finalized', time: '3 hours ago', user: 'Emma Wilson' },
    { action: 'New vulnerability detected', details: 'Critical issue found at Harbor Dental Group', time: '5 hours ago', user: 'System Alert' },
    { action: 'User account created', details: 'New consultant account for Thomas Lee', time: 'Yesterday', user: 'Admin' },
    { action: 'Client status updated', details: 'Riverside Café marked as compliant', time: 'Yesterday', user: 'David Williams' },
  ];

  // Mock pending approvals
  const pendingApprovals = [
    { id: 1, type: 'New Consultant', name: 'Alexandra Rodriguez', details: 'Student, Cybersecurity Major', submitted: '2 days ago' },
    { id: 2, type: 'Assessment Report', client: 'Sunrise Senior Living', submitted: '1 day ago', consultant: 'John Smith' },
    { id: 3, type: 'Client Request', client: 'Metro Credit Union', details: 'Requesting security assessment', submitted: '3 days ago' },
  ];

  // Filter consultants based on search term
  const filteredConsultants = consultants.filter(
    consultant => consultant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter clients based on search term
  const filteredClients = clients.filter(
    client => client.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
            Admin Dashboard
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Manage consultants, clients, and system settings
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button 
            variant="contained" 
            startIcon={<SettingsIcon />}
            sx={{ 
              borderRadius: 2,
              backgroundColor: theme.palette.grey[800],
              '&:hover': {
                backgroundColor: theme.palette.grey[900],
              }
            }}
          >
            System Settings
          </Button>
        </Box>
      </Box>
      
      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {adminStats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper
              elevation={1}
              sx={{
                p: 3,
                borderRadius: 2,
                background: '#ffffff',
                border: '1px solid rgba(0, 0, 0, 0.04)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
                },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ bgcolor: `${stat.color}15`, color: stat.color, mr: 2 }}>
                  {stat.icon}
                </Avatar>
                <Box>
                  <Typography variant="h4" component="p" sx={{ fontWeight: 700, color: stat.color }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {stat.title}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
      
      {/* Admin Actions */}
      <Paper sx={{ p: 3, borderRadius: 2, mb: 4 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
          Quick Actions
        </Typography>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Button 
              variant="outlined" 
              fullWidth 
              startIcon={<PersonIcon />}
              sx={{ 
                justifyContent: 'flex-start', 
                py: 1.5,
                borderRadius: 2,
                borderColor: theme.palette.primary.main,
                color: theme.palette.primary.main,
                '&:hover': {
                  backgroundColor: `${theme.palette.primary.main}10`,
                },
              }}
            >
              Add Consultant
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button 
              variant="outlined" 
              fullWidth 
              startIcon={<BusinessIcon />}
              sx={{ 
                justifyContent: 'flex-start', 
                py: 1.5,
                borderRadius: 2,
                borderColor: theme.palette.secondary.main,
                color: theme.palette.secondary.main,
                '&:hover': {
                  backgroundColor: `${theme.palette.secondary.main}10`,
                },
              }}
            >
              Register Client
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button 
              variant="outlined" 
              fullWidth 
              startIcon={<AnalyticsIcon />}
              sx={{ 
                justifyContent: 'flex-start', 
                py: 1.5,
                borderRadius: 2,
                borderColor: '#7e57c2',
                color: '#7e57c2',
                '&:hover': {
                  backgroundColor: 'rgba(126, 87, 194, 0.1)',
                },
              }}
            >
              View Reports
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button 
              variant="outlined" 
              fullWidth 
              startIcon={<AdminPanelSettingsIcon />}
              sx={{ 
                justifyContent: 'flex-start', 
                py: 1.5,
                borderRadius: 2,
                borderColor: theme.palette.grey[700],
                color: theme.palette.grey[700],
                '&:hover': {
                  backgroundColor: 'rgba(97, 97, 97, 0.1)',
                },
              }}
            >
              Manage Users
            </Button>
          </Grid>
        </Grid>
      </Paper>
      
      {/* Pending Approvals */}
      <Paper sx={{ p: 3, borderRadius: 2, mb: 4 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
          Pending Approvals
        </Typography>
        <List>
          {pendingApprovals.map((item, index) => (
            <ListItem 
              key={item.id}
              sx={{ 
                py: 2,
                borderLeft: '4px solid',
                borderLeftColor: 
                  item.type === 'New Consultant' ? theme.palette.primary.main : 
                  item.type === 'Assessment Report' ? theme.palette.secondary.main : '#ff9800',
                pl: 2,
                backgroundColor: 'rgba(0, 0, 0, 0.02)',
                borderRadius: '0 4px 4px 0',
                mb: 2
              }}
            >
              <ListItemAvatar>
                <Avatar sx={{ 
                  bgcolor: 
                    item.type === 'New Consultant' ? `${theme.palette.primary.main}15` : 
                    item.type === 'Assessment Report' ? `${theme.palette.secondary.main}15` : 
                    'rgba(255, 152, 0, 0.1)',
                  color: 
                    item.type === 'New Consultant' ? theme.palette.primary.main : 
                    item.type === 'Assessment Report' ? theme.palette.secondary.main : 
                    '#ff9800',
                }}>
                  {item.type === 'New Consultant' ? <PersonIcon /> : 
                   item.type === 'Assessment Report' ? <DesignServicesIcon /> : 
                   <BusinessIcon />}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {item.type}
                  </Typography>
                }
                secondary={
                  <Box sx={{ mt: 0.5 }}>
                    <Typography variant="body2">
                      {item.type === 'New Consultant' ? `${item.name} - ${item.details}` : 
                       item.type === 'Assessment Report' ? `For ${item.client} by ${item.consultant}` : 
                       `${item.client} - ${item.details}`}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      Submitted {item.submitted}
                    </Typography>
                  </Box>
                }
              />
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button 
                  variant="contained" 
                  size="small"
                  color="primary"
                  sx={{ borderRadius: 2 }}
                >
                  Approve
                </Button>
                <Button 
                  variant="outlined" 
                  size="small"
                  color="error"
                  sx={{ borderRadius: 2 }}
                >
                  Reject
                </Button>
              </Box>
            </ListItem>
          ))}
        </List>
      </Paper>
      
      {/* Main Tabs */}
      <Paper sx={{ borderRadius: 2 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            aria-label="admin dashboard tabs"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="Consultants" />
            <Tab label="Clients" />
            <Tab label="Activity Log" />
            <Tab label="System Status" />
          </Tabs>
        </Box>
        
        {/* Consultants Tab */}
        <TabPanel value={tabValue} index={0}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <TextField
              placeholder="Search consultants..."
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ width: 300 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button 
                variant="outlined" 
                startIcon={<FilterListIcon />}
                size="small"
                sx={{ borderRadius: 2 }}
              >
                Filter
              </Button>
              <Button 
                variant="contained" 
                startIcon={<AddIcon />}
                size="small"
                sx={{ borderRadius: 2 }}
              >
                Add Consultant
              </Button>
            </Box>
          </Box>
          
          <Paper variant="outlined" sx={{ borderRadius: 2 }}>
            <List>
              {filteredConsultants.map((consultant, index) => (
                <React.Fragment key={consultant.id}>
                  <ListItem
                    secondaryAction={
                      <IconButton edge="end">
                        <MoreVertIcon />
                      </IconButton>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                        {consultant.name.charAt(0)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                            {consultant.name}
                          </Typography>
                          <Chip 
                            label={consultant.status} 
                            size="small"
                            sx={{ 
                              ml: 2,
                              backgroundColor: consultant.status === 'Active' 
                                ? 'rgba(76, 175, 80, 0.1)' 
                                : 'rgba(255, 152, 0, 0.1)',
                              color: consultant.status === 'Active' ? '#4caf50' : '#ff9800',
                              fontSize: '0.75rem',
                              height: 24
                            }}
                          />
                        </Box>
                      }
                      secondary={
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5, alignItems: 'center' }}>
                          <Typography variant="body2" color="textSecondary">
                            {consultant.role} • {consultant.clients} {consultant.clients === 1 ? 'client' : 'clients'}
                          </Typography>
                          <Box>
                            <Button 
                              variant="text" 
                              size="small" 
                              sx={{ minWidth: 'auto', mr: 1 }}
                            >
                              Edit
                            </Button>
                            <Button 
                              variant="text" 
                              size="small" 
                              sx={{ minWidth: 'auto' }}
                            >
                              View
                            </Button>
                          </Box>
                        </Box>
                      }
                    />
                  </ListItem>
                  {index < filteredConsultants.length - 1 && <Divider component="li" />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </TabPanel>
        
        {/* Clients Tab */}
        <TabPanel value={tabValue} index={1}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <TextField
              placeholder="Search clients..."
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ width: 300 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button 
                variant="outlined" 
                startIcon={<FilterListIcon />}
                size="small"
                sx={{ borderRadius: 2 }}
              >
                Filter
              </Button>
              <Button 
                variant="contained" 
                startIcon={<AddIcon />}
                size="small"
                sx={{ borderRadius: 2 }}
              >
                Add Client
              </Button>
            </Box>
          </Box>
          
          <Paper variant="outlined" sx={{ borderRadius: 2 }}>
            <List>
              {filteredClients.map((client, index) => (
                <React.Fragment key={client.id}>
                  <ListItem
                    secondaryAction={
                      <IconButton edge="end">
                        <MoreVertIcon />
                      </IconButton>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: theme.palette.secondary.main }}>
                        <BusinessIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                            {client.name}
                          </Typography>
                          <Chip 
                            label={client.status} 
                            size="small"
                            sx={{ 
                              ml: 2,
                              backgroundColor: client.status === 'Active' 
                                ? 'rgba(76, 175, 80, 0.1)' 
                                : 'rgba(255, 152, 0, 0.1)',
                              color: client.status === 'Active' ? '#4caf50' : '#ff9800',
                              fontSize: '0.75rem',
                              height: 24
                            }}
                          />
                        </Box>
                      }
                      secondary={
                        <Box sx={{ mt: 0.5 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="body2" color="textSecondary">
                              {client.type} • {client.consultants} {client.consultants === 1 ? 'consultant' : 'consultants'}
                            </Typography>
                            <Box>
                              <Button 
                                variant="text" 
                                size="small" 
                                sx={{ minWidth: 'auto', mr: 1 }}
                              >
                                Edit
                              </Button>
                              <Button 
                                variant="text" 
                                size="small" 
                                sx={{ minWidth: 'auto' }}
                              >
                                View
                              </Button>
                            </Box>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                            <Typography variant="body2" sx={{ mr: 1 }}>Security Score:</Typography>
                            <Box sx={{ flexGrow: 1, mr: 2 }}>
                              <LinearProgress
                                variant="determinate"
                                value={client.securityScore}
                                sx={{
                                  height: 8,
                                  borderRadius: 4,
                                  backgroundColor: 'rgba(0, 0, 0, 0.08)',
                                  '& .MuiLinearProgress-bar': {
                                    backgroundColor: 
                                      client.securityScore >= 80 ? '#4caf50' :
                                      client.securityScore >= 60 ? '#ff9800' : '#f44336'
                                  }
                                }}
                              />
                            </Box>
                            <Typography 
                              variant="body2" 
                              sx={{ 
                                fontWeight: 600, 
                                color:
                                  client.securityScore >= 80 ? '#4caf50' :
                                  client.securityScore >= 60 ? '#ff9800' : '#f44336' 
                              }}
                            >
                              {client.securityScore}%
                            </Typography>
                          </Box>
                        </Box>
                      }
                    />
                  </ListItem>
                  {index < filteredClients.length - 1 && <Divider component="li" />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </TabPanel>
        
        {/* Activity Log Tab */}
        <TabPanel value={tabValue} index={2}>
          <Paper variant="outlined" sx={{ borderRadius: 2 }}>
            <List>
              {recentActivity.map((activity, index) => (
                <React.Fragment key={index}>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar sx={{ 
                        bgcolor: 
                          activity.action.includes('New') ? 'rgba(25, 118, 210, 0.1)' : 
                          activity.action.includes('completed') ? 'rgba(76, 175, 80, 0.1)' :
                          activity.action.includes('vulnerability') ? 'rgba(244, 67, 54, 0.1)' :
                          'rgba(255, 152, 0, 0.1)',
                        color:
                          activity.action.includes('New') ? theme.palette.primary.main : 
                          activity.action.includes('completed') ? '#4caf50' :
                          activity.action.includes('vulnerability') ? '#f44336' :
                          '#ff9800',
                      }}>
                        {activity.action.includes('New') ? <AddIcon /> : 
                         activity.action.includes('completed') ? <CheckCircleIcon /> :
                         activity.action.includes('vulnerability') ? <ErrorIcon /> :
                         <AccessTimeIcon />}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                          {activity.action}
                        </Typography>
                      }
                      secondary={
                        <Box sx={{ mt: 0.5 }}>
                          <Typography variant="body2" paragraph>
                            {activity.details}
                          </Typography>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="caption" color="textSecondary">
                              {activity.time}
                            </Typography>
                            <Typography variant="caption" sx={{ fontWeight: 500 }}>
                              By: {activity.user}
                            </Typography>
                          </Box>
                        </Box>
                      }
                    />
                  </ListItem>
                  {index < recentActivity.length - 1 && <Divider component="li" />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </TabPanel>
        
        {/* System Status Tab */}
        <TabPanel value={tabValue} index={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper
                variant="outlined"
                sx={{ borderRadius: 2, p: 3, height: '100%' }}
              >
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  System Health
                </Typography>
                <List dense>
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
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon sx={{ color: '#4caf50' }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Authentication System" 
                      secondary="Working normally"
                    />
                    <Chip label="100%" color="success" size="small" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <WarningIcon sx={{ color: '#ff9800' }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Notification Service" 
                      secondary="Minor delays observed"
                    />
                    <Chip label="94%" color="warning" size="small" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon sx={{ color: '#4caf50' }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary="File Storage" 
                      secondary="Operating normally"
                    />
                    <Chip label="100%" color="success" size="small" />
                  </ListItem>
                </List>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Paper
                variant="outlined"
                sx={{ borderRadius: 2, p: 3, height: '100%' }}
              >
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  Recent System Updates
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon sx={{ color: '#4caf50' }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Security Patch 2.4.1" 
                      secondary="Applied yesterday - Vulnerability fixes"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon sx={{ color: '#4caf50' }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Database Optimization" 
                      secondary="Completed 2 days ago - Performance improved by 15%"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon sx={{ color: '#4caf50' }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary="UI/UX Enhancements" 
                      secondary="Deployed 5 days ago - Client dashboard updates"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon sx={{ color: '#4caf50' }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary="New Feature: Assessment Templates" 
                      secondary="Added 1 week ago - Standardized templates for consultants"
                    />
                  </ListItem>
                </List>
                <Box sx={{ mt: 2 }}>
                  <Button variant="outlined" size="small" fullWidth>
                    View All System Updates
                  </Button>
                </Box>
              </Paper>
            </Grid>
            
            <Grid item xs={12}>
              <Paper
                variant="outlined"
                sx={{ borderRadius: 2, p: 3 }}
              >
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