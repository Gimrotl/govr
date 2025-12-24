import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  userEmail: string | null;
  isAdmin: boolean;
  login: (email: string, password: string) => void;
  register: (email: string, password: string) => void;
  googleLogin: () => void;
  adminLogin: () => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  userEmail: null,
  isAdmin: false,
  login: () => {},
  register: () => {},
  googleLogin: () => {},
  adminLogin: () => {},
  logout: () => {}
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const savedEmail = localStorage.getItem('userEmail');
    const savedIsAdmin = localStorage.getItem('isAdmin');
    const savedIsLoggedIn = localStorage.getItem('isLoggedIn');

    if (savedIsLoggedIn === 'true' && savedEmail) {
      setIsLoggedIn(true);
      setUserEmail(savedEmail);
      if (savedIsAdmin === 'true') {
        setIsAdmin(true);
      }
    }
  }, []);

  const login = (email: string, password: string) => {
    // In a real app, this would validate with an API
    if (!email || !password) {
      alert('Please enter both email and password');
      return;
    }

    // Simple validation for demo
    if (!email.includes('@')) {
      alert('Bitte geben Sie eine gültige E-Mail-Adresse ein.');
      return;
    }

    if (password.length < 3) {
      alert('Das Passwort muss mindestens 3 Zeichen lang sein.');
      return;
    }

    setIsLoggedIn(true);
    setUserEmail(email);
    localStorage.setItem('userEmail', email);
    localStorage.setItem('isLoggedIn', 'true');
    alert('Erfolgreich angemeldet!');
    // Login successful - modal will be closed by the component
  };

  const register = (email: string, password: string) => {
    // In a real app, this would register with an API
    if (!email || !password) {
      alert('Please enter both email and password');
      return;
    }

    // Simple validation for demo
    if (!email.includes('@')) {
      alert('Bitte geben Sie eine gültige E-Mail-Adresse ein.');
      return;
    }

    if (password.length < 6) {
      alert('Das Passwort muss mindestens 6 Zeichen lang sein.');
      return;
    }

    setIsLoggedIn(true);
    setUserEmail(email);
    localStorage.setItem('userEmail', email);
    localStorage.setItem('isLoggedIn', 'true');
    alert('Erfolgreich registriert und angemeldet!');
    // Registration successful - modal will be closed by the component
  };

  const googleLogin = () => {
    // In a real app, this would integrate with Google OAuth
    setIsLoggedIn(true);
    setUserEmail('google@example.com');
    localStorage.setItem('userEmail', 'google@example.com');
    localStorage.setItem('isLoggedIn', 'true');
    alert('Erfolgreich mit Google angemeldet!');
    // Google login successful - modal will be closed by the component
  };

  const adminLogin = () => {
    setIsAdmin(true);
    localStorage.setItem('isAdmin', 'true');
    alert('Erfolgreich als Administrator angemeldet!');
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserEmail(null);
    setIsAdmin(false);
    localStorage.removeItem('userEmail');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('isAdmin');
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        userEmail,
        isAdmin,
        login,
        register,
        googleLogin,
        adminLogin,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};