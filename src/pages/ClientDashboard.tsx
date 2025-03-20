import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardActions,
  Avatar,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  LinearProgress,
  Divider,
  IconButton,
  useTheme,
  Tab,
  Tabs,
  CircularProgress
} from '@mui/material';

// Icons
import SecurityIcon from '@mui/icons-material/Security';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InfoIcon from '@mui/icons-material/Info';
import ArticleIcon from '@mui/icons-material/Article';
import EventIcon from '@mui/icons-material/Event';
import ShieldIcon from '@mui/icons-material/Shield';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PhishingIcon from '@mui/icons-material/Phishing';
import EnhancedEncryptionIcon from '@mui/icons-material/EnhancedEncryption';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import DownloadIcon from '@mui/icons-material/Download';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import UpdateIcon from '@mui/icons-material/Update';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AssessmentIcon from '@mui/icons-material/Assessment';
import AddIcon from '@mui/icons-material/Add';
import PersonIcon from '@mui/icons-material/Person';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import CheckIcon from '@mui/icons-material/Check';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

// Charts
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';

// Mock data for dashboard
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

// Vulnerabilities by risk
const vulnerabilitiesByRisk = [
  { level: 'Critical', count: 1, color: '#d32f2f' },
  { level: 'High', count: 2, color: '#f44336' },
  { level: 'Medium', count: 3, color: '#ff9800' },
  { level: 'Low', count: 5, color: '#03a9f4' },
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

// Security assessment history
const assessmentHistory = [
  {
    date: 'February 20, 2025',
    type: 'Full Assessment',
    score: 68,
    findings: 11,
    consultant: 'John Smith',
    report: 'February_2025_Assessment.pdf'
  },
  {
    date: 'November 15, 2024',
    type: 'Initial Assessment',
    score: 42,
    findings: 18,
    consultant: 'John Smith',
    report: 'November_2024_Assessment.pdf'
  }
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
    icon: <VideoLibraryIcon />,
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

// Progress metrics by security category
const securityCategories = [
  { name: 'Network Security', score: 75, target: 85, improvement: 15 },
  { name: 'Data Protection', score: 60, target: 85, improvement: 10 },
  { name: 'Access Control', score: 80, target: 90, improvement: 25 },
  { name: 'Security Awareness', score: 45, target: 80, improvement: 20 },
  { name: 'Physical Security', score: 70, target: 85, improvement: 15 },
];

// Helper functions
const getSeverityColor = (severity: string): string => {
  switch (severity) {
    case 'Critical': return '#d32f2f';
    case 'High': return '#f44336';
    case 'Medium': return '#ff9800';
    case 'Low': return '#03a9f4';
    default: return '#03a9f4';
  }
};

const getPriorityColor = (priority: string): string => {
  switch (priority) {
    case 'Critical': return '#d32f2f';
    case 'High': return '#f44336';
    case 'Medium': return '#ff9800';
    case 'Low': return '#03a9f4';
    default: return '#757575';
  }
};

const getStatusColor = (status: string): string => {
  switch (status) {
    case 'Completed': return '#4caf50';
    case 'In Progress': return '#1976d2';
    case 'Scheduled': return '#9c27b0';
    case 'Not Started': return '#757575';
    default: return '#757575';
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
}

// Custom tooltip for charts
interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<any>;
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
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
        {payload.map((entry, index) => (
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

const ClientDashboard: React.FC = () => {
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

  // Colors for pie charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

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
        <Grid item xs={12} sm={6} md={4} lg={3}>
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
        <Grid item xs={12} sm={6} md={4} lg={3}>
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
            <CardActions sx={{ justifyContent: 'center', borderTop: '1px solid rgba(0, 0, 0, 0.06)', pt: 1 }}>
              <Button 
                size="small" 
                variant="text" 
                color="primary"
                endIcon={<ArrowForwardIcon fontSize="small" />}
              >
                View Details
              </Button>
            </CardActions>
          </Card>
        </Grid>

        {/* Recommendation Progress Card */}
        <Grid item xs={12} sm={6} md={4} lg={3}>
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
                  <Box
                    sx={{
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 100,
                      height: 100,
                    }}
                  >
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
                </Box>
                <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'center' }}>
                  {completedRecommendations} of {totalRecommendations} recommendations implemented
                </Typography>
              </Box>
            </CardContent>
            <CardActions sx={{ justifyContent: 'center', borderTop: '1px solid rgba(0, 0, 0, 0.06)', pt: 1 }}>
              <Button 
                size="small" 
                variant="text" 
                color="primary"
                endIcon={<ArrowForwardIcon fontSize="small" />}
              >
                View All
              </Button>
            </CardActions>
          </Card>
        </Grid>

        {/* Next Action Card */}
        <Grid item xs={12} sm={6} md={4} lg={3}>
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
            <CardActions sx={{ justifyContent: 'center', borderTop: '1px solid rgba(0, 0, 0, 0.06)', pt: 1 }}>
              <Button 
                size="small" 
                variant="text" 
                color="primary"
                endIcon={<ArrowForwardIcon fontSize="small" />}
              >
                View Calendar
              </Button>
            </CardActions>
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
            <Tab label="Overview" />
            <Tab label="Recommendations" />
            <Tab label="Vulnerabilities" />
            <Tab label="Resources" />
            <Tab label="History" />
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
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="month" />
                        <YAxis domain={[0, 100]} />
                        <Tooltip content={<CustomTooltip />} />
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
                    Security Categories
                  </Typography>
                  <Box>
                    {securityCategories.map((category, index) => (
                      <Box key={index} sx={{ mb: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {category.name}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                              {category.score}/100
                            </Typography>
                            <Chip 
                              label={`+${category.improvement}`} 
                              size="small" 
                              sx={{ 
                                ml: 1, 
                                height: 20, 
                                fontSize: '0.7rem',
                                bgcolor: 'rgba(76, 175, 80, 0.1)', 
                                color: '#4caf50',
                                fontWeight: 600 
                              }} 
                            />
                          </Box>
                        </Box>
                        <Box sx={{ position: 'relative' }}>
                          <LinearProgress 
                            variant="determinate" 
                            value={category.score} 
                            sx={{ 
                              height: 8, 
                              borderRadius: 4,
                              backgroundColor: 'rgba(0, 0, 0, 0.08)',
                              '& .MuiLinearProgress-bar': {
                                backgroundColor: theme.palette.primary.main
                              }
                            }} 
                          />
                          <Box 
                            sx={{ 
                              position: 'absolute', 
                              top: 0, 
                              left: `${category.target}%`, 
                              height: '100%', 
                              display: 'flex', 
                              alignItems: 'center' 
                            }}
                          >
                            <Box 
                              sx={{ 
                                width: 2, 
                                height: 16, 
                                bgcolor: 'rgba(0, 0, 0, 0.54)', 
                                borderRadius: 4 
                              }} 
                            />
                          </Box>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                          <Typography variant="caption" color="textSecondary">
                            Target: {category.target}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Paper>
              </Grid>

              {/*{/* Priority Recommendations and Events */}
              <Grid item xs={12} md={6}>
                {/* Priority Recommendations */}
                <Paper sx={{ p: 3, borderRadius: 2, boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)', mb: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Priority Recommendations
                    </Typography>
                    <Button 
                      variant="text" 
                      size="small"
                      endIcon={<ArrowForwardIcon fontSize="small" />}
                    >
                      View All
                    </Button>
                  </Box>
                  
                  <List disablePadding>
                    {securityRecommendations
                      .filter(rec => rec.priority === 'Critical' || rec.priority === 'High')
                      .slice(0, 3)
                      .map((recommendation, index) => (
                        <React.Fragment key={recommendation.id}>
                          <ListItem 
                            alignItems="flex-start" 
                            sx={{ 
                              px: 0, 
                              py: 2,
                              borderLeft: `4px solid ${getPriorityColor(recommendation.priority)}`,
                              pl: 2,
                              borderRadius: 1,
                              bgcolor: `${getPriorityColor(recommendation.priority)}05`,
                              mb: 1.5
                            }}
                          >
                            <ListItemIcon sx={{ minWidth: 36, mt: 0 }}>
                              {getStatusIcon(recommendation.status)}
                            </ListItemIcon>
                            <ListItemText
                              primary={
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                    {recommendation.title}
                                  </Typography>
                                  <Chip 
                                    label={recommendation.priority} 
                                    size="small"
                                    sx={{ 
                                      backgroundColor: `${getPriorityColor(recommendation.priority)}15`,
                                      color: getPriorityColor(recommendation.priority),
                                      fontWeight: 500,
                                      fontSize: '0.7rem',
                                      height: 20
                                    }} 
                                  />
                                </Box>
                              }
                              secondary={
                                <Box sx={{ mt: 0.5 }}>
                                  <Typography variant="body2" color="textSecondary" sx={{ mb: 0.5 }}>
                                    {recommendation.description}
                                  </Typography>
                                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Chip 
                                      label={recommendation.status} 
                                      size="small"
                                      sx={{ 
                                        backgroundColor: `${getStatusColor(recommendation.status)}15`,
                                        color: getStatusColor(recommendation.status),
                                        fontWeight: 500,
                                        fontSize: '0.7rem',
                                        height: 20
                                      }} 
                                    />
                                    {recommendation.dueDate && (
                                      <Typography variant="caption" color="textSecondary">
                                        Due: {recommendation.dueDate}
                                      </Typography>
                                    )}
                                  </Box>
                                </Box>
                              }
                            />
                          </ListItem>
                        </React.Fragment>
                      ))}
                  </List>
                </Paper>

                {/* Upcoming Events */}
                <Paper sx={{ p: 3, borderRadius: 2, boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Upcoming Events
                    </Typography>
                    <Button 
                      variant="text" 
                      size="small"
                      endIcon={<ArrowForwardIcon fontSize="small" />}
                    >
                      View Calendar
                    </Button>
                  </Box>
                  
                  <List disablePadding>
                    {upcomingEvents.map((event, index) => (
                      <React.Fragment key={index}>
                        <ListItem 
                          alignItems="flex-start" 
                          sx={{ 
                            px: 2, 
                            py: 2,
                            borderRadius: 2,
                            mb: 1.5,
                            bgcolor: 'rgba(156, 39, 176, 0.05)',
                            border: '1px solid rgba(156, 39, 176, 0.1)',
                          }}
                        >
                          <ListItemIcon sx={{ minWidth: 40, mt: 0.5 }}>
                            <Avatar
                              sx={{
                                bgcolor: 'rgba(156, 39, 176, 0.15)',
                                color: '#9c27b0',
                                width: 32,
                                height: 32
                              }}
                            >
                              <EventIcon sx={{ fontSize: 18 }} />
                            </Avatar>
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                {event.title}
                              </Typography>
                            }
                            secondary={
                              <Box sx={{ mt: 0.5 }}>
                                <Typography variant="body2" color="textSecondary">
                                  <strong>Date:</strong> {event.date}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                  <strong>Time:</strong> {event.time}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                  <strong>Location:</strong> {event.location}
                                </Typography>
                                <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mt: 0.5 }}>
                                  Consultant: {event.consultant}
                                </Typography>
                              </Box>
                            }
                          />
                        </ListItem>
                      </React.Fragment>
                    ))}
                  </List>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </TabPanel>

        {/* Recommendations Tab */}
        <TabPanel value={tabValue} index={1}>
          <Box sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Security Recommendations
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button 
                  variant="outlined" 
                  size="small"
                  startIcon={<DownloadIcon />}
                >
                  Export
                </Button>
                <Button 
                  variant="contained" 
                  size="small"
                  startIcon={<AddIcon />}
                  sx={{ 
                    borderRadius: 1,
                    background: 'linear-gradient(45deg, #1976d2 30%, #2196f3 90%)',
                  }}
                >
                  Request Implementation
                </Button>
              </Box>
            </Box>

            <Grid container spacing={2}>
              {securityRecommendations.map((recommendation) => (
                <Grid item xs={12} md={6} lg={4} key={recommendation.id}>
                  <Card sx={{ 
                    borderRadius: 2, 
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                    height: '100%',
                    borderLeft: `4px solid ${getPriorityColor(recommendation.priority)}`,
                    display: 'flex',
                    flexDirection: 'column'
                  }}>
                    <CardContent sx={{ pb: 1, flexGrow: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                          {recommendation.title}
                        </Typography>
                        <Chip 
                          label={recommendation.priority} 
                          size="small"
                          sx={{ 
                            backgroundColor: `${getPriorityColor(recommendation.priority)}15`,
                            color: getPriorityColor(recommendation.priority),
                            fontWeight: 500
                          }} 
                        />
                      </Box>
                      <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
                        {recommendation.description}
                      </Typography>
                      <Divider sx={{ my: 1.5 }} />
                      <Grid container spacing={1}>
                        <Grid item xs={6}>
                          <Typography variant="caption" color="textSecondary">
                            Status
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                            {getStatusIcon(recommendation.status)}
                            <Typography variant="body2" sx={{ ml: 0.5, fontWeight: 500, color: getStatusColor(recommendation.status) }}>
                              {recommendation.status}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="caption" color="textSecondary">
                            {recommendation.status === 'Completed' ? 'Completed Date' : 'Due Date'}
                          </Typography>
                          <Typography variant="body2" sx={{ mt: 0.5, fontWeight: 500 }}>
                            {recommendation.status === 'Completed' 
                              ? recommendation.completedDate 
                              : recommendation.dueDate || 'Not set'}
                          </Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                    <CardActions sx={{ borderTop: '1px solid rgba(0, 0, 0, 0.06)', p: 2 }}>
                      <Button 
                        size="small" 
                        variant="text" 
                        color="primary"
                      >
                        View Details
                      </Button>
                      {recommendation.status !== 'Completed' && (
                        <Button 
                          size="small" 
                          variant="contained" 
                          color="primary"
                          sx={{ ml: 'auto', borderRadius: 1 }}
                        >
                          {recommendation.status === 'Not Started' ? 'Start' : 'Continue'}
                        </Button>
                      )}
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </TabPanel>

        {/* Vulnerabilities Tab */}
        <TabPanel value={tabValue} index={2}>
          <Box sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Identified Vulnerabilities
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button 
                  variant="outlined" 
                  size="small"
                  startIcon={<DownloadIcon />}
                >
                  Export
                </Button>
              </Box>
            </Box>

            <Grid container spacing={3}>
              {/* Vulnerabilities Chart */}
              <Grid item xs={12} md={5} lg={4}>
                <Paper sx={{ p: 3, borderRadius: 2, boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)', height: '100%' }}>
                  <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                    Vulnerabilities by Severity
                  </Typography>
                  <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={vulnerabilitiesByRisk}
                          dataKey="count"
                          nameKey="level"
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {vulnerabilitiesByRisk.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </Box>
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" paragraph>
                      Your organization currently has <strong>11 open vulnerabilities</strong> identified during security assessments. 
                    </Typography>
                    <Typography variant="body2">
                      Critical and high severity issues should be addressed first to reduce your security risk.
                    </Typography>
                  </Box>
                </Paper>
              </Grid>

              {/* Vulnerabilities List */}
              <Grid item xs={12} md={7} lg={8}>
                <Paper sx={{ p: 3, borderRadius: 2, boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)' }}>
                  <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                    Recent Vulnerabilities
                  </Typography>
                  <List>
                    {recentVulnerabilities.map((vulnerability, index) => (
                      <React.Fragment key={vulnerability.id}>
                        <ListItem 
                          alignItems="flex-start" 
                          sx={{ 
                            px: 2, 
                            py: 2,
                            borderRadius: 2,
                            mb: 1.5,
                            bgcolor: `${getSeverityColor(vulnerability.severity)}05`,
                            border: `1px solid ${getSeverityColor(vulnerability.severity)}15`,
                          }}
                        >
                          <ListItemIcon sx={{ minWidth: 40, mt: 0.5 }}>
                            <Avatar
                              sx={{
                                bgcolor: `${getSeverityColor(vulnerability.severity)}15`,
                                color: getSeverityColor(vulnerability.severity),
                                width: 32,
                                height: 32
                              }}
                            >
                              <PriorityHighIcon sx={{ fontSize: 18 }} />
                            </Avatar>
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                  {vulnerability.title}
                                </Typography>
                                <Chip 
                                  label={vulnerability.severity} 
                                  size="small"
                                  sx={{ 
                                    backgroundColor: `${getSeverityColor(vulnerability.severity)}15`,
                                    color: getSeverityColor(vulnerability.severity),
                                    fontWeight: 500,
                                    fontSize: '0.7rem',
                                    height: 20
                                  }} 
                                />
                              </Box>
                            }
                            secondary={
                              <Box sx={{ mt: 0.5 }}>
                                <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                                  {vulnerability.description}
                                </Typography>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                  <Typography variant="caption" color="textSecondary">
                                    Discovered: {vulnerability.discoveredDate}
                                  </Typography>
                                  <Button 
                                    size="small" 
                                    variant="text"
                                    sx={{ p: 0, minWidth: 'auto' }}
                                  >
                                    View details
                                  </Button>
                                </Box>
                              </Box>
                            }
                          />
                        </ListItem>
                      </React.Fragment>
                    ))}
                  </List>
                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                    <Button 
                      variant="outlined"
                      endIcon={<ArrowForwardIcon />}
                    >
                      View All Vulnerabilities
                    </Button>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </TabPanel>

        {/* Resources Tab */}
        <TabPanel value={tabValue} index={3}>
          <Box sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Security Resources
              </Typography>
              <Button 
                variant="outlined" 
                size="small"
                startIcon={<VisibilityIcon />}
              >
                View All
              </Button>
            </Box>

            <Grid container spacing={3}>
              {/* Educational Resources */}
              <Grid item xs={12} md={8}>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                    Educational Materials
                  </Typography>
                  <Grid container spacing={2}>
                    {securityResources.map((resource, index) => (
                      <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card sx={{ 
                          borderRadius: 2, 
                          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                          '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
                          }
                        }}>
                          <CardContent sx={{ flexGrow: 1 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                              <Avatar
                                sx={{
                                  bgcolor: 'rgba(25, 118, 210, 0.1)',
                                  color: theme.palette.primary.main,
                                  mr: 1.5,
                                  width: 36,
                                  height: 36
                                }}
                              >
                                {resource.icon}
                              </Avatar>
                              <Box>
                                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                  {resource.title}
                                </Typography>
                                <Chip 
                                  label={resource.type} 
                                  size="small"
                                  sx={{ 
                                    fontSize: '0.7rem',
                                    height: 20,
                                    fontWeight: 500
                                  }} 
                                />
                              </Box>
                            </Box>
                            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1.5 }}>
                              {resource.description}
                            </Typography>
                            {resource.duration && (
                              <Typography variant="caption" color="textSecondary" display="block" sx={{ mb: 1 }}>
                                Duration: {resource.duration}
                              </Typography>
                            )}
                            {resource.pages && (
                              <Typography variant="caption" color="textSecondary" display="block" sx={{ mb: 1 }}>
                                Length: {resource.pages} pages
                              </Typography>
                            )}
                          </CardContent>
                          <CardActions sx={{ borderTop: '1px solid rgba(0, 0, 0, 0.06)', p: 2 }}>
                            <Button 
                              size="small" 
                              variant="text" 
                              color="primary"
                              startIcon={resource.type === 'Video' ? <PlayArrowIcon /> : <VisibilityIcon />}
                            >
                              {resource.type === 'Video' ? 'Watch Now' : 'View Resource'}
                            </Button>
                          </CardActions>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Box>

                {/* Security Policies */}
                <Box>
                  <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                    Security Policies
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Card sx={{ 
                        borderRadius: 2, 
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        p: 2
                      }}>
                        <Avatar
                          sx={{
                            bgcolor: 'rgba(25, 118, 210, 0.1)',
                            color: theme.palette.primary.main,
                            mr: 2
                          }}
                        >
                          <ArticleIcon />
                        </Avatar>
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                            Password Policy
                          </Typography>
                          <Typography variant="caption" color="textSecondary">
                            Updated: February 20, 2025
                          </Typography>
                        </Box>
                        <IconButton size="small">
                          <DownloadIcon fontSize="small" />
                        </IconButton>
                      </Card>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Card sx={{ 
                        borderRadius: 2, 
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        p: 2
                      }}>
                        <Avatar
                          sx={{
                            bgcolor: 'rgba(25, 118, 210, 0.1)',
                            color: theme.palette.primary.main,
                            mr: 2
                          }}
                        >
                          <ArticleIcon />
                        </Avatar>
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                            Acceptable Use Policy
                          </Typography>
                          <Typography variant="caption" color="textSecondary">
                            Updated: January 15, 2025
                          </Typography>
                        </Box>
                        <IconButton size="small">
                          <DownloadIcon fontSize="small" />
                        </IconButton>
                      </Card>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>

              {/* Support Contact */}
              <Grid item xs={12} md={4}>
                <Paper sx={{ p: 3, borderRadius: 2, boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)', height: '100%' }}>
                  <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                    Your Security Consultant
                  </Typography>
                  <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    p: 2,
                    mb: 2,
                    bgcolor: 'rgba(0, 0, 0, 0.02)',
                    borderRadius: 2
                  }}>
                    <Avatar
                      sx={{
                        bgcolor: theme.palette.primary.main,
                        width: 80,
                        height: 80,
                        mb: 2
                      }}
                    >
                      JS
                    </Avatar>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      John Smith
                    </Typography>
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                      Senior Security Consultant
                    </Typography>
                    <Divider sx={{ width: '100%', my: 2 }} />
                    <List dense sx={{ width: '100%' }}>
                      <ListItem>
                        <ListItemIcon>
                          <EmailIcon color="action" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText 
                          primary="john.smith@manhattanville.edu"
                          primaryTypographyProps={{ variant: 'body2' }}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <PhoneIcon color="action" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText 
                          primary="(555) 123-4567"
                          primaryTypographyProps={{ variant: 'body2' }}
                        />
                      </ListItem>
                    </List>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Button 
                      variant="contained" 
                      color="primary"
                      startIcon={<CalendarTodayIcon />}
                      sx={{ borderRadius: 1 }}
                    >
                      Schedule Meeting
                    </Button>
                    <Button 
                      variant="outlined" 
                      color="primary"
                      startIcon={<EmailIcon />}
                      sx={{ borderRadius: 1 }}
                    >
                      Send Message
                    </Button>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </TabPanel>

        {/* History Tab */}
        <TabPanel value={tabValue} index={4}>
          <Box sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
              Assessment History
            </Typography>

            <Grid container spacing={3}>
              {/* Assessment History Timeline */}
              <Grid item xs={12} lg={8}>
                {assessmentHistory.map((assessment, index) => (
                  <Paper 
                    key={index}
                    sx={{ 
                      p: 3, 
                      borderRadius: 2, 
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                      mb: 3,
                      position: 'relative',
                      borderLeft: `4px solid ${theme.palette.primary.main}`
                    }}
                  >
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={4}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                          {assessment.type}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" paragraph>
                          <strong>Date:</strong> {assessment.date}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          <strong>Consultant:</strong> {assessment.consultant}
                        </Typography>
                        <Button 
                          variant="text" 
                          color="primary"
                          startIcon={<DownloadIcon />}
                          sx={{ mt: 2 }}
                        >
                          Download Report
                        </Button>
                      </Grid>
                      
                      <Grid item xs={12} md={8}>
                        <Grid container spacing={2}>
                          <Grid item xs={6} sm={4}>
                            <Box sx={{ 
                              p: 2, 
                              borderRadius: 2, 
                              bgcolor: 'rgba(25, 118, 210, 0.08)',
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}>
                              <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                                Security Score
                              </Typography>
                              <Typography variant="h3" sx={{ fontWeight: 700, color: getRiskColor(assessment.score) }}>
                                {assessment.score}
                              </Typography>
                              <Typography variant="caption" color="textSecondary">
                                out of 100
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={6} sm={4}>
                            <Box sx={{ 
                              p: 2, 
                              borderRadius: 2, 
                              bgcolor: 'rgba(244, 67, 54, 0.08)',
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}>
                              <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                                Findings
                              </Typography>
                              <Typography variant="h3" sx={{ fontWeight: 700, color: theme.palette.error.main }}>
                                {assessment.findings}
                              </Typography>
                              <Typography variant="caption" color="textSecondary">
                                vulnerabilities
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <Box sx={{ 
                              p: 2, 
                              borderRadius: 2, 
                              bgcolor: 'rgba(76, 175, 80, 0.08)',
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              justifyContent: 'center',
                              height: '100%'
                            }}>
                              <Button 
                                variant="outlined" 
                                color="primary"
                                endIcon={<ArrowForwardIcon />}
                                fullWidth
                              >
                                View Details
                              </Button>
                            </Box>
                          </Grid>
                        </Grid>

                        {index === 0 && ( // Only for the latest assessment
                          <Box sx={{ mt: 2 }}>
                            <Typography variant="subtitle2" gutterBottom>
                              Key Findings
                            </Typography>
                            <List dense disablePadding>
                              <ListItem sx={{ px: 0 }}>
                                <ListItemIcon sx={{ minWidth: 28 }}>
                                  <PriorityHighIcon fontSize="small" sx={{ color: '#f44336' }} />
                                </ListItemIcon>
                                <ListItemText 
                                  primary="Outdated firewall software with known vulnerabilities"
                                  primaryTypographyProps={{ variant: 'body2' }}
                                />
                              </ListItem>
                              <ListItem sx={{ px: 0 }}>
                                <ListItemIcon sx={{ minWidth: 28 }}>
                                  <PriorityHighIcon fontSize="small" sx={{ color: '#f44336' }} />
                                </ListItemIcon>
                                <ListItemText 
                                  primary="Missing regular data backup procedures"
                                  primaryTypographyProps={{ variant: 'body2' }}
                                />
                              </ListItem>
                              <ListItem sx={{ px: 0 }}>
                                <ListItemIcon sx={{ minWidth: 28 }}>
                                  <PriorityHighIcon fontSize="small" sx={{ color: '#ff9800' }} />
                                </ListItemIcon>
                                <ListItemText 
                                  primary="Weak password policies and lack of multi-factor authentication"
                                  primaryTypographyProps={{ variant: 'body2' }}
                                />
                              </ListItem>
                            </List>
                          </Box>
                        )}
                      </Grid>
                    </Grid>
                  </Paper>
                ))}
              </Grid>
              
              {/* Score Progression */}
              <Grid item xs={12} lg={4}>
                <Paper sx={{ p: 3, borderRadius: 2, boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)' }}>
                  <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                    Security Score Progression
                  </Typography>
                  <Box sx={{ height: 250, mt: 2 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={scoreHistoryData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="month" />
                        <YAxis domain={[0, 100]} />
                        <Tooltip formatter={(value) => [`${value}`, 'Score']} />
                        <Bar 
                          dataKey="score" 
                          fill={theme.palette.primary.main} 
                          barSize={30} 
                          radius={[4, 4, 0, 0]} 
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </Box>
                  
                  <Divider sx={{ my: 2 }} />
                  
                  <Box>
                    <Typography variant="subtitle2" gutterBottom>
                      Progress Summary
                    </Typography>
                    <Typography variant="body2" paragraph>
                      Your security score has improved by <strong>{scoreImprovement} points</strong> since your initial assessment.
                    </Typography>
                    <Typography variant="body2">
                      The implementation of password policies and staff security awareness training have contributed to this improvement.
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </TabPanel>
      </Paper>

      {/* Action Cards */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ 
            borderRadius: 2, 
            height: '100%',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            border: '1px solid rgba(0, 0, 0, 0.04)',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <CardContent sx={{ flexGrow: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar 
                  sx={{ 
                    bgcolor: 'rgba(244, 67, 54, 0.15)',
                    color: '#f44336',
                    mr: 1.5
                  }}
                >
                  <AssessmentIcon />
                </Avatar>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Request Assessment
                </Typography>
              </Box>
              <Typography variant="body2" paragraph>
                Need a new security assessment? Our consultants can evaluate your current security posture and provide tailored recommendations.
              </Typography>
            </CardContent>
            <CardActions sx={{ p: 2, pt: 0 }}>
              <Button 
                variant="contained" 
                fullWidth
                sx={{ 
                  borderRadius: 2,
                  background: 'linear-gradient(45deg, #f44336 30%, #ff5252 90%)',
                }}
              >
                Schedule Assessment
              </Button>
            </CardActions>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card sx={{ 
            borderRadius: 2, 
            height: '100%',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            border: '1px solid rgba(0, 0, 0, 0.04)',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <CardContent sx={{ flexGrow: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar 
                  sx={{ 
                    bgcolor: 'rgba(25, 118, 210, 0.15)',
                    color: theme.palette.primary.main,
                    mr: 1.5
                  }}
                >
                  <PlayArrowIcon />
                </Avatar>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Security Training
                </Typography>
              </Box>
              <Typography variant="body2" paragraph>
                Empower your employees with knowledge to recognize and avoid security threats. Our training sessions are tailored to your business needs.
              </Typography>
            </CardContent>
            <CardActions sx={{ p: 2, pt: 0 }}>
              <Button 
                variant="contained" 
                fullWidth
                sx={{ 
                  borderRadius: 2,
                  background: 'linear-gradient(45deg, #1976d2 30%, #2196f3 90%)',
                }}
              >
                View Training Options
              </Button>
            </CardActions>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card sx={{ 
            borderRadius: 2, 
            height: '100%',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            border: '1px solid rgba(0, 0, 0, 0.04)',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <CardContent sx={{ flexGrow: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar 
                  sx={{ 
                    bgcolor: 'rgba(156, 39, 176, 0.15)',
                    color: '#9c27b0',
                    mr: 1.5
                  }}
                >
                  <PhishingIcon />
                </Avatar>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Report Incident
                </Typography>
              </Box>
              <Typography variant="body2" paragraph>
                Experiencing a security incident or suspicious activity? Report it immediately for assistance from our security consultants.
              </Typography>
            </CardContent>
            <CardActions sx={{ p: 2, pt: 0 }}>
              <Button 
                variant="contained" 
                fullWidth
                sx={{ 
                  borderRadius: 2,
                  background: 'linear-gradient(45deg, #9c27b0 30%, #ba68c8 90%)',
                }}
              >
                Report Incident
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ClientDashboard;