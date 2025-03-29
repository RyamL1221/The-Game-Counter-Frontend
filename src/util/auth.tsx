import jwt_decode, { jwtDecode } from 'jwt-decode';
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

interface AuthContextProps {
  token: string | null;
  email: string | null;
  setToken: (token: string | null) => void;
  setEmail: (email: string | null) => void;
  isAuthenticated: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  token: null,
  email: null,
  setToken: () => {},
  setEmail: () => {},
  isAuthenticated: false,
  logout: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setTokenState] = useState<string | null>(localStorage.getItem('jwt'));
  const [email, setEmailState] = useState<string | null>(null);

  useEffect(() => {
    if (token) {
      localStorage.setItem('jwt', token);
      // Decode the token to get the email
      try {
        const decoded = jwtDecode<{ email: string }>(token);
        setEmailState(decoded.email);
      } catch (error) {
        console.error('Failed to decode token', error);
      }
    } else {
      localStorage.removeItem('jwt');
      setEmailState(null);
    }
  }, [token]);

  const setToken = (newToken: string | null) => {
    setTokenState(newToken);
  };

  const setEmail = (newEmail: string | null) => {
    setEmailState(newEmail);
  };

  const logout = () => {
    setToken(null);
    setEmail(null);
  };

  return (
    <AuthContext.Provider value={{ token, email, setToken, setEmail, isAuthenticated: !!token, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
