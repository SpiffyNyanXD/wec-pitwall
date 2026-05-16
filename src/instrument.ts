import * as Sentry from "@sentry/react";

const sentryDsn = import.meta.env.VITE_SENTRY_DSN;
const sentryOrg = import.meta.env.VITE_SENTRY_ORG;
const sentryProject = import.meta.env.VITE_SENTRY_PROJECT;

if (sentryDsn) {
  Sentry.init({
    dsn: sentryDsn,
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration(),
    ],
    tracesSampleRate: 0.1,
    replaysSessionSampleRate: 0.05,
    replaysOnErrorSampleRate: 1.0,
    environment: import.meta.env.MODE,
    release: import.meta.env.VITE_APP_RELEASE,
    sendDefaultPii: false,
  });
}

export const sentryConfig = {
  org: sentryOrg,
  project: sentryProject,
};
