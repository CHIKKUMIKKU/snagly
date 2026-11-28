import { useCallback, useEffect, useState } from 'react';
import { ArchitectureWorkflowSection } from './components/ArchitectureWorkflowSection';
import { CheckoutGuideModal, ModalMode } from './components/CheckoutGuideModal';
import { ComparisonAndUseCasesSection } from './components/ComparisonAndUseCasesSection';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { HowItWorksAndCompliance } from './components/HowItWorksAndCompliance';
import { LegalPages } from './components/LegalPages';
import { Navbar } from './components/Navbar';
import { PricingSection } from './components/PricingSection';
import { AppRoute, BillingCycle } from './data/snaglyData';

function normalizePath(pathname: string): AppRoute {
  const clean = pathname.replace(/\/+$/, '') || '/';
  if (
    clean === '/architecture' ||
    clean === '/features' ||
    clean === '/pricing' ||
    clean === '/terms' ||
    clean === '/refund-policy' ||
    clean === '/privacy' ||
    clean === '/contact'
  ) {
    return clean;
  }
  return '/';
}

export default function App() {
  const [route, setRoute] = useState<AppRoute>(() =>
    typeof window !== 'undefined' ? normalizePath(window.location.pathname) : '/'
  );
  const [selectedCycle, setSelectedCycle] = useState<BillingCycle>('yearly');
  const [modal, setModal] = useState<ModalMode>(null);
  const [pendingSection, setPendingSection] = useState<string | null>(null);

  const navigate = useCallback((nextRoute: AppRoute, sectionId?: string) => {
    setRoute(nextRoute);
    setPendingSection(sectionId ?? null);
    if (typeof window !== 'undefined') {
      const targetUrl = sectionId ? `${nextRoute}#${sectionId}` : nextRoute;
      window.history.pushState({}, '', targetUrl);

      if (!sectionId) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }, []);

  useEffect(() => {
    const onPopState = () => {
      setRoute(normalizePath(window.location.pathname));
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useEffect(() => {
    const targetId =
      pendingSection ??
      (route === '/pricing'
        ? 'pricing'
        : route === '/features'
          ? 'features'
          : route === '/architecture'
            ? 'architecture'
            : null);
    if (!targetId) return;

    const timer = window.setTimeout(() => {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      setPendingSection(null);
    }, 40);

    return () => window.clearTimeout(timer);
  }, [route, pendingSection]);

  useEffect(() => {
    const titles: Record<AppRoute, string> = {
      '/': 'Snagly Pro — Architecture, Workflow & Chrome Video Studio',
      '/architecture': 'Architecture & Workflow — How Snagly Works Locally',
      '/features': 'Features — Snagly Video Downloader for Chrome',
      '/pricing': 'Pricing — Compare Snagly Starter & Pro Plans',
      '/terms': 'Terms of Service — Snagly (snagly.video)',
      '/refund-policy': 'Refund & Cancellation Policy — Snagly (snagly.video)',
      '/privacy': 'Privacy Policy — Snagly (snagly.video)',
      '/contact': 'Support & Contact — Snagly (snagly.video)',
    };
    document.title = titles[route];
  }, [route]);

  const handleSelectPlan = (planId: 'free' | 'pro' | 'lifetime') => {
    if (planId === 'free') {
      setModal({ type: 'install' });
      return;
    }
    setModal({
      type: 'checkout',
      plan: planId,
      cycle: selectedCycle,
    });
  };

  const isLegalRoute =
    route === '/terms' ||
    route === '/refund-policy' ||
    route === '/privacy' ||
    route === '/contact';

  return (
    <div className="flex min-h-screen flex-col bg-[#FAFAFA] text-slate-900">
      <Navbar currentRoute={route} onNavigate={navigate} />

      {isLegalRoute ? (
        <LegalPages route={route} onNavigate={navigate} />
      ) : (
        <main className="flex-1">
          <HeroSection onNavigate={navigate} />
          <ArchitectureWorkflowSection />
          <ComparisonAndUseCasesSection />
          <PricingSection
            selectedCycle={selectedCycle}
            onChangeCycle={setSelectedCycle}
            onSelectPlan={handleSelectPlan}
            onNavigate={navigate}
          />
          <HowItWorksAndCompliance onNavigate={navigate} />
        </main>
      )}

      <Footer onNavigate={navigate} />

      <CheckoutGuideModal
        modal={modal}
        onClose={() => setModal(null)}
        onNavigate={navigate}
      />
    </div>
  );
}
