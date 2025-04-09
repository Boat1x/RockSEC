import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SchoolIcon from '@mui/icons-material/School';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
    Alert,
    Box,
    Button,
    Checkbox,
    CircularProgress,
    Divider,
    FormControlLabel,
    IconButton,
    InputAdornment,
    Link,
    Paper,
    TextField,
    Typography,
    useTheme
} from '@mui/material';
import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const AdminLogin: React.FC = () => {
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

  // Get the intended destination from location state, or default to '/admin'
  const from = (location.state as any)?.from?.pathname || '/admin/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      // Use the admin-specific login method
      const success = await login(email, password, 'admin');
      if (success) {
        // Navigate to the admin dashboard
        navigate(from, { replace: true });
      } else {
        setError('Invalid admin credentials. Please try again.');
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

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #1a237e 0%, #283593 100%)',
        p: 2
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: { xs: 3, sm: 5 },
          borderRadius: 3,
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          maxWidth: 500,
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
          overflow: 'hidden'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <AdminPanelSettingsIcon sx={{ color: theme.palette.primary.dark, fontSize: 36, mr: 2 }} />
          <Box>
            <Typography variant="h5" component="h1" sx={{ fontWeight: 700 }}>
              ROCKY <span style={{ color: theme.palette.secondary.main }}>SECURITY</span>
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
              <SchoolIcon sx={{ fontSize: 14, color: theme.palette.primary.main, mr: 0.5 }} />
              <Typography variant="caption" color="textSecondary">
                Manhattanville University Administration
              </Typography>
            </Box>
          </Box>
        </Box>
        
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
          Admin Portal
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 4 }}>
          Sign in to access the administrative dashboard
        </Typography>
        
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 3 }}
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
              background: 'linear-gradient(45deg, #1a237e 30%, #303f9f 90%)',
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
            Admin Only
          </Typography>
        </Divider>
        
        <Box sx={{ textAlign: 'center', mb: 2 }}>
          <Typography variant="body2" color="textSecondary">
            This area is restricted to authorized administrators.
          </Typography>
          <Link 
            href="/" 
            underline="hover" 
            color="primary"
            sx={{ fontWeight: 500 }}
          >
            Return to main login
          </Link>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2 }}>
          <Typography variant="caption" color="textSecondary">
            For demo purposes, use: admin@rocky.edu / admin123
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default AdminLogin;