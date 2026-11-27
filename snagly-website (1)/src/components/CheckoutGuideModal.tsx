import { CheckCircle2, ExternalLink, KeyRound, ShieldCheck, X } from 'lucide-react';
import { AppRoute, BillingCycle, SITE_CONFIG } from '../data/snaglyData';

export type ModalMode =
  | { type: 'install' }
  | { type: 'checkout'; plan: 'pro' | 'lifetime'; cycle: BillingCycle }
  | null;

interface CheckoutGuideModalProps {
  modal: ModalMode;
  onClose: () => void;
  onNavigate: (route: AppRoute, sectionId?: string) => void;
}

export function CheckoutGuideModal({ modal, onClose, onNavigate }: CheckoutGuideModalProps) {
  if (!modal) return null;

  const isInstall = modal.type === 'install';

  let planTitle = 'Snagly Free — Chrome Extension';
  let priceLabel = '$0 / forever';
  let checkoutHref: string = SITE_CONFIG.checkoutUrls.yearly;

  if (modal.type === 'checkout') {
    if (modal.plan === 'lifetime') {
      planTitle = 'Snagly Pro — Lifetime License';
      priceLabel = '$74.99 one-time';
      checkoutHref = SITE_CONFIG.checkoutUrls.lifetime;
    } else if (modal.cycle === 'monthly') {
      planTitle = 'Snagly Pro — Monthly Subscription';
      priceLabel = '$4.99 / month';
      checkoutHref = SITE_CONFIG.checkoutUrls.monthly;
    } else {
      planTitle = 'Snagly Pro — Yearly Subscription (Save 25%)';
      priceLabel = '$44.99 / year ($3.75/mo equivalent)';
      checkoutHref = SITE_CONFIG.checkoutUrls.yearly;
    }
  }

  const hasLiveCheckoutUrl = !checkoutHref.includes('PASTE_');

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-heading"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-xs"
    >
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-900 px-6 py-4 text-white">
          <div>
            <p className="text-[11px] font-semibold tracking-wider text-amber-300 uppercase">
              {isInstall ? `Chrome Extension v${SITE_CONFIG.version}` : 'Dodo Payments Checkout'}
            </p>
            <h3 id="modal-heading" className="font-display text-lg font-bold">
              {planTitle}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="cursor-pointer rounded-lg p-1.5 text-slate-300 hover:bg-slate-800 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4 p-6 text-sm text-slate-700">
          {isInstall ? (
            <>
              <p>
                Install <strong>{SITE_CONFIG.fullTitle}</strong> in Google Chrome to start using
                your daily Free tier (5 downloads, 5 bulk videos, and 1 clip trim per day).
              </p>

              <div className="space-y-2 rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs leading-relaxed">
                <p className="font-semibold text-slate-900">How to get started:</p>
                <ol className="list-decimal space-y-1.5 pl-4 text-slate-700">
                  <li>Open Google Chrome (version 116 or newer) and install the Snagly extension.</li>
                  <li>
                    Pin Snagly to your toolbar or press <code className="font-mono">Alt+Shift+D</code>{' '}
                    to open the Side Panel.
                  </li>
                  <li>
                    Verify stream detection &amp; downloads on your websites using the Free tier
                    before upgrading to Pro.
                  </li>
                </ol>
              </div>

              <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="cursor-pointer rounded-lg border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Close
                </button>
                <a
                  href={SITE_CONFIG.chromeStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700"
                >
                  Open Chrome Web Store
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                <span className="text-xs font-medium text-slate-600">Selected Plan</span>
                <span className="font-display text-sm font-bold text-slate-950 tabular-nums">
                  {priceLabel}
                </span>
              </div>

              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-start gap-2">
                  <KeyRound className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
                  <span>
                    <strong>Instant License Key:</strong> Dodo Payments emails your Pro activation
                    key immediately after payment. Paste it inside Snagly Settings to unlock Pro.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                  <span>
                    <strong>Merchant of Record:</strong> Billed securely by{' '}
                    {SITE_CONFIG.merchantOfRecord}. Taxes and receipts are handled automatically.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
                  <span>
                    <strong>Pre-purchase Check:</strong> Remember to verify site compatibility with
                    Snagly Free first. See our{' '}
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onNavigate('/refund-policy');
                      }}
                      className="cursor-pointer font-semibold text-blue-700 underline"
                    >
                      Refund Policy
                    </button>
                    .
                  </span>
                </li>
              </ul>

              {!hasLiveCheckoutUrl && (
                <div className="rounded-xl border border-blue-200 bg-blue-50 p-3.5 text-xs leading-relaxed text-slate-700">
                  <strong className="text-slate-950">Checkout Launching Soon:</strong> Paid Pro
                  licensing via Dodo Payments is currently being finalized. In the meantime, you
                  can install Snagly Free from the Chrome Web Store to test it right away.
                </div>
              )}

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-3">
                <a
                  href={`mailto:${SITE_CONFIG.supportEmail}`}
                  className="text-xs font-medium text-slate-600 underline hover:text-slate-950"
                >
                  Questions? {SITE_CONFIG.supportEmail}
                </a>
                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={onClose}
                    className="cursor-pointer rounded-lg border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Close
                  </button>
                  {hasLiveCheckoutUrl ? (
                    <a
                      href={checkoutHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700"
                    >
                      Continue to Dodo Checkout
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  ) : (
                    <a
                      href={SITE_CONFIG.chromeStoreUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700"
                    >
                      Install Free in Chrome
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
