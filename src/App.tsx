import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { IndicesSection } from './components/IndicesSection';
import { USStocksSection } from './components/USStocksSection';
import { CryptoForexSection } from './components/CryptoForexSection';
import { FuturesSection } from './components/FuturesSection';
import { Footer } from './components/Footer';
import { ChartModal } from './components/ChartModal';
import { SearchModal } from './components/SearchModal';
import { WatchlistDrawer } from './components/WatchlistDrawer';
import { GetStartedModal } from './components/GetStartedModal';
import { AllUSStocksModal } from './components/AllUSStocksModal';
import { CategoryDetailView } from './components/CategoryDetailView';
import { AssetCategory } from './types';
import {
  PRIMARY_INDICES,
  SECONDARY_INDICES,
  HIGHEST_VOLUME_STOCKS,
  STOCK_GAINERS,
  STOCK_LOSERS,
  CRYPTO_LIST,
  FOREX_LIST,
  FUTURES_LIST,
} from './data/marketData';

export default function App() {
  const [activeCategory, setActiveCategory] = useState<AssetCategory>('US stocks');
  const [activeNav, setActiveNav] = useState('Markets');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLiveSimulating, setIsLiveSimulating] = useState(true);

  // Modals and drawers
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isWatchlistOpen, setIsWatchlistOpen] = useState(false);
  const [isGetStartedOpen, setIsGetStartedOpen] = useState(false);
  const [isAllUSStocksOpen, setIsAllUSStocksOpen] = useState(false);

  // Selected asset for interactive Superchart modal
  const [selectedAsset, setSelectedAsset] = useState<{
    symbol: string;
    name: string;
    price: number;
    changePercent: number;
    isPositive: boolean;
  } | null>(null);

  // Watchlist state
  const [watchlistSymbols, setWatchlistSymbols] = useState<string[]>([
    'NVDA',
    'AAPL',
    'BTCUSD',
    'GC1!',
  ]);

  // Live ticking flash trackers
  const [priceTickFlash, setPriceTickFlash] = useState<Record<string, 'up' | 'down' | undefined>>({});

  // Market data state that updates with live ticking
  const [indices, setIndices] = useState(PRIMARY_INDICES);
  const [secondaryIndices, setSecondaryIndices] = useState(SECONDARY_INDICES);
  const [highestVolume, setHighestVolume] = useState(HIGHEST_VOLUME_STOCKS);
  const [gainers, setGainers] = useState(STOCK_GAINERS);
  const [losers, setLosers] = useState(STOCK_LOSERS);
  const [crypto, setCrypto] = useState(CRYPTO_LIST);
  const [forex, setForex] = useState(FOREX_LIST);
  const [futures, setFutures] = useState(FUTURES_LIST);

  // Keyboard shortcut Ctrl+K / Cmd+K for Search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Live price tick simulation loop
  useEffect(() => {
    if (!isLiveSimulating) return;

    const interval = setInterval(() => {
      // Pick a random target to tick
      const targetRoll = Math.floor(Math.random() * 6);
      const isUp = Math.random() > 0.48;
      const factor = isUp ? 1.0004 : 0.9996;

      if (targetRoll === 0) {
        // Tick Primary Indices
        const idx = Math.floor(Math.random() * indices.length);
        const item = indices[idx];
        const newPrice = +(item.rawPrice * factor).toFixed(2);
        setIndices((prev) =>
          prev.map((it, i) =>
            i === idx
              ? {
                  ...it,
                  rawPrice: newPrice,
                  price: newPrice.toLocaleString(undefined, { minimumFractionDigits: 2 }),
                }
              : it
          )
        );
        triggerFlash(item.id, isUp ? 'up' : 'down');
      } else if (targetRoll === 1) {
        // Tick Secondary Indices
        const idx = Math.floor(Math.random() * secondaryIndices.length);
        const item = secondaryIndices[idx];
        const newPrice = +(item.rawPrice * factor).toFixed(2);
        setSecondaryIndices((prev) =>
          prev.map((it, i) =>
            i === idx
              ? {
                  ...it,
                  rawPrice: newPrice,
                  price: newPrice.toLocaleString(undefined, { minimumFractionDigits: 2 }),
                }
              : it
          )
        );
        triggerFlash(item.symbol, isUp ? 'up' : 'down');
      } else if (targetRoll === 2) {
        // Tick Highest Volume stocks
        const idx = Math.floor(Math.random() * highestVolume.length);
        const item = highestVolume[idx];
        const newPrice = +(item.rawPrice * factor).toFixed(2);
        setHighestVolume((prev) =>
          prev.map((it, i) =>
            i === idx
              ? {
                  ...it,
                  rawPrice: newPrice,
                  price: `${newPrice.toFixed(2)} USD`,
                }
              : it
          )
        );
        triggerFlash(item.symbol, isUp ? 'up' : 'down');
      } else if (targetRoll === 3) {
        // Tick Crypto
        const idx = Math.floor(Math.random() * crypto.length);
        const item = crypto[idx];
        const newPrice = +(item.rawPrice * factor).toFixed(item.rawPrice < 10 ? 2 : 1);
        setCrypto((prev) =>
          prev.map((it, i) =>
            i === idx
              ? {
                  ...it,
                  rawPrice: newPrice,
                  price: newPrice.toLocaleString(undefined, { minimumFractionDigits: 2 }),
                }
              : it
          )
        );
        triggerFlash(item.symbol, isUp ? 'up' : 'down');
      } else if (targetRoll === 4) {
        // Tick Forex
        const idx = Math.floor(Math.random() * forex.length);
        const item = forex[idx];
        const newPrice = +(item.rawPrice * factor).toFixed(4);
        setForex((prev) =>
          prev.map((it, i) =>
            i === idx
              ? {
                  ...it,
                  rawPrice: newPrice,
                  price: newPrice.toFixed(4),
                }
              : it
          )
        );
        triggerFlash(item.pair, isUp ? 'up' : 'down');
      } else {
        // Tick Futures
        const idx = Math.floor(Math.random() * futures.length);
        const item = futures[idx];
        const newPrice = +(item.rawPrice * factor).toFixed(2);
        setFutures((prev) =>
          prev.map((it, i) =>
            i === idx
              ? {
                  ...it,
                  rawPrice: newPrice,
                  price: newPrice.toLocaleString(undefined, { minimumFractionDigits: 2 }),
                }
              : it
          )
        );
        triggerFlash(item.code, isUp ? 'up' : 'down');
      }
    }, 2400);

    return () => clearInterval(interval);
  }, [isLiveSimulating, indices, secondaryIndices, highestVolume, crypto, forex, futures]);

  const triggerFlash = (key: string, direction: 'up' | 'down') => {
    setPriceTickFlash((prev) => ({ ...prev, [key]: direction }));
    setTimeout(() => {
      setPriceTickFlash((prev) => ({ ...prev, [key]: undefined }));
    }, 1200);
  };

  const toggleWatchlist = (symbol: string) => {
    setWatchlistSymbols((prev) =>
      prev.includes(symbol) ? prev.filter((s) => s !== symbol) : [...prev, symbol]
    );
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-200 ${
        isDarkMode ? 'bg-[#131722] text-[#d1d4dc]' : 'bg-white text-[#131722]'
      }`}
    >
      {/* Main Header */}
      <Header
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenWatchlist={() => setIsWatchlistOpen(true)}
        watchlistCount={watchlistSymbols.length}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        isLiveSimulating={isLiveSimulating}
        onToggleLiveSimulation={() => setIsLiveSimulating(!isLiveSimulating)}
        onOpenGetStarted={() => setIsGetStartedOpen(true)}
        activeNav={activeNav}
        onSelectNav={(nav) => {
          setActiveNav(nav);
          if (nav === 'Markets') {
            setActiveCategory('US stocks');
          }
        }}
      />

      {/* Main Content Area */}
      <main className="max-w-[1440px] mx-auto px-4 lg:px-8 py-8 md:py-12">
        {/* Hero Section with Dropdown & Category Pills */}
        <HeroSection
          activeCategory={activeCategory}
          onSelectCategory={(cat) => setActiveCategory(cat)}
          isDarkMode={isDarkMode}
          selectedRegion={selectedRegion}
          onSelectRegion={(reg) => setSelectedRegion(reg)}
        />

        {/* View Switching: Full Panorama (US stocks) OR Dedicated Category View */}
        {activeCategory === 'US stocks' ? (
          <>
            {/* Indices Section */}
            <IndicesSection
              indices={indices}
              secondaryIndices={secondaryIndices}
              isDarkMode={isDarkMode}
              onSelectIndex={(index) => setSelectedAsset(index)}
              priceTickFlash={priceTickFlash}
            />

            {/* US stocks Overview */}
            <USStocksSection
              highestVolume={highestVolume}
              stockGainers={gainers}
              stockLosers={losers}
              isDarkMode={isDarkMode}
              onSelectStock={(stk) => setSelectedAsset(stk)}
              onViewAllUSStocks={() => setIsAllUSStocksOpen(true)}
              priceTickFlash={priceTickFlash}
            />

            {/* Crypto & Forex 2-column Grid */}
            <CryptoForexSection
              cryptoList={crypto}
              forexList={forex}
              isDarkMode={isDarkMode}
              onSelectAsset={(asset) => setSelectedAsset(asset)}
              onViewAllCrypto={() => setActiveCategory('Crypto')}
              onViewAllForex={() => setActiveCategory('Forex')}
              priceTickFlash={priceTickFlash}
            />

            {/* Futures & Commodities */}
            <FuturesSection
              futures={futures}
              isDarkMode={isDarkMode}
              onSelectCommodity={(commodity) => setSelectedAsset(commodity)}
              onViewAllFutures={() => setActiveCategory('Futures')}
              priceTickFlash={priceTickFlash}
            />
          </>
        ) : (
          /* Specialized category deep screen */
          <CategoryDetailView
            category={activeCategory}
            onBackToOverview={() => setActiveCategory('US stocks')}
            isDarkMode={isDarkMode}
            onSelectAsset={(asset) => setSelectedAsset(asset)}
          />
        )}
      </main>

      {/* Site Footer */}
      <Footer
        isDarkMode={isDarkMode}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Superchart Modal */}
      {selectedAsset && (
        <ChartModal
          asset={selectedAsset}
          onClose={() => setSelectedAsset(null)}
          isDarkMode={isDarkMode}
          isInWatchlist={watchlistSymbols.includes(selectedAsset.symbol)}
          onToggleWatchlist={toggleWatchlist}
        />
      )}

      {/* Search Modal (Ctrl+K) */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        isDarkMode={isDarkMode}
        onSelectAsset={(asset) => setSelectedAsset(asset)}
      />

      {/* Watchlist Side Drawer */}
      <WatchlistDrawer
        isOpen={isWatchlistOpen}
        onClose={() => setIsWatchlistOpen(false)}
        watchlistSymbols={watchlistSymbols}
        onRemoveFromWatchlist={(sym) => setWatchlistSymbols((prev) => prev.filter((s) => s !== sym))}
        isDarkMode={isDarkMode}
        onSelectAsset={(asset) => setSelectedAsset(asset)}
      />

      {/* Get Started / Registration Modal */}
      <GetStartedModal
        isOpen={isGetStartedOpen}
        onClose={() => setIsGetStartedOpen(false)}
        isDarkMode={isDarkMode}
      />

      {/* All US Stocks Screener Modal */}
      <AllUSStocksModal
        isOpen={isAllUSStocksOpen}
        onClose={() => setIsAllUSStocksOpen(false)}
        isDarkMode={isDarkMode}
        onSelectStock={(stk) => setSelectedAsset(stk)}
      />
    </div>
  );
}
