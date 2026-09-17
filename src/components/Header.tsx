'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, ArrowRight, Compass, Languages } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PageId, SiteSettings } from '../types';
import { NAV_ITEMS } from '../data/navigation';
import { useLanguage } from '../context/LanguageContext';

const PAGE_ROUTES: Record<Exclude<PageId, 'investigation'>, string> = {
  home: '/',
  about: '/about',
  work: '/work',
  team: '/team',
  contact: '/contact',
};

export const Header: React.FC<{ settings?: Partial<SiteSettings> }> = ({ settings }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, isBn, t } = useLanguage();

  const branding = settings?.headerBranding;
  const orgName = settings?.siteName;
  const orgNameBn = (settings as any)?.siteNameBn;
  const navItems = settings?.navigation && settings.navigation.length ? settings.navigation : NAV_ITEMS.map((n, i) => ({ id: n.id, label: n.label, labelBn: undefined as string | undefined, url: PAGE_ROUTES[n.id as Exclude<PageId, 'investigation'>] || '/', order: i + 1 }));
  const displayOrgName = (() => {
    if (isBn && branding?.lightLogoTextBn) return branding.lightLogoTextBn;
    if (branding?.lightLogoText) return branding.lightLogoText;
    return orgName;
  })();

  let currentPage: PageId = 'home';
  if (pathname === '/') {
    currentPage = 'home';
  } else if (pathname.startsWith('/investigation')) {
    currentPage = 'investigation';
  } else if (pathname === '/about' || pathname === '/work' || pathname === '/team' || pathname === '/contact') {
    currentPage = pathname.slice(1) as PageId;
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = (page: PageId) => {
    if (page !== 'investigation') router.push(PAGE_ROUTES[page]);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getNavLabel = (id: string, defaultLabel: string) => {
    switch (id) {
      case 'home':
        return t('Home', 'হোম');
      case 'about':
        return t('About Us', 'আমাদের সম্পর্কে');
      case 'work':
        return t('Researches', 'গবেষণাসমূহ');
      case 'team':
        return t('Our Team', 'আমাদের টিম');
      default:
        return defaultLabel;
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.04)] py-3.5 border-b border-[#E2EAE4]'
            : 'bg-white/90 backdrop-blur-sm py-4 sm:py-5 border-b border-[#E2EAE4]/60'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between">
            {/* Brand Logo matching Greenset layout */}
            <button
              onClick={() => handleNavClick('home')}
              className="text-left group cursor-pointer focus:outline-none flex items-center gap-2.5"
              aria-label="Institute of Public Affairs Home"
            >
              <div className="w-8 h-8 rounded-full bg-black text-[#D2F843] flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                <Compass className="w-4 h-4 stroke-[2.2]" />
              </div>
              <div className="flex items-center gap-2.5">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-[#0B2A20]">
                  IPA
                </span>
                <span className="hidden lg:inline-block text-xs font-medium text-[#556B62] border-l border-[#E2EAE4] pl-2.5">
                  {isBn ? (branding?.taglineBn || orgNameBn) : (branding?.tagline || orgName)}
                </span>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-8">
              {navItems.map((item) => {
                const isActive = currentPage === (item.id as PageId);
                const label = isBn && item.labelBn ? item.labelBn : getNavLabel(item.id, item.label);
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id as PageId)}
                    className={`text-sm font-semibold transition-colors cursor-pointer relative py-1 ${
                      isActive
                        ? 'text-[#0B2A20] font-bold after:content-[""] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-4 after:h-0.5 after:bg-[#0B2A20] after:rounded-full'
                        : 'text-[#0D1F18]/65 hover:text-[#0B2A20]'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </nav>

            {/* Right Action Controls: Language Toggle & CTA Button */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Language Switcher Pill (Bangla & English) */}
              <div
                className="flex items-center bg-[#F6F9F4] p-1 rounded-full border border-[#E2EAE4] text-xs font-mono font-bold shadow-2xs"
                role="group"
                aria-label="Language selection"
              >
                <button
                  type="button"
                  onClick={() => setLanguage('bn')}
                  className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                    isBn
                      ? 'bg-[#0B2A20] text-[#D2F843] shadow-xs'
                      : 'text-[#556B62] hover:text-[#0B2A20]'
                  }`}
                  aria-pressed={isBn}
                  aria-label="বাংলা ভাষায় পরিবর্তন করুন"
                >
                  বাংলা
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage('en')}
                  className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                    !isBn
                      ? 'bg-[#0B2A20] text-[#D2F843] shadow-xs'
                      : 'text-[#556B62] hover:text-[#0B2A20]'
                  }`}
                  aria-pressed={!isBn}
                  aria-label="Switch to English language"
                >
                  EN
                </button>
              </div>

              {/* Contact Us Pill CTA (Desktop) */}
              <button
                onClick={() => handleNavClick('contact')}
                className="hidden sm:inline-flex group items-center gap-3 pl-4 sm:pl-5 pr-1.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#D2F843] text-[#0B2A20] hover:bg-[#bef024] hover:shadow-lg hover:scale-[1.02] transition-all cursor-pointer"
              >
                <span>{isBn ? (branding?.navCtaTextBn || 'যোগাযোগ') : (branding?.navCtaText || 'Contact Us')}</span>
                <span className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </button>

              {/* Mobile Menu Toggle Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-xl bg-[#F6F9F4] text-[#0B2A20] hover:bg-[#E2EAE4] focus:outline-none cursor-pointer"
                aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Overlay Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-0 z-30 bg-[#FFFFFF] pt-24 px-6 pb-10 flex flex-col justify-between md:hidden border-b border-[#E2EAE4] overflow-y-auto"
          >
            <div>
              {/* Header inside mobile drawer */}
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#E2EAE4]">
                <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#0B2A20]">
                  <span className="w-2 h-2 rounded-full bg-[#D2F843]" />
                  <span>{t('Navigation', 'নেভিগেশন')}</span>
                </div>

                {/* Mobile Language Switcher inside drawer */}
                <div className="flex items-center gap-1.5 bg-[#F6F9F4] p-1 rounded-full border border-[#E2EAE4] text-xs font-mono font-bold">
                  <Languages className="w-3.5 h-3.5 text-[#556B62] ml-1.5" />
                  <button
                    onClick={() => setLanguage('bn')}
                    className={`px-2.5 py-0.5 rounded-full transition-all cursor-pointer ${
                      isBn ? 'bg-[#0B2A20] text-[#D2F843]' : 'text-[#556B62]'
                    }`}
                  >
                    বাংলা
                  </button>
                  <button
                    onClick={() => setLanguage('en')}
                    className={`px-2.5 py-0.5 rounded-full transition-all cursor-pointer ${
                      !isBn ? 'bg-[#0B2A20] text-[#D2F843]' : 'text-[#556B62]'
                    }`}
                  >
                    EN
                  </button>
                </div>
              </div>

              <nav className="flex flex-col space-y-2">
                {navItems.map((item, idx) => {
                  const isActive = currentPage === (item.id as PageId);
                  const label = isBn && item.labelBn ? item.labelBn : getNavLabel(item.id, item.label);
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id as PageId)}
                      className={`flex items-center justify-between text-left p-4 rounded-2xl transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#0B2A20] text-[#D2F843]'
                          : 'bg-[#F6F9F4] text-[#0D1F18] hover:bg-[#E2EAE4]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`text-xs font-mono font-bold ${
                            isActive ? 'text-[#D2F843]' : 'text-[#556B62]'
                          }`}
                        >
                          0{idx + 1}
                        </span>
                        <span className="font-sans font-bold text-lg">{label}</span>
                      </div>
                      <ArrowRight
                        className={`w-4 h-4 ${isActive ? 'text-[#D2F843]' : 'text-[#556B62]'}`}
                      />
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="pt-6 border-t border-[#E2EAE4] space-y-4">
              <button
                onClick={() => handleNavClick('contact')}
                className="w-full flex items-center justify-between pl-6 pr-2 py-2.5 rounded-full bg-[#D2F843] text-[#0B2A20] text-xs font-bold uppercase tracking-wider hover:bg-[#bef024] shadow-md transition-colors"
              >
                <span>{isBn ? (branding?.navCtaTextBn || 'যোগাযোগ করুন') : (branding?.navCtaText || 'Contact Us')}</span>
                <span className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </button>

              <div className="text-center text-xs text-[#556B62]">
                {isBn ? (branding?.taglineBn || orgNameBn) : (branding?.tagline || orgName)}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
