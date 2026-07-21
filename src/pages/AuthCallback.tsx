import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'react-toastify';
import { Loader2 } from 'lucide-react';

const AuthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleCallback = async () => {
      const urlParams = new URLSearchParams(location.search);
      let code = urlParams.get('code');
      const next = urlParams.get('next') || '/';
      
      // Fallback to hash if not in query string (Supabase uses hash by default)
      if (!code && location.hash) {
        const hashParams = new URLSearchParams(location.hash.replace('#', '?'));
        code = hashParams.get('code');
      }

      if (code) {
        console.debug('[Auth Callback] Exchanging code for session...');
        if (!supabase) {
          toast.error("Supabase client is not initialized.");
          navigate('/auth', { replace: true });
          return;
        }
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (error) {
          console.error('[Auth Callback] Error exchanging code:', error);
          toast.error(error.message || 'Failed to verify email.');
          navigate('/auth', { replace: true });
        } else {
          toast.success('Email verified! You are now signed in.');
          navigate(next, { replace: true });
        }
      } else {
        console.debug('[Auth Callback] No code found, redirecting to home.');
        navigate(next, { replace: true });
      }
    };

    handleCallback();
  }, [navigate, location]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Loader2 className="w-8 h-8 animate-spin text-primary" />
    </div>
  );
};

export default AuthCallback;
