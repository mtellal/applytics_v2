import { createContext } from 'react';
import type { Session, User } from '@supabase/supabase-js';

type AuthContextType = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signOut: () => Promise<void>;
  signInGoogle: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
