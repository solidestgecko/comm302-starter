import React from 'react';

interface FooterProps {
  isDarkMode: boolean;
  onSelectCategory?: (category: any) => void;
}

export const Footer: React.FC<FooterProps> = ({ isDarkMode, onSelectCategory }) => {
  return (
    <footer
      className={`border-t text-xs py-12 px-4 lg:px-8 mt-12 transition-colors ${
        isDarkMode
          ? 'bg-[#131722] border-[#2a2e39] text-[#787b86]'
          : 'bg-white border-[#e0e3eb] text-[#787b86]'
      }`}
    >
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-10">
          <div>
            <h4 className={`font-bold text-sm mb-3 ${isDarkMode ? 'text-white' : 'text-[#131722]'}`}>
              Products
            </h4>
            <ul className="space-y-2">
              <li>
                <a className="hover:text-[#2962ff] transition" href="#supercharts">
                  Supercharts
                </a>
              </li>
              <li>
                <a className="hover:text-[#2962ff] transition" href="#screener">
                  Stock Screener
                </a>
              </li>
              <li>
                <a className="hover:text-[#2962ff] transition" href="#etf-screener">
                  ETF Screener
                </a>
              </li>
              <li>
                <a className="hover:text-[#2962ff] transition" href="#crypto-screener">
                  Crypto Screener
                </a>
              </li>
              <li>
                <a className="hover:text-[#2962ff] transition" href="#heatmaps">
                  Heatmaps
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className={`font-bold text-sm mb-3 ${isDarkMode ? 'text-white' : 'text-[#131722]'}`}>
              Community
            </h4>
            <ul className="space-y-2">
              <li>
                <a className="hover:text-[#2962ff] transition" href="#ideas">
                  Trading Ideas
                </a>
              </li>
              <li>
                <a className="hover:text-[#2962ff] transition" href="#scripts">
                  Pine Script®
                </a>
              </li>
              <li>
                <a className="hover:text-[#2962ff] transition" href="#streams">
                  Live Streams
                </a>
              </li>
              <li>
                <a className="hover:text-[#2962ff] transition" href="#rules">
                  House Rules
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className={`font-bold text-sm mb-3 ${isDarkMode ? 'text-white' : 'text-[#131722]'}`}>
              Markets
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onSelectCategory && onSelectCategory('US stocks')}
                  className="hover:text-[#2962ff] transition cursor-pointer text-left"
                >
                  Indices
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory && onSelectCategory('US stocks')}
                  className="hover:text-[#2962ff] transition cursor-pointer text-left"
                >
                  US Stocks
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory && onSelectCategory('World stocks')}
                  className="hover:text-[#2962ff] transition cursor-pointer text-left"
                >
                  World Stocks
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory && onSelectCategory('Crypto')}
                  className="hover:text-[#2962ff] transition cursor-pointer text-left"
                >
                  Crypto
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory && onSelectCategory('Government bonds')}
                  className="hover:text-[#2962ff] transition cursor-pointer text-left"
                >
                  Government Bonds
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className={`font-bold text-sm mb-3 ${isDarkMode ? 'text-white' : 'text-[#131722]'}`}>
              Company
            </h4>
            <ul className="space-y-2">
              <li>
                <a className="hover:text-[#2962ff] transition" href="#about">
                  About Us
                </a>
              </li>
              <li>
                <a className="hover:text-[#2962ff] transition" href="#features">
                  Features
                </a>
              </li>
              <li>
                <a className="hover:text-[#2962ff] transition" href="#pricing">
                  Pricing
                </a>
              </li>
              <li>
                <a className="hover:text-[#2962ff] transition" href="#blog">
                  Blog
                </a>
              </li>
              <li>
                <a className="hover:text-[#2962ff] transition" href="#careers">
                  Careers
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className={`font-bold text-sm mb-3 ${isDarkMode ? 'text-white' : 'text-[#131722]'}`}>
              Business
            </h4>
            <ul className="space-y-2">
              <li>
                <a className="hover:text-[#2962ff] transition" href="#widgets">
                  Widgets
                </a>
              </li>
              <li>
                <a className="hover:text-[#2962ff] transition" href="#charting-libraries">
                  Charting Libraries
                </a>
              </li>
              <li>
                <a className="hover:text-[#2962ff] transition" href="#lightweight">
                  Lightweight Charts™
                </a>
              </li>
              <li>
                <a className="hover:text-[#2962ff] transition" href="#brokerage">
                  Brokerage Integration
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className={`font-bold text-sm mb-3 ${isDarkMode ? 'text-white' : 'text-[#131722]'}`}>
              Apps
            </h4>
            <ul className="space-y-2">
              <li>
                <a className="hover:text-[#2962ff] transition" href="#desktop">
                  Desktop App
                </a>
              </li>
              <li>
                <a className="hover:text-[#2962ff] transition" href="#mobile">
                  Mobile App
                </a>
              </li>
              <li>
                <a className="hover:text-[#2962ff] transition" href="#store">
                  TradingView Store
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div
          className={`border-t pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs ${
            isDarkMode ? 'border-[#2a2e39]' : 'border-[#e0e3eb]'
          }`}
        >
          <div className="flex items-center gap-3">
            <svg
              className={`w-6 h-6 ${isDarkMode ? 'text-white' : 'text-black'} fill-current`}
              viewBox="0 0 36 28"
            >
              <path d="M14 22H7V6h7v16zm8-22h-6v28h6V0zm8 14h-6v14h6V14z" />
            </svg>
            <span className="font-medium">Look first / Then leap.</span>
            <span>© 2026 TradingView, Inc.</span>
          </div>
          <div className="flex flex-wrap gap-4">
            <a className="hover:underline" href="#terms">
              Terms of Use
            </a>
            <a className="hover:underline" href="#privacy">
              Privacy Policy
            </a>
            <a className="hover:underline" href="#cookies">
              Cookies Policy
            </a>
            <a className="hover:underline" href="#security">
              Security
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
