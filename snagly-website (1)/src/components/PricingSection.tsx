import { Clock3, Download, ShieldCheck } from 'lucide-react';
import { AppRoute, SITE_CONFIG } from '../data/snaglyData';

interface PricingSectionProps {
  onNavigate: (route: AppRoute, sectionId?: string) => void;
}

export function PricingSection({ onNavigate }: PricingSectionProps) {
  return (
    <section id="pricing" className="border-b border-slate-200 bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <p className="text-xs font-semibold tracking-wider text-blue-700 uppercase">Current availability</p>
        <h2 className="font-display mt-2 text-balance text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
          Use every currently released Snagly feature at no cost.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
          Snagly is currently available at no charge. There are no active subscriptions, checkout flows,
          or paid feature restrictions at this time.
        </p>

        <div className="mx-auto mt-9 grid max-w-3xl gap-4 text-left sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <div className="flex items-center gap-2 text-slate-900">
              <Download className="h-5 w-5 text-blue-600" />
              <h3 className="font-display text-lg font-bold">Snagly — Available now</h3>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Install the current Chrome extension and use the features included in the released version.
              No payment or license key is required.
            </p>
            <a href={SITE_CONFIG.chromeStoreUrl} target="_blank" rel="noopener noreferrer"
              className="mt-5 inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700">
              Add to Chrome
            </a>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="flex items-center gap-2 text-slate-900">
              <Clock3 className="h-5 w-5 text-slate-500" />
              <h3 className="font-display text-lg font-bold">Snagly Pro</h3>
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600">Coming soon</span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Pro is planned for a future release. It is not available to purchase or activate yet.
              No payment is being accepted for Pro at this time.
            </p>
            <button type="button" onClick={() => onNavigate('/contact')}
              className="mt-5 inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-50">
              Contact / Updates
            </button>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-500">
          <ShieldCheck className="h-4 w-4" />
          <span>Availability information reflects the current release, not a future pricing promise.</span>
        </div>
        <div className="mt-5 flex justify-center gap-5 text-xs font-semibold text-slate-700">
          <button type="button" onClick={() => onNavigate('/terms')} className="underline underline-offset-2 hover:text-blue-700">Terms</button>
          <button type="button" onClick={() => onNavigate('/privacy')} className="underline underline-offset-2 hover:text-blue-700">Privacy</button>
          <button type="button" onClick={() => onNavigate('/refund-policy')} className="underline underline-offset-2 hover:text-blue-700">Refund policy</button>
        </div>
      </div>
    </section>
  );
}
