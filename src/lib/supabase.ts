// Required Vercel env vars: VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY
// Verify in: Vercel Dashboard → Project → Settings → Environment Variables

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('[Supabase] Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY. Auth will not work.');
}

export {}; // Ensure it's treated as a module
