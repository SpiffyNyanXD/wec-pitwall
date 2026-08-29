import "./instrument";
import "./lib/posthog";

import { createRoot } from "react-dom/client";
import * as Sentry from "@sentry/react";
import App from "./App.tsx";
import "./index.css";
import { SpeedInsights } from '@vercel/speed-insights/react';
import { injectSpeedInsights } from '@vercel/speed-insights';
import { inject } from '@vercel/analytics';

injectSpeedInsights();
inject();


import { HelmetProvider } from 'react-helmet-async';
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

Sentry.init({
  dsn: "https://3c5169ab31c2f8fcdde00d5009c7f0fa@o4511398217318400.ingest.us.sentry.io/4511398282657792",
  sendDefaultPii: true,
});

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
        <App />
      </HelmetProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
