import React, { useState } from 'react';
import { 
  CheckCircle2, 
  ArrowLeft, 
  ArrowRight, 
  Upload, 
  FileText, 
  ShieldCheck, 
  CreditCard, 
  User, 
  Building2, 
  HelpCircle, 
  Sparkles, 
  Download, 
  PhoneCall, 
  Trash2,
  AlertCircle
} from 'lucide-react';
import { POSTerminal } from '../types';
import { formatPrice } from '../data/terminals';

interface OrderRegistrationViewProps {
  selectedTerminal: POSTerminal;
  onNavigateToCatalog: () => void;
  warrantyTier?: 'golden' | 'vip';
  selectedColor?: string;
}

export const OrderRegistrationView: React.FC<OrderRegistrationViewProps> = ({
  selectedTerminal,
  onNavigateToCatalog,
  warrantyTier = 'golden',
  selectedColor = 'مشکی مات',
}) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State
  const [fullName, setFullName] = useState('');
  const [nationalCode, setNationalCode] = useState('');
  const [phone, setPhone] = useState('');
  const [landline, setLandline] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [guildCategory, setGuildCategory] = useState('supermarket');
  const [postalCode, setPostalCode] = useState('');
  const [address, setAddress] = useState('');

  // Step 2: Bank & Tax
  const [bankName, setBankName] = useState('mellat');
  const [accountHolder, setAccountHolder] = useState('');
  const [iban, setIban] = useState('');
  const [taxOption, setTaxOption] = useState<'existing' | 'free_registration'>('free_registration');
  const [taxCode, setTaxCode] = useState('');

  // Step 3: Documents
  const [nationalCardFile, setNationalCardFile] = useState<string | null>(null);
  const [birthCertFile, setBirthCertFile] = useState<string | null>(null);
  const [bankSheetFile, setBankSheetFile] = useState<string | null>(null);

  // Errors state
  const [errorMsg, setErrorMsg] = useState('');

  // Simulated file upload
  const handleSimulatedUpload = (type: 'national' | 'birth' | 'bank') => {
    const mockFileUrl = 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&q=80';
    if (type === 'national') setNationalCardFile(mockFileUrl);
    if (type === 'birth') setBirthCertFile(mockFileUrl);
    if (type === 'bank') setBankSheetFile(mockFileUrl);
  };

  const handleNextStep = () => {
    setErrorMsg('');
    if (currentStep === 1) {
      if (!fullName || !nationalCode || !phone || !postalCode || !address) {
        setErrorMsg('لطفاً تمامی فیلدهای ستاره‌دار الزامی را تکمیل فرمایید.');
        return;
      }
      if (nationalCode.length !== 10) {
        setErrorMsg('کد ملی باید دقیقاً ۱۰ رقم باشد.');
        return;
      }
      if (phone.length !== 11) {
        setErrorMsg('شماره تلفن همراه باید ۱۱ رقم با پیش‌شماره ۰۹ باشد.');
        return;
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (!accountHolder || !iban) {
        setErrorMsg('نام دارنده حساب و شماره شبا ۲۴ رقمی الزامی است.');
        return;
      }
      setCurrentStep(3);
    } else if (currentStep === 3) {
      if (!nationalCardFile && !birthCertFile && !bankSheetFile) {
        // Allow user to proceed with notice or automatic demo preview
        handleSimulatedUpload('national');
        handleSimulatedUpload('birth');
        handleSimulatedUpload('bank');
      }
      setCurrentStep(4);
    }
  };

  const finalPrice = selectedTerminal.price + (warrantyTier === 'vip' ? 350000 : 0);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col gap-8">
      
      {/* Header Banner */}
      <div className="bg-[#eff4ff] rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-slate-200">
        <div className="flex flex-col gap-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white rounded-full text-emerald-800 text-xs font-bold w-fit border border-slate-200">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>سامانه امن ثبت پذیرندگان رسمی شاپرک</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0b1c30]">
            ثبت سفارش آنلاین و تخصیص سوییچ بانکی
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            مدارک و اطلاعات هویتی شما صرفاً جهت تخصیص ترمینال در شاپرک استفاده شده و پس از ثبت، دستگاه با پست پیشتاز یا پیک ارسال می‌گردد.
          </p>
        </div>

        {/* Wizard Steps Indicator */}
        <div className="flex items-center gap-2 sm:gap-3 bg-white p-2.5 rounded-2xl border border-slate-200 shadow-xs shrink-0 font-numeric">
          {[
            { num: 1, label: 'اطلاعات هویتی' },
            { num: 2, label: 'حساب بانکی' },
            { num: 3, label: 'ارسال مدارک' },
            { num: 4, label: 'تایید نهایی' }
          ].map((s) => (
            <div key={s.num} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold transition-all ${
                  currentStep === s.num
                    ? 'bg-[#006c49] text-white shadow-xs'
                    : currentStep > s.num
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-slate-100 text-slate-400'
                }`}
              >
                {currentStep > s.num ? <CheckCircle2 className="w-4 h-4" /> : s.num}
              </div>
              <span className="text-xs font-bold text-slate-700 hidden lg:inline">{s.label}</span>
              {s.num < 4 && <div className="w-3 h-0.5 bg-slate-200"></div>}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Grid: Form (8 cols) + Selected Terminal Summary (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left/Main: Form Steps */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
          
          {errorMsg && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm font-bold flex items-center gap-2">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* STEP 1: Personal & Business Info */}
          {currentStep === 1 && (
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-1 border-b border-slate-100 pb-4">
                <h2 className="text-lg font-bold text-slate-900">مرحله اول: مشخصات هویتی و محل کسب</h2>
                <span className="text-xs text-slate-500">اطلاعات باید دقیقاً منطبق با کارت ملی دارنده حساب بانکی باشد.</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5 text-right">
                  <label className="text-xs font-bold text-slate-700">نام و نام خانوادگی کامل *</label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: حمیدرضا احمدی"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="h-12 px-4 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all"
                  />
                </div>

                <div className="flex flex-col gap-1.5 text-right">
                  <label className="text-xs font-bold text-slate-700">کد ملی ۱۰ رقمی *</label>
                  <input
                    type="text"
                    required
                    dir="ltr"
                    maxLength={10}
                    placeholder="۰۰۱۲۳۴۵۶۷۸"
                    value={nationalCode}
                    onChange={(e) => setNationalCode(e.target.value)}
                    className="h-12 px-4 rounded-xl bg-slate-50 border border-slate-200 text-sm font-numeric focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all text-right"
                  />
                </div>

                <div className="flex flex-col gap-1.5 text-right">
                  <label className="text-xs font-bold text-slate-700">شماره موبایل (به‌نام صاحب کارت ملی) *</label>
                  <input
                    type="tel"
                    required
                    dir="ltr"
                    maxLength={11}
                    placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="h-12 px-4 rounded-xl bg-slate-50 border border-slate-200 text-sm font-numeric focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all text-right"
                  />
                </div>

                <div className="flex flex-col gap-1.5 text-right">
                  <label className="text-xs font-bold text-slate-700">تاریخ تولد دقیق (روز/ماه/سال)</label>
                  <input
                    type="text"
                    placeholder="۱۳۶۵/۰۴/۱۵"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    className="h-12 px-4 rounded-xl bg-slate-50 border border-slate-200 text-sm font-numeric focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all"
                  />
                </div>

                <div className="flex flex-col gap-1.5 text-right">
                  <label className="text-xs font-bold text-slate-700">نام فروشگاه، مطب یا کسب‌وکار</label>
                  <input
                    type="text"
                    placeholder="مثال: فروشگاه پوشاک پارسیان"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="h-12 px-4 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all"
                  />
                </div>

                <div className="flex flex-col gap-1.5 text-right">
                  <label className="text-xs font-bold text-slate-700">دسته‌بندی صنف کاری</label>
                  <select
                    value={guildCategory}
                    onChange={(e) => setGuildCategory(e.target.value)}
                    className="h-12 px-3 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all"
                  >
                    <option value="supermarket">سوپرمارکت و مواد غذایی</option>
                    <option value="clothing">پوشاک، کیف و کفش</option>
                    <option value="restaurant">رستوران، فست‌فود و کافی‌شاپ</option>
                    <option value="medical">پزشکی، دندانپزشکی و داروخانه</option>
                    <option value="services">خدمات سیار، فنی و مهندسی</option>
                    <option value="freelance">مشاغل خانگی و بدون جواز</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5 text-right">
                  <label className="text-xs font-bold text-slate-700">کد پستی ۱۰ رقمی محل نصب/تحویل *</label>
                  <input
                    type="text"
                    required
                    dir="ltr"
                    maxLength={10}
                    placeholder="۱۲۳۴۵۶۷۸۹۰"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="h-12 px-4 rounded-xl bg-slate-50 border border-slate-200 text-sm font-numeric focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all text-right"
                  />
                </div>

                <div className="flex flex-col gap-1.5 text-right">
                  <label className="text-xs font-bold text-slate-700">تلفن ثابت (اختیاری)</label>
                  <input
                    type="tel"
                    dir="ltr"
                    placeholder="۰۲۱۲۲۳۳۴۴۵۵"
                    value={landline}
                    onChange={(e) => setLandline(e.target.value)}
                    className="h-12 px-4 rounded-xl bg-slate-50 border border-slate-200 text-sm font-numeric focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all text-right"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5 text-right">
                <label className="text-xs font-bold text-slate-700">آدرس دقیق پستی تحویل دستگاه *</label>
                <textarea
                  rows={2}
                  required
                  placeholder="استان، شهر، خیابان اصلی، کوچه، پلاک، طبقه و واحد"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all resize-none"
                />
              </div>

              <div className="flex items-center justify-end pt-4">
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="h-12 px-8 rounded-xl bg-[#006c49] hover:bg-[#005236] text-white text-sm font-bold flex items-center gap-2 shadow-md transition-all active:scale-95"
                >
                  <span>مرحله بعد: اطلاعات بانکی و مالیات</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Bank Account & Tax */}
          {currentStep === 2 && (
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-1 border-b border-slate-100 pb-4">
                <h2 className="text-lg font-bold text-slate-900">مرحله دوم: شماره حساب بانکی و وضعیت مالیاتی</h2>
                <span className="text-xs text-slate-500">کارتخوان شما مستقیماً به این حساب شتابی متصل خواهد شد.</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5 text-right">
                  <label className="text-xs font-bold text-slate-700">بانک مقصد واریز تراکنش‌ها *</label>
                  <select
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    className="h-12 px-3 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all"
                  >
                    <option value="mellat">بانک ملت</option>
                    <option value="melli">بانک ملی ایران</option>
                    <option value="saderat">بانک صادرات</option>
                    <option value="tejarat">بانک تجارت</option>
                    <option value="sepah">بانک سپه</option>
                    <option value="pasargad">بانک پاسارگاد</option>
                    <option value="saman">بانک سامان</option>
                    <option value="parsian">بانک پارسیان</option>
                    <option value="keshavarzi">بانک کشاورزی</option>
                    <option value="refah">بانک رفاه کارگران</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5 text-right">
                  <label className="text-xs font-bold text-slate-700">نام دارنده حساب (مطابق با کارت ملی) *</label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: حمیدرضا احمدی"
                    value={accountHolder}
                    onChange={(e) => setAccountHolder(e.target.value)}
                    className="h-12 px-4 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5 text-right">
                <label className="text-xs font-bold text-slate-700">شماره شبا بانکی (۲۴ رقم بدون IR) *</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400 font-mono text-sm">
                    IR
                  </span>
                  <input
                    type="text"
                    required
                    dir="ltr"
                    maxLength={24}
                    placeholder="۰۱۲۳۴۵۶۷۸۹۰۱۲۳۴۵۶۷۸۹۰۱۲۴"
                    value={iban}
                    onChange={(e) => setIban(e.target.value)}
                    className="h-12 pl-12 pr-4 rounded-xl bg-slate-50 border border-slate-200 text-sm font-numeric focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all text-right"
                  />
                </div>
                <span className="text-[11px] text-slate-400">
                  شماره شبا روی کارت بانکی، دفترچه حساب یا سامانه اینترنت بانک درج گردیده است.
                </span>
              </div>

              {/* Tax Setup Selection */}
              <div className="flex flex-col gap-3 pt-2">
                <span className="text-xs font-bold text-slate-700">وضعیت پرونده و کد مالیاتی:</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div
                    onClick={() => setTaxOption('free_registration')}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col gap-1.5 ${
                      taxOption === 'free_registration'
                        ? 'border-emerald-700 bg-emerald-50/60 ring-2 ring-emerald-700/20'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">ثبت نام رایگان مالیاتی توسط پوز‌پلاس</span>
                      <span className="text-[10px] bg-emerald-700 text-white font-bold px-2 py-0.5 rounded-full">هدیه</span>
                    </div>
                    <span className="text-[11px] text-slate-500 leading-relaxed">
                      کارشناسان ما بدون دریافت هزینه کد رهگیری مالیاتی را در سامانه مایتکس (my.tax.gov.ir) برای شما ایجاد می‌کنند.
                    </span>
                  </div>

                  <div
                    onClick={() => setTaxOption('existing')}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col gap-1.5 ${
                      taxOption === 'existing'
                        ? 'border-emerald-700 bg-emerald-50/60 ring-2 ring-emerald-700/20'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">دارای کد رهگیری مالیاتی فعال هستم</span>
                    </div>
                    <span className="text-[11px] text-slate-500 leading-relaxed">
                      اگر قبلاً در اداره امور مالیاتی ثبت‌نام کرده‌اید، کد ۱۰ رقمی خود را وارد نمایید.
                    </span>
                  </div>
                </div>

                {taxOption === 'existing' && (
                  <div className="flex flex-col gap-1.5 text-right mt-2">
                    <label className="text-xs font-bold text-slate-700">کد رهگیری مالیاتی ۱۰ رقمی</label>
                    <input
                      type="text"
                      dir="ltr"
                      maxLength={10}
                      placeholder="۱۲۳۴۵۶۷۸۹۰"
                      value={taxCode}
                      onChange={(e) => setTaxCode(e.target.value)}
                      className="h-12 px-4 rounded-xl bg-slate-50 border border-slate-200 text-sm font-numeric focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all text-right"
                    />
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="h-12 px-6 rounded-xl text-slate-600 hover:bg-slate-100 text-sm font-semibold transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-4 h-4" />
                  <span>بازگشت به مرحله قبل</span>
                </button>

                <button
                  type="button"
                  onClick={handleNextStep}
                  className="h-12 px-8 rounded-xl bg-[#006c49] hover:bg-[#005236] text-white text-sm font-bold flex items-center gap-2 shadow-md transition-all active:scale-95"
                >
                  <span>مرحله بعد: بارگذاری مدارک</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Document Uploads */}
          {currentStep === 3 && (
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-1 border-b border-slate-100 pb-4">
                <h2 className="text-lg font-bold text-slate-900">مرحله سوم: ارسال مدارک هویتی</h2>
                <span className="text-xs text-slate-500">تصاویر با فرمت JPG یا PNG و با کیفیت خوانا ارسال شوند.</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Doc 1: National Card */}
                <div className="p-4 rounded-2xl border-2 border-dashed border-slate-300 hover:border-emerald-600 transition-colors flex flex-col items-center text-center gap-3 bg-slate-50/50">
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                    <User className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-slate-800">تصویر کارت ملی</span>
                  <span className="text-[10px] text-slate-400">عکس واضح از پشت و رو یا رسید ثبت‌نام هوشمند</span>

                  {nationalCardFile ? (
                    <div className="w-full flex items-center justify-between bg-emerald-50 border border-emerald-200 p-2 rounded-xl text-xs text-emerald-800">
                      <span className="truncate max-w-[100px]">کارت ملی آپلود شد</span>
                      <button onClick={() => setNationalCardFile(null)} className="text-red-500 p-1">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleSimulatedUpload('national')}
                      className="w-full h-9 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-xs font-bold text-slate-700 transition-colors flex items-center justify-center gap-1"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>انتخاب فایل</span>
                    </button>
                  )}
                </div>

                {/* Doc 2: Birth Certificate */}
                <div className="p-4 rounded-2xl border-2 border-dashed border-slate-300 hover:border-emerald-600 transition-colors flex flex-col items-center text-center gap-3 bg-slate-50/50">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center">
                    <FileText className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-slate-800">صفحه اول شناسنامه</span>
                  <span className="text-[10px] text-slate-400">حاوی مشخصات سجلی و شماره شناسنامه</span>

                  {birthCertFile ? (
                    <div className="w-full flex items-center justify-between bg-emerald-50 border border-emerald-200 p-2 rounded-xl text-xs text-emerald-800">
                      <span className="truncate max-w-[100px]">شناسنامه آپلود شد</span>
                      <button onClick={() => setBirthCertFile(null)} className="text-red-500 p-1">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleSimulatedUpload('birth')}
                      className="w-full h-9 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-xs font-bold text-slate-700 transition-colors flex items-center justify-center gap-1"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>انتخاب فایل</span>
                    </button>
                  )}
                </div>

                {/* Doc 3: Bank Sheet */}
                <div className="p-4 rounded-2xl border-2 border-dashed border-slate-300 hover:border-emerald-600 transition-colors flex flex-col items-center text-center gap-3 bg-slate-50/50">
                  <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                    <CreditCard className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-slate-800">تاییدیه شماره شبا</span>
                  <span className="text-[10px] text-slate-400">اسکرین‌شات از اینترنت بانک یا برگه شعبه</span>

                  {bankSheetFile ? (
                    <div className="w-full flex items-center justify-between bg-emerald-50 border border-emerald-200 p-2 rounded-xl text-xs text-emerald-800">
                      <span className="truncate max-w-[100px]">تاییدیه شبا آپلود شد</span>
                      <button onClick={() => setBankSheetFile(null)} className="text-red-500 p-1">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleSimulatedUpload('bank')}
                      className="w-full h-9 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-xs font-bold text-slate-700 transition-colors flex items-center justify-center gap-1"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>انتخاب فایل</span>
                    </button>
                  )}
                </div>
              </div>

              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-900 leading-relaxed flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
                <span>اگر مدارک هم‌اکنون در دسترستان نیست، می‌توانید سفارش را ثبت فرمایید؛ کارشناسان پذیرندگان پوز‌پلاس از طریق پیام‌رسان بله یا ایتا مدارک را از شما دریافت خواهند نمود.</span>
              </div>

              <div className="flex items-center justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="h-12 px-6 rounded-xl text-slate-600 hover:bg-slate-100 text-sm font-semibold transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-4 h-4" />
                  <span>بازگشت به مرحله قبل</span>
                </button>

                <button
                  type="button"
                  onClick={handleNextStep}
                  className="h-12 px-8 rounded-xl bg-[#006c49] hover:bg-[#005236] text-white text-sm font-bold flex items-center gap-2 shadow-md transition-all active:scale-95"
                >
                  <span>تکمیل و ثبت نهایی سفارش</span>
                  <CheckCircle2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Order Confirmation & Receipt */}
          {currentStep === 4 && (
            <div className="flex flex-col items-center text-center gap-4 py-8 animate-in zoom-in-95 duration-200">
              <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shadow-md">
                <CheckCircle2 className="w-12 h-12" />
              </div>

              <div className="flex flex-col gap-1 max-w-md">
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 w-fit mx-auto">
                  پرونده با موفقیت به شاپرک ارسال گردید
                </span>
                <h2 className="text-2xl font-black text-slate-900 mt-2">
                  سفارش کارتخوان شما با موفقیت ثبت شد!
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-1">
                  پذیرنده گرامی، دستگاه <span className="font-bold text-slate-900">{selectedTerminal.persianName}</span> پس از بارگذاری نرم‌افزار سوییچ و تست نهایی توسط پیک به آدرس شما ارسال خواهد شد.
                </p>
              </div>

              {/* Receipt Specs Box */}
              <div className="w-full max-w-md bg-slate-50 rounded-2xl p-5 border border-slate-200 text-right flex flex-col gap-2.5 my-2">
                <div className="flex items-center justify-between text-xs border-b border-slate-200 pb-2">
                  <span className="text-slate-500">کد پیگیری سفارش شاپرکی:</span>
                  <span className="font-numeric font-black text-emerald-800 text-sm">SHP-1403-88219</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">نام پذیرنده:</span>
                  <span className="font-bold text-slate-800">{fullName || 'حمیدرضا احمدی'}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">بانک متصل:</span>
                  <span className="font-bold text-slate-800">بانک ملت (شبا IR...)</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">بسته گارانتی:</span>
                  <span className="font-bold text-slate-800">
                    {warrantyTier === 'vip' ? '۲۴ ماهه الماس VIP' : '۱۸ ماهه طلایی تعویض'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs border-t border-slate-200 pt-2 font-numeric">
                  <span className="text-slate-500 font-bold">مبلغ نهایی (پرداخت درب محل):</span>
                  <span className="font-black text-slate-900 text-base">{formatPrice(finalPrice)} تومان</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => alert('رسید ثبت‌نام سفارش کارتخوان با فرمت PDF دانلود شد.')}
                  className="h-11 px-5 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>دانلود رسید ثبت‌نام (PDF)</span>
                </button>

                <button
                  onClick={onNavigateToCatalog}
                  className="h-11 px-5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
                >
                  بازگشت به کاتالوگ کارتخوان‌ها
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Right Sidebar: Selected Terminal Summary */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 flex flex-col gap-4 sticky top-24">
            <span className="text-xs font-bold text-slate-500">دستگاه انتخاب‌شده:</span>
            
            <div className="flex items-center gap-4 bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
              <img
                src={selectedTerminal.image}
                alt={selectedTerminal.name}
                className="w-16 h-16 object-contain"
              />
              <div className="flex flex-col">
                <span className="font-bold text-slate-900 text-sm">{selectedTerminal.name}</span>
                <span className="text-xs text-emerald-700 font-medium">{selectedTerminal.persianName}</span>
                <span className="text-[11px] text-slate-400 mt-1 font-numeric">
                  سرعت: {selectedTerminal.transactionSpeed}
                </span>
              </div>
            </div>

            <div className="flex flex-col divide-y divide-slate-100 text-xs">
              <div className="py-2.5 flex items-center justify-between">
                <span className="text-slate-500">رنگ انتخابی:</span>
                <span className="font-bold text-slate-800">{selectedColor}</span>
              </div>
              <div className="py-2.5 flex items-center justify-between">
                <span className="text-slate-500">بسته گارانتی:</span>
                <span className="font-bold text-slate-800">
                  {warrantyTier === 'vip' ? 'الماس ۲۴ ماهه' : 'طلایی ۱۸ ماهه'}
                </span>
              </div>
              <div className="py-2.5 flex items-center justify-between">
                <span className="text-slate-500">هزینه ثبت مالیاتی:</span>
                <span className="font-bold text-emerald-700">رایگان (هدیه)</span>
              </div>
              <div className="py-2.5 flex items-center justify-between">
                <span className="text-slate-500">سیم‌کارت فعال + ۵ رول:</span>
                <span className="font-bold text-emerald-700">رایگان (هدیه)</span>
              </div>
              <div className="py-2.5 flex items-center justify-between">
                <span className="text-slate-500">هزینه ارسال:</span>
                <span className="font-bold text-emerald-700">رایگان در سراسر ایران</span>
              </div>
              <div className="py-3 flex items-baseline justify-between border-t-2 border-slate-200">
                <span className="text-sm font-bold text-slate-900">مبلغ نهایی:</span>
                <div className="flex items-baseline gap-1 font-numeric">
                  <span className="text-xl font-black text-slate-900">{formatPrice(finalPrice)}</span>
                  <span className="text-xs text-slate-500">تومان</span>
                </div>
              </div>
            </div>

            <div className="bg-[#eff4ff] p-3 rounded-xl text-center text-xs text-slate-600 font-medium">
              پرداخت در زمان تحویل با کارتخوان سیار پیک امکان‌پذیر است.
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
