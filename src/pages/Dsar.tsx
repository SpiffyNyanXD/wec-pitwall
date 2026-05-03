import Header from '@/components/Header';
import SEOHead from '@/components/SEOHead';

export default function Dsar() {
  return (
    <>
      <SEOHead title="Data Request — WEC Pitwall" description="Submit a data subject access request." />
      <Header />

      <div className="min-h-screen bg-background pt-20 pb-16">
        <div className="max-w-3xl mx-auto px-4 space-y-6">

          {/* Hero section */}
          <div className="space-y-2">
            <p className="text-xs font-semibold tracking-widest text-[#E8002D] uppercase">Privacy</p>
            <h1 className="text-3xl font-bold text-foreground">Data Subject Access Request</h1>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Exercise your privacy rights under GDPR and other regulations. We respond within 30 days.
            </p>
          </div>

          {/* Rights info card */}
          <div className="glass-card p-5 space-y-2">
            <p className="text-xs font-semibold text-[#E8002D] uppercase tracking-widest">Your Rights</p>
            <p className="text-sm text-muted-foreground">
              Right to know · Right to access · Right to correct · Right to deletion ·
              Right to data portability · Right to non-discrimination · Right to opt out of targeted advertising
            </p>
            <p className="text-xs text-muted-foreground pt-1">
              Contact us at{' '}
              <a href="mailto:privacy@wecpitwall.com" className="text-[#E8002D] hover:underline">
                privacy@wecpitwall.com
              </a>
            </p>
          </div>

          {/* Termly iframe — backend logic unchanged */}
          <div className="glass-card overflow-hidden rounded-lg">
            <div className="bg-muted/30 px-5 py-3 border-b border-border">
              <p className="text-sm font-medium text-foreground">Submit a Request</p>
              <p className="text-xs text-muted-foreground">
                Fill in the form below. The data protection officer will be notified within 24 hours.
              </p>
            </div>
            <div className="dsar-iframe-wrapper">
              <iframe
                src="https://app.termly.io/dsar/0f2158a4-214c-4d05-9c7a-31977bf28326"
                title="Data Subject Access Request Form"
                className="w-full"
                style={{
                  border: 'none',
                  minHeight: '700px',
                  display: 'block',
                }}
              />
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
