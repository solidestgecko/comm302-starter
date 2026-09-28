import React, { useState, useEffect, useRef } from 'react';
import { Search, X, TrendingUp, TrendingDown } from 'lucide-react';
import { ALL_SEARCHABLE_ASSETS } from '../data/marketData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  onSelectAsset: (asset: {
    symbol: string;
    name: string;
    price: number;
    changePercent: number;
    isPositive: boolean;
  }) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  isDarkMode,
  onSelectAsset,
}) => {
  const [query, setQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Global keydown for Escape and Arrows
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
          e.preventDefault();
        }
        return;
      }

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, filteredAssets.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter' && filteredAssets[selectedIndex]) {
        e.preventDefault();
        const item = filteredAssets[selectedIndex];
        onSelectAsset({
          symbol: item.symbol,
          name: item.name,
          price: parseFloat(item.price.replace(/[^0.0-9]/g, '')) || 100,
          changePercent: parseFloat(item.change.replace('%', '')) || 0,
          isPositive: item.isPositive,
        });
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex]);

  if (!isOpen) return null;

  const filters = ['All', 'Stocks', 'Crypto', 'Forex', 'Futures', 'Indices'];

  const filteredAssets = ALL_SEARCHABLE_ASSETS.filter((item) => {
    const matchesQuery =
      item.symbol.toLowerCase().includes(query.toLowerCase()) ||
      item.name.toLowerCase().includes(query.toLowerCase());

    if (selectedFilter === 'All') return matchesQuery;
    if (selectedFilter === 'Stocks') return matchesQuery && item.type === 'Stock';
    if (selectedFilter === 'Crypto') return matchesQuery && item.type === 'Crypto';
    if (selectedFilter === 'Forex') return matchesQuery && item.type === 'Forex';
    if (selectedFilter === 'Futures') return matchesQuery && item.type === 'Futures';
    if (selectedFilter === 'Indices') return matchesQuery && item.type === 'Index';
    return matchesQuery;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className={`w-full max-w-2xl rounded-2xl shadow-2xl border overflow-hidden transition-all ${
          isDarkMode
            ? 'bg-[#131722] border-[#2a2e39] text-[#d1d4dc]'
            : 'bg-white border-[#e0e3eb] text-[#131722]'
        }`}
      >
        {/* Search Input Bar */}
        <div
          className={`flex items-center gap-3 px-4 py-3.5 border-b ${
            isDarkMode ? 'border-[#2a2e39]' : 'border-[#e0e3eb]'
          }`}
        >
          <Search className="w-5 h-5 text-[#787b86]" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search symbols, companies, forex, crypto..."
            className="flex-1 bg-transparent border-none outline-none text-base placeholder-[#787b86] font-medium"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-gray-500/10 text-[#787b86] hover:text-black dark:hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Pills */}
        <div
          className={`flex items-center gap-1.5 px-4 py-2 border-b overflow-x-auto no-scrollbar text-xs ${
            isDarkMode ? 'border-[#2a2e39] bg-[#1e222d]/40' : 'border-[#e0e3eb] bg-[#f0f3fa]/40'
          }`}
        >
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => {
                setSelectedFilter(f);
                setSelectedIndex(0);
              }}
              className={`px-3 py-1 rounded-full font-medium transition cursor-pointer ${
                selectedFilter === f
                  ? 'bg-[#2962ff] text-white shadow-xs'
                  : isDarkMode
                  ? 'text-[#787b86] hover:text-white hover:bg-[#2a2e39]'
                  : 'text-[#787b86] hover:text-black hover:bg-gray-200'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto divide-y divide-gray-100 dark:divide-[#2a2e39]">
          {filteredAssets.length === 0 ? (
            <div className="p-8 text-center text-sm text-[#787b86]">
              No matching assets found for "{query}".
            </div>
          ) : (
            filteredAssets.map((asset, idx) => {
              const isSelected = selectedIndex === idx;
              return (
                <div
                  key={asset.symbol}
                  onClick={() => {
                    onSelectAsset({
                      symbol: asset.symbol,
                      name: asset.name,
                      price: parseFloat(asset.price.replace(/[^0.0-9]/g, '')) || 100,
                      changePercent: parseFloat(asset.change.replace('%', '')) || 0,
                      isPositive: asset.isPositive,
                    });
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between px-4 py-3 cursor-pointer transition ${
                    isSelected
                      ? isDarkMode
                        ? 'bg-[#1e222d]'
                        : 'bg-[#f0f3fa]'
                      : 'hover:bg-gray-500/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-xs px-2 py-0.5 rounded font-mono font-bold ${
                        isDarkMode ? 'bg-[#2a2e39] text-[#9db2c6]' : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {asset.type}
                    </span>
                    <div>
                      <div className={`font-bold text-sm ${isDarkMode ? 'text-white' : 'text-[#131722]'}`}>
                        {asset.symbol}
                      </div>
                      <div className="text-xs text-[#787b86] truncate max-w-xs">{asset.name}</div>
                    </div>
                  </div>

                  <div className="text-right font-mono tabular-nums">
                    <div className={`font-semibold text-sm ${isDarkMode ? 'text-white' : 'text-[#131722]'}`}>
                      {asset.price}
                    </div>
                    <div
                      className={`text-xs font-medium flex items-center justify-end gap-0.5 ${
                        asset.isPositive ? 'text-[#089981]' : 'text-[#f23645]'
                      }`}
                    >
                      {asset.isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      <span>{asset.change}</span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Shortcut Helper */}
        <div
          className={`px-4 py-2 text-[11px] text-[#787b86] flex items-center justify-between border-t ${
            isDarkMode ? 'border-[#2a2e39] bg-[#1e222d]/60' : 'border-[#e0e3eb] bg-gray-50'
          }`}
        >
          <span>Use ↑ ↓ to navigate</span>
          <span>Press Enter to view superchart</span>
          <span>Esc to close</span>
        </div>
      </div>
    </div>
  );
};
