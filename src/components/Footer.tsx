import React from 'react';
import { 
  CreditCard, 
  ShieldCheck, 
  Phone, 
  Clock, 
  MapPin, 
  CheckCircle, 
  ExternalLink 
} from 'lucide-react';
import { NavigationTab } from '../types';

interface FooterProps {
  onNavigate: (tab: NavigationTab, terminalId?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full bg-[#eff4ff] border-t border-slate-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Column 1: Company Profile */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-emerald-700 flex items-center justify-center text-white shadow-sm">
                <CreditCard className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-[#0b1c30]">پوز‌پلاس</span>
            </div>
            
            <p className="text-slate-600 text-sm leading-relaxed">
              ارائه‌دهنده رسمی دستگاه‌های پوز سیار و ثابت، درگاه‌های پرداخت هوشمند و راهکارهای جامع پایانه‌های فروشگاهی دارای تاییدیه رسمی شاپرک و بانک مرکزی جمهوری اسلامی ایران.
            </p>

            <div className="flex items-center gap-1.5 text-emerald-800 text-xs font-semibold bg-emerald-100/70 border border-emerald-200 px-3 py-1.5 rounded-full w-fit">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>دارای مجوز پرداخت‌یاری شاپرک</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col gap-3.5">
            <span className="font-bold text-[#0b1c30] text-base">دسترسی سریع</span>
            <div className="flex flex-col gap-2.5 text-slate-600 text-sm">
              <button 
                onClick={() => onNavigate('pos-terminals-catalog')} 
                className="text-right hover:text-emerald-700 transition-colors"
              >
                کاتالوگ کارتخوان‌ها
              </button>
              <button 
                onClick={() => onNavigate('order-registration-and-documents')} 
                className="text-right hover:text-emerald-700 transition-colors"
              >
                ثبت سفارش و فعال‌سازی آنلاین
              </button>
              <button 
                onClick={() => onNavigate('services-and-support')} 
                className="text-right hover:text-emerald-700 transition-colors"
              >
                خدمات و پیگیری گارانتی
              </button>
              <button 
                onClick={() => onNavigate('order-registration-and-documents')} 
                className="text-right hover:text-emerald-700 transition-colors"
              >
                لیست مدارک مورد نیاز شاپرک
              </button>
              <button 
                onClick={() => onNavigate('services-and-support')} 
                className="text-right hover:text-emerald-700 transition-colors"
              >
                قوانین، مالیات و پرسش‌های متداول
              </button>
            </div>
          </div>

          {/* Column 3: Popular POS Terminals */}
          <div className="flex flex-col gap-3.5">
            <span className="font-bold text-[#0b1c30] text-base">مدل‌های محبوب کارتخوان</span>
            <div className="flex flex-col gap-2.5 text-slate-600 text-sm">
              <button 
                onClick={() => onNavigate('terminal-detail', 'pax-a930')} 
                className="text-right hover:text-emerald-700 transition-colors flex items-center justify-between"
              >
                <span>کارتخوان اندرویدی Pax A930</span>
                <span className="text-[11px] bg-white px-1.5 py-0.5 rounded text-slate-500 border border-slate-200">لمسی</span>
              </button>
              <button 
                onClick={() => onNavigate('terminal-detail', 'newpos-7210')} 
                className="text-right hover:text-emerald-700 transition-colors flex items-center justify-between"
              >
                <span>کارتخوان سیار Newpos 7210</span>
                <span className="text-[11px] bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded border border-emerald-200 font-bold">پرفروش</span>
              </button>
              <button 
                onClick={() => onNavigate('terminal-detail', 'morefun-h9')} 
                className="text-right hover:text-emerald-700 transition-colors flex items-center justify-between"
              >
                <span>کارتخوان بی‌سیم مورفان H9</span>
                <span className="text-[11px] bg-white px-1.5 py-0.5 rounded text-slate-500 border border-slate-200">جیبی</span>
              </button>
              <button 
                onClick={() => onNavigate('terminal-detail', 'pax-s90')} 
                className="text-right hover:text-emerald-700 transition-colors flex items-center justify-between"
              >
                <span>پایانه صنعتی پکس Pax S90</span>
                <span className="text-[11px] bg-white px-1.5 py-0.5 rounded text-slate-500 border border-slate-200">مقاوم</span>
              </button>
              <button 
                onClick={() => onNavigate('terminal-detail', 'nexgo-g3')} 
                className="text-right hover:text-emerald-700 transition-colors flex items-center justify-between"
              >
                <span>کارتخوان هیبریدی Nexgo G3</span>
                <span className="text-[11px] bg-white px-1.5 py-0.5 rounded text-slate-500 border border-slate-200">4G</span>
              </button>
            </div>
          </div>

          {/* Column 4: Contact & Official Licenses */}
          <div className="flex flex-col gap-3.5">
            <span className="font-bold text-[#0b1c30] text-base">مجوزها و ارتباط با مرکز</span>
            <p className="text-slate-600 text-sm leading-relaxed flex items-start gap-1.5">
              <MapPin className="w-4 h-4 text-emerald-700 mt-1 shrink-0" />
              <span>تهران، خیابان ولیعصر، تقاطع بهشتی، برج فناوری مالی، طبقه ۶، واحد ۲۴</span>
            </p>

            <div className="flex flex-col gap-1.5 text-sm text-slate-700 font-numeric">
              <a href="tel:02188880000" className="flex items-center gap-1.5 hover:text-emerald-700 transition-colors">
                <Phone className="w-3.5 h-3.5 text-emerald-700" />
                <span>تلفن تماس: ۰۲۱-۸۸۸۸۰۰۰۰</span>
              </a>
              <span className="flex items-center gap-1.5 text-xs text-slate-500">
                <Clock className="w-3.5 h-3.5 text-emerald-700" />
                <span>شنبه تا چهارشنبه ۸ الی ۲۰ | پنج‌شنبه ۸ الی ۱۴</span>
              </span>
            </div>

            {/* Official Trust Seals */}
            <div className="flex items-center gap-2 pt-2">
              <div className="flex-1 p-2 bg-white rounded-lg border border-slate-200 text-center shadow-xs">
                <span className="text-[11px] font-bold text-slate-700 block">ای‌نماد ۵ ستاره</span>
                <span className="text-[10px] text-emerald-700 font-semibold">احراز هویت شده</span>
              </div>
              <div className="flex-1 p-2 bg-white rounded-lg border border-slate-200 text-center shadow-xs">
                <span className="text-[11px] font-bold text-slate-700 block">سامانه شاپرک</span>
                <span className="text-[10px] text-emerald-700 font-semibold">اتصال تایید شده</span>
              </div>
              <div className="flex-1 p-2 bg-white rounded-lg border border-slate-200 text-center shadow-xs">
                <span className="text-[11px] font-bold text-slate-700 block">نظام صنفی</span>
                <span className="text-[10px] text-slate-500 font-semibold">رایانه‌ای کشور</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Sub-bar */}
        <div className="mt-12 pt-6 border-t border-slate-200/80 flex flex-col md:flex-row items-center justify-between gap-3 text-slate-500 text-xs">
          <p>
            تمامی حقوق مادی و معنوی متعلق به شرکت پوز‌پلاس (فناوران پرداخت هوشمند) می‌باشد.
          </p>
          <p className="font-numeric opacity-80">
            امنیت تراکنش و انطباق کامل شبکه بانکی تحت استاندارد شاپرک ۱۴۰۳ - ۲۰۲۴
          </p>
        </div>
      </div>
    </footer>
  );
};
