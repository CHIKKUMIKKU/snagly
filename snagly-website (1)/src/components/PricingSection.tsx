import { Check, ChevronDown, HelpCircle, Minus, ShieldCheck } from 'lucide-react';
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

  return (
    <section id="pricing" className="bg-slate-50/70 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Centered Header (VeePN-inspired clean layout) */}
        <div className="mx-auto max-w-2xl text-center">
          <h2
            className="font-display font-extrabold tracking-tight text-slate-950"
            style={{ fontSize: 'clamp(1.85rem, 3.2vw, 2.65rem)' }}
          >
            Compare Our Plans
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Test Snagly free on the websites you use every day, then unlock unlimited downloads,
            clip trimming, and Private Vault security.
          </p>
        </div>

        {/* Plan / Billing Selector Bar matching screenshot left-aligned selector + clear options */}
        <div className="mt-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="inline-flex rounded-lg border border-slate-200 bg-white p-1 shadow-xs">
            {(
              [
                { id: 'yearly', label: 'Yearly · $44.99/yr (Save 25%)' },
                { id: 'monthly', label: 'Monthly · $4.99/mo' },
                { id: 'lifetime', label: 'Lifetime · $74.99 once' },
              ] as const
            ).map((opt) => {
              const active = selectedCycle === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => onChangeCycle(opt.id)}
                  className={`cursor-pointer rounded-md px-3.5 py-2 text-xs font-semibold transition-colors sm:text-sm ${
                    active
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950'
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>

          <p className="text-xs font-medium text-slate-600">
            Processed by <span className="font-semibold text-slate-900">Dodo Payments</span>{' '}
            (Merchant of Record) · Instant License Key
          </p>
        </div>

        {/* 3 Side-by-Side Pricing Cards */}
        <div className="mt-8 grid grid-cols-1 items-stretch gap-6 lg:grid-cols-3 lg:gap-7">
          {PRICING_CARDS.map((card) => {
            const isHighlighted = Boolean(card.highlighted);

            let displayPrice = card.yearlyDisplay;
            let billingNote = card.billingNoteYearly;
            let priceUnit = '/mo';

            if (card.id === 'free') {
              displayPrice = '$0';
              priceUnit = '/mo';
              billingNote = card.billingNoteYearly;
            } else if (card.id === 'pro') {
              if (selectedCycle === 'monthly') {
                displayPrice = card.monthlyDisplay;
                billingNote = card.billingNoteMonthly;
                priceUnit = '/mo';
              } else if (selectedCycle === 'yearly') {
                displayPrice = card.yearlyDisplay;
                billingNote = card.billingNoteYearly;
                priceUnit = '/mo';
              } else {
                displayPrice = card.yearlyDisplay;
                billingNote = card.billingNoteLifetime;
                priceUnit = '/mo';
              }
            } else if (card.id === 'lifetime') {
              displayPrice = '$74.99';
              priceUnit = ' one-time';
              billingNote = card.billingNoteLifetime;
            }

            return (
              <div
                key={card.id}
                className={`relative flex flex-col overflow-hidden rounded-2xl bg-white transition-shadow ${
                  isHighlighted
                    ? 'border-2 border-slate-900 shadow-2xl shadow-slate-900/10 lg:-my-2'
                    : 'border border-slate-200 shadow-xs'
                }`}
              >
                {/* Highlighted Dark Top Banner (matches middle card in VeePN screenshot) */}
                {isHighlighted && (
                  <div className="bg-slate-900 px-4 py-2.5 text-center text-xs font-bold tracking-wider text-amber-300 uppercase">
                    {selectedCycle === 'monthly'
                      ? 'PRO MONTHLY · CANCEL ANYTIME'
                      : card.bannerText}
                  </div>
                )}

                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  {/* Top Rectangular Micro-Label */}
                  <div>
                    <span
                      className={`inline-block rounded px-2.5 py-1 text-xs font-semibold ${
                        card.id === 'free'
                          ? 'bg-emerald-50 text-emerald-700'
                          : isHighlighted
                            ? 'bg-blue-50 text-blue-700'
                            : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {card.eyebrow}
                    </span>
                  </div>

                  {/* Plan Name */}
                  <h3 className="font-display mt-4 text-xl font-bold text-slate-950">
                    {card.name}
                  </h3>

                  {/* Price Row */}
                  <div className="mt-3 flex items-baseline gap-1.5">
                    <span className="text-xs font-semibold text-slate-500 uppercase">USD</span>
                    <span className="font-display text-4xl font-extrabold tracking-tight text-slate-950 tabular-nums">
                      {displayPrice}
                    </span>
                    <span className="text-sm font-medium text-slate-500">{priceUnit}</span>
                  </div>

                  {/* Savings / Subtitle */}
                  {card.savingsNote ? (
                    <p
                      className={`mt-2 text-sm font-bold ${
                        isHighlighted ? 'text-orange-600' : 'text-blue-600'
                      }`}
                    >
                      {card.id === 'pro' && selectedCycle === 'monthly'
                        ? 'Switch to Yearly to save 25%'
                        : card.savingsNote}
                    </p>
                  ) : (
                    <p className="mt-2 text-sm font-semibold text-emerald-700">
                      Free daily allowance included
                    </p>
                  )}

                  {/* Billing Explanation */}
                  <p className="mt-2 min-h-[42px] text-xs leading-relaxed text-slate-600">
                    {billingNote}
                  </p>

                  {/* Primary Action Button */}
                  <button
                    type="button"
                    onClick={() => onSelectPlan(card.id)}
                    className={`mt-5 w-full cursor-pointer rounded-lg px-4 py-3 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 ${
                      isHighlighted
                        ? 'bg-orange-500 text-white shadow-sm hover:bg-orange-600 focus-visible:outline-orange-500'
                        : 'border border-blue-600 bg-white text-blue-700 hover:bg-blue-50 focus-visible:outline-blue-600'
                    }`}
                  >
                    {card.ctaLabel}
                  </button>

                  {/* Underlined Helper Link matching screenshot */}
                  <div className="mt-3 text-center">
                    <button
                      type="button"
                      onClick={() =>
                        onNavigate(card.id === 'free' ? '/' : '/refund-policy', card.id === 'free' ? 'how-it-works' : undefined)
                      }
                      className="inline-flex cursor-pointer items-center gap-1 text-xs font-medium text-slate-600 underline decoration-slate-400 underline-offset-2 hover:text-slate-950"
                    >
                      {card.id === 'free'
                        ? 'How does the free tier work?'
                        : 'Read Refund & License Terms'}
                      <HelpCircle className="h-3.5 w-3.5 text-slate-400" />
                    </button>
                  </div>

                  {/* Checklist Rows separated by clean hairlines */}
                  <ul className="mt-6 divide-y divide-slate-100 border-t border-slate-100">
                    {card.features.map((feat) => (
                      <li
                        key={feat.label}
                        className="flex items-start gap-2.5 py-2.5 text-xs leading-snug"
                      >
                        {feat.included ? (
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                        ) : (
                          <Minus className="mt-0.5 h-4 w-4 shrink-0 text-slate-300" />
                        )}
                        <span className={feat.included ? 'text-slate-800' : 'text-slate-400'}>
                          {feat.label}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Centered "Compare plans" Toggle Button matching screenshot */}
        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={() => setShowFullComparison((prev) => !prev)}
            className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-blue-600 bg-white px-6 py-2.5 text-sm font-semibold text-blue-700 transition-colors hover:bg-blue-50"
          >
            {showFullComparison ? 'Hide full comparison' : 'Compare all features'}
            <ChevronDown
              className={`h-4 w-4 transition-transform ${showFullComparison ? 'rotate-180' : ''}`}
            />
          </button>
        </div>

        {/* Expandable Feature Comparison Matrix */}
        {showFullComparison && (
          <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="px-5 py-4 font-display font-bold text-slate-900">Feature</th>
                    <th className="px-5 py-4 font-display font-bold text-slate-900">
                      Free ($0)
                    </th>
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

        {/* Transparent Dodo Payments Merchant Disclosure */}
        <div className="mt-10 flex flex-col items-start justify-between gap-4 rounded-xl border border-slate-200 bg-white p-5 sm:flex-row sm:items-center">
          <div className="flex items-start gap-3">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
            <div className="text-xs leading-relaxed text-slate-600">
              <p className="font-semibold text-slate-900">
                Secure checkout &amp; license delivery via {SITE_CONFIG.merchantOfRecord}
              </p>
              <p className="mt-1">
                All paid plans ($4.99/month, $44.99/year, or $74.99 one-time) are billed securely
                by Dodo Payments as Merchant of Record. Please test Snagly Free on your websites
                before upgrading; see our{' '}
                <button
                  type="button"
                  onClick={() => onNavigate('/refund-policy')}
                  className="cursor-pointer font-semibold text-blue-700 underline underline-offset-2 hover:text-blue-900"
                >
                  Refund &amp; Cancellation Policy
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

          <a
            href={`mailto:${SITE_CONFIG.supportEmail}`}
            className="shrink-0 text-xs font-semibold text-slate-700 underline decoration-slate-300 underline-offset-4 hover:text-slate-950"
          >
            Support: {SITE_CONFIG.supportEmail}
          </a>
        </div>
      </div>
    </section>
  );
}
