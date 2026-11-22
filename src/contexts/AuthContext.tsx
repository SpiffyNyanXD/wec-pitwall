import { AUTH_ENABLED } from '@/lib/featureFlags';
import { useEffect, useState, useRef, ReactNode } from 'react';
import { AuthContext, AuthContextType, Profile } from './auth-context';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';


export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [profileLoading, setProfileLoading] = useState(false);

  const profileRequest = useRef(0);
  const fetchProfile = async (userId: string) => {
    if (!AUTH_ENABLED || !supabase) return;
    const request = ++profileRequest.current;
    setProfileLoading(true);
    const { data, error } = await supabase
      .from('profiles')
      .select('id, user_id, username, display_name, avatar_url, marketing_emails')
      .eq('user_id', userId)
      .single();
    if (request !== profileRequest.current) return;
    setProfile(error ? null : data ?? null);
    setProfileLoading(false);
  };

  const refreshProfile = async () => {
    if (user) await fetchProfile(user.id);
  };

  useEffect(() => {
    if (user) {
      fetchProfile(user.id);
    } else {
      profileRequest.current++;
      setProfile(null);
      setProfileLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (!AUTH_ENABLED || !supabase) {
      console.warn("Supabase client is not initialized.");
      setLoading(false);
      return;
    }

    let disposed = false;
    let authEventSeen = false;
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (disposed) return;
        authEventSeen = true;
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (disposed || authEventSeen) return;
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const profileRequestRef = profileRequest;
    return () => { disposed = true; profileRequestRef.current++; subscription.unsubscribe(); };
  }, []);

  const signUp = async (email: string, password: string, displayName?: string) => {
    if (!AUTH_ENABLED || !supabase) return { error: new Error("Supabase is not initialized") };

    const redirectUrl = `${window.location.origin}/`;
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          display_name: displayName,
        },
      },
    });
    
    return { error: error as Error | null };
  };

  const signIn = async (email: string, password: string) => {
    if (!AUTH_ENABLED || !supabase) return { error: new Error("Supabase is not initialized") };

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    return { error: error as Error | null };
  };

  const signOut = async () => {
    if (!AUTH_ENABLED || !supabase) return;
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, profile, profileLoading, signUp, signIn, signOut, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

