import { supabase } from '@/lib/supabase';

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

  const { data, error } = await supabase.functions.invoke(
    'delete-account',
    {
      method: 'POST',
    },
  );

  if (error) {
    throw error;
  }

  if (!data?.success) {
    throw new Error(data?.error ?? 'Unable to delete account');
  }

  await supabase.auth.signOut();
}

