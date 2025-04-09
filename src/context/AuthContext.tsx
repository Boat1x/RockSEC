import React, { createContext, ReactNode, useEffect, useState } from 'react';

// Define user data type
export interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
}

// Define context type
interface AuthContextType {
  isAuthenticated: boolean;
  userType: string | null;
  user: UserData | null;
  login: (email: string, password: string, type?: 'consultant' | 'client' | 'admin') => Promise<boolean>;
  logout: () => void;
  checkAuth: () => void;
}

// Create context with default values
export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  userType: null,
  user: null,
  login: async () => false,
  logout: () => {},
  checkAuth: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userType, setUserType] = useState<string | null>(null);
  const [user, setUser] = useState<UserData | null>(null);

// Login function
const login = async (email: string, password: string, type?: 'consultant' | 'client' | 'admin'): Promise<boolean> => {
    // Demo login logic - in a real app, this would validate with a backend
    if ((type === 'admin' || !type) && email === 'admin@rocky.edu' && password === 'admin123') {
      // Create mock user data for admin
      const userData: UserData = {
        id: 'a-1',
        name: 'Admin User',
        email: 'admin@rocky.edu',
        role: 'admin',
      };
      
      // Store user data and token in localStorage
      localStorage.setItem('auth_token', 'admin_token');
      localStorage.setItem('user_type', 'admin');
      localStorage.setItem('user_data', JSON.stringify(userData));
      
      setIsAuthenticated(true);
      setUserType('admin');
      setUser(userData);
      
      return true;
    } else if ((type === 'consultant' || !type) && email === 'student@manhattanville.edu' && password === 'password123') {
      // Create mock user data for consultant
      const userData: UserData = {
        id: 'c-1',
        name: 'John Smith',
        email: 'student@manhattanville.edu',
        role: 'consultant',
      };
      
      // Store user data and token in localStorage
      localStorage.setItem('auth_token', 'demo_token');
      localStorage.setItem('user_type', 'consultant');
      localStorage.setItem('user_data', JSON.stringify(userData));
      
      setIsAuthenticated(true);
      setUserType('consultant');
      setUser(userData);
      
      return true;
    } else if ((type === 'client' || !type) && email === 'client@example.com' && password === 'password123') {
      // Create mock user data for client
      const userData: UserData = {
        id: 'cl-1',
        name: 'Harbor Dental',
        email: 'client@example.com',
        role: 'client',
      };
      
      // Store user data and token in localStorage
      localStorage.setItem('auth_token', 'client_token');
      localStorage.setItem('user_type', 'client');
      localStorage.setItem('user_data', JSON.stringify(userData));
      
      setIsAuthenticated(true);
      setUserType('client');
      setUser(userData);
      
      return true;
    }
    
    return false;
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_type');
    localStorage.removeItem('user_data');
    
    setIsAuthenticated(false);
    setUserType(null);
    setUser(null);
  };

  // Check if user is already authenticated
  const checkAuth = () => {
    const token = localStorage.getItem('auth_token');
    const storedUserType = localStorage.getItem('user_type');
    const storedUserData = localStorage.getItem('user_data');
    
    if (token && storedUserType && storedUserData) {
      setIsAuthenticated(true);
      setUserType(storedUserType);
      setUser(JSON.parse(storedUserData));
    }
  };

  // Check auth on component mount
  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, userType, user, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};