import client from 'posthog-js';
const token=import.meta.env.VITE_POSTHOG_PROJECT_TOKEN || import.meta.env.VITE_POSTHOG_KEY;let initialized=false,allowed=false;
export const posthog={
 capture(event:string){if(allowed&&initialized)client.capture(event);},
 opt_in_capturing(){allowed=true;if(!token)return;if(!initialized){client.init(token,{api_host:import.meta.env.VITE_POSTHOG_HOST||'https://eu.i.posthog.com',person_profiles:'identified_only',capture_pageview:false,capture_pageleave:false,autocapture:false,opt_out_capturing_by_default:true,disable_session_recording:true});initialized=true;}client.opt_in_capturing();},
 opt_out_capturing(){allowed=false;if(initialized)client.opt_out_capturing();}
};
