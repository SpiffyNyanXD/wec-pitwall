import { useEffect } from 'react';

const CONSENT_KEY = 'wec_cookie_consent';
const CONSENT_VERSION = '1';

export function CookieConsentListener() {
  useEffect(() => {
    function handleConsent(event: Event) {
      const customEvent = event as CustomEvent;
      const status = customEvent.detail?.consent === 'accepted' ? 'accepted' : 'rejected';
      try {
        localStorage.setItem(CONSENT_KEY, JSON.stringify({
          status,
          version: CONSENT_VERSION,
          timestamp: Date.now(),
        }));
      } catch {}
    }

    window.addEventListener('termly:consent', handleConsent);

    const handleAccept = () => handleConsent(new CustomEvent('termly:consent', { detail: { consent: 'accepted' } }));
    const handleReject = () => handleConsent(new CustomEvent('termly:consent', { detail: { consent: 'rejected' } }));

    window.addEventListener('CookiebotOnAccept', handleAccept);
    window.addEventListener('CookiebotOnDecline', handleReject);

    return () => {
      window.removeEventListener('termly:consent', handleConsent);
      window.removeEventListener('CookiebotOnAccept', handleAccept);
      window.removeEventListener('CookiebotOnDecline', handleReject);
    };
  }, []);

  return null;
}
