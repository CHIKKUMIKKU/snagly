import { Check, ChevronDown, ShieldCheck, Sparkles } from 'lucide-react';
import { useState } from 'react';
import {
  AppRoute,
  BillingCycle,
  COMPARISON_ROWS,
  PRICING_CARDS,
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
    <section id="pricing" className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Centered Header */}
        <div className="mx-auto max-w-xl text-center">
          <h2
            className="font-display font-extrabold tracking-tight text-slate-950"
            style={{ fontSize: 'clamp(1.9rem, 3.2vw, 2.6rem)' }}
          >
            Simple, transparent pricing
          </h2>
          <p className="mt-2.5 text-base text-slate-500">
            Start free on the Chrome Web Store, then upgrade when you need unlimited tools.
          </p>

          {/* Clean Pill Toggle matching reference screenshot */}
          <div className="mt-8 inline-flex items-center rounded-full border border-slate-200/80 bg-slate-100 p-1">
            <button
              type="button"
              onClick={() => onChangeCycle('monthly')}
              className={`cursor-pointer rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                isMonthly
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-950'
              }`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => onChangeCycle('yearly')}
              className={`inline-flex cursor-pointer items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                !isMonthly
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-950'
              }`}
            >
              <span>Annual</span>
              <span
                className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${
                  !isMonthly ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-700'
                }`}
              >
                Save 25%
              </span>
            </button>
          </div>
        </div>

        {/* 3 Clean Airy Cards matching reference layout */}
        <div className="mx-auto mt-14 grid max-w-5xl grid-cols-1 items-center gap-7 lg:grid-cols-3">
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
            }

            return (
              <div
                key={card.id}
                className={`relative flex flex-col rounded-2xl bg-white p-7 sm:p-8 ${
                  isHighlighted
                    ? 'border border-blue-500 pt-9 shadow-[0_20px_50px_-15px_rgba(37,99,235,0.22)] lg:min-h-[530px]'
                    : 'border border-slate-200/90 shadow-xs lg:min-h-[470px]'
                }`}
              >
                {/* Floating "Most Popular" badge on middle card */}
                {isHighlighted && (
                  <div className="absolute -top-3.5 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-blue-600 px-3.5 py-1 text-xs font-semibold whitespace-nowrap text-white shadow-sm">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>{card.bannerText}</span>
                  </div>
                )}

                {/* Title & Subtitle */}
                <div>
                  <h3 className="font-display text-xl font-bold text-slate-950">{card.name}</h3>
                  <p className="mt-1 text-sm text-slate-500">{card.eyebrow}</p>
                </div>

                {/* Bold Price */}
                <div className="mt-6 flex items-baseline gap-1.5">
                  <span className="font-display text-5xl font-extrabold tracking-tight text-slate-950 tabular-nums">
                    {displayPrice}
                  </span>
                  <span className="text-sm font-medium text-slate-500">{unit}</span>
                </div>

                {/* Clean Checkmark List */}
                <ul className="mt-7 flex-1 space-y-3.5">
                  {card.features.map((feat) => (
                    <li key={feat.label} className="flex items-start gap-2.5 text-sm text-slate-600">
                      <span
                        className={`mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${
                          isFree
                            ? 'bg-slate-100 text-slate-500'
                            : 'bg-blue-50 text-blue-600'
                        }`}
                      >
                        <Check className="h-2.5 w-2.5 stroke-[3]" />
                      </span>
                      <span>{feat.label}</span>
                    </li>
                  ))}
                </ul>

                {/* Bottom Action Area */}
                <div className="mt-8">
                  {billingCaption && (
                    <p className="mb-3 text-center text-xs text-slate-400">{billingCaption}</p>
                  )}

                  {isFree ? (
                    <a
                      href={SITE_CONFIG.chromeStoreUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-center text-sm font-semibold text-slate-900 transition-colors hover:border-slate-300 hover:bg-slate-50"
                    >
                      {card.ctaLabel}
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onSelectPlan(card.id)}
                      className={`w-full cursor-pointer rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
                        isHighlighted
                          ? 'bg-blue-600 text-white shadow-sm hover:bg-blue-700'
                          : 'border border-slate-200 bg-white text-slate-900 hover:border-slate-300 hover:bg-slate-50'
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

        {/* Clean Trust Line directly below center card matching reference screenshot */}
        <div className="mt-7 flex flex-col items-center justify-center gap-3 text-center">
          <div className="inline-flex items-center gap-2 text-xs font-medium text-slate-600">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            <span>
              Test compatibility on Free plan first · Instant Dodo Payments license ·{' '}
              <button
                type="button"
                onClick={() => onNavigate('/refund-policy')}
                className="cursor-pointer font-semibold text-slate-800 underline underline-offset-2 hover:text-blue-600"
              >
                Refund Policy
              </button>{' '}
              &amp;{' '}
              <button
                type="button"
                onClick={() => onNavigate('/terms')}
                className="cursor-pointer font-semibold text-slate-800 underline underline-offset-2 hover:text-blue-600"
              >
                Terms
              </button>
            </span>
          </div>

          <button
            type="button"
            onClick={() => setShowFullComparison((prev) => !prev)}
            className="inline-flex cursor-pointer items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800"
          >
            {showFullComparison ? 'Hide full feature comparison' : 'Compare all Free vs Pro features'}
            <ChevronDown
              className={`h-3.5 w-3.5 transition-transform ${showFullComparison ? 'rotate-180' : ''}`}
            />
          </button>
        </div>

        {/* Expandable Feature Comparison Matrix */}
        {showFullComparison && (
          <div className="mx-auto mt-8 max-w-5xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="px-5 py-4 font-display font-bold text-slate-900">Feature</th>
                    <th className="px-5 py-4 font-display font-bold text-slate-900">Free ($0)</th>
                    <th className="px-5 py-4 font-display font-bold text-slate-900">
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
