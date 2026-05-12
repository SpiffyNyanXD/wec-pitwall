import { useEffect, useState } from 'react';

export type ConsentStatus = 'accepted' | 'rejected' | 'pending' | 'blocked';

const CONSENT_KEY = 'wec_cookie_consent';
const CONSENT_VERSION = '1';

interface ConsentRecord {
  status: 'accepted' | 'rejected';
  version: string;
  timestamp: number;
}

export function useCookieConsent() {
  const [consent, setConsent] = useState<ConsentStatus>('pending');

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
      typeof (window as any).displayPreferenceModal === 'function';

    if (!termlyLoaded) {
      setConsent('blocked');
      persistConsent('rejected');
      return;
    }

    // 3. Termly loaded
    const termlyConsent = (window as any).Termly?.getConsentState?.();
    if (termlyConsent === 'accepted') {
      setConsent('accepted');
      persistConsent('accepted');
    } else if (termlyConsent === 'rejected') {
      setConsent('rejected');
      persistConsent('rejected');
    }
  }, []);

  function persistConsent(status: 'accepted' | 'rejected') {
    try {
      const record: ConsentRecord = {
        status,
        version: CONSENT_VERSION,
        timestamp: Date.now(),
      };
      localStorage.setItem(CONSENT_KEY, JSON.stringify(record));
    } catch {}
  }

  function acceptAll() {
    persistConsent('accepted');
    setConsent('accepted');
    try { (window as any).Termly?.acceptAll?.(); } catch {}
  }

  function rejectAll() {
    persistConsent('rejected');
    setConsent('rejected');
    try { (window as any).Termly?.rejectAll?.(); } catch {}
  }

  return { consent, acceptAll, rejectAll };
}
