import React, { useState } from 'react';
import { X, CheckCircle, Shield, Zap, Sparkles } from 'lucide-react';

interface GetStartedModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
}

export const GetStartedModal: React.FC<GetStartedModalProps> = ({
  isOpen,
  onClose,
  isDarkMode,
}) => {
  const [email, setEmail] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 1600);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className={`w-full max-w-md rounded-3xl shadow-2xl border p-6 transition-all relative ${
          isDarkMode
            ? 'bg-[#131722] border-[#2a2e39] text-[#d1d4dc]'
            : 'bg-white border-[#e0e3eb] text-[#131722]'
        }`}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full hover:bg-gray-500/10 text-[#787b86]"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-[#2962ff]/10 flex items-center justify-center mb-3">
            <svg
              className="w-7 h-7 text-[#2962ff] fill-current"
              viewBox="0 0 36 28"
            >
              <path d="M14 22H7V6h7v16zm8-22h-6v28h6V0zm8 14h-6v14h6V14z" />
            </svg>
          </div>
          <h3 className={`text-2xl font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-[#131722]'}`}>
            Welcome to TradingView
          </h3>
          <p className="text-xs text-[#787b86] mt-1">
            Join 60+ million traders and investors charting the financial world.
          </p>
        </div>

        {isSuccess ? (
          <div className="py-8 text-center space-y-2">
            <CheckCircle className="w-12 h-12 text-[#089981] mx-auto animate-bounce" />
            <div className="text-lg font-bold text-[#089981]">Welcome aboard!</div>
            <div className="text-xs text-[#787b86]">Your live workspace has been configured.</div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#787b86]">
                Work or Personal Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className={`w-full px-4 py-2.5 rounded-xl border text-sm transition outline-none ${
                  isDarkMode
                    ? 'bg-[#1e222d] border-[#2a2e39] text-white focus:border-[#2962ff]'
                    : 'bg-white border-[#e0e3eb] text-black focus:border-[#2962ff]'
                }`}
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-fuchsia-600 hover:opacity-95 shadow-md transition cursor-pointer"
            >
              Get started for free
            </button>

            <div className="relative py-2 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <div className={`w-full border-t ${isDarkMode ? 'border-[#2a2e39]' : 'border-[#e0e3eb]'}`} />
              </div>
              <span className={`relative px-3 text-[11px] uppercase tracking-wider text-[#787b86] ${isDarkMode ? 'bg-[#131722]' : 'bg-white'}`}>
                Or continue with
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  setIsSuccess(true);
                  setTimeout(onClose, 1200);
                }}
                className={`py-2 px-3 rounded-xl border text-xs font-semibold transition cursor-pointer flex items-center justify-center gap-2 ${
                  isDarkMode ? 'border-[#2a2e39] hover:bg-[#1e222d]' : 'border-[#e0e3eb] hover:bg-gray-50'
                }`}
              >
                <span>Google</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsSuccess(true);
                  setTimeout(onClose, 1200);
                }}
                className={`py-2 px-3 rounded-xl border text-xs font-semibold transition cursor-pointer flex items-center justify-center gap-2 ${
                  isDarkMode ? 'border-[#2a2e39] hover:bg-[#1e222d]' : 'border-[#e0e3eb] hover:bg-gray-50'
                }`}
              >
                <span>Apple</span>
              </button>
            </div>

            <div className="pt-2 text-center text-[11px] text-[#787b86]">
              By signing up, you agree to TradingView's Terms of Service and Privacy Policy.
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
