import React, { useState, useEffect, createContext } from 'react';
import { createBrowserRouter, RouterProvider, Outlet, Navigate, useLocation } from "react-router-dom";

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
import Login from "./pages/Login";

// Context
export const AuthContext = createContext<{
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}>({
  isAuthenticated: false,
  login: async () => false,
  logout: () => {},
});

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  
  // Check if user is logged in when app loads
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    // For demo purposes, we'll just accept a specific email/password
    if (email === 'student@manhattanville.edu' && password === 'password123') {
      // Store token in localStorage
      localStorage.setItem('auth_token', 'demo_token');
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  // Logout function
  const logout = (): void => {
    localStorage.removeItem('auth_token');
    setIsAuthenticated(false);
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
          <Layout />
        </ProtectedRoute>
      ),
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
        {
          path: "/history",
          element: <History />,
        },
        {
          path: "/assessment",
          element: <BusinessAssessment />,
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
          path: "*",
          element: <Navigate to="/" replace />
        }
      ]    
    }
  ]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </AuthContext.Provider>
  );
}

export default App;// Auth-protected route component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = React.useContext(AuthContext);
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login and save the location they were trying to access
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

// Layout component with Navbar and Sidebar
const Layout: React.FC = () => {
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