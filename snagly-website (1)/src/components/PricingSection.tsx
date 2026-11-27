import { Check, ChevronDown, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import {
  AppRoute,
  BillingCycle,
  COMPARISON_ROWS,
  PRICING_CARDS,
  PRO_VALUE_STACK,
  SITE_CONFIG,
} from '../data/snaglyData';

interface PricingSectionProps {
  selectedCycle: BillingCycle;
  onChangeCycle: (cycle: BillingCycle) => void;
  onSelectPlan: (planId: 'free' | 'pro' | 'lifetime') => void;
  onNavigate: (route: AppRoute, sectionId?: string) => void;
}

export function PricingSection({
  selectedCycle,
  onChangeCycle,
  onSelectPlan,
  onNavigate,
}: PricingSectionProps) {
  const [showFullComparison, setShowFullComparison] = useState(false);

  const isMonthly = selectedCycle === 'monthly';

  return (
    <section id="pricing" className="border-b border-slate-200 bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Centered Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold tracking-wider text-blue-700 uppercase">
            Simple, Transparent Licensing
          </p>
          <h2
            className="font-display mt-2 font-extrabold tracking-tight text-slate-950 text-balance"
            style={{ fontSize: 'clamp(1.9rem, 3.2vw, 2.65rem)' }}
          >
            Replace four separate tools with one local Pro workspace.
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Verify your websites on the Free plan first, then unlock unlimited clipping, subtitle
            burn-in, OPFS PIN Vault, and Zero-CLI Phone QR transfer.
          </p>

          {/* Segmented Billing Control */}
          <div className="mt-8 inline-flex items-center rounded-xl border border-slate-200 bg-slate-100 p-1">
            <button
              type="button"
              onClick={() => onChangeCycle('monthly')}
              className={`cursor-pointer rounded-lg px-5 py-2 text-xs font-semibold whitespace-nowrap transition-colors ${
                isMonthly
                  ? 'bg-white text-slate-950 shadow-xs'
                  : 'text-slate-600 hover:text-slate-950'
              }`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => onChangeCycle('yearly')}
              className={`inline-flex cursor-pointer items-center gap-2 rounded-lg px-5 py-2 text-xs font-semibold whitespace-nowrap transition-colors ${
                !isMonthly
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-950'
              }`}
            >
              <span>Annual</span>
              <span className="font-mono text-[11px] opacity-90">Save 25%</span>
            </button>
          </div>
        </div>

        {/* 4-Column Pro Value Stack */}
        <div className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-4 rounded-2xl border border-slate-200 bg-slate-50/70 p-5 sm:grid-cols-2 lg:grid-cols-4">
          {PRO_VALUE_STACK.map((item) => (
            <div key={item.label} className="space-y-1">
              <p className="font-display text-xs font-bold text-slate-950">{item.label}</p>
              <p className="text-xs leading-relaxed text-slate-600">{item.detail}</p>
            </div>
          ))}
        </div>

        {/* 3 Clean Pricing Cards */}
        <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 items-stretch gap-6 lg:grid-cols-3">
          {PRICING_CARDS.map((card) => {
            const isHighlighted = Boolean(card.highlighted);
            const isFree = card.id === 'free';
            const isLifetime = card.id === 'lifetime';

            let displayPrice = card.yearlyDisplay;
            let unit = '/mo';
            let billingCaption = '';

            if (isFree) {
              displayPrice = '$0';
              unit = '/mo';
            } else if (isHighlighted) {
              displayPrice = isMonthly ? card.monthlyDisplay : card.yearlyDisplay;
              unit = '/mo';
              billingCaption = isMonthly ? card.billingNoteMonthly : card.billingNoteYearly;
            } else if (isLifetime) {
              displayPrice = card.lifetimeDisplay;
              unit = 'one-time';
              billingCaption = card.billingNoteLifetime;
            }

            return (
              <div
                key={card.id}
                className={`flex flex-col justify-between rounded-2xl p-7 sm:p-8 ${
                  isHighlighted
                    ? 'border border-blue-600 bg-slate-950 text-white shadow-[0_24px_55px_-20px_rgba(37,99,235,0.45)]'
                    : 'border border-slate-200 bg-white text-slate-900'
                }`}
              >
                <div>
                  <p
                    className={`text-xs font-semibold ${
                      isHighlighted ? 'text-blue-400' : 'text-slate-500'
                    }`}
                  >
                    {card.bannerText || card.eyebrow}
                  </p>
                  <h3
                    className={`font-display mt-1.5 text-xl font-bold ${
                      isHighlighted ? 'text-white' : 'text-slate-950'
                    }`}
                  >
                    {card.name}
                  </h3>
                  {isHighlighted && (
                    <p className="mt-1 text-xs text-slate-300">{card.eyebrow}</p>
                  )}

                  <div className="mt-6 flex items-baseline gap-1.5">
                    <span
                      className={`font-display text-5xl font-extrabold tracking-tight tabular-nums ${
                        isHighlighted ? 'text-white' : 'text-slate-950'
                      }`}
                    >
                      {displayPrice}
                    </span>
                    <span
                      className={`text-sm font-medium ${
                        isHighlighted ? 'text-slate-300' : 'text-slate-500'
                      }`}
                    >
                      {unit}
                    </span>
                  </div>

                  <ul className="mt-7 space-y-3">
                    {card.features.map((feat) => (
                      <li key={feat.label} className="flex items-start gap-2.5 text-sm">
                        <Check
                          className={`mt-0.5 h-4 w-4 shrink-0 ${
                            isHighlighted
                              ? 'text-blue-400'
                              : isFree
                                ? 'text-slate-500'
                                : 'text-blue-600'
                          }`}
                        />
                        <span className={isHighlighted ? 'text-slate-200' : 'text-slate-600'}>
                          {feat.label}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8">
                  {billingCaption && (
                    <p
                      className={`mb-3 text-center text-xs ${
                        isHighlighted ? 'text-slate-400' : 'text-slate-500'
                      }`}
                    >
                      {billingCaption}
                    </p>
                  )}

                  {isFree ? (
                    <a
                      href={SITE_CONFIG.chromeStoreUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-center text-sm font-semibold whitespace-nowrap text-slate-900 transition-colors hover:border-slate-400 hover:bg-slate-50"
                    >
                      {card.ctaLabel}
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onSelectPlan(card.id)}
                      className={`w-full cursor-pointer rounded-xl px-4 py-3 text-sm font-semibold whitespace-nowrap transition-colors ${
                        isHighlighted
                          ? 'bg-blue-600 text-white hover:bg-blue-500'
                          : 'border border-slate-300 bg-white text-slate-950 hover:border-slate-400 hover:bg-slate-50'
                      }`}
                    >
                      {card.ctaLabel}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust Line + Expandable Free vs Pro Matrix */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-2 text-xs font-medium text-slate-600">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            <span>
              Test compatibility on Free plan first · Instant Dodo Payments license ·{' '}
              <button
                type="button"
                onClick={() => onNavigate('/refund-policy')}
                className="cursor-pointer font-semibold text-slate-900 underline underline-offset-2 hover:text-blue-600"
              >
                Refund Policy
              </button>{' '}
              &amp;{' '}
              <button
                type="button"
                onClick={() => onNavigate('/terms')}
                className="cursor-pointer font-semibold text-slate-900 underline underline-offset-2 hover:text-blue-600"
              >
                Terms
              </button>
            </span>
          </div>

          <button
            type="button"
            onClick={() => setShowFullComparison((prev) => !prev)}
            className="inline-flex cursor-pointer items-center gap-1.5 text-xs font-semibold text-blue-700 hover:text-blue-900"
          >
            {showFullComparison ? 'Hide Free vs Pro breakdown' : 'Compare all Free vs Pro limits'}
            <ChevronDown
              className={`h-3.5 w-3.5 transition-transform ${showFullComparison ? 'rotate-180' : ''}`}
            />
          </button>
        </div>

        {showFullComparison && (
          <div className="mx-auto mt-8 max-w-5xl overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="px-5 py-4 font-display font-bold text-slate-900">Feature</th>
                    <th className="px-5 py-4 font-display font-bold text-slate-900">Free ($0)</th>
                    <th className="px-5 py-4 font-display font-bold text-blue-700">
                      Pro ($4.99/mo · $44.99/yr · $74.99 once)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {COMPARISON_ROWS.map((row) => (
                    <tr key={row.feature} className="hover:bg-slate-50/70">
                      <td className="px-5 py-3.5 font-medium text-slate-800">{row.feature}</td>
                      <td className="px-5 py-3.5 text-slate-600">{row.free}</td>
                      <td className="px-5 py-3.5 font-semibold text-slate-950">{row.pro}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
