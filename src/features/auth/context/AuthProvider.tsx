import { useEffect, useState, type ReactNode } from 'react';

import type { Session, User } from '@supabase/supabase-js';

import { AuthContext } from './AuthContext';

import { supabase } from '@/lib/supabase';
import {
  forgetPassword,
  resetPassword,
  signIn,
  signOut as signOutService,
  signUp,
  singInWithGoogle,
} from '../services/auth.service';
import type { UserCredentials } from '../types/auth.types';
import { useNavigate } from 'react-router-dom';

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  const [session, setSession] = useState<Session | null>(null);

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    async function loadSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    }

    loadSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleSignin = async (payload: UserCredentials): Promise<void> => {
    try {
      await signIn(payload);
      navigate('/dashboard');
    } catch (error) {
      console.log('Error while signing an user (handleSignin): ', error);
      throw error;
    }
  };

  const handleSignup = async (payload: UserCredentials): Promise<void> => {
    try {
      await signUp(payload);
      navigate('/dashboard');
    } catch (error) {
      console.log('Error while creating a new user (handleSignup): ', error);
      throw error;
    }
  };

  const handleGoogleAuth = async () => {
    try {
      await singInWithGoogle();
    } catch (error) {
      console.log('Sign in with google error ', error);
    }
  };

  const handleForgetPassword = async (email: string) => {
    try {
      await forgetPassword(email);
    } catch (error) {
      console.log('Error on ');
    }
  };

  const handleResetPassword = async (password: string) => {
    await resetPassword(password);
  };

  const handleSignOut = async () => {
    await signOutService();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        signOut: handleSignOut,
        signInGoogle: handleGoogleAuth,
        signIn: handleSignin,
        signUp: handleSignup,
        forgetPassword: handleForgetPassword,
        resetPassword: handleResetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
