import "./index.css";

const rootEl = document.getElementById("root");

// TODO(boot-trap): revert after root crash fixed
function paintFatal(err: unknown) {
  const msg = (err && (err.stack || err.message)) ? (err.stack || err.message) : String(err);
  const box = document.createElement("pre");
  box.setAttribute(
    "style",
    "position:fixed;inset:0;margin:0;padding:16px;background:#0a0a0a;" +
      "color:#E8002D;font:12px/1.4 monospace;white-space:pre-wrap;" +
      "overflow:auto;z-index:999999"
  );
  box.textContent = "WEC PITWALL BOOT ERROR\n\n" + msg;
  document.body.innerHTML = "";
  document.body.appendChild(box);
  console.error("[BOOT FATAL]", err);
}

// backstop for throws after mount / async throws
window.addEventListener("error", (e) => paintFatal(e.error || e.message));
window.addEventListener("unhandledrejection", (e) => paintFatal(e.reason));

async function bootstrap() {
  try {
    // Dynamically import all other modules that might throw on load
    await import("./instrument");
    await import("./lib/posthog");

    const { createRoot } = await import("react-dom/client");
    const Sentry = await import("@sentry/react");
    const { default: App } = await import("./App.tsx");
    const { injectSpeedInsights } = await import("@vercel/speed-insights");
    const { inject } = await import("@vercel/analytics");
    const { HelmetProvider } = await import("react-helmet-async");
    const React = await import("react");
    const { QueryClient, QueryClientProvider } = await import("@tanstack/react-query");
    const { default: BootBoundary } = await import("./BootBoundary");

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

    const appTree = (
      <React.StrictMode>
        <QueryClientProvider client={queryClient}>
          <HelmetProvider>
            <Sentry.ErrorBoundary fallback={<div>An error has occurred</div>}>
              <BootBoundary>
                <App />
              </BootBoundary>
            </Sentry.ErrorBoundary>
          </HelmetProvider>
        </QueryClientProvider>
      </React.StrictMode>
    );

    if (rootEl) {
      createRoot(rootEl).render(appTree);
    }
  } catch (err) {
    paintFatal(err);
  }
}

bootstrap();
