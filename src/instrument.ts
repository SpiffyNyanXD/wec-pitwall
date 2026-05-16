import { init, browserTracingIntegration, replayIntegration } from '@sentry/react';

const sentryDsn = import.meta.env.VITE_SENTRY_DSN;

if (sentryDsn) {
  init({
    dsn: sentryDsn,
    integrations: [
      browserTracingIntegration(),
      replayIntegration(),
    ],
    tracesSampleRate: 0.1,
    replaysSessionSampleRate: 0.05,
    replaysOnErrorSampleRate: 1.0,
    environment: import.meta.env.MODE,
    sendDefaultPii: false,
  });
}
