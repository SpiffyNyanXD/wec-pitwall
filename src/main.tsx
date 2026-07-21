import "./instrument";
import "./lib/posthog";

import { createRoot } from "react-dom/client";
import { reactErrorHandler } from "@sentry/react";
import App from "./App.tsx";
import "./index.css";
import { HelmetProvider } from "react-helmet-async";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 30,
      retry: 2,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
  },
});

createRoot(document.getElementById("root")!, {
  onUncaughtError: reactErrorHandler(),
  onCaughtError: reactErrorHandler(),
  onRecoverableError: reactErrorHandler(),
}).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <Sentry.ErrorBoundary fallback={<div>An error has occurred</div>}><App /></Sentry.ErrorBoundary>
      </HelmetProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
