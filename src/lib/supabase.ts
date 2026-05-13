import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Public client for client-side operations (respects RLS)
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Service client for server-side operations (bypasses RLS by default, but we'll use it to set session context)
export const getServiceSupabase = () => createClient(supabaseUrl, supabaseServiceKey)

/**
 * Creates an authenticated Supabase client for Server Actions.
 * It uses the service role to 'set_config' for RLS context, 
 * then returns the client.
 */
export const getAuthenticatedSupabase = async (userId: string) => {
  const client = getServiceSupabase()
  
  // Set the session variable for RLS
  // Note: Using service role here is safe because we are explicitly setting the user context
  await client.rpc('set_session_user', { user_id: userId })
  
  return client
}
