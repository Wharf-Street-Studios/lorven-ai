import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  fullName: string;
  email: string;
  username: string;
  avatar?: string;
  authProvider?: 'email' | 'google' | 'apple' | 'facebook';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
  signInWithFacebook: () => Promise<void>;
  signUp: (fullName: string, email: string, username: string, password: string, avatar?: string) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'epiko_auth_user';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    // Initialize from localStorage
    try {
      const storedUser = localStorage.getItem(AUTH_STORAGE_KEY);
      return storedUser ? JSON.parse(storedUser) : null;
    } catch {
      return null;
    }
  });

  // Persist user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, [user]);

  const signIn = async (email: string, password: string) => {
    // Mock authentication - in real app, this would call an API
    const mockUser: User = {
      id: '1',
      fullName: 'John Doe',
      email: email,
      username: 'johndoe',
      avatar: undefined,
      authProvider: 'email',
    };
    setUser(mockUser);
  };

  const signInWithGoogle = async () => {
    // Mock Google OAuth - in real app, this would use Google OAuth 2.0
    // Example: window.location.href = 'https://accounts.google.com/o/oauth2/v2/auth?...'
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call

    const mockGoogleUser: User = {
      id: 'google_' + Date.now(),
      fullName: 'Google User',
      email: 'user@gmail.com',
      username: 'googleuser',
      avatar: 'https://lh3.googleusercontent.com/a/default-user',
      authProvider: 'google',
    };
    setUser(mockGoogleUser);
  };

  const signInWithApple = async () => {
    // Mock Apple OAuth - in real app, this would use Sign in with Apple
    // Example: AppleID.auth.signIn()
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call

    const mockAppleUser: User = {
      id: 'apple_' + Date.now(),
      fullName: 'Apple User',
      email: 'user@icloud.com',
      username: 'appleuser',
      avatar: undefined,
      authProvider: 'apple',
    };
    setUser(mockAppleUser);
  };

  const signInWithFacebook = async () => {
    // Mock Facebook OAuth - in real app, this would use Facebook Login
    // Example: FB.login()
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call

    const mockFacebookUser: User = {
      id: 'facebook_' + Date.now(),
      fullName: 'Facebook User',
      email: 'user@facebook.com',
      username: 'fbuser',
      avatar: undefined,
      authProvider: 'facebook',
    };
    setUser(mockFacebookUser);
  };

  const signUp = async (
    fullName: string,
    email: string,
    username: string,
    password: string,
    avatar?: string
  ) => {
    // Mock signup - in real app, this would call an API
    const newUser: User = {
      id: Date.now().toString(),
      fullName,
      email,
      username,
      avatar,
      authProvider: 'email',
    };
    setUser(newUser);
  };

  const signOut = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        signIn,
        signInWithGoogle,
        signInWithApple,
        signInWithFacebook,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
