import {
    Avatar,
    Box,
    Card,
    CardContent,
    Chip,
    CircularProgress,
    Grid,
    LinearProgress,
    List,
    ListItem,
    ListItemText,
    Paper,
    Tab,
    Tabs,
    Typography,
    useTheme
} from '@mui/material';
import React, { useState } from 'react';

// Charts
import {
    CartesianGrid,
    ComposedChart,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';

// Icons
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArticleIcon from '@mui/icons-material/Article';
import AssessmentIcon from '@mui/icons-material/Assessment';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import EnhancedEncryptionIcon from '@mui/icons-material/EnhancedEncryption';
import EventIcon from '@mui/icons-material/Event';
import InfoIcon from '@mui/icons-material/Info';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SecurityIcon from '@mui/icons-material/Security';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import UpdateIcon from '@mui/icons-material/Update';
import WarningIcon from '@mui/icons-material/Warning';

// Data
const securityScore = 68;
const previousScore = 42;
const scoreImprovement = securityScore - previousScore;

// Score history data
const scoreHistoryData = [
  { month: 'Sep', score: 42 },
  { month: 'Oct', score: 45 },
  { month: 'Nov', score: 51 },
  { month: 'Dec', score: 58 },
  { month: 'Jan', score: 62 },
  { month: 'Feb', score: 68 },
];

// Security categories progress data
const securityCategories = [
  { name: 'Network Security', score: 75, target: 85, improvement: 15 },
  { name: 'Data Protection', score: 60, target: 85, improvement: 10 },
  { name: 'Access Control', score: 80, target: 90, improvement: 25 },
  { name: 'Security Awareness', score: 45, target: 80, improvement: 20 },
  { name: 'Physical Security', score: 70, target: 85, improvement: 15 },
];

// Security recommendations
const securityRecommendations = [
  {
    id: 1,
    title: 'Implement Multi-Factor Authentication',
    priority: 'High',
    description: 'Enable MFA for all user accounts to add an extra layer of security against unauthorized access, particularly for accounts with administrative privileges.',
    status: 'Not Started',
    dueDate: 'March 30, 2025',
    assignedTo: 'IT Department'
  },
  {
    id: 2,
    title: 'Upgrade Firewall Software',
    priority: 'Critical',
    description: 'Update the firewall to the latest version to patch known vulnerabilities and ensure protection against recent threats.',
    status: 'In Progress',
    dueDate: 'March 15, 2025',
    assignedTo: 'IT Department'
  },
  {
    id: 3,
    title: 'Implement Regular Data Backups',
    priority: 'High',
    description: 'Set up automated daily backups of all critical business data with both on-site and off-site storage options.',
    status: 'Not Started',
    dueDate: 'April 10, 2025',
    assignedTo: 'IT Department'
  },
  {
    id: 4,
    title: 'Develop Password Policy',
    priority: 'Medium',
    description: 'Create and enforce a strong password policy requiring complex passwords that are changed regularly.',
    status: 'Completed',
    completedDate: 'February 20, 2025',
    assignedTo: 'IT Department'
  },
  {
    id: 5,
    title: 'Security Awareness Training',
    priority: 'Medium',
    description: 'Conduct regular security awareness training sessions for all employees to recognize and avoid security threats.',
    status: 'Scheduled',
    dueDate: 'March 8, 2025',
    assignedTo: 'HR Department'
  },
];

// Vulnerabilities data
const vulnerabilitiesByRisk = [
  { level: 'Critical', count: 1, color: '#d32f2f' },
  { level: 'High', count: 2, color: '#f44336' },
  { level: 'Medium', count: 3, color: '#ff9800' },
  { level: 'Low', count: 5, color: '#03a9f4' },
];

// Recent vulnerabilities
const recentVulnerabilities = [
  {
    id: 1,
    title: 'Outdated Firewall Software',
    severity: 'High',
    discoveredDate: 'February 15, 2025',
    description: 'The firewall is running an outdated version with known vulnerabilities.'
  },
  {
    id: 2,
    title: 'Missing Data Backup',
    severity: 'Critical',
    discoveredDate: 'February 22, 2025',
    description: 'No regular backups of critical business data are being performed.'
  },
  {
    id: 3,
    title: 'Weak Password Policy',
    severity: 'Medium',
    discoveredDate: 'February 18, 2025',
    description: 'No enforcement of strong passwords or regular password changes.'
  },
];

// Upcoming events
const upcomingEvents = [
  {
    title: 'Security Awareness Training',
    date: 'March 8, 2025',
    time: '10:00 AM - 12:00 PM',
    location: 'Main Conference Room',
    consultant: 'John Smith'
  },
  {
    title: 'Quarterly Security Review',
    date: 'March 15, 2025',
    time: '2:00 PM - 3:30 PM',
    location: 'Online Meeting',
    consultant: 'John Smith'
  },
  {
    title: 'Penetration Test',
    date: 'April 5, 2025',
    time: 'All Day',
    location: 'On-site',
    consultant: 'Security Team'
  }
];

// Activity data
const activityData = [
  { name: 'Mon', 'Scans Conducted': 200, 'Detected Threats': 7, 'Blocked Attacks': 5 },
  { name: 'Tue', 'Scans Conducted': 180, 'Detected Threats': 5, 'Blocked Attacks': 3 },
  { name: 'Wed', 'Scans Conducted': 250, 'Detected Threats': 12, 'Blocked Attacks': 9 },
  { name: 'Thu', 'Scans Conducted': 230, 'Detected Threats': 6, 'Blocked Attacks': 5 },
  { name: 'Fri', 'Scans Conducted': 300, 'Detected Threats': 15, 'Blocked Attacks': 12 },
  { name: 'Sat', 'Scans Conducted': 210, 'Detected Threats': 4, 'Blocked Attacks': 2 },
  { name: 'Sun', 'Scans Conducted': 260, 'Detected Threats': 8, 'Blocked Attacks': 6 }
];

// Security resources
const securityResources = [
  {
    title: 'Password Security Best Practices',
    type: 'Guide',
    icon: <EnhancedEncryptionIcon />,
    description: 'Learn how to create strong passwords and set up effective password policies.'
  },
  {
    title: 'Phishing Awareness Training',
    type: 'Video',
    icon: <PlayArrowIcon />,
    description: 'Watch this video to learn how to identify and avoid phishing attacks.',
    duration: '12 min'
  },
  {
    title: 'Data Protection Guidelines',
    type: 'Document',
    icon: <ArticleIcon />,
    description: 'Essential practices for protecting your business and customer data.',
    pages: 15
  },
];

// Helper functions
const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'Critical': return '#d32f2f';
    case 'High': return '#f44336';
    case 'Medium': return '#ff9800';
    case 'Low': return '#03a9f4';
    default: return '#03a9f4';
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'Critical': return '#d32f2f';
    case 'High': return '#f44336';
    case 'Medium': return '#ff9800';
    case 'Low': return '#03a9f4';
    default: return '#03a9f4';
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Completed': return '#4caf50';
    case 'In Progress': return '#1976d2';
    case 'Pending': return '#ff9800';
    case 'Cancelled': return '#f44336';
    default: return '#9e9e9e';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'Completed':
      return <TaskAltIcon fontSize="small" sx={{ color: '#4caf50' }} />;
    case 'In Progress':
      return <UpdateIcon fontSize="small" sx={{ color: '#1976d2' }} />;
    case 'Scheduled':
      return <CalendarTodayIcon fontSize="small" sx={{ color: '#9c27b0' }} />;
    case 'Not Started':
      return <AccessTimeIcon fontSize="small" sx={{ color: '#757575' }} />;
    default:
      return <InfoIcon fontSize="small" sx={{ color: '#757575' }} />;
  }
};

// Custom tooltip for charts
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <Paper 
        elevation={3}
        sx={{
          p: 1.5,
          borderRadius: 1,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
          {label}
        </Typography>
        {payload.map((entry: any, index: number) => (
          <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
            <Box
              component="span"
              sx={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                backgroundColor: entry.color,
                mr: 1,
              }}
            />
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {entry.name}: <strong>{entry.value}</strong>
            </Typography>
          </Box>
        ))}
      </Paper>
    );
  }
  return null;
};

interface TabPanelProps {
  children?: React.ReactNode;
  value: number;
  index: number;
  [key: string]: any;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`dashboard-tabpanel-${index}`}
      aria-labelledby={`dashboard-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

// Colors for pie charts
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

// Client Dashboard Component
const EnhancedClientDashboard = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);

  // Function to get risk color based on score
  const getRiskColor = (score: number) => {
    if (score < 50) return theme.palette.error.main;
    if (score < 70) return theme.palette.warning.main;
    return theme.palette.success.main;
  };

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Calculate percentage of completed recommendations
  const completedRecommendations = securityRecommendations.filter(rec => rec.status === 'Completed').length;
  const totalRecommendations = securityRecommendations.length;
  const completionPercentage = Math.round((completedRecommendations / totalRecommendations) * 100);

  return (
    <Box sx={{ p: 3 }}>
      {/* Welcome Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700, mb: 1 }}>
          Welcome to Your Security Dashboard
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Review your current security posture, track progress on recommendations, and access security resources.
        </Typography>
      </Box>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Security Score Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            borderRadius: 2, 
            height: '100%',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            border: '1px solid rgba(0, 0, 0, 0.04)',
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar 
                  sx={{ 
                    bgcolor: `${getRiskColor(securityScore)}15`,
                    color: getRiskColor(securityScore),
                    mr: 1.5
                  }}
                >
                  <SecurityIcon />
                </Avatar>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Security Score
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 1 }}>
                <Typography 
                  variant="h3" 
                  component="div" 
                  sx={{ 
                    fontWeight: 700, 
                    color: getRiskColor(securityScore)
                  }}
                >
                  {securityScore}
                </Typography>
                <Typography variant="body1" color="textSecondary" sx={{ ml: 1 }}>
                  / 100
                </Typography>
                <Chip 
                  label={`+${scoreImprovement}`} 
                  size="small" 
                  sx={{ 
                    ml: 2, 
                    bgcolor: 'rgba(76, 175, 80, 0.1)', 
                    color: '#4caf50',
                    fontWeight: 600 
                  }} 
                />
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={securityScore} 
                sx={{ 
                  height: 8, 
                  borderRadius: 4,
                  backgroundColor: 'rgba(0, 0, 0, 0.08)',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: getRiskColor(securityScore)
                  }
                }} 
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                <Typography variant="caption" color="textSecondary">
                  Previous: {previousScore}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  Goal: 85+
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Vulnerabilities Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            borderRadius: 2, 
            height: '100%',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            border: '1px solid rgba(0, 0, 0, 0.04)',
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar 
                  sx={{ 
                    bgcolor: 'rgba(244, 67, 54, 0.15)',
                    color: '#f44336',
                    mr: 1.5
                  }}
                >
                  <WarningIcon />
                </Avatar>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Open Issues
                </Typography>
              </Box>
              
              <Grid container spacing={1} sx={{ mb: 1 }}>
                {vulnerabilitiesByRisk.map((item, index) => (
                  <Grid item xs={6} key={index}>
                    <Box 
                      sx={{ 
                        p: 1, 
                        borderRadius: 1,
                        bgcolor: `${item.color}15`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <Typography variant="caption" sx={{ color: item.color, fontWeight: 500 }}>
                        {item.level}
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 700, color: item.color }}>
                        {item.count}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  Total issues: 11
                </Typography>
                <Chip 
                  label="7 resolved" 
                  size="small" 
                  sx={{ 
                    bgcolor: 'rgba(76, 175, 80, 0.1)', 
                    color: '#4caf50',
                    fontWeight: 600,
                    fontSize: '0.7rem' 
                  }} 
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Recommendation Progress Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            borderRadius: 2, 
            height: '100%',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            border: '1px solid rgba(0, 0, 0, 0.04)',
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar 
                  sx={{ 
                    bgcolor: 'rgba(25, 118, 210, 0.15)',
                    color: theme.palette.primary.main,
                    mr: 1.5
                  }}
                >
                  <AssessmentIcon />
                </Avatar>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Recommendations
                </Typography>
              </Box>
              
              <Box sx={{ mb: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Box sx={{ position: 'relative', display: 'inline-flex', mb: 1 }}>
                  <CircularProgress
                    variant="determinate"
                    value={100}
                    size={100}
                    thickness={4}
                    sx={{ color: 'rgba(0, 0, 0, 0.08)', position: 'absolute' }}
                  />
                  <CircularProgress
                    variant="determinate"
                    value={completionPercentage}
                    size={100}
                    thickness={4}
                    sx={{ color: theme.palette.primary.main }}
                  />
                  <Box
                    sx={{
                      top: 0,
                      left: 0,
                      bottom: 0,
                      right: 0,
                      position: 'absolute',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography variant="h5" component="div" sx={{ fontWeight: 700 }}>
                      {completionPercentage}%
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'center' }}>
                  {completedRecommendations} of {totalRecommendations} recommendations implemented
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Next Action Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            borderRadius: 2, 
            height: '100%',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            border: '1px solid rgba(0, 0, 0, 0.04)',
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar 
                  sx={{ 
                    bgcolor: 'rgba(156, 39, 176, 0.15)',
                    color: '#9c27b0',
                    mr: 1.5
                  }}
                >
                  <EventIcon />
                </Avatar>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Next Event
                </Typography>
              </Box>
              
              <Box 
                sx={{ 
                  p: 1.5, 
                  borderRadius: 2, 
                  bgcolor: 'rgba(156, 39, 176, 0.05)',
                  border: '1px solid rgba(156, 39, 176, 0.1)',
                  mb: 1
                }}
              >
                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#9c27b0' }}>
                  {upcomingEvents[0].title}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ my: 0.5 }}>
                  <strong>Date:</strong> {upcomingEvents[0].date}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>Time:</strong> {upcomingEvents[0].time}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>Location:</strong> {upcomingEvents[0].location}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Main Dashboard Content */}
      <Paper sx={{ borderRadius: 2, boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)', overflow: 'hidden', mb: 4 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            aria-label="dashboard tabs"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="Overview" id="dashboard-tab-0" aria-controls="dashboard-tabpanel-0" />
            <Tab label="Recommendations" id="dashboard-tab-1" aria-controls="dashboard-tabpanel-1" />
            <Tab label="Reports" id="dashboard-tab-2" aria-controls="dashboard-tabpanel-2" />
            <Tab label="Resources" id="dashboard-tab-3" aria-controls="dashboard-tabpanel-3" />
          </Tabs>
        </Box>

        {/* Overview Tab */}
        <TabPanel value={tabValue} index={0}>
          <Box sx={{ p: 2 }}>
            <Grid container spacing={3}>
              {/* Security Score Trend */}
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3, borderRadius: 2, boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)', mb: 3 }}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    Security Score Trend
                  </Typography>
                  <Box sx={{ height: 300 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={scoreHistoryData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                        <XAxis dataKey="month" />
                        <YAxis domain={[0, 100]} />
                        <Tooltip content={CustomTooltip} />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="score" 
                          stroke={theme.palette.primary.main} 
                          strokeWidth={3}
                          name="Security Score"
                          dot={{ r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </Box>
                </Paper>

                {/* Security Categories Progress */}
                <Paper sx={{ p: 3, borderRadius: 2, boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)' }}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    Security Categories Progress
                  </Typography>
                  
                  <List disablePadding>
                    {securityCategories.map((category, index) => (
                      <ListItem key={index} disablePadding sx={{ mb: 2 }}>
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                {category.name}
                              </Typography>
                              <Typography variant="body2">
                                <span style={{ fontWeight: 600 }}>{category.score}</span>
                                <span style={{ color: 'text.secondary' }}> / {category.target}</span>
                              </Typography>
                            </Box>
                          }
                          secondary={
                            <Box sx={{ width: '100%' }}>
                              <LinearProgress 
                                variant="determinate" 
                                value={(category.score / category.target) * 100} 
                                sx={{ 
                                  height: 8, 
                                  borderRadius: 4,
                                  backgroundColor: 'rgba(0, 0, 0, 0.08)',
                                  '& .MuiLinearProgress-bar': {
                                    backgroundColor: theme.palette.primary.main
                                  }
                                }} 
                              />
                              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 0.5 }}>
                                <Chip 
                                  label={`+${category.improvement}%`} 
                                  size="small" 
                                  sx={{ 
                                    bgcolor: 'rgba(76, 175, 80, 0.1)', 
                                    color: '#4caf50',
                                    height: 20,
                                    fontSize: '0.7rem',
                                    fontWeight: 600
                                  }} 
                                />
                              </Box>
                            </Box>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </Grid>

              {/* Activity Chart and Upcoming Events */}
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3, borderRadius: 2, boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)', mb: 3 }}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    Weekly Security Activity
                  </Typography>
                  <Box sx={{ height: 300 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart data={activityData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip content={CustomTooltip} />
                        <Legend wrapperStyle={{ paddingTop: 20 }} />
                        <Line 
                          type="monotone" 
                          dataKey="Scans Conducted" 
                          stroke={theme.palette.primary.main} 
                          strokeWidth={3}
                          name="Scans Conducted"
                          dot={{ r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="Detected Threats" 
                          stroke="#ff9800" 
                          strokeWidth={3}
                          name="Detected Threats"
                          dot={{ r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="Blocked Attacks" 
                          stroke="#4caf50" 
                          strokeWidth={3}
                          name="Blocked Attacks"
                          dot={{ r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </TabPanel>

        {/* Recommendations Tab */}
        <TabPanel value={tabValue} index={1}>
          {/* Recommendations content */}
        </TabPanel>

        {/* Reports Tab */}
        <TabPanel value={tabValue} index={2}>
          {/* Reports content */}
        </TabPanel>

        {/* Resources Tab */}
        <TabPanel value={tabValue} index={3}>
          {/* Resources content */}
        </TabPanel>
      </Paper>
    </Box>
  );
};

export default EnhancedClientDashboard;