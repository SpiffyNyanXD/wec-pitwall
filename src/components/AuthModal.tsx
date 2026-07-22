import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Mail, Lock } from 'lucide-react';
import WecLogo from './WecLogo';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';

interface Props {
  featureName?: string;
  onClose?: () => void;
}

export function AuthModal({ featureName, onClose }: Props) {
  const navigate = useNavigate();
  const { signIn, signUp } = useAuth();

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const { error: authError } = await signIn(email, password);
      console.log('[Auth] Login response:', { data: null, error: authError });

      if (authError) {
        if (authError.message.includes('Email not confirmed')) {
          setError('Please confirm your email first. Check your inbox for the verification link.');
        } else {
          setError(authError.message);
        }
        setIsSubmitting(false);
        return;
      }

      toast.success('Successfully logged in');
      handleClose();
    } catch (err: unknown) {
      const message = err instanceof Error && err.message
        ? err.message
        : 'Login failed. Please check your credentials and try again.';
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const { error: authError } = await signUp(email, password);
      console.log('[Auth] Signup response:', { data: null, error: authError });

      if (authError) {
        setError(authError.message);
        setIsSubmitting(false);
        return;
      }

      toast.success('Account created! Please check your email.');
      handleClose();
    } catch (err: unknown) {
      const message = err instanceof Error && err.message
        ? err.message
        : 'Login failed. Please check your credentials and try again.';
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
      <div className="max-w-md w-full mx-4 bg-[#0a0a0a] rounded-2xl p-8 border border-zinc-700 relative shadow-2xl">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="mb-6">
            <WecLogo className="w-16 h-16" />
          </div>

          <h2 className="text-2xl font-bold text-white mb-2 font-body">
            {featureName ? `Sign in to access ${featureName}` : 'Sign in to continue'}
          </h2>

          <p className="text-zinc-400 mb-6 font-body">
            Access Driver Comparison, Championship Battle, historical data and more.
          </p>

          {error && (
            <div className="w-full p-3 mb-4 text-sm text-white bg-red-500/80 rounded-md text-left font-body">
              {error}
            </div>
          )}

          <form onSubmit={isLogin ? handleLogin : handleSignup} className="w-full space-y-4">
            <div className="space-y-2 text-left">
              <label className="text-zinc-400 text-sm font-body">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg py-2 pl-10 pr-4 text-white focus:outline-none focus:border-[#E8002D] font-body"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div className="space-y-2 text-left mb-6">
              <label className="text-zinc-400 text-sm font-body">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg py-2 pl-10 pr-4 text-white focus:outline-none focus:border-[#E8002D] font-body"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#E8002D] text-white py-3 px-4 rounded-lg font-semibold hover:bg-[#d00028] transition-colors font-body disabled:opacity-50"
            >
              {isSubmitting ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
            </button>

            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
              }}
              className="w-full bg-transparent border border-zinc-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-white/5 transition-colors font-body mt-3"
            >
              {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
