import { motion } from 'framer-motion';
import Header from '@/components/Header';
import SEOHead from '@/components/SEOHead';
import { Link } from 'react-router-dom';

const Section = ({ id, title, children }: { id: string; title: string; children: React.ReactNode }) => (
  <section id={id} className="mb-10">
    <h2 className="text-xl font-bold text-foreground mb-4 pb-2 border-b border-border">{title}</h2>
    <div className="text-muted-foreground text-sm leading-relaxed space-y-3">{children}</div>
  </section>
);

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Privacy Policy"
        description="WEC Pitwall Privacy Policy — how we collect, use and protect your data."
        url="/privacy"
        noIndex={false}
      />
      <Header />
      <main className="container max-w-3xl py-12 px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>

          {/* Title */}
          <div className="mb-10">
            <h1 className="text-4xl font-black uppercase tracking-tight text-foreground mb-2">
              Privacy Policy
            </h1>
            <p className="text-sm text-muted-foreground">Last updated: May 02, 2026</p>
          </div>

          {/* Table of Contents */}
          <div className="glass-card p-6 mb-10">
            <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">Table of Contents</h2>
            <nav className="space-y-1.5 text-sm">
              {[
                ['#infocollect', '1. What Information Do We Collect?'],
                ['#infouse', '2. How Do We Process Your Information?'],
                ['#legalbases', '3. What Legal Bases Do We Rely On?'],
                ['#whoshare', '4. When and With Whom Do We Share Your Information?'],
                ['#cookies', '5. Do We Use Cookies?'],
                ['#inforetain', '6. How Long Do We Keep Your Information?'],
                ['#infosafe', '7. How Do We Keep Your Information Safe?'],
                ['#infominors', '8. Do We Collect Information From Minors?'],
                ['#privacyrights', '9. What Are Your Privacy Rights?'],
                ['#DNT', '10. Controls for Do-Not-Track Features'],
                ['#uslaws', '11. Do United States Residents Have Specific Privacy Rights?'],
                ['#policyupdates', '12. Do We Make Updates to This Notice?'],
                ['#contact', '13. How Can You Contact Us?'],
                ['#request', '14. How Can You Review, Update, or Delete Your Data?'],
              ].map(([href, label]) => (
                <a key={href} href={href} className="block text-primary hover:underline">{label}</a>
              ))}
            </nav>
          </div>

          {/* Summary */}
          <div className="glass-card p-6 mb-10">
            <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">Summary of Key Points</h2>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p><strong className="text-foreground">What personal information do we process?</strong> When you visit, use, or navigate our Services, we may process personal information depending on how you interact with us and the choices you make.</p>
              <p><strong className="text-foreground">Do we process sensitive personal information?</strong> No. We do not process sensitive personal information.</p>
              <p><strong className="text-foreground">Do we collect information from third parties?</strong> No. We do not collect any information from third parties.</p>
              <p><strong className="text-foreground">How do we process your information?</strong> To provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law.</p>
              <p><strong className="text-foreground">How do we keep your information safe?</strong> We have appropriate organisational and technical processes in place to protect your personal information.</p>
              <p><strong className="text-foreground">What are your rights?</strong> Depending on your location, you may have certain rights regarding your personal information.</p>
            </div>
          </div>

          {/* Sections */}
          <Section id="infocollect" title="1. What Information Do We Collect?">
            <p><strong className="text-foreground">Personal information you disclose to us.</strong> We collect personal information that you voluntarily provide when you register on the Services or contact us.</p>
            <p>The personal information we collect may include: names, email addresses, usernames, and passwords.</p>
            <p><strong className="text-foreground">Sensitive Information.</strong> We do not process sensitive information.</p>
            <p>All personal information that you provide to us must be true, complete, and accurate.</p>
          </Section>

          <Section id="infouse" title="2. How Do We Process Your Information?">
            <p>We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law.</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>To facilitate account creation and authentication and otherwise manage user accounts.</li>
              <li>To save or protect an individual's vital interest.</li>
            </ul>
          </Section>

          <Section id="legalbases" title="3. What Legal Bases Do We Rely On?">
            <p>We only process your personal information when we believe it is necessary and we have a valid legal reason to do so under applicable law.</p>
            <p><strong className="text-foreground">If you are located in the EU or UK:</strong> We may rely on Consent, Legal Obligations, or Vital Interests as our legal basis.</p>
            <p><strong className="text-foreground">If you are located in Canada:</strong> We may process your information with your express or implied consent, or in exceptional cases without consent as permitted by law.</p>
          </Section>

          <Section id="whoshare" title="4. When and With Whom Do We Share Your Information?">
            <p>We may share information in the following situations:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong className="text-foreground">Business Transfers.</strong> We may share or transfer your information in connection with any merger, sale of company assets, or acquisition of all or a portion of our business.</li>
            </ul>
          </Section>

          <Section id="cookies" title="5. Do We Use Cookies and Other Tracking Technologies?">
            <p>We may use cookies and similar tracking technologies to gather information when you interact with our Services. Some online tracking technologies help us maintain the security of our Services and your account, prevent crashes, fix bugs, save your preferences, and assist with basic site functions.</p>
            <p>Specific information about how we use such technologies and how you can refuse certain cookies is set out in our <a href="/cookie-policy" className="text-primary hover:underline">Cookie Policy</a>.</p>
          </Section>

          <Section id="inforetain" title="6. How Long Do We Keep Your Information?">
            <p>We will only keep your personal information for as long as it is necessary for the purposes set out in this Privacy Notice, unless a longer retention period is required or permitted by law.</p>
            <p>No purpose in this notice will require us keeping your personal information for longer than the period of time in which users have an account with us.</p>
            <p>When we have no ongoing legitimate business need to process your personal information, we will either delete or anonymise such information.</p>
          </Section>

          <Section id="infosafe" title="7. How Do We Keep Your Information Safe?">
            <p>We have implemented appropriate and reasonable technical and organisational security measures designed to protect the security of any personal information we process. However, no electronic transmission over the Internet can be guaranteed to be 100% secure.</p>
            <p>You should only access the Services within a secure environment.</p>
          </Section>

          <Section id="infominors" title="8. Do We Collect Information From Minors?">
            <p>We do not knowingly collect, solicit data from, or market to children under 18 years of age. By using the Services, you represent that you are at least 18 or that you are the parent or guardian of such a minor and consent to such minor dependent's use of the Services.</p>
            <p>If we learn that personal information from users less than 18 years of age has been collected, we will deactivate the account and take reasonable measures to promptly delete such data. If you become aware of any data we may have collected from children under age 18, please contact us at <a href="mailto:privacy@wecpitwall.com" className="text-primary hover:underline">privacy@wecpitwall.com</a>.</p>
          </Section>

          <Section id="privacyrights" title="9. What Are Your Privacy Rights?">
            <p>Depending on your state of residence in the US or in some regions such as the EEA, UK, Switzerland, and Canada, you have rights that allow you greater access to and control over your personal information.</p>
            <p>In some regions, you may have the right to: request access and obtain a copy of your personal information, request rectification or erasure, restrict the processing of your personal information, and data portability.</p>
            <p><strong className="text-foreground">Withdrawing consent:</strong> You have the right to withdraw your consent at any time by contacting us using the contact details provided in Section 13.</p>
            <p><strong className="text-foreground">Opting out of marketing:</strong> You can unsubscribe via the option available in Settings, or by contacting us directly.</p>
            <p><strong className="text-foreground">Account information:</strong> You can review or change information in your account settings at any time. Upon your request to terminate your account, we will deactivate or delete your account from our active databases.</p>
          </Section>

          <Section id="DNT" title="10. Controls for Do-Not-Track Features">
            <p>Most web browsers and some mobile operating systems include a Do-Not-Track feature or setting. At this stage, no uniform technology standard for recognising and implementing DNT signals has been finalised. As such, we do not currently respond to DNT browser signals.</p>
            <p>California law requires us to let you know how we respond to web browser DNT signals. Because there currently is not an industry or legal standard for recognising or honouring DNT signals, we do not respond to them at this time.</p>
          </Section>

          <Section id="uslaws" title="11. Do United States Residents Have Specific Privacy Rights?">
            <p>If you are a resident of California, Colorado, Connecticut, Delaware, Florida, Indiana, Iowa, Kentucky, Maryland, Minnesota, Montana, Nebraska, New Hampshire, New Jersey, Oregon, Rhode Island, Tennessee, Texas, Utah, or Virginia, you may have specific rights regarding your personal information.</p>
            <p>Rights may include: right to know, right to access, right to correct, right to request deletion, right to obtain a copy, right to non-discrimination, and right to opt out of the processing of personal data for targeted advertising.</p>
            <p>To exercise these rights, you may contact us at <a href="mailto:privacy@wecpitwall.com" className="text-primary hover:underline">privacy@wecpitwall.com</a> or via the <Link to="/settings" className="text-primary hover:underline">Settings page</Link>.</p>
            <p><strong className="text-foreground">Appeals:</strong> If we decline to take action regarding your request, you may appeal our decision by emailing us at <a href="mailto:privacy@wecpitwall.com" className="text-primary hover:underline">privacy@wecpitwall.com</a>.</p>
          </Section>

          <Section id="policyupdates" title="12. Do We Make Updates to This Notice?">
            <p>Yes, we will update this notice as necessary to stay compliant with relevant laws. The updated version will be indicated by an updated "Last updated" date at the top of this Privacy Notice.</p>
            <p>If we make material changes to this Privacy Notice, we may notify you either by prominently posting a notice or by directly sending you a notification.</p>
          </Section>

          <Section id="contact" title="13. How Can You Contact Us About This Notice?">
            <p>If you have questions or comments about this notice, you may contact us by email at:</p>
            <div className="glass-card p-4 mt-3">
              <p className="font-medium text-foreground">WEC Pitwall</p>
              <p>Email: <a href="mailto:privacy@wecpitwall.com" className="text-primary hover:underline">privacy@wecpitwall.com</a></p>
              <p>India</p>
            </div>
          </Section>

          <Section id="request" title="14. How Can You Review, Update, or Delete the Data We Collect From You?">
            <p>Based on the applicable laws of your country or state of residence, you may have the right to request access to the personal information we collect from you, correct inaccuracies, or delete your personal information.</p>
            <p>To exercise these rights, please contact us at <a href="mailto:privacy@wecpitwall.com" className="text-primary hover:underline">privacy@wecpitwall.com</a> or visit your account Settings page.</p>
          </Section>

        </motion.div>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
