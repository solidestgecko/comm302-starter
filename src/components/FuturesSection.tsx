import React from 'react';
import { ChevronRight } from 'lucide-react';
import { CommodityItem } from '../types';

interface FuturesSectionProps {
  futures: CommodityItem[];
  isDarkMode: boolean;
  onSelectCommodity: (item: {
    symbol: string;
    name: string;
    price: number;
    changePercent: number;
    isPositive: boolean;
  }) => void;
  onViewAllFutures: () => void;
  priceTickFlash: Record<string, 'up' | 'down' | undefined>;
}

export const FuturesSection: React.FC<FuturesSectionProps> = ({
  futures,
  isDarkMode,
  onSelectCommodity,
  onViewAllFutures,
  priceTickFlash,
}) => {
  return (
    <section className="mb-14" data-purpose="futures-commodities">
      <div className="flex items-center justify-between mb-5">
        <button
          onClick={onViewAllFutures}
          className="flex items-center gap-1.5 cursor-pointer group text-left focus:outline-none"
        >
          <h2
            className={`text-2xl font-bold tracking-tight transition-colors ${
              isDarkMode
                ? 'text-white group-hover:text-[#2962ff]'
                : 'text-[#131722] group-hover:text-[#2962ff]'
            }`}
          >
            Futures &amp; Commodities
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
          onClick={onViewAllFutures}
          className="text-xs md:text-sm font-semibold text-[#2962ff] hover:underline cursor-pointer"
        >
          See all futures →
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {futures.slice(0, 4).map((item) => {
          const flash = priceTickFlash[item.code];
          return (
            <div
              key={item.code}
              onClick={() =>
                onSelectCommodity({
                  symbol: item.code,
                  name: `${item.symbol} Futures`,
                  price: item.rawPrice,
                  changePercent: item.rawChangePercent,
                  isPositive: item.isPositive,
                })
              }
              className={`p-4 border rounded-2xl hover:border-[#2962ff] transition hover-lift cursor-pointer ${
                isDarkMode ? 'border-[#2a2e39] bg-[#131722]' : 'border-[#e0e3eb] bg-white'
              } ${
                flash === 'up'
                  ? 'animate-flash-up'
                  : flash === 'down'
                  ? 'animate-flash-down'
                  : ''
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#787b86]">
                  {item.symbol}
                </span>
                <span
                  style={{
                    backgroundColor: isDarkMode ? '#2a2e39' : item.badgeBg,
                    color: isDarkMode ? '#9db2c6' : item.badgeText,
                  }}
                  className="text-xs font-bold px-1.5 py-0.5 rounded font-mono"
                >
                  {item.code}
                </span>
              </div>
              <div
                className={`text-lg font-bold font-mono tabular-nums ${
                  isDarkMode ? 'text-white' : 'text-[#131722]'
                }`}
              >
                {item.price}
              </div>
              <div
                className={`text-xs font-semibold mt-1 font-mono tabular-nums ${
                  item.isPositive ? 'text-[#089981]' : 'text-[#f23645]'
                }`}
              >
                {item.changePercent}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
