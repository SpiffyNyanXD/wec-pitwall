import { useSyncExternalStore } from 'react';
import { posthog } from '@/lib/posthog';
export type ConsentStatus = 'accepted' | 'rejected' | 'pending' | 'blocked';
declare global { interface Window { displayPreferenceModal?: () => void; Termly?: { getConsentState?: () => 'accepted' | 'rejected' | 'pending'; acceptAll?: () => void; rejectAll?: () => void; }; } }
const KEY='wec_cookie_consent';let status: ConsentStatus='pending';const listeners=new Set<()=>void>();
function apply(next: ConsentStatus, persist=false){status=next;if(persist){try{localStorage.setItem(KEY,JSON.stringify({status:next,version:'1',timestamp:Date.now()}))}catch{ /* storage unavailable */ }}
 if(next==='accepted')posthog.opt_in_capturing();else posthog.opt_out_capturing();listeners.forEach(fn=>fn());}
export function setCookieConsent(next:'accepted'|'rejected'){apply(next,true);}
export function initializeCookieConsent(){try{const saved=JSON.parse(localStorage.getItem(KEY)??'null');if(saved?.version==='1'&&['accepted','rejected'].includes(saved.status))apply(saved.status);}catch{apply('pending');}}
export function useCookieConsent(){const consent=useSyncExternalStore(fn=>{listeners.add(fn);return()=>listeners.delete(fn)},()=>status,()=> 'pending' as ConsentStatus);return {consent,acceptAll(){setCookieConsent('accepted');try{window.Termly?.acceptAll?.()}catch{/* optional vendor unavailable */}},rejectAll(){setCookieConsent('rejected');try{window.Termly?.rejectAll?.()}catch{/* optional vendor unavailable */}}};}
