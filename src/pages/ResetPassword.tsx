import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import SEOHead from '@/components/SEOHead';
import Layout from '@/components/Layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

/**
 * Renders the password recovery form for updating the current Supabase user's password.
 * Validates confirmation and minimum length, then redirects home after success.
 * @returns The password reset page with validation and submission feedback.
 */
export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Supabase sends the user back with a session in the URL hash.
  // The Supabase client picks this up automatically on mount.
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        // User is authenticated via the reset link — they can now set a new password.
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleReset = async () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    setIsLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setIsLoading(false);
    if (error) {
      setError(error.message);
    } else {
      setSuccess('Password updated successfully. Redirecting...');
      setTimeout(() => navigate('/'), 2000);
    }
  };

  return (
    <>
      <SEOHead
        title="Reset Password — WEC Pitwall"
        description="Set a new password for your WEC Pitwall account."
        noIndex={true}
      />
      <Layout>
        <div className="glass-card p-8 w-full max-w-md space-y-6">
          <h1 className="text-2xl font-bold text-foreground">Set New Password</h1>

          {error && <p className="text-sm text-destructive">{error}</p>}
          {success && <p className="text-sm text-primary">{success}</p>}

          <div className="space-y-4">
            <Input
              type="password"
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button
              onClick={handleReset}
              disabled={isLoading}
              className="w-full racing-gradient text-white"
            >
              {isLoading ? 'Updating...' : 'Update Password'}
            </Button>
          </div>
        </div>
      </Layout>
    </>
  );
}
