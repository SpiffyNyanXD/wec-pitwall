import "./instrument";
import "./lib/posthog";

import { createRoot } from "react-dom/client";
import * as Sentry from "@sentry/react";
import App from "./App.tsx";
import "./index.css";
import { injectSpeedInsights } from '@vercel/speed-insights';
import { inject } from '@vercel/analytics';

injectSpeedInsights();
inject();


import { HelmetProvider } from 'react-helmet-async';
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 10,
      gcTime: 1000 * 60 * 60,
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <Sentry.ErrorBoundary fallback={<div>An error has occurred</div>}><App /></Sentry.ErrorBoundary>
      </HelmetProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
