import SEOHead from '@/components/SEOHead';
import Header from '@/components/Header';

const termsHTML = `
<style>
  .terms-body { font-family: Arial, sans-serif; font-size: 14px; color: #595959; line-height: 1.6; }
  .terms-body h1 { font-size: 26px; color: #000; font-weight: bold; }
  .terms-body h2 { font-size: 17px; color: #000; font-weight: bold; margin-top: 24px; }
  .terms-body a { color: #3030F1; }
  .terms-body ul { list-style-type: disc; padding-left: 20px; }
  .terms-body li { margin-bottom: 8px; }
  .terms-body p { margin-bottom: 12px; }
  .terms-body .caps { text-transform: uppercase; }
</style>
<div class="terms-body">
  <h1>TERMS OF USE</h1>
  <p><strong>Last updated May 03, 2026</strong></p>

  <h2>AGREEMENT TO OUR LEGAL TERMS</h2>
  <p>We are <strong>WEC Pitwall</strong> ("Company," "we," "us," "our").</p>
  <p>We operate <a href="https://wec-pitwall.vercel.app" target="_blank">https://wec-pitwall.vercel.app</a>, as well as any other related products and services that refer or link to these legal terms (the "Legal Terms") (collectively, the "Services").</p>
  <p>You can contact us by email at <a href="mailto:privacy@wecpitwall.com">privacy@wecpitwall.com</a>.</p>
  <p>These Legal Terms constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you"), and WEC Pitwall, concerning your access to and use of the Services. You agree that by accessing the Services, you have read, understood, and agreed to be bound by all of these Legal Terms. IF YOU DO NOT AGREE WITH ALL OF THESE LEGAL TERMS, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE SERVICES AND YOU MUST DISCONTINUE USE IMMEDIATELY.</p>
  <p>Supplemental terms and conditions or documents that may be posted on the Services from time to time are hereby expressly incorporated herein by reference. We reserve the right, in our sole discretion, to make changes or modifications to these Legal Terms at any time and for any reason. We will alert you about any changes by updating the "Last updated" date of these Legal Terms. It is your responsibility to periodically review these Legal Terms to stay informed of updates.</p>
  <p>We recommend that you print a copy of these Legal Terms for your records.</p>

  <h2>TABLE OF CONTENTS</h2>
    <ol>
    <li><a href="#section-1" style="color:#E8002D;">OUR SERVICES</a></li>
    <li><a href="#section-2" style="color:#E8002D;">INTELLECTUAL PROPERTY RIGHTS</a></li>
    <li><a href="#section-3" style="color:#E8002D;">USER REPRESENTATIONS</a></li>
    <li><a href="#section-4" style="color:#E8002D;">PROHIBITED ACTIVITIES</a></li>
    <li><a href="#section-5" style="color:#E8002D;">USER GENERATED CONTRIBUTIONS</a></li>
    <li><a href="#section-6" style="color:#E8002D;">CONTRIBUTION LICENSE</a></li>
    <li><a href="#section-7" style="color:#E8002D;">SERVICES MANAGEMENT</a></li>
    <li><a href="#section-8" style="color:#E8002D;">TERM AND TERMINATION</a></li>
    <li><a href="#section-9" style="color:#E8002D;">MODIFICATIONS AND INTERRUPTIONS</a></li>
    <li><a href="#section-10" style="color:#E8002D;">GOVERNING LAW</a></li>
    <li><a href="#section-11" style="color:#E8002D;">DISPUTE RESOLUTION</a></li>
    <li><a href="#section-12" style="color:#E8002D;">CORRECTIONS</a></li>
    <li><a href="#section-13" style="color:#E8002D;">DISCLAIMER</a></li>
    <li><a href="#section-14" style="color:#E8002D;">LIMITATIONS OF LIABILITY</a></li>
    <li><a href="#section-15" style="color:#E8002D;">INDEMNIFICATION</a></li>
    <li><a href="#section-16" style="color:#E8002D;">USER DATA</a></li>
    <li><a href="#section-17" style="color:#E8002D;">ELECTRONIC COMMUNICATIONS, TRANSACTIONS, AND SIGNATURES</a></li>
    <li><a href="#section-18" style="color:#E8002D;">MISCELLANEOUS</a></li>
    <li><a href="#section-19" style="color:#E8002D;">CONTACT US</a></li>
  </ol>

  <h2 id="section-1">1. OUR SERVICES</h2>
  <p>The information provided when using the Services is not intended for distribution to or use by any person or entity in any jurisdiction or country where such distribution or use would be contrary to law or regulation or which would subject us to any registration requirement within such jurisdiction or country. Accordingly, those persons who choose to access the Services from other locations do so on their own initiative and are solely responsible for compliance with local laws, if and to the extent local laws are applicable.</p>

  <h2 id="section-2">2. INTELLECTUAL PROPERTY RIGHTS</h2>
  <p><strong>Our intellectual property</strong></p>
  <p>We are the owner or the licensee of all intellectual property rights in our Services, including all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics in the Services (collectively, the "Content"), as well as the trademarks, service marks, and logos contained therein (the "Marks"). Our Content and Marks are protected by copyright and trademark laws and treaties around the world. The Content and Marks are provided in or through the Services "AS IS" for your personal, non-commercial use only.</p>
  <p><strong>Your use of our Services</strong></p>
  <p>Subject to your compliance with these Legal Terms, we grant you a non-exclusive, non-transferable, revocable license to access the Services and download or print a copy of any portion of the Content to which you have properly gained access, solely for your personal, non-commercial use.</p>
  <p>Except as set out in this section, no part of the Services and no Content or Marks may be copied, reproduced, aggregated, republished, uploaded, posted, publicly displayed, encoded, translated, transmitted, distributed, sold, licensed, or otherwise exploited for any commercial purpose whatsoever, without our express prior written permission.</p>
  <p>If you wish to make any use of the Services, Content, or Marks other than as set out in this section, please address your request to: <a href="mailto:privacy@wecpitwall.com">privacy@wecpitwall.com</a>.</p>

  <h2 id="section-3">3. USER REPRESENTATIONS</h2>
  <p>By using the Services, you represent and warrant that: (1) you have the legal capacity and you agree to comply with these Legal Terms; (2) you are not a minor in the jurisdiction in which you reside; (3) you will not access the Services through automated or non-human means, whether through a bot, script or otherwise; (4) you will not use the Services for any illegal or unauthorized purpose; and (5) your use of the Services will not violate any applicable law or regulation.</p>

  <h2 id="section-4">4. PROHIBITED ACTIVITIES</h2>
  <p>You may not access or use the Services for any purpose other than that for which we make the Services available. As a user of the Services, you agree not to:</p>
  <ul>
    <li>Systematically retrieve data or other content from the Services to create or compile a collection, compilation, database, or directory without written permission from us.</li>
    <li>Trick, defraud, or mislead us and other users, especially in any attempt to learn sensitive account information such as user passwords.</li>
    <li>Circumvent, disable, or otherwise interfere with security-related features of the Services.</li>
    <li>Use any information obtained from the Services in order to harass, abuse, or harm another person.</li>
    <li>Use the Services in a manner inconsistent with any applicable laws or regulations.</li>
    <li>Engage in any automated use of the system, such as using scripts to send comments or messages, or using any data mining, robots, or similar data gathering and extraction tools.</li>
    <li>Attempt to impersonate another user or person or use the username of another user.</li>
    <li>Interfere with, disrupt, or create an undue burden on the Services or the networks or services connected to the Services.</li>
    <li>Except as permitted by applicable law, decipher, decompile, disassemble, or reverse engineer any of the software comprising or in any way making up a part of the Services.</li>
    <li>Use the Services as part of any effort to compete with us or otherwise use the Services and/or the Content for any revenue-generating endeavor or commercial enterprise.</li>
  </ul>

  <h2 id="section-5">5. USER GENERATED CONTRIBUTIONS</h2>
  <p>The Services does not currently offer users the ability to submit or post public content. We may provide you with the opportunity to do so in the future, subject to these Legal Terms.</p>

  <h2 id="section-6">6. CONTRIBUTION LICENSE</h2>
  <p>You and WEC Pitwall agree that we may access, store, process, and use any information and personal data that you provide and your choices (including settings). By submitting suggestions or other feedback regarding the Services, you agree that we can use and share such feedback for any purpose without compensation to you. We do not assert any ownership over your Contributions. You retain full ownership of all of your Contributions and any intellectual property rights or other proprietary rights associated with your Contributions.</p>

  <h2 id="section-7">7. SERVICES MANAGEMENT</h2>
  <p>We reserve the right, but not the obligation, to: (1) monitor the Services for violations of these Legal Terms; (2) take appropriate legal action against anyone who violates the law or these Legal Terms; (3) in our sole discretion and without limitation, refuse, restrict access to, limit the availability of, or disable any of your Contributions or any portion thereof; and (4) otherwise manage the Services in a manner designed to protect our rights and property and to facilitate the proper functioning of the Services.</p>

  <h2 id="section-8">8. TERM AND TERMINATION</h2>
  <p>These Legal Terms shall remain in full force and effect while you use the Services. WITHOUT LIMITING ANY OTHER PROVISION OF THESE LEGAL TERMS, WE RESERVE THE RIGHT TO, IN OUR SOLE DISCRETION AND WITHOUT NOTICE OR LIABILITY, DENY ACCESS TO AND USE OF THE SERVICES TO ANY PERSON FOR ANY REASON OR FOR NO REASON, INCLUDING WITHOUT LIMITATION FOR BREACH OF ANY REPRESENTATION, WARRANTY, OR COVENANT CONTAINED IN THESE LEGAL TERMS OR OF ANY APPLICABLE LAW OR REGULATION.</p>

  <h2 id="section-9">9. MODIFICATIONS AND INTERRUPTIONS</h2>
  <p>We reserve the right to change, modify, or remove the contents of the Services at any time or for any reason at our sole discretion without notice. We cannot guarantee the Services will be available at all times. We reserve the right to change, revise, update, suspend, discontinue, or otherwise modify the Services at any time or for any reason without notice to you.</p>

  <h2 id="section-10">10. GOVERNING LAW</h2>
  <p>These Legal Terms shall be governed by and defined following the laws of India. WEC Pitwall and yourself irrevocably consent that the courts of India shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these Legal Terms.</p>

  <h2 id="section-11">11. DISPUTE RESOLUTION</h2>
  <p><strong>Informal Negotiations:</strong> To expedite resolution and control the cost of any dispute, the Parties agree to first attempt to negotiate any Dispute informally for at least 30 days before initiating arbitration. Such informal negotiations commence upon written notice from one Party to the other Party.</p>
  <p><strong>Binding Arbitration:</strong> Any dispute arising out of or in connection with these Legal Terms, including any question regarding its existence, validity, or termination, shall be referred to and finally resolved by the International Commercial Arbitration Court under the European Arbitration Chamber (Belgium, Brussels, Avenue Louise, 146) according to the Rules of this ICAC. The number of arbitrators shall be 1. The seat, or legal place, of arbitration shall be India. The language of the proceedings shall be English. The governing law of these Legal Terms shall be the substantive law of India.</p>
  <p><strong>Restrictions:</strong> The Parties agree that any arbitration shall be limited to the Dispute between the Parties individually. No arbitration shall be joined with any other proceeding; there is no right or authority for any Dispute to be arbitrated on a class-action basis.</p>

  <h2 id="section-12">12. CORRECTIONS</h2>
  <p>There may be information on the Services that contains typographical errors, inaccuracies, or omissions. We reserve the right to correct any errors, inaccuracies, or omissions and to change or update the information on the Services at any time, without prior notice.</p>

  <h2 id="section-13">13. DISCLAIMER</h2>
  <p>THE SERVICES ARE PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU AGREE THAT YOUR USE OF THE SERVICES WILL BE AT YOUR SOLE RISK. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, IN CONNECTION WITH THE SERVICES AND YOUR USE THEREOF, INCLUDING, WITHOUT LIMITATION, THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.</p>

  <h2 id="section-14">14. LIMITATIONS OF LIABILITY</h2>
  <p>IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFIT, LOST REVENUE, LOSS OF DATA, OR OTHER DAMAGES ARISING FROM YOUR USE OF THE SERVICES, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.</p>

  <h2 id="section-15">15. INDEMNIFICATION</h2>
  <p>You agree to defend, indemnify, and hold us harmless, including our subsidiaries, affiliates, and all of our respective officers, agents, partners, and employees, from and against any loss, damage, liability, claim, or demand, including reasonable attorneys' fees and expenses, made by any third party due to or arising out of: (1) use of the Services; (2) breach of these Legal Terms; (3) any breach of your representations and warranties set forth in these Legal Terms; (4) your violation of the rights of a third party, including but not limited to intellectual property rights; or (5) any overt harmful act toward any other user of the Services.</p>

  <h2 id="section-16">16. USER DATA</h2>
  <p>We will maintain certain data that you transmit to the Services for the purpose of managing the performance of the Services, as well as data relating to your use of the Services. Although we perform regular routine backups of data, you are solely responsible for all data that you transmit or that relates to any activity you have undertaken using the Services.</p>

  <h2 id="section-17">17. ELECTRONIC COMMUNICATIONS, TRANSACTIONS, AND SIGNATURES</h2>
  <p>Visiting the Services, sending us emails, and completing online forms constitute electronic communications. You consent to receive electronic communications, and you agree that all agreements, notices, disclosures, and other communications we provide to you electronically satisfy any legal requirement that such communication be in writing.</p>

  <h2 id="section-18">18. MISCELLANEOUS</h2>
  <p>These Legal Terms and any policies or operating rules posted by us on the Services constitute the entire agreement and understanding between you and us. Our failure to exercise or enforce any right or provision of these Legal Terms shall not operate as a waiver of such right or provision. If any provision or part of a provision of these Legal Terms is determined to be unlawful, void, or unenforceable, that provision or part of the provision is deemed severable from these Legal Terms and does not affect the validity and enforceability of any remaining provisions.</p>

  <h2 id="section-19">19. CONTACT US</h2>
  <p>In order to resolve a complaint regarding the Services or to receive further information regarding use of the Services, please contact us at:</p>
  <p><strong>WEC Pitwall</strong><br/>Email: <a href="mailto:privacy@wecpitwall.com">privacy@wecpitwall.com</a></p>
</div>
`;

export default function Terms() {
  return (
    <>
      <SEOHead
        title="Terms of Use — WEC Pitwall"
        description="Terms of Use for WEC Pitwall analytics platform."
      />
      <Header />
      <div className="min-h-screen bg-background px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <div
            className="glass-card p-8 legal-content"
            dangerouslySetInnerHTML={{ __html: termsHTML }}
          />
        </div>
      </div>
    </>
  );
}
