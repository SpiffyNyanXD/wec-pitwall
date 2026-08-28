import { Home, AlertTriangle } from 'lucide-react';

interface ErrorFallbackProps {
  error?: Error | null;
  resetErrorBoundary?: () => void;
}

const ErrorFallback = ({ error, resetErrorBoundary }: ErrorFallbackProps) => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-red-900/10 rounded-full blur-[100px]" />
      </div>
      <div className="relative z-10 max-w-lg w-full text-center space-y-6">
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 bg-red-950/50 rounded-full flex items-center justify-center border border-red-500/20">
            <AlertTriangle className="w-12 h-12 text-red-500" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Pit Lane Closed</h1>
        <p className="text-zinc-400 text-lg">We hit a mechanical issue. Our engineers are looking at the telemetry.</p>
        <div className="pt-8">
          {resetErrorBoundary && (
            <button onClick={resetErrorBoundary} className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-semibold transition-colors mr-4">
              Try Again
            </button>
          )}
          <button onClick={() => window.location.href = '/'} className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#E8002D] hover:bg-[#c00025] text-white font-semibold transition-colors">
            <Home className="w-5 h-5" />
            Return to Paddock
          </button>
        </div>
        {import.meta.env.DEV && error && (
          <div className="mt-12 text-left bg-black/50 p-6 rounded-xl border border-white/10 overflow-auto max-h-64">
            <p className="text-red-400 font-mono text-sm mb-2 font-bold">Debug Info:</p>
            <pre className="text-xs text-zinc-500 font-mono whitespace-pre-wrap">
              {error.stack || error.message || String(error)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default ErrorFallback;
