import {
  ArrowRight,
  Download,
  Film,
  FolderLock,
  Layers,
  Lock,
  Radio,
  Scissors,
  ShieldCheck,
  Smartphone,
} from 'lucide-react';
import { useState } from 'react';
import { AppRoute } from '../data/snaglyData';

interface HeroSectionProps {
  onNavigate: (route: AppRoute, sectionId?: string) => void;
  onOpenInstallGuide: () => void;
}

type PreviewTab = 'streams' | 'bulk' | 'vault';

export function HeroSection({ onNavigate, onOpenInstallGuide }: HeroSectionProps) {
  const [activeTab, setActiveTab] = useState<PreviewTab>('streams');

  return (
    <section className="relative overflow-hidden border-b border-slate-200/80 bg-gradient-to-b from-slate-50 via-white to-white pt-14 pb-16 sm:pt-20 sm:pb-24">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:px-8">
        {/* Left Column: Core Proposition */}
        <div className="lg:col-span-6">
          <p className="text-xs font-semibold tracking-widest text-blue-700 uppercase">
            Chrome Extension v1.5 · Local Browser Engine
          </p>
          <h1
            className="font-display mt-3 font-extrabold tracking-tight text-slate-950"
            style={{ fontSize: 'clamp(2.25rem, 4.1vw, 3.45rem)', lineHeight: 1.08 }}
          >
            Save, trim, and organize web video streams in Chrome.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
            Snagly detects standard HLS, MPEG-DASH, and MP4 streams directly in your active tab.
            Capture live broadcasts, trim exact clip timestamps without re-encoding, batch queue
            pages, or lock files in a local PIN-protected Private Vault.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3.5">
            <button
              type="button"
              onClick={() => onNavigate('/', 'pricing')}
              className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-orange-500 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-orange-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
            >
              View Plans &amp; Get Pro
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={onOpenInstallGuide}
              className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-blue-600 bg-white px-5 py-3.5 text-sm font-semibold text-blue-700 transition-colors hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              <Download className="h-4 w-4" />
              Try Free in Chrome
            </button>
          </div>

          <p className="mt-5 text-xs leading-relaxed text-slate-500">
            Free tier includes 5 daily downloads, 5 bulk items &amp; 1 daily trim. Processed locally
            in Chrome · Does not bypass DRM or restricted platforms.
          </p>
        </div>

        {/* Right Column: Interactive Snagly Extension UI Showcase */}
        <div className="lg:col-span-6">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60">
            {/* Extension Window Chrome Header */}
            <div className="flex items-center justify-between border-b border-slate-200 bg-slate-900 px-4 py-3 text-white">
              <div className="flex items-center gap-2.5">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-blue-600 text-xs font-bold">
                  S
                </span>
                <div>
                  <div className="font-display text-xs font-semibold tracking-tight">
                    Snagly Side Panel
                  </div>
                  <div className="text-[11px] text-slate-400">snagly.video · Local Mode</div>
                </div>
              </div>
              <div className="font-mono text-[11px] text-slate-300 tabular-nums">v1.5.0</div>
            </div>

            {/* Interactive Panel Navigation Tabs */}
            <div
              role="tablist"
              aria-label="Snagly extension preview tabs"
              className="grid grid-cols-3 border-b border-slate-200 bg-slate-50"
            >
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'streams'}
                onClick={() => setActiveTab('streams')}
                className={`flex cursor-pointer items-center justify-center gap-1.5 border-b-2 px-3 py-2.5 text-xs font-semibold transition-colors ${
                  activeTab === 'streams'
                    ? 'border-blue-600 bg-white text-blue-700'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <Film className="h-3.5 w-3.5" />
                Detected Streams
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'bulk'}
                onClick={() => setActiveTab('bulk')}
                className={`flex cursor-pointer items-center justify-center gap-1.5 border-b-2 px-3 py-2.5 text-xs font-semibold transition-colors ${
                  activeTab === 'bulk'
                    ? 'border-blue-600 bg-white text-blue-700'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <Layers className="h-3.5 w-3.5" />
                Bulk Queue
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'vault'}
                onClick={() => setActiveTab('vault')}
                className={`flex cursor-pointer items-center justify-center gap-1.5 border-b-2 px-3 py-2.5 text-xs font-semibold transition-colors ${
                  activeTab === 'vault'
                    ? 'border-blue-600 bg-white text-blue-700'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <FolderLock className="h-3.5 w-3.5" />
                Private Vault
              </button>
            </div>

            {/* Tab Body */}
            <div className="p-4 sm:p-5">
              {activeTab === 'streams' && (
                <div className="space-y-3">
                  {/* Stream Item 1 */}
                  <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3.5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-slate-900">
                          product_keynote_4k_master.m3u8
                        </p>
                        <p className="font-mono mt-1 text-[11px] text-slate-500 tabular-nums">
                          1920x1080 · H.264 + AAC · 60fps · HLS · 248.4 MB
                        </p>
                      </div>
                      <span className="shrink-0 rounded bg-blue-600 px-2.5 py-1 text-[11px] font-semibold text-white">
                        Save MP4
                      </span>
                    </div>

                    {/* Inline Clip Trimmer Bar */}
                    <div className="mt-3 rounded-lg border border-slate-200 bg-white p-2.5">
                      <div className="flex items-center justify-between text-[11px] text-slate-600">
                        <span className="inline-flex items-center gap-1 font-medium text-slate-800">
                          <Scissors className="h-3 w-3 text-orange-500" />
                          Segment Clip Trimmer
                        </span>
                        <span className="font-mono tabular-nums">00:14 → 01:42 (01:28)</span>
                      </div>
                      <div className="mt-2 h-2 w-full overflow-hidden rounded bg-slate-200">
                        <div className="ml-[12%] h-full w-[58%] rounded bg-orange-500" />
                      </div>
                    </div>
                  </div>

                  {/* Stream Item 2: Live Stream */}
                  <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 p-3.5">
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <Radio className="h-3.5 w-3.5 text-orange-600" />
                        <p className="truncate text-sm font-semibold text-slate-900">
                          conference_live_feed.mpd
                        </p>
                      </div>
                      <p className="font-mono mt-1 text-[11px] text-slate-500 tabular-nums">
                        LIVE MPEG-DASH · Multi-Audio (EN, ES) · VTT Subtitles
                      </p>
                    </div>
                    <span className="shrink-0 rounded border border-slate-300 px-2.5 py-1 text-[11px] font-semibold text-slate-700">
                      Record Live
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-100 pt-2.5 text-[11px] text-slate-500">
                    <span>Naming: &#123;title&#125;_&#123;resolution&#125;_&#123;codec&#125;</span>
                    <span className="inline-flex items-center gap-1 font-medium text-slate-700">
                      <Smartphone className="h-3.5 w-3.5 text-blue-600" />
                      Wi-Fi QR Ready
                    </span>
                  </div>
                </div>
              )}

              {activeTab === 'bulk' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs">
                    <span className="font-semibold text-slate-800">
                      Page Scraper Queue (Alt+Shift+B)
                    </span>
                    <span className="font-mono text-slate-600 tabular-nums">
                      Concurrency: 2 · Limit: Off
                    </span>
                  </div>

                  <div className="divide-y divide-slate-100 rounded-xl border border-slate-200">
                    {[
                      {
                        name: '01_architecture_overview.mp4',
                        meta: '1080p · H.264 · Saved',
                        progress: '100%',
                      },
                      {
                        name: '02_ffmpeg_mux_walkthrough.m3u8',
                        meta: '1080p · HEVC · Downloading',
                        progress: '68%',
                      },
                      {
                        name: '03_subtitles_and_tracks.mp4',
                        meta: '720p · Queued (Folder: Tutorials)',
                        progress: 'Queued',
                      },
                    ].map((row) => (
                      <div key={row.name} className="flex items-center justify-between gap-3 p-3">
                        <div className="min-w-0">
                          <p className="truncate text-xs font-semibold text-slate-900">
                            {row.name}
                          </p>
                          <p className="font-mono mt-0.5 text-[11px] text-slate-500">{row.meta}</p>
                        </div>
                        <span className="font-mono shrink-0 text-xs font-semibold text-blue-700 tabular-nums">
                          {row.progress}
                        </span>
                      </div>
                    ))}
                  </div>

                  <p className="text-[11px] text-slate-500">
                    Failed free-tier queue items automatically refund your daily credit.
                  </p>
                </div>
              )}

              {activeTab === 'vault' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-900 p-3.5 text-white">
                    <div className="flex items-center gap-2.5">
                      <Lock className="h-4 w-4 text-orange-400" />
                      <div>
                        <p className="text-xs font-semibold">Private Vault (Local OPFS)</p>
                        <p className="text-[11px] text-slate-300">
                          Hidden from Chrome download history · Auto-lock 5 min
                        </p>
                      </div>
                    </div>
                    <span className="font-mono rounded bg-slate-800 px-2 py-1 text-[11px] text-slate-200">
                      PIN Active
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5 text-xs">
                    <div className="rounded-lg border border-slate-200 p-3">
                      <p className="font-semibold text-slate-900">Decoy PIN Mode</p>
                      <p className="mt-1 text-[11px] leading-relaxed text-slate-600">
                        Configure an alternate 4-digit PIN that opens an empty vault view.
                      </p>
                    </div>
                    <div className="rounded-lg border border-slate-200 p-3">
                      <p className="font-semibold text-slate-900">Panic Hide (Alt+Shift+H)</p>
                      <p className="mt-1 text-[11px] leading-relaxed text-slate-600">
                        Instantly closes panels, locks the vault, and disguises the toolbar icon.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 border-t border-slate-100 pt-2 text-[11px] text-slate-600">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                    <span>Stored exclusively inside your browser Origin Private File System.</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
