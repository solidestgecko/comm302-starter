import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { StockMover } from '../types';

interface USStocksSectionProps {
  highestVolume: StockMover[];
  stockGainers: StockMover[];
  stockLosers: StockMover[];
  isDarkMode: boolean;
  onSelectStock: (stock: {
    symbol: string;
    name: string;
    price: number;
    changePercent: number;
    isPositive: boolean;
  }) => void;
  onViewAllUSStocks: () => void;
  priceTickFlash: Record<string, 'up' | 'down' | undefined>;
}

const QUICK_TICKERS = [
  { symbol: 'NVDA', label: 'NVIDIA (NVDA)' },
  { symbol: 'AAPL', label: 'Apple (AAPL)' },
  { symbol: 'AMZN', label: 'Amazon (AMZN)' },
  { symbol: 'GOOGL', label: 'Alphabet (GOOGL)' },
  { symbol: 'TSLA', label: 'Tesla (TSLA)' },
  { symbol: 'MSFT', label: 'Microsoft (MSFT)' },
];

export const USStocksSection: React.FC<USStocksSectionProps> = ({
  highestVolume,
  stockGainers,
  stockLosers,
  isDarkMode,
  onSelectStock,
  onViewAllUSStocks,
  priceTickFlash,
}) => {
  const [selectedQuickTicker, setSelectedQuickTicker] = useState('NVDA');

  return (
    <section className="mb-14" data-purpose="us-stocks-overview">
      {/* Header and See All link */}
      <div className="flex items-center justify-between mb-5">
        <button
          onClick={onViewAllUSStocks}
          className="flex items-center gap-1.5 cursor-pointer group text-left focus:outline-none"
        >
          <h2
            className={`text-2xl md:text-3xl font-bold tracking-tight transition-colors ${
              isDarkMode
                ? 'text-white group-hover:text-[#2962ff]'
                : 'text-[#131722] group-hover:text-[#2962ff]'
            }`}
          >
            US stocks
          </h2>
          <ChevronRight
            className={`w-5 h-5 transition duration-150 group-hover:translate-x-1 ${
              isDarkMode
                ? 'text-white group-hover:text-[#2962ff]'
                : 'text-[#131722] group-hover:text-[#2962ff]'
            }`}
          />
        </button>

        <button
          onClick={onViewAllUSStocks}
          className="text-xs md:text-sm font-semibold text-[#2962ff] hover:underline cursor-pointer"
        >
          See all US stocks →
        </button>
      </div>

      {/* Quick Ticker Badges Bar matching screenshot */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-6">
        {QUICK_TICKERS.map((ticker) => {
          const isSelected = selectedQuickTicker === ticker.symbol;
          return (
            <button
              key={ticker.symbol}
              onClick={() => {
                setSelectedQuickTicker(ticker.symbol);
                onSelectStock({
                  symbol: ticker.symbol,
                  name: ticker.label,
                  price: ticker.symbol === 'NVDA' ? 148.88 : ticker.symbol === 'AAPL' ? 232.4 : 210.15,
                  changePercent: 2.68,
                  isPositive: true,
                });
              }}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                isSelected
                  ? isDarkMode
                    ? 'bg-white text-black shadow-sm'
                    : 'bg-[#131722] text-white shadow-sm'
                  : isDarkMode
                  ? 'bg-[#1e222d] text-[#d1d4dc] hover:bg-[#2a2e39]'
                  : 'bg-[#f0f3fa] text-[#131722] hover:bg-[#e5e9f0]'
              }`}
            >
              {ticker.label}
            </button>
          );
        })}
      </div>

      {/* Market Movers: 3 Columns Grid matching screenshot */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Column 1: Highest volume stocks */}
        <div
          className={`border rounded-2xl p-5 hover:shadow-md transition ${
            isDarkMode ? 'border-[#2a2e39] bg-[#131722]' : 'border-[#e0e3eb] bg-white'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className={`font-bold text-base ${isDarkMode ? 'text-white' : 'text-[#131722]'}`}>
              Highest volume
            </h3>
            <button
              onClick={onViewAllUSStocks}
              className="text-xs text-[#2962ff] hover:underline font-medium cursor-pointer"
            >
              All →
            </button>
          </div>
          <div
            className={`divide-y text-sm ${
              isDarkMode ? 'divide-[#2a2e39]' : 'divide-[#e0e3eb]'
            }`}
          >
            {highestVolume.map((stock) => {
              const flash = priceTickFlash[stock.symbol];
              return (
                <div
                  key={stock.symbol}
                  onClick={() =>
                    onSelectStock({
                      symbol: stock.symbol,
                      name: stock.name,
                      price: stock.rawPrice,
                      changePercent: stock.rawChangePercent,
                      isPositive: stock.isPositive,
                    })
                  }
                  className={`py-2.5 flex items-center justify-between hover:bg-gray-500/5 px-1.5 rounded-lg -mx-1.5 transition cursor-pointer ${
                    flash === 'up'
                      ? 'animate-flash-up'
                      : flash === 'down'
                      ? 'animate-flash-down'
                      : ''
                  }`}
                >
                  <div>
                    <div className={`font-bold ${isDarkMode ? 'text-white' : 'text-[#131722]'}`}>
                      {stock.symbol}
                    </div>
                    <div className="text-xs text-[#787b86] truncate w-36 sm:w-44">
                      {stock.name}
                    </div>
                  </div>
                  <div className="text-right font-mono tabular-nums">
                    <div className={`font-semibold ${isDarkMode ? 'text-white' : 'text-[#131722]'}`}>
                      {stock.price}
                    </div>
                    <div
                      className={`text-xs font-medium ${
                        stock.isPositive ? 'text-[#089981]' : 'text-[#f23645]'
                      }`}
                    >
                      {stock.change}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Column 2: Stock Gainers */}
        <div
          className={`border rounded-2xl p-5 hover:shadow-md transition ${
            isDarkMode ? 'border-[#2a2e39] bg-[#131722]' : 'border-[#e0e3eb] bg-white'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className={`font-bold text-base ${isDarkMode ? 'text-white' : 'text-[#131722]'}`}>
              Stock gainers
            </h3>
            <button
              onClick={onViewAllUSStocks}
              className="text-xs text-[#2962ff] hover:underline font-medium cursor-pointer"
            >
              All →
            </button>
          </div>
          <div
            className={`divide-y text-sm ${
              isDarkMode ? 'divide-[#2a2e39]' : 'divide-[#e0e3eb]'
            }`}
          >
            {stockGainers.map((stock) => {
              const flash = priceTickFlash[stock.symbol];
              return (
                <div
                  key={stock.symbol}
                  onClick={() =>
                    onSelectStock({
                      symbol: stock.symbol,
                      name: stock.name,
                      price: stock.rawPrice,
                      changePercent: stock.rawChangePercent,
                      isPositive: stock.isPositive,
                    })
                  }
                  className={`py-2.5 flex items-center justify-between hover:bg-gray-500/5 px-1.5 rounded-lg -mx-1.5 transition cursor-pointer ${
                    flash === 'up'
                      ? 'animate-flash-up'
                      : flash === 'down'
                      ? 'animate-flash-down'
                      : ''
                  }`}
                >
                  <div>
                    <div className={`font-bold ${isDarkMode ? 'text-white' : 'text-[#131722]'}`}>
                      {stock.symbol}
                    </div>
                    <div className="text-xs text-[#787b86] truncate w-36 sm:w-44">
                      {stock.name}
                    </div>
                  </div>
                  <div className="text-right font-mono tabular-nums">
                    <div className={`font-semibold ${isDarkMode ? 'text-white' : 'text-[#131722]'}`}>
                      {stock.price}
                    </div>
                    <div className="text-xs text-[#089981] font-semibold">{stock.change}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Column 3: Stock Losers */}
        <div
          className={`border rounded-2xl p-5 hover:shadow-md transition ${
            isDarkMode ? 'border-[#2a2e39] bg-[#131722]' : 'border-[#e0e3eb] bg-white'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className={`font-bold text-base ${isDarkMode ? 'text-white' : 'text-[#131722]'}`}>
              Stock losers
            </h3>
            <button
              onClick={onViewAllUSStocks}
              className="text-xs text-[#2962ff] hover:underline font-medium cursor-pointer"
            >
              All →
            </button>
          </div>
          <div
            className={`divide-y text-sm ${
              isDarkMode ? 'divide-[#2a2e39]' : 'divide-[#e0e3eb]'
            }`}
          >
            {stockLosers.map((stock) => {
              const flash = priceTickFlash[stock.symbol];
              return (
                <div
                  key={stock.symbol}
                  onClick={() =>
                    onSelectStock({
                      symbol: stock.symbol,
                      name: stock.name,
                      price: stock.rawPrice,
                      changePercent: stock.rawChangePercent,
                      isPositive: stock.isPositive,
                    })
                  }
                  className={`py-2.5 flex items-center justify-between hover:bg-gray-500/5 px-1.5 rounded-lg -mx-1.5 transition cursor-pointer ${
                    flash === 'up'
                      ? 'animate-flash-up'
                      : flash === 'down'
                      ? 'animate-flash-down'
                      : ''
                  }`}
                >
                  <div>
                    <div className={`font-bold ${isDarkMode ? 'text-white' : 'text-[#131722]'}`}>
                      {stock.symbol}
                    </div>
                    <div className="text-xs text-[#787b86] truncate w-36 sm:w-44">
                      {stock.name}
                    </div>
                  </div>
                  <div className="text-right font-mono tabular-nums">
                    <div className={`font-semibold ${isDarkMode ? 'text-white' : 'text-[#131722]'}`}>
                      {stock.price}
                    </div>
                    <div className="text-xs text-[#f23645] font-semibold">{stock.change}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
