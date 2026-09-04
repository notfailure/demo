import React from 'react';
import { 
  ShieldCheck, 
  Truck, 
  FileCheck, 
  Headphones, 
  CheckCircle2, 
  ArrowLeft, 
  PhoneCall, 
  Zap, 
  Layers, 
  Store, 
  RefreshCw, 
  ShoppingCart, 
  Star, 
  Building2, 
  CreditCard, 
  Wallet, 
  Cpu, 
  Wifi, 
  BatteryCharging, 
  Award,
  Clock
} from 'lucide-react';
import { POSTerminal } from '../types';
import { TERMINALS_DATA, formatPrice } from '../data/terminals';

interface HomeViewProps {
  onNavigateToCatalog: () => void;
  onSelectTerminal: (terminal: POSTerminal) => void;
  onStartOrder: (terminal?: POSTerminal) => void;
  onOpenConsultation: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigateToCatalog,
  onSelectTerminal,
  onStartOrder,
  onOpenConsultation,
}) => {
  const featuredTerminals = TERMINALS_DATA.slice(0, 4);

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#eff4ff] px-4 sm:px-6 py-12 lg:py-20">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 -left-20 w-80 h-80 rounded-full bg-blue-500/10 blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Right: Text & Action Flow */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              
              {/* Institutional Trust Chip */}
              <div className="inline-flex items-center gap-2 bg-white px-4 py-1.5 rounded-full shadow-xs w-fit border border-slate-200/80">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse"></span>
                <span className="text-xs font-bold text-slate-800">
                  دارای مجوز رسمی پرداخت‌یاری و تاییدیه شاپرک بانک مرکزی
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0b1c30] tracking-tight leading-tight sm:leading-tight">
                فروش تخصصی انواع دستگاه کارتخوان سیار و ثابت با تحویل فوری
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
                اتصال به کلیه بانک‌های عضو شتاب، بدون نیاز به مسدودی حساب، همراه با ثبت کد مالیاتی رایگان و گارانتی طلایی ۱۸ ماهه سخت‌افزاری و نرم‌افزاری.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={onNavigateToCatalog}
                  className="inline-flex items-center justify-center h-13 px-7 rounded-xl bg-[#006c49] text-white hover:bg-[#005236] transition-all font-bold text-sm sm:text-base gap-2 shadow-lg shadow-emerald-800/20 active:scale-95"
                >
                  <span>مشاهده و خرید دستگاه‌ها</span>
                  <ArrowLeft className="w-5 h-5" />
                </button>

                <a
                  href="tel:02188880000"
                  className="inline-flex items-center justify-center h-13 px-6 rounded-xl bg-white text-slate-800 hover:bg-slate-50 transition-colors font-bold text-sm sm:text-base gap-2 border border-slate-200 shadow-xs"
                >
                  <Headphones className="w-5 h-5 text-emerald-700" />
                  <span>مشاوره رایگان تلفنی (۰۲۱-۸۸۸۸۰۰۰۰)</span>
                </a>
              </div>

              {/* Rapid Features Checklist */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-200/70">
                <div className="flex items-center gap-2 text-slate-800">
                  <Truck className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span className="text-xs font-bold">ارسال ۲۴ ساعته</span>
                </div>
                <div className="flex items-center gap-2 text-slate-800">
                  <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span className="text-xs font-bold">مالکیت ۱۰۰٪ قطعی</span>
                </div>
                <div className="flex items-center gap-2 text-slate-800">
                  <FileCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span className="text-xs font-bold">ثبت آنلاین مدارک</span>
                </div>
                <div className="flex items-center gap-2 text-slate-800">
                  <Headphones className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span className="text-xs font-bold">پشتیبانی ۲۴ ساعته</span>
                </div>
              </div>

            </div>

            {/* Left: Hero Terminal Visual & Live Bento Stats */}
            <div className="lg:col-span-5 relative">
              <div className="relative bg-white rounded-2xl p-5 sm:p-6 shadow-xl border border-slate-200/80 overflow-hidden">
                <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200/70 aspect-4/3 flex items-center justify-center p-4">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCh5gwT1L4yyK5kU0hrJDeTlT2yUk8vgR8bcqzD0gJyrvImd9BlbGeOza7JUHGjcbEqBb4EylToTGWxLf8aFMQJlCkPLZESjHi-Fim48m1in9nCDMbFZDaC4ZPOvH7e0_F2VpgGqVkoJwjqNg3bBAt_XSLN3ykA1v08uhQDTRdo5Hr8sMdIsM-is_4-XNk62yAkSs_eOiM8DLMdrgAiCfuPk4s0AHo7txCC8WAcZEQkrElb0M5E2b2M"
                    alt="کارتخوان هوشمند لمسی شاپرک"
                    className="w-full h-full object-contain drop-shadow-lg"
                  />
                  {/* Floating Shaparak Badge */}
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5 border border-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span className="text-xs font-bold text-slate-800">
                      تاییدیه رسمی سوئیچ شاپرک
                    </span>
                  </div>
                </div>

                {/* Bento Stats underneath Hero Preview */}
                <div className="grid grid-cols-3 gap-2 mt-4 pt-2">
                  <div className="bg-[#eff4ff] p-3 rounded-xl text-center flex flex-col">
                    <span className="font-numeric text-xl font-extrabold text-emerald-800">+۵۰,۰۰۰</span>
                    <span className="text-[11px] font-semibold text-slate-500 mt-0.5">پذیرنده فعال</span>
                  </div>
                  <div className="bg-[#eff4ff] p-3 rounded-xl text-center flex flex-col">
                    <span className="font-numeric text-xl font-extrabold text-emerald-800">۹۸.۴٪</span>
                    <span className="text-[11px] font-semibold text-slate-500 mt-0.5">رضایت مشتریان</span>
                  </div>
                  <div className="bg-[#eff4ff] p-3 rounded-xl text-center flex flex-col">
                    <span className="font-numeric text-xl font-extrabold text-emerald-800">&lt; ۱.۵ ثانیه</span>
                    <span className="text-[11px] font-semibold text-slate-500 mt-0.5">سرعت تراکنش</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Value Proposition: Why Choose POSPlus */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-20 w-full">
        <div className="flex flex-col items-center text-center gap-2 max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-emerald-800 bg-emerald-100/70 border border-emerald-200 px-4 py-1 rounded-full">
            مزایای انحصاری پوز‌پلاس
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0b1c30]">
            چرا خرید کارتخوان از پوز‌پلاس سریع‌تر و مطمئن‌تر است؟
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            تمامی مراحل ثبت، تخصیص سوئیچ بانکی و تحویل بدون پیچیدگی اداری و در بالاترین سطح استاندارد امنیتی انجام می‌شود.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Bento Feature 1 */}
          <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md border border-slate-200/80 transition-all duration-200 flex flex-col gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">فعال‌سازی فوری شاپرک</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              اتصال مستقیم به سامانه جامع شاپرک تنها طی ۲۴ الی ۴۸ ساعت کاری بدون معطلی و با پیگیری مستقیم کارشناسان.
            </p>
          </div>

          {/* Bento Feature 2 */}
          <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md border border-slate-200/80 transition-all duration-200 flex flex-col gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">اتصال چندحسابه همزمان</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              قابلیت اتصال کارتخوان به چند حساب بانکی مجزا و تفکیک یا تسهیم آنی وجوه واریزی طبق درصد دلخواه شما.
            </p>
          </div>

          {/* Bento Feature 3 */}
          <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md border border-slate-200/80 transition-all duration-200 flex flex-col gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Store className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">بدون نیاز به جواز کسب</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              مناسب برای کسب‌وکارهای خانگی، اصناف سیار، رانندگان و استارتاپ‌ها بدون شرط حداقل تعداد تراکنش ماهانه.
            </p>
          </div>

          {/* Bento Feature 4 */}
          <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md border border-slate-200/80 transition-all duration-200 flex flex-col gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <RefreshCw className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">گارانتی طلایی و تعویض</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              یک سال و نیم گارانتی کامل سخت‌افزاری، پشتیبانی دائمی نرم‌افزاری و در صورت بروز نقص، امکان تعویض سریع دستگاه.
            </p>
          </div>
        </div>
      </section>

      {/* Featured POS Terminals Catalog Section */}
      <section className="bg-[#eff4ff] px-4 sm:px-6 py-16 w-full" id="pos-catalog">
        <div className="max-w-7xl mx-auto flex flex-col gap-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold text-emerald-700">کاتالوگ پایانه‌های برگزیده</span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#0b1c30]">
                پرفروش‌ترین کارتخوان‌های سیار و ثابت شاپرک
              </h2>
              <p className="text-sm text-slate-600">
                انتخاب بهترین دستگاه منطبق با سرعت تراکنش و حجم کاری فروشگاه شما
              </p>
            </div>

            <button
              onClick={onNavigateToCatalog}
              className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-800 hover:text-emerald-950 transition-colors"
            >
              <span>مشاهده تمام مدل‌ها</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>

          {/* Product Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredTerminals.map((terminal) => (
              <div
                key={terminal.id}
                className="bg-white rounded-2xl p-4 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200/80 group"
              >
                <div className="flex flex-col">
                  {/* Image Container */}
                  <div 
                    onClick={() => onSelectTerminal(terminal)}
                    className="relative bg-slate-50 rounded-xl overflow-hidden aspect-square flex items-center justify-center p-4 cursor-pointer"
                  >
                    {terminal.isSpecial && (
                      <span className="absolute top-2 right-2 bg-emerald-700 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-xs">
                        پیشنهاد ویژه
                      </span>
                    )}
                    {terminal.isBestseller && (
                      <span className="absolute top-2 right-2 bg-[#131b2e] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-xs">
                        پرفروش‌ترین بازار
                      </span>
                    )}
                    {terminal.isBudget && (
                      <span className="absolute top-2 right-2 bg-amber-500 text-slate-900 text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-xs">
                        اقتصادی و سبک
                      </span>
                    )}

                    <img
                      src={terminal.image}
                      alt={terminal.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Title & Subtitle */}
                  <div className="flex flex-col gap-1 mt-4">
                    <span className="text-[11px] font-bold text-slate-500">
                      {terminal.category === 'smart-android' ? 'اندرویدی لمسی' : 'سیار پرسرعت'}
                    </span>
                    <h3 
                      onClick={() => onSelectTerminal(terminal)}
                      className="text-base font-bold text-[#0b1c30] group-hover:text-emerald-700 transition-colors cursor-pointer"
                    >
                      {terminal.persianName}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {terminal.subtitle}
                    </p>
                  </div>

                  {/* Specs Matrix */}
                  <div className="grid grid-cols-2 gap-1.5 my-4">
                    <div className="bg-slate-50 p-2 rounded-lg text-center border border-slate-100">
                      <span className="text-[10px] text-slate-400 block font-medium">ارتباطات</span>
                      <span className="text-xs font-bold text-slate-800">{terminal.connectivity}</span>
                    </div>
                    <div className="bg-slate-50 p-2 rounded-lg text-center border border-slate-100">
                      <span className="text-[10px] text-slate-400 block font-medium">باتری</span>
                      <span className="text-xs font-bold text-slate-800 font-numeric">{terminal.battery}</span>
                    </div>
                    <div className="bg-slate-50 p-2 rounded-lg text-center border border-slate-100">
                      <span className="text-[10px] text-slate-400 block font-medium">سرعت تراکنش</span>
                      <span className="text-xs font-bold text-emerald-700 font-numeric">{terminal.transactionSpeed}</span>
                    </div>
                    <div className="bg-slate-50 p-2 rounded-lg text-center border border-slate-100">
                      <span className="text-[10px] text-slate-400 block font-medium">گارانتی</span>
                      <span className="text-xs font-bold text-slate-800 font-numeric">{terminal.warranty}</span>
                    </div>
                  </div>
                </div>

                {/* Price & Action Button */}
                <div className="flex flex-col gap-2 pt-2 border-t border-slate-100">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-slate-500">قیمت نهایی:</span>
                    <span className="text-lg font-black text-slate-900 font-numeric">
                      {formatPrice(terminal.price)}{' '}
                      <span className="text-xs font-normal text-slate-500">تومان</span>
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <button
                      onClick={() => onSelectTerminal(terminal)}
                      className="h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
                    >
                      بررسی فنی
                    </button>
                    <button
                      onClick={() => onStartOrder(terminal)}
                      className="h-10 rounded-xl bg-[#006c49] hover:bg-[#005236] text-white text-xs font-bold flex items-center justify-center gap-1 transition-colors shadow-xs"
                    >
                      <span>ثبت سفارش</span>
                      <ShoppingCart className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3-Step Simple Activation Process */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-20 w-full">
        <div className="flex flex-col items-center text-center gap-2 max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-4 py-1 rounded-full border border-emerald-200">
            فرآیند آسان و شفاف
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0b1c30]">
            دریافت و راه‌اندازی کارتخوان در ۳ مرحله
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            بدون نیاز به مراجعه حضوری به شعب بانکی یا ادارات دولتی، دستگاه شما آماده استفاده تحویل داده می‌شود.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* Step 1 */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-900 flex items-center justify-center text-lg font-black font-numeric">
                ۱
              </div>
              <Cpu className="w-6 h-6 text-emerald-700" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">انتخاب مدل متناسب</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              بر اساس نوع فعالیت (ثابت یا سیار)، حجم تراکنش و بودجه مورد نظرتان، دستگاه مناسب را انتخاب نمایید یا از کارشناسان ما راهنمایی بگیرید.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-lg font-black font-numeric">
                ۲
              </div>
              <FileCheck className="w-6 h-6 text-emerald-700" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">ارسال آنلاین مدارک</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              تنها با تصویر شناسنامه، کارت ملی و شماره شبا بانکی خود بدون چک و سفته، کارشناسان ما ثبت مالیاتی رایگان شما را تکمیل می‌کنند.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-900 flex items-center justify-center text-lg font-black font-numeric">
                ۳
              </div>
              <Truck className="w-6 h-6 text-emerald-700" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">تحویل فعال درب محل</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              دستگاه به‌صورت صددرصد تست‌شده، رول‌گذاری‌شده و فعال با سیم‌کارت هدیه طی ۲۴ ساعت درب محل شما تحویل داده می‌شود.
            </p>
          </div>
        </div>
      </section>

      {/* PSP & Banking Gateway Network Partners */}
      <section className="bg-[#eff4ff] py-12 px-4 sm:px-6 w-full border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto flex flex-col gap-6 text-center">
          <div className="flex flex-col gap-1">
            <span className="text-xs text-slate-500 font-bold">زیرساخت رسمی شبکه شاپرک و بانک مرکزی</span>
            <h3 className="text-lg sm:text-xl font-bold text-[#0b1c30]">
              اتصال امن به معتبرترین شرکت‌های پرداخت الکترونیک (PSP)
            </h3>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <div className="bg-white px-5 py-3 rounded-xl shadow-xs border border-slate-200 text-sm font-bold text-slate-800 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-emerald-700" />
              <span>پرداخت الکترونیک سداد (بانک ملی)</span>
            </div>
            <div className="bg-white px-5 py-3 rounded-xl shadow-xs border border-slate-200 text-sm font-bold text-slate-800 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-emerald-700" />
              <span>به‌پرداخت ملت</span>
            </div>
            <div className="bg-white px-5 py-3 rounded-xl shadow-xs border border-slate-200 text-sm font-bold text-slate-800 flex items-center gap-2">
              <Wallet className="w-4 h-4 text-emerald-700" />
              <span>آسان پرداخت (آپ)</span>
            </div>
            <div className="bg-white px-5 py-3 rounded-xl shadow-xs border border-slate-200 text-sm font-bold text-slate-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>سامان کیش (SEP)</span>
            </div>
            <div className="bg-white px-5 py-3 rounded-xl shadow-xs border border-slate-200 text-sm font-bold text-slate-800 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>ایران کیش</span>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-20 w-full">
        <div className="flex flex-col items-center text-center gap-2 max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-4 py-1 rounded-full border border-emerald-200">
            تجربه مشتریان
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0b1c30]">
            کسب‌وکارهای همکار درباره پوز‌پلاس چه می‌گویند؟
          </h2>
          <p className="text-sm text-slate-600">
            بیش از ۵۰,۰۰۰ فروشگاه، پزشک، رستوران و پخش‌کننده کالا به پوز‌پلاس اعتماد کرده‌اند.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80 flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-3">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                «برای سوپرمارکت به دستگاهی با سرعت چاپ سریع و عدم قطعی تراکنش در ساعت‌های شلوغ نیاز داشتیم. مدل Pax A930 فوق‌العاده سریع عمل می‌کنه و ثبت مالیاتی‌ش رو هم خودشون یک‌روزه انجام دادن.»
              </p>
            </div>
            <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
              <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-800 font-bold flex items-center justify-center">
                ر.ک
              </div>
              <div className="flex flex-col text-right">
                <span className="text-sm font-bold text-slate-900">رضا کریمی</span>
                <span className="text-xs text-slate-500">مدیر هایپرمارکت نارنجستان، تهران</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80 flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-3">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                «برای تیم پخش و ویزیتوری ۵ دستگاه Newpos 7210 تهیه کردیم. ماندگاری باتری برای کل روز عالیه و در شهرهای دورافتاده هم به راحتی از طریق 4G وصل میشه. پشتیبانی فنی‌شون واقعاً پاسخگو هست.»
              </p>
            </div>
            <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
              <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-800 font-bold flex items-center justify-center">
                م.ص
              </div>
              <div className="flex flex-col text-right">
                <span className="text-sm font-bold text-slate-900">مهندس صادقی</span>
                <span className="text-xs text-slate-500">سرپرست لجستیک شرکت داروپخش</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80 flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-3">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                «برای مطب تخصصی نیاز به فعال‌سازی فوری بدون بلوکه شدن پول در حساب بانکی داشتم. کل فرآیند از ثبت تلفنی تا دریافت دستگاه با پیک کمتر از ۲۴ ساعت طول کشید. بسیار راضی هستم.»
              </p>
            </div>
            <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
              <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-800 font-bold flex items-center justify-center">
                د.ن
              </div>
              <div className="flex flex-col text-right">
                <span className="text-sm font-bold text-slate-900">دکتر ناصری</span>
                <span className="text-xs text-slate-500">کلینیک پوست و مو، اصفهان</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Prominent Action Anchor CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-12 w-full">
        <div className="relative rounded-2xl bg-[#131b2e] text-white p-8 sm:p-12 overflow-hidden shadow-2xl">
          <div className="absolute -bottom-16 -left-16 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex flex-col gap-3 max-w-2xl text-center lg:text-right">
              <div className="inline-flex items-center gap-1.5 bg-white/10 px-3.5 py-1 rounded-full w-fit mx-auto lg:mx-0 text-emerald-400 text-xs font-bold">
                <Clock className="w-3.5 h-3.5" />
                <span>تضمین سریع‌ترین تحویل در تهران و تمامی استان‌ها</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black leading-tight">
                همین امروز کسب‌وکار خود را به سریع‌ترین کارتخوان مجهز کنید
              </h2>

              <p className="text-slate-300 text-sm leading-relaxed">
                کارشناسان پوز‌پلاس آماده پاسخگویی، بررسی نیازهای تجاری شما و ثبت سفارش آنی هستند. نیازی به معطلی در شعب بانکی ندارید.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
              <a
                href="tel:02188880000"
                className="w-full sm:w-auto h-13 px-6 rounded-xl bg-[#006c49] hover:bg-[#005236] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <PhoneCall className="w-4 h-4" />
                <span>تماس فوری: ۰۲۱-۸۸۸۸۰۰۰۰</span>
              </a>

              <button
                onClick={onOpenConsultation}
                className="w-full sm:w-auto h-13 px-6 rounded-xl bg-white text-slate-900 hover:bg-slate-100 font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-colors"
              >
                <span>درخواست آنلاین مشاوره</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
