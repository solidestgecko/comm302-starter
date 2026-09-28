import React from 'react';
import { X, Trash2, TrendingUp, TrendingDown, Star, ExternalLink } from 'lucide-react';
import { ALL_SEARCHABLE_ASSETS } from '../data/marketData';

interface WatchlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  watchlistSymbols: string[];
  onRemoveFromWatchlist: (symbol: string) => void;
  isDarkMode: boolean;
  onSelectAsset: (asset: {
    symbol: string;
    name: string;
    price: number;
    changePercent: number;
    isPositive: boolean;
  }) => void;
}

export const WatchlistDrawer: React.FC<WatchlistDrawerProps> = ({
  isOpen,
  onClose,
  watchlistSymbols,
  onRemoveFromWatchlist,
  isDarkMode,
  onSelectAsset,
}) => {
  if (!isOpen) return null;

  const watchlistItems = ALL_SEARCHABLE_ASSETS.filter((item) =>
    watchlistSymbols.includes(item.symbol)
  );

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className={`w-full max-w-md h-full flex flex-col shadow-2xl border-l transition-all ${
          isDarkMode
            ? 'bg-[#131722] border-[#2a2e39] text-[#d1d4dc]'
            : 'bg-white border-[#e0e3eb] text-[#131722]'
        }`}
      >
        {/* Drawer Header */}
        <div
          className={`flex items-center justify-between px-5 py-4 border-b ${
            isDarkMode ? 'border-[#2a2e39]' : 'border-[#e0e3eb]'
          }`}
        >
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
            <h3 className={`font-bold text-base ${isDarkMode ? 'text-white' : 'text-[#131722]'}`}>
              My Watchlist ({watchlistSymbols.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-gray-500/10 text-[#787b86] hover:text-black dark:hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Watchlist Body */}
        <div className="flex-1 overflow-y-auto divide-y divide-gray-100 dark:divide-[#2a2e39]">
          {watchlistItems.length === 0 ? (
            <div className="p-8 text-center text-sm text-[#787b86]">
              <Star className="w-10 h-10 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
              <p className="font-semibold mb-1">Your watchlist is empty</p>
              <p className="text-xs">
                Click the star icon on any asset or chart to track it here in real-time.
              </p>
            </div>
          ) : (
            watchlistItems.map((item) => (
              <div
                key={item.symbol}
                className={`p-4 flex items-center justify-between transition group hover:bg-gray-500/5`}
              >
                <div
                  onClick={() => {
                    onSelectAsset({
                      symbol: item.symbol,
                      name: item.name,
                      price: parseFloat(item.price.replace(/[^0.0-9]/g, '')) || 100,
                      changePercent: parseFloat(item.change.replace('%', '')) || 0,
                      isPositive: item.isPositive,
                    });
                    onClose();
                  }}
                  className="cursor-pointer flex-1"
                >
                  <div className="flex items-center gap-2">
                    <span className={`font-bold text-sm ${isDarkMode ? 'text-white' : 'text-[#131722]'}`}>
                      {item.symbol}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded font-mono font-medium bg-gray-100 dark:bg-[#1e222d] text-[#787b86]">
                      {item.type}
                    </span>
                  </div>
                  <div className="text-xs text-[#787b86] truncate max-w-[200px]">{item.name}</div>
                </div>

                <div className="flex items-center gap-3 text-right font-mono tabular-nums">
                  <div>
                    <div className={`font-semibold text-sm ${isDarkMode ? 'text-white' : 'text-[#131722]'}`}>
                      {item.price}
                    </div>
                    <div
                      className={`text-xs font-medium flex items-center justify-end gap-0.5 ${
                        item.isPositive ? 'text-[#089981]' : 'text-[#f23645]'
                      }`}
                    >
                      {item.isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      <span>{item.change}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => onRemoveFromWatchlist(item.symbol)}
                    className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition cursor-pointer"
                    title="Remove from watchlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer info */}
        <div
          className={`p-4 border-t text-xs text-[#787b86] flex items-center justify-between ${
            isDarkMode ? 'border-[#2a2e39] bg-[#1e222d]/40' : 'border-[#e0e3eb] bg-gray-50'
          }`}
        >
          <span>Auto-updates with market ticks</span>
          <button
            onClick={() => {
              ['NVDA', 'AAPL', 'BTCUSD', 'GC1!'].forEach((sym) => {
                if (!watchlistSymbols.includes(sym)) {
                  onSelectAsset({
                    symbol: sym,
                    name: sym,
                    price: 150,
                    changePercent: 1.5,
                    isPositive: true,
                  });
                }
              });
            }}
            className="text-[#2962ff] hover:underline font-medium cursor-pointer"
          >
            Reset defaults
          </button>
        </div>
      </div>
    </div>
  );
};
