export type AppRoute =
  | '/'
  | '/features'
  | '/pricing'
  | '/terms'
  | '/refund-policy'
  | '/privacy'
  | '/contact';

export type BillingCycle = 'yearly' | 'monthly' | 'lifetime';

export interface PricingTierCard {
  id: 'free' | 'pro' | 'lifetime';
  name: string;
  eyebrow: string;
  monthlyDisplay: string;
  yearlyDisplay: string;
  lifetimeDisplay: string;
  billingNoteMonthly: string;
  billingNoteYearly: string;
  billingNoteLifetime: string;
  savingsNote?: string;
  ctaLabel: string;
  highlighted?: boolean;
  bannerText?: string;
  features: {
    label: string;
    included: boolean;
  }[];
}

export const SITE_CONFIG = {
  brandName: 'Snagly',
  fullTitle: 'Snagly Video Downloader: Trim, Bulk & Private Vault',
  version: '1.5.0',
  domain: 'snagly.video',
  websiteUrl: 'https://snagly.video',
  supportEmail: 'ramakantandon@gmail.com',
  merchantOfRecord: 'Dodo Payments',
  chromeStoreUrl: 'https://chromewebstore.google.com/detail/eabjfnlogjgafmbnjiohbodeknohpccj',
  lastUpdated: 'November 2026',
  // Replace these checkout links with your live Dodo Payments Product Checkout URLs
  checkoutUrls: {
    monthly: 'https://checkout.dodopayments.com/buy/PASTE_MONTHLY_PRODUCT_ID?quantity=1',
    yearly: 'https://checkout.dodopayments.com/buy/PASTE_YEARLY_PRODUCT_ID?quantity=1',
    lifetime: 'https://checkout.dodopayments.com/buy/PASTE_LIFETIME_PRODUCT_ID?quantity=1',
  },
  prices: {
    monthly: {
      id: 'monthly' as BillingCycle,
      label: 'Monthly',
      price: '$4.99',
      unit: '/mo',
      billedText: 'Billed $4.99 monthly',
      badge: '',
    },
    yearly: {
      id: 'yearly' as BillingCycle,
      label: 'Annual',
      price: '$3.75',
      unit: '/mo',
      annualTotal: '$44.99',
      billedText: 'Billed $44.99 annually',
      badge: 'Save 25%',
    },
    lifetime: {
      id: 'lifetime' as BillingCycle,
      label: 'Lifetime',
      price: '$74.99',
      unit: ' one-time',
      billedText: 'Pay once, own forever',
      badge: 'Pay once',
    },
  },
} as const;

export const PRICING_CARDS: PricingTierCard[] = [
  {
    id: 'free',
    name: 'Free',
    eyebrow: 'Get started',
    monthlyDisplay: '$0',
    yearlyDisplay: '$0',
    lifetimeDisplay: '$0',
    billingNoteMonthly: '',
    billingNoteYearly: '',
    billingNoteLifetime: '',
    ctaLabel: 'Start Free',
    features: [
      { label: '5 single downloads per day', included: true },
      { label: '5 bulk-queue videos per day', included: true },
      { label: '1 segment clip trim per day', included: true },
      { label: 'Multi-language subtitles (.vtt / .srt)', included: true },
    ],
  },
  {
    id: 'pro',
    name: 'Snagly Pro',
    eyebrow: 'For power users',
    bannerText: 'Most Popular',
    monthlyDisplay: '$4.99',
    yearlyDisplay: '$3.75',
    lifetimeDisplay: '$3.75',
    billingNoteMonthly: 'Billed $4.99 monthly',
    billingNoteYearly: 'Billed $44.99 annually',
    billingNoteLifetime: 'Billed $44.99 annually',
    ctaLabel: 'Coming Soon',
    highlighted: true,
    features: [
      { label: 'Unlimited downloads & live capture', included: true },
      { label: 'Unlimited bulk scraper & clip trims', included: true },
      { label: 'Send to Phone (QR & Local Wi-Fi)', included: true },
      { label: 'Private Vault (OPFS), PIN & Panic Hide', included: true },
      { label: 'Audio-only (.m4a) & multi-track mux', included: true },
    ],
  },
  {
    id: 'lifetime',
    name: 'Lifetime',
    eyebrow: 'Pay once, own forever',
    monthlyDisplay: '$74.99',
    yearlyDisplay: '$74.99',
    lifetimeDisplay: '$74.99',
    billingNoteMonthly: '',
    billingNoteYearly: '',
    billingNoteLifetime: '',
    ctaLabel: 'Coming Soon',
    features: [
      { label: 'Unlimited downloads & live capture', included: true },
      { label: 'Unlimited bulk scraper & clip trims', included: true },
      { label: 'Send to Phone (QR & Local Wi-Fi)', included: true },
      { label: 'Private Vault (OPFS), PIN & Panic Hide', included: true },
      { label: 'Audio-only (.m4a) & multi-track mux', included: true },
      { label: 'All future v1.x updates included', included: true },
    ],
  },
];

export interface ComparisonRow {
  feature: string;
  free: string;
  pro: string;
}

export const COMPARISON_ROWS: ComparisonRow[] = [
  {
    feature: 'Single downloads & Live Stream Capture',
    free: '5 / day (failed runs refund credit)',
    pro: 'Unlimited',
  },
  {
    feature: 'Bulk scraper & queued video downloads',
    free: '5 / day (failed runs refund credit)',
    pro: 'Unlimited',
  },
  {
    feature: 'Segment Clip Trimmer (MP4, HLS & DASH)',
    free: '1 clip / day',
    pro: 'Unlimited',
  },
  {
    feature: 'Send to Phone (Direct QR & Local Wi-Fi transfer)',
    free: '—',
    pro: 'Included',
  },
  {
    feature: 'Multi-language subtitles (.vtt, .srt, .ass)',
    free: 'Included',
    pro: 'Included',
  },
  {
    feature: 'Audio-only (.m4a) & multi-track audio muxing',
    free: '—',
    pro: 'Included',
  },
  {
    feature: 'Scheduled downloads (at time or when idle)',
    free: '—',
    pro: 'Included',
  },
  {
    feature: 'Private Vault (OPFS), folders & custom tags',
    free: '—',
    pro: 'Included',
  },
  {
    feature: '4-digit PIN lock, Decoy PIN & Auto-lock timer',
    free: '—',
    pro: 'Included',
  },
  {
    feature: 'Panic Hide shortcut (Alt+Shift+H) & icon disguise',
    free: '—',
    pro: 'Included',
  },
  {
    feature: 'Remove container metadata from merged MP4s',
    free: '—',
    pro: 'Included',
  },
  {
    feature: 'Smart Naming Rules, Regex, Speed Limit & Concurrency',
    free: 'Included',
    pro: 'Included',
  },
  {
    feature: 'Direct Cloud upload (pCloud, Google Drive, Dropbox, OneDrive)',
    free: 'Included',
    pro: 'Included',
  },
  {
    feature: 'Optional Local FFmpeg Companion (127.0.0.1:48921)',
    free: 'Included',
    pro: 'Included',
  },
];

export const CAPABILITIES = [
  {
    num: '01',
    title: 'Live Stream Capture & Multi-Track Muxing',
    summary:
      'Detects standard HLS (.m3u8), MPEG-DASH (.mpd), and direct MP4/WebM streams in the active tab. Record live broadcasts without an endlist tag in real time with elapsed timer and byte counter, inspect codecs (H.264, HEVC, AV1, VP9, AAC, Opus), bitrate, and FPS, and merge multiple audio or subtitle tracks into a single clean MP4.',
    specs: ['HLS & DASH', 'H.264 / HEVC / AV1', 'Multi-Audio & VTT/SRT/ASS'],
    span: 'lg:col-span-2',
  },
  {
    num: '02',
    title: 'Lossless Segment Clip Trimmer',
    summary:
      'Select exact start and end timestamps before downloading on both MP4 files and segmented HLS/DASH streams. Extract only the clip you need without waiting for full-file downloads or re-encoding.',
    specs: ['Start / End Scrubber', 'No Re-encoding'],
    span: 'lg:col-span-1',
  },
  {
    num: '03',
    title: 'Bulk Page Scraper & Bookmark Vault',
    summary:
      'Toggle the floating page selection bar (Alt+Shift+B) to scan media cards on a page, paste batch links, control queue concurrency (1–5) and speed caps, schedule idle/timed runs, or organize saved links into tagged folders.',
    specs: ['Alt+Shift+B Scraper', 'Queue Scheduler'],
    span: 'lg:col-span-1',
  },
  {
    num: '04',
    title: 'Private Vault, PIN Lock & Panic Hide',
    summary:
      'Keep downloaded media inside Chrome Origin Private File System (OPFS), isolated from Chrome download history. Protect access with a 4-digit PIN, configure a Decoy PIN that opens an empty view, enable inactivity auto-lock, strip MP4 metadata, or press Alt+Shift+H to disguise the extension icon.',
    specs: ['Local OPFS Storage', 'PIN + Decoy PIN', 'Alt+Shift+H Panic'],
    span: 'lg:col-span-1',
  },
  {
    num: '05',
    title: 'Smart Naming, Cloud Sync & Send to Phone (Pro)',
    summary:
      'Format filenames automatically with tokens ({title}, {resolution}, {codec}, {date}, {site}) and Regex replacements. Push finished files straight to Google Drive, Dropbox, OneDrive, or pCloud, use the optional local FFmpeg Companion (127.0.0.1:48921) for >2 GB writes, or unlock Pro Send to Phone via QR & local Wi-Fi.',
    specs: ['Cloud Integrations', 'Local CoApp 127.0.0.1', 'Pro Wi-Fi QR Transfer'],
    span: 'lg:col-span-1',
  },
];

export const HOW_IT_WORKS_STEPS = [
  {
    step: '01',
    title: 'Install Snagly in Chrome',
    description:
      'Add Snagly v1.5.0 to Google Chrome (or any Chromium browser supporting Manifest V3 Side Panels). Everything runs locally inside your browser with zero account required.',
  },
  {
    step: '02',
    title: 'Test the Free Tier on Your Websites',
    description:
      'Use your 5 daily single downloads, 5 bulk downloads, and 1 daily trim to verify that Snagly detects and saves the unencrypted standard streams you care about before purchasing.',
  },
  {
    step: '03',
    title: 'Upgrade & Activate via Dodo Payments',
    description:
      'Choose Monthly ($4.99), Yearly ($44.99), or Lifetime ($74.99). Dodo Payments emails your license key immediately—paste it in Snagly Settings to unlock Pro tools.',
  },
];

export const FAQ_ITEMS = [
  {
    q: 'How does Snagly Pro billing and license activation work?',
    a: 'Checkout is processed securely by Dodo Payments, our Merchant of Record. Immediately after completing your order ($4.99/month, $44.99/year, or $74.99 one-time), Dodo Payments sends a license key to your email. Open Snagly in Chrome, go to the Upgrade / License section, paste your key, and click Activate.',
  },
  {
    q: 'Why does Snagly include a Free tier before upgrading?',
    a: 'Websites use many different streaming architectures, and Snagly does not bypass DRM or work on restricted streaming platforms. The Free plan (5 downloads, 5 bulk videos, and 1 clip trim every day, resetting at local midnight) lets you verify compatibility on your target websites before buying Pro.',
  },
  {
    q: 'Which websites does Snagly NOT support?',
    a: 'Snagly does not bypass DRM (Widevine, FairPlay, PlayReady) and does not host or distribute media. Restricted platforms including YouTube, Netflix, Prime Video, Disney+, Max, Hulu, Hotstar, X/Twitter, and Reddit are explicitly excluded in the extension manifest.',
  },
  {
    q: 'What is the Refund & Cancellation Policy?',
    a: 'Subscriptions can be cancelled anytime and remain active through the end of your paid billing cycle. Because the Free plan is provided to verify site compatibility beforehand, refunds are not issued for unsupported/DRM-protected sites, change of mind, or unused time. Duplicate charges or unresolvable activation failures are refunded promptly via ramakantandon@gmail.com, subject to applicable statutory consumer laws.',
  },
  {
    q: 'Does Snagly collect my browsing history or downloaded videos?',
    a: 'No. Stream detection, trimming, muxing, PIN hashing, and Private Vault (OPFS) storage stay strictly on your device. If you opt in to the optional local Companion App (CoApp), stream URLs are sent only to your own loopback server on 127.0.0.1. Only your license key is sent to Dodo Payments for validation.',
  },
  {
    q: 'Who do I contact for billing help or lost license keys?',
    a: 'Email ramakantandon@gmail.com with your order email or Dodo Payments receipt ID. You can also manage or cancel recurring subscriptions directly through your Dodo Payments customer receipt link.',
  },
];
