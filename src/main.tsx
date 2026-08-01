import "./lib/posthog";
import { injectSpeedInsights } from '@vercel/speed-insights';
import { inject } from '@vercel/analytics';
import React from 'react';
import { createRoot } from "react-dom/client";
import "./index.css";

injectSpeedInsights();
inject();

async function bootstrap() {
  try {
    await import("./instrument");
    const Sentry = await import("@sentry/react");
    const { default: App } = await import("./App.tsx");
    const { HelmetProvider } = await import('react-helmet-async');
    const { QueryClient, QueryClientProvider } = await import('@tanstack/react-query');

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
            <Sentry.ErrorBoundary fallback={
              <div style={{ color: "red", padding: "20px", background: "#000", fontFamily: "monospace" }}>
                An error has occurred during render.
              </div>
            }>
              <App />
            </Sentry.ErrorBoundary>
          </HelmetProvider>
        </QueryClientProvider>
      </React.StrictMode>
    );
  } catch (err) {
    console.error("Boot error:", err);
    document.getElementById("root")!.innerHTML = `
      <div style="color: red; padding: 20px; background: #000; font-family: monospace; height: 100vh; overflow: auto;">
        <h2>Failed to boot the application</h2>
        <pre>${err instanceof Error ? err.stack : String(err)}</pre>
      </div>
    `;
  }
}

bootstrap();
