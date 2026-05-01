import SEOHead from "@/components/SEOHead";
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { z } from 'zod';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { supabase } from '@/integrations/supabase/client';
import { Flag, Mail, Lock, User, Loader2 } from 'lucide-react';

const emailSchema = z.string().email('Please enter a valid email address');
const passwordSchema = z.string().min(6, 'Password must be at least 6 characters');

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [username, setUsername] = useState('');
  const [usernameStatus, setUsernameStatus] = useState<'idle' | 'checking' | 'available' | 'taken' | 'invalid'>('idle');
  const usernameCheckTimer = useRef<NodeJS.Timeout | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signIn, signUp, session, user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleUsernameChange = (value: string) => {
    const cleaned = value.toLowerCase().replace(/[^a-z0-9_]/g, '');
    setUsername(cleaned);

    if (cleaned.length < 3) {
      setUsernameStatus('idle');
      return;
    }

    // Format check
    if (!/^[a-z0-9_]+$/.test(cleaned)) {
      setUsernameStatus('invalid');
      return;
    }

    // Debounced availability check
    setUsernameStatus('checking');
    if (usernameCheckTimer.current) clearTimeout(usernameCheckTimer.current);
    usernameCheckTimer.current = setTimeout(async () => {
      const { data, error } = await supabase.rpc('is_username_available', { uname: cleaned });
      if (!error) {
        setUsernameStatus(data ? 'available' : 'taken');
      }
    }, 500);
  };

  useEffect(() => {
    if (!loading && user) {
      navigate('/');
    }
  }, [user, loading, navigate]);

  const validateForm = () => {
    const emailResult = emailSchema.safeParse(email);
    if (!emailResult.success) {
      toast.error(emailResult.error.errors[0].message);
      return false;
    }

    const passwordResult = passwordSchema.safeParse(password);
    if (!passwordResult.success) {
      toast.error(passwordResult.error.errors[0].message);
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    if (!isLogin) {
      if (!username || username.length < 3) {
        toast.error('Username must be at least 3 characters');
        return;
      }
      if (usernameStatus === 'taken') {
        toast.error('That username is already taken');
        return;
      }
      if (usernameStatus === 'invalid') {
        toast.error('Username can only contain letters, numbers, and underscores');
        return;
      }
      if (usernameStatus === 'checking') {
        toast.error('Please wait while we check username availability');
        return;
      }
    }

    setIsSubmitting(true);

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          if (error.message.includes('Invalid login credentials')) {
            toast.error('Invalid email or password');
          } else {
            toast.error(error.message);
          }
        } else {
          toast.success('Welcome back!');
          const from = (location.state as { from?: string })?.from || '/';
          navigate(from, { replace: true });
        }
      } else {
        const { error } = await signUp(email, password, displayName);
        if (error) {
          if (error.message.includes('already registered')) {
            toast.error('This email is already registered. Try logging in instead.');
          } else {
            toast.error(error.message);
          }
        } else {
          // Save username to profile
          if (username) {
            await supabase
              .from('profiles')
              .update({ username, display_name: displayName || null })
              .eq('user_id', session?.user?.id || '');
            // Note: profile row is auto-created by trigger, we just update it
          }
          toast.success('Account created! Please check your email to verify.');
          const from = (location.state as { from?: string })?.from || '/';
          navigate(from, { replace: true });
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <SEOHead
        title="Sign In"
        description="Sign in to WEC Pitwall to save favourites and get race alerts."
        url="/auth"
        noIndex={true}
      />
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-lg racing-gradient flex items-center justify-center">
              <Flag className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="absolute -inset-1 rounded-lg racing-gradient opacity-30 blur-md -z-10" />
          </div>
          <span className="text-2xl font-racing font-bold text-gradient">WEC Pitwall</span>
        </div>

        {/* Subtitle */}
        <p className="text-center text-sm text-muted-foreground mb-6 -mt-4">
          Your fan-made companion for the FIA World Endurance Championship.
          Track races, standings, drivers and teams — all in one place.
        </p>

        {/* Feature highlights */}
        <div className="mb-6 grid grid-cols-3 gap-3 text-center">
          <div className="glass-card p-3 rounded-xl">
            <p className="text-xl mb-1">🏁</p>
            <p className="text-xs font-medium text-foreground">Race Results</p>
            <p className="text-xs text-muted-foreground">Full WEC coverage</p>
          </div>
          <div className="glass-card p-3 rounded-xl">
            <p className="text-xl mb-1">🏆</p>
            <p className="text-xs font-medium text-foreground">Standings</p>
            <p className="text-xs text-muted-foreground">Live championship</p>
          </div>
          <div className="glass-card p-3 rounded-xl">
            <p className="text-xl mb-1">⭐</p>
            <p className="text-xs font-medium text-foreground">Favourites</p>
            <p className="text-xs text-muted-foreground">Track your teams</p>
          </div>
        </div>

        {/* Auth Card */}
        <div className="glass-card p-8">
          <h2 className="text-xl font-racing text-center mb-6">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="displayName" className="text-muted-foreground">
                  Display Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="displayName"
                    type="text"
                    placeholder="Your racing alias"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="pl-10 bg-muted/50 border-border focus:border-primary"
                  />
                </div>
              </div>
            )}

            {/* Username field — signup only */}
            {!isLogin && (
              <div className="space-y-1.5">
                <Label htmlFor="username" className="text-muted-foreground">
                  Username
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">@</span>
                  <Input
                    id="username"
                    type="text"
                    placeholder="yourname"
                    value={username}
                    onChange={(e) => handleUsernameChange(e.target.value)}
                    className="pl-7 bg-muted/30 border-border"
                    maxLength={20}
                    autoCapitalize="none"
                    autoCorrect="off"
                  />
                </div>
                {/* Availability indicator */}
                {username.length >= 3 && (
                  <p className={`text-xs mt-1 ${
                    usernameStatus === 'available' ? 'text-green-500' :
                    usernameStatus === 'taken' ? 'text-destructive' :
                    usernameStatus === 'invalid' ? 'text-destructive' :
                    'text-muted-foreground'
                  }`}>
                    {usernameStatus === 'available' && `✓ @${username} is available`}
                    {usernameStatus === 'taken' && `✗ @${username} is already taken`}
                    {usernameStatus === 'invalid' && '✗ Only letters, numbers, and underscores allowed'}
                    {usernameStatus === 'checking' && 'Checking...'}
                  </p>
                )}
                <p className="text-xs text-muted-foreground">3–20 characters. Letters, numbers, underscores only.</p>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-muted-foreground">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="racer@wechub.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-10 bg-muted/50 border-border focus:border-primary"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-muted-foreground">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-10 bg-muted/50 border-border focus:border-primary"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full racing-gradient text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : null}
              {isLogin ? 'Sign In' : 'Create Account'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {isLogin ? "Don't have an account? " : 'Already have an account? '}
              <span className="text-primary font-medium">
                {isLogin ? 'Sign Up' : 'Sign In'}
              </span>
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </motion.div>
    </div>
  );
};

export default Auth;
