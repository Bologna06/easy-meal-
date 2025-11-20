import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper para verificar autenticação
export async function getUser() {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

// Helper para verificar se usuário tem assinatura ativa
export async function hasActiveSubscription(userId: string): Promise<boolean> {
  const { data, error } = await supabase
    .from('users')
    .select('subscription_status, subscription_expiry')
    .eq('id', userId)
    .single();

  if (error || !data) return false;

  if (data.subscription_status === 'free') return false;

  if (data.subscription_expiry) {
    const expiry = new Date(data.subscription_expiry);
    return expiry > new Date();
  }

  return false;
}
