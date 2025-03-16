import React from 'react';
import { Typography, Paper, Grid, Card, CardContent, Avatar, Box } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const ConsultantDashboard: React.FC = () => {
  // Sample data for the consultant dashboard
  const consultantStats = [
    { title: 'Active Clients', value: '5', icon: <BusinessIcon />, color: '#6200ea' },
    { title: 'Assessments', value: '12', icon: <AssignmentIcon />, color: '#03dac6' },
    { title: 'Hours Logged', value: '28', icon: <CalendarTodayIcon />, color: '#bb86fc' },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
        Student Consultant Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        {/* Consultant Profile Card */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
              <Avatar 
                sx={{ 
                  width: 80, 
                  height: 80, 
                  backgroundColor: '#6200ea',
                  mb: 2
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
              bgcolor: 'rgba(98, 0, 234, 0.1)', 
              border: '1px solid rgba(98, 0, 234, 0.2)',
              mb: 2
            }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                Your Weekly Progress
              </Typography>
              <Typography variant="body2" color="textSecondary">
                You've completed 5 client assessments this week, which is 125% of your weekly goal.
              </Typography>
            </Box>
            
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
              Next Training Session
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Advanced Penetration Testing - March 5, 2025 at 3:00 PM
            </Typography>
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
                    boxShadow: '0 8px 25px rgba(0,0,0,0.3)',
                  },
                }}>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Avatar 
                      sx={{ 
                        bgcolor: `${stat.color}20`, 
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
          
          {/* Upcoming Assignments */}
          <Paper sx={{ p: 3, borderRadius: 2, mt: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Upcoming Client Assignments
            </Typography>
            
            {[1, 2, 3].map((item) => (
              <Box 
                key={item}
                sx={{ 
                  p: 2, 
                  mb: 2, 
                  borderRadius: 2, 
                  bgcolor: 'rgba(30, 30, 30, 0.5)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2
                }}
              >
                <Avatar sx={{ bgcolor: item === 1 ? '#f44336' : '#03dac6' }}>
                  <BusinessIcon />
                </Avatar>
                
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    {item === 1 ? 'Harbor Dental Group - Security Assessment' : 
                     item === 2 ? 'Riverside Café - Staff Training' : 
                     'Westfield Law Partners - Vulnerability Scan'}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {item === 1 ? 'Due: March 4, 2025' : 
                     item === 2 ? 'Due: March 8, 2025' : 
                     'Due: March 15, 2025'}
                  </Typography>
                </Box>
                
                <Box sx={{ 
                  ml: 'auto', 
                  bgcolor: item === 1 ? 'rgba(244, 67, 54, 0.1)' : 'rgba(3, 218, 198, 0.1)', 
                  color: item === 1 ? '#f44336' : '#03dac6',
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 1,
                  fontSize: '0.75rem',
                  fontWeight: 600
                }}>
                  {item === 1 ? 'High Priority' : 'Scheduled'}
                </Box>
              </Box>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ConsultantDashboard;