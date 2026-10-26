import { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

const rawApiUrl = import.meta.env.VITE_API_URL || 'http://localhost:9090/api';
const API_URL = rawApiUrl.replace(/\/+$/, '');

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('user');
      return savedUser ? JSON.parse(savedUser) : null;
    }
    catch { return null; }
  });

  const [token, setToken] = useState(() => { return localStorage.getItem('token') || null; });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) { axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; }
    else { delete axios.defaults.headers.common['Authorization']; }
  }, [token]);

  const loginWithGoogle = useCallback(async (credential) => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/auth/google`, { credential }, { withCredentials: true });

      const data = response.data;
      if (data.status && data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setToken(data.token);
        setUser(data.user);
        return { success: true, user: data.user };
      }
      else { throw new Error(data.message || 'Login failed'); }
    }
    catch (err) {
      const message = err.response?.data?.message || err.message || 'Google login failed';
      throw new Error(message);
    }
    finally { setLoading(false); }
  }, []);

  const logout = useCallback(async () => {
    try {
      await axios.post(`${API_URL}/auth/logout`, {}, { withCredentials: true }).catch(() => { });
    }
    finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setToken(null);
      setUser(null);
      delete axios.defaults.headers.common['Authorization'];
    }
  }, []);

  const value = useMemo(
    () => ({ user, token, isAuthenticated: Boolean(user && token), loading, loginWithGoogle, logout, setUser, }),
    [user, token, loading, loginWithGoogle, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) { throw new Error('useAuth must be used within an AuthProvider'); }
  return context;
}

export default AuthProvider;
