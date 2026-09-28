import React, { useState } from 'react';
import { X, Search, TrendingUp, TrendingDown, ArrowUpDown } from 'lucide-react';

interface AllUSStocksModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  onSelectStock: (stock: {
    symbol: string;
    name: string;
    price: number;
    changePercent: number;
    isPositive: boolean;
  }) => void;
}

const EXTENDED_US_STOCKS = [
  { symbol: 'NVDA', name: 'NVIDIA Corporation', sector: 'Semiconductors', price: 148.88, change: 2.68, volume: '62.4M', marketCap: '$3.64T', pe: 54.2 },
  { symbol: 'AAPL', name: 'Apple Inc.', sector: 'Consumer Electronics', price: 232.40, change: 0.75, volume: '48.1M', marketCap: '$3.52T', pe: 34.6 },
  { symbol: 'MSFT', name: 'Microsoft Corporation', sector: 'Software & Cloud', price: 422.54, change: -0.42, volume: '22.8M', marketCap: '$3.14T', pe: 32.1 },
  { symbol: 'AMZN', name: 'Amazon.com, Inc.', sector: 'E-commerce & Cloud', price: 210.15, change: 1.20, volume: '34.2M', marketCap: '$2.19T', pe: 43.8 },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', sector: 'Internet & Search', price: 182.60, change: 0.45, volume: '28.5M', marketCap: '$2.24T', pe: 24.3 },
  { symbol: 'TSLA', name: 'Tesla, Inc.', sector: 'Automotive & Clean Energy', price: 342.10, change: 3.90, volume: '88.3M', marketCap: '$1.09T', pe: 82.5 },
  { symbol: 'MU', name: 'Micron Technology, Inc.', sector: 'Semiconductors', price: 102.40, change: 4.85, volume: '41.2M', marketCap: '$113B', pe: 19.4 },
  { symbol: 'AMD', name: 'Advanced Micro Devices', sector: 'Semiconductors', price: 138.90, change: 3.12, volume: '38.4M', marketCap: '$225B', pe: 41.2 },
  { symbol: 'META', name: 'Meta Platforms, Inc.', sector: 'Social Media & AI', price: 588.20, change: 1.84, volume: '16.7M', marketCap: '$1.48T', pe: 27.8 },
  { symbol: 'AXG', name: 'Solowin Holdings', sector: 'Financial Services', price: 28.40, change: 48.22, volume: '14.8M', marketCap: '$410M', pe: 18.2 },
  { symbol: 'MSGY', name: 'Masonglory Limited', sector: 'Industrial', price: 4.92, change: 35.16, volume: '9.6M', marketCap: '$84M', pe: 12.0 },
  { symbol: 'ALAR', name: 'Alarum Tech Ltd', sector: 'Cybersecurity', price: 16.85, change: 22.10, volume: '6.4M', marketCap: '$142M', pe: 15.6 },
  { symbol: 'TDIC', name: 'Dreamland Limited', sector: 'Consumer', price: 2.14, change: -19.55, volume: '11.2M', marketCap: '$58M', pe: 8.4 },
  { symbol: 'IFBD', name: 'Infobird Co., Ltd', sector: 'IT Services', price: 1.08, change: -14.28, volume: '8.3M', marketCap: '$32M', pe: 6.2 },
];

export const AllUSStocksModal: React.FC<AllUSStocksModalProps> = ({
  isOpen,
  onClose,
  isDarkMode,
  onSelectStock,
}) => {
  const [search, setSearch] = useState('');
  const [selectedSector, setSelectedSector] = useState('All');
  const [sortField, setSortField] = useState<'price' | 'change' | 'symbol'>('change');
  const [sortAsc, setSortAsc] = useState(false);

  if (!isOpen) return null;

  const sectors = ['All', 'Semiconductors', 'Software & Cloud', 'Consumer', 'Financial Services'];

  const filtered = EXTENDED_US_STOCKS.filter((s) => {
    const matchesQuery = s.symbol.toLowerCase().includes(search.toLowerCase()) || s.name.toLowerCase().includes(search.toLowerCase());
    const matchesSector = selectedSector === 'All' || s.sector.includes(selectedSector);
    return matchesQuery && matchesSector;
  }).sort((a, b) => {
    let diff = 0;
    if (sortField === 'price') diff = a.price - b.price;
    else if (sortField === 'change') diff = a.change - b.change;
    else diff = a.symbol.localeCompare(b.symbol);
    return sortAsc ? diff : -diff;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className={`w-full max-w-5xl max-h-[90vh] flex flex-col rounded-3xl shadow-2xl border transition-all ${
          isDarkMode
            ? 'bg-[#131722] border-[#2a2e39] text-[#d1d4dc]'
            : 'bg-white border-[#e0e3eb] text-[#131722]'
        }`}
      >
        {/* Top Modal Header */}
        <div
          className={`flex items-center justify-between px-6 py-4 border-b ${
            isDarkMode ? 'border-[#2a2e39]' : 'border-[#e0e3eb]'
          }`}
        >
          <div>
            <h3 className={`text-xl font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-[#131722]'}`}>
              US Stock Screener
            </h3>
            <p className="text-xs text-[#787b86]">
              Real-time quotes, technical volumes, and valuation multiples
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-gray-500/10 text-[#787b86]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filters and Search Bar */}
        <div
          className={`p-4 border-b flex flex-wrap items-center justify-between gap-3 text-xs ${
            isDarkMode ? 'border-[#2a2e39] bg-[#1e222d]/40' : 'border-[#e0e3eb] bg-[#f0f3fa]/40'
          }`}
        >
          <div className="relative w-64">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-[#787b86]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter by ticker or name..."
              className={`w-full pl-9 pr-3 py-1.5 rounded-xl border text-xs outline-none ${
                isDarkMode ? 'bg-[#1e222d] border-[#2a2e39] text-white' : 'bg-white border-[#e0e3eb] text-black'
              }`}
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {sectors.map((sec) => (
              <button
                key={sec}
                onClick={() => setSelectedSector(sec)}
                className={`px-3 py-1 rounded-full font-medium transition cursor-pointer whitespace-nowrap ${
                  selectedSector === sec
                    ? 'bg-[#2962ff] text-white shadow-xs'
                    : isDarkMode
                    ? 'text-[#787b86] hover:bg-[#2a2e39]'
                    : 'text-[#787b86] hover:bg-gray-200'
                }`}
              >
                {sec}
              </button>
            ))}
          </div>
        </div>

        {/* Screener Table */}
        <div className="flex-1 overflow-y-auto">
          <table className="w-full text-left text-sm">
            <thead
              className={`text-xs sticky top-0 z-10 border-b ${
                isDarkMode ? 'bg-[#1e222d] border-[#2a2e39] text-[#787b86]' : 'bg-[#f0f3fa] border-[#e0e3eb] text-[#787b86]'
              }`}
            >
              <tr>
                <th
                  onClick={() => {
                    setSortField('symbol');
                    setSortAsc(!sortAsc);
                  }}
                  className="py-3 px-4 cursor-pointer hover:text-blue-500"
                >
                  <div className="flex items-center gap-1">
                    <span>Ticker</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3 px-4 hidden md:table-cell">Sector</th>
                <th
                  onClick={() => {
                    setSortField('price');
                    setSortAsc(!sortAsc);
                  }}
                  className="py-3 px-4 text-right cursor-pointer hover:text-blue-500"
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>Price</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th
                  onClick={() => {
                    setSortField('change');
                    setSortAsc(!sortAsc);
                  }}
                  className="py-3 px-4 text-right cursor-pointer hover:text-blue-500"
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>24h Change %</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3 px-4 text-right hidden sm:table-cell">Volume</th>
                <th className="py-3 px-4 text-right hidden sm:table-cell">Market Cap</th>
                <th className="py-3 px-4 text-right hidden lg:table-cell">P/E</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-[#2a2e39]">
              {filtered.map((s) => (
                <tr
                  key={s.symbol}
                  onClick={() => {
                    onSelectStock({
                      symbol: s.symbol,
                      name: s.name,
                      price: s.price,
                      changePercent: s.change,
                      isPositive: s.change >= 0,
                    });
                    onClose();
                  }}
                  className="hover:bg-blue-500/5 transition cursor-pointer"
                >
                  <td className="py-3.5 px-4">
                    <div className="font-bold">{s.symbol}</div>
                    <div className="text-xs text-[#787b86] truncate max-w-xs">{s.name}</div>
                  </td>
                  <td className="py-3.5 px-4 text-xs text-[#787b86] hidden md:table-cell">{s.sector}</td>
                  <td className="py-3.5 px-4 text-right font-mono font-bold">${s.price.toFixed(2)}</td>
                  <td
                    className={`py-3.5 px-4 text-right font-mono font-semibold ${
                      s.change >= 0 ? 'text-[#089981]' : 'text-[#f23645]'
                    }`}
                  >
                    {s.change >= 0 ? `+${s.change}%` : `${s.change}%`}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono text-[#787b86] hidden sm:table-cell">{s.volume}</td>
                  <td className="py-3.5 px-4 text-right font-mono text-[#787b86] hidden sm:table-cell">{s.marketCap}</td>
                  <td className="py-3.5 px-4 text-right font-mono text-xs text-[#787b86] hidden lg:table-cell">{s.pe}x</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
