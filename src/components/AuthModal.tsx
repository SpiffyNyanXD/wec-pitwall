import { AUTH_ENABLED } from '@/lib/featureFlags';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import WecLogo from './WecLogo';

interface Props {
  featureName?: string;
  onClose?: () => void;
}

export function AuthModal({ featureName, onClose }: Props) {

  const navigate = useNavigate();

  if (!AUTH_ENABLED) return null;

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
      {(!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY) && (
        <div className="fixed top-0 left-0 right-0 z-[100] bg-red-600 text-white text-center text-xs py-1">
          ⚠️ Supabase env vars missing. Auth will not work.
        </div>
      )}
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

          <p className="text-zinc-400 mb-8 font-body">
            Access Driver Comparison, Championship Battle, historical data and more.
          </p>

          <div className="w-full space-y-3">
            <button
              onClick={() => navigate('/auth')}
              className="w-full bg-[#E8002D] text-white py-3 px-4 rounded-lg font-semibold hover:bg-[#d00028] transition-colors font-body"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate('/auth')}
              className="w-full bg-transparent border border-white text-white py-3 px-4 rounded-lg font-semibold hover:bg-white/10 transition-colors font-body"
            >
              Create Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
