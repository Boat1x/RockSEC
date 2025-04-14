import SchoolIcon from '@mui/icons-material/School';
import SecurityIcon from '@mui/icons-material/Security';
import {
  AppBar,
  Avatar,
  Box,
  Container,
  Paper,
  Toolbar,
  Typography
} from '@mui/material';
import React from 'react';
import TodoComponent from '../components/Todo';

const ConsultantDashboard: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#f8fafc' }}>
      <AppBar position="static" color="default" elevation={1} sx={{ backgroundColor: 'white' }}>
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <SecurityIcon sx={{ color: '#1976d2', mr: 1 }} />
            <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
              ROCKY <span style={{ color: '#2196f3' }}>SECURITY</span>
            </Typography>
            <Box sx={{ 
              ml: 2, 
              px: 2, 
              py: 0.5, 
              bgcolor: '#f0f7ff', 
              borderRadius: 1,
              display: 'flex',
              alignItems: 'center'
            }}>
              <SchoolIcon sx={{ fontSize: 16, mr: 1, color: '#1976d2' }} />
              <Typography variant="body2" color="primary">
                Manhattanville University
              </Typography>
            </Box>
          </Box>
          <Avatar sx={{ bgcolor: '#1976d2' }}>JS</Avatar>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
        <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
          Consultant Dashboard
        </Typography>
        
        <Paper 
          elevation={0}
          sx={{ 
            p: 3, 
            mb: 4, 
            borderRadius: 2,
            bgcolor: 'white',
            border: '1px solid #e0e7ff'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar sx={{ width: 56, height: 56, bgcolor: '#1976d2', fontSize: '1.5rem' }}>
              JS
            </Avatar>
            <Box sx={{ ml: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                John Smith
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Student Consultant
              </Typography>
              <Box sx={{ display: 'flex', gap: 3, mt: 1 }}>
                <Typography variant="body2">
                  <strong>5</strong> Clients
                </Typography>
                <Typography variant="body2">
                  <strong>12</strong> Tasks
                </Typography>
              </Box>
            </Box>
          </Box>
        </Paper>

        <TodoComponent />
      </Container>
    </Box>
  );
};

export default ConsultantDashboard; 