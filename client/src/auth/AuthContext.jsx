import { createContext, useContext, useEffect, useState } from 'react';
import api from '../api/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await api.get('/auth/me');
                setUser(res.data);
            } catch (err) {
                setUser(null);
            }
            finally {
                setLoading(false);
            }
        }
        checkAuth();
    }, []);

    const login = async (credentials) => {
        await api.post('/auth/login', credentials);
        const res = await api.get('/auth/me');
        setUser(res.data);
    };

    const logout = async () => {
        await api.post('/auth/logout'); // you should implement this backend
        setUser(null);
    };

    const value = {
        user,
        isAuthenticated: !!user,
        loading,
        login,
        logout,
    };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
    return useContext(AuthContext);
}
