import { useEffect, useState, type ReactNode } from 'react';

import type { Session, User } from '@supabase/supabase-js';

import { AuthContext } from './AuthContext';

import { supabase } from '@/lib/supabase';
import { signOut as signOutService, singInWithGoogle } from '../services/auth.service';

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  const [session, setSession] = useState<Session | null>(null);

  const [loading, setLoading] = useState(true);

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

  const handleGoogleAuth = async () => {
    try {
      await singInWithGoogle();
    } catch (error) {
      console.log('Sign in with google error ', error);
    }
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
