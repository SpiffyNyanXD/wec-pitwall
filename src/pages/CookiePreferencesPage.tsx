import SEOHead from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useCookieConsent } from "@/hooks/useCookieConsent";
import { SkeletonBox as BoneyardSkeleton } from "@/components/PageSkeleton";
import { useState, useEffect } from "react";

const CookiePreferencesPage = () => {
  const { consent } = useCookieConsent();
  const [termlyReady, setTermlyReady] = useState(() => {
    if (typeof window === 'undefined') return false;
    const termlyLoaded = typeof window.displayPreferenceModal === 'function';
    const iframeExists = document.querySelector('div[name="termly-embed"] iframe') !== null;
    return termlyLoaded || iframeExists;
  });

  useEffect(() => {
    if (termlyReady) return;
    let isMounted = true;

    // We check if Termly is loaded and injected the iframe
    const checkTermly = () => {
      const termlyLoaded = typeof window !== 'undefined' &&
                           typeof window.displayPreferenceModal === 'function';
      const iframeExists = document.querySelector('div[name="termly-embed"] iframe') !== null;
      return termlyLoaded || iframeExists;
    };

    // Set up an interval to check for Termly loading if it's not ready immediately
    const interval = setInterval(() => {
      if (checkTermly()) {
        if (isMounted) setTermlyReady(true);
        clearInterval(interval);
      }
    }, 500);

    // Timeout after 5 seconds to show content anyway to prevent hanging
    const timeout = setTimeout(() => {
      if (isMounted) {
        setTermlyReady(true);
        clearInterval(interval);
      }
    }, 5000);

    return () => {
      isMounted = false;
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [termlyReady]);

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
          {!termlyReady && (
            <div className="absolute inset-0 p-6 md:p-8 z-10 bg-background/80 backdrop-blur-sm rounded-xl">
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
