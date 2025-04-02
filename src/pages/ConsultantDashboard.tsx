import React, { useState } from 'react';
import { 
  Typography, 
  Paper, 
  Grid, 
  Card, 
  CardContent, 
  Avatar, 
  Box,
  Button,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Chip,
  LinearProgress,
  Menu,
  MenuItem,
  IconButton,
  useTheme
} from '@mui/material';

// Icons
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import TimerIcon from '@mui/icons-material/Timer';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import Badge from '@mui/material/Badge';
import EventIcon from '@mui/icons-material/Event';

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
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
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

const ConsultantDashboard: React.FC = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [notificationsAnchorEl, setNotificationsAnchorEl] = useState<null | HTMLElement>(null);
  
  // Get current time for greeting
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? "Good morning" : currentHour < 18 ? "Good afternoon" : "Good evening";
  
  // Sample data for the consultant dashboard
  const consultantStats = [
    { title: 'Active Clients', value: '5', icon: <BusinessIcon />, color: theme.palette.primary.main },
    { title: 'Assessments', value: '12', icon: <AssignmentIcon />, color: theme.palette.secondary.main },
    { title: 'Hours Logged', value: '28', icon: <CalendarTodayIcon />, color: '#7e57c2' },
  ];

  // Client data
  const clients = [
    { 
      name: 'Harbor Dental Group', 
      type: 'Healthcare', 
      status: 'High Priority', 
      dueDate: 'March 4, 2025',
      progress: 25,
      statusColor: '#f44336'  // Red color for High Priority
    },
    { 
      name: 'Riverside Café', 
      type: 'Restaurant', 
      status: 'In Progress',
      dueDate: 'March 8, 2025',
      progress: 60,
      statusColor: theme.palette.primary.main  // Blue for In Progress
    },
    { 
      name: 'Westfield Law Partners', 
      type: 'Professional Services', 
      status: 'Scheduled',
      dueDate: 'March 15, 2025',
      progress: 10,
      statusColor: theme.palette.secondary.main  // Light blue for Scheduled
    },
    { 
      name: 'Grove Elementary School', 
      type: 'Education', 
      status: 'Completed',
      dueDate: 'February 28, 2025',
      progress: 100,
      statusColor: '#4caf50'  // Green for Completed
    },
    { 
      name: 'Sunrise Senior Living', 
      type: 'Healthcare', 
      status: 'Needs Review',
      dueDate: 'March 5, 2025',
      progress: 85,
      statusColor: '#ff9800'  // Orange for Needs Review
    }
  ];

  // Upcoming tasks
  const tasks = [
    { 
      title: 'Complete vulnerability scan', 
      client: 'Harbor Dental Group',
      dueDate: 'Today',
      priority: 'High',
      priorityColor: '#f44336'
    },
    { 
      title: 'Security awareness training', 
      client: 'Riverside Café',
      dueDate: 'Tomorrow',
      priority: 'Medium',
      priorityColor: '#ff9800'
    },
    { 
      title: 'Prepare assessment report', 
      client: 'Harbor Dental Group',
      dueDate: 'March 3, 2025',
      priority: 'High',
      priorityColor: '#f44336'
    },
    { 
      title: 'Review password policies', 
      client: 'Westfield Law Partners',
      dueDate: 'March 4, 2025',
      priority: 'Medium',
      priorityColor: '#ff9800'
    },
    { 
      title: 'Document security controls', 
      client: 'Sunrise Senior Living',
      dueDate: 'March 5, 2025',
      priority: 'Low',
      priorityColor: theme.palette.secondary.main
    }
  ];

  // Recent activity
  const activities = [
    { 
      action: 'Completed vulnerability scan', 
      client: 'Grove Elementary School',
      timestamp: '2 hours ago',
      icon: <CheckCircleIcon sx={{ color: '#4caf50' }} />
    },
    { 
      action: 'Discovered critical vulnerability', 
      client: 'Harbor Dental Group',
      timestamp: '4 hours ago',
      icon: <WarningIcon sx={{ color: '#f44336' }} />
    },
    { 
      action: 'Updated security policies', 
      client: 'Westfield Law Partners',
      timestamp: 'Yesterday',
      icon: <CheckCircleIcon sx={{ color: '#4caf50' }} />
    },
    { 
      action: 'Scheduled staff training', 
      client: 'Riverside Café',
      timestamp: 'Yesterday',
      icon: <TimerIcon sx={{ color: theme.palette.primary.main }} />
    },
    { 
      action: 'Submitted security report', 
      client: 'Sunrise Senior Living',
      timestamp: '2 days ago',
      icon: <CheckCircleIcon sx={{ color: '#4caf50' }} />
    }
  ];

  // Sample notifications
  const notifications = [
    { id: 1, message: "Harbor Dental Group assessment due tomorrow", type: "warning" },
    { id: 2, message: "New vulnerability found for Riverside Café", type: "alert" },
    { id: 3, message: "Training session scheduled for tomorrow", type: "info" },
    { id: 4, message: "Report approved by manager", type: "success" },
  ];

  // Sample upcoming appointments
  const appointments = [
    { title: "Client Meeting", client: "Harbor Dental Group", time: "Today, 2:00 PM", location: "On-site" },
    { title: "Security Training", client: "Riverside Café", time: "Tomorrow, 10:00 AM", location: "Virtual" },
    { title: "Assessment Review", client: "Westfield Law Partners", time: "Mar 4, 9:30 AM", location: "On-site" }
  ];

  // Quick action items for SpeedDial
  const actions = [
    { icon: <FileCopyIcon />, name: 'New Assessment' },
    { icon: <SaveIcon />, name: 'Save Report' },
    { icon: <PrintIcon />, name: 'Print' },
    { icon: <ShareIcon />, name: 'Share' },
  ];

  // Security recommendations
  const recommendations = [
    "Review Harbor Dental Group's firewall settings",
    "Update security awareness training materials",
    "Schedule follow-up with Riverside Café about password policy",
    "Recommend MFA implementation for Westfield Law Partners"
  ];

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleNotificationMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationsAnchorEl(event.currentTarget);
  };
  
  const handleNotificationMenuClose = () => {
    setNotificationsAnchorEl(null);
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Top Bar with Welcome and Notifications */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3, alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
            {greeting}, John
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Student Consultant Dashboard
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          <IconButton 
            size="large" 
            onClick={handleNotificationMenuOpen}
            sx={{ 
              bgcolor: 'rgba(25, 118, 210, 0.08)',
              '&:hover': {
                bgcolor: 'rgba(25, 118, 210, 0.15)',
              }
            }}
          >
            <Badge badgeContent={notifications.length} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Box>
      </Box>
      
      <Grid container spacing={3}>
        {/* Consultant Profile Card */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
              <Avatar 
                sx={{ 
                  width: 80, 
                  height: 80, 
                  backgroundColor: theme.palette.primary.main,
                  mb: 2,
                  boxShadow: '0 4px 12px rgba(25, 118, 210, 0.2)'
                }}
              >
                <PersonIcon sx={{ fontSize: 40 }} />
              </Avatar>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                John Smith
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Cybersecurity Student Consultant
              </Typography>
            </Box>
            
            <Box sx={{ 
              p: 2, 
              borderRadius: 2, 
              bgcolor: 'rgba(25, 118, 210, 0.04)', 
              border: '1px solid rgba(25, 118, 210, 0.1)',
              mb: 2
            }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                Your Weekly Progress
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                You've completed 5 client assessments this week, which is 125% of your weekly goal.
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={125} 
                sx={{ 
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: 'rgba(25, 118, 210, 0.1)',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: theme.palette.primary.main
                  }
                }}  
              />
            </Box>
            
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                Next Training Session
              </Typography>
              <Paper
                elevation={0}
                sx={{ 
                  p: 2, 
                  backgroundColor: 'rgba(3, 169, 244, 0.04)', 
                  border: '1px solid rgba(3, 169, 244, 0.1)',
                  borderRadius: 2
                }}
              >
                <Typography variant="body2" fontWeight={500}>
                  Advanced Penetration Testing
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  March 5, 2025 at 3:00 PM
                </Typography>
              </Paper>
            </Box>
            
            <Button 
              variant="outlined" 
              color="primary" 
              fullWidth
              sx={{ mt: 'auto' }}
            >
              View Complete Profile
            </Button>
          </Paper>
        </Grid>
        
        {/* Stats Cards */}
        <Grid item xs={12} md={8}>
          <Grid container spacing={2}>
            {consultantStats.map((stat, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <Card sx={{ 
                  borderRadius: 2, 
                  height: '100%',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
                  },
                }}>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Avatar 
                      sx={{ 
                        bgcolor: `${stat.color}15`, 
                        color: stat.color, 
                        margin: '0 auto',
                        mb: 2
                      }}
                    >
                      {stat.icon}
                    </Avatar>
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {stat.title}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          
          {/* Recommendations Card */}
          <Paper sx={{ 
            p: 2, 
            mt: 3, 
            mb: 3, 
            borderRadius: 2,
            bgcolor: 'rgba(103, 58, 183, 0.05)', 
            border: '1px dashed rgba(103, 58, 183, 0.3)'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <LightbulbIcon sx={{ color: '#673ab7', mr: 1 }} />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Insights & Recommendations
              </Typography>
            </Box>
            <List dense>
              {recommendations.map((rec, index) => (
                <ListItem key={index} sx={{ py: 0.5 }}>
                  <ListItemText 
                    primary={rec}
                    primaryTypographyProps={{ variant: 'body2' }}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
          
          {/* Calendar Widget */}
          <Paper sx={{ p: 2, mb: 3, borderRadius: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <EventIcon sx={{ color: theme.palette.primary.main, mr: 1 }} />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Upcoming Appointments
              </Typography>
            </Box>
            <List dense>
              {appointments.map((apt, index) => (
                <React.Fragment key={index}>
                  <ListItem alignItems="flex-start">
                    <ListItemText
                      primary={
                        <Typography variant="subtitle2" fontWeight={600}>
                          {apt.title} with {apt.client}
                        </Typography>
                      }
                      secondary={
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
                          <Typography variant="body2" color="textSecondary">
                            {apt.time}
                          </Typography>
                          <Chip 
                            label={apt.location} 
                            size="small" 
                            sx={{ 
                              height: 20, 
                              fontSize: '0.7rem',
                              bgcolor: apt.location === 'Virtual' ? 'rgba(76, 175, 80, 0.1)' : 'rgba(25, 118, 210, 0.1)',
                              color: apt.location === 'Virtual' ? '#4caf50' : theme.palette.primary.main,
                            }}
                          />
                        </Box>
                      }
                    />
                  </ListItem>
                  {index < appointments.length - 1 && <Divider component="li" />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
          
          {/* Tabs Section */}
          <Paper sx={{ borderRadius: 2 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs 
                value={tabValue} 
                onChange={handleTabChange} 
                aria-label="consultant dashboard tabs"
                indicatorColor="primary"
              >
                <Tab label="My Clients" />
                <Tab label="Tasks" />
                <Tab label="Recent Activity" />
              </Tabs>
            </Box>
            
            {/* Clients Tab Panel */}
            <TabPanel value={tabValue} index={0}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                <Button 
                  variant="contained" 
                  startIcon={<AddIcon />} 
                  color="primary"
                  sx={{ borderRadius: 2 }}
                >
                  Add New Client
                </Button>
              </Box>
              
              <List sx={{ width: '100%' }}>
                {clients.map((client, index) => (
                  <React.Fragment key={index}>
                    <ListItem
                      alignItems="flex-start"
                      secondaryAction={
                        <IconButton edge="end" onClick={handleMenuOpen}>
                          <MoreVertIcon />
                        </IconButton>
                      }
                      sx={{ 
                        py: 2,
                        '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.02)' }
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                          <BusinessIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography variant="subtitle1" fontWeight={600}>
                            {client.name}
                          </Typography>
                        }
                        secondary={
                          <Box sx={{ mt: 0.5 }}>
                            <Typography variant="body2" color="textSecondary" sx={{ mb: 0.5 }}>
                              {client.type} • Due: {client.dueDate}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <LinearProgress 
                                variant="determinate" 
                                value={client.progress} 
                                sx={{ 
                                  flexGrow: 1, 
                                  height: 6,
                                  borderRadius: 3,
                                  backgroundColor: 'rgba(0, 0, 0, 0.08)'
                                }} 
                              />
                              <Typography variant="caption" fontWeight={500}>
                                {client.progress}%
                              </Typography>
                            </Box>
                          </Box>
                        }
                      />
                      <Box sx={{ ml: 2, display: 'flex', alignItems: 'center' }}>
                        <Chip 
                          label={client.status} 
                          size="small"
                          sx={{ 
                            backgroundColor: `${client.statusColor}15`,
                            color: client.statusColor,
                            fontWeight: 500,
                            fontSize: '0.75rem'
                          }} 
                        />
                      </Box>
                    </ListItem>
                    {index < clients.length - 1 && <Divider variant="inset" component="li" />}
                  </React.Fragment>
                ))}
              </List>
            </TabPanel>
            
            {/* Tasks Tab Panel */}
            <TabPanel value={tabValue} index={1}>
              <List sx={{ width: '100%' }}>
                {tasks.map((task, index) => (
                  <React.Fragment key={index}>
                    <ListItem
                      alignItems="flex-start"
                      sx={{ 
                        py: 2,
                        '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.02)' }
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: task.priorityColor }}>
                          <AssignmentIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography variant="subtitle1" fontWeight={600}>
                            {task.title}
                          </Typography>
                        }
                        secondary={
                          <Typography variant="body2" color="textSecondary">
                            {task.client} • Due: {task.dueDate}
                          </Typography>
                        }
                      />
                      <Box sx={{ ml: 2, display: 'flex', alignItems: 'center' }}>
                        <Chip 
                          label={task.priority} 
                          size="small"
                          sx={{ 
                            backgroundColor: `${task.priorityColor}15`,
                            color: task.priorityColor,
                            fontWeight: 500,
                            fontSize: '0.75rem'
                          }} 
                        />
                      </Box>
                    </ListItem>
                    {index < tasks.length - 1 && <Divider variant="inset" component="li" />}
                  </React.Fragment>
                ))}
              </List>
            </TabPanel>
            
            {/* Activity Tab Panel */}
            <TabPanel value={tabValue} index={2}>
              <List sx={{ width: '100%' }}>
                {activities.map((activity, index) => (
                  <React.Fragment key={index}>
                    <ListItem
                      alignItems="flex-start"
                      sx={{ 
                        py: 2,
                        '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.02)' }
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: 'rgba(0, 0, 0, 0.04)' }}>
                          {activity.icon}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography variant="subtitle1" fontWeight={600}>
                            {activity.action}
                          </Typography>
                        }
                        secondary={
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
                            <Typography variant="body2" color="textSecondary">
                              {activity.client}
                            </Typography>
                            <Typography variant="caption" color="textSecondary">
                              {activity.timestamp}
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                    {index < activities.length - 1 && <Divider variant="inset" component="li" />}
                  </React.Fragment>
                ))}
              </List>
            </TabPanel>
          </Paper>
        </Grid>
      </Grid>
      
      {/* Client Menu */}
      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            borderRadius: 2,
            minWidth: 180
          }
        }}
      >
        <MenuItem onClick={handleMenuClose}>View Client Details</MenuItem>
        <MenuItem onClick={handleMenuClose}>Schedule Assessment</MenuItem>
        <MenuItem onClick={handleMenuClose}>Create Report</MenuItem>
        <Divider />
        <MenuItem onClick={handleMenuClose} sx={{ color: theme.palette.error.main }}>
          Remove Client
        </MenuItem>
      </Menu>
      
      {/* Notifications Menu */}
      <Menu
        anchorEl={notificationsAnchorEl}
        open={Boolean(notificationsAnchorEl)}
        onClose={handleNotificationMenuClose}
        PaperProps={{
          sx: {
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            borderRadius: 2,
            width: 320,
            maxHeight: 400
          }
        }}
      >
        <Box sx={{ px: 2, py: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="subtitle1" fontWeight={600}>Notifications</Typography>
          <Button size="small">Mark all as read</Button>
        </Box>
        <Divider />
        {notifications.map((notification) => (
          <MenuItem 
            key={notification.id} 
            onClick={handleNotificationMenuClose}
            sx={{ 
              py: 1.5,
              borderLeft: '4px solid',
              borderLeftColor: 
                notification.type === 'warning' ? '#ff9800' : 
                notification.type === 'alert' ? '#f44336' :
                notification.type === 'success' ? '#4caf50' : '#2196f3'
            }}
          >
            <ListItemText
              primary={notification.message}
              secondary="Just now"
            />
          </MenuItem>
        ))}
        <Divider />
        <MenuItem sx={{ justifyContent: 'center' }}>
          <Button size="small" fullWidth>View All Notifications</Button>
        </MenuItem>
      </Menu>
      
      {/* Quick Actions SpeedDial */}
      <SpeedDial
        ariaLabel="Quick Actions"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
          />
        ))}
      </SpeedDial>
    </Box>
  );
};

export default ConsultantDashboard;