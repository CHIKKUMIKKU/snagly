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
  const [topic, setTopic] = useState('License Key / Activation');
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
                <h2 className="font-display text-lg font-bold text-slate-950">1. Plans &amp; Billing</h2>
                <p>
                  <strong>Free Plan ($0):</strong> Each day you can download up to 5 single videos
                  or live recordings, queue 5 bulk videos, and trim 1 clip. Limits reset at your
                  local midnight. A free single download or bulk video that fails automatically
                  refunds your daily credit.
                </p>
                <p>
                  <strong>Pro Plan:</strong> Unlocks unlimited downloads, bulk queues, live stream
                  recordings, and segment trims, plus audio-only (.m4a) export, multi-track audio
                  muxing, scheduled downloads, Hide / Auto-lock / Panic Hide with PIN &amp; Decoy
                  PIN, local OPFS Private Vault, folders and tags, and MP4 metadata removal.
                </p>
                <p>
                  <strong>Pricing:</strong> $4.99 per month (recurring monthly subscription),
                  $44.99 per year (recurring annual subscription), or $74.99 one-time (lifetime
                  license). Payments and tax invoicing are processed by{' '}
                  <strong>{SITE_CONFIG.merchantOfRecord}</strong>, acting as Merchant of Record.
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
                    without notice. The Free plan exists so you can test Snagly on the websites you
                    care about <strong>before</strong> buying Pro. It is your responsibility to
                    verify compatibility before purchasing.
                  </p>
                </div>
              </section>

              <section className="space-y-2 border-t border-slate-100 pt-5">
                <h2 className="font-display text-lg font-bold text-slate-950">3. Refund Policy</h2>
                <ul className="list-disc space-y-1.5 pl-5">
                  <li>
                    No refund is given because Snagly does not work, or stops working, on a
                    particular website. The Free plan is provided so you can verify compatibility
                    first.
                  </li>
                  <li>
                    No refund is issued for change of mind, unused subscription time, or reaching
                    a third-party website&apos;s rate limits or access restrictions.
                  </li>
                  <li>
                    Recurring subscriptions can be cancelled anytime and stay active until the end
                    of the current paid period. Cancelling stops future renewals and does not refund
                    the current period.
                  </li>
                  <li>
                    If you were charged twice by mistake, or Pro could not be activated after a
                    successful payment and support cannot resolve it, contact{' '}
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
                  App, and Dodo Payments license verification.
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
                  Support &amp; Billing Inquiries:{' '}
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
                  Last updated: {SITE_CONFIG.lastUpdated} · Applies to purchases made for{' '}
                  {SITE_CONFIG.brandName} ({SITE_CONFIG.websiteUrl}) via{' '}
                  {SITE_CONFIG.merchantOfRecord}.
                </p>
              </div>

              <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-slate-800">
                <p className="font-semibold text-slate-950">Test with the Free Tier First</p>
                <p className="mt-1">
                  Snagly includes a daily Free plan (5 single downloads, 5 bulk downloads, and 1
                  trimmed clip per day) specifically so you can verify compatibility on your
                  preferred websites <strong>before</strong> upgrading to Pro ($4.99/mo,
                  $44.99/yr, or $74.99 one-time).
                </p>
              </div>

              <section className="space-y-2 border-t border-slate-100 pt-5">
                <h2 className="font-display text-lg font-bold text-slate-950">
                  Subscription Cancellations
                </h2>
                <p>
                  Monthly ($4.99/month) and Yearly ($44.99/year) subscriptions can be cancelled at
                  any time from your Dodo Payments customer receipt link or by emailing{' '}
                  <a
                    href={`mailto:${SITE_CONFIG.supportEmail}`}
                    className="font-semibold text-blue-700 underline"
                  >
                    {SITE_CONFIG.supportEmail}
                  </a>
                  . Cancelled subscriptions remain active through the end of the current paid
                  billing period and will not renew.
                </p>
              </section>

              <section className="space-y-2 border-t border-slate-100 pt-5">
                <h2 className="font-display text-lg font-bold text-slate-950">
                  Refund Eligibility Rules
                </h2>
                <ul className="list-disc space-y-2 pl-5">
                  <li>
                    <strong>Duplicate Charges or Activation Errors:</strong> If you were
                    accidentally charged twice, or if Pro features failed to unlock after payment
                    and our support team cannot resolve activation, we will issue a full refund
                    for the affected transaction.
                  </li>
                  <li>
                    <strong>Unsupported or DRM-Protected Websites:</strong> No refunds are granted
                    because Snagly does not work or stops working on a specific third-party
                    website. Snagly does not bypass DRM, and the Free tier is provided for testing
                    before purchase.
                  </li>
                  <li>
                    <strong>Change of Mind / Partial Period:</strong> No refunds are issued for
                    change of mind, unused subscription time after renewal, or third-party site
                    restrictions.
                  </li>
                  <li>
                    <strong>Statutory Consumer Rights:</strong> Where mandatory consumer protection
                    laws in your country require otherwise, your statutory rights continue to apply.
                  </li>
                </ul>
              </section>

              <section className="space-y-2 border-t border-slate-100 pt-5">
                <h2 className="font-display text-lg font-bold text-slate-950">
                  How to Request Billing Assistance
                </h2>
                <p>
                  Send your Dodo Payments order email or receipt ID to{' '}
                  <a
                    href={`mailto:${SITE_CONFIG.supportEmail}`}
                    className="font-mono font-semibold text-blue-700 underline"
                  >
                    {SITE_CONFIG.supportEmail}
                  </a>
                  . Billing and activation requests are handled directly by the developer.
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
                  2. Optional Local Companion App (CoApp) &amp; Phone Transfer
                </h2>
                <p>
                  If you explicitly opt in to the optional local Companion App for native FFmpeg
                  muxing or files exceeding browser memory limits, Snagly sends the chosen stream
                  URLs only to your own local loopback server at <code>127.0.0.1:48921</code>.
                  Local Wi-Fi phone transfer binds temporarily to local network ports{' '}
                  <code>48922–48930</code> on your machine and expires automatically.
                </p>
              </section>

              <section className="space-y-2 border-t border-slate-100 pt-5">
                <h2 className="font-display text-lg font-bold text-slate-950">
                  3. Pro License Validation &amp; Dodo Payments
                </h2>
                <p>
                  All payments, billing details, VAT/sales tax records, and customer invoices are
                  handled directly by <strong>{SITE_CONFIG.merchantOfRecord}</strong> as Merchant
                  of Record. Snagly never sees or stores your credit card number. When you activate
                  Snagly Pro, your license key is sent solely to Dodo Payments&apos; license
                  validation API (<code>live.dodopayments.com</code>) to verify status, and
                  re-checked roughly once every 24 hours.
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
                  Direct email support for Snagly ({SITE_CONFIG.domain}) license recovery, Dodo
                  Payments billing questions, and technical help.
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
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase">
                    Merchant of Record
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">
                    {SITE_CONFIG.merchantOfRecord} (Order Receipts &amp; Tax Invoices)
                  </p>
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
                      <option>License Key / Activation</option>
                      <option>Billing / Cancellation / Refund</option>
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
                      placeholder="Include your Dodo Payments receipt ID or Chrome version if applicable."
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
