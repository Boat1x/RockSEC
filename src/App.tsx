import React, { useState, useEffect, createContext } from 'react';
import { createBrowserRouter, RouterProvider, Outlet, Navigate, useLocation } from "react-router-dom";
import { Box, Typography } from '@mui/material';

// Theme Provider
import ThemeProvider from './ThemeProvider';

// Components
import Navbar from "./components/Navbar";
import Sidebar from "./pages/Sidebar";

// Pages
import Dashboard from "./pages/Dashboard"; 
import ErrorPage from "./pages/ErrorPage";
import History from "./pages/History";
import BusinessAssessment from "./pages/BusinessAssessment";
import LearningHub from "./pages/LearningHub";
import ConsultantDashboard from "./pages/ConsultantDashboard";
import ClientDashboard from "./pages/ClientDashboard";
import ThreatIntelligence from "./pages/ThreatIntelligence";
import Login from "./pages/Login";

// Create a temporary ClientDetail component
const ClientDetail: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Client Detail Page
      </Typography>
      <Typography variant="body1">
        This page is under construction.
      </Typography>
    </Box>
  );
};

// Context
export const AuthContext = createContext<{
  isAuthenticated: boolean;
  userType: 'consultant' | 'client' | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}>({
  isAuthenticated: false,
  userType: null,
  login: async () => false,
  logout: () => {},
});

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userType, setUserType] = useState<'consultant' | 'client' | null>(null);
  
  // Check if user is logged in when app loads
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    const storedUserType = localStorage.getItem('user_type');
    
    if (token) {
      setIsAuthenticated(true);
      setUserType(storedUserType as 'consultant' | 'client' || 'consultant');
    }
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    // Demo login logic - in a real app this would validate with a backend
    if (email === 'student@manhattanville.edu' && password === 'password123') {
      // Store token in localStorage
      localStorage.setItem('auth_token', 'demo_token');
      localStorage.setItem('user_type', 'consultant');
      setIsAuthenticated(true);
      setUserType('consultant');
      return true;
    } else if (email === 'client@example.com' && password === 'password123') {
      // Client login
      localStorage.setItem('auth_token', 'client_token');
      localStorage.setItem('user_type', 'client');
      setIsAuthenticated(true);
      setUserType('client');
      return true;
    }
    return false;
  };

  // Logout function
  const logout = (): void => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_type');
    setIsAuthenticated(false);
    setUserType(null);
  };

  // Router configuration
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/",
      element: (
        <ProtectedRoute>
          {userType === 'client' ? <ClientLayout /> : <ConsultantLayout />}
        </ProtectedRoute>
      ),
      errorElement: <ErrorPage />,
      children: [
        // Routes accessible to both consultants and clients
        {
          index: true,
          element: userType === 'client' ? <ClientDashboard /> : <Dashboard />,
        },
        {
          path: "/assessment",
          element: <BusinessAssessment />,
        },
        
        // Routes primarily for consultants
        {
          path: "/history",
          element: <History />,
        },
        {
          path: "/learning",
          element: <LearningHub />,
        },
        {
          path: "/consultant",
          element: <ConsultantDashboard />,
        },
        {
          path: "/threats",
          element: <ThreatIntelligence />,
        },
        {
          path: "/clients/:clientId",
          element: <ClientDetail />,
        },
        
        // Fallback route
        {
          path: "*",
          element: <Navigate to="/" replace />
        }
      ]    
    }
  ]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, userType, login, logout }}>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </AuthContext.Provider>
  );
}

export default App;

// Auth-protected route component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = React.useContext(AuthContext);
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login and save the location they were trying to access
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

// Layout component with Navbar and Sidebar for consultants
const ConsultantLayout: React.FC = () => {
  const [open, setOpen] = useState<boolean>(true);
  
  const handleDrawerOpen = (): void => {
    setOpen(true);
  };
  
  const handleDrawerClose = (): void => {
    setOpen(false);
  };
  
  return (
    <>
      <Navbar open={open} handleDrawerOpen={handleDrawerOpen} />
      <Sidebar open={open} handleDrawerClose={handleDrawerClose} />
      <div style={{ 
        paddingLeft: open ? '260px' : '0',
        paddingTop: '64px',
        transition: 'padding-left 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms',
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#f5f7fa',
      }}>
        <Outlet />
      </div>
    </>
  );
};

// Layout component with simplified navbar for clients
const ClientLayout: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  
  const handleDrawerOpen = (): void => {
    setOpen(true);
  };
  
  const handleDrawerClose = (): void => {
    setOpen(false);
  };
  
  return (
    <>
      <Navbar open={open} handleDrawerOpen={handleDrawerOpen} />
      <div style={{ 
        paddingTop: '64px',
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#f5f7fa',
      }}>
        <Outlet />
      </div>
    </>
  );
};