import { createContext } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import type { UserCredentials } from '../types/auth.types';

type AuthContextType = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signOut: () => Promise<void>;
  signInGoogle: () => void;
  signIn: (userCredentials: UserCredentials) => Promise<void>;
  signUp: (userCredentials: UserCredentials) => Promise<void>;
  forgetPassword: (email: string) => Promise<void>;
  resetPassword: (password: string) => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
