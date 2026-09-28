export type AssetCategory =
  | 'US stocks'
  | 'World stocks'
  | 'Crypto'
  | 'Futures'
  | 'Forex'
  | 'Government bonds'
  | 'Corporate bonds'
  | 'ETFs'
  | 'Economy';

export interface CandleData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface MarketAsset {
  id: string;
  symbol: string;
  name: string;
  category: AssetCategory;
  price: number;
  change: number;
  changePercent: number;
  currency?: string;
  unit?: string;
  marketCap?: string;
  volume24h?: string;
  range52w?: string;
  low52w?: number;
  high52w?: number;
  codeBadge?: string;
  badgeColor?: string;
  sparkline: number[];
  description?: string;
  exchange?: string;
  peRatio?: number;
  divYield?: string;
  beta?: number;
  candles?: CandleData[];
}

export interface IndexItem {
  id: string;
  name: string;
  badge: string;
  badgeBg: string;
  price: string;
  change: string;
  isPositive: boolean;
  sparkline: number[];
  rawPrice: number;
  rawChange: number;
}

export interface SecondaryIndex {
  name: string;
  price: string;
  change: string;
  isPositive: boolean;
  symbol: string;
  rawPrice: number;
}

export interface StockMover {
  symbol: string;
  name: string;
  price: string;
  change: string;
  isPositive: boolean;
  currency: string;
  rawPrice: number;
  rawChangePercent: number;
}

export interface CryptoItem {
  symbol: string;
  name: string;
  ticker: string;
  price: string;
  change24h: string;
  isPositive: boolean;
  marketCap: string;
  iconBg: string;
  iconSymbol: string;
  rawPrice: number;
  rawChangePercent: number;
  sparkline?: number[];
}

export interface ForexItem {
  pair: string;
  name: string;
  price: string;
  changePercent: string;
  isPositive: boolean;
  range52w: string;
  rawPrice: number;
  rawChangePercent: number;
  sparkline?: number[];
}

export interface CommodityItem {
  symbol: string;
  code: string;
  price: string;
  changePercent: string;
  unit: string;
  isPositive: boolean;
  badgeBg: string;
  badgeText: string;
  rawPrice: number;
  rawChangePercent: number;
}

export type ChartTimeframe = '1D' | '5D' | '1M' | '6M' | '1Y' | '5Y' | 'ALL';
export type ChartType = 'area' | 'candles' | 'bars';
