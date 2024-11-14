// context/AuthContext.tsx
import React, { createContext, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login, register } from '@/services/authService';
interface AuthContextData {
  token: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (email: string, password: string, username: string) => Promise<void>;
}
export const AuthContext = createContext<AuthContextData>({} as AuthContextData);
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const signIn = async (email: string, password: string) => {
    const { token } = await login(email, password);
    setToken(token);
    await AsyncStorage.setItem('token', token);  // Salva o token localmente
  };
  const signUp = async (email: string, password: string, username: string) => {
    const { token } = await register(email, password, username);
    setToken(token);
    await AsyncStorage.setItem('token', token);  // Salva o token localmente
  };
  const signOut = async () => {
    setToken(null);
    await AsyncStorage.removeItem('token');  // Remove o token ao sair
  };
  return (
    <AuthContext.Provider value={{ token, signIn, signOut, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};
