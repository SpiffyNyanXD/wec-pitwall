import { Link } from 'react-router-dom';

import { APP_INFO } from '@/lib/constants';
import { useCookieConsent } from '@/hooks/useCookieConsent';

const Footer = () => {
  const { consent } = useCookieConsent();


  return (
    <footer className="border-t border-border/50 mt-8">
      <div className="container py-6 px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} {APP_INFO.NAME}. {APP_INFO.DISCLAIMER}</p>

          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm">
            <Link to="/privacy" className="hover:text-foreground transition-colors tap-highlight whitespace-nowrap">Privacy Policy</Link>
            <Link to="/cookie-policy" className="hover:text-foreground transition-colors tap-highlight whitespace-nowrap">Cookie Policy</Link>
            <Link to="/terms" className="hover:text-foreground transition-colors tap-highlight whitespace-nowrap">Terms of Use</Link>
            <Link to="/data-request" className="hover:text-foreground transition-colors tap-highlight whitespace-nowrap">Data Request</Link>
            <button
              type="button"
              className="termly-display-preferences text-muted-foreground hover:text-foreground transition-colors tap-highlight bg-transparent border-none p-0 cursor-pointer whitespace-nowrap"
              onClick={() => {
                if (typeof window !== 'undefined' &&
                    typeof window.displayPreferenceModal === 'function') {
                  window.displayPreferenceModal();
                } else {
                  alert('Cookie preferences: Analytics are not loaded in your browser. No tracking is active.');
                }
              }}
            >
              Consent Preferences
              {consent === 'blocked' && <span className="ml-1 text-xs opacity-50">(blocked)</span>}
            </button>
          </div>
        </div>
        <p className="text-xs text-muted-foreground/70 text-center mt-4">{APP_INFO.DATA_NOTE}</p>
      </div>
    </footer>
  );
};

export default Footer;
