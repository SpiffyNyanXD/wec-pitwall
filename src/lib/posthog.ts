import posthog from "posthog-js";
import type { PostHogConfig } from "posthog-js";

const posthogProjectToken =
  import.meta.env.VITE_POSTHOG_PROJECT_TOKEN || import.meta.env.VITE_POSTHOG_KEY;
const posthogHost = import.meta.env.VITE_POSTHOG_HOST || "https://eu.i.posthog.com";

const posthogConfig = {
  api_host: posthogHost,
  defaults: "2026-01-30",
  person_profiles: "identified_only",
  capture_pageview: "history_change",
  capture_pageleave: "if_capture_pageview",
} satisfies Partial<PostHogConfig>;

if (posthogProjectToken) {
  posthog.init(posthogProjectToken, posthogConfig);
} else if (import.meta.env.DEV) {
  console.warn("PostHog is disabled because VITE_POSTHOG_PROJECT_TOKEN is not set.");
}

export { posthog };
