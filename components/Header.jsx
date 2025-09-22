'use client';

import Image from 'next/image';
import {useEffect, useState} from 'react';
import LocaleLink from './LocaleLink';
import LocaleSwitcher from './LocaleSwitcher';
import Button from './ui/Button';
import {useI18n} from './I18nProvider';

export default function Header() {
  const {locale, t} = useI18n();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    fetch('/api/categories', {cache: 'no-store'})
      .then(r => r.json())
      .then(list => {
        const enabled = (Array.isArray(list) ? list : []).filter(
          c => c.enabled === true || c.enabled === 'true'
        );
        enabled.sort((a, b) => Number(a.order || 0) - Number(b.order || 0));
        setCats(enabled);
      })
      .catch(() => setCats([]));
  }, []);

  const catLabel = c =>
    locale === 'ja' && c.title_ja ? c.title_ja : c.title;

  const closeMenu = () => setOpen(false);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-slate-200/50' 
            : 'bg-white/80 backdrop-blur-sm border-b border-transparent'
        }`}
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo Section */}
            <LocaleLink href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <Image 
                  src="/logo.svg" 
                  alt="Sakura Lanka Logo" 
                  width={36} 
                  height={36}
                  className="transition-transform group-hover:scale-105"
                />
                {scrolled && (
                  <div className="absolute inset-0 bg-blue-600/10 rounded-full -z-10 animate-pulse" />
                )}
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl text-slate-900 tracking-tight leading-tight">
                 Sakura Lanka
                </span>
                <span className="text-xs text-slate-500 -mt-1 hidden sm:block">
                  Your Gateway to Success
                </span>
              </div>
            </LocaleLink>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center">
              <div className="flex items-center gap-8 mr-8">
                {/* Categories */}
                <div className="flex items-center gap-6">
                  {cats.map(c => (
                    <LocaleLink
                      key={c.slug}
                      href={`/${c.slug}`}
                      className="relative text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors duration-200 group py-2"
                    >
                      {catLabel(c)}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full" />
                    </LocaleLink>
                  ))}
                </div>

                {/* Main Nav Links */}
                <div className="flex items-center gap-6">
                  <LocaleLink
                    href="/visa"
                    className="relative text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors duration-200 group py-2"
                  >
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      {t('Nav.visa') || 'Visa'}
                    </span>
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full" />
                  </LocaleLink>

                  <LocaleLink
                    href="/jobs"
                    className="relative text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors duration-200 group py-2"
                  >
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v6a2 2 0 01-2 2H10a2 2 0 01-2-2V6" />
                      </svg>
                      {t('Nav.jobs') || 'Jobs'}
                    </span>
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full" />
                  </LocaleLink>
                </div>
              </div>

              {/* Right Side Actions */}
              <div className="flex items-center gap-4">
                <div className="hidden xl:block">
                  <LocaleSwitcher />
                </div>
                
                <LocaleLink href="/visa">
                  <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 font-medium px-6">
                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      Get Help
                    </span>
                  </Button>
                </LocaleLink>
              </div>
            </nav>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-3 lg:hidden">
              <div className="xl:hidden">
                <LocaleSwitcher />
              </div>
              <Button
                variant="ghost"
                className="p-2 hover:bg-slate-100 transition-colors duration-200"
                aria-label="Open navigation menu"
                onClick={() => setOpen(true)}
              >
                <svg className="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer to prevent content jumping */}
      <div className="h-20" />

      {/* Mobile Slide-out Menu */}
      {open && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          {/* Backdrop with blur */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
            onClick={closeMenu}
          />
          
          {/* Slide Panel */}
          <div
            role="dialog"
            aria-modal="true"
            className="absolute right-0 top-0 h-full w-[85%] max-w-[380px] bg-white shadow-2xl transform transition-transform duration-300 ease-out"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <Image src="/logo.svg" alt="Logo" width={24} height={24} />
                <span className="font-semibold text-lg text-slate-900">Menu</span>
              </div>
              <Button
                variant="ghost"
                className="p-2 hover:bg-slate-100 rounded-full transition-colors duration-200"
                aria-label="Close navigation menu"
                onClick={closeMenu}
              >
                <svg className="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </Button>
            </div>

            {/* Navigation Content */}
            <nav className="flex flex-col p-6 gap-1 overflow-y-auto">
              {/* Categories */}
              {cats.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                    Categories
                  </h3>
                  {cats.map(c => (
                    <LocaleLink
                      key={c.slug}
                      href={`/${c.slug}`}
                      className="flex items-center py-3 px-4 text-slate-700 hover:bg-slate-50 hover:text-blue-600 rounded-lg transition-all duration-200 group"
                      onClick={closeMenu}
                    >
                      <span className="font-medium">{catLabel(c)}</span>
                      <svg className="w-4 h-4 ml-auto text-slate-400 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </LocaleLink>
                  ))}
                </div>
              )}

              {/* Main Links */}
              <div className="space-y-1">
                <LocaleLink
                  href="/visa"
                  className="flex items-center py-3 px-4 text-slate-700 hover:bg-slate-50 hover:text-blue-600 rounded-lg transition-all duration-200 group"
                  onClick={closeMenu}
                >
                  <svg className="w-5 h-5 mr-3 text-slate-400 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="font-medium">{t('Nav.visa') || 'Visa'}</span>
                  <svg className="w-4 h-4 ml-auto text-slate-400 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </LocaleLink>

                <LocaleLink
                  href="/jobs"
                  className="flex items-center py-3 px-4 text-slate-700 hover:bg-slate-50 hover:text-blue-600 rounded-lg transition-all duration-200 group"
                  onClick={closeMenu}
                >
                  <svg className="w-5 h-5 mr-3 text-slate-400 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v6a2 2 0 01-2 2H10a2 2 0 01-2-2V6" />
                  </svg>
                  <span className="font-medium">{t('Nav.jobs') || 'Jobs'}</span>
                  <svg className="w-4 h-4 ml-auto text-slate-400 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </LocaleLink>
              </div>

              {/* CTA Button */}
              <div className="mt-8 pt-6 border-t border-slate-100">
                <LocaleLink href="/visa" onClick={closeMenu}>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg font-medium py-3">
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      Get Help Now
                    </span>
                  </Button>
                </LocaleLink>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}