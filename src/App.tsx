import { Box, Typography } from '@mui/material';
import React, { useState } from 'react';
import { createBrowserRouter, Navigate, Outlet, RouterProvider, useLocation } from "react-router-dom";
// Theme Provider
import ThemeProvider from './ThemeProvider';

// Auth Provider
import { AuthContext, AuthProvider } from './context/AuthContext';

// Components
import AdminLayout from "./components/AdminLayout";
import Navbar from "./components/Navbar";
import Sidebar from "./pages/Sidebar";

// Pages
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
import BusinessAssessment from "./pages/BusinessAssessment";
import ClientDashboard from "./pages/ClientDashboard";
import ConsultantDashboard from "./pages/ConsultantDashboard";
import Dashboard from "./pages/Dashboard";
import ErrorPage from "./pages/ErrorPage";
import History from "./pages/History";
import LearningHub from "./pages/LearningHub";
import Login from "./pages/Login";
import ThreatIntelligence from "./pages/ThreatIntelligence";

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

const App: React.FC = () => {
  // Router configuration
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/admin/login",
      element: <AdminLogin />,
    },
    {
      path: "/admin",
      element: (
        <ProtectedRoute adminOnly>
          <AdminLayout>
            <Outlet />
          </AdminLayout>
        </ProtectedRoute>
      ),
      children: [
        {
          path: "dashboard",
          element: <AdminDashboard />,
        },
        {
          path: "*",
          element: <Navigate to="/admin/dashboard" replace />
        }
      ]
    },
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <DynamicLayout />
        </ProtectedRoute>
      ),
      errorElement: <ErrorPage />,
      children: [
        // Routes accessible to both consultants and clients
        {
          index: true,
          element: <DynamicDashboard />,
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
    <AuthProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;

// Dynamic dashboard component that renders different dashboards based on user type
const DynamicDashboard: React.FC = () => {
  const { userType } = React.useContext(AuthContext);
  
  if (userType === 'client') {
    return <ClientDashboard />;
  } else if (userType === 'admin') {
    return <Navigate to="/admin/dashboard" />;
  } else {
    return <Dashboard />;
  }
};

// Dynamic layout component that renders different layouts based on user type
const DynamicLayout: React.FC = () => {
  const { userType } = React.useContext(AuthContext);
  
  if (userType === 'client') {
    return <ClientLayout />;
  } else if (userType === 'admin') {
    return <Navigate to="/admin/dashboard" />;
  } else {
    return <ConsultantLayout />;
  }
};

// Auth-protected route component
const ProtectedRoute: React.FC<{ children: React.ReactNode, adminOnly?: boolean }> = ({ children, adminOnly }) => {
  const { isAuthenticated, userType } = React.useContext(AuthContext);
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login and save the location they were trying to access
    return <Navigate to={adminOnly ? "/admin/login" : "/login"} state={{ from: location }} replace />;
  }

  // For admin routes, verify the user is an admin
  if (adminOnly && userType !== 'admin') {
    return <Navigate to="/login" replace />;
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

// Layout component for client users
const ClientLayout: React.FC = () => {
  const [open, setOpen] = useState<boolean>(true);
  
  const handleDrawerOpen = (): void => {
    setOpen(true);
  };
  
  const handleDrawerClose = (): void => {
    setOpen(false);
  };
  
  return (
    <>
      <Navbar open={open} handleDrawerOpen={handleDrawerOpen} isClient={true} />
      <Sidebar open={open} handleDrawerClose={handleDrawerClose} isClient={true} />
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