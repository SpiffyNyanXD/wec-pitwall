/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SENTRY_DSN?: string;
  readonly VITE_SENTRY_ORG?: string;
  readonly VITE_SENTRY_PROJECT?: string;
  readonly VITE_APP_RELEASE?: string;
  readonly VITE_POSTHOG_PROJECT_TOKEN?: string;
  readonly VITE_POSTHOG_HOST?: string;
  readonly VITE_POSTHOG_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
