import SEOHead from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useCookieConsent } from "@/hooks/useCookieConsent";
import { SkeletonBox as BoneyardSkeleton } from "@/components/PageSkeleton";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

const CookiePreferencesPage = () => {
  const { consent, acceptAll, rejectAll } = useCookieConsent();
  const [termlyStatus, setTermlyStatus] = useState<'loading' | 'ready' | 'unavailable'>('loading');
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const mountPoint = document.querySelector('div[name="termly-embed"]');
    const iframeExists = () => Boolean(mountPoint?.querySelector('iframe'));

    if (iframeExists()) {
      setTermlyStatus('ready');
      return;
    }

    const timeout = setTimeout(() => {
      setTermlyStatus('unavailable');
    }, 5000);

    const observer = new MutationObserver(() => {
      if (iframeExists()) {
        setTermlyStatus('ready');
        clearTimeout(timeout);
        observer.disconnect();
      }
    });

    if (mountPoint) {
      observer.observe(mountPoint, { childList: true, subtree: true });
    }

    return () => {
      observer.disconnect();
      clearTimeout(timeout);
    };
  }, [retryCount]);

  return (
    <div className="min-h-screen flex flex-col bg-[#000000]">
      <SEOHead
        title="Cookie Preferences | WEC Pitwall"
        description="Manage your cookie and consent preferences for WEC Pitwall."
      />
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl pt-24">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-6 tap-highlight">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>

          <h1 className="text-3xl md:text-4xl font-bold mb-4">Cookie Preferences</h1>
          <p className="text-muted-foreground">
            Manage your cookie and consent preferences for WEC Pitwall. Your choices will be saved and applied across the platform.
            Current status: <span className="font-semibold text-foreground capitalize">{consent || 'Unknown'}</span>
          </p>
        </div>

        <div className="glass-card p-6 md:p-8 min-h-[500px] relative">
          {termlyStatus === 'loading' && (
            <div
              className="absolute inset-0 p-6 md:p-8 z-10 bg-background/80 backdrop-blur-sm rounded-xl"
              role="status"
              aria-label="Loading cookie preferences"
            >
              <div className="space-y-4">
                <BoneyardSkeleton className="h-8 w-1/3" />
                <BoneyardSkeleton className="h-4 w-full" />
                <BoneyardSkeleton className="h-4 w-5/6" />
                <BoneyardSkeleton className="h-4 w-4/6" />
                <div className="pt-8">
                  <BoneyardSkeleton className="h-64 w-full" />
                </div>
              </div>
            </div>
          )}

          {termlyStatus === 'unavailable' && (
            <div className="absolute inset-0 p-6 md:p-8 z-10 bg-background rounded-xl flex items-center justify-center" role="alert">
              <div className="max-w-lg text-center space-y-4">
                <h2 className="text-xl font-semibold">Cookie preferences are temporarily unavailable</h2>
                <p className="text-muted-foreground">
                  You can retry loading the detailed preferences or choose a privacy setting below.
                </p>
                <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3">
                  <Button
                    type="button"
                    onClick={() => {
                      setTermlyStatus('loading');
                      setRetryCount((count) => count + 1);
                    }}
                  >
                    Retry loading preferences
                  </Button>
                  <Button type="button" variant="outline" onClick={rejectAll}>
                    Reject non-essential cookies
                  </Button>
                  <Button type="button" variant="outline" onClick={acceptAll}>
                    Accept all cookies
                  </Button>
                </div>
              </div>
            </div>
          )}

          <div id="termly-code-snippet-support">
            <div name="termly-embed" data-id="ff5c77aa-caca-4d6e-b6af-f7ef0e92df21" data-type="iframe" />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CookiePreferencesPage;
