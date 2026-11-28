import { AlertTriangle, ChevronDown, Mail } from 'lucide-react';
import { useState } from 'react';
import {
  AppRoute,
  FAQ_ITEMS,
  HOW_IT_WORKS_STEPS,
  SITE_CONFIG,
} from '../data/snaglyData';

interface HowItWorksAndComplianceProps {
  onNavigate: (route: AppRoute, sectionId?: string) => void;
}

export function HowItWorksAndCompliance({ onNavigate }: HowItWorksAndComplianceProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      {/* Getting Started & DRM Notice */}
      <section
        id="how-it-works"
        className="border-b border-slate-200 bg-white py-16 sm:py-22"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-wider text-blue-700 uppercase">
              Getting Started
            </p>
            <h2
              className="font-display mt-2 font-extrabold tracking-tight text-slate-950 text-balance"
              style={{ fontSize: 'clamp(1.85rem, 3vw, 2.5rem)' }}
            >
              From Chrome install to Pro activation in under two minutes.
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {HOW_IT_WORKS_STEPS.map((item) => (
              <div
                key={item.step}
                className="rounded-2xl border border-slate-200 bg-slate-50/60 p-6"
              >
                <div className="font-mono text-xs font-bold text-blue-700 tabular-nums">
                  STEP {item.step}
                </div>
                <h3 className="font-display mt-2 text-lg font-bold text-slate-950">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* Explicit DRM & Acceptable Use Notice */}
          <div className="mt-10 rounded-2xl border border-amber-300 bg-amber-50/70 p-6 sm:p-7">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
              <AlertTriangle className="mt-0.5 h-6 w-6 shrink-0 text-amber-700" />
              <div className="space-y-2 text-sm leading-relaxed text-slate-800">
                <h3 className="font-display text-base font-bold text-slate-950">
                  Important Compatibility &amp; Responsible Use Notice
                </h3>
                <p>
                  <strong>Snagly does not bypass DRM and does not claim to work on all websites.</strong>{' '}
                  Restricted or encrypted streaming platforms—including YouTube, Netflix, Prime
                  Video, Disney+, Max, Hulu, Hotstar, X, and Reddit—are explicitly excluded in the
                  extension manifest.
                </p>
                <p>
                  Only save media that you own or have permission to download. The daily{' '}
                  <strong>Free plan</strong> exists specifically so you can test compatibility on
                  your chosen websites <strong>before</strong> purchasing a Pro license. Please
                  review our{' '}
                  <button
                    type="button"
                    onClick={() => onNavigate('/refund-policy')}
                    className="cursor-pointer font-semibold text-blue-700 underline underline-offset-2 hover:text-blue-900"
                  >
                    Refund Policy
                  </button>{' '}
                  and{' '}
                  <button
                    type="button"
                    onClick={() => onNavigate('/terms')}
                    className="cursor-pointer font-semibold text-blue-700 underline underline-offset-2 hover:text-blue-900"
                  >
                    Terms of Service
                  </button>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ & Direct Support */}
      <section id="faq" className="bg-[#FAFAFA] py-16 sm:py-24">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold tracking-wider text-blue-700 uppercase">
              Questions &amp; Architecture
            </p>
            <h2
              className="font-display mt-2 font-extrabold tracking-tight text-slate-950 text-balance"
              style={{ fontSize: 'clamp(1.75rem, 2.8vw, 2.3rem)' }}
            >
              Frequently asked questions
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Clear answers on Zero-CLI Phone QR transfers, local WASM processing, Pro licensing,
              DRM boundaries, and privacy.
            </p>

            <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
              <div className="flex items-center gap-2.5 text-slate-950">
                <Mail className="h-5 w-5 text-blue-600" />
                <h3 className="font-display text-base font-bold">Direct Developer Support</h3>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                Need help activating a license key, troubleshooting a stream format, or requesting
                billing support on {SITE_CONFIG.domain}? Reach the developer directly:
              </p>
              <a
                href={`mailto:${SITE_CONFIG.supportEmail}`}
                className="mt-3 inline-block font-mono text-sm font-semibold text-blue-700 underline underline-offset-4 hover:text-blue-900"
              >
                {SITE_CONFIG.supportEmail}
              </a>
              <div className="mt-4 border-t border-slate-100 pt-3">
                <button
                  type="button"
                  onClick={() => onNavigate('/contact')}
                  className="cursor-pointer text-xs font-semibold text-slate-900 hover:text-blue-700"
                >
                  Open full Support &amp; Contact page →
                </button>
              </div>
            </div>
          </div>

          <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white lg:col-span-7">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={item.q} className="px-6 py-5">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="flex w-full cursor-pointer items-center justify-between gap-4 text-left"
                  >
                    <span className="font-display text-sm font-bold text-slate-950 sm:text-base">
                      {item.q}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 text-slate-500 transition-transform ${
                        isOpen ? 'rotate-180 text-slate-950' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.a}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
