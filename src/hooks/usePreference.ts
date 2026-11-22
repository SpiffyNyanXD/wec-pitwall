import {useSyncExternalStore} from 'react';
const listeners=new Set<()=>void>();
export const safeRead=(key:string,fallback:string)=>{try{return typeof window==='undefined'?fallback:localStorage.getItem(key)??fallback}catch{return fallback}};
export function usePreference<T extends string>(key:string,fallback:T){const value=useSyncExternalStore(fn=>{listeners.add(fn);window.addEventListener('storage',fn);return()=>{listeners.delete(fn);window.removeEventListener('storage',fn)}},()=>safeRead(key,fallback)as T,()=>fallback);return [value,(next:T)=>{try{localStorage.setItem(key,next)}catch{/* preferences unavailable */}listeners.forEach(fn=>fn())}]as const;}
