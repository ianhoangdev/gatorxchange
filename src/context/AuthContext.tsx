'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import type { User, Auth } from 'firebase/auth';
import { onAuthStateChanged, signInWithPopup, signOut, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '@/lib/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  errorMessage?: string | null;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  errorMessage: null,
  signInWithGoogle: async () => {},
  logout: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    // auth is only available in the browser; if it's not initialized yet, skip subscribing.
    if (!auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth as Auth, (user) => {
      setUser(user as User | null);
      // Clear any previous error when auth state changes
      setErrorMessage(null);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    if (!auth) {
      console.error('Firebase auth is not initialized in this environment');
      return;
    }

    try {
      const result = await signInWithPopup(auth as Auth, provider);
      const email = result.user?.email || '';
      const isUFL = /@ufl\.edu$/i.test(email);
      if (!isUFL) {
        // Reject sign-in for non-UFL domains
        await signOut(auth as Auth);
        setErrorMessage('Only ufl.edu email addresses are allowed.');
      } else {
        setErrorMessage(null);
      }
    } catch (error) {
      console.error('Error signing in with Google:', error);
      setErrorMessage('Sign-in failed. Please try again.');
    }
  };

  const logout = async () => {
    if (!auth) {
      console.error('Firebase auth is not initialized in this environment');
      return;
    }

    try {
      await signOut(auth as Auth);
      setErrorMessage(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, errorMessage, signInWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);