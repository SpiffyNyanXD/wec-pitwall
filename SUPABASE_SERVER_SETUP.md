# Supabase Server Setup Guide

This guide helps you set up Supabase server-side authentication and database operations for the wec-pitwall project.

## Installation

The `@supabase/server` package is already added to `package.json`. Install dependencies:

```bash
npm install
# or
bun install
```

## Environment Variables

Server-side Supabase credentials are configured in `.env.example`. Make sure to update your `.env` (local) file:

```env
# Server-side configuration
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SECRET_KEY=your_secret_key
SUPABASE_PUBLISHABLE_KEY=your_publishable_key
SUPABASE_JWKS_URL=https://your-project.supabase.co/auth/v1/.well-known/jwks.json
```

⚠️ **Security Warning**: Never commit `.env` files. Keep `SUPABASE_SECRET_KEY` private.

## Usage

### For Client-Side Operations (Browser)

Use the existing client from `src/lib/supabase.ts`:

```typescript
import { supabase } from '@/lib/supabase';

// Sign up
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password123',
});

// Sign in
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password123',
});
```

### For Server-Side Operations (Edge Functions, API Routes)

Use the server utilities from `src/lib/supabase-server.ts`:

```typescript
import { createSupabaseServer, createSupabaseServerWithAuth } from '@/lib/supabase-server';

// Admin operations (no user context required)
const supabase = createSupabaseServer();

const { data, error } = await supabase
  .from('users')
  .select('*')
  .eq('id', userId);

// User-authenticated operations (requires JWT token)
const { data, error } = await createSupabaseServerWithAuth(userToken)
  .from('profiles')
  .select('*');
```

## Deployment to Vercel

The environment variables are automatically available in Vercel deployments if configured in:
1. **Project Settings** → **Environment Variables**
2. Or via the Vercel CLI: `vercel env add SUPABASE_SECRET_KEY`

## Project Structure

- `src/lib/supabase.ts` - Client-side Supabase configuration
- `src/lib/supabase-server.ts` - Server-side Supabase utilities
- `.env.example` - Environment variable template
- `supabase/` - Supabase migrations and configuration

## Next Steps

1. Update `.env` with your actual Supabase credentials
2. Create Edge Functions in `supabase/functions/` for server-side logic
3. Or create API routes for your backend operations
4. Use the client/server utilities in your components and handlers

## Resources

- [Supabase Server Documentation](https://supabase.com/docs/guides/functions/quickstart)
- [@supabase/server NPM](https://www.npmjs.com/package/@supabase/server)
- [Vercel Deployment Guide](https://vercel.com/docs)
