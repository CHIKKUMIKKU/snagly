export type AppRoute =
  | '/'
  | '/architecture'
  | '/features'
  | '/pricing'
  | '/terms'
  | '/refund-policy'
  | '/privacy'
  | '/contact';

export const SITE_CONFIG = {
  brandName: 'Snagly',
  fullTitle: 'Snagly Video Downloader: Trim, Bulk & Private Vault',
  version: '2.1',
  domain: 'snagly.video',
  websiteUrl: 'https://snagly.video',
  supportEmail: 'ramakantandon@gmail.com',
  chromeStoreUrl: 'https://chromewebstore.google.com/detail/eabjfnlogjgafmbnjiohbodeknohpccj',
  lastUpdated: 'November 2026',
} as const;

export interface ToolbarStateItem {
  id: 'idle' | 'detected' | 'live' | 'panic';
  label: string;
  badgeText: string;
  summary: string;
  detail: string;
}

export const TOOLBAR_STATES: ToolbarStateItem[] = [
  {
    id: 'idle',
    label: 'Idle Page',
    badgeText: '—',
    summary: 'Neutral monochrome icon when no video or audio stream has loaded yet.',
    detail: 'Zero background CPU polling — Snagly stays silent until playback or media requests begin.',
  },
  {
    id: 'detected',
    label: 'Streams Found',
    badgeText: '3',
    summary: 'Cobalt blue icon with live count badge as soon as HLS, DASH, or MP4 tracks appear.',
    detail: 'Click once to open the Popup or docked Side Panel with resolution, codec, audio, and subtitle options.',
  },
  {
    id: 'live',
    label: 'Live Capture',
    badgeText: 'REC',
    summary: 'Indicates an active live broadcast recording or multi-track MP4 mux running in the background.',
    detail: 'Close the popup or switch tabs freely — offscreen workers finish muxing and saving automatically.',
  },
  {
    id: 'panic',
    label: 'Panic Hide (Alt+Shift+H)',
    badgeText: 'Hidden',
    summary: 'Instant privacy disguise clears open views, locks the Private Vault, and masks notifications.',
    detail: 'Press Alt+Shift+H on any webpage or inside the panel to protect local downloads in one keystroke.',
  },
];

export interface WorkflowStage {
  step: string;
  id: string;
  shortTitle: string;
  title: string;
  lead: string;
  userAction: string;
  engineAction: string;
  outcome: string;
  specs: string[];
}

export const WORKFLOW_STAGES: WorkflowStage[] = [
  {
    step: '01',
    id: 'detect',
    shortTitle: 'Detect & Inspect',
    title: '01. Zero-Copy-Paste Stream & Subtitle Discovery',
    lead: 'Open any supported webpage and play the video. Snagly passively inspects your own browser network requests and DOM elements in parallel.',
    userAction: 'Browse normally or press Alt+Shift+D to open the Snagly Side Panel or Popup. Or paste any direct .m3u8, .mpd, or .mp4 stream URL manually.',
    engineAction: 'Filters out pre-roll ads, parses master playlists, resolves separate video/audio streams, measures codec/FPS/bitrate, and detects .vtt, .srt, .ass, and .ttml caption files.',
    outcome: 'Clean variant cards appear sorted by Best, Resolution, Size, or Duration — ready for download or direct phone QR.',
    specs: ['HLS (.m3u8)', 'MPEG-DASH (.mpd)', 'MP4 / WebM', 'Pre-Roll Ad Filter'],
  },
  {
    step: '02',
    id: 'trim',
    shortTitle: 'Trim & Crop',
    title: '02. Pre-Download Segment Trimming & 16:9 / 9:16 Framing',
    lead: 'Never download an entire 2-hour stream just to keep a 45-second highlight. Trim and reframe before downloading the full file.',
    userAction: 'Drag Start and End timestamps right on the video card, optionally select 16:9 Landscape or 9:16 Vertical crop, or pick Audio-Only (.m4a) / Remove Audio.',
    engineAction: 'Maps timestamps directly to HLS/DASH media segment ranges or MP4 moov/moof keyframes so only the selected window is fetched and processed.',
    outcome: 'Cuts download time and disk space dramatically while producing ready-to-post landscape or vertical clips.',
    specs: ['Start / End Scrubber', '9:16 Vertical Crop', '16:9 Landscape', 'Audio-Only .m4a'],
  },
  {
    step: '03',
    id: 'process',
    shortTitle: 'Mux & Convert',
    title: '03. Local Browser FFmpeg Muxing, Subtitles & H.264 Conversion',
    lead: 'Modern web streams split video, audio, and captions apart or encode in WebM/AV1/HEVC. Snagly combines and standardizes everything on your CPU.',
    userAction: 'Keep Auto-convert to H.264 MP4 enabled, choose multiple audio languages if available, and optionally auto-translate captions or hardcode SRT subtitles into the video.',
    engineAction: 'In-browser WebAssembly FFmpeg + MP4 Muxer merges video, multi-track audio, and translated SRT streams locally — with optional SHA-256 checksum & .evidence.json manifest or metadata stripping.',
    outcome: 'One universal, playable H.264/AAC MP4 file — zero remote converter uploads, zero watermarks, zero cloud queues.',
    specs: ['Local WASM FFmpeg', 'Auto H.264 MP4', 'SRT Auto-Translate & Burn-In', 'SHA-256 Manifest'],
  },
  {
    step: '04',
    id: 'queue',
    shortTitle: 'Bulk & Resume',
    title: '04. Floating Bulk Scraper, Scheduling & True Pause/Resume',
    lead: 'Collecting a multi-part course, lecture series, or archive? Automate the entire queue with bandwidth control and crash-safe resumption.',
    userAction: 'Press Alt+Shift+B to show the floating page scraper bar, select multiple video cards or paste a list of page links, set concurrency (1–5), speed limit, and schedule (Immediate, At Time, or When Idle).',
    engineAction: 'Background offscreen workers store downloaded bytes/segments checkpoint-by-checkpoint in IndexedDB/OPFS so paused or interrupted downloads resume at the exact segment—or save a playable partial file anytime.',
    outcome: 'You can close the popup or finish browsing while Snagly completes every item quietly in the background.',
    specs: ['Alt+Shift+B Bar', '1–5 Concurrency', 'Speed Cap (MB/s)', 'Byte/Segment Resume'],
  },
  {
    step: '05',
    id: 'vault',
    shortTitle: 'Save or Vault',
    title: '05. Silent PC Folder Saving, Cloud Sync, or PIN-Locked Private Vault',
    lead: 'Choose exactly where media lands: a pre-authorized PC folder, an encrypted-feel local OPFS Private Vault, or your personal cloud drive.',
    userAction: 'Bind a PC folder once (no repeated Save-As dialogs) with Smart Naming rules like {title}_{resolution}, organize page bookmarks into Vault folders, or toggle Extension Vault with a 4-digit PIN & Decoy PIN.',
    engineAction: 'Files saved inside Chrome Origin Private File System (OPFS) never appear in chrome://downloads history. Temp Auto-Destruct automatically wipes timed vault items after 1h–7d; optional metadata strip scrubs encoder tags.',
    outcome: 'Complete organization across work projects, personal research, and private media libraries.',
    specs: ['OPFS Private Vault', 'PIN + Decoy PIN', '1h–7d Auto-Destruct', 'Drive / Dropbox / pCloud'],
  },
  {
    step: '06',
    id: 'phone',
    shortTitle: 'Send to Phone',
    title: '06. Zero-CLI Send to Phone via QR & Local Wi-Fi',
    lead: 'Move any detected stream or already-saved desktop video to your phone in seconds — without USB cables, cloud uploads, or desktop server installs.',
    userAction: 'Click the Phone QR icon next to any newly detected webpage video (saves directly onto your phone) OR click Send to Phone on any Vault / PC video and scan via snagly.video/receive.html.',
    engineAction: 'Direct URLs encode into a lightweight local QR code. Saved Vault/PC files stream directly browser-to-browser over local Wi-Fi in flow-controlled 32 KB chunks inside the background worker — continuing even if you close the popup.',
    outcome: 'Your video appears directly in your phone Downloads folder with zero accounts, zero file-size paywalls, and zero terminal setup.',
    specs: ['Direct Stream QR', 'Local Wi-Fi P2P Transfer', 'Runs After Popup Close', 'Zero CLI / Zero App'],
  },
];

export const DATA_FLOW_NODES = [
  {
    num: '01',
    title: 'Website Stream',
    caption: 'Video & caption segments play inside your tab using your existing session.',
  },
  {
    num: '02',
    title: 'Chrome Tab Session',
    caption: 'Snagly reads media metadata locally — never forwarding URLs to external converters.',
  },
  {
    num: '03',
    title: 'Local WASM Engine',
    caption: 'Trims timestamps, crops 16:9/9:16, translates SRT, and muxes H.264 MP4 on your CPU.',
  },
  {
    num: '04',
    title: 'Your Destination',
    caption: 'Silent PC folder, PIN-locked OPFS Vault, personal Cloud, or Wi-Fi QR to Phone.',
  },
];

export const CORE_CAPABILITIES = [
  {
    num: '01',
    title: 'Live Broadcast Capture & Multi-Track Muxing',
    summary:
      'Capture live HLS and MPEG-DASH broadcasts in real time with live elapsed timer and byte counters. Inspect exact video/audio codecs (H.264, HEVC, AV1, VP9, AAC, Opus), FPS, and bitrate, merge separate audio languages into one MP4, or save crisp .m4a audio-only tracks.',
    specs: ['HLS & DASH Live', 'H.264 / HEVC / AV1', 'Multi-Language Audio'],
    span: 'lg:col-span-2',
  },
  {
    num: '02',
    title: 'Pre-Download Clip Trimmer & 9:16 Crop',
    summary:
      'Pick exact Start and End timestamps before downloading the full file on MP4, HLS, and DASH streams—plus one-click 16:9 Landscape or 9:16 Vertical aspect-ratio framing.',
    specs: ['Timestamp Scrubber', '9:16 & 16:9 Crop'],
    span: 'lg:col-span-1',
  },
  {
    num: '03',
    title: 'PIN-Locked OPFS Vault, Decoy PIN & Panic Hide',
    summary:
      'Store downloads inside Chrome Origin Private File System—completely hidden from Chrome history. Lock with a 4-digit PIN, configure a Decoy PIN that opens an empty view, enable 1h–7d Temp Auto-Destruct, or press Alt+Shift+H to disguise the icon.',
    specs: ['OPFS Isolation', 'Decoy PIN', 'Alt+Shift+H Panic'],
    span: 'lg:col-span-1',
  },
  {
    num: '04',
    title: 'Subtitle Extract, Auto-Translate & Burn-In',
    summary:
      'Automatically discover .vtt, .srt, .ass, and .ttml caption files on the page. Translate subtitles into your native language automatically and either embed soft tracks or burn clean subtitles directly into the video.',
    specs: ['VTT / SRT / ASS', 'Auto-Translate', 'Hardcode Burn-In'],
    span: 'lg:col-span-1',
  },
  {
    num: '05',
    title: 'SHA-256 Verification, Smart Naming & Cloud Sync',
    summary:
      'Strip container metadata cleanly before saving, or generate cryptographic SHA-256 checksums with .evidence.json manifests. Automate filenames with {title}, {resolution}, {codec}, and Regex rules, bind a silent PC folder, or push directly to Google Drive, Dropbox, OneDrive, or pCloud.',
    specs: ['SHA-256 Manifest', 'Regex Naming', '4 Cloud Providers'],
    span: 'lg:col-span-1',
  },
];

export interface UseCasePersona {
  num: string;
  role: string;
  headline: string;
  painPoint: string;
  howSnaglyHelps: string;
  keyTools: string[];
}

export const USE_CASE_PERSONAS: UseCasePersona[] = [
  {
    num: '01',
    role: 'Creators & Short-Form Editors',
    headline: 'Clip exact moments and reframe to 9:16 before the file even saves.',
    painPoint: 'Downloading an entire 90-minute stream, waiting to re-encode WebM/AV1 in desktop software, and manually cropping for Reels or Shorts wastes hours.',
    howSnaglyHelps: 'Set exact Start/End timestamps right in the extension, toggle 9:16 Vertical or 16:9 crop, auto-convert to edit-ready H.264 MP4 locally, or export clean .m4a audio tracks in one click.',
    keyTools: ['Clip Trimmer', '9:16 Vertical Crop', 'Auto H.264 MP4', 'Audio-Only .m4a'],
  },
  {
    num: '02',
    role: 'Researchers, Journalists & Educators',
    headline: 'Capture live broadcasts, translate captions, and keep SHA-256 proof.',
    painPoint: 'Important livestreams disappear when streams end, foreign-language briefings lack native captions, and downloaded clips lack file integrity records.',
    howSnaglyHelps: 'Record active live streams in real time, auto-translate detected captions into your native SRT language (soft or burned-in), and attach a SHA-256 hash + .evidence.json manifest per download.',
    keyTools: ['Live Recording', 'SRT Auto-Translate', 'SHA-256 Manifest', 'Bookmark Folders'],
  },
  {
    num: '03',
    role: 'Privacy-First & Shared-PC Users',
    headline: 'Keep local media out of browser history with OPFS, PIN & Panic Hide.',
    painPoint: 'Standard browser downloads leave filenames, URLs, and thumbnails exposed in Chrome Downloads history and default OS folders.',
    howSnaglyHelps: 'Save into Snagly’s isolated OPFS Private Vault with custom folders/tags, protect it with a 4-digit PIN + alternate Decoy PIN, auto-delete temp files on a 1h–7d timer, strip MP4 metadata, and trigger Alt+Shift+H Panic Hide anytime.',
    keyTools: ['OPFS Private Vault', 'Decoy PIN', 'Temp Auto-Destruct', 'Metadata Strip'],
  },
  {
    num: '04',
    role: 'Mobile Watchers & Course Collectors',
    headline: 'Batch-queue full pages on desktop, then watch effortlessly on your phone.',
    painPoint: 'Sending large saved videos to an iPhone or Android usually requires cables, slow cloud uploads, or installing command-line companion servers.',
    howSnaglyHelps: 'Use Alt+Shift+B to queue every video on a page with bandwidth caps and idle scheduling, then scan a QR code at snagly.video/receive.html to stream files over local Wi-Fi straight to your phone.',
    keyTools: ['Alt+Shift+B Scraper', 'Idle Scheduler', 'Zero-CLI Phone QR', 'True Pause/Resume'],
  },
];

export interface ComparisonCategoryCard {
  category: string;
  tradeoffLabel: string;
  limitations: string[];
  highlighted?: boolean;
}

export const COMPARISON_CATEGORY_CARDS: ComparisonCategoryCard[] = [
  {
    category: 'Online Paste-Link Websites',
    tradeoffLabel: 'Remote Servers & Ads',
    limitations: [
      'Requires copying page links and routing media through third-party remote servers',
      'Fails on authenticated browser sessions, private portals, or live streams',
      'Strict resolution caps, slow queues, watermarks, or pop-up ad redirects',
      'Zero local Vault, zero batch scraping, zero pre-download segment trimming',
    ],
  },
  {
    category: 'Command-Line Tools',
    tradeoffLabel: 'Manual Terminal Setup',
    limitations: [
      'Requires installing terminals, updating binaries, and memorizing complex CLI flags',
      'No instant browser-tab detection badge or visual stream quality comparison',
      'No built-in UI scrubber for 9:16 vertical cropping or visual subtitle burn-in',
      'No PIN-locked browser Vault, Decoy mode, or one-scan QR phone handoff',
    ],
  },
  {
    category: 'Typical Browser Extensions',
    tradeoffLabel: 'Basic Capture Only',
    limitations: [
      'Often force installing a separate paid desktop companion app just to merge audio/video',
      'Download entire files only — no pre-download clip trimming or 9:16 framing',
      'Expose every downloaded filename directly in Chrome download history',
      'Lack subtitle auto-translation, SHA-256 verification, Decoy PINs, and QR transfer',
    ],
  },
  {
    category: 'Snagly Video Workspace',
    tradeoffLabel: 'Everything Included Locally',
    highlighted: true,
    limitations: [
      'Runs entirely inside Chrome with built-in WebAssembly FFmpeg, Side Panel & Popup UI',
      'Pre-download clip trimmer, 16:9/9:16 crop, auto H.264 MP4 & multi-track muxing',
      'PIN + Decoy PIN Private Vault (OPFS), Temp Auto-Destruct & Alt+Shift+H Panic Hide',
      'Zero-CLI Dual-Mode QR Phone Bridge, Alt+Shift+B Bulk Scraper & Cloud Integrations',
    ],
  },
];

export interface ExtraComparisonRow {
  capability: string;
  snagly: string;
  typicalExtensions: string;
  onlineAndCli: string;
}

export const EXTRA_COMPARISON_MATRIX: ExtraComparisonRow[] = [
  {
    capability: 'Local Browser Execution (Zero Remote Uploads)',
    snagly: 'Fully On-Device (WASM + OPFS)',
    typicalExtensions: 'Often requires external helper',
    onlineAndCli: 'Remote servers / Manual CLI',
  },
  {
    capability: 'HLS (.m3u8), DASH (.mpd) & Live Broadcast Recording',
    snagly: 'Real-time capture + live timer',
    typicalExtensions: 'Limited or split tracks only',
    onlineAndCli: 'Fails on browser session auth',
  },
  {
    capability: 'Pre-Download Segment Clip Trimmer (Start → End)',
    snagly: 'Built-in visual scrubber',
    typicalExtensions: 'Full-file download only',
    onlineAndCli: 'Post-download manual cut',
  },
  {
    capability: 'Aspect Ratio Cropping (16:9 & 9:16 Vertical)',
    snagly: 'One-click pre-export crop',
    typicalExtensions: 'Not included',
    onlineAndCli: 'Complex FFmpeg flags',
  },
  {
    capability: 'Universal Auto H.264 MP4 & Multi-Audio Muxing',
    snagly: 'Automatic in-browser mux/convert',
    typicalExtensions: 'Often gated behind extra app',
    onlineAndCli: 'Manual multi-step merge',
  },
  {
    capability: 'Subtitles: Extract, Auto-Translate & Hardcode Burn-In',
    snagly: 'VTT/SRT/ASS + Auto-Translate + Burn',
    typicalExtensions: 'Raw caption file only (if any)',
    onlineAndCli: 'Separate scripts required',
  },
  {
    capability: 'Zero-CLI Send to Phone (QR Link + Local Wi-Fi P2P)',
    snagly: 'Built-in Dual-Mode QR Bridge',
    typicalExtensions: 'Not included',
    onlineAndCli: 'USB cable / cloud upload',
  },
  {
    capability: 'Private OPFS Vault (Hidden from Chrome History)',
    snagly: 'Isolated OPFS + Folders & Tags',
    typicalExtensions: 'Dumps to Chrome Downloads',
    onlineAndCli: 'Standard OS folders only',
  },
  {
    capability: '4-Digit PIN Lock, Decoy PIN & Alt+Shift+H Panic Hide',
    snagly: 'PIN + Decoy Mode + Icon Disguise',
    typicalExtensions: 'Not included',
    onlineAndCli: 'Not included',
  },
  {
    capability: 'Temp Auto-Destruct Vault (1h – 7 Days)',
    snagly: 'Configurable auto-wipe timer',
    typicalExtensions: 'Not included',
    onlineAndCli: 'Manual cleanup',
  },
  {
    capability: 'Floating Bulk Scraper (Alt+Shift+B) & Idle Scheduler',
    snagly: 'Queue 1–5 streams + Timed/Idle',
    typicalExtensions: 'Single tab click-by-click',
    onlineAndCli: 'Manual URL scripts',
  },
  {
    capability: 'True Byte/Segment Pause, Resume & Partial Recovery',
    snagly: 'Survives browser restarts',
    typicalExtensions: 'Restarts from 0% on fail',
    onlineAndCli: 'Varies by tool',
  },
  {
    capability: 'Cryptographic SHA-256 Hash + Evidence Manifest / Metadata Strip',
    snagly: 'Both SHA-256 proof & tag wipe',
    typicalExtensions: 'Not included',
    onlineAndCli: 'Separate hashing tool',
  },
  {
    capability: 'Smart Naming Tokens, Regex Rules & Silent PC Folder',
    snagly: '{title}, {codec}, Regex & silent write',
    typicalExtensions: 'Basic title or random hash',
    onlineAndCli: 'CLI templates only',
  },
  {
    capability: 'Direct Cloud Upload (Drive, Dropbox, OneDrive, pCloud)',
    snagly: 'Built-in OAuth direct export',
    typicalExtensions: 'Not included',
    onlineAndCli: 'Manual re-upload',
  },
];

export const COMPATIBILITY_BROWSERS = [
  { name: 'Google Chrome', note: 'Version 116+ (Side Panel & Popup)' },
  { name: 'Microsoft Edge', note: 'Full MV3 Side Panel support' },
  { name: 'Brave Browser', note: 'Shields-compatible local capture' },
  { name: 'Opera & Vivaldi', note: 'Desktop Chromium across Windows, macOS, Linux & ChromeOS' },
];

export const HONEST_LIMITATIONS = [
  {
    severity: 'red' as const,
    title: 'DRM-Protected Streams Are Never Bypassed',
    text: 'Encrypted streaming systems using Widevine, FairPlay, or PlayReady are protected at the browser media pipeline level and cannot be downloaded.',
  },
  {
    severity: 'red' as const,
    title: 'Restricted Platforms Are Excluded in Manifest',
    text: 'YouTube, Netflix, Prime Video, Disney+, Max, Hulu, Hotstar, X, and Reddit are explicitly excluded in Snagly’s manifest.',
  },
  {
    severity: 'amber' as const,
    title: 'Media Must Load in the Active Tab First',
    text: 'Snagly detects streams once playback or player initialization requests them. If a video does not appear immediately, start playback or refresh the page.',
  },
  {
    severity: 'amber' as const,
    title: 'Authorized Personal & Owned Media Only',
    text: 'Use Snagly solely for media you own or have permission to save. The current release is available at no charge. Pro is planned for a future release.',
  },
];

export const HOW_IT_WORKS_STEPS = [
  {
    step: '01',
    title: 'Install Snagly in Chrome (30 Seconds)',
    description:
      'Add Snagly v2.1 to Chrome, Edge, Brave, Opera, or Vivaldi. Pin it to your toolbar or press Alt+Shift+D for the docked Side Panel — no account or CLI setup needed.',
  },
  {
    step: '02',
    title: 'Install and Check Compatibility',
    description:
      'Install the current release and check compatibility on the non-DRM websites you use. No payment or license key is required.',
  },
  {
    step: '03',
    title: 'Pro — Coming Soon',
    description:
      'Snagly Pro is planned for a future release. It is not currently available to purchase or activate.',
  },
];

export const FAQ_ITEMS = [
  {
    q: 'Do I need to install any companion server, CLI utility, or phone app?',
    a: 'No. Snagly v2.1 runs natively inside your Chrome browser using built-in WebAssembly FFmpeg, OPFS storage, and local WebRTC PeerJS for Send to Phone. Simply scan the QR code with your phone camera at snagly.video/receive.html — nothing extra to install on your phone or PC.',
  },
  {
    q: 'Does Snagly upload my videos or URLs to a remote conversion server?',
    a: 'Never. Detection, segment fetching, trimming, 9:16 cropping, subtitle burn-in, PIN hashing, and Private Vault storage happen entirely locally on your device. When sending a saved Vault or PC video to your phone, chunks transfer directly browser-to-browser over local Wi-Fi.',
  },
  {
    q: 'What tools are included in the current Snagly release?',
    a: 'The current Snagly release combines supported video detection and downloads, pre-download segment trimming, 9:16/16:9 cropping, H.264 MP4 conversion, subtitle extraction and translation, a PIN/Decoy-locked OPFS Private Vault, SHA-256 verification manifests, and phone transfers. Availability of individual functions can depend on the website, media format, and optional local helper.',
  },
  {
    q: 'How does Send to Phone work if I close the extension popup?',
    a: 'For detected webpage videos, the QR code passes the direct stream link to snagly.video/receive.html so your phone downloads directly without touching your PC disk. For videos already in your Vault or PC folder, Snagly runs the transfer inside Chrome’s background offscreen worker—so downloads to your phone keep running even if you close the QR popup.',
  },
  {
    q: 'Does Snagly currently require payment?',
    a: 'No. The currently released version is available at no charge, and all features in the current release are available without a subscription or license key. Snagly Pro is planned for a future release and is not currently available to purchase.',
  },
  {
    q: 'Which websites does Snagly NOT support?',
    a: 'Snagly does not bypass DRM (Widevine, FairPlay, PlayReady) and does not host media. Restricted platforms including YouTube, Netflix, Prime Video, Disney+, Max, Hulu, Hotstar, X/Twitter, and Reddit are explicitly excluded in the extension manifest.',
  },
  {
    q: 'When will Snagly Pro be available?',
    a: 'Snagly Pro is planned for a future release. It cannot currently be purchased or activated. Any pricing and billing details will be published before it becomes available.',
  },
];
