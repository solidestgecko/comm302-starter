import React from 'react';
import { ChevronRight } from 'lucide-react';
import { CryptoItem, ForexItem } from '../types';

interface CryptoForexSectionProps {
  cryptoList: CryptoItem[];
  forexList: ForexItem[];
  isDarkMode: boolean;
  onSelectAsset: (asset: {
    symbol: string;
    name: string;
    price: number;
    changePercent: number;
    isPositive: boolean;
  }) => void;
  onViewAllCrypto: () => void;
  onViewAllForex: () => void;
  priceTickFlash: Record<string, 'up' | 'down' | undefined>;
}

export const CryptoForexSection: React.FC<CryptoForexSectionProps> = ({
  cryptoList,
  forexList,
  isDarkMode,
  onSelectAsset,
  onViewAllCrypto,
  onViewAllForex,
  priceTickFlash,
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-14">
      {/* Left: Crypto Section */}
      <section data-purpose="crypto-markets">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onViewAllCrypto}
            className="flex items-center gap-1.5 cursor-pointer group text-left focus:outline-none"
          >
            <h2
              className={`text-2xl font-bold tracking-tight transition-colors ${
                isDarkMode
                  ? 'text-white group-hover:text-[#2962ff]'
                  : 'text-[#131722] group-hover:text-[#2962ff]'
              }`}
            >
              Crypto
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
            onClick={onViewAllCrypto}
            className="text-xs font-semibold text-[#2962ff] hover:underline cursor-pointer"
          >
            See all coins →
          </button>
        </div>

        <div
          className={`border rounded-2xl overflow-hidden shadow-sm ${
            isDarkMode ? 'border-[#2a2e39] bg-[#131722]' : 'border-[#e0e3eb] bg-white'
          }`}
        >
          <table className="w-full text-left text-sm">
            <thead
              className={`text-xs font-medium border-b ${
                isDarkMode
                  ? 'bg-[#1e222d] text-[#787b86] border-[#2a2e39]'
                  : 'bg-[#f0f3fa]/60 text-[#787b86] border-[#e0e3eb]'
              }`}
            >
              <tr>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4 text-right">Price</th>
                <th className="py-3 px-4 text-right">24h Chg</th>
                <th className="py-3 px-4 text-right hidden sm:table-cell">Market Cap</th>
              </tr>
            </thead>
            <tbody
              className={`divide-y ${
                isDarkMode ? 'divide-[#2a2e39]' : 'divide-[#e0e3eb]'
              }`}
            >
              {cryptoList.slice(0, 5).map((coin) => {
                const flash = priceTickFlash[coin.symbol];
                return (
                  <tr
                    key={coin.symbol}
                    onClick={() =>
                      onSelectAsset({
                        symbol: coin.ticker + 'USD',
                        name: coin.name,
                        price: coin.rawPrice,
                        changePercent: coin.rawChangePercent,
                        isPositive: coin.isPositive,
                      })
                    }
                    className={`transition cursor-pointer ${
                      isDarkMode ? 'hover:bg-[#1e222d]/60' : 'hover:bg-[#f0f3fa]/40'
                    } ${
                      flash === 'up'
                        ? 'animate-flash-up'
                        : flash === 'down'
                        ? 'animate-flash-down'
                        : ''
                    }`}
                  >
                    <td className="py-3.5 px-4">
                      <div className="font-bold flex items-center gap-2">
                        <span
                          style={{ backgroundColor: coin.iconBg }}
                          className="w-6 h-6 rounded-full text-white flex items-center justify-center text-xs font-extrabold shrink-0 shadow-xs"
                        >
                          {coin.iconSymbol}
                        </span>
                        <span className={isDarkMode ? 'text-white' : 'text-[#131722]'}>
                          {coin.name}
                        </span>
                        <span className="text-xs text-[#787b86] font-normal">{coin.ticker}</span>
                      </div>
                    </td>
                    <td
                      className={`py-3.5 px-4 text-right font-semibold font-mono tabular-nums ${
                        isDarkMode ? 'text-white' : 'text-[#131722]'
                      }`}
                    >
                      {coin.price}
                    </td>
                    <td
                      className={`py-3.5 px-4 text-right font-medium font-mono tabular-nums ${
                        coin.isPositive ? 'text-[#089981]' : 'text-[#f23645]'
                      }`}
                    >
                      {coin.change24h}
                    </td>
                    <td className="py-3.5 px-4 text-right text-[#787b86] hidden sm:table-cell font-mono tabular-nums">
                      {coin.marketCap}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Right: Forex & Currencies Section */}
      <section data-purpose="forex-markets">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onViewAllForex}
            className="flex items-center gap-1.5 cursor-pointer group text-left focus:outline-none"
          >
            <h2
              className={`text-2xl font-bold tracking-tight transition-colors ${
                isDarkMode
                  ? 'text-white group-hover:text-[#2962ff]'
                  : 'text-[#131722] group-hover:text-[#2962ff]'
              }`}
            >
              Forex &amp; Currencies
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
            onClick={onViewAllForex}
            className="text-xs font-semibold text-[#2962ff] hover:underline cursor-pointer"
          >
            See all pairs →
          </button>
        </div>

        <div
          className={`border rounded-2xl overflow-hidden shadow-sm ${
            isDarkMode ? 'border-[#2a2e39] bg-[#131722]' : 'border-[#e0e3eb] bg-white'
          }`}
        >
          <table className="w-full text-left text-sm">
            <thead
              className={`text-xs font-medium border-b ${
                isDarkMode
                  ? 'bg-[#1e222d] text-[#787b86] border-[#2a2e39]'
                  : 'bg-[#f0f3fa]/60 text-[#787b86] border-[#e0e3eb]'
              }`}
            >
              <tr>
                <th className="py-3 px-4">Pair</th>
                <th className="py-3 px-4 text-right">Price</th>
                <th className="py-3 px-4 text-right">Chg %</th>
                <th className="py-3 px-4 text-right hidden sm:table-cell">52W Range</th>
              </tr>
            </thead>
            <tbody
              className={`divide-y ${
                isDarkMode ? 'divide-[#2a2e39]' : 'divide-[#e0e3eb]'
              }`}
            >
              {forexList.slice(0, 5).map((fx) => {
                const flash = priceTickFlash[fx.pair];
                return (
                  <tr
                    key={fx.pair}
                    onClick={() =>
                      onSelectAsset({
                        symbol: fx.pair.replace(' / ', ''),
                        name: fx.name,
                        price: fx.rawPrice,
                        changePercent: fx.rawChangePercent,
                        isPositive: fx.isPositive,
                      })
                    }
                    className={`transition cursor-pointer ${
                      isDarkMode ? 'hover:bg-[#1e222d]/60' : 'hover:bg-[#f0f3fa]/40'
                    } ${
                      flash === 'up'
                        ? 'animate-flash-up'
                        : flash === 'down'
                        ? 'animate-flash-down'
                        : ''
                    }`}
                  >
                    <td className="py-3.5 px-4">
                      <div className={`font-bold ${isDarkMode ? 'text-white' : 'text-[#131722]'}`}>
                        {fx.pair}
                      </div>
                      <div className="text-xs text-[#787b86]">{fx.name}</div>
                    </td>
                    <td
                      className={`py-3.5 px-4 text-right font-semibold font-mono tabular-nums ${
                        isDarkMode ? 'text-white' : 'text-[#131722]'
                      }`}
                    >
                      {fx.price}
                    </td>
                    <td
                      className={`py-3.5 px-4 text-right font-medium font-mono tabular-nums ${
                        fx.isPositive ? 'text-[#089981]' : 'text-[#f23645]'
                      }`}
                    >
                      {fx.changePercent}
                    </td>
                    <td className="py-3.5 px-4 text-right text-xs text-[#787b86] hidden sm:table-cell font-mono tabular-nums">
                      {fx.range52w}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
