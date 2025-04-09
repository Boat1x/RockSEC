import React, { createContext, useEffect, useState } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  userType: 'consultant' | 'client' | 'admin' | null;
  user: UserData | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

interface UserData {
  id: string;
  name: string;
  email: string;
  role: 'consultant' | 'client' | 'admin';
  avatar?: string;
}

// Create the context with default values
export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  userType: null,
  user: null,
  login: async () => false,
  logout: () => {},
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userType, setUserType] = useState<'consultant' | 'client' | 'admin' | null>(null);
  const [user, setUser] = useState<UserData | null>(null);

  // Check if user is logged in when the app loads
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    const storedUserType = localStorage.getItem('user_type');
    const userData = localStorage.getItem('user_data');
    
    if (token && storedUserType) {
      setIsAuthenticated(true);
      setUserType(storedUserType as 'consultant' | 'client' | 'admin');
      
      if (userData) {
        setUser(JSON.parse(userData));
      }
    }
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    // Demo login logic - in a real app, this would validate with a backend
    if (email === 'admin@rocky.edu' && password === 'password123') {
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
    } else if (email === 'student@manhattanville.edu' && password === 'password123') {
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
    } else if (email === 'client@example.com' && password === 'password123') {
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
  const logout = (): void => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_type');
    localStorage.removeItem('user_data');
    
    setIsAuthenticated(false);
    setUserType(null);
    setUser(null);
  };
  
  return (
    <AuthContext.Provider value={{ isAuthenticated, userType, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;