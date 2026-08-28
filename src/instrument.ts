import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://3c5169ab31c2f8fcdde00d5009c7f0fa@o4511398217318400.ingest.us.sentry.io/4511398282657792",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration({
      maskAllText: false,
      blockAllMedia: false,
    }),
  ],
  tracesSampleRate: 1.0,
  tracePropagationTargets: ["localhost", /^https:\/\/wec-pitwall\.vercel\.app/],
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  environment: import.meta.env.MODE || 'development',
});
