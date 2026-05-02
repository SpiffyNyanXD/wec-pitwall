import { motion } from 'framer-motion';
import Header from '@/components/Header';
import SEOHead from '@/components/SEOHead';

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Cookie Policy"
        description="WEC Pitwall Cookie Policy — how and why we use cookies."
        url="/cookie-policy"
        noIndex={false}
      />
      <Header />
      <main className="container max-w-3xl py-12 px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>

          <div className="mb-10">
            <h1 className="text-4xl font-black uppercase tracking-tight text-foreground mb-2">
              Cookie Policy
            </h1>
            <p className="text-sm text-muted-foreground">Last updated: May 02, 2026</p>
          </div>

          <div className="space-y-8 text-sm text-muted-foreground leading-relaxed">

            <section>
              <h2 className="text-lg font-bold text-foreground mb-3">What Are Cookies?</h2>
              <p>Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-foreground mb-3">How We Use Cookies</h2>
              <p>WEC Pitwall uses cookies and similar tracking technologies to:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Maintain your session after login (authentication cookies via Supabase)</li>
                <li>Remember your preferences (theme, timezone, display settings)</li>
                <li>Store your cookie consent decision</li>
                <li>Improve the performance and reliability of the platform</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-foreground mb-3">Types of Cookies We Use</h2>
              <div className="glass-card overflow-hidden">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-border bg-muted/30">
                      <th className="text-left p-3 font-semibold text-foreground">Type</th>
                      <th className="text-left p-3 font-semibold text-foreground">Purpose</th>
                      <th className="text-left p-3 font-semibold text-foreground">Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border">
                      <td className="p-3 font-medium text-foreground">Essential</td>
                      <td className="p-3">Authentication session (Supabase auth token)</td>
                      <td className="p-3">Session</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="p-3 font-medium text-foreground">Functional</td>
                      <td className="p-3">Theme preference, timezone, display settings</td>
                      <td className="p-3">1 year</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="p-3 font-medium text-foreground">Preference</td>
                      <td className="p-3">Cookie consent decision</td>
                      <td className="p-3">1 year</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium text-foreground">localStorage</td>
                      <td className="p-3">Remembered email, first visit flag</td>
                      <td className="p-3">Until cleared</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-lg font-bold text-foreground mb-3">Third-Party Cookies</h2>
              <p>We use Supabase for authentication and database services. Supabase may set cookies necessary for session management. We do not use any advertising or tracking cookies from third parties.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-foreground mb-3">How to Control Cookies</h2>
              <p>You can control and/or delete cookies as you wish. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed. However, if you do this, you may have to manually adjust some preferences every time you visit a site and some services and functionalities may not work.</p>
              <p className="mt-2">To manage your cookie preferences on WEC Pitwall, you can use the cookie consent banner that appears on your first visit, or clear your browser's local storage and cookies to reset your consent decision.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-foreground mb-3">Contact Us</h2>
              <p>If you have questions about our use of cookies, contact us at <a href="mailto:privacy@wecpitwall.com" className="text-primary hover:underline">privacy@wecpitwall.com</a>.</p>
            </section>

          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default CookiePolicy;