import {
  IndexItem,
  SecondaryIndex,
  StockMover,
  CryptoItem,
  ForexItem,
  CommodityItem,
  MarketAsset,
  CandleData,
  ChartTimeframe,
} from '../types';

export const PRIMARY_INDICES: IndexItem[] = [
  {
    id: 'sp500',
    name: 'S&P 500',
    badge: '500',
    badgeBg: '#dc2626',
    price: '5,969.34',
    change: '+0.38%',
    isPositive: true,
    sparkline: [32, 28, 30, 24, 26, 22, 18, 14, 16, 12, 10, 6],
    rawPrice: 5969.34,
    rawChange: 0.38,
  },
  {
    id: 'nasdaq100',
    name: 'Nasdaq 100',
    badge: '100',
    badgeBg: '#0284c7',
    price: '21,114.75',
    change: '+0.54%',
    isPositive: true,
    sparkline: [28, 25, 29, 22, 19, 15, 17, 12, 9, 7, 4],
    rawPrice: 21114.75,
    rawChange: 0.54,
  },
  {
    id: 'dow30',
    name: 'Dow 30',
    badge: '30',
    badgeBg: '#0ea5e9',
    price: '43,444.99',
    change: '-0.12%',
    isPositive: false,
    sparkline: [10, 8, 12, 16, 22, 24, 21, 28, 30, 34],
    rawPrice: 43444.99,
    rawChange: -0.12,
  },
];

export const SECONDARY_INDICES: SecondaryIndex[] = [
  {
    name: 'US 2000',
    symbol: 'RUT',
    price: '2,284.10',
    change: '+1.15%',
    isPositive: true,
    rawPrice: 2284.1,
  },
  {
    name: 'Nasdaq Comp',
    symbol: 'IXIC',
    price: '19,281.40',
    change: '+0.68%',
    isPositive: true,
    rawPrice: 19281.4,
  },
  {
    name: 'NYSE Comp',
    symbol: 'NYA',
    price: '19,654.80',
    change: '-0.05%',
    isPositive: false,
    rawPrice: 19654.8,
  },
  {
    name: 'Japan 225',
    symbol: 'N225',
    price: '38,720.50',
    change: '+0.82%',
    isPositive: true,
    rawPrice: 38720.5,
  },
  {
    name: 'DAX Index',
    symbol: 'GDAXI',
    price: '19,442.20',
    change: '+0.24%',
    isPositive: true,
    rawPrice: 19442.2,
  },
  {
    name: 'FTSE 100',
    symbol: 'FTSE',
    price: '8,276.12',
    change: '-0.18%',
    isPositive: false,
    rawPrice: 8276.12,
  },
];

export const QUICK_TICKERS = [
  { symbol: 'NVDA', name: 'NVIDIA', ticker: 'NVIDIA (NVDA)' },
  { symbol: 'AAPL', name: 'Apple', ticker: 'Apple (AAPL)' },
  { symbol: 'AMZN', name: 'Amazon', ticker: 'Amazon (AMZN)' },
  { symbol: 'GOOGL', name: 'Alphabet', ticker: 'Alphabet (GOOGL)' },
  { symbol: 'TSLA', name: 'Tesla', ticker: 'Tesla (TSLA)' },
  { symbol: 'MSFT', name: 'Microsoft', ticker: 'Microsoft (MSFT)' },
];

export const HIGHEST_VOLUME_STOCKS: StockMover[] = [
  {
    symbol: 'MU',
    name: 'Micron Technology, Inc.',
    price: '102.40 USD',
    change: '+4.85%',
    isPositive: true,
    currency: 'USD',
    rawPrice: 102.4,
    rawChangePercent: 4.85,
  },
  {
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    price: '148.88 USD',
    change: '+2.68%',
    isPositive: true,
    currency: 'USD',
    rawPrice: 148.88,
    rawChangePercent: 2.68,
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    price: '422.54 USD',
    change: '-0.42%',
    isPositive: false,
    currency: 'USD',
    rawPrice: 422.54,
    rawChangePercent: -0.42,
  },
  {
    symbol: 'TSLA',
    name: 'Tesla, Inc.',
    price: '342.10 USD',
    change: '+3.90%',
    isPositive: true,
    currency: 'USD',
    rawPrice: 342.1,
    rawChangePercent: 3.9,
  },
];

export const STOCK_GAINERS: StockMover[] = [
  {
    symbol: 'AXG',
    name: 'Solowin Holdings',
    price: '28.40 USD',
    change: '+48.22%',
    isPositive: true,
    currency: 'USD',
    rawPrice: 28.4,
    rawChangePercent: 48.22,
  },
  {
    symbol: 'MSGY',
    name: 'Masonglory Limited',
    price: '4.92 USD',
    change: '+35.16%',
    isPositive: true,
    currency: 'USD',
    rawPrice: 4.92,
    rawChangePercent: 35.16,
  },
  {
    symbol: 'ALAR',
    name: 'Alarum Tech Ltd',
    price: '16.85 USD',
    change: '+22.10%',
    isPositive: true,
    currency: 'USD',
    rawPrice: 16.85,
    rawChangePercent: 22.1,
  },
  {
    symbol: 'WYY',
    name: 'WidePoint Corp',
    price: '5.12 USD',
    change: '+18.45%',
    isPositive: true,
    currency: 'USD',
    rawPrice: 5.12,
    rawChangePercent: 18.45,
  },
];

export const STOCK_LOSERS: StockMover[] = [
  {
    symbol: 'TDIC',
    name: 'Dreamland Limited',
    price: '2.14 USD',
    change: '-19.55%',
    isPositive: false,
    currency: 'USD',
    rawPrice: 2.14,
    rawChangePercent: -19.55,
  },
  {
    symbol: 'IFBD',
    name: 'Infobird Co., Ltd',
    price: '1.08 USD',
    change: '-14.28%',
    isPositive: false,
    currency: 'USD',
    rawPrice: 1.08,
    rawChangePercent: -14.28,
  },
  {
    symbol: 'IPEX',
    name: 'Inflection Point Acq',
    price: '8.60 USD',
    change: '-11.34%',
    isPositive: false,
    currency: 'USD',
    rawPrice: 8.6,
    rawChangePercent: -11.34,
  },
  {
    symbol: 'C371',
    name: 'Travelers Group Note',
    price: '98.15 USD',
    change: '-7.90%',
    isPositive: false,
    currency: 'USD',
    rawPrice: 98.15,
    rawChangePercent: -7.9,
  },
];

export const CRYPTO_LIST: CryptoItem[] = [
  {
    symbol: 'BTC',
    name: 'Bitcoin',
    ticker: 'BTC',
    price: '91,420.00',
    change24h: '+3.12%',
    isPositive: true,
    marketCap: '1.67 TUSD',
    iconBg: '#f59e0b',
    iconSymbol: '₿',
    rawPrice: 91420.0,
    rawChangePercent: 3.12,
    sparkline: [88400, 89100, 89900, 90400, 91420],
  },
  {
    symbol: 'ETH',
    name: 'Ethereum',
    ticker: 'ETH',
    price: '3,340.50',
    change24h: '+1.85%',
    isPositive: true,
    marketCap: '322.7 BUSD',
    iconBg: '#6366f1',
    iconSymbol: 'Ξ',
    rawPrice: 3340.5,
    rawChangePercent: 1.85,
    sparkline: [3240, 3280, 3310, 3325, 3340.5],
  },
  {
    symbol: 'USDT',
    name: 'Tether USDt',
    ticker: 'USDT',
    price: '1.00',
    change24h: '0.00%',
    isPositive: true,
    marketCap: '183.7 BUSD',
    iconBg: '#14b8a6',
    iconSymbol: '₮',
    rawPrice: 1.0,
    rawChangePercent: 0.0,
    sparkline: [1.0, 1.0, 1.0001, 0.9999, 1.0],
  },
  {
    symbol: 'BNB',
    name: 'BNB',
    ticker: 'BNB',
    price: '645.10',
    change24h: '-0.48%',
    isPositive: false,
    marketCap: '101.2 BUSD',
    iconBg: '#eab308',
    iconSymbol: 'B',
    rawPrice: 645.1,
    rawChangePercent: -0.48,
    sparkline: [652, 649, 648, 646, 645.1],
  },
  {
    symbol: 'XRP',
    name: 'XRP',
    ticker: 'XRP',
    price: '1.42',
    change24h: '+8.20%',
    isPositive: true,
    marketCap: '92.6 BUSD',
    iconBg: '#2563eb',
    iconSymbol: '✕',
    rawPrice: 1.42,
    rawChangePercent: 8.2,
    sparkline: [1.28, 1.31, 1.35, 1.39, 1.42],
  },
  {
    symbol: 'SOL',
    name: 'Solana',
    ticker: 'SOL',
    price: '218.40',
    change24h: '+4.82%',
    isPositive: true,
    marketCap: '102.5 BUSD',
    iconBg: '#9333ea',
    iconSymbol: 'S',
    rawPrice: 218.4,
    rawChangePercent: 4.82,
    sparkline: [205, 209, 212, 215, 218.4],
  },
  {
    symbol: 'ADA',
    name: 'Cardano',
    ticker: 'ADA',
    price: '0.88',
    change24h: '+2.15%',
    isPositive: true,
    marketCap: '31.4 BUSD',
    iconBg: '#0284c7',
    iconSymbol: '₳',
    rawPrice: 0.88,
    rawChangePercent: 2.15,
    sparkline: [0.84, 0.85, 0.86, 0.87, 0.88],
  },
];

export const FOREX_LIST: ForexItem[] = [
  {
    pair: 'EUR / USD',
    name: 'Euro / US Dollar',
    price: '1.0482',
    changePercent: '-0.21%',
    isPositive: false,
    range52w: '1.044 - 1.121',
    rawPrice: 1.0482,
    rawChangePercent: -0.21,
  },
  {
    pair: 'USD / JPY',
    name: 'US Dollar / Japanese Yen',
    price: '154.68',
    changePercent: '+0.34%',
    isPositive: true,
    range52w: '140.2 - 161.9',
    rawPrice: 154.68,
    rawChangePercent: 0.34,
  },
  {
    pair: 'GBP / USD',
    name: 'British Pound / US Dollar',
    price: '1.2615',
    changePercent: '-0.14%',
    isPositive: false,
    range52w: '1.230 - 1.343',
    rawPrice: 1.2615,
    rawChangePercent: -0.14,
  },
  {
    pair: 'AUD / USD',
    name: 'Australian Dollar / US Dollar',
    price: '0.6512',
    changePercent: '+0.22%',
    isPositive: true,
    range52w: '0.634 - 0.694',
    rawPrice: 0.6512,
    rawChangePercent: 0.22,
  },
  {
    pair: 'USD / CAD',
    name: 'US Dollar / Canadian Dollar',
    price: '1.3980',
    changePercent: '-0.08%',
    isPositive: false,
    range52w: '1.317 - 1.410',
    rawPrice: 1.398,
    rawChangePercent: -0.08,
  },
  {
    pair: 'USD / CHF',
    name: 'US Dollar / Swiss Franc',
    price: '0.8845',
    changePercent: '+0.18%',
    isPositive: true,
    range52w: '0.837 - 0.922',
    rawPrice: 0.8845,
    rawChangePercent: 0.18,
  },
];

export const FUTURES_LIST: CommodityItem[] = [
  {
    symbol: 'Gold',
    code: 'GC1!',
    price: '2,668.40',
    changePercent: '+0.74% (USD/oz)',
    unit: 'USD/oz',
    isPositive: true,
    badgeBg: '#fef3c7',
    badgeText: '#b45309',
    rawPrice: 2668.4,
    rawChangePercent: 0.74,
  },
  {
    symbol: 'Crude Oil',
    code: 'CL1!',
    price: '69.24',
    changePercent: '-1.22% (USD/bbl)',
    unit: 'USD/bbl',
    isPositive: false,
    badgeBg: '#f5f5f4',
    badgeText: '#44403c',
    rawPrice: 69.24,
    rawChangePercent: -1.22,
  },
  {
    symbol: 'Silver',
    code: 'SI1!',
    price: '31.45',
    changePercent: '+1.14% (USD/oz)',
    unit: 'USD/oz',
    isPositive: true,
    badgeBg: '#f1f5f9',
    badgeText: '#334155',
    rawPrice: 31.45,
    rawChangePercent: 1.14,
  },
  {
    symbol: 'Natural Gas',
    code: 'NG1!',
    price: '3.242',
    changePercent: '+4.20% (USD/MMBtu)',
    unit: 'USD/MMBtu',
    isPositive: true,
    badgeBg: '#eff6ff',
    badgeText: '#1d4ed8',
    rawPrice: 3.242,
    rawChangePercent: 4.2,
  },
  {
    symbol: 'Copper',
    code: 'HG1!',
    price: '4.15',
    changePercent: '+0.85% (USD/lb)',
    unit: 'USD/lb',
    isPositive: true,
    badgeBg: '#ffedd5',
    badgeText: '#c2410c',
    rawPrice: 4.15,
    rawChangePercent: 0.85,
  },
  {
    symbol: 'Brent Crude',
    code: 'BRN1!',
    price: '73.65',
    changePercent: '-1.10% (USD/bbl)',
    unit: 'USD/bbl',
    isPositive: false,
    badgeBg: '#f5f5f4',
    badgeText: '#44403c',
    rawPrice: 73.65,
    rawChangePercent: -1.1,
  },
];

export const WORLD_STOCKS = [
  { symbol: 'TSM', name: 'Taiwan Semiconductor', exchange: 'NYSE', price: 189.2, change: 3.42, marketCap: '981 B' },
  { symbol: 'ASML', name: 'ASML Holding N.V.', exchange: 'NASDAQ', price: 742.8, change: 1.84, marketCap: '298 B' },
  { symbol: 'SAP', name: 'SAP SE', exchange: 'XETRA', price: 216.5, change: 0.95, marketCap: '254 B' },
  { symbol: '7203', name: 'Toyota Motor Corp', exchange: 'TSE', price: 2715.0, change: -0.45, marketCap: '286 B' },
  { symbol: 'BABA', name: 'Alibaba Group', exchange: 'NYSE', price: 87.3, change: -1.60, marketCap: '206 B' },
  { symbol: 'AZN', name: 'AstraZeneca PLC', exchange: 'LSE', price: 10420.0, change: 1.15, marketCap: '208 B' },
  { symbol: 'MC', name: 'LVMH Moët Hennessy', exchange: 'EURONEXT', price: 614.0, change: 0.35, marketCap: '310 B' },
  { symbol: 'NOVN', name: 'Novartis AG', exchange: 'SIX', price: 92.4, change: 0.22, marketCap: '212 B' },
];

export const BOND_YIELDS = [
  { maturity: 'US 10Y Yield', yieldVal: '4.42%', change: '+0.03', spread: 'Benchmark', isPositive: true },
  { maturity: 'US 2Y Yield', yieldVal: '4.24%', change: '+0.01', spread: '-18 bps (Inverted)', isPositive: true },
  { maturity: 'US 30Y Yield', yieldVal: '4.61%', change: '+0.04', spread: '+19 bps', isPositive: true },
  { maturity: 'Germany 10Y (Bund)', yieldVal: '2.28%', change: '-0.02', spread: 'EU Benchmark', isPositive: false },
  { maturity: 'UK 10Y (Gilt)', yieldVal: '4.35%', change: '+0.02', spread: 'UK Benchmark', isPositive: true },
  { maturity: 'Japan 10Y (JGB)', yieldVal: '1.08%', change: '+0.01', spread: 'BoJ Target', isPositive: true },
];

export const TOP_ETFS = [
  { symbol: 'SPY', name: 'SPDR S&P 500 ETF Trust', price: '596.20', change: '+0.36%', aum: '$612 B', issuer: 'State Street' },
  { symbol: 'QQQ', name: 'Invesco QQQ Trust Series 1', price: '512.45', change: '+0.58%', aum: '$308 B', issuer: 'Invesco' },
  { symbol: 'VOO', name: 'Vanguard S&P 500 ETF', price: '547.10', change: '+0.37%', aum: '$540 B', issuer: 'Vanguard' },
  { symbol: 'IWM', name: 'iShares Russell 2000 ETF', price: '227.80', change: '+1.12%', aum: '$78 B', issuer: 'BlackRock' },
  { symbol: 'SMH', name: 'VanEck Semiconductor ETF', price: '264.30', change: '+2.45%', aum: '$24 B', issuer: 'VanEck' },
  { symbol: 'GLD', name: 'SPDR Gold Shares', price: '246.50', change: '+0.72%', aum: '$75 B', issuer: 'World Gold Trust' },
];

export const ECONOMY_INDICATORS = [
  { country: 'United States', indicator: 'Fed Funds Rate', value: '4.50% - 4.75%', nextRelease: 'Next FOMC in 24d', trend: 'Easing' },
  { country: 'United States', indicator: 'CPI Inflation (YoY)', value: '2.6%', nextRelease: 'Next release: Oct 12', trend: 'Stable' },
  { country: 'Euro Area', indicator: 'ECB Deposit Facility', value: '3.00%', nextRelease: 'Next ECB in 18d', trend: 'Cutting' },
  { country: 'United States', indicator: 'Unemployment Rate', value: '4.1%', nextRelease: 'First Friday', trend: 'Low' },
  { country: 'Japan', indicator: 'BoJ Policy Rate', value: '0.25%', nextRelease: 'Next BoJ in 30d', trend: 'Tightening' },
  { country: 'United Kingdom', indicator: 'BoE Official Bank Rate', value: '4.75%', nextRelease: 'Next MPC in 14d', trend: 'Neutral' },
];

// Helper to generate dynamic mock candle data for charts based on base price and timeframe
export function generateCandles(basePrice: number, timeframe: ChartTimeframe, isPositive: boolean): CandleData[] {
  const count = timeframe === '1D' ? 24 : timeframe === '5D' ? 30 : timeframe === '1M' ? 30 : 40;
  const candles: CandleData[] = [];
  let current = isPositive ? basePrice * 0.96 : basePrice * 1.04;
  const volatility = basePrice * 0.008;

  const now = new Date();

  for (let i = 0; i < count; i++) {
    const drift = (basePrice - current) / (count - i);
    const step = (Math.random() - 0.48) * volatility + drift * 0.6;
    const open = current;
    const close = +(open + step).toFixed(2);
    const high = +(Math.max(open, close) + Math.random() * volatility * 0.7).toFixed(2);
    const low = +(Math.min(open, close) - Math.random() * volatility * 0.7).toFixed(2);
    const volume = Math.floor(Math.random() * 500000 + 100000);

    let timeLabel = '';
    if (timeframe === '1D') {
      timeLabel = `${String(9 + Math.floor((i / count) * 7)).padStart(2, '0')}:${String((i * 15) % 60).padStart(2, '0')}`;
    } else {
      const d = new Date(now.getTime() - (count - i) * 86400000 * (timeframe === 'ALL' ? 30 : 1));
      timeLabel = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }

    candles.push({
      time: timeLabel,
      open,
      high,
      low,
      close,
      volume,
    });
    current = close;
  }

  // Ensure final candle matches basePrice closely
  if (candles.length > 0) {
    candles[candles.length - 1].close = basePrice;
  }

  return candles;
}

// Master search catalogue for all market assets
export const ALL_SEARCHABLE_ASSETS: {
  symbol: string;
  name: string;
  type: string;
  price: string;
  change: string;
  isPositive: boolean;
  category: string;
}[] = [
  { symbol: 'SPX', name: 'S&P 500 Index', type: 'Index', price: '5,969.34', change: '+0.38%', isPositive: true, category: 'US stocks' },
  { symbol: 'NDX', name: 'Nasdaq 100 Index', type: 'Index', price: '21,114.75', change: '+0.54%', isPositive: true, category: 'US stocks' },
  { symbol: 'DJI', name: 'Dow Jones Industrial 30', type: 'Index', price: '43,444.99', change: '-0.12%', isPositive: false, category: 'US stocks' },
  { symbol: 'NVDA', name: 'NVIDIA Corporation', type: 'Stock', price: '148.88 USD', change: '+2.68%', isPositive: true, category: 'US stocks' },
  { symbol: 'AAPL', name: 'Apple Inc.', type: 'Stock', price: '232.40 USD', change: '+0.75%', isPositive: true, category: 'US stocks' },
  { symbol: 'MSFT', name: 'Microsoft Corporation', type: 'Stock', price: '422.54 USD', change: '-0.42%', isPositive: false, category: 'US stocks' },
  { symbol: 'TSLA', name: 'Tesla, Inc.', type: 'Stock', price: '342.10 USD', change: '+3.90%', isPositive: true, category: 'US stocks' },
  { symbol: 'AMZN', name: 'Amazon.com, Inc.', type: 'Stock', price: '210.15 USD', change: '+1.20%', isPositive: true, category: 'US stocks' },
  { symbol: 'GOOGL', name: 'Alphabet Inc. Class A', type: 'Stock', price: '182.60 USD', change: '+0.45%', isPositive: true, category: 'US stocks' },
  { symbol: 'MU', name: 'Micron Technology, Inc.', type: 'Stock', price: '102.40 USD', change: '+4.85%', isPositive: true, category: 'US stocks' },
  { symbol: 'AXG', name: 'Solowin Holdings', type: 'Stock', price: '28.40 USD', change: '+48.22%', isPositive: true, category: 'US stocks' },
  { symbol: 'MSGY', name: 'Masonglory Limited', type: 'Stock', price: '4.92 USD', change: '+35.16%', isPositive: true, category: 'US stocks' },
  { symbol: 'BTCUSD', name: 'Bitcoin / US Dollar', type: 'Crypto', price: '91,420.00', change: '+3.12%', isPositive: true, category: 'Crypto' },
  { symbol: 'ETHUSD', name: 'Ethereum / US Dollar', type: 'Crypto', price: '3,340.50', change: '+1.85%', isPositive: true, category: 'Crypto' },
  { symbol: 'SOLUSD', name: 'Solana / US Dollar', type: 'Crypto', price: '218.40', change: '+4.82%', isPositive: true, category: 'Crypto' },
  { symbol: 'EURUSD', name: 'Euro / US Dollar', type: 'Forex', price: '1.0482', change: '-0.21%', isPositive: false, category: 'Forex' },
  { symbol: 'USDJPY', name: 'US Dollar / Japanese Yen', type: 'Forex', price: '154.68', change: '+0.34%', isPositive: true, category: 'Forex' },
  { symbol: 'GBPUSD', name: 'British Pound / US Dollar', type: 'Forex', price: '1.2615', change: '-0.14%', isPositive: false, category: 'Forex' },
  { symbol: 'GC1!', name: 'Gold Futures', type: 'Futures', price: '2,668.40', change: '+0.74%', isPositive: true, category: 'Futures' },
  { symbol: 'CL1!', name: 'Crude Oil WTI', type: 'Futures', price: '69.24', change: '-1.22%', isPositive: false, category: 'Futures' },
  { symbol: 'SI1!', name: 'Silver Futures', type: 'Futures', price: '31.45', change: '+1.14%', isPositive: true, category: 'Futures' },
  { symbol: 'NG1!', name: 'Natural Gas Futures', type: 'Futures', price: '3.242', change: '+4.20%', isPositive: true, category: 'Futures' },
  { symbol: 'SPY', name: 'SPDR S&P 500 ETF', type: 'ETF', price: '596.20', change: '+0.36%', isPositive: true, category: 'ETFs' },
  { symbol: 'QQQ', name: 'Invesco QQQ Trust', type: 'ETF', price: '512.45', change: '+0.58%', isPositive: true, category: 'ETFs' },
];
