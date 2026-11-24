import { AppRoute, SITE_CONFIG } from '../data/snaglyData';
import { SnaglyLogo } from './SnaglyLogo';

interface FooterProps {
  onNavigate: (route: AppRoute, sectionId?: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          {/* Brand & Merchant Disclosure */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5 text-white">
              <SnaglyLogo className="h-8 w-8" />
              <span className="font-display text-xl font-bold tracking-tight">
                {SITE_CONFIG.brandName}
              </span>
            </div>
            <p className="mt-3 max-w-sm text-xs leading-relaxed text-slate-400">
              {SITE_CONFIG.fullTitle} (v{SITE_CONFIG.version}). Client-side Chrome browser utility
              for standard unencrypted web video streams. Official website:{' '}
              <span className="text-slate-200">{SITE_CONFIG.domain}</span>.
            </p>
            <p className="mt-3 text-xs leading-relaxed text-slate-400">
              Payments and license fulfillment are processed by{' '}
              <span className="font-medium text-slate-200">{SITE_CONFIG.merchantOfRecord}</span>,
              acting as Merchant of Record.
            </p>
          </div>

          {/* Product Navigation */}
          <div className="md:col-span-2">
            <h4 className="font-display text-xs font-bold tracking-wider text-white uppercase">
              Product
            </h4>
            <ul className="mt-4 space-y-2.5 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/', 'features')}
                  className="cursor-pointer hover:text-white"
                >
                  Features
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/', 'pricing')}
                  className="cursor-pointer hover:text-white"
                >
                  Pricing
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/', 'how-it-works')}
                  className="cursor-pointer hover:text-white"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/', 'faq')}
                  className="cursor-pointer hover:text-white"
                >
                  FAQ
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Compliance Links (Required for Dodo Payments verification) */}
          <div className="md:col-span-2">
            <h4 className="font-display text-xs font-bold tracking-wider text-white uppercase">
              Legal
            </h4>
            <ul className="mt-4 space-y-2.5 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/terms')}
                  className="cursor-pointer hover:text-white"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/refund-policy')}
                  className="cursor-pointer hover:text-white"
                >
                  Refund Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/privacy')}
                  className="cursor-pointer hover:text-white"
                >
                  Privacy Policy
                </button>
              </li>
            </ul>
          </div>

          {/* Support & Contact */}
          <div className="md:col-span-3">
            <h4 className="font-display text-xs font-bold tracking-wider text-white uppercase">
              Support
            </h4>
            <ul className="mt-4 space-y-2.5 text-xs">
              <li>
                <a
                  href={`mailto:${SITE_CONFIG.supportEmail}`}
                  className="font-mono text-slate-200 underline decoration-slate-600 underline-offset-4 hover:text-white"
                >
                  {SITE_CONFIG.supportEmail}
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/contact')}
                  className="cursor-pointer hover:text-white"
                >
                  Contact &amp; Billing Support
                </button>
              </li>
              <li className="text-slate-400">Website: {SITE_CONFIG.websiteUrl}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-slate-800 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center">
          <p>
            &copy; 2026 {SITE_CONFIG.brandName} ({SITE_CONFIG.domain}). All rights reserved.
          </p>
          <p>Snagly does not bypass DRM and does not host video content.</p>
        </div>
      </div>
    </footer>
  );
}
