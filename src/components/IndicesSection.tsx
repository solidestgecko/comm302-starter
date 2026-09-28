import React from 'react';
import { ChevronRight } from 'lucide-react';
import { IndexItem, SecondaryIndex } from '../types';

interface IndicesSectionProps {
  indices: IndexItem[];
  secondaryIndices: SecondaryIndex[];
  isDarkMode: boolean;
  onSelectIndex: (index: { symbol: string; name: string; price: number; changePercent: number; isPositive: boolean }) => void;
  priceTickFlash: Record<string, 'up' | 'down' | undefined>;
}

export const IndicesSection: React.FC<IndicesSectionProps> = ({
  indices,
  secondaryIndices,
  isDarkMode,
  onSelectIndex,
  priceTickFlash,
}) => {
  return (
    <section className="mb-14" data-purpose="indices-cards">
      {/* Header with clickable chevron */}
      <button
        onClick={() =>
          onSelectIndex({
            symbol: 'SPX',
            name: 'Major Global Indices Overview',
            price: indices[0]?.rawPrice || 5969.34,
            changePercent: 0.38,
            isPositive: true,
          })
        }
        className="flex items-center gap-1.5 mb-5 cursor-pointer group text-left focus:outline-none"
      >
        <h2
          className={`text-2xl md:text-3xl font-bold tracking-tight transition-colors ${
            isDarkMode
              ? 'text-white group-hover:text-[#2962ff]'
              : 'text-[#131722] group-hover:text-[#2962ff]'
          }`}
        >
          Indices
        </h2>
        <ChevronRight
          className={`w-5 h-5 transition duration-150 group-hover:translate-x-1 ${
            isDarkMode
              ? 'text-white group-hover:text-[#2962ff]'
              : 'text-[#131722] group-hover:text-[#2962ff]'
          }`}
        />
      </button>

      {/* Three Top Key Indices Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {indices.map((idx, i) => {
          const isPrimarySelected = i === 0;
          const flashState = priceTickFlash[idx.id];

          return (
            <div
              key={idx.id}
              onClick={() =>
                onSelectIndex({
                  symbol: idx.name.replace(' ', ''),
                  name: idx.name,
                  price: idx.rawPrice,
                  changePercent: idx.rawChange,
                  isPositive: idx.isPositive,
                })
              }
              className={`p-4 rounded-[28px] flex items-center justify-between transition cursor-pointer hover-lift ${
                isPrimarySelected
                  ? isDarkMode
                    ? 'bg-[#1e222d] border border-[#2962ff]/40 shadow-sm'
                    : 'bg-[#f0f3fa] hover:bg-[#e6eaf3]'
                  : isDarkMode
                  ? 'bg-[#131722] border border-[#2a2e39] hover:border-[#2962ff]/40'
                  : 'bg-white border border-[#e0e3eb] hover:border-[#2962ff]/40'
              } ${
                flashState === 'up'
                  ? 'animate-flash-up'
                  : flashState === 'down'
                  ? 'animate-flash-down'
                  : ''
              }`}
            >
              <div className="flex items-center gap-3.5">
                <span
                  style={{ backgroundColor: idx.badgeBg }}
                  className="w-10 h-10 rounded-full text-white font-bold text-xs flex items-center justify-center tracking-tight shadow-sm shrink-0"
                >
                  {idx.badge}
                </span>
                <div>
                  <div
                    className={`text-sm font-bold leading-snug ${
                      isDarkMode ? 'text-white' : 'text-[#131722]'
                    }`}
                  >
                    {idx.name}
                  </div>
                  <div className="text-xs text-[#787b86] flex items-center gap-2 font-mono tabular-nums">
                    <span>{idx.price}</span>
                    <span
                      className={`font-semibold ${
                        idx.isPositive ? 'text-[#089981]' : 'text-[#f23645]'
                      }`}
                    >
                      {idx.change}
                    </span>
                  </div>
                </div>
              </div>

              {/* Sparkline Chart SVG matching screenshot */}
              <svg className="w-24 h-9 overflow-visible shrink-0" viewBox="0 0 100 40">
                {idx.isPositive ? (
                  <path
                    d={
                      i === 0
                        ? 'M0,32 Q25,38 40,22 T70,18 T100,6'
                        : 'M0,28 Q20,35 45,15 T80,18 T100,4'
                    }
                    fill="none"
                    stroke="#089981"
                    strokeLinecap="round"
                    strokeWidth="2.2"
                  />
                ) : (
                  <path
                    d="M0,10 Q30,6 50,22 T80,24 T100,34"
                    fill="none"
                    stroke="#f23645"
                    strokeLinecap="round"
                    strokeWidth="2.2"
                  />
                )}
              </svg>
            </div>
          );
        })}
      </div>

      {/* Secondary Indices Carousel / Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {secondaryIndices.map((sec) => {
          const flashState = priceTickFlash[sec.symbol];

          return (
            <button
              key={sec.symbol}
              onClick={() =>
                onSelectIndex({
                  symbol: sec.symbol,
                  name: sec.name,
                  price: sec.rawPrice,
                  changePercent: parseFloat(sec.change.replace('%', '')),
                  isPositive: sec.isPositive,
                })
              }
              className={`p-3 border rounded-xl transition text-left cursor-pointer hover-lift ${
                isDarkMode
                  ? 'border-[#2a2e39] bg-[#131722]/50 hover:border-[#2962ff] text-white'
                  : 'border-[#e0e3eb] bg-white hover:border-[#2962ff] text-[#131722]'
              } ${
                flashState === 'up'
                  ? 'animate-flash-up'
                  : flashState === 'down'
                  ? 'animate-flash-down'
                  : ''
              }`}
            >
              <span className="text-xs text-[#787b86] block truncate">{sec.name}</span>
              <span className="text-sm font-bold block font-mono tabular-nums my-0.5">{sec.price}</span>
              <span
                className={`text-xs font-medium font-mono tabular-nums ${
                  sec.isPositive ? 'text-[#089981]' : 'text-[#f23645]'
                }`}
              >
                {sec.change}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};
