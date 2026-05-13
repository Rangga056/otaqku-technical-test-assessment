import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'http://localhost:54321'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'dummy'
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'dummy'

const supabaseClient = createClient(supabaseUrl, supabaseAnonKey)

const getServiceSupabase = () => createClient(supabaseUrl, supabaseServiceKey)

const getAuthenticatedSupabase = async (userId: string) => {
  const client = getServiceSupabase()
  await client.rpc('set_session_user', { user_id: userId })
  return client
}

export { supabaseClient, getServiceSupabase, getAuthenticatedSupabase }
