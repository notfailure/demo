import React, { useState, useMemo } from 'react';
import { 
  Search, 
  SlidersHorizontal, 
  ArrowUpDown, 
  Check, 
  Star, 
  Bolt, 
  Battery, 
  Wifi, 
  Layers, 
  ArrowLeft, 
  Download, 
  PhoneCall, 
  ShieldCheck, 
  Bike, 
  Store, 
  ShoppingCart, 
  Car,
  CheckCircle2,
  HelpCircle,
  FileText
} from 'lucide-react';
import { POSTerminal } from '../types';
import { TERMINALS_DATA, formatPrice } from '../data/terminals';

interface CatalogViewProps {
  onSelectTerminal: (terminal: POSTerminal) => void;
  onStartOrder: (terminal: POSTerminal) => void;
  onOpenConsultation: () => void;
  compareList: POSTerminal[];
  onToggleCompare: (terminal: POSTerminal) => void;
}

export const CatalogView: React.FC<CatalogViewProps> = ({
  onSelectTerminal,
  onStartOrder,
  onOpenConsultation,
  compareList,
  onToggleCompare,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [connectivityFilter, setConnectivityFilter] = useState<'all' | '4g' | 'wifi' | 'lan'>('all');
  const [osFilter, setOsFilter] = useState<'all' | 'android' | 'button'>('all');
  const [conditionFilter, setConditionFilter] = useState<'all' | 'new' | 'refurbished'>('all');
  const [sortOption, setSortOption] = useState<'bestseller' | 'fastest' | 'cheapest' | 'newest'>('bestseller');

  // Filter and sort logic
  const filteredTerminals = useMemo(() => {
    return TERMINALS_DATA.filter((item) => {
      // Search text
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchName = item.name.toLowerCase().includes(query);
        const matchPersian = item.persianName.toLowerCase().includes(query);
        const matchSubtitle = item.subtitle.toLowerCase().includes(query);
        if (!matchName && !matchPersian && !matchSubtitle) return false;
      }

      // Connectivity
      if (connectivityFilter === '4g' && !item.connectivity.includes('4G')) return false;
      if (connectivityFilter === 'wifi' && !item.connectivity.includes('Wi-Fi') && !item.connectivity.includes('WiFi')) return false;
      if (connectivityFilter === 'lan' && item.category !== 'stationary-lan' && !item.connectivity.includes('LAN')) return false;

      // OS
      if (osFilter === 'android' && item.category !== 'smart-android') return false;
      if (osFilter === 'button' && item.category === 'smart-android') return false;

      return true;
    }).sort((a, b) => {
      if (sortOption === 'fastest') return a.speedSeconds - b.speedSeconds;
      if (sortOption === 'cheapest') return a.price - b.price;
      if (sortOption === 'bestseller') return b.reviewsCount - a.reviewsCount;
      return 0; // Default
    });
  }, [searchQuery, connectivityFilter, osFilter, conditionFilter, sortOption]);

  return (
    <div className="flex flex-col w-full">
      {/* Strategic Header */}
      <section className="w-full bg-[#eff4ff] py-12 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
          <div className="flex flex-col gap-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/90 backdrop-blur-md rounded-full text-emerald-800 border border-emerald-200/80 text-xs font-bold w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping"></span>
              <span>تاییدیه رسمی شاپرک و بانک مرکزی | آماده تحویل ۲۴ ساعته</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-[#0b1c30] tracking-tight">
              کاتالوگ و لیست قیمت دستگاه‌های کارتخوان
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              انتخاب هوشمندانه پایانه فروشگاهی بر اساس سرعت سوئیچ، دوام باتری و پایداری آنتن‌دهی متناسب با صنف و حجم تراکنش روزانه کسب‌وکار شما با امکان اتصال همزمان به حساب‌های بانکی متعدد.
            </p>
          </div>

          {/* Quick Operational Metrics Snapshot */}
          <div className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-xs border border-slate-200">
            <div className="flex flex-col px-3">
              <span className="text-[11px] text-slate-500 font-medium">میانگین سرعت تراکنش</span>
              <span className="font-numeric text-xl font-extrabold text-emerald-800">۱.۲ ثانیه</span>
            </div>
            <div className="w-px h-10 bg-slate-200"></div>
            <div className="flex flex-col px-3">
              <span className="text-[11px] text-slate-500 font-medium">دستگاه‌های فعال کشور</span>
              <span className="font-numeric text-xl font-extrabold text-slate-900">۴۵,۰۰۰+</span>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Interactive Filter & Search Ribbon */}
      <section className="w-full bg-white/95 backdrop-blur-xl border-b border-slate-200 sticky top-20 z-30 py-4 px-4 sm:px-6 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          
          {/* Filter Pills Groups */}
          <div className="flex items-center gap-3 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            
            {/* Search Input */}
            <div className="relative min-w-[200px] sm:min-w-[240px]">
              <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="جستجوی مدل (پکس، نیوپوز...)"
                className="w-full h-10 pr-9 pl-3 rounded-xl bg-slate-100 border border-transparent focus:border-emerald-600 focus:bg-white text-xs font-semibold text-slate-800 outline-none transition-all"
              />
            </div>

            {/* Connectivity Pills */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl shrink-0">
              <span className="text-[11px] text-slate-500 px-2 font-bold">اتصال:</span>
              <button
                onClick={() => setConnectivityFilter('all')}
                className={`h-8 px-3 rounded-lg text-xs font-bold transition-all ${
                  connectivityFilter === 'all'
                    ? 'bg-[#131b2e] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                همه
              </button>
              <button
                onClick={() => setConnectivityFilter('4g')}
                className={`h-8 px-3 rounded-lg text-xs font-bold transition-all ${
                  connectivityFilter === '4g'
                    ? 'bg-[#131b2e] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                4G سیم‌کارتی
              </button>
              <button
                onClick={() => setConnectivityFilter('wifi')}
                className={`h-8 px-3 rounded-lg text-xs font-bold transition-all ${
                  connectivityFilter === 'wifi'
                    ? 'bg-[#131b2e] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                وای‌فای (Wi-Fi)
              </button>
            </div>

            {/* OS Pills */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl shrink-0">
              <span className="text-[11px] text-slate-500 px-2 font-bold">سیستم:</span>
              <button
                onClick={() => setOsFilter('all')}
                className={`h-8 px-3 rounded-lg text-xs font-bold transition-all ${
                  osFilter === 'all'
                    ? 'bg-[#131b2e] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                همه
              </button>
              <button
                onClick={() => setOsFilter('android')}
                className={`h-8 px-3 rounded-lg text-xs font-bold transition-all ${
                  osFilter === 'android'
                    ? 'bg-[#131b2e] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                اندروید لمسی
              </button>
              <button
                onClick={() => setOsFilter('button')}
                className={`h-8 px-3 rounded-lg text-xs font-bold transition-all ${
                  osFilter === 'button'
                    ? 'bg-[#131b2e] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                دکمه‌ای صنعتی
              </button>
            </div>
          </div>

          {/* Sorting & Result Counts */}
          <div className="flex items-center justify-between lg:justify-end gap-3 shrink-0">
            <div className="flex items-center gap-1.5 text-slate-500 text-xs font-bold">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <span>مرتب‌سازی:</span>
            </div>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as any)}
              className="h-10 px-3 bg-white text-slate-800 text-xs font-bold rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-emerald-600 cursor-pointer"
            >
              <option value="bestseller">پرفروش‌ترین مدل‌ها</option>
              <option value="fastest">سریع‌ترین سرعت تراکنش</option>
              <option value="cheapest">اقتصادی‌ترین (کمترین قیمت)</option>
            </select>
          </div>

        </div>
      </section>

      {/* Main Grid Section */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-slate-900">
              {filteredTerminals.length} پایانه فروشگاهی تاییدشده
            </span>
            <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded-full border border-emerald-200">
              مالیات رایگان و مدارک آسان
            </span>
          </div>
          <span className="text-xs text-slate-500 hidden sm:inline font-medium">
            تحویل ۲۴ ساعته تهران، ۴۸ ساعته شهرستان با پست پیشتاز
          </span>
        </div>

        {/* Terminals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredTerminals.map((terminal) => {
            const isCompared = compareList.some((c) => c.id === terminal.id);

            return (
              <article
                key={terminal.id}
                className="group flex flex-col bg-white rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200/80 relative"
              >
                {/* Badges */}
                <div className="absolute top-4 right-4 z-10 flex flex-col gap-1.5 items-start">
                  {terminal.isSpecial && (
                    <span className="text-[10px] font-bold bg-[#131b2e] text-white px-2.5 py-0.5 rounded-full shadow-xs flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      پیشنهاد ویژه
                    </span>
                  )}
                  {terminal.isBestseller && (
                    <span className="text-[10px] font-bold bg-[#006c49] text-white px-2.5 py-0.5 rounded-full shadow-xs">
                      پرفروش‌ترین بازار
                    </span>
                  )}
                  {terminal.isBudget && (
                    <span className="text-[10px] font-bold bg-amber-500 text-slate-900 px-2.5 py-0.5 rounded-full shadow-xs">
                      اقتصادی‌ترین
                    </span>
                  )}
                </div>

                {/* Terminal Image Container */}
                <div 
                  onClick={() => onSelectTerminal(terminal)}
                  className="w-full h-52 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl flex items-center justify-center p-4 relative overflow-hidden group-hover:scale-102 transition-transform duration-300 cursor-pointer"
                >
                  <img
                    src={terminal.image}
                    alt={terminal.name}
                    className="h-44 w-auto object-contain drop-shadow-md"
                  />
                </div>

                {/* Content Block */}
                <div className="flex flex-col gap-1 mt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-emerald-700">
                      {terminal.category === 'smart-android' ? 'اندروید هوشمند لمسی' : 'سیار صنعتی پرسرعت'}
                    </span>
                    <div className="flex items-center gap-1 text-slate-600 text-xs font-numeric">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{terminal.rating}</span>
                    </div>
                  </div>

                  <h3 
                    onClick={() => onSelectTerminal(terminal)}
                    className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors cursor-pointer"
                  >
                    {terminal.persianName}
                  </h3>

                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {terminal.description}
                  </p>
                </div>

                {/* Specs Pill Matrix */}
                <div className="grid grid-cols-2 gap-1.5 my-4 bg-slate-50 p-2 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-1 text-slate-700 text-[11px]">
                    <Bolt className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span className="font-numeric">تراکنش: {terminal.transactionSpeed}</span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-700 text-[11px]">
                    <Battery className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span className="font-numeric">باتری: {terminal.batteryCapacity} mAh</span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-700 text-[11px]">
                    <Wifi className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span>{terminal.connectivity.slice(0, 14)}</span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-700 text-[11px]">
                    <Layers className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span>اتصال به {terminal.accountsSupported} حساب</span>
                  </div>
                </div>

                {/* Price & Actions */}
                <div className="mt-auto flex flex-col gap-2 pt-2 border-t border-slate-100">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-slate-500">قیمت نهایی:</span>
                    <div className="flex items-baseline gap-1">
                      <span className="font-numeric text-lg font-black text-slate-900">
                        {formatPrice(terminal.price)}
                      </span>
                      <span className="text-xs text-slate-500">تومان</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onStartOrder(terminal)}
                      className="flex-1 h-11 bg-[#006c49] hover:bg-[#005236] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                    >
                      <span>ثبت سفارش آنی</span>
                      <ArrowLeft className="w-3.5 h-3.5" />
                    </button>

                    <label
                      className={`h-11 px-3 rounded-xl cursor-pointer flex items-center justify-center gap-1.5 text-xs font-bold border transition-colors ${
                        isCompared
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                          : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                      }`}
                      title="افزودن به مقایسه"
                    >
                      <input
                        type="checkbox"
                        checked={isCompared}
                        onChange={() => onToggleCompare(terminal)}
                        className="rounded accent-emerald-700 w-3.5 h-3.5 cursor-pointer"
                      />
                      <span className="hidden sm:inline">مقایسه</span>
                    </label>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Technical Spec Comparison Table for Top 3 Models */}
      <section className="w-full bg-[#eff4ff] py-16 px-4 sm:px-6 mt-8" id="compare-table">
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold text-emerald-700">تحلیل دقیق سخت‌افزاری</span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#0b1c30]">
                جدول مقایسه فنی ۳ مدل پرچم‌دار بازار
              </h2>
              <p className="text-sm text-slate-600">
                بررسی دقیق مشخصات دستگاه‌های پیشتاز برای انتخاب متناسب‌ترین گزینه با تیراژ تراکنش شما.
              </p>
            </div>

            <button
              onClick={() => alert('فایل PDF کاتالوگ جامع پایانه‌های پوز‌پلاس دانلود شد.')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-white border border-slate-200 px-4 py-2.5 rounded-xl hover:bg-slate-50 transition-colors shadow-xs"
            >
              <Download className="w-4 h-4" />
              <span>دانلود فایل کامل مشخصات فنی (PDF)</span>
            </button>
          </div>

          {/* High-End Comparison Table */}
          <div className="w-full overflow-x-auto bg-white rounded-2xl shadow-sm border border-slate-200 p-4">
            <table className="w-full text-right border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-slate-100 text-slate-900 border-b border-slate-200">
                  <th className="py-3 px-4 font-bold text-sm w-1/4 rounded-r-xl">مشخصه فنی</th>
                  <th className="py-3 px-4 font-bold text-sm w-1/4 text-center">
                    <span className="text-slate-900 block font-black">Pax A930 هوشمند</span>
                    <span className="text-[11px] text-slate-500 font-normal">پیشنهاد فروشگاهی</span>
                  </th>
                  <th className="py-3 px-4 font-bold text-sm w-1/4 text-center">
                    <span className="text-emerald-800 block font-black">Newpos 7210 4G</span>
                    <span className="text-[11px] text-slate-500 font-normal">پرفروش‌ترین سیار</span>
                  </th>
                  <th className="py-3 px-4 font-bold text-sm w-1/4 text-center rounded-l-xl">
                    <span className="text-slate-900 block font-black">Morefun H9</span>
                    <span className="text-[11px] text-slate-500 font-normal">اقتصادی و سبک</span>
                  </th>
                </tr>
              </thead>
              <tbody className="text-xs sm:text-sm divide-y divide-slate-100 text-slate-700">
                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900">سیستم عامل و پردازنده</td>
                  <td className="py-3.5 px-4 text-center">اندروید ۷.۱ نوقا + ۴ هسته‌ای</td>
                  <td className="py-3.5 px-4 text-center font-bold text-emerald-800">لینوکس ایمن اختصاصی ۳۲ بیت</td>
                  <td className="py-3.5 px-4 text-center">سیستم‌عامل اختصاصی امنیتی</td>
                </tr>
                <tr className="hover:bg-slate-50/70 transition-colors bg-slate-50/40">
                  <td className="py-3.5 px-4 font-bold text-slate-900">صفحه نمایش و لمسی</td>
                  <td className="py-3.5 px-4 text-center font-bold text-emerald-800">۵.۵ اینچ تمام لمسی HD رنگی</td>
                  <td className="py-3.5 px-4 text-center">۲.۸ اینچ رنگی با دکمه جزیره‌ای</td>
                  <td className="py-3.5 px-4 text-center">۲.۴ اینچ رنگی TFT</td>
                </tr>
                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900">ظرفیت باتری و شارژدهی</td>
                  <td className="py-3.5 px-4 text-center font-numeric">۵۲۰۰ میلی‌آمپر (تا ۷۲ ساعت)</td>
                  <td className="py-3.5 px-4 text-center font-numeric font-bold text-emerald-800">۲۶۰۰ میلی‌آمپر (تا ۴۸ ساعت)</td>
                  <td className="py-3.5 px-4 text-center font-numeric">۱۵۰۰ میلی‌آمپر (تا ۲۴ ساعت)</td>
                </tr>
                <tr className="hover:bg-slate-50/70 transition-colors bg-slate-50/40">
                  <td className="py-3.5 px-4 font-bold text-slate-900">وزن خالص دستگاه</td>
                  <td className="py-3.5 px-4 text-center font-numeric">۴۵۰ گرم</td>
                  <td className="py-3.5 px-4 text-center font-numeric">۳۶۰ گرم</td>
                  <td className="py-3.5 px-4 text-center font-numeric font-bold text-emerald-800">۲۴۰ گرم (بسیار سبک)</td>
                </tr>
                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900">سرعت پرینتر حرارتی</td>
                  <td className="py-3.5 px-4 text-center">۵۰ میلی‌متر بر ثانیه (ژاپنی)</td>
                  <td className="py-3.5 px-4 text-center">۴۰ میلی‌متر بر ثانیه</td>
                  <td className="py-3.5 px-4 text-center">۳۰ میلی‌متر بر ثانیه</td>
                </tr>
                <tr className="hover:bg-slate-50/70 transition-colors bg-slate-50/40">
                  <td className="py-3.5 px-4 font-bold text-slate-900">مدت گارانتی رسمی</td>
                  <td className="py-3.5 px-4 text-center font-bold text-slate-900">۱۸ ماه گارانتی طلایی تعویض</td>
                  <td className="py-3.5 px-4 text-center font-bold text-slate-900">۱۸ ماه گارانتی طلایی تعویض</td>
                  <td className="py-3.5 px-4 text-center font-bold text-slate-900">۱۲ ماه گارانتی تعویض قطعات</td>
                </tr>
                <tr className="bg-white">
                  <td className="py-4 px-4"></td>
                  <td className="py-4 px-4 text-center">
                    <button
                      onClick={() => onStartOrder(TERMINALS_DATA[0])}
                      className="w-full h-10 bg-[#131b2e] hover:bg-black text-white rounded-xl text-xs font-bold transition-colors"
                    >
                      سفارش Pax A930
                    </button>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <button
                      onClick={() => onStartOrder(TERMINALS_DATA[1])}
                      className="w-full h-10 bg-[#006c49] hover:bg-[#005236] text-white rounded-xl text-xs font-bold transition-colors"
                    >
                      سفارش Newpos 7210
                    </button>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <button
                      onClick={() => onStartOrder(TERMINALS_DATA[2])}
                      className="w-full h-10 bg-[#131b2e] hover:bg-black text-white rounded-xl text-xs font-bold transition-colors"
                    >
                      سفارش Morefun H9
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Buyer's Decision Matrix: Match by Occupation */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex flex-col gap-2 text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-4 py-1 rounded-full border border-emerald-200">
            راهنمای هوشمند خرید
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0b1c30]">
            کدام دستگاه کارتخوان مناسب صنف شماست؟
          </h2>
          <p className="text-sm text-slate-600">
            انتخاب اشتباه دستگاه منجر به افت سرعت و نارضایتی مشتری می‌شود؛ پیشنهادهای تخصصی ما برای اصناف:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Role 1 */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col gap-4">
            <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-emerald-700">
              <Bike className="w-6 h-6" />
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-base font-bold text-slate-900">ویزیتورها و پیک‌های توزیع</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                نیاز مبرم به دستگاه بسیار سبک، ابعاد جیبی و شارژدهی حداقل یک شیفت کامل کاری در تحویل در محل.
              </p>
            </div>
            <div className="mt-auto pt-3 bg-slate-50 p-3 rounded-xl border border-slate-100 flex flex-col gap-1">
              <span className="text-[11px] text-slate-400 font-bold">مدل پیشنهادی پوز‌پلاس:</span>
              <span className="text-xs font-black text-emerald-800">Morefun H9 یا Pax S910</span>
            </div>
          </div>

          {/* Role 2 */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col gap-4">
            <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-emerald-700">
              <Store className="w-6 h-6" />
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-base font-bold text-slate-900">غرفه‌های نمایشگاهی و فصلی</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                نیاز به ثبت سریع، اتصال به شبکه وای‌فای شلوغ نمایشگاه یا اینترنت سیم‌کارت بدون قطعی لحظه‌ای.
              </p>
            </div>
            <div className="mt-auto pt-3 bg-slate-50 p-3 rounded-xl border border-slate-100 flex flex-col gap-1">
              <span className="text-[11px] text-slate-400 font-bold">مدل پیشنهادی پوز‌پلاس:</span>
              <span className="text-xs font-black text-emerald-800">Pax A930 یا Newpos 7210</span>
            </div>
          </div>

          {/* Role 3 */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col gap-4">
            <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-emerald-700">
              <ShoppingCart className="w-6 h-6" />
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-base font-bold text-slate-900">فروشگاه‌ها و سوپرمارکت‌ها</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                تیراژ بالای تراکنش در دقیقه، رول کاغذ بزرگ برای پرینت مکرر و استقامت بدنه بالا در برخورد روزمره.
              </p>
            </div>
            <div className="mt-auto pt-3 bg-slate-50 p-3 rounded-xl border border-slate-100 flex flex-col gap-1">
              <span className="text-[11px] text-slate-400 font-bold">مدل پیشنهادی پوز‌پلاس:</span>
              <span className="text-xs font-black text-emerald-800">Newpos 7210 یا Pax S90</span>
            </div>
          </div>

          {/* Role 4 */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col gap-4">
            <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-emerald-700">
              <Car className="w-6 h-6" />
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-base font-bold text-slate-900">تاکسی‌های اینترنتی و باربری</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                شارژ با فندکی خودرو یا پاوربانک، مقاومت دمایی بالا در تابستان داخل کابین و سرعت وصل مجدد آنتن.
              </p>
            </div>
            <div className="mt-auto pt-3 bg-slate-50 p-3 rounded-xl border border-slate-100 flex flex-col gap-1">
              <span className="text-[11px] text-slate-400 font-bold">مدل پیشنهادی پوز‌پلاس:</span>
              <span className="text-xs font-black text-emerald-800">Newpos 7210 یا Amp 7000</span>
            </div>
          </div>
        </div>

        {/* Assurance Consultation Strip */}
        <div className="mt-12 p-6 sm:p-8 bg-[#131b2e] text-white rounded-2xl flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center lg:text-right">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <PhoneCall className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold">هنوز در انتخاب مدل مناسب تردید دارید؟</h3>
              <p className="text-xs sm:text-sm text-slate-300">
                کارشناسان فنی پوز‌پلاس به صورت رایگان صنف کاری شما را بررسی کرده و بهترین پایانه را پیشنهاد می‌دهند.
              </p>
            </div>
          </div>

          <button
            onClick={onOpenConsultation}
            className="h-12 px-6 rounded-xl bg-[#006c49] hover:bg-[#005236] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-colors shrink-0"
          >
            <span>تماس فوری با واحد مشاوره</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
