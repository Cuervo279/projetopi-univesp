import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import api from '../../../backend/src/services/api';

interface User {
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Verificar token válido com API <- Valber
    }
  }, []);

  const login = async (email: string, password: string) => {
    const response = await api.post<{ token: string }>('/auth/login', { email, password });
    localStorage.setItem('token', response.data.token);
    setUser({ email });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);