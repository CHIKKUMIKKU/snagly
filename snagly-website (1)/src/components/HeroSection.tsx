import { ArrowRight, Download } from 'lucide-react';
import { AppRoute, SITE_CONFIG } from '../data/snaglyData';
import { HeroExtensionShowcase } from './ExtensionMockups';

interface HeroSectionProps {
  onNavigate: (route: AppRoute, sectionId?: string) => void;
}

export function HeroSection({ onNavigate }: HeroSectionProps) {
  return (
    <section className="border-b border-slate-200 bg-white pt-12 pb-14 sm:pt-16 sm:pb-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Proposition */}
          <div className="lg:col-span-6">
            <p className="text-xs font-semibold tracking-wider text-blue-700">
              Chrome Side Panel &amp; Popup · Version {SITE_CONFIG.version} · Zero External Servers
            </p>
            <h1
              className="font-display mt-3 font-extrabold tracking-tight text-slate-950 text-balance"
              style={{ fontSize: 'clamp(2.25rem, 4vw, 3.5rem)', lineHeight: 1.07 }}
            >
              Capture, trim, convert, and protect web videos inside Chrome.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 sm:text-[17px]">
              Snagly runs completely on your device — detecting HLS, DASH, live broadcasts, and
              subtitles in your active tab, trimming 16:9 or 9:16 clips before download, locking
              files in a PIN-protected Vault, and sending videos to your phone over QR with zero
              CLI setup.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <button
                type="button"
                onClick={() => onNavigate('/pricing', 'pricing')}
                className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold whitespace-nowrap text-white transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Unlock Snagly Pro
                <ArrowRight className="h-4 w-4" />
              </button>
              <a
                href={SITE_CONFIG.chromeStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3.5 text-sm font-semibold whitespace-nowrap text-slate-900 transition-colors hover:border-slate-400 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                <Download className="h-4 w-4 text-blue-600" />
                Add Free to Chrome
              </a>
            </div>

            <p className="mt-5 text-xs leading-relaxed text-slate-500">
              Test compatibility free (5 downloads, 5 bulk items &amp; 1 clip trim daily) · Works
              on Chrome, Edge, Brave, Opera &amp; Vivaldi · Does not bypass DRM.
            </p>
          </div>

          {/* Right Column: Interactive Extension Screenshot */}
          <div className="lg:col-span-6">
            <HeroExtensionShowcase />
          </div>
        </div>

        {/* Full-Width Proof Strip Below Hero Split */}
        <div className="mt-12 grid grid-cols-2 gap-6 border-t border-slate-200 pt-8 sm:grid-cols-4">
          <div>
            <p className="font-display text-2xl font-extrabold text-slate-950 tabular-nums">100%</p>
            <p className="mt-1 text-xs leading-relaxed text-slate-600">
              Local WASM processing — media never touches any converter server
            </p>
          </div>
          <div>
            <p className="font-display text-2xl font-extrabold text-slate-950 tabular-nums">
              Zero CLI
            </p>
            <p className="mt-1 text-xs leading-relaxed text-slate-600">
              Dual-mode Phone QR &amp; Wi-Fi transfer with no companion binaries
            </p>
          </div>
          <div>
            <p className="font-display text-2xl font-extrabold text-slate-950 tabular-nums">
              16:9 / 9:16
            </p>
            <p className="mt-1 text-xs leading-relaxed text-slate-600">
              Pre-download clip trimmer, vertical crop &amp; SRT burn-in
            </p>
          </div>
          <div>
            <p className="font-display text-2xl font-extrabold text-slate-950 tabular-nums">
              PIN + Decoy
            </p>
            <p className="mt-1 text-xs leading-relaxed text-slate-600">
              OPFS Private Vault with 1h–7d auto-destruct &amp; Panic Hide
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
