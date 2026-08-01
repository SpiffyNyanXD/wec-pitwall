import "./instrument";
import "./lib/posthog";

import { createRoot } from "react-dom/client";
import * as Sentry from "@sentry/react";
import "./index.css";
import { injectSpeedInsights } from '@vercel/speed-insights';
import { inject } from '@vercel/analytics';
import { HelmetProvider } from 'react-helmet-async';
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

injectSpeedInsights();
inject();

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

// TODO(boot-trap): can simplify once stable
const fallbackStyle = { color: 'red', padding: '20px', backgroundColor: '#333', fontFamily: 'monospace' };

async function bootstrap() {
  try {
    const { default: App } = await import('./App.tsx');
    createRoot(document.getElementById("root")!).render(
      <React.StrictMode>
        <QueryClientProvider client={queryClient}>
          <HelmetProvider>
            <Sentry.ErrorBoundary fallback={({ error }) => (
              <pre style={fallbackStyle}>
                Render Error:\n{error?.message}\n{error?.stack}
              </pre>
            )}>
              <App />
            </Sentry.ErrorBoundary>
          </HelmetProvider>
        </QueryClientProvider>
      </React.StrictMode>
    );
  } catch (err) {
    const root = document.getElementById("root");
    if (root) {
      root.innerHTML = `<pre style="color: red; padding: 20px; background-color: #333; font-family: monospace;">Module Load Error:\n${err instanceof Error ? err.message + '\n' + err.stack : String(err)}</pre>`;
    }
  }
}

bootstrap();
