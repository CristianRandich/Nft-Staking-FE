'use client';
import React, { createContext, useContext, useState } from 'react';
import { useRouter } from 'next/navigation';

// ✅ Tipo para el contexto
interface AuthContextType {
  authenticated: boolean;
  login: (username: string, password: string) => void;
  logout: () => void;
}

// ✅ Contexto inicial con tipo
const AuthContext = createContext<AuthContextType | null>(null);

// ✅ Provider que envuelve la app
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();

  const login = (username: string, password: string) => {
    if (username === 'admin' && password === 'admin2025') {
      setAuthenticated(true);
      router.push('/admin');
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  };

  const logout = () => {
    setAuthenticated(false);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ authenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Hook para acceder al contexto con validación
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};