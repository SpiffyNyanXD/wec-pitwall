import { APP_INFO } from '@/lib/constants';
import SEOHead from '@/components/SEOHead';

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Cookie Policy"
        description="Cookie usage and preference controls for WEC Pitwall."
        url="/cookie-policy"
      />

      <main className="container max-w-4xl py-10 px-4">
        <h1 className="text-3xl font-bold tracking-tight">Cookie Policy</h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated May 01, 2026</p>

        <div className="prose prose-neutral dark:prose-invert mt-8 max-w-none">
          <p>
            This Cookie Policy explains how <strong>{APP_INFO.NAME}</strong> ("Company", "we", "us", and
            "our") uses cookies and similar technologies to recognize you when you visit our website at{' '}
            <a href="https://wec-pitwall.vercel.app" target="_blank" rel="noreferrer noopener">
              https://wec-pitwall.vercel.app
            </a>
            .
          </p>

          <h2>What are cookies?</h2>
          <p>
            Cookies are small data files that are placed on your computer or mobile device when you visit a
            website. Cookies are widely used by website owners to make websites work, or work more efficiently,
            and to provide reporting information.
          </p>

          <h2>Why do we use cookies?</h2>
          <p>
            We use cookies for essential functionality and to improve your experience. Some cookies are required
            for technical reasons so the Website can operate correctly.
          </p>

          <h2>How can I control cookies?</h2>
          <p>
            You can choose whether to accept or reject cookies through your browser settings. If you reject
            cookies, parts of this Website may not function as intended.
          </p>

          <h3>Unclassified cookies</h3>
          <p>These cookies are currently being reviewed and categorized with their providers.</p>
          <table>
            <tbody>
              <tr>
                <th>Name</th>
                <td>wec-timezone</td>
              </tr>
              <tr>
                <th>Provider</th>
                <td>wec-pitwall.vercel.app</td>
              </tr>
              <tr>
                <th>Type</th>
                <td>html_local_storage</td>
              </tr>
              <tr>
                <th>Expires in</th>
                <td>persistent</td>
              </tr>
            </tbody>
          </table>

          <h2>How can I control cookies on my browser?</h2>
          <ul>
            <li><a href="https://support.google.com/chrome/answer/95647#zippy=%2Callow-or-block-cookies" target="_blank" rel="noreferrer noopener">Chrome</a></li>
            <li><a href="https://support.microsoft.com/en-us/windows/delete-and-manage-cookies-168dab11-0753-043d-7c16-ede5947fc64d" target="_blank" rel="noreferrer noopener">Internet Explorer</a></li>
            <li><a href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop?redirectslug=enable-and-disable-cookies-website-preferences&redirectlocale=en-US" target="_blank" rel="noreferrer noopener">Firefox</a></li>
            <li><a href="https://support.apple.com/en-ie/guide/safari/sfri11471/mac" target="_blank" rel="noreferrer noopener">Safari</a></li>
            <li><a href="https://support.microsoft.com/en-us/windows/microsoft-edge-browsing-data-and-privacy-bb8174ba-9d73-dcf2-9b4a-c582b4e640dd" target="_blank" rel="noreferrer noopener">Edge</a></li>
            <li><a href="https://help.opera.com/en/latest/web-preferences/" target="_blank" rel="noreferrer noopener">Opera</a></li>
          </ul>

          <h2>Where can I get further information?</h2>
          <p>If you have any questions about our use of cookies, please contact us through the app channels.</p>
        </div>
      </main>
    </div>
  );
};

export default CookiePolicy;
