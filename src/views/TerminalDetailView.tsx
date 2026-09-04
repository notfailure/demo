import React, { useState } from 'react';
import { 
  ArrowRight, 
  ArrowLeft, 
  Star, 
  ShieldCheck, 
  Truck, 
  CheckCircle2, 
  Zap, 
  BatteryCharging, 
  Layers, 
  FileText, 
  Package, 
  MessageSquare, 
  PhoneCall, 
  ShoppingCart,
  Check,
  CreditCard,
  Cpu,
  Wifi,
  Sparkles
} from 'lucide-react';
import { POSTerminal } from '../types';
import { TERMINALS_DATA, formatPrice } from '../data/terminals';

interface TerminalDetailViewProps {
  terminal: POSTerminal;
  onBackToCatalog: () => void;
  onStartOrder: (terminal: POSTerminal, options?: { warrantyTier: 'golden' | 'vip'; color: string }) => void;
  onOpenConsultation: () => void;
  onSelectRelated: (terminal: POSTerminal) => void;
}

export const TerminalDetailView: React.FC<TerminalDetailViewProps> = ({
  terminal,
  onBackToCatalog,
  onStartOrder,
  onOpenConsultation,
  onSelectRelated,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState('black');
  const [warrantyTier, setWarrantyTier] = useState<'golden' | 'vip'>('golden');
  const [activeTab, setActiveTab] = useState<'specs' | 'docs' | 'box' | 'reviews'>('specs');

  // Customer reviews local state
  const [reviews, setReviews] = useState([
    {
      id: 'rev-1',
      author: 'حامد باقری',
      role: 'فروشگاه پوشاک، تبریز',
      rating: 5,
      date: '۲ روز پیش',
      verified: true,
      text: 'سرعت چاپ و ارسال تراکنش فوق‌العاده است. با سیم‌کارت همراه اول در زیرزمین پاساژ هم به راحتی آنتن میده.'
    },
    {
      id: 'rev-2',
      author: 'مریم کمالی',
      role: 'کافه قنادی، تهران',
      rating: 5,
      date: '۱ هفته پیش',
      verified: true,
      text: 'دستگاه بسیار سبک و خوش‌دسته. شارژرش تایپ‌سی هست و با کابل موبایل هم راحت شارژ میشه. تحویل‌شون هم واقعاً زیر ۲۴ ساعت بود.'
    }
  ]);
  const [newReviewText, setNewReviewText] = useState('');
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewText.trim()) return;

    setReviews([
      {
        id: `rev-${Date.now()}`,
        author: newReviewAuthor,
        role: 'پذیرنده شاپرک',
        rating: 5,
        date: 'هم‌اکنون',
        verified: true,
        text: newReviewText,
      },
      ...reviews,
    ]);
    setNewReviewAuthor('');
    setNewReviewText('');
    setReviewSubmitted(true);
    setTimeout(() => setReviewSubmitted(false), 4000);
  };

  const currentGallery = terminal.gallery && terminal.gallery.length > 0 
    ? terminal.gallery 
    : [{ id: 'main', title: 'تصویر اصلی', url: terminal.image }];

  const activeImageUrl = currentGallery[activeImageIndex]?.url || terminal.image;

  const vipExtraPrice = warrantyTier === 'vip' ? 350000 : 0;
  const finalPrice = terminal.price + vipExtraPrice;

  // Filter other models
  const relatedTerminals = TERMINALS_DATA.filter((t) => t.id !== terminal.id).slice(0, 3);

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto px-4 sm:px-6 py-8">
      
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-6">
        <button onClick={onBackToCatalog} className="hover:text-emerald-700 transition-colors">
          کاتالوگ کارتخوان‌ها
        </button>
        <span>/</span>
        <span className="text-slate-800 font-bold">{terminal.persianName}</span>
      </nav>

      {/* Main PDP Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
        
        {/* Right Column: Gallery & Visuals */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          
          {/* Main Visual Stage */}
          <div className="relative bg-slate-50 rounded-2xl overflow-hidden aspect-4/3 flex items-center justify-center p-6 border border-slate-100">
            {terminal.isBestseller && (
              <span className="absolute top-4 right-4 bg-[#006c49] text-white text-xs font-bold px-3 py-1 rounded-full shadow-xs">
                پرفروش‌ترین بازار ایران
              </span>
            )}
            
            <img
              src={activeImageUrl}
              alt={terminal.name}
              className="max-h-72 w-auto object-contain transition-all duration-300 drop-shadow-lg"
            />
          </div>

          {/* Thumbnails Angle Selector */}
          {currentGallery.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-1">
              {currentGallery.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-20 h-20 rounded-xl bg-slate-50 p-2 border-2 transition-all flex flex-col items-center justify-center gap-1 shrink-0 ${
                    activeImageIndex === idx
                      ? 'border-emerald-700 shadow-sm bg-white'
                      : 'border-slate-200 hover:border-slate-300 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={item.url} alt={item.title} className="w-12 h-12 object-contain" />
                  <span className="text-[10px] text-slate-600 font-bold">{item.title}</span>
                </button>
              ))}
            </div>
          )}

          {/* Institutional Trust Seals Under Image */}
          <div className="grid grid-cols-3 gap-2 pt-2">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-center flex flex-col items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span className="text-[11px] font-bold text-slate-800">تاییدیه شاپرک</span>
              <span className="text-[10px] text-slate-500">سوئیچ رسمی بانکی</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-center flex flex-col items-center gap-1">
              <Truck className="w-4 h-4 text-emerald-700" />
              <span className="text-[11px] font-bold text-slate-800">ارسال ۲۴ ساعته</span>
              <span className="text-[10px] text-slate-500">پیک اختصاصی تهران</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-center flex flex-col items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span className="text-[11px] font-bold text-slate-800">مالکیت قطعی</span>
              <span className="text-[10px] text-slate-500">بدون بلوکه وجه</span>
            </div>
          </div>
        </div>

        {/* Left Column: Purchase Decision Engine */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100/70 border border-emerald-200 px-3 py-1 rounded-full">
                {terminal.category === 'smart-android' ? 'کارتخوان لمسی اندرویدی' : 'کارتخوان سیار پرسرعت'}
              </span>
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-numeric">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="font-bold text-slate-800">{terminal.rating}</span>
                <span>({terminal.reviewsCount} نظر پذیرندگان)</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {terminal.persianName} ({terminal.name})
            </h1>

            <p className="text-sm text-slate-600 leading-relaxed">
              {terminal.description}
            </p>
          </div>

          {/* Color Selection */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold text-slate-700">
              انتخاب رنگ بدنه دستگاه:
            </span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSelectedColor('black')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                  selectedColor === 'black'
                    ? 'border-emerald-700 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-700/20'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span className="w-3.5 h-3.5 rounded-full bg-slate-900 border border-white"></span>
                <span>مشکی کلاسیک مات (ضد خش)</span>
              </button>
              <button
                onClick={() => setSelectedColor('gray')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                  selectedColor === 'gray'
                    ? 'border-emerald-700 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-700/20'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span className="w-3.5 h-3.5 rounded-full bg-slate-400 border border-white"></span>
                <span>نوک‌مدادی سازمانی</span>
              </button>
            </div>
          </div>

          {/* Warranty Tier Selector */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold text-slate-700">
              بسته پشتیبانی و گارانتی شاپرک:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div
                onClick={() => setWarrantyTier('golden')}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all flex flex-col gap-1 ${
                  warrantyTier === 'golden'
                    ? 'border-emerald-700 bg-emerald-50/50 ring-2 ring-emerald-700/20'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">۱۸ ماه گارانتی طلایی</span>
                  <span className="text-[11px] font-bold text-emerald-700">پیش‌فرض رایگان</span>
                </div>
                <span className="text-[11px] text-slate-500">
                  تعویض قطعات اصلی + رفع خطای تمپر رایگان
                </span>
              </div>

              <div
                onClick={() => setWarrantyTier('vip')}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all flex flex-col gap-1 ${
                  warrantyTier === 'vip'
                    ? 'border-emerald-700 bg-emerald-50/50 ring-2 ring-emerald-700/20'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">گارانتی VIP الماس ۲۴ ماهه</span>
                  <span className="text-[11px] font-numeric font-bold text-slate-700">+ ۳۵۰,۰۰۰ تومان</span>
                </div>
                <span className="text-[11px] text-slate-500">
                  شامل دستگاه جایگزین فوری در زمان تعمیرات
                </span>
              </div>
            </div>
          </div>

          {/* Pricing & Order Action Box */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 flex flex-col gap-4 mt-2">
            <div className="flex items-baseline justify-between">
              <div className="flex flex-col">
                <span className="text-xs text-slate-500 font-medium">مبلغ نهایی قابل پرداخت:</span>
                {terminal.originalPrice > terminal.price && (
                  <span className="text-xs text-slate-400 line-through font-numeric">
                    {formatPrice(terminal.originalPrice)} تومان
                  </span>
                )}
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl sm:text-3xl font-black text-slate-900 font-numeric">
                  {formatPrice(finalPrice)}
                </span>
                <span className="text-xs font-bold text-slate-500">تومان</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => onStartOrder(terminal, { warrantyTier, color: selectedColor })}
                className="flex-1 h-13 bg-[#006c49] hover:bg-[#005236] text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-700/20 transition-all active:scale-95"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>شروع ثبت سفارش و تخصیص شاپرک</span>
                <ArrowLeft className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenConsultation}
                className="h-13 px-5 bg-white hover:bg-slate-100 text-slate-800 rounded-xl font-bold text-xs sm:text-sm border border-slate-200 transition-colors flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-emerald-700" />
                <span>مشاوره تلفنی درباره این مدل</span>
              </button>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-slate-500">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
              <span>پرداخت مبلغ دستگاه می‌تواند پس از تحویل و تست حضوری در محل شما انجام گیرد.</span>
            </div>
          </div>

        </div>
      </div>

      {/* 4 Bento Feature Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-10">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col gap-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
            <Zap className="w-5 h-5" />
          </div>
          <span className="text-xs text-slate-500 font-medium">سرعت پردازش تراکنش</span>
          <span className="text-base font-bold text-slate-900 font-numeric">{terminal.transactionSpeed}</span>
          <span className="text-[11px] text-slate-500 leading-relaxed">تراکنش بدون تاخیر سوییچ شتاب</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col gap-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
            <BatteryCharging className="w-5 h-5" />
          </div>
          <span className="text-xs text-slate-500 font-medium">دوام شارژ باتری</span>
          <span className="text-base font-bold text-slate-900 font-numeric">{terminal.battery}</span>
          <span className="text-[11px] text-slate-500 leading-relaxed">سازگار با شارژر فست و پاوربانک</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col gap-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
            <Layers className="w-5 h-5" />
          </div>
          <span className="text-xs text-slate-500 font-medium">تسهیم چند حساب</span>
          <span className="text-base font-bold text-slate-900 font-numeric">تا {terminal.accountsSupported} حساب همزمان</span>
          <span className="text-[11px] text-slate-500 leading-relaxed">واریز اتوماتیک درصدی به شبا‌ها</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col gap-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
            <Wifi className="w-5 h-5" />
          </div>
          <span className="text-xs text-slate-500 font-medium">شبکه‌های مخابراتی</span>
          <span className="text-base font-bold text-slate-900">{terminal.connectivity}</span>
          <span className="text-[11px] text-slate-500 leading-relaxed">آنتن‌دهی قوی حتی در نقاط کور</span>
        </div>
      </div>

      {/* Tabbed Detailed Specifications & Documentation */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 flex flex-col gap-6">
        
        {/* Tab Headers */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('specs')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
              activeTab === 'specs'
                ? 'bg-[#131b2e] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            مشخصات فنی و سخت‌افزاری
          </button>
          <button
            onClick={() => setActiveTab('docs')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
              activeTab === 'docs'
                ? 'bg-[#131b2e] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            مدارک لازم جهت فعال‌سازی
          </button>
          <button
            onClick={() => setActiveTab('box')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
              activeTab === 'box'
                ? 'bg-[#131b2e] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            اقلام موجود در بسته‌بندی آکبند
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
              activeTab === 'reviews'
                ? 'bg-[#131b2e] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            نظرات پذیرندگان ({reviews.length})
          </button>
        </div>

        {/* Tab Content 1: Specs */}
        {activeTab === 'specs' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col divide-y divide-slate-100 text-xs sm:text-sm">
              <div className="py-3 flex justify-between">
                <span className="text-slate-500">پردازنده (CPU):</span>
                <span className="font-bold text-slate-800">{terminal.specs.cpu}</span>
              </div>
              <div className="py-3 flex justify-between">
                <span className="text-slate-500">صفحه نمایش:</span>
                <span className="font-bold text-slate-800">{terminal.specs.display}</span>
              </div>
              <div className="py-3 flex justify-between">
                <span className="text-slate-500">حافظه رم و فلش:</span>
                <span className="font-bold text-slate-800">{terminal.specs.memory}</span>
              </div>
              <div className="py-3 flex justify-between">
                <span className="text-slate-500">ابعاد و وزن:</span>
                <span className="font-bold text-slate-800 font-numeric">{terminal.specs.dimensions}</span>
              </div>
              <div className="py-3 flex justify-between">
                <span className="text-slate-500">شیار سیم‌کارت:</span>
                <span className="font-bold text-slate-800">{terminal.specs.simSlots}</span>
              </div>
            </div>

            <div className="flex flex-col divide-y divide-slate-100 text-xs sm:text-sm">
              <div className="py-3 flex justify-between">
                <span className="text-slate-500">مشخصات باتری:</span>
                <span className="font-bold text-slate-800 font-numeric">{terminal.specs.batterySpec}</span>
              </div>
              <div className="py-3 flex justify-between">
                <span className="text-slate-500">مشخصات پرینتر:</span>
                <span className="font-bold text-slate-800">{terminal.specs.printerSpec}</span>
              </div>
              <div className="py-3 flex justify-between">
                <span className="text-slate-500">درگاه‌های ارتباطی:</span>
                <span className="font-bold text-slate-800">{terminal.specs.ports}</span>
              </div>
              <div className="py-3 flex justify-between">
                <span className="text-slate-500">استانداردهای امنیتی:</span>
                <span className="font-bold text-slate-800">{terminal.specs.security}</span>
              </div>
              <div className="py-3 flex justify-between">
                <span className="text-slate-500">کارت‌خوان‌های پشتیبانی‌شده:</span>
                <span className="font-bold text-slate-800">{terminal.specs.cardReaders}</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content 2: Docs */}
        {activeTab === 'docs' && (
          <div className="flex flex-col gap-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <p className="text-slate-600">
              طبق قوانین بانک مرکزی و سامانه شاپرک، تخصیص پایانه فروشگاهی به اشخاص حقیقی و حقوقی منوط به ارائه مدارک زیر به صورت آنلاین است:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col gap-2">
                <span className="font-bold text-slate-900 text-sm">۱. تصویر کارت ملی</span>
                <span className="text-xs text-slate-500">پشت و رو به‌صورت واضح و خوانا یا رسید ثبت‌نام کارت ملی هوشمند.</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col gap-2">
                <span className="font-bold text-slate-900 text-sm">۲. تصویر صفحه اول شناسنامه</span>
                <span className="text-xs text-slate-500">دارای کد ملی و مشخصات کامل هویتی دارنده حساب بانکی.</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col gap-2">
                <span className="font-bold text-slate-900 text-sm">۳. تاییدیه شماره شبا بانکی</span>
                <span className="text-xs text-slate-500">پرینت شبا ممهور به مهر شعبه یا اسکرین‌شات از اینترنت بانک رسمی.</span>
              </div>
            </div>
            <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900 text-xs font-semibold">
              مژده: ثبت کد مالیاتی در سامانه امور مالیاتی توسط کارشناسان پوز‌پلاس به‌صورت کاملاً رایگان انجام می‌پذیرد.
            </div>
          </div>
        )}

        {/* Tab Content 3: Box Items */}
        {activeTab === 'box' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-100">
              <Check className="w-5 h-5 text-emerald-700 shrink-0" />
              <span className="text-xs sm:text-sm font-bold text-slate-800">دستگاه کارتخوان آکبند تست‌شده شاپرکی</span>
            </div>
            <div className="flex items-center gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-100">
              <Check className="w-5 h-5 text-emerald-700 shrink-0" />
              <span className="text-xs sm:text-sm font-bold text-slate-800">آداپتور و کابل شارژ اورجینال فست‌شارژ</span>
            </div>
            <div className="flex items-center gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-100">
              <Check className="w-5 h-5 text-emerald-700 shrink-0" />
              <span className="text-xs sm:text-sm font-bold text-slate-800">سیم‌کارت فعال شرکتی با بسته اینترنت رایگان</span>
            </div>
            <div className="flex items-center gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-100">
              <Check className="w-5 h-5 text-emerald-700 shrink-0" />
              <span className="text-xs sm:text-sm font-bold text-slate-800">۵ رول کاغذ حرارتی درجه یک هدیه</span>
            </div>
            <div className="flex items-center gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-100">
              <Check className="w-5 h-5 text-emerald-700 shrink-0" />
              <span className="text-xs sm:text-sm font-bold text-slate-800">کارت ضمانت طلایی ۱۸ ماهه هولوگرام‌دار</span>
            </div>
            <div className="flex items-center gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-100">
              <Check className="w-5 h-5 text-emerald-700 shrink-0" />
              <span className="text-xs sm:text-sm font-bold text-slate-800">دفترچه راهنمای فارسی راه‌اندازی و تعویض رول</span>
            </div>
          </div>
        )}

        {/* Tab Content 4: Reviews */}
        {activeTab === 'reviews' && (
          <div className="flex flex-col gap-6">
            {/* Reviews List */}
            <div className="flex flex-col gap-4">
              {reviews.map((rev) => (
                <div key={rev.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">{rev.author}</span>
                      <span className="text-[11px] text-slate-400">({rev.role})</span>
                      {rev.verified && (
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full border border-emerald-200">
                          خریدار تاییدشده
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-slate-400 font-numeric">{rev.date}</span>
                  </div>
                  <div className="flex items-center text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{rev.text}</p>
                </div>
              ))}
            </div>

            {/* Add Review Form */}
            <form onSubmit={handleAddReview} className="bg-slate-50 p-5 rounded-2xl border border-slate-200 flex flex-col gap-3">
              <span className="text-xs font-bold text-slate-800">ثبت دیدگاه یا تجربه شما از این کارتخوان:</span>
              
              {reviewSubmitted && (
                <div className="p-3 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-xl border border-emerald-200">
                  دیدگاه شما با موفقیت ثبت شد و پس از بررسی نمایش داده می‌شود.
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="نام و نام خانوادگی یا نام فروشگاه"
                  required
                  value={newReviewAuthor}
                  onChange={(e) => setNewReviewAuthor(e.target.value)}
                  className="h-10 px-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-800 outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <textarea
                placeholder="نقاط قوت، نحوه آنتن‌دهی، ماندگاری شارژ یا سرعت تراکنش را بنویسید..."
                required
                rows={3}
                value={newReviewText}
                onChange={(e) => setNewReviewText(e.target.value)}
                className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-800 outline-none focus:ring-2 focus:ring-emerald-600 resize-none"
              />

              <button
                type="submit"
                className="self-end h-10 px-6 bg-slate-900 hover:bg-black text-white rounded-xl text-xs font-bold transition-colors"
              >
                ارسال دیدگاه
              </button>
            </form>
          </div>
        )}

      </div>

      {/* Related Models */}
      <div className="flex flex-col gap-6 mt-12">
        <div className="flex items-center justify-between">
          <h3 className="text-lg sm:text-xl font-bold text-slate-900">
            سایر کارتخوان‌های مشابه پیشنهادی
          </h3>
          <button
            onClick={onBackToCatalog}
            className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
          >
            <span>مشاهده همه</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {relatedTerminals.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectRelated(item)}
              className="bg-white p-4 rounded-2xl border border-slate-200 hover:shadow-md transition-all cursor-pointer flex flex-col gap-3 group"
            >
              <div className="bg-slate-50 rounded-xl p-3 h-40 flex items-center justify-center">
                <img src={item.image} alt={item.name} className="h-32 object-contain group-hover:scale-105 transition-transform" />
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] text-emerald-700 font-bold">{item.category === 'smart-android' ? 'لمسی هوشمند' : 'سیار دکمه‌ای'}</span>
                <h4 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">{item.persianName}</h4>
              </div>
              <div className="flex items-baseline justify-between pt-2 border-t border-slate-100">
                <span className="text-xs text-slate-500 font-medium">قیمت:</span>
                <span className="text-sm font-black text-slate-900 font-numeric">{formatPrice(item.price)} تومان</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
