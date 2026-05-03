import SEOHead from '@/components/SEOHead';
import Header from '@/components/Header';

export default function Dsar() {
  return (
    <>
      <SEOHead
        title="Data Request — WEC Pitwall"
        description="Submit a data subject access request to WEC Pitwall."
      />
      <Header />
      <div className="min-h-screen bg-background px-4 py-16 max-w-3xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-foreground">Data Subject Access Request</h1>
        <p className="text-muted-foreground text-sm">
          Use this form to exercise your data rights, including the right to access, correct, delete,
          or obtain a copy of your personal data. We will respond within 30 days.
        </p>
        <div className="w-full rounded overflow-hidden border border-border">
          <iframe
            src="https://app.termly.io/dsar/0f2158a4-214c-4d05-9c7a-31977bf28326"
            title="Data Subject Access Request Form"
            className="w-full min-h-[700px] bg-white"
            style={{ border: 'none' }}
          />
        </div>
      </div>
    </>
  );
}
