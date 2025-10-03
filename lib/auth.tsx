"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { authApi } from '@/lib/api';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'WARGA' | 'VISITOR';
  noTelp?: string;
  alamat?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  register: (userData: {
    name: string;
    email: string;
    password: string;
    role?: string;
    noTelp?: string;
    alamat?: string;
  }) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const setAuthToken = (token: string) => {
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    document.cookie = `auth-token=${token}; path=/; expires=${expires.toUTCString()}; samesite=lax`;
  };

  const removeAuthToken = () => {
    document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT; samesite=lax';
  };

  const getAuthToken = () => {
    if (typeof document !== 'undefined') {
      const cookies = document.cookie.split(';');
      const authCookie = cookies.find(cookie => cookie.trim().startsWith('auth-token='));
      return authCookie ? authCookie.split('=')[1].trim() : null;
    }
    return null;
  };

  useEffect(() => {
    const checkAuth = async () => {
      const token = getAuthToken();
      console.log('Checking auth, token exists:', !!token);
      
      if (token) {
        try {
          const response = await authApi.getProfile();
          console.log('Profile response:', response);
          
          if (response.success && response.data) {
            setUser(response.data as User);
          } else {
            console.log('Profile fetch failed, removing token');
            removeAuthToken();
          }
        } catch (error) {
          console.error('Auth check failed:', error);
          removeAuthToken();
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      console.log('Attempting login with:', { email });
      
      const response = await authApi.login({ email, password });
      console.log('Login response:', response);
      
      if (response.success && response.data) {
        const { token, user: userData } = response.data as { token: string; user: User };
        console.log('Login successful, setting token and user:', userData);
        setAuthToken(token);
        setUser(userData);
        return { success: true };
      } else {
        console.error('Login failed:', response.message);
        return { success: false, message: response.message || 'Login failed' };
      }
    } catch (error: any) {
      console.error('Login error:', error);
      return { 
        success: false, 
        message: error.response?.message || error.message || 'Login failed' 
      };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: {
    name: string;
    email: string;
    password: string;
    role?: string;
    noTelp?: string;
    alamat?: string;
  }) => {
    try {
      setLoading(true);
      console.log('Attempting registration with:', { ...userData, password: '***' });
      
      const response = await authApi.register(userData);
      console.log('Registration response:', response);
      
      if (response.success) {
        return { success: true, message: 'Registration successful' };
      } else {
        return { success: false, message: response.message || 'Registration failed' };
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      return { 
        success: false, 
        message: error.response?.message || error.message || 'Registration failed' 
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    console.log('Logging out, removing token');
    removeAuthToken();
    setUser(null);
    window.location.href = '/login';
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};