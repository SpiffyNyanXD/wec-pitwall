import { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

const CookieConsent = () => {
  // Use lazy initialization to check localStorage synchronously
  const [isVisible, setIsVisible] = useState(() => {
    return !localStorage.getItem('wec_cookie_consent');
  });
  const [hasConsented, setHasConsented] = useState(() => {
    return !!localStorage.getItem('wec_cookie_consent');
  });

  const handleAccept = () => {
    localStorage.setItem('wec_cookie_consent', 'true');
    setIsVisible(false);
    setHasConsented(true);
  };

  const handleReject = () => {
    localStorage.setItem('wec_cookie_consent', 'false');
    setIsVisible(false);
  };

  if (!isVisible || hasConsented) return null;

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-card border-t border-border"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        <div className="flex-1">
          <p className="text-sm text-foreground">
            We use cookies to improve your experience. By using our site, you consent to our use of cookies.
          </p>
          <a href="/privacy" className="text-xs text-primary hover:underline mt-1 inline-block">
            Learn more
          </a>
        </div>
        <div className="flex gap-3 flex-shrink-0">
          <button
            onClick={handleReject}
            className="px-4 py-2 text-sm rounded-lg bg-muted hover:bg-muted/80 text-foreground transition-colors"
          >
            Reject
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-2 text-sm rounded-lg racing-gradient text-white font-medium transition-opacity hover:opacity-90"
          >
            Accept
          </button>
        </div>
        <button
          onClick={handleReject}
          className="p-1.5 rounded-lg hover:bg-muted transition-colors"
        >
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>
    </motion.div>
  );
};

export default CookieConsent;
