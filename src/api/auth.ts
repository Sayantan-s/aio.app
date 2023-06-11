import { client } from '@services/supabase';
import type { SignInWithPasswordCredentials } from '@supabase/supabase-js';

export async function createUserAccount(credentials: SignInWithPasswordCredentials) {
  return await client.auth.signUp(credentials);
}
