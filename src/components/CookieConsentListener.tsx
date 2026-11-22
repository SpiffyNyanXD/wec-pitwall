import { useEffect } from 'react';
import { initializeCookieConsent, setCookieConsent } from '@/hooks/useCookieConsent';
export function CookieConsentListener(){useEffect(()=>{initializeCookieConsent();const handler=(event:Event)=>{const value=(event as CustomEvent).detail?.consent;if(value==='accepted'||value==='rejected')setCookieConsent(value)};window.addEventListener('termly:consent',handler);return()=>window.removeEventListener('termly:consent',handler)},[]);return null;}
