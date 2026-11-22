import "./lib/posthog";
import { injectSpeedInsights } from '@vercel/speed-insights';
import { inject } from '@vercel/analytics';
import React from 'react';
import { createRoot } from "react-dom/client";
import "./index.css";
import ErrorFallback from "./components/ErrorFallback";

// Automatic telemetry disabled; optional analytics follow explicit consent.


class BootErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean, error: Error | null }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return React.createElement(ErrorFallback, { error: this.state.error });
    }
    return this.props.children;
  }
}

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
      React.createElement(React.StrictMode, null,
        React.createElement(QueryClientProvider, { client: queryClient },
          React.createElement(HelmetProvider, null,
            React.createElement(Sentry.ErrorBoundary, {
              fallback: ({ error }) => React.createElement(ErrorFallback, { error: error instanceof Error ? error : new Error(String(error)) })
            },
              React.createElement(BootErrorBoundary, null,
                React.createElement(App, null)
              )
            )
          )
        )
      )
    );
  } catch (err) {
    console.error("Boot error:", err);
    const root = document.getElementById('root');
    if (root) root.textContent = 'WEC Pitwall could not start. Reload the page or try again later.';
  }
}

bootstrap();
