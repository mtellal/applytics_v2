import { supabase } from '@/lib/supabase';
import type { UserCredentials } from '../types/auth.types';

export async function signUp({ email, password }: UserCredentials): Promise<any> {
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) throw error;

  return data;
}

export async function signIn({ email, password }: UserCredentials): Promise<any> {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) throw error;

  return data;
}

export async function singInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/dashboard`,
    },
  });

  if (error) throw error;

  return data;
}

export async function forgetPassword(email: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });

  if (error) {
    throw error;
  }
}

export async function resetPassword(password: string): Promise<void> {
  const { error } = await supabase.auth.updateUser({
    password,
  });

  if (error) {
    throw error;
  }
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function deleteAccount(): Promise<void> {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.access_token) {
    throw new Error('No authenticated session');
  }

  const { data, error } = await supabase.functions.invoke('delete-account', {
    method: 'POST',
  });

  if (error) {
    throw error;
  }

  if (!data?.success) {
    throw new Error(data?.error ?? 'Unable to delete account');
  }

  await supabase.auth.signOut();
}
