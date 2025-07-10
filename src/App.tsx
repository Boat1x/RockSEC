import { Box } from '@mui/material';
import React, { useState } from 'react';
import { createBrowserRouter, Navigate, Outlet, RouterProvider, useLocation } from "react-router-dom";

// Theme Provider
import ThemeProvider from './ThemeProvider';

// Context
import { AuthContext, AuthProvider } from './context/AuthContext';

// Components
import AdminLayout from "./components/AdminLayout";
import ConsultantNavbar from "./components/ConsultantNavbar";
import ConsultantSidebar from "./components/ConsultantSidebar";

// Pages
// import AdminDashboard from "./pages/AdminDashboard";
// import SimpleDashboard from "./pages/SimpleDashboard";
// import AdminDashboardSimple from "./pages/AdminDashboardSimple";
import AdminDashboardV2 from "./pages/AdminDashboardV2";
import BusinessAssessment from "./pages/BusinessAssessment";
import ConsultantDashboard from "./pages/ConsultantDashboard";
import Dashboard from "./pages/Dashboard";
import ErrorPage from "./pages/ErrorPage";
import History from "./pages/History";
import LearningHub from "./pages/LearningHub";
import Login from "./pages/Login";
import ThreatIntelligence from "./pages/ThreatIntelligence";

// Admin pages
import AdminClients from "./pages/admin/AdminClients";
import AdminConsultants from "./pages/admin/AdminConsultants";
import AdminLogs from "./pages/admin/AdminLogs";
import AdminPrograms from "./pages/admin/AdminPrograms";
import AdminReports from "./pages/admin/AdminReports";
import AdminSecurity from "./pages/admin/AdminSecurity";
import AdminUsers from "./pages/admin/AdminUsers";

// Create a temporary ClientDetail component
const ClientDetail: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <p>Client Detail Page - Under Construction</p>
    </Box>
  );
};

const App: React.FC = () => {
  // Router configuration
  const router = createBrowserRouter([
    {
      path: "/login",
      element: (
        <AuthWrapper>
          <Login />
        </AuthWrapper>
      ),
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
          element: <AdminDashboardV2 />,
        },
        {
          path: "consultants",
          element: <AdminConsultants />,
        },
        {
          path: "clients",
          element: <AdminClients />,
        },
        {
          path: "reports",
          element: <AdminReports />,
        },
        {
          path: "users",
          element: <AdminUsers />,
        },
        {
          path: "programs",
          element: <AdminPrograms />,
        },
        {
          path: "logs",
          element: <AdminLogs />,
        },
        {
          path: "security",
          element: <AdminSecurity />,
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
          <ConsultantLayout />
        </ProtectedRoute>
      ),
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
        {
          path: "/assessment",
          element: <BusinessAssessment />,
        },
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

// Auth-protected route component
const ProtectedRoute: React.FC<{ children: React.ReactNode, adminOnly?: boolean }> = ({ children, adminOnly }) => {
  const { isAuthenticated, userType } = React.useContext(AuthContext);
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login and save the location they were trying to access
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // For admin routes, verify the user is an admin
  if (adminOnly && userType !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

// Authentication wrapper to prevent authenticated users from accessing login
const AuthWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = React.useContext(AuthContext);
  const location = useLocation();

  // If already authenticated, redirect to home page
  if (isAuthenticated && location.pathname === '/login') {
    return <Navigate to="/" replace />;
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
      <ConsultantNavbar open={open} handleDrawerOpen={handleDrawerOpen} />
      <ConsultantSidebar open={open} handleDrawerClose={handleDrawerClose} />
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

export default App;