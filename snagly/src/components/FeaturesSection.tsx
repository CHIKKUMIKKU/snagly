import { CAPABILITIES } from '../data/snaglyData';

export function FeaturesSection() {
  return (
    <section id="features" className="border-t border-slate-200/80 bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-widest text-blue-700 uppercase">
            Capabilities · v1.5.0
          </p>
          <h2
            className="font-display mt-2 font-extrabold tracking-tight text-slate-950"
            style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}
          >
            Built for clean capture, precise trimming, and local privacy.
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-600">
            Every workflow runs locally inside your Chrome browser—from stream detection and
            multi-track MP4 muxing to PIN-locked storage and local Wi-Fi phone transfer.
          </p>
        </div>

        {/* Asymmetric Bento Grid */}
        <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {CAPABILITIES.map((item) => (
            <article
              key={item.num}
              className={`flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 transition-colors hover:border-slate-300 sm:p-7 ${item.span}`}
            >
              <div>
                <div className="font-mono text-xs font-semibold tracking-wider text-orange-600 tabular-nums">
                  {item.num}
                </div>
                <h3 className="font-display mt-2.5 text-lg font-bold tracking-tight text-slate-950 sm:text-xl">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.summary}</p>
              </div>

              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 border-t border-slate-100 pt-4 text-xs font-medium text-slate-700">
                {item.specs.map((spec) => (
                  <span key={spec} className="font-mono">
                    {spec}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

        {/* Technical Architecture Strip */}
        <div className="mt-8 grid grid-cols-2 gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:grid-cols-4">
          <div>
            <p className="font-display text-2xl font-extrabold text-slate-950 tabular-nums">15</p>
            <p className="mt-1 text-xs text-slate-600">
              Built-in languages including full RTL Arabic layout &amp; dark/light themes
            </p>
          </div>
          <div>
            <p className="font-display text-2xl font-extrabold text-slate-950 tabular-nums">
              MV3
            </p>
            <p className="mt-1 text-xs text-slate-600">
              Chrome Manifest V3 Side Panel &amp; Popup with zero remote tracking scripts
            </p>
          </div>
          <div>
            <p className="font-mono text-2xl font-extrabold text-slate-950 tabular-nums">
              127.0.0.1
            </p>
            <p className="mt-1 text-xs text-slate-600">
              Optional local FFmpeg Companion App (port 48921) for &gt;2 GB disk writes
            </p>
          </div>
          <div>
            <p className="font-display text-2xl font-extrabold text-slate-950 tabular-nums">
              OPFS
            </p>
            <p className="mt-1 text-xs text-slate-600">
              Origin Private File System vault isolated from standard browser history
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
