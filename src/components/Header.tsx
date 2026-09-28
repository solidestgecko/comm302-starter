import React, { useState } from 'react';
import { Search, Globe, User, Bookmark, Sun, Moon, Radio, Menu, X } from 'lucide-react';

interface HeaderProps {
  onOpenSearch: () => void;
  onOpenWatchlist: () => void;
  watchlistCount: number;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  isLiveSimulating: boolean;
  onToggleLiveSimulation: () => void;
  onOpenGetStarted: () => void;
  activeNav: string;
  onSelectNav: (nav: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSearch,
  onOpenWatchlist,
  watchlistCount,
  isDarkMode,
  onToggleDarkMode,
  isLiveSimulating,
  onToggleLiveSimulation,
  onOpenGetStarted,
  activeNav,
  onSelectNav,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('EN');

  const navItems = ['Products', 'Community', 'Markets', 'Brokers', 'More'];
  const languages = ['EN', 'ES', 'DE', 'FR', 'JA', 'ZH'];

  return (
    <header
      className={`sticky top-0 z-40 transition-colors backdrop-blur-md border-b ${
        isDarkMode
          ? 'bg-[#131722]/95 border-[#2a2e39] text-[#d1d4dc]'
          : 'bg-white/95 border-[#e0e3eb] text-[#131722]'
      } px-4 lg:px-8 py-2.5`}
    >
      <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-4">
        {/* Brand & Search */}
        <div className="flex items-center gap-6">
          {/* Logo matching TradingView exact vector */}
          <button
            onClick={() => onSelectNav('Markets')}
            aria-label="TradingView Home"
            className="flex items-center gap-2 group cursor-pointer focus:outline-none"
          >
            <svg
              className={`w-8 h-8 transition-transform group-hover:scale-105 ${
                isDarkMode ? 'text-white' : 'text-black'
              } fill-current`}
              viewBox="0 0 36 28"
            >
              <path d="M14 22H7V6h7v16zm8-22h-6v28h6V0zm8 14h-6v14h6V14z" />
            </svg>
            <span className="hidden lg:inline text-lg font-bold tracking-tight">TradingView</span>
          </button>

          {/* Global Search input matching screenshot */}
          <div className="relative hidden sm:block w-52 md:w-64">
            <button
              onClick={onOpenSearch}
              className={`w-full flex items-center gap-2 pl-9 pr-3 py-1.5 cursor-pointer rounded-full text-sm font-normal text-left transition ${
                isDarkMode
                  ? 'bg-[#1e222d] hover:bg-[#2a2e39] text-[#787b86]'
                  : 'bg-[#f0f3fa] hover:bg-[#e4e8f0] text-[#787b86]'
              }`}
            >
              <Search className="w-4 h-4 absolute left-3 text-[#787b86]" />
              <span className="truncate">Search (Ctrl+K)</span>
              <kbd
                className={`ml-auto text-[10px] font-mono uppercase px-1.5 py-0.5 rounded ${
                  isDarkMode ? 'bg-[#2a2e39] text-[#9db2c6]' : 'bg-white text-gray-500 border border-gray-200'
                }`}
              >
                ⌘K
              </kbd>
            </button>
          </div>
        </div>

        {/* Navigation links matching screenshot */}
        <nav className="hidden md:flex items-center space-x-7 text-sm font-medium">
          {navItems.map((item) => {
            const isActive = activeNav === item;
            return (
              <button
                key={item}
                onClick={() => onSelectNav(item)}
                className={`relative py-1 transition-colors cursor-pointer ${
                  isActive
                    ? 'text-[#2962ff] font-semibold after:content-[\'\'] after:absolute after:bottom-[-11px] after:left-0 after:right-0 after:h-[2px] after:bg-[#2962ff]'
                    : isDarkMode
                    ? 'text-[#d1d4dc] hover:text-[#2962ff]'
                    : 'text-[#131722] hover:text-[#2962ff]'
                }`}
              >
                {item}
              </button>
            );
          })}
        </nav>

        {/* Right header actions */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Live market simulator toggle */}
          <button
            onClick={onToggleLiveSimulation}
            title={isLiveSimulating ? 'Live Market Ticking: Active' : 'Live Market Ticking: Paused'}
            className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full transition cursor-pointer ${
              isLiveSimulating
                ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                : 'text-[#787b86] hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <Radio className={`w-3.5 h-3.5 ${isLiveSimulating ? 'animate-pulse text-emerald-500' : ''}`} />
            <span className="hidden xl:inline">{isLiveSimulating ? 'Live' : 'Paused'}</span>
          </button>

          {/* Watchlist toggle */}
          <button
            onClick={onOpenWatchlist}
            aria-label="Open watchlist"
            className={`relative p-2 rounded-full transition cursor-pointer ${
              isDarkMode ? 'hover:bg-[#1e222d] text-[#d1d4dc]' : 'hover:bg-[#f0f3fa] text-[#131722]'
            }`}
            title="My Watchlist"
          >
            <Bookmark className="w-4 h-4" />
            {watchlistCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#2962ff] text-white text-[10px] font-bold flex items-center justify-center">
                {watchlistCount}
              </span>
            )}
          </button>

          {/* Theme switcher */}
          <button
            onClick={onToggleDarkMode}
            aria-label="Toggle theme"
            className={`p-2 rounded-full transition cursor-pointer ${
              isDarkMode ? 'hover:bg-[#1e222d] text-[#d1d4dc]' : 'hover:bg-[#f0f3fa] text-[#131722]'
            }`}
            title={isDarkMode ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>

          {/* Language selector */}
          <div className="relative hidden sm:block">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className={`flex items-center gap-1 text-xs font-semibold transition px-2 py-1 rounded cursor-pointer ${
                isDarkMode ? 'hover:text-[#2962ff] text-[#d1d4dc]' : 'hover:text-[#2962ff] text-[#131722]'
              }`}
              type="button"
            >
              <Globe className="w-4 h-4" />
              <span>{currentLang}</span>
            </button>
            {langMenuOpen && (
              <div
                className={`absolute right-0 mt-1 py-1 w-24 rounded-lg shadow-lg border z-50 ${
                  isDarkMode ? 'bg-[#1e222d] border-[#2a2e39] text-[#d1d4dc]' : 'bg-white border-[#e0e3eb] text-[#131722]'
                }`}
              >
                {languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setCurrentLang(lang);
                      setLangMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1 text-xs hover:bg-[#2962ff]/10 hover:text-[#2962ff] transition ${
                      currentLang === lang ? 'font-bold text-[#2962ff]' : ''
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* User profile icon */}
          <button
            onClick={onOpenGetStarted}
            aria-label="User account"
            className={`p-2 rounded-full transition cursor-pointer ${
              isDarkMode ? 'hover:bg-[#1e222d] text-[#d1d4dc]' : 'hover:bg-[#f0f3fa] text-[#131722]'
            }`}
            type="button"
          >
            <User className="w-4 h-4" />
          </button>

          {/* Vibrant pill button "Get started" */}
          <button
            onClick={onOpenGetStarted}
            className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-fuchsia-600 hover:opacity-95 shadow-sm transition cursor-pointer"
          >
            Get started
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 md:hidden text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 pt-3 border-t border-gray-200 dark:border-gray-800 space-y-2">
          {/* Mobile search */}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenSearch();
            }}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm text-gray-500 text-left"
          >
            <Search className="w-4 h-4" />
            <span>Search markets, tickers...</span>
          </button>
          <div className="grid grid-cols-2 gap-2 pt-2">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => {
                  onSelectNav(item);
                  setMobileMenuOpen(false);
                }}
                className={`text-left px-3 py-2 rounded text-sm font-medium ${
                  activeNav === item
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-[#2962ff]'
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
