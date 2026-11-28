import { AlertTriangle, Check, CheckCircle2, MonitorSmartphone, XCircle } from 'lucide-react';
import {
  COMPARISON_CATEGORY_CARDS,
  COMPATIBILITY_BROWSERS,
  EXTRA_COMPARISON_MATRIX,
  HONEST_LIMITATIONS,
  USE_CASE_PERSONAS,
} from '../data/snaglyData';

export function ComparisonAndUseCasesSection() {
  return (
    <>
      {/* How Snagly Helps Real Workflows */}
      <section className="border-b border-slate-200 bg-[#FAFAFA] py-16 sm:py-22">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-wider text-blue-700 uppercase">
              How Snagly Helps You
            </p>
            <h2
              className="font-display mt-2 font-extrabold tracking-tight text-slate-950 text-balance"
              style={{ fontSize: 'clamp(1.85rem, 3.2vw, 2.5rem)' }}
            >
              Built around the messy parts of saving web video — solved locally.
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-600">
              Whether you need a 20-second vertical clip, translated subtitles, verifiable file
              checksums, or zero-trace private storage, Snagly removes manual post-processing work.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            {USE_CASE_PERSONAS.map((persona) => (
              <article
                key={persona.num}
                className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 sm:p-7"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                    <span className="font-mono font-bold text-blue-700 tabular-nums">
                      {persona.num}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="font-semibold text-slate-800">{persona.role}</span>
                  </div>

                  <h3 className="font-display mt-2.5 text-lg font-bold tracking-tight text-slate-950 sm:text-xl">
                    {persona.headline}
                  </h3>

                  <div className="mt-4 space-y-2.5 text-sm leading-relaxed">
                    <p className="text-slate-600">
                      <strong className="text-slate-900">Problem:</strong> {persona.painPoint}
                    </p>
                    <p className="text-slate-700">
                      <strong className="text-blue-700">With Snagly:</strong> {persona.howSnaglyHelps}
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-x-4 gap-y-1.5 border-t border-slate-100 pt-4 text-xs font-medium text-slate-700">
                  {persona.keyTools.map((tool) => (
                    <span key={tool} className="font-mono">
                      {tool}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* What Snagly Gives Extra Comparison (Strictly Zero Competitor Names) */}
      <section id="compare" className="border-b border-slate-200 bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-wider text-blue-700 uppercase">
              Why Users Switch to Snagly
            </p>
            <h2
              className="font-display mt-2 font-extrabold tracking-tight text-slate-950 text-balance"
              style={{ fontSize: 'clamp(1.85rem, 3.2vw, 2.5rem)' }}
            >
              What you get extra — without sacrificing privacy or ease of use.
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-600">
              Most video tools force a compromise between power, convenience, and local security.
              Snagly brings pro-grade media prep, vault privacy, and mobile delivery together inside Chrome.
            </p>
          </div>

          {/* 4-Category Tradeoff Comparison Cards */}
          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {COMPARISON_CATEGORY_CARDS.map((card) => (
              <div
                key={card.category}
                className={`flex flex-col rounded-2xl border p-6 ${
                  card.highlighted
                    ? 'border-blue-600 bg-slate-950 text-white shadow-[0_20px_45px_-20px_rgba(37,99,235,0.45)]'
                    : 'border-slate-200 bg-slate-50/70 text-slate-900'
                }`}
              >
                <p
                  className={`text-xs font-semibold ${
                    card.highlighted ? 'text-blue-400' : 'text-slate-500'
                  }`}
                >
                  {card.tradeoffLabel}
                </p>
                <h3
                  className={`font-display mt-1.5 text-lg font-bold ${
                    card.highlighted ? 'text-white' : 'text-slate-950'
                  }`}
                >
                  {card.category}
                </h3>

                <ul className="mt-5 space-y-3 text-xs leading-relaxed">
                  {card.limitations.map((pt) => (
                    <li key={pt} className="flex items-start gap-2">
                      {card.highlighted ? (
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                      ) : (
                        <span
                          aria-hidden="true"
                          className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400"
                        />
                      )}
                      <span className={card.highlighted ? 'text-slate-200' : 'text-slate-600'}>
                        {pt}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Full 15-Point Extra Capability Comparison Table */}
          <div className="mt-12 overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <div className="border-b border-slate-200 bg-slate-50 px-6 py-4">
              <h3 className="font-display text-base font-bold text-slate-950">
                Current Snagly Capabilities vs Standard Alternatives
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-white">
                    <th className="px-5 py-4 font-display text-xs font-bold tracking-wider text-slate-500 uppercase">
                      Capability
                    </th>
                    <th className="px-5 py-4 font-display text-sm font-bold text-blue-700">
                      Snagly v2.1
                    </th>
                    <th className="px-5 py-4 font-display text-sm font-bold text-slate-700">
                      Typical Browser Extensions
                    </th>
                    <th className="px-5 py-4 font-display text-sm font-bold text-slate-700">
                      Online / CLI Tools
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {EXTRA_COMPARISON_MATRIX.map((row) => (
                    <tr key={row.capability} className="hover:bg-slate-50/70">
                      <td className="px-5 py-3.5 text-xs font-semibold text-slate-900 sm:text-sm">
                        {row.capability}
                      </td>
                      <td className="px-5 py-3.5 text-xs font-semibold text-slate-950 sm:text-sm">
                        <span className="inline-flex items-center gap-1.5">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                          <span>{row.snagly}</span>
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-xs text-slate-600 sm:text-sm">
                        {row.typicalExtensions}
                      </td>
                      <td className="px-5 py-3.5 text-xs text-slate-600 sm:text-sm">
                        {row.onlineAndCli}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Browser Compatibility & Honest Limits */}
      <section className="border-b border-slate-200 bg-[#FAFAFA] py-16 sm:py-22">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Compatibility */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 lg:col-span-5">
              <div className="flex items-center gap-2.5 text-slate-950">
                <MonitorSmartphone className="h-5 w-5 text-blue-600" />
                <h3 className="font-display text-lg font-bold">Cross-OS Chromium Support</h3>
              </div>
              <p className="mt-2.5 text-sm leading-relaxed text-slate-600">
                Works on Windows, macOS, Linux, and ChromeOS in any modern Chromium browser, plus
                sends media wirelessly to iOS and Android via snagly.video/receive.html.
              </p>

              <div className="mt-6 divide-y divide-slate-100 border-t border-slate-100">
                {COMPATIBILITY_BROWSERS.map((b) => (
                  <div key={b.name} className="flex items-center justify-between py-3 text-xs">
                    <span className="font-bold text-slate-950">{b.name}</span>
                    <span className="text-slate-600">{b.note}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Honest Limitations */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 lg:col-span-7">
              <h3 className="font-display text-lg font-bold text-slate-950">
                What Snagly Does Not Do (Transparent Limits)
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Being clear about technical and compliance boundaries saves you time before upgrading.
              </p>

              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {HONEST_LIMITATIONS.map((lim) => (
                  <div
                    key={lim.title}
                    className="rounded-xl border border-slate-200 bg-slate-50/70 p-4"
                  >
                    <div className="flex items-center gap-2">
                      {lim.severity === 'red' ? (
                        <XCircle className="h-4 w-4 shrink-0 text-red-600" />
                      ) : (
                        <AlertTriangle className="h-4 w-4 shrink-0 text-amber-600" />
                      )}
                      <h4 className="font-display text-xs font-bold text-slate-950">
                        {lim.title}
                      </h4>
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-slate-600">{lim.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
