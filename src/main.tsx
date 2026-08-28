import "./lib/posthog";
import { injectSpeedInsights } from '@vercel/speed-insights';
import { inject } from '@vercel/analytics';
import React from 'react';
import { createRoot } from "react-dom/client";
import "./index.css";

injectSpeedInsights();
inject();

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
      return React.createElement('div', {
        style: { color: "red", padding: "20px", background: "#000", fontFamily: "monospace", height: "100vh", overflow: "auto" }
      },
        React.createElement('h2', null, "Failed to render the application"),
        React.createElement('pre', null, this.state.error?.stack || String(this.state.error))
      );
    }
    return this.props.children;
  }
}

async function bootstrap() {
  try {
    let Sentry: typeof import("@sentry/react") | null = null;
    try {
      await import("./instrument");
      Sentry = await import("@sentry/react");
    } catch (telemetryError) {
      console.error("Telemetry initialization failed:", telemetryError);
    }

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

    const app = React.createElement(BootErrorBoundary, null,
      React.createElement(App, null)
    );
    const appWithTelemetry = Sentry
      ? React.createElement(Sentry.ErrorBoundary, {
          fallback: React.createElement('div', { style: { color: "red", padding: "20px", background: "#000", fontFamily: "monospace" } },
            "An error has occurred during Sentry boundary."
          )
        }, app)
      : app;

    createRoot(document.getElementById("root")!).render(
      React.createElement(React.StrictMode, null,
        React.createElement(QueryClientProvider, { client: queryClient },
          React.createElement(HelmetProvider, null,
            appWithTelemetry
          )
        )
      )
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
