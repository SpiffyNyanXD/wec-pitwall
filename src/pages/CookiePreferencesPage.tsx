import SEOHead from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const CookiePreferencesPage = () => {
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

          <h1 className="font-racing text-3xl md:text-4xl font-bold mb-4">Cookie Preferences</h1>
          <p className="text-muted-foreground">
            Manage your cookie and consent preferences for WEC Pitwall. Your choices will be saved and applied across the platform.
          </p>
        </div>

        <div className="glass-card p-6 md:p-8 min-h-[500px]">
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
