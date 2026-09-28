import React, { useState } from 'react';
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Globe,
  Coins,
  Flame,
  Layers,
  BarChart3,
  Landmark,
  ShieldAlert,
  Percent,
} from 'lucide-react';
import { AssetCategory } from '../types';
import {
  WORLD_STOCKS,
  CRYPTO_LIST,
  FOREX_LIST,
  FUTURES_LIST,
  BOND_YIELDS,
  TOP_ETFS,
  ECONOMY_INDICATORS,
} from '../data/marketData';

interface CategoryDetailViewProps {
  category: AssetCategory;
  onBackToOverview: () => void;
  isDarkMode: boolean;
  onSelectAsset: (asset: {
    symbol: string;
    name: string;
    price: number;
    changePercent: number;
    isPositive: boolean;
  }) => void;
}

export const CategoryDetailView: React.FC<CategoryDetailViewProps> = ({
  category,
  onBackToOverview,
  isDarkMode,
  onSelectAsset,
}) => {
  const [activeSubTab, setActiveSubTab] = useState('All');

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Category Header with Back Button */}
      <div className="flex items-center justify-between border-b pb-5 border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToOverview}
            className={`p-2 rounded-xl transition cursor-pointer ${
              isDarkMode
                ? 'bg-[#1e222d] hover:bg-[#2a2e39] text-white'
                : 'bg-[#f0f3fa] hover:bg-[#e0e3eb] text-black'
            }`}
            title="Back to Overview"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className={`text-2xl sm:text-3xl font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-[#131722]'}`}>
              {category} Markets
            </h2>
            <p className="text-xs text-[#787b86]">
              Real-time quotes, technical breakdowns, key indicators and screeners
            </p>
          </div>
        </div>

        <button
          onClick={onBackToOverview}
          className="text-xs font-semibold text-[#2962ff] hover:underline cursor-pointer hidden sm:block"
        >
          ← Return to Overview
        </button>
      </div>

      {/* Dynamic Content based on Category */}
      {category === 'World stocks' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className={`p-4 rounded-2xl border ${isDarkMode ? 'border-[#2a2e39] bg-[#1e222d]' : 'border-[#e0e3eb] bg-white'}`}>
              <div className="text-xs text-[#787b86] font-semibold">EUROPE STOXX 50</div>
              <div className={`text-xl font-bold font-mono my-1 ${isDarkMode ? 'text-white' : 'text-black'}`}>4,892.40</div>
              <div className="text-xs text-[#089981] font-semibold">+0.62% (+30.12 pts)</div>
            </div>
            <div className={`p-4 rounded-2xl border ${isDarkMode ? 'border-[#2a2e39] bg-[#1e222d]' : 'border-[#e0e3eb] bg-white'}`}>
              <div className="text-xs text-[#787b86] font-semibold">NIKKEI 225 (JAPAN)</div>
              <div className={`text-xl font-bold font-mono my-1 ${isDarkMode ? 'text-white' : 'text-black'}`}>38,720.50</div>
              <div className="text-xs text-[#089981] font-semibold">+0.82% (+314.80 pts)</div>
            </div>
            <div className={`p-4 rounded-2xl border ${isDarkMode ? 'border-[#2a2e39] bg-[#1e222d]' : 'border-[#e0e3eb] bg-white'}`}>
              <div className="text-xs text-[#787b86] font-semibold">HANG SENG (HK)</div>
              <div className={`text-xl font-bold font-mono my-1 ${isDarkMode ? 'text-white' : 'text-black'}`}>19,426.35</div>
              <div className="text-xs text-[#f23645] font-semibold">-0.41% (-80.20 pts)</div>
            </div>
          </div>

          <div className={`border rounded-2xl overflow-hidden shadow-sm ${isDarkMode ? 'border-[#2a2e39] bg-[#131722]' : 'border-[#e0e3eb] bg-white'}`}>
            <div className="p-4 border-b border-gray-100 dark:border-gray-800 font-bold text-base">
              Global Large Cap Leaders
            </div>
            <table className="w-full text-left text-sm">
              <thead className={`text-xs ${isDarkMode ? 'bg-[#1e222d] text-[#787b86]' : 'bg-[#f0f3fa] text-[#787b86]'}`}>
                <tr>
                  <th className="py-3 px-4">Symbol</th>
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Exchange</th>
                  <th className="py-3 px-4 text-right">Price</th>
                  <th className="py-3 px-4 text-right">Change</th>
                  <th className="py-3 px-4 text-right hidden sm:table-cell">Market Cap</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-[#2a2e39]">
                {WORLD_STOCKS.map((stk) => (
                  <tr
                    key={stk.symbol}
                    onClick={() =>
                      onSelectAsset({
                        symbol: stk.symbol,
                        name: stk.name,
                        price: stk.price,
                        changePercent: stk.change,
                        isPositive: stk.change >= 0,
                      })
                    }
                    className="hover:bg-blue-500/5 transition cursor-pointer"
                  >
                    <td className="py-3.5 px-4 font-bold">{stk.symbol}</td>
                    <td className="py-3.5 px-4 text-[#787b86]">{stk.name}</td>
                    <td className="py-3.5 px-4 font-mono text-xs">{stk.exchange}</td>
                    <td className="py-3.5 px-4 text-right font-mono font-bold">${stk.price.toFixed(2)}</td>
                    <td className={`py-3.5 px-4 text-right font-mono font-semibold ${stk.change >= 0 ? 'text-[#089981]' : 'text-[#f23645]'}`}>
                      {stk.change >= 0 ? `+${stk.change}%` : `${stk.change}%`}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono text-[#787b86] hidden sm:table-cell">{stk.marketCap}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {category === 'Crypto' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className={`p-4 rounded-2xl border ${isDarkMode ? 'border-[#2a2e39] bg-[#1e222d]' : 'border-[#e0e3eb] bg-white'}`}>
              <div className="text-xs text-[#787b86] font-semibold">TOTAL CRYPTO MARKET CAP</div>
              <div className={`text-xl font-bold font-mono my-1 ${isDarkMode ? 'text-white' : 'text-black'}`}>$3.18 Trillion</div>
              <div className="text-xs text-[#089981] font-semibold">+2.84% in 24h</div>
            </div>
            <div className={`p-4 rounded-2xl border ${isDarkMode ? 'border-[#2a2e39] bg-[#1e222d]' : 'border-[#e0e3eb] bg-white'}`}>
              <div className="text-xs text-[#787b86] font-semibold">BITCOIN DOMINANCE</div>
              <div className={`text-xl font-bold font-mono my-1 ${isDarkMode ? 'text-white' : 'text-black'}`}>57.2%</div>
              <div className="text-xs text-[#787b86] font-semibold">ETH: 12.8% · Others: 30.0%</div>
            </div>
            <div className={`p-4 rounded-2xl border ${isDarkMode ? 'border-[#2a2e39] bg-[#1e222d]' : 'border-[#e0e3eb] bg-white'}`}>
              <div className="text-xs text-[#787b86] font-semibold">24H CRYPTO VOLUME</div>
              <div className={`text-xl font-bold font-mono my-1 ${isDarkMode ? 'text-white' : 'text-black'}`}>$118.4 Billion</div>
              <div className="text-xs text-[#089981] font-semibold">High liquidity</div>
            </div>
          </div>

          <div className={`border rounded-2xl overflow-hidden shadow-sm ${isDarkMode ? 'border-[#2a2e39] bg-[#131722]' : 'border-[#e0e3eb] bg-white'}`}>
            <table className="w-full text-left text-sm">
              <thead className={`text-xs ${isDarkMode ? 'bg-[#1e222d] text-[#787b86]' : 'bg-[#f0f3fa] text-[#787b86]'}`}>
                <tr>
                  <th className="py-3 px-4">Asset</th>
                  <th className="py-3 px-4 text-right">Price</th>
                  <th className="py-3 px-4 text-right">24h Chg</th>
                  <th className="py-3 px-4 text-right">Market Cap</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-[#2a2e39]">
                {CRYPTO_LIST.map((c) => (
                  <tr
                    key={c.symbol}
                    onClick={() =>
                      onSelectAsset({
                        symbol: c.ticker + 'USD',
                        name: c.name,
                        price: c.rawPrice,
                        changePercent: c.rawChangePercent,
                        isPositive: c.isPositive,
                      })
                    }
                    className="hover:bg-blue-500/5 transition cursor-pointer"
                  >
                    <td className="py-3.5 px-4 flex items-center gap-3">
                      <span
                        style={{ backgroundColor: c.iconBg }}
                        className="w-7 h-7 rounded-full text-white flex items-center justify-center text-xs font-bold shrink-0"
                      >
                        {c.iconSymbol}
                      </span>
                      <div>
                        <div className="font-bold">{c.name}</div>
                        <div className="text-xs text-[#787b86]">{c.ticker}</div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono font-bold">${c.price}</td>
                    <td className={`py-3.5 px-4 text-right font-mono font-semibold ${c.isPositive ? 'text-[#089981]' : 'text-[#f23645]'}`}>
                      {c.change24h}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono text-[#787b86]">{c.marketCap}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {category === 'Futures' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {FUTURES_LIST.map((f) => (
              <div
                key={f.code}
                onClick={() =>
                  onSelectAsset({
                    symbol: f.code,
                    name: f.symbol,
                    price: f.rawPrice,
                    changePercent: f.rawChangePercent,
                    isPositive: f.isPositive,
                  })
                }
                className={`p-4 border rounded-2xl hover:border-[#2962ff] transition hover-lift cursor-pointer ${
                  isDarkMode ? 'border-[#2a2e39] bg-[#131722]' : 'border-[#e0e3eb] bg-white'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#787b86]">{f.symbol}</span>
                  <span className="text-xs font-bold font-mono px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800">
                    {f.code}
                  </span>
                </div>
                <div className="text-xl font-bold font-mono">{f.price}</div>
                <div className={`text-xs font-semibold mt-1 font-mono ${f.isPositive ? 'text-[#089981]' : 'text-[#f23645]'}`}>
                  {f.changePercent}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {category === 'Forex' && (
        <div className="space-y-6">
          <div className={`border rounded-2xl overflow-hidden shadow-sm ${isDarkMode ? 'border-[#2a2e39] bg-[#131722]' : 'border-[#e0e3eb] bg-white'}`}>
            <table className="w-full text-left text-sm">
              <thead className={`text-xs ${isDarkMode ? 'bg-[#1e222d] text-[#787b86]' : 'bg-[#f0f3fa] text-[#787b86]'}`}>
                <tr>
                  <th className="py-3 px-4">Currency Pair</th>
                  <th className="py-3 px-4 text-right">Bid / Rate</th>
                  <th className="py-3 px-4 text-right">Daily Change %</th>
                  <th className="py-3 px-4 text-right">52-Week Range</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-[#2a2e39]">
                {FOREX_LIST.map((fx) => (
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
                    className="hover:bg-blue-500/5 transition cursor-pointer"
                  >
                    <td className="py-3.5 px-4">
                      <div className="font-bold">{fx.pair}</div>
                      <div className="text-xs text-[#787b86]">{fx.name}</div>
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono font-bold">{fx.price}</td>
                    <td className={`py-3.5 px-4 text-right font-mono font-semibold ${fx.isPositive ? 'text-[#089981]' : 'text-[#f23645]'}`}>
                      {fx.changePercent}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono text-xs text-[#787b86]">{fx.range52w}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {category === 'Government bonds' && (
        <div className="space-y-6">
          <div className={`p-5 rounded-2xl border ${isDarkMode ? 'border-[#2a2e39] bg-[#1e222d]' : 'border-[#e0e3eb] bg-white'}`}>
            <h3 className="font-bold text-base mb-2">Sovereign Debt Benchmark Yields</h3>
            <p className="text-xs text-[#787b86] mb-4">
              Government bond yields define the risk-free rate of return for financial asset valuation.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {BOND_YIELDS.map((bond) => (
                <div
                  key={bond.maturity}
                  onClick={() =>
                    onSelectAsset({
                      symbol: bond.maturity.replace(' ', ''),
                      name: bond.maturity,
                      price: parseFloat(bond.yieldVal.replace('%', '')),
                      changePercent: parseFloat(bond.change),
                      isPositive: bond.isPositive,
                    })
                  }
                  className={`p-4 rounded-xl border transition cursor-pointer hover:border-[#2962ff] ${
                    isDarkMode ? 'border-[#2a2e39] bg-[#131722]' : 'border-[#e0e3eb] bg-[#f0f3fa]/50'
                  }`}
                >
                  <div className="text-xs text-[#787b86]">{bond.maturity}</div>
                  <div className="text-2xl font-bold font-mono my-1">{bond.yieldVal}</div>
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className={bond.isPositive ? 'text-[#089981]' : 'text-[#f23645]'}>{bond.change} bps</span>
                    <span className="text-[#787b86]">{bond.spread}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {category === 'Corporate bonds' && (
        <div className="space-y-6">
          <div className={`p-5 rounded-2xl border ${isDarkMode ? 'border-[#2a2e39] bg-[#1e222d]' : 'border-[#e0e3eb] bg-white'}`}>
            <h3 className="font-bold text-base mb-2">Corporate Credit Spreads &amp; Yields</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
              <div className="p-4 rounded-xl bg-gray-50 dark:bg-[#131722] border border-gray-200 dark:border-gray-800">
                <div className="text-xs text-[#787b86]">US Investment Grade (LQD)</div>
                <div className="text-xl font-bold font-mono my-1">5.32% Yield</div>
                <div className="text-xs text-[#089981] font-semibold">Spread: +94 bps over Treasury</div>
              </div>
              <div className="p-4 rounded-xl bg-gray-50 dark:bg-[#131722] border border-gray-200 dark:border-gray-800">
                <div className="text-xs text-[#787b86]">US High Yield / Junk (HYG)</div>
                <div className="text-xl font-bold font-mono my-1">7.18% Yield</div>
                <div className="text-xs text-[#089981] font-semibold">Spread: +280 bps over Treasury</div>
              </div>
              <div className="p-4 rounded-xl bg-gray-50 dark:bg-[#131722] border border-gray-200 dark:border-gray-800">
                <div className="text-xs text-[#787b86]">European Investment Grade</div>
                <div className="text-xl font-bold font-mono my-1">3.64% Yield</div>
                <div className="text-xs text-[#787b86] font-semibold">ECB Corporate Bond Index</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {category === 'ETFs' && (
        <div className="space-y-6">
          <div className={`border rounded-2xl overflow-hidden shadow-sm ${isDarkMode ? 'border-[#2a2e39] bg-[#131722]' : 'border-[#e0e3eb] bg-white'}`}>
            <table className="w-full text-left text-sm">
              <thead className={`text-xs ${isDarkMode ? 'bg-[#1e222d] text-[#787b86]' : 'bg-[#f0f3fa] text-[#787b86]'}`}>
                <tr>
                  <th className="py-3 px-4">Symbol</th>
                  <th className="py-3 px-4">ETF Name</th>
                  <th className="py-3 px-4">Issuer</th>
                  <th className="py-3 px-4 text-right">Price</th>
                  <th className="py-3 px-4 text-right">Day Chg</th>
                  <th className="py-3 px-4 text-right hidden sm:table-cell">AUM</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-[#2a2e39]">
                {TOP_ETFS.map((etf) => (
                  <tr
                    key={etf.symbol}
                    onClick={() =>
                      onSelectAsset({
                        symbol: etf.symbol,
                        name: etf.name,
                        price: parseFloat(etf.price),
                        changePercent: parseFloat(etf.change.replace('%', '')),
                        isPositive: etf.change.startsWith('+'),
                      })
                    }
                    className="hover:bg-blue-500/5 transition cursor-pointer"
                  >
                    <td className="py-3.5 px-4 font-bold font-mono">{etf.symbol}</td>
                    <td className="py-3.5 px-4 text-[#787b86]">{etf.name}</td>
                    <td className="py-3.5 px-4 text-xs">{etf.issuer}</td>
                    <td className="py-3.5 px-4 text-right font-mono font-bold">${etf.price}</td>
                    <td className="py-3.5 px-4 text-right font-mono font-semibold text-[#089981]">{etf.change}</td>
                    <td className="py-3.5 px-4 text-right font-mono text-[#787b86] hidden sm:table-cell">{etf.aum}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {category === 'Economy' && (
        <div className="space-y-6">
          <div className={`p-5 rounded-2xl border ${isDarkMode ? 'border-[#2a2e39] bg-[#1e222d]' : 'border-[#e0e3eb] bg-white'}`}>
            <h3 className="font-bold text-base mb-2">Global Macroeconomic Radar</h3>
            <p className="text-xs text-[#787b86] mb-4">
              Interest rates, inflation expectations, and employment metrics tracked by institutional traders.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {ECONOMY_INDICATORS.map((econ) => (
                <div
                  key={econ.indicator}
                  className={`p-4 rounded-xl border ${
                    isDarkMode ? 'border-[#2a2e39] bg-[#131722]' : 'border-[#e0e3eb] bg-[#f0f3fa]/50'
                  }`}
                >
                  <div className="text-xs font-semibold text-[#2962ff] uppercase tracking-wider">{econ.country}</div>
                  <div className="font-bold text-sm my-1">{econ.indicator}</div>
                  <div className="text-xl font-bold font-mono">{econ.value}</div>
                  <div className="flex items-center justify-between text-xs text-[#787b86] mt-2">
                    <span>{econ.nextRelease}</span>
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">{econ.trend}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
