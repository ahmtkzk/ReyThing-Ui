"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User } from "@/lib/types";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, username: string, displayName: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (updates: Partial<Pick<User, 'displayName' | 'bio' | 'avatar'>>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = "reything_auth";

// Demo users for testing
const demoUsers: (User & { password: string })[] = [
  {
    id: "user-1",
    username: "cinephile",
    email: "demo@example.com",
    password: "demo123",
    displayName: "Movie Lover",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=cinephile",
    bio: "Film enthusiast and avid reader. Love sci-fi and fantasy.",
    joinedDate: "2024-01-15"
  }
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const userData = JSON.parse(stored);
        setUser(userData);
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const foundUser = demoUsers.find(
      u => u.email === email && u.password === password
    );
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userWithoutPassword));
      return true;
    }
    
    // Check registered users in localStorage
    const registeredUsers = JSON.parse(localStorage.getItem("reything_users") || "[]");
    const registeredUser = registeredUsers.find(
      (u: User & { password: string }) => u.email === email && u.password === password
    );
    
    if (registeredUser) {
      const { password: _, ...userWithoutPassword } = registeredUser;
      setUser(userWithoutPassword);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userWithoutPassword));
      return true;
    }
    
    return false;
  };

  const signup = async (
    email: string,
    password: string,
    username: string,
    displayName: string
  ): Promise<boolean> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const registeredUsers = JSON.parse(localStorage.getItem("reything_users") || "[]");
    
    // Check if email or username already exists
    if (
      demoUsers.some(u => u.email === email || u.username === username) ||
      registeredUsers.some((u: User) => u.email === email || u.username === username)
    ) {
      return false;
    }
    
    const newUser = {
      id: `user-${Date.now()}`,
      username,
      email,
      password,
      displayName,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
      bio: "",
      joinedDate: new Date().toISOString().split("T")[0]
    };
    
    registeredUsers.push(newUser);
    localStorage.setItem("reything_users", JSON.stringify(registeredUsers));
    
    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userWithoutPassword));
    
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const updateUser = (updates: Partial<Pick<User, 'displayName' | 'bio' | 'avatar'>>) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUser));
    
    // Also update in registered users list if applicable
    const registeredUsers = JSON.parse(localStorage.getItem("reything_users") || "[]");
    const userIndex = registeredUsers.findIndex((u: User) => u.id === user.id);
    if (userIndex !== -1) {
      registeredUsers[userIndex] = { ...registeredUsers[userIndex], ...updates };
      localStorage.setItem("reything_users", JSON.stringify(registeredUsers));
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
