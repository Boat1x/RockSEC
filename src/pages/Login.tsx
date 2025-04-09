import React, { useState, useContext } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  TextField, 
  Button, 
  Divider, 
  Grid, 
  Link, 
  FormControlLabel, 
  Checkbox,
  useTheme,
  InputAdornment,
  IconButton,
  Alert,
  CircularProgress,
  ToggleButtonGroup,
  ToggleButton,
  Card,
  CardContent
} from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';
import SchoolIcon from '@mui/icons-material/School';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useContext(AuthContext);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userType, setUserType] = useState<'consultant' | 'client'>('consultant');

  // Get the intended destination from location state, or default to '/'
  const from = (location.state as any)?.from?.pathname || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      // Always use client@example.com when client type is selected
      const emailToUse = userType === 'client' ? 'client@example.com' : email;
      
      const success = await login(emailToUse, password);
      if (success) {
        // Navigate to the page they were trying to access
        navigate(from, { replace: true });
      } else {
        setError('Invalid email or password. Please try again.');
      }
    } catch (err) {
      setError('An error occurred during login. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle password visibility
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // Handle user type selection
  const handleUserTypeChange = (_event: React.MouseEvent<HTMLElement>, newType: 'consultant' | 'client') => {
    if (newType !== null) {
      setUserType(newType);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 100%)',
        p: 2
      }}
    >
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={10} md={8} lg={6} xl={5}>
          <Paper
            elevation={3}
            sx={{
              p: { xs: 3, sm: 5 },
              borderRadius: 3,
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
              overflow: 'hidden'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
              <SecurityIcon sx={{ color: theme.palette.primary.main, fontSize: 36, mr: 2 }} />
              <Box>
                <Typography variant="h5" component="h1" sx={{ fontWeight: 700 }}>
                  ROCKY <span style={{ color: theme.palette.secondary.main }}>SECURITY</span>
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                  <SchoolIcon sx={{ fontSize: 14, color: theme.palette.primary.main, mr: 0.5 }} />
                  <Typography variant="caption" color="textSecondary">
                    Manhattanville University Cybersecurity Consulting
                  </Typography>
                </Box>
              </Box>
            </Box>
            
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
              Welcome Back
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 4 }}>
              Sign in to access the security platform
            </Typography>
            
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
                Choose account type:
              </Typography>
              <ToggleButtonGroup
                value={userType}
                exclusive
                onChange={handleUserTypeChange}
                aria-label="user type"
                fullWidth
                sx={{ mb: 2 }}
              >
                <ToggleButton 
                  value="consultant" 
                  aria-label="consultant"
                  sx={{ 
                    py: 2, 
                    borderRadius: '8px 0 0 8px',
                    '&.Mui-selected': {
                      bgcolor: 'rgba(25, 118, 210, 0.08)',
                      fontWeight: 600
                    }
                  }}
                >
                  <PersonIcon sx={{ mr: 1 }} />
                  Security Consultant
                </ToggleButton>
                <ToggleButton 
                  value="client" 
                  aria-label="client"
                  sx={{ 
                    py: 2, 
                    borderRadius: '0 8px 8px 0',
                    '&.Mui-selected': {
                      bgcolor: 'rgba(3, 169, 244, 0.08)',
                      fontWeight: 600
                    }
                  }}
                >
                  <BusinessIcon sx={{ mr: 1 }} />
                  Client Access
                </ToggleButton>
              </ToggleButtonGroup>
              
              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={6}>
                  <Card 
                    variant="outlined" 
                    sx={{ 
                      height: '100%',
                      borderColor: userType === 'consultant' ? theme.palette.primary.main : 'divider',
                      bgcolor: userType === 'consultant' ? 'rgba(25, 118, 210, 0.04)' : 'transparent',
                      borderRadius: 2
                    }}
                  >
                    <CardContent sx={{ p: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <PersonIcon 
                          sx={{ 
                            mr: 1, 
                            color: userType === 'consultant' ? theme.palette.primary.main : 'text.secondary'
                          }} 
                        />
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                          Consultant Portal
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="textSecondary">
                        For Manhattanville student consultants managing client security assessments
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Card 
                    variant="outlined" 
                    sx={{ 
                      height: '100%',
                      borderColor: userType === 'client' ? theme.palette.secondary.main : 'divider',
                      bgcolor: userType === 'client' ? 'rgba(3, 169, 244, 0.04)' : 'transparent',
                      borderRadius: 2
                    }}
                  >
                    <CardContent sx={{ p: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <BusinessIcon 
                          sx={{ 
                            mr: 1, 
                            color: userType === 'client' ? theme.palette.secondary.main : 'text.secondary'
                          }} 
                        />
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                          Client Access
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="textSecondary">
                        For businesses to view security assessments and implement recommendations
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
            
            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}
            
            <form onSubmit={handleSubmit}>
              <TextField
                label="Email"
                variant="outlined"
                type="email"
                fullWidth
                required
                value={userType === 'client' ? 'client@example.com' : email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ mb: 3 }}
                helperText={userType === 'client' ? "Using demo client email for testing" : ""}
              />
              
              <TextField
                label="Password"
                variant="outlined"
                type={showPassword ? 'text' : 'password'}
                fullWidth
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ mb: 2 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <FormControlLabel
                  control={
                    <Checkbox 
                      checked={rememberMe} 
                      onChange={(e) => setRememberMe(e.target.checked)} 
                      color="primary" 
                    />
                  }
                  label={<Typography variant="body2">Remember me</Typography>}
                />
                <Link 
                  href="#" 
                  underline="hover" 
                  color="primary"
                  sx={{ fontWeight: 500 }}
                >
                  Forgot password?
                </Link>
              </Box>
              
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                sx={{ 
                  py: 1.5, 
                  fontSize: '1rem', 
                  fontWeight: 600,
                  borderRadius: 2,
                  background: userType === 'consultant' 
                    ? 'linear-gradient(45deg, #1976d2 30%, #2196f3 90%)'
                    : 'linear-gradient(45deg, #03a9f4 30%, #4fc3f7 90%)',
                }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>
            
            <Divider sx={{ my: 4 }}>
              <Typography variant="body2" color="textSecondary">
                or
              </Typography>
            </Divider>
            
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Typography variant="body2" color="textSecondary">
                Don't have an account?
              </Typography>
              <Link 
                href="#" 
                underline="hover" 
                color="primary"
                sx={{ fontWeight: 500 }}
              >
                Contact your faculty advisor
              </Link>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2 }}>
              <Typography variant="caption" color="textSecondary">
                {userType === 'consultant' 
                  ? 'For demo purposes, use: student@manhattanville.edu / password123'
                  : 'For client demo, use: client@example.com / password123'}
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login;