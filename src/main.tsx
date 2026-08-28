import "./instrument";
import * as Sentry from "@sentry/react";
import "./lib/posthog";
import { injectSpeedInsights } from '@vercel/speed-insights';
import { inject } from '@vercel/analytics';
import React from 'react';
import { createRoot } from "react-dom/client";
import "./index.css";
import ErrorFallback from "./components/ErrorFallback";

injectSpeedInsights();
inject();

class BootErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean, error: Error | null }> {
  resetErrorBoundary = () => { this.setState({ hasError: false, error: null }); };
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    Sentry.captureException(error, { contexts: { react: { componentStack: info.componentStack } } });
  }

  render() {
    if (this.state.hasError) {
      return React.createElement(ErrorFallback, { error: this.state.error, resetErrorBoundary: this.resetErrorBoundary });
    }
    return this.props.children;
  }
}

async function bootstrap() {
  try {
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
              fallback: ({ error, resetError }) => React.createElement(ErrorFallback, { error, resetErrorBoundary: resetError })
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
    window.addEventListener('popstate', () => {
      document.body.innerHTML = '<div id="root"></div>';
      bootstrap();
    }, { once: true });
    console.error("Boot error:", err);
    Sentry.captureException(err);
    document.getElementById("root")!.innerHTML = `
      <div style="color: red; padding: 20px; background: #000; font-family: monospace; height: 100vh; overflow: auto;">
        <h2>Failed to boot the application</h2>
        <pre>${err instanceof Error ? err.stack : String(err)}</pre>
      </div>
    `;
  }
}

bootstrap();
