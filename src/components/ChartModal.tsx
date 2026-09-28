import React, { useState, useMemo } from 'react';
import {
  X,
  Star,
  Activity,
  Maximize2,
  TrendingUp,
  TrendingDown,
  BarChart2,
  CandlestickChart as CandleIcon,
  SlidersHorizontal,
} from 'lucide-react';
import { ChartTimeframe, ChartType, CandleData } from '../types';
import { generateCandles } from '../data/marketData';

interface ChartModalProps {
  asset: {
    symbol: string;
    name: string;
    price: number;
    changePercent: number;
    isPositive: boolean;
  } | null;
  onClose: () => void;
  isDarkMode: boolean;
  isInWatchlist: boolean;
  onToggleWatchlist: (symbol: string) => void;
}

export const ChartModal: React.FC<ChartModalProps> = ({
  asset,
  onClose,
  isDarkMode,
  isInWatchlist,
  onToggleWatchlist,
}) => {
  const [timeframe, setTimeframe] = useState<ChartTimeframe>('1D');
  const [chartType, setChartType] = useState<ChartType>('area');
  const [showSMA, setShowSMA] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  if (!asset) return null;

  const candles: CandleData[] = useMemo(() => {
    return generateCandles(asset.price, timeframe, asset.isPositive);
  }, [asset.price, timeframe, asset.isPositive]);

  const activeCandle = hoveredIndex !== null && candles[hoveredIndex] ? candles[hoveredIndex] : candles[candles.length - 1];

  // Calculate coordinate mapping for SVG chart
  const minPrice = Math.min(...candles.map((c) => c.low));
  const maxPrice = Math.max(...candles.map((c) => c.high));
  const priceRange = maxPrice - minPrice || 1;
  const maxVolume = Math.max(...candles.map((c) => c.volume)) || 1;

  const width = 800;
  const height = 360;
  const paddingX = 40;
  const paddingY = 24;
  const chartHeight = height - paddingY * 2;
  const chartWidth = width - paddingX * 2;

  const candleWidth = Math.max(3, (chartWidth / candles.length) * 0.65);

  const getX = (index: number) => paddingX + (index / (candles.length - 1 || 1)) * chartWidth;
  const getY = (price: number) => paddingY + chartHeight - ((price - minPrice) / priceRange) * chartHeight;

  // Build SVG paths for Area Chart
  const areaPath = useMemo(() => {
    if (candles.length === 0) return '';
    const points = candles.map((c, i) => `${getX(i)},${getY(c.close)}`);
    return `M${points[0]} L${points.join(' ')} L${getX(candles.length - 1)},${height - paddingY} L${getX(0)},${height - paddingY} Z`;
  }, [candles]);

  const linePath = useMemo(() => {
    if (candles.length === 0) return '';
    const points = candles.map((c, i) => `${getX(i)},${getY(c.close)}`);
    return `M${points.join(' L')}`;
  }, [candles]);

  // Build Simple Moving Average (SMA 5) path
  const smaPoints = useMemo(() => {
    if (!showSMA || candles.length < 5) return '';
    const period = 5;
    const pts: string[] = [];
    for (let i = period - 1; i < candles.length; i++) {
      const slice = candles.slice(i - period + 1, i + 1);
      const avg = slice.reduce((acc, cur) => acc + cur.close, 0) / period;
      pts.push(`${getX(i)},${getY(avg)}`);
    }
    return `M${pts.join(' L')}`;
  }, [candles, showSMA]);

  const timeframes: ChartTimeframe[] = ['1D', '5D', '1M', '6M', '1Y', '5Y', 'ALL'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className={`w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl shadow-2xl border transition-all ${
          isDarkMode
            ? 'bg-[#131722] border-[#2a2e39] text-[#d1d4dc]'
            : 'bg-white border-[#e0e3eb] text-[#131722]'
        }`}
      >
        {/* Top Header Bar */}
        <div
          className={`flex items-center justify-between px-6 py-4 border-b ${
            isDarkMode ? 'border-[#2a2e39]' : 'border-[#e0e3eb]'
          }`}
        >
          <div className="flex items-center gap-3">
            <button
              onClick={() => onToggleWatchlist(asset.symbol)}
              title={isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
              className="p-1.5 rounded-lg hover:bg-gray-500/10 transition cursor-pointer"
            >
              <Star
                className={`w-5 h-5 ${
                  isInWatchlist ? 'fill-amber-400 text-amber-400' : 'text-gray-400'
                }`}
              />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className={`text-xl font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-black'}`}>
                  {asset.symbol}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-blue-500/10 text-blue-600 dark:text-blue-400">
                  REAL-TIME
                </span>
              </div>
              <div className="text-xs text-[#787b86] truncate max-w-xs sm:max-w-md">{asset.name}</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-500/10 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Live Price & HUD Bar */}
        <div className="px-6 pt-4 pb-2 flex flex-wrap items-baseline justify-between gap-4">
          <div className="flex items-baseline gap-3">
            <span
              className={`text-3xl sm:text-4xl font-extrabold font-mono tabular-nums tracking-tight ${
                isDarkMode ? 'text-white' : 'text-[#131722]'
              }`}
            >
              ${activeCandle ? activeCandle.close.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : asset.price}
            </span>
            <div
              className={`flex items-center gap-1 text-sm font-bold font-mono tabular-nums ${
                asset.isPositive ? 'text-[#089981]' : 'text-[#f23645]'
              }`}
            >
              {asset.isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              <span>{asset.isPositive ? `+${asset.changePercent}%` : `${asset.changePercent}%`}</span>
            </div>
          </div>

          {/* Candlestick HUD info */}
          {activeCandle && (
            <div className="flex items-center gap-3 text-xs font-mono text-[#787b86] tabular-nums">
              <span>Time: <strong className={isDarkMode ? 'text-white' : 'text-black'}>{activeCandle.time}</strong></span>
              <span>O: <strong className={isDarkMode ? 'text-white' : 'text-black'}>{activeCandle.open}</strong></span>
              <span>H: <strong className={isDarkMode ? 'text-white' : 'text-black'}>{activeCandle.high}</strong></span>
              <span>L: <strong className={isDarkMode ? 'text-white' : 'text-black'}>{activeCandle.low}</strong></span>
              <span>C: <strong className={isDarkMode ? 'text-white' : 'text-black'}>{activeCandle.close}</strong></span>
            </div>
          )}
        </div>

        {/* Controls Toolbar: Timeframes & Chart Type */}
        <div className="px-6 py-2 flex flex-wrap items-center justify-between gap-2 text-xs border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-1 bg-gray-100 dark:bg-[#1e222d] p-1 rounded-xl">
            {timeframes.map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-3 py-1 font-semibold rounded-lg transition cursor-pointer ${
                  timeframe === tf
                    ? isDarkMode
                      ? 'bg-[#2962ff] text-white shadow-xs'
                      : 'bg-white text-[#131722] shadow-xs'
                    : 'text-[#787b86] hover:text-black dark:hover:text-white'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setChartType(chartType === 'area' ? 'candles' : 'area')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-medium transition cursor-pointer ${
                isDarkMode ? 'border-[#2a2e39] hover:bg-[#1e222d]' : 'border-[#e0e3eb] hover:bg-gray-50'
              }`}
            >
              {chartType === 'area' ? (
                <>
                  <CandleIcon className="w-3.5 h-3.5" />
                  <span>Candles</span>
                </>
              ) : (
                <>
                  <BarChart2 className="w-3.5 h-3.5" />
                  <span>Area</span>
                </>
              )}
            </button>

            <button
              onClick={() => setShowSMA(!showSMA)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-medium transition cursor-pointer ${
                showSMA
                  ? 'border-amber-400/50 bg-amber-400/10 text-amber-500'
                  : isDarkMode
                  ? 'border-[#2a2e39] text-[#787b86]'
                  : 'border-[#e0e3eb] text-[#787b86]'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>SMA (5)</span>
            </button>
          </div>
        </div>

        {/* Interactive SVG Chart Container */}
        <div className="relative p-4 sm:p-6 select-none">
          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="w-full h-64 sm:h-80 overflow-visible"
            onMouseLeave={() => setHoveredIndex(null)}
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const mouseX = ((e.clientX - rect.left) / rect.width) * width;
              const index = Math.round(((mouseX - paddingX) / chartWidth) * (candles.length - 1));
              if (index >= 0 && index < candles.length) {
                setHoveredIndex(index);
              }
            }}
          >
            <defs>
              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor={asset.isPositive ? '#089981' : '#f23645'}
                  stopOpacity="0.35"
                />
                <stop
                  offset="100%"
                  stopColor={asset.isPositive ? '#089981' : '#f23645'}
                  stopOpacity="0.0"
                />
              </linearGradient>
            </defs>

            {/* Background Grid Lines */}
            {[0, 0.25, 0.5, 0.75, 1].map((pct, idx) => {
              const y = paddingY + chartHeight * pct;
              const priceLabel = (maxPrice - priceRange * pct).toFixed(2);
              return (
                <g key={idx}>
                  <line
                    x1={paddingX}
                    y1={y}
                    x2={width - paddingX}
                    y2={y}
                    stroke={isDarkMode ? '#2a2e39' : '#e0e3eb'}
                    strokeDasharray="4 4"
                    strokeWidth="1"
                  />
                  <text
                    x={width - paddingX + 6}
                    y={y + 4}
                    fill="#787b86"
                    fontSize="10"
                    fontFamily="monospace"
                  >
                    {priceLabel}
                  </text>
                </g>
              );
            })}

            {/* Volume Histogram bars along bottom */}
            {candles.map((c, i) => {
              const x = getX(i);
              const barHeight = (c.volume / maxVolume) * 50;
              const isUp = c.close >= c.open;
              return (
                <rect
                  key={`vol-${i}`}
                  x={x - candleWidth / 2}
                  y={height - paddingY - barHeight}
                  width={candleWidth}
                  height={barHeight}
                  fill={isUp ? '#089981' : '#f23645'}
                  opacity="0.25"
                />
              );
            })}

            {/* Area or Candlestick rendering */}
            {chartType === 'area' ? (
              <>
                <path d={areaPath} fill="url(#chartGradient)" />
                <path
                  d={linePath}
                  fill="none"
                  stroke={asset.isPositive ? '#089981' : '#f23645'}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </>
            ) : (
              /* Candlestick bars */
              candles.map((c, i) => {
                const x = getX(i);
                const isUp = c.close >= c.open;
                const candleColor = isUp ? '#089981' : '#f23645';
                const yHigh = getY(c.high);
                const yLow = getY(c.low);
                const yOpen = getY(c.open);
                const yClose = getY(c.close);
                const top = Math.min(yOpen, yClose);
                const bodyHeight = Math.max(2, Math.abs(yClose - yOpen));

                return (
                  <g key={`candle-${i}`}>
                    {/* Wick */}
                    <line
                      x1={x}
                      y1={yHigh}
                      x2={x}
                      y2={yLow}
                      stroke={candleColor}
                      strokeWidth="1.5"
                    />
                    {/* Body */}
                    <rect
                      x={x - candleWidth / 2}
                      y={top}
                      width={candleWidth}
                      height={bodyHeight}
                      fill={candleColor}
                      rx="1"
                    />
                  </g>
                );
              })
            )}

            {/* Moving Average Line */}
            {showSMA && smaPoints && (
              <path
                d={smaPoints}
                fill="none"
                stroke="#f59e0b"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            )}

            {/* Crosshair when hovering */}
            {hoveredIndex !== null && candles[hoveredIndex] && (
              <g>
                {/* Vertical cursor */}
                <line
                  x1={getX(hoveredIndex)}
                  y1={paddingY}
                  x2={getX(hoveredIndex)}
                  y2={height - paddingY}
                  stroke="#2962ff"
                  strokeDasharray="3 3"
                  strokeWidth="1.2"
                />
                {/* Horizontal cursor */}
                <line
                  x1={paddingX}
                  y1={getY(candles[hoveredIndex].close)}
                  x2={width - paddingX}
                  y2={getY(candles[hoveredIndex].close)}
                  stroke="#2962ff"
                  strokeDasharray="3 3"
                  strokeWidth="1.2"
                />
                {/* Active hover dot */}
                <circle
                  cx={getX(hoveredIndex)}
                  cy={getY(candles[hoveredIndex].close)}
                  r="4.5"
                  fill="#2962ff"
                  stroke="#ffffff"
                  strokeWidth="2"
                />
              </g>
            )}
          </svg>
        </div>

        {/* Fundamental Statistics Grid */}
        <div
          className={`p-6 border-t grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono tabular-nums ${
            isDarkMode ? 'border-[#2a2e39] bg-[#1e222d]/40' : 'border-[#e0e3eb] bg-[#f0f3fa]/50'
          }`}
        >
          <div>
            <span className="text-[#787b86] block text-[11px]">Day Low / High</span>
            <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>
              ${(asset.price * 0.985).toFixed(2)} - ${(asset.price * 1.018).toFixed(2)}
            </span>
          </div>
          <div>
            <span className="text-[#787b86] block text-[11px]">52-Week Range</span>
            <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>
              ${(asset.price * 0.72).toFixed(2)} - ${(asset.price * 1.15).toFixed(2)}
            </span>
          </div>
          <div>
            <span className="text-[#787b86] block text-[11px]">Market Volume</span>
            <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>
              {(Math.random() * 45 + 15).toFixed(2)}M shares
            </span>
          </div>
          <div>
            <span className="text-[#787b86] block text-[11px]">P/E Ratio</span>
            <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>
              {(Math.random() * 25 + 18).toFixed(1)}x
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
