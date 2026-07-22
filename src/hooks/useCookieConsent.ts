import { useEffect, useState } from 'react';
import { posthog } from '@/lib/posthog';

export type ConsentStatus = 'accepted' | 'rejected' | 'pending' | 'blocked';

declare global {
  interface Window {
    displayPreferenceModal?: () => void;
    Termly?: {
      getConsentState?: () => 'accepted' | 'rejected' | 'pending';
      acceptAll?: () => void;
      rejectAll?: () => void;
    };
  }
}

const CONSENT_KEY = 'wec_cookie_consent';
const CONSENT_VERSION = '1';

interface ConsentRecord {
  status: 'accepted' | 'rejected';
  version: string;
  timestamp: number;
}


function injectClarity() {
  if (typeof window === 'undefined') return;
  if (document.getElementById('clarity-script')) return;

  const script = document.createElement('script');
  script.id = 'clarity-script';
  script.type = 'text/javascript';
  script.innerHTML = `
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i+"?ref=bwt";
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "x0sidpdwxq");
  `;
  document.head.appendChild(script);
}

export function useCookieConsent() {
  const [consent, setConsent] = useState<ConsentStatus>('pending');

  function persistConsent(status: 'accepted' | 'rejected') {
    try {
      const record: ConsentRecord = {
        status,
        version: CONSENT_VERSION,
        timestamp: Date.now(),
      };
      localStorage.setItem(CONSENT_KEY, JSON.stringify(record));
    } catch {
      // empty
    }
  }

  useEffect(() => {
    // 1. Check localStorage first
    try {
      const stored = localStorage.getItem(CONSENT_KEY);
      if (stored) {
        // If it's a simple boolean from old version, clear it
        if (stored === 'true' || stored === 'false') {
          localStorage.removeItem(CONSENT_KEY);
        } else {
          const record: ConsentRecord = JSON.parse(stored);
          if (record.version === CONSENT_VERSION) {
            setConsent(record.status);
            return;
          }
        }
      }
    } catch {
      // localStorage unavailable
          }

    // 2. Check if Termly loaded successfully
    const termlyLoaded = typeof window !== 'undefined' &&
      typeof window.displayPreferenceModal === 'function';

    if (!termlyLoaded) {
      setConsent('blocked');
      persistConsent('rejected');
      return;
    }

    // 3. Termly loaded
    const termlyConsent = window.Termly?.getConsentState?.();
    if (termlyConsent === 'accepted') {
      setConsent('accepted');
      persistConsent('accepted');
      posthog.opt_in_capturing();
      injectClarity();
    } else if (termlyConsent === 'rejected') {
      setConsent('rejected');
      persistConsent('rejected');
      posthog.opt_out_capturing();
    }
  }, []);

  function acceptAll() {
    persistConsent('accepted');
    setConsent('accepted');
    posthog.opt_in_capturing();
    injectClarity();
    try { window.Termly?.acceptAll?.(); } catch {
      // empty
    }
  }

  function rejectAll() {
    persistConsent('rejected');
    setConsent('rejected');
    posthog.opt_out_capturing();
    try { window.Termly?.rejectAll?.(); } catch {
      // empty
    }
  }

  return { consent, acceptAll, rejectAll };
}
