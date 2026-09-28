import React, { useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { AssetCategory } from '../types';

interface HeroSectionProps {
  activeCategory: AssetCategory;
  onSelectCategory: (cat: AssetCategory) => void;
  isDarkMode: boolean;
  selectedRegion: string;
  onSelectRegion: (region: string) => void;
}

const CATEGORIES: AssetCategory[] = [
  'US stocks',
  'World stocks',
  'Crypto',
  'Futures',
  'Forex',
  'Government bonds',
  'Corporate bonds',
  'ETFs',
  'Economy',
];

const REGIONS = [
  { id: 'all', label: 'Everywhere' },
  { id: 'us', label: 'United States' },
  { id: 'global', label: 'Global Markets' },
  { id: 'europe', label: 'Europe' },
  { id: 'asia', label: 'Asia-Pacific' },
  { id: 'emerging', label: 'Emerging Markets' },
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  activeCategory,
  onSelectCategory,
  isDarkMode,
  selectedRegion,
  onSelectRegion,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const currentRegionLabel = REGIONS.find((r) => r.id === selectedRegion)?.label || 'everywhere';

  return (
    <section className="text-center mb-8 relative" data-purpose="markets-hero">
      {/* Headline with dropdown toggle */}
      <div className="relative inline-block">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="inline-flex items-center justify-center gap-2 cursor-pointer group focus:outline-none"
        >
          <h1
            className={`text-4xl md:text-5xl lg:text-[54px] font-extrabold tracking-tight transition-colors ${
              isDarkMode
                ? 'text-white group-hover:text-blue-400'
                : 'text-[#131722] group-hover:text-black'
            }`}
          >
            Markets, {currentRegionLabel.toLowerCase()}
          </h1>
          <ChevronDown
            className={`w-6 h-6 md:w-8 md:h-8 stroke-[3] transition-transform duration-150 ${
              dropdownOpen ? 'rotate-180' : 'group-hover:translate-y-0.5'
            } ${isDarkMode ? 'text-white' : 'text-[#131722]'}`}
          />
        </button>

        {/* Region selector dropdown */}
        {dropdownOpen && (
          <div
            className={`absolute left-1/2 -translate-x-1/2 mt-2 w-64 rounded-2xl shadow-xl border p-2 z-30 text-left transition-all ${
              isDarkMode
                ? 'bg-[#1e222d] border-[#2a2e39] text-[#d1d4dc]'
                : 'bg-white border-[#e0e3eb] text-[#131722]'
            }`}
          >
            <div className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#787b86]">
              Filter Region
            </div>
            {REGIONS.map((region) => {
              const isSelected = selectedRegion === region.id;
              return (
                <button
                  key={region.id}
                  onClick={() => {
                    onSelectRegion(region.id);
                    setDropdownOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-xl transition cursor-pointer ${
                    isSelected
                      ? isDarkMode
                        ? 'bg-[#2962ff]/20 text-[#2962ff] font-semibold'
                        : 'bg-[#2962ff]/10 text-[#2962ff] font-semibold'
                      : isDarkMode
                      ? 'hover:bg-[#2a2e39]'
                      : 'hover:bg-[#f0f3fa]'
                  }`}
                >
                  <span>{region.label}</span>
                  {isSelected && <Check className="w-4 h-4 text-[#2962ff]" />}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Category Filter Pills matching screenshot */}
      <div className="mt-6 flex items-center justify-start md:justify-center overflow-x-auto no-scrollbar gap-2 py-2 px-1">
        {CATEGORIES.map((category) => {
          const isActive = activeCategory === category;
          return (
            <button
              key={category}
              onClick={() => onSelectCategory(category)}
              className={`px-4 py-1.5 rounded-full text-xs md:text-sm font-medium whitespace-nowrap transition cursor-pointer ${
                isActive
                  ? isDarkMode
                    ? 'bg-[#2a2e39] text-white shadow-sm font-semibold'
                    : 'bg-[#e0e3eb] text-[#131722] shadow-sm font-semibold'
                  : isDarkMode
                  ? 'text-[#787b86] hover:text-white hover:bg-[#1e222d]'
                  : 'text-[#787b86] hover:text-[#131722] hover:bg-[#f0f3fa]'
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>
    </section>
  );
};
