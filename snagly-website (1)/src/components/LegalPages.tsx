import { ArrowLeft, CheckCircle2, Mail } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { AppRoute, SITE_CONFIG } from '../data/snaglyData';

interface LegalPagesProps {
  route: '/terms' | '/refund-policy' | '/privacy' | '/contact';
  onNavigate: (route: AppRoute, sectionId?: string) => void;
}

export function LegalPages({ route, onNavigate }: LegalPagesProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('General Product Question');
  const [message, setMessage] = useState('');
  const [formError, setFormError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmedEmail = email.trim();
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail);

    if (!name.trim()) {
      setFormError('Please enter your name.');
      return;
    }
    if (!emailValid) {
      setFormError('Please enter a valid email address so we can reply.');
      return;
    }
    if (message.trim().length < 10) {
      setFormError('Please describe your question or order details (at least 10 characters).');
      return;
    }

    setFormError('');
    setSubmitted(true);
  };

  const mailtoBody = encodeURIComponent(
    `Name: ${name}\nReply Email: ${email}\nTopic: ${topic}\n\n${message}`
  );
  const mailtoHref = `mailto:${SITE_CONFIG.supportEmail}?subject=${encodeURIComponent(
    `[Snagly Support] ${topic}`
  )}&body=${mailtoBody}`;

  return (
    <main className="min-h-[75vh] bg-slate-50/60 py-12 sm:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Back & Policy Sub-Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <button
            type="button"
            onClick={() => onNavigate('/')}
            className="inline-flex cursor-pointer items-center gap-1.5 text-sm font-semibold text-slate-700 hover:text-slate-950"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to {SITE_CONFIG.domain}
          </button>

          <div className="flex flex-wrap gap-2">
            {(
              [
                { path: '/terms', label: 'Terms of Service' },
                { path: '/refund-policy', label: 'Refund Policy' },
                { path: '/privacy', label: 'Privacy Policy' },
                { path: '/contact', label: 'Support & Contact' },
              ] as const
            ).map((tab) => {
              const active = route === tab.path;
              return (
                <button
                  key={tab.path}
                  type="button"
                  onClick={() => onNavigate(tab.path)}
                  className={`cursor-pointer rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                    active
                      ? 'bg-slate-900 text-white'
                      : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Document Card */}
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs sm:p-10">
          {route === '/terms' && (
            <article className="space-y-6 text-sm leading-relaxed text-slate-700">
              <div>
                <p className="text-xs font-semibold tracking-wider text-blue-700 uppercase">
                  Legal Documentation
                </p>
                <h1 className="font-display mt-2 text-3xl font-extrabold tracking-tight text-slate-950">
                  Snagly Terms of Service
                </h1>
                <p className="mt-2 text-xs text-slate-500">
                  Last updated: {SITE_CONFIG.lastUpdated}. Applies to{' '}
                  <strong>{SITE_CONFIG.fullTitle}</strong> and {SITE_CONFIG.websiteUrl}{' '}
                  (&ldquo;Snagly&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;).
                </p>
              </div>

              <section className="space-y-2 border-t border-slate-100 pt-5">
                <h2 className="font-display text-lg font-bold text-slate-950">1. Current Availability</h2>
                <p>
                  The currently released version of Snagly is available at no charge. All features
                  included in the current public release can be used without a subscription, payment,
                  or license key. No paid plan is currently offered and no payment is being accepted.
                </p>
                <p>
                  Snagly Pro is a planned future offering. It is not currently available to purchase
                  or activate. Any future pricing, feature limits, or billing terms will be published
                  before Pro becomes available and will apply only after they are formally announced.
                </p>
              </section>

              <section className="space-y-3 border-t border-slate-100 pt-5">
                <h2 className="font-display text-lg font-bold text-slate-950">
                  2. Snagly Does Not Work on Every Website
                </h2>
                <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-slate-800">
                  <p>
                    <strong>Snagly does not claim to work on all websites.</strong> Many websites
                    use DRM encryption (such as Widevine, FairPlay, or PlayReady) or restricted
                    streaming protocols that no browser extension can save, and websites change
                    without notice. The current release is available at no charge so you can check
                    compatibility on the websites you use. It is your responsibility to verify
                    compatibility on each website.
                  </p>
                </div>
              </section>

              <section className="space-y-2 border-t border-slate-100 pt-5">
                <h2 className="font-display text-lg font-bold text-slate-950">3. Refund Policy</h2>
                <ul className="list-disc space-y-1.5 pl-5">
                  <li>
                    No refund is given because Snagly does not work, or stops working, on a
                    particular website. Please verify compatibility on the websites you use.
                  </li>
                  <li>
                    No purchase is currently offered, so there are no subscription charges or paid
                    periods to cancel at this time.
                  </li>
                  <li>
                    If paid plans are introduced in the future, their cancellation terms will be
                    published before checkout is enabled.
                  </li>
                  <li>
                    If you have a billing-related question about a past transaction, contact{' '}
                    <a
                      href={`mailto:${SITE_CONFIG.supportEmail}`}
                      className="font-semibold text-blue-700 underline"
                    >
                      {SITE_CONFIG.supportEmail}
                    </a>{' '}
                    for a prompt resolution, including a refund where appropriate. Where required by
                    law in your jurisdiction, statutory consumer rights still apply.
                  </li>
                </ul>
              </section>

              <section className="space-y-2 border-t border-slate-100 pt-5">
                <h2 className="font-display text-lg font-bold text-slate-950">
                  4. Acceptable Use &amp; Copyright Responsibility
                </h2>
                <p>
                  Only download content you own or have explicit permission to save. You are solely
                  responsible for following the terms of the websites you visit and the copyright
                  laws that apply in your jurisdiction. Snagly does not host, store, index, or
                  distribute any video content, and does not bypass DRM.
                </p>
              </section>

              <section className="space-y-2 border-t border-slate-100 pt-5">
                <h2 className="font-display text-lg font-bold text-slate-950">
                  5. Privacy &amp; Local Processing
                </h2>
                <p>
                  Snagly executes locally in your Chrome browser. See our full{' '}
                  <button
                    type="button"
                    onClick={() => onNavigate('/privacy')}
                    className="cursor-pointer font-semibold text-blue-700 underline"
                  >
                    Privacy Policy
                  </button>{' '}
                  for details on OPFS vault storage, the optional <code>127.0.0.1</code> Companion
                  App and future product availability.
                </p>
              </section>

              <section className="space-y-2 border-t border-slate-100 pt-5">
                <h2 className="font-display text-lg font-bold text-slate-950">6. No Warranty</h2>
                <p>
                  Snagly is provided &ldquo;as is&rdquo;, without warranty of any kind, express or
                  implied. To the fullest extent permitted by law, we are not liable for any loss
                  arising from use of the extension or website.
                </p>
              </section>

              <section className="space-y-2 border-t border-slate-100 pt-5">
                <h2 className="font-display text-lg font-bold text-slate-950">7. Contact</h2>
                <p>
                  Support &amp; Product Questions:{' '}
                  <a
                    href={`mailto:${SITE_CONFIG.supportEmail}`}
                    className="font-mono font-semibold text-blue-700 underline"
                  >
                    {SITE_CONFIG.supportEmail}
                  </a>{' '}
                  ({SITE_CONFIG.websiteUrl})
                </p>
              </section>
            </article>
          )}

          {route === '/refund-policy' && (
            <article className="space-y-6 text-sm leading-relaxed text-slate-700">
              <div>
                <p className="text-xs font-semibold tracking-wider text-blue-700 uppercase">
                  Billing &amp; Cancellations
                </p>
                <h1 className="font-display mt-2 text-3xl font-extrabold tracking-tight text-slate-950">
                  Snagly Refund &amp; Cancellation Policy
                </h1>
                <p className="mt-2 text-xs text-slate-500">
                  Last updated: {SITE_CONFIG.lastUpdated} · Applies to {SITE_CONFIG.brandName} at{' '}
                  {SITE_CONFIG.websiteUrl}.
                </p>
              </div>

              <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-slate-800">
                <p className="font-semibold text-slate-950">No paid plan is currently available</p>
                <p className="mt-1">
                  The currently released Snagly extension is available at no charge. Pro is planned
                  for a future release and cannot currently be purchased or activated. No subscription
                  or payment is being collected through this website at this time.
                </p>
              </div>

              <section className="space-y-2 border-t border-slate-100 pt-5">
                <h2 className="font-display text-lg font-bold text-slate-950">
                  Subscription Cancellations
                </h2>
                <p>
                  Snagly does not currently offer paid subscriptions, so there is no active Snagly
                  subscription to cancel. If you have a question about a previous transaction, email{' '}
                  <a
                    href={`mailto:${SITE_CONFIG.supportEmail}`}
                    className="font-semibold text-blue-700 underline"
                  >
                    {SITE_CONFIG.supportEmail}
                  </a>
                  . Any future subscription cancellation process will be explained before paid checkout
                  becomes available.
                </p>
              </section>

              <section className="space-y-2 border-t border-slate-100 pt-5">
                <h2 className="font-display text-lg font-bold text-slate-950">
                  Refund Eligibility Rules
                </h2>
                <ul className="list-disc space-y-2 pl-5">
                  <li>
                    <strong>Current availability:</strong> No paid Snagly plan or checkout is currently
                    available. If you believe a charge was made in error, contact support with the
                    transaction details so it can be reviewed.
                  </li>
                  <li>
                    <strong>Unsupported or DRM-Protected Websites:</strong> No refunds are granted
                    because Snagly does not work or stops working on a specific third-party
                    website. Snagly does not bypass DRM.
                  </li>
                  <li>
                    <strong>Future paid plans:</strong> If paid plans are introduced, applicable refund
                    and cancellation terms will be published before purchases are accepted.
                  </li>
                  <li>
                    <strong>Statutory Consumer Rights:</strong> Where mandatory consumer protection
                    laws in your country require otherwise, your statutory rights continue to apply.
                  </li>
                </ul>
              </section>

              <section className="space-y-2 border-t border-slate-100 pt-5">
                <h2 className="font-display text-lg font-bold text-slate-950">
                  How to Contact Support
                </h2>
                <p>
                  Send any relevant transaction reference to{' '}
                  <a
                    href={`mailto:${SITE_CONFIG.supportEmail}`}
                    className="font-mono font-semibold text-blue-700 underline"
                  >
                    {SITE_CONFIG.supportEmail}
                  </a>
                  . Product and technical support requests are handled directly by the developer.
                </p>
              </section>
            </article>
          )}

          {route === '/privacy' && (
            <article className="space-y-6 text-sm leading-relaxed text-slate-700">
              <div>
                <p className="text-xs font-semibold tracking-wider text-blue-700 uppercase">
                  Data &amp; Local Storage
                </p>
                <h1 className="font-display mt-2 text-3xl font-extrabold tracking-tight text-slate-950">
                  Snagly Privacy Policy
                </h1>
                <p className="mt-2 text-xs text-slate-500">
                  Last updated: {SITE_CONFIG.lastUpdated} · Website: {SITE_CONFIG.websiteUrl} ·
                  Contact: {SITE_CONFIG.supportEmail}
                </p>
              </div>

              <section className="space-y-2 border-t border-slate-100 pt-5">
                <h2 className="font-display text-lg font-bold text-slate-950">
                  1. Local-First Browser Execution
                </h2>
                <p>
                  Snagly runs locally inside your Chrome browser. Detected stream metadata, active
                  downloads, bookmark folders, naming rules, Private Vault media (Origin Private
                  File System / OPFS), and your PIN / Decoy PIN remain strictly on your local
                  device. We do not collect, log, or sell your browsing history or downloaded files.
                </p>
              </section>

              <section className="space-y-2 border-t border-slate-100 pt-5">
                <h2 className="font-display text-lg font-bold text-slate-950">
                  2. Local WASM Processing &amp; Zero-CLI Phone QR Transfer
                </h2>
                <p>
                  Stream parsing, 16:9 / 9:16 cropping, subtitle translation and burn-in, and H.264
                  MP4 conversion run locally inside your Chrome browser using WebAssembly. When you
                  use Send to Phone for a saved Vault or computer file, data chunks stream directly
                  browser-to-browser to <code>snagly.video/receive.html</code> over local Wi-Fi
                  without storing or uploading video files to Snagly servers.
                </p>
              </section>

              <section className="space-y-2 border-t border-slate-100 pt-5">
                <h2 className="font-display text-lg font-bold text-slate-950">
                  3. Future Pro Availability
                </h2>
                <p>
                  Snagly Pro is planned for a future release and is not currently available to
                  purchase or activate. No Pro payment processing or license validation is active
                  at this time. If this changes, the relevant service providers and data practices
                  will be described here before the feature is released.
                </p>
              </section>

              <section className="space-y-2 border-t border-slate-100 pt-5">
                <h2 className="font-display text-lg font-bold text-slate-950">
                  4. Optional Cloud Integrations
                </h2>
                <p>
                  If you choose to upload saved videos directly to Google Drive, Dropbox, OneDrive,
                  or pCloud, file transfers occur directly between your browser session and your
                  chosen storage provider using standard OAuth authorization that you trigger.
                </p>
              </section>

              <section className="space-y-2 border-t border-slate-100 pt-5">
                <h2 className="font-display text-lg font-bold text-slate-950">5. Contact</h2>
                <p>
                  Privacy inquiries may be sent anytime to{' '}
                  <a
                    href={`mailto:${SITE_CONFIG.supportEmail}`}
                    className="font-mono font-semibold text-blue-700 underline"
                  >
                    {SITE_CONFIG.supportEmail}
                  </a>
                  .
                </p>
              </section>
            </article>
          )}

          {route === '/contact' && (
            <div className="space-y-8">
              <div>
                <p className="text-xs font-semibold tracking-wider text-blue-700 uppercase">
                  Customer Support
                </p>
                <h1 className="font-display mt-2 text-3xl font-extrabold tracking-tight text-slate-950">
                  Support &amp; Contact
                </h1>
                <p className="mt-2 text-sm text-slate-600">
                  Direct email support for Snagly ({SITE_CONFIG.domain}) installation, privacy,
                  compatibility, and technical questions.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 rounded-xl border border-slate-200 bg-slate-50 p-5 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase">Support Email</p>
                  <a
                    href={`mailto:${SITE_CONFIG.supportEmail}`}
                    className="mt-1 inline-flex items-center gap-2 font-mono text-sm font-bold text-blue-700 underline underline-offset-4"
                  >
                    <Mail className="h-4 w-4" />
                    {SITE_CONFIG.supportEmail}
                  </a>
                </div>

              </div>

              {submitted ? (
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                    <div>
                      <h2 className="font-display text-base font-bold text-slate-950">
                        Message prepared for {SITE_CONFIG.supportEmail}
                      </h2>
                      <p className="mt-1 text-sm text-slate-700">
                        Click below to launch your default email client with your pre-filled
                        support message, or email{' '}
                        <span className="font-mono font-semibold">{SITE_CONFIG.supportEmail}</span>{' '}
                        directly from your inbox.
                      </p>
                      <div className="mt-4 flex flex-wrap gap-3">
                        <a
                          href={mailtoHref}
                          className="inline-flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2 text-xs font-semibold text-white hover:bg-orange-600"
                        >
                          Open Email Client
                        </a>
                        <button
                          type="button"
                          onClick={() => setSubmitted(false)}
                          className="cursor-pointer rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                        >
                          Edit Message
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} noValidate className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-xs font-semibold text-slate-800"
                      >
                        Your Name
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Alex Morgan"
                        className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-blue-600 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-xs font-semibold text-slate-800"
                      >
                        Your Email
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-blue-600 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-topic"
                      className="block text-xs font-semibold text-slate-800"
                    >
                      Topic
                    </label>
                    <select
                      id="contact-topic"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-blue-600 focus:outline-none"
                    >
                      <option>General Product Question</option>
                      <option>Product / Technical Support</option>
                      <option>Extension Support / Bug Report</option>
                      <option>Local Companion App (CoApp)</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-xs font-semibold text-slate-800"
                    >
                      Details
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Include your Chrome version and a description of the issue."
                      className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-blue-600 focus:outline-none"
                    />
                  </div>

                  {formError && (
                    <p role="alert" className="text-xs font-semibold text-red-600">
                      {formError}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="cursor-pointer rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-600"
                  >
                    Prepare Support Email
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
