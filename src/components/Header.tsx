import React, { useState } from 'react';
import { 
  CreditCard, 
  Headphones, 
  PhoneCall, 
  User, 
  Menu, 
  X, 
  CheckCircle2, 
  ArrowLeft,
  ChevronDown
} from 'lucide-react';
import { NavigationTab } from '../types';

interface HeaderProps {
  currentTab: NavigationTab;
  onNavigate: (tab: NavigationTab) => void;
  onOpenConsultation: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  currentTab, 
  onNavigate, 
  onOpenConsultation 
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { id: NavigationTab; label: string }[] = [
    { id: 'home', label: 'صفحه اصلی' },
    { id: 'pos-terminals-catalog', label: 'کاتالوگ کارتخوان‌ها' },
    { id: 'order-registration-and-documents', label: 'ثبت سفارش و مدارک' },
    { id: 'services-and-support', label: 'خدمات و پشتیبانی' },
    { id: 'about-posplus', label: 'درباره ما' },
  ];

  return (
    <header className="fixed top-0 w-full z-50 shadow-xs">
      {/* Top Banner Notice */}
      <div className="bg-[#131b2e] text-[#94a3b8] py-1.5 px-4 sm:px-6 text-xs border-b border-white/5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
            <span className="flex items-center gap-1 text-slate-200">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block"></span>
              تحویل ۲۴ ساعته در سراسر کشور
            </span>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <span className="text-slate-300">بدون مسدودی حساب بانکی و ثبت رایگان کد مالیاتی</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-200 font-numeric">
            <Headphones className="w-3.5 h-3.5 text-emerald-400" />
            <a href="tel:02188880000" className="hover:text-emerald-400 transition-colors">
              پشتیبانی ۲۴/۷: ۰۲۱-۸۸۸۸۰۰۰۰
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="bg-white/95 backdrop-blur-xl border-b border-slate-200/80">
        <div className="h-20 max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
          
          {/* Brand Logo */}
          <div 
            onClick={() => onNavigate('home')} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-600 to-[#004d34] flex items-center justify-center text-white shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform">
              <CreditCard className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black text-[#0b1c30] tracking-tight flex items-center gap-1.5">
                پوز‌پلاس
                <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-1.5 py-0.5 rounded border border-emerald-200">
                  شاپرک
                </span>
              </span>
              <span className="text-xs text-slate-500 font-semibold tracking-wider">
                POSPlus Fintech
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = currentTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => onNavigate(link.id)}
                  className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-[#e5eeff] text-[#0b1c30] font-bold shadow-xs'
                      : 'text-slate-600 hover:text-[#0b1c30] hover:bg-slate-100/70'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Header Action CTAs */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => onNavigate('customer-portal-login')}
              className={`hidden sm:inline-flex items-center justify-center gap-2 h-11 px-4 rounded-lg text-sm font-semibold transition-all ${
                currentTab === 'customer-portal-login'
                  ? 'bg-slate-900 text-white'
                  : 'bg-[#eff4ff] text-[#0b1c30] hover:bg-[#dce9ff]'
              }`}
            >
              <User className="w-4 h-4 text-emerald-700" />
              <span>ورود مشتریان</span>
            </button>

            <button
              onClick={onOpenConsultation}
              className="inline-flex items-center justify-center h-11 px-4 sm:px-5 rounded-lg bg-[#006c49] text-white hover:bg-[#005236] transition-all duration-200 text-sm font-semibold gap-1.5 shadow-sm hover:shadow-md active:scale-95"
            >
              <PhoneCall className="w-4 h-4" />
              <span className="hidden xs:inline">مشاوره رایگان</span>
              <ArrowLeft className="w-4 h-4 mr-0.5" />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
              aria-label="منوی سایت"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Slide-down Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 shadow-xl px-4 py-4 animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-1.5">
            {navLinks.map((link) => {
              const isActive = currentTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => {
                    onNavigate(link.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-right py-3 px-4 rounded-lg text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-800 font-bold border-r-4 border-emerald-600'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}

            <div className="pt-3 mt-2 border-t border-slate-100 flex flex-col gap-2">
              <button
                onClick={() => {
                  onNavigate('customer-portal-login');
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-slate-100 text-slate-800 text-sm font-semibold"
              >
                <User className="w-4 h-4 text-emerald-700" />
                ورود به پنل پذیرندگان شاپرک
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
