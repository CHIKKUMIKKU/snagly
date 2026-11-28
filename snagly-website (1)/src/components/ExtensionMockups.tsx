import {
  Bookmark,
  Check,
  EyeOff,
  FileCheck2,
  Film,
  FolderLock,
  Layers,
  Lock,
  Pause,
  QrCode,
  Radio,
  Scissors,
  ShieldCheck,
  Smartphone,
  Subtitles,
} from 'lucide-react';
import { useState } from 'react';
import { TOOLBAR_STATES, ToolbarStateItem } from '../data/snaglyData';
import { SnaglyLogo } from './SnaglyLogo';

type ShowcaseTab = 'streams' | 'phone' | 'bulk' | 'vault';

function QrPatternSvg() {
  return (
    <svg
      viewBox="0 0 100 100"
      className="h-28 w-28 text-slate-950"
      aria-label="Preview QR code graphic"
    >
      <rect width="100" height="100" rx="6" fill="#FFFFFF" />
      <rect x="8" y="8" width="24" height="24" rx="2" fill="none" stroke="currentColor" strokeWidth="5" />
      <rect x="15" y="15" width="10" height="10" fill="currentColor" />
      <rect x="68" y="8" width="24" height="24" rx="2" fill="none" stroke="currentColor" strokeWidth="5" />
      <rect x="75" y="15" width="10" height="10" fill="currentColor" />
      <rect x="8" y="68" width="24" height="24" rx="2" fill="none" stroke="currentColor" strokeWidth="5" />
      <rect x="15" y="75" width="10" height="10" fill="currentColor" />
      <path
        d="M40 10h6v6h-6zM52 10h8v6h-8zM40 22h14v6H40zM46 34h8v8h-8zM10 40h10v6H10zM26 40h8v12h-8zM40 46h12v6H40zM58 40h12v6H58zM76 40h14v6H76zM40 58h6v14h-6zM52 58h14v6H52zM72 54h6v12h-6zM84 54h6v16h-6zM58 70h10v6H58zM40 78h12v12H40zM64 82h12v8H64zM82 76h8v14h-8z"
        fill="currentColor"
      />
    </svg>
  );
}

export function HeroExtensionShowcase() {
  const [tab, setTab] = useState<ShowcaseTab>('streams');
  const [windowMode, setWindowMode] = useState<'side' | 'popup'>('side');
  const [aspectRatio, setAspectRatio] = useState<'original' | '16:9' | '9:16'>('9:16');
  const [burnSubs, setBurnSubs] = useState(true);
  const [qrMode, setQrMode] = useState<'direct' | 'vault'>('vault');
  const [vaultView, setVaultView] = useState<'real' | 'decoy'>('real');

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_24px_60px_-20px_rgba(15,23,42,0.18)]">
      {/* Simulated Chrome Browser Frame Top */}
      <div className="flex items-center justify-between border-b border-slate-200 bg-slate-100 px-3.5 py-2.5">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
        </div>
        <div className="mx-3 flex flex-1 items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-1 text-[11px] text-slate-600">
          <span className="truncate font-mono">stream.example.org/watch/keynote-master</span>
          <span className="hidden font-mono text-[10px] text-blue-700 sm:inline">3 tracks detected</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="relative flex h-6 w-6 items-center justify-center rounded bg-blue-600 text-white">
            <SnaglyLogo className="h-4 w-4" />
            <span className="font-mono absolute -right-1 -bottom-1 rounded bg-slate-950 px-1 text-[9px] font-bold text-white tabular-nums">
              3
            </span>
          </div>
        </div>
      </div>

      {/* Snagly Extension Header */}
      <div className="flex items-center justify-between border-b border-slate-200 bg-slate-950 px-4 py-3 text-white">
        <div className="flex items-center gap-2.5">
          <SnaglyLogo className="h-6 w-6 shrink-0" />
          <div>
            <div className="font-display text-xs font-bold tracking-tight">Snagly v2.1</div>
            <div className="text-[11px] text-slate-400">
              {windowMode === 'side' ? 'Docked Side Panel' : 'Toolbar Popup'} · Local Engine
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1 rounded-lg bg-slate-900 p-0.5 text-[11px]">
          <button
            type="button"
            onClick={() => setWindowMode('popup')}
            className={`cursor-pointer rounded-md px-2.5 py-1 font-medium whitespace-nowrap transition-colors ${
              windowMode === 'popup' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Popup
          </button>
          <button
            type="button"
            onClick={() => setWindowMode('side')}
            className={`cursor-pointer rounded-md px-2.5 py-1 font-medium whitespace-nowrap transition-colors ${
              windowMode === 'side' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Side
          </button>
        </div>
      </div>

      {/* Interactive Panel Tabs */}
      <div
        role="tablist"
        aria-label="Snagly interactive screenshot tabs"
        className="grid grid-cols-4 border-b border-slate-200 bg-slate-50"
      >
        {(
          [
            { id: 'streams', label: 'Streams', icon: Film },
            { id: 'phone', label: 'Phone QR', icon: QrCode },
            { id: 'bulk', label: 'Bulk', icon: Layers },
            { id: 'vault', label: 'Vault', icon: FolderLock },
          ] as const
        ).map((item) => {
          const Icon = item.icon;
          const active = tab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setTab(item.id)}
              className={`flex cursor-pointer items-center justify-center gap-1.5 border-b-2 px-2 py-2.5 text-xs font-semibold whitespace-nowrap transition-colors ${
                active
                  ? 'border-blue-600 bg-white text-blue-700'
                  : 'border-transparent text-slate-600 hover:text-slate-950'
              }`}
            >
              <Icon className="h-3.5 w-3.5 shrink-0" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Body */}
      <div className="min-h-[340px] p-4 sm:p-5">
        {tab === 'streams' && (
          <div className="space-y-3">
            {/* Detected Primary Stream Card */}
            <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3.5">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-slate-950">
                    keynote_architecture_master.m3u8
                  </p>
                  <p className="font-mono mt-1 text-[11px] text-slate-500 tabular-nums">
                    4K 2160p · HEVC → H.264 MP4 · 60fps · 412.6 MB
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setTab('phone')}
                    title="Open QR Send to Phone"
                    className="inline-flex cursor-pointer items-center gap-1 rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-[11px] font-semibold text-slate-800 whitespace-nowrap hover:border-blue-400 hover:text-blue-700"
                  >
                    <Smartphone className="h-3 w-3 text-blue-600" />
                    QR
                  </button>
                  <span className="rounded-lg bg-blue-600 px-3 py-1.5 text-[11px] font-semibold text-white whitespace-nowrap">
                    Download MP4
                  </span>
                </div>
              </div>

              {/* Pre-Download Clip Trimmer + Aspect Ratio */}
              <div className="mt-3 rounded-lg border border-slate-200 bg-white p-3">
                <div className="flex flex-wrap items-center justify-between gap-2 text-[11px]">
                  <span className="inline-flex items-center gap-1 font-semibold text-slate-900">
                    <Scissors className="h-3.5 w-3.5 text-blue-600" />
                    Pre-Download Clip Trimmer
                  </span>
                  <span className="font-mono font-medium text-blue-700 tabular-nums">
                    01:12 → 02:48 (01:36 clip)
                  </span>
                </div>

                <div className="mt-2 h-2 w-full overflow-hidden rounded bg-slate-200">
                  <div className="ml-[18%] h-full w-[44%] rounded bg-blue-600" />
                </div>

                {/* Aspect Ratio Interactive Switch */}
                <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-2.5">
                  <div className="flex items-center gap-1">
                    {(['original', '16:9', '9:16'] as const).map((r) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => setAspectRatio(r)}
                        className={`cursor-pointer rounded px-2 py-1 text-[11px] font-semibold whitespace-nowrap transition-colors ${
                          aspectRatio === r
                            ? 'bg-slate-900 text-white'
                            : 'bg-slate-100 text-slate-600 hover:text-slate-950'
                        }`}
                      >
                        {r === '9:16' ? '9:16 Vertical' : r === '16:9' ? '16:9 Wide' : 'Original'}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => setBurnSubs((v) => !v)}
                    className="inline-flex cursor-pointer items-center gap-1.5 text-[11px] font-medium text-slate-700 hover:text-slate-950"
                  >
                    <Subtitles className="h-3.5 w-3.5 text-orange-500" />
                    <span>{burnSubs ? 'Burn SRT: EN → ES' : 'Embed SRT Soft'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Live Stream Card */}
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 p-3">
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <Radio className="h-3.5 w-3.5 text-orange-500" />
                  <p className="truncate text-xs font-bold text-slate-950">
                    stage_broadcast_feed.mpd
                  </p>
                </div>
                <p className="font-mono mt-0.5 text-[11px] text-slate-500 tabular-nums">
                  LIVE MPEG-DASH · Audio (EN, DE) · SHA-256 Ready
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] font-semibold text-slate-600 tabular-nums">
                  04:18
                </span>
                <span className="rounded-lg border border-slate-300 px-2.5 py-1 text-[11px] font-semibold text-slate-800 whitespace-nowrap">
                  Record Live
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500">
              <span className="font-mono">Rule: &#123;title&#125;_&#123;resolution&#125;.mp4</span>
              <span className="font-medium text-slate-700">Output: Extension Vault (OPFS)</span>
            </div>
          </div>
        )}

        {tab === 'phone' && (
          <div className="space-y-3">
            {/* Switch between Mode 1 and Mode 2 */}
            <div className="grid grid-cols-2 gap-1 rounded-lg bg-slate-100 p-1">
              <button
                type="button"
                onClick={() => setQrMode('direct')}
                className={`cursor-pointer rounded-md px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-colors ${
                  qrMode === 'direct' ? 'bg-white text-slate-950 shadow-xs' : 'text-slate-600'
                }`}
              >
                Detected Video Link
              </button>
              <button
                type="button"
                onClick={() => setQrMode('vault')}
                className={`cursor-pointer rounded-md px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-colors ${
                  qrMode === 'vault' ? 'bg-white text-slate-950 shadow-xs' : 'text-slate-600'
                }`}
              >
                Saved Vault / PC File
              </button>
            </div>

            <div className="flex flex-col items-center gap-4 rounded-xl border border-slate-200 bg-slate-50/70 p-4 sm:flex-row">
              <div className="shrink-0 rounded-xl border border-slate-200 bg-white p-2 shadow-xs">
                <QrPatternSvg />
              </div>

              <div className="min-w-0 flex-1 space-y-2 text-left">
                <p className="text-xs font-bold text-slate-950">
                  {qrMode === 'direct'
                    ? 'Direct Download to Phone (Zero PC Disk Use)'
                    : 'Direct Wi-Fi Transfer from Extension Vault'}
                </p>
                <p className="text-[11px] leading-relaxed text-slate-600">
                  {qrMode === 'direct'
                    ? 'Phone scans QR and opens snagly.video/receive.html to save the detected stream straight into mobile storage.'
                    : 'Transfers locally from your Extension Vault or chosen PC file — continues even if you close this popup.'}
                </p>

                {qrMode === 'vault' && (
                  <div className="rounded-lg border border-slate-200 bg-white p-2.5">
                    <div className="flex items-center justify-between text-[11px] font-semibold text-slate-800 tabular-nums">
                      <span>keynote_clip_9x16.mp4</span>
                      <span className="text-blue-700">68%</span>
                    </div>
                    <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded bg-slate-200">
                      <div className="h-full w-[68%] rounded bg-blue-600" />
                    </div>
                    <p className="font-mono mt-1 text-[10px] text-slate-500 tabular-nums">
                      19.4 MB / 28.5 MB · 14.2 MB/s local Wi-Fi
                    </p>
                  </div>
                )}

                <p className="font-mono truncate text-[10px] text-slate-500">
                  {qrMode === 'direct'
                    ? 'https://www.snagly.video/receive.html?mode=direct...'
                    : 'https://www.snagly.video/receive.html?mode=p2p&room=9f4a...'}
                </p>
              </div>
            </div>
          </div>
        )}

        {tab === 'bulk' && (
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs">
              <span className="font-semibold text-slate-900">
                Page Scraper (Alt+Shift+B) · Bookmark Vault
              </span>
              <span className="font-mono text-[11px] text-slate-600 tabular-nums">
                Concurrency: 3 · Cap: 5 MB/s
              </span>
            </div>

            <div className="divide-y divide-slate-100 rounded-xl border border-slate-200">
              {[
                {
                  file: '01_module_intro_1080p.mp4',
                  sub: 'Saved to Vault / Tutorials · SHA-256 verified',
                  status: '100%',
                  icon: FileCheck2,
                },
                {
                  file: '02_ffmpeg_pipeline_1080p.m3u8',
                  sub: 'Paused at segment 44/72 · Resumable anytime',
                  status: '61%',
                  icon: Pause,
                },
                {
                  file: '03_color_grading_workshop.mp4',
                  sub: 'Scheduled: Run when idle · Folder: Tutorials',
                  status: 'Queued',
                  icon: Bookmark,
                },
              ].map((row) => {
                const Icon = row.icon;
                return (
                  <div key={row.file} className="flex items-center justify-between gap-3 p-3">
                    <div className="flex min-w-0 items-center gap-2.5">
                      <Icon className="h-4 w-4 shrink-0 text-blue-600" />
                      <div className="min-w-0">
                        <p className="truncate text-xs font-bold text-slate-950">{row.file}</p>
                        <p className="truncate text-[11px] text-slate-500">{row.sub}</p>
                      </div>
                    </div>
                    <span className="font-mono shrink-0 text-xs font-semibold text-blue-700 tabular-nums">
                      {row.status}
                    </span>
                  </div>
                );
              })}
            </div>

            <p className="text-[11px] text-slate-500">
              Includes one-click Save Partial recovery, Bookmark folder filing, and silent PC folder export.
            </p>
          </div>
        )}

        {tab === 'vault' && (
          <div className="space-y-3">
            {/* Switch between Real Vault & Decoy PIN Demo */}
            <div className="flex items-center justify-between gap-2 rounded-xl border border-slate-200 bg-slate-950 p-3.5 text-white">
              <div className="flex items-center gap-2.5">
                <Lock className="h-4 w-4 text-orange-400" />
                <div>
                  <p className="text-xs font-bold">OPFS Private Vault</p>
                  <p className="text-[11px] text-slate-300">
                    Hidden from Chrome Downloads · Auto-lock: 2 min
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 rounded-md bg-slate-900 p-0.5 text-[10px]">
                <button
                  type="button"
                  onClick={() => setVaultView('real')}
                  className={`cursor-pointer rounded px-2 py-1 font-semibold ${
                    vaultView === 'real' ? 'bg-blue-600 text-white' : 'text-slate-400'
                  }`}
                >
                  Real PIN
                </button>
                <button
                  type="button"
                  onClick={() => setVaultView('decoy')}
                  className={`cursor-pointer rounded px-2 py-1 font-semibold ${
                    vaultView === 'decoy' ? 'bg-orange-500 text-white' : 'text-slate-400'
                  }`}
                >
                  Decoy PIN
                </button>
              </div>
            </div>

            {vaultView === 'real' ? (
              <div className="space-y-2.5">
                <div className="grid grid-cols-2 gap-2.5 text-xs">
                  <div className="rounded-lg border border-slate-200 p-3">
                    <p className="font-bold text-slate-950">Temp Auto-Destruct</p>
                    <p className="font-mono mt-1 text-[11px] text-orange-600 tabular-nums">
                      Expires in 47h 52m
                    </p>
                    <p className="mt-1 text-[11px] text-slate-600">
                      Auto-wipes temporary clips on schedule (1h–7d).
                    </p>
                  </div>
                  <div className="rounded-lg border border-slate-200 p-3">
                    <p className="font-bold text-slate-950">Metadata &amp; Proof</p>
                    <p className="font-mono mt-1 text-[11px] text-emerald-700 tabular-nums">
                      SHA-256 Verified
                    </p>
                    <p className="mt-1 text-[11px] text-slate-600">
                      Wipe encoder tags OR save .evidence.json manifest.
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-[11px] text-slate-700">
                  <span>Local OPFS Usage: 1.4 GB / 61.0 GB</span>
                  <span className="font-mono font-semibold text-slate-900">Alt+Shift+H Panic</span>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 py-8 text-center">
                <EyeOff className="h-6 w-6 text-slate-400" />
                <p className="mt-2 text-xs font-bold text-slate-900">
                  Decoy PIN Active — Empty Downloads View
                </p>
                <p className="mt-1 max-w-xs text-[11px] text-slate-600">
                  Entering your alternate 4-digit Decoy PIN opens a clean, empty state while all real Vault files stay concealed.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export function ToolbarIndicatorShowcase() {
  const [selected, setSelected] = useState<ToolbarStateItem['id']>('detected');
  const current = TOOLBAR_STATES.find((s) => s.id === selected) ?? TOOLBAR_STATES[1];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="text-xs font-semibold tracking-wider text-blue-700 uppercase">
            Real-Time Toolbar Feedback
          </p>
          <h3 className="font-display mt-2 text-2xl font-extrabold tracking-tight text-slate-950 text-balance">
            It tells you the instant a stream is ready — and disappears in one keystroke.
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            Click any toolbar state to preview how Snagly signals active streams, live recordings, or Panic Hide directly in Chrome.
          </p>
        </div>

        <div className="lg:col-span-7">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {TOOLBAR_STATES.map((item) => {
              const isSelected = item.id === selected;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelected(item.id)}
                  className={`flex cursor-pointer flex-col items-start rounded-xl border p-3.5 text-left transition-colors ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50/50'
                      : 'border-slate-200 bg-slate-50/50 hover:border-slate-300'
                  }`}
                >
                  {/* Simulated Chrome Toolbar Icon */}
                  <div className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white">
                    {item.id === 'idle' && (
                      <div className="h-6 w-6 rounded-md bg-slate-300" />
                    )}
                    {item.id === 'detected' && (
                      <>
                        <SnaglyLogo className="h-6 w-6" />
                        <span className="font-mono absolute -right-1.5 -bottom-1.5 rounded bg-blue-600 px-1.5 py-0.5 text-[10px] font-bold text-white tabular-nums">
                          3
                        </span>
                      </>
                    )}
                    {item.id === 'live' && (
                      <>
                        <SnaglyLogo className="h-6 w-6" />
                        <span className="font-mono absolute -right-2 -bottom-1.5 rounded bg-orange-600 px-1 py-0.5 text-[9px] font-bold text-white">
                          REC
                        </span>
                      </>
                    )}
                    {item.id === 'panic' && (
                      <EyeOff className="h-5 w-5 text-slate-500" />
                    )}
                  </div>

                  <span className="mt-3 text-xs font-bold text-slate-950">{item.label}</span>
                  <span className="font-mono mt-0.5 text-[11px] text-slate-500">
                    {item.badgeText}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-950">
              <Check className="h-4 w-4 text-blue-600" />
              <span>{current.label}:</span>
              <span className="font-normal text-slate-700">{current.summary}</span>
            </div>
            <p className="mt-1.5 pl-6 text-xs leading-relaxed text-slate-600">{current.detail}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function WorkflowStagePreview({ stageId }: { stageId: string }) {
  if (stageId === 'detect') {
    return (
      <div className="space-y-3 rounded-xl border border-slate-800 bg-slate-950 p-5 text-white">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 text-xs">
          <span className="font-semibold text-slate-200">Detected Variants (Pre-Roll Ads Skipped)</span>
          <span className="font-mono text-blue-400">Sort: Quality · HLS/DASH</span>
        </div>
        {[
          { title: '4K Master HLS Stream', meta: '3840×2160 · H.265 · 60fps · 14.8 Mbps', size: '684 MB' },
          { title: 'Full HD Balanced MP4', meta: '1920×1080 · H.264 + AAC · 60fps', size: '248 MB' },
          { title: 'Detected Subtitles (3)', meta: 'English (.vtt), Spanish (.srt), Hindi (.srt)', size: '42 KB' },
        ].map((item) => (
          <div
            key={item.title}
            className="flex items-center justify-between gap-3 rounded-lg border border-slate-800 bg-slate-900/90 p-3"
          >
            <div className="min-w-0">
              <p className="truncate text-xs font-bold text-white">{item.title}</p>
              <p className="font-mono mt-0.5 text-[11px] text-slate-400">{item.meta}</p>
            </div>
            <span className="font-mono shrink-0 text-xs font-semibold text-blue-400 tabular-nums">
              {item.size}
            </span>
          </div>
        ))}
      </div>
    );
  }

  if (stageId === 'trim') {
    return (
      <div className="space-y-4 rounded-xl border border-slate-800 bg-slate-950 p-5 text-white">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 text-xs">
          <span className="font-semibold text-slate-200">Segment Clip Trimmer &amp; Framing</span>
          <span className="font-mono text-orange-400 tabular-nums">04:10 → 05:35</span>
        </div>
        <div className="rounded-lg border border-slate-800 bg-slate-900 p-3.5">
          <div className="flex justify-between text-[11px] text-slate-400 tabular-nums">
            <span>Full Stream: 42:18 (~1.8 GB)</span>
            <span className="font-semibold text-emerald-400">Clip: 01:25 (~58 MB saved)</span>
          </div>
          <div className="mt-2.5 h-2.5 w-full overflow-hidden rounded bg-slate-800">
            <div className="ml-[22%] h-full w-[26%] rounded bg-orange-500" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          <div className="rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-slate-400">
            Original
          </div>
          <div className="rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-slate-300">
            16:9 Landscape
          </div>
          <div className="rounded-lg border border-blue-500 bg-blue-600/20 px-3 py-2 font-semibold text-blue-300">
            9:16 Vertical
          </div>
        </div>
      </div>
    );
  }

  if (stageId === 'process') {
    return (
      <div className="space-y-3 rounded-xl border border-slate-800 bg-slate-950 p-5 text-white">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 text-xs">
          <span className="font-semibold text-slate-200">In-Browser WASM FFmpeg &amp; Verification</span>
          <span className="font-mono text-emerald-400">0 Bytes Uploaded</span>
        </div>
        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900 p-3">
            <span className="text-slate-300">Video + Multi-Audio (EN, ES) Mux</span>
            <span className="font-mono text-emerald-400">H.264 / AAC .mp4</span>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900 p-3">
            <span className="text-slate-300">Subtitle Pipeline</span>
            <span className="font-mono text-blue-300">Translated + Burned SRT</span>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900 p-3">
            <span className="text-slate-300">Cryptographic Verification</span>
            <span className="font-mono text-slate-300">SHA-256 + .evidence.json</span>
          </div>
        </div>
      </div>
    );
  }

  if (stageId === 'queue') {
    return (
      <div className="space-y-3 rounded-xl border border-slate-800 bg-slate-950 p-5 text-white">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 text-xs">
          <span className="font-semibold text-slate-200">Bulk Queue &amp; Byte-Level Resume</span>
          <span className="font-mono text-blue-400">Schedule: When Idle</span>
        </div>
        {[
          { name: 'lecture_01_architecture.mp4', state: 'Completed · 310 MB' },
          { name: 'lecture_02_codecs.m3u8', state: 'Resuming at Seg #118 (74%)' },
          { name: 'lecture_03_storage.mp4', state: 'Save Partial Playable Ready' },
        ].map((item) => (
          <div
            key={item.name}
            className="flex items-center justify-between gap-2 rounded-lg border border-slate-800 bg-slate-900 p-3 text-xs"
          >
            <span className="truncate font-semibold text-white">{item.name}</span>
            <span className="font-mono shrink-0 text-[11px] text-slate-300 tabular-nums">
              {item.state}
            </span>
          </div>
        ))}
      </div>
    );
  }

  if (stageId === 'vault') {
    return (
      <div className="space-y-3 rounded-xl border border-slate-800 bg-slate-950 p-5 text-white">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 text-xs">
          <span className="font-semibold text-slate-200">Destination &amp; OPFS Security</span>
          <span className="font-mono text-orange-400">PIN + Decoy Active</span>
        </div>
        <div className="grid grid-cols-2 gap-2.5 text-xs">
          <div className="rounded-lg border border-slate-800 bg-slate-900 p-3">
            <p className="font-bold text-white">Silent PC Folder</p>
            <p className="font-mono mt-1 text-[11px] text-slate-400">
              Downloads/Snagly/&lt;site&gt;/
            </p>
          </div>
          <div className="rounded-lg border border-slate-800 bg-slate-900 p-3">
            <p className="font-bold text-white">OPFS Private Vault</p>
            <p className="font-mono mt-1 text-[11px] text-emerald-400">
              0 Entries in Chrome History
            </p>
          </div>
          <div className="rounded-lg border border-slate-800 bg-slate-900 p-3">
            <p className="font-bold text-white">Temp Auto-Destruct</p>
            <p className="font-mono mt-1 text-[11px] text-orange-300">1h / 6h / 24h / 48h / 7d</p>
          </div>
          <div className="rounded-lg border border-slate-800 bg-slate-900 p-3">
            <p className="font-bold text-white">Cloud Direct Sync</p>
            <p className="font-mono mt-1 text-[11px] text-blue-300">Drive · Dropbox · pCloud</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3 rounded-xl border border-slate-800 bg-slate-950 p-5 text-white">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 text-xs">
        <span className="font-semibold text-slate-200">Dual-Mode QR Bridge (Zero CLI)</span>
        <span className="font-mono text-emerald-400">snagly.video/receive.html</span>
      </div>
      <div className="flex items-center gap-4 rounded-lg border border-slate-800 bg-slate-900 p-3.5">
        <div className="shrink-0 rounded-lg bg-white p-1.5">
          <QrPatternSvg />
        </div>
        <div className="space-y-1.5 text-xs">
          <div className="flex items-center gap-1.5 font-bold text-white">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>Direct Link OR Wi-Fi Vault Transfer</span>
          </div>
          <p className="text-[11px] leading-relaxed text-slate-300">
            Scan with any iOS or Android camera. Detected stream links download straight to your phone; saved Vault or PC videos stream directly over local Wi-Fi—even after closing the popup.
          </p>
        </div>
      </div>
    </div>
  );
}
