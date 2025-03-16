import React, { useState } from 'react';
import { createBrowserRouter, RouterProvider, Outlet, Navigate } from "react-router-dom";

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
        backgroundColor: '#121212'
      }}>
        <Outlet />
      </div>
    </>
  );
};

// Router configuration
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "/history",
        element: <History />
      },
      {
        path: "/assessment",
        element: <BusinessAssessment />
      },
      {
        path: "/learning",
        element: <LearningHub />
      },
      {
        path: "/consultant",
        element: <ConsultantDashboard />
      },
      {
        path: "*",
        element: <Navigate to="/" replace />
      }
    ]    
  }
]);

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;