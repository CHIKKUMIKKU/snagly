import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { AppRoute, SITE_CONFIG } from '../data/snaglyData';
import { SnaglyLogo } from './SnaglyLogo';

interface NavbarProps {
  currentRoute: AppRoute;
  onNavigate: (route: AppRoute, sectionId?: string) => void;
}

export function Navbar({ currentRoute, onNavigate }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLink = (route: AppRoute, sectionId?: string) => {
    setMobileOpen(false);
    onNavigate(route, sectionId);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Brand Lockup (mark + single wordmark only) */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            handleLink('/');
          }}
          className="flex shrink-0 items-center gap-2.5 text-slate-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
        >
          <SnaglyLogo className="h-8 w-8 shrink-0" />
          <span className="font-display text-xl font-bold tracking-tight whitespace-nowrap">
            {SITE_CONFIG.brandName}
          </span>
        </a>

        {/* Zone 2: Primary Navigation Links */}
        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-7 md:flex"
        >
          <button
            type="button"
            onClick={() => handleLink('/', 'features')}
            className="cursor-pointer whitespace-nowrap text-sm font-medium text-slate-600 transition-colors hover:text-slate-950"
          >
            Features
          </button>
          <button
            type="button"
            onClick={() => handleLink('/', 'pricing')}
            className={`cursor-pointer whitespace-nowrap text-sm font-medium transition-colors ${
              currentRoute === '/pricing'
                ? 'rounded-md bg-slate-900 px-3 py-1.5 text-white'
                : 'text-slate-600 hover:text-slate-950'
            }`}
          >
            Pricing
          </button>
          <button
            type="button"
            onClick={() => handleLink('/', 'how-it-works')}
            className="cursor-pointer whitespace-nowrap text-sm font-medium text-slate-600 transition-colors hover:text-slate-950"
          >
            How It Works
          </button>
          <button
            type="button"
            onClick={() => handleLink('/', 'faq')}
            className="cursor-pointer whitespace-nowrap text-sm font-medium text-slate-600 transition-colors hover:text-slate-950"
          >
            FAQ
          </button>
          <button
            type="button"
            onClick={() => handleLink('/terms')}
            className={`cursor-pointer whitespace-nowrap text-sm font-medium transition-colors ${
              currentRoute === '/terms' ||
              currentRoute === '/refund-policy' ||
              currentRoute === '/privacy'
                ? 'text-slate-950 underline decoration-orange-500 decoration-2 underline-offset-4'
                : 'text-slate-600 hover:text-slate-950'
            }`}
          >
            Terms &amp; Policies
          </button>
          <button
            type="button"
            onClick={() => handleLink('/contact')}
            className={`cursor-pointer whitespace-nowrap text-sm font-medium transition-colors ${
              currentRoute === '/contact'
                ? 'text-slate-950 underline decoration-orange-500 decoration-2 underline-offset-4'
                : 'text-slate-600 hover:text-slate-950'
            }`}
          >
            Support
          </button>
        </nav>

        {/* Zone 3: Single High-Intent CTA */}
        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            onClick={() => handleLink('/', 'pricing')}
            className="hidden cursor-pointer whitespace-nowrap rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-orange-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 sm:inline-flex"
          >
            Get Snagly
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 md:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={() => handleLink('/', 'features')}
              className="cursor-pointer py-1.5 text-left text-sm font-medium text-slate-700"
            >
              Features
            </button>
            <button
              type="button"
              onClick={() => handleLink('/', 'pricing')}
              className="cursor-pointer py-1.5 text-left text-sm font-medium text-slate-700"
            >
              Pricing
            </button>
            <button
              type="button"
              onClick={() => handleLink('/', 'how-it-works')}
              className="cursor-pointer py-1.5 text-left text-sm font-medium text-slate-700"
            >
              How It Works
            </button>
            <button
              type="button"
              onClick={() => handleLink('/', 'faq')}
              className="cursor-pointer py-1.5 text-left text-sm font-medium text-slate-700"
            >
              FAQ
            </button>
            <button
              type="button"
              onClick={() => handleLink('/terms')}
              className="cursor-pointer py-1.5 text-left text-sm font-medium text-slate-700"
            >
              Terms of Service
            </button>
            <button
              type="button"
              onClick={() => handleLink('/refund-policy')}
              className="cursor-pointer py-1.5 text-left text-sm font-medium text-slate-700"
            >
              Refund Policy
            </button>
            <button
              type="button"
              onClick={() => handleLink('/privacy')}
              className="cursor-pointer py-1.5 text-left text-sm font-medium text-slate-700"
            >
              Privacy Policy
            </button>
            <button
              type="button"
              onClick={() => handleLink('/contact')}
              className="cursor-pointer py-1.5 text-left text-sm font-medium text-slate-700"
            >
              Support ({SITE_CONFIG.supportEmail})
            </button>
            <button
              type="button"
              onClick={() => handleLink('/', 'pricing')}
              className="mt-2 w-full cursor-pointer rounded-lg bg-orange-500 px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-orange-600"
            >
              Get Snagly
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
