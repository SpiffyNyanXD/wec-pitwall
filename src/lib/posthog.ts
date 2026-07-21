import posthog from "posthog-js";
import type { PostHogConfig } from "posthog-js";

const posthogProjectToken =
  import.meta.env.VITE_POSTHOG_PROJECT_TOKEN || import.meta.env.VITE_POSTHOG_KEY;
const posthogHost = import.meta.env.VITE_POSTHOG_HOST || "https://eu.i.posthog.com";

const posthogConfig = {
  api_host: posthogHost,
  person_profiles: "identified_only",
  capture_pageview: false,
  opt_out_capturing_by_default: true,
  capture_pageleave: true,
} satisfies Partial<PostHogConfig>;

if (posthogProjectToken) {
  posthog.init(posthogProjectToken, posthogConfig);
} else if (import.meta.env.DEV) {
  console.warn("PostHog is disabled because VITE_POSTHOG_PROJECT_TOKEN is not set.");
}

export { posthog };
