import React, { useState } from 'react';
import { 
  User, 
  ShieldCheck, 
  Smartphone, 
  ArrowLeft, 
  CheckCircle2, 
  CreditCard, 
  TrendingUp, 
  Package, 
  Layers, 
  Clock, 
  LogOut,
  RefreshCw,
  FileText
} from 'lucide-react';
import { formatPrice } from '../data/terminals';

export const CustomerPortalView: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('09123456789');
  const [otpCode, setOtpCode] = useState(['', '', '', '', '']);
  const [rollRequested, setRollRequested] = useState(false);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length >= 10) {
      setStep('otp');
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setStep('phone');
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-10 flex flex-col items-center">
      {!isLoggedIn ? (
        /* Login Card */
        <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 flex flex-col gap-6 my-8">
          <div className="flex flex-col items-center text-center gap-2">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center shadow-inner">
              <User className="w-7 h-7" />
            </div>
            <h1 className="text-xl font-black text-slate-900">ورود به پنل پذیرندگان شاپرک</h1>
            <p className="text-xs text-slate-500">
              مشاهده تراکنش‌ها، وضعیت تسویه‌حساب بانکی و درخواست رول کاغذ
            </p>
          </div>

          {step === 'phone' ? (
            <form onSubmit={handleSendOtp} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5 text-right">
                <label className="text-xs font-bold text-slate-700">
                  شماره موبایل ثبت‌شده در شاپرک
                </label>
                <div className="relative">
                  <Smartphone className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    dir="ltr"
                    maxLength={11}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                    className="w-full h-12 pr-10 pl-4 rounded-xl bg-slate-50 border border-slate-200 text-sm font-numeric text-slate-800 focus:ring-2 focus:ring-emerald-600 focus:bg-white outline-none transition-all text-right"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="h-12 bg-[#006c49] hover:bg-[#005236] text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
              >
                <span>دریافت کد تایید پیامکی</span>
                <ArrowLeft className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 p-3 bg-emerald-50 rounded-xl border border-emerald-100 text-[11px] text-emerald-800">
                <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-700" />
                <span>ورود امن تحت گواهی شاپرک بانک مرکزی جمهوری اسلامی ایران</span>
              </div>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="flex flex-col gap-4 animate-in fade-in duration-200">
              <div className="flex flex-col gap-2 text-center">
                <span className="text-xs text-slate-600">
                  کد تایید ۵ رقمی به شماره <span className="font-bold font-numeric text-slate-900">{phone}</span> پیامک شد:
                </span>
                <div className="flex items-center justify-center gap-2 py-2" dir="ltr">
                  {[...Array(5)].map((_, i) => (
                    <input
                      key={i}
                      type="text"
                      maxLength={1}
                      defaultValue={i + 1}
                      className="w-11 h-12 text-center text-lg font-bold font-numeric rounded-xl bg-slate-50 border border-slate-200 focus:border-emerald-600 outline-none"
                    />
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="h-12 bg-[#006c49] hover:bg-[#005236] text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
              >
                <span>ورود به سامانه</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                <button
                  type="button"
                  onClick={() => setStep('phone')}
                  className="hover:text-slate-800 underline"
                >
                  ویرایش شماره موبایل
                </button>
                <span className="font-numeric">ارسال مجدد کد (۰۱:۴۵)</span>
              </div>
            </form>
          )}
        </div>
      ) : (
        /* Logged In Dashboard */
        <div className="w-full flex flex-col gap-6 animate-in fade-in duration-300">
          
          {/* Dashboard Header Bar */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-lg">
                ع.م
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black text-slate-900">علیرضا محمدی (فروشگاه پارسیان)</span>
                <span className="text-xs text-slate-500 font-numeric">شماره پذیرنده شاپرک: ۱۸۲۴۹۹۲۱۰۳۸</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-3 py-1.5 rounded-full border border-emerald-200 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>سوئیچ شاپرک متصل و آنلاین</span>
              </span>

              <button
                onClick={handleLogout}
                className="h-9 px-3 rounded-xl bg-slate-100 hover:bg-red-50 hover:text-red-700 text-slate-600 text-xs font-bold transition-colors flex items-center gap-1"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>خروج</span>
              </button>
            </div>
          </div>

          {/* Today's Transactions Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col gap-1">
              <span className="text-xs text-slate-500 font-medium">مجموع واریزی امروز</span>
              <span className="text-2xl font-black text-slate-900 font-numeric">
                {formatPrice(38450000)} <span className="text-xs font-normal text-slate-400">تومان</span>
              </span>
              <span className="text-[11px] text-emerald-700 font-bold flex items-center gap-1 mt-1">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+۱۲٪ نسبت به دیروز</span>
              </span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col gap-1">
              <span className="text-xs text-slate-500 font-medium">تعداد تراکنش‌های امروز</span>
              <span className="text-2xl font-black text-slate-900 font-numeric">۴۷ تراکنش</span>
              <span className="text-[11px] text-slate-400 mt-1">بدون تراکنش ناموفق</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col gap-1">
              <span className="text-xs text-slate-500 font-medium">وضعیت تسویه پایا</span>
              <span className="text-base font-bold text-emerald-800">تسویه کامل در سیکل ۱۴:۰۰</span>
              <span className="text-[11px] text-slate-400 mt-1">واریز به حساب بانک ملت</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col gap-2 justify-between">
              <span className="text-xs text-slate-500 font-medium">درخواست سریع رول کاغذ</span>
              {rollRequested ? (
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 p-2 rounded-lg text-center">
                  سفارش ۵ رول رایگان ثبت شد
                </span>
              ) : (
                <button
                  onClick={() => setRollRequested(true)}
                  className="h-9 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold flex items-center justify-center gap-1 transition-colors"
                >
                  <Package className="w-3.5 h-3.5" />
                  <span>ارسال رایگان ۵ رول کاغذ</span>
                </button>
              )}
            </div>
          </div>

          {/* Active POS Terminals */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 flex flex-col gap-4">
            <h2 className="text-lg font-bold text-slate-900">کارتخوان‌های فعال تحت مالکیت شما</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white rounded-xl p-1 border border-slate-200 flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-emerald-700" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-900">Pax A930 اندرویدی لمسی</span>
                    <span className="text-xs text-slate-500 font-numeric">سریال: PAX-9302-8841 | سیم‌کارت 4G</span>
                  </div>
                </div>
                <div className="text-left">
                  <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-full">
                    فعال و آنلاین
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white rounded-xl p-1 border border-slate-200 flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-emerald-700" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-900">Newpos 7210 4G دکمه‌ای</span>
                    <span className="text-xs text-slate-500 font-numeric">سریال: NEW-7210-4419 | سیم‌کارت 4G</span>
                  </div>
                </div>
                <div className="text-left">
                  <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-full">
                    فعال و آنلاین
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Settlements Table */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 flex flex-col gap-4">
            <h2 className="text-lg font-bold text-slate-900">تاریخچه آخرین واریزی‌های شاپرک</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full text-right border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
                    <th className="py-3 px-4">تاریخ و ساعت واریز</th>
                    <th className="py-3 px-4">مبلغ واریز شده</th>
                    <th className="py-3 px-4">سیکل تسویه شاپرک</th>
                    <th className="py-3 px-4">بانک مقصد</th>
                    <th className="py-3 px-4">شماره پیگیری شتاب</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700 font-numeric">
                  <tr>
                    <td className="py-3 px-4">۱۴۰۳/۰۸/۲۴ - ۱۴:۱۵</td>
                    <td className="py-3 px-4 font-bold text-slate-900">{formatPrice(19250000)} تومان</td>
                    <td className="py-3 px-4">سیکل ظهر (۱۴:۰۰)</td>
                    <td className="py-3 px-4">بانک ملت</td>
                    <td className="py-3 px-4">۸۸۹۲۱۴</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">۱۴۰۳/۰۸/۲۴ - ۰۵:۳۰</td>
                    <td className="py-3 px-4 font-bold text-slate-900">{formatPrice(14200000)} تومان</td>
                    <td className="py-3 px-4">سیکل شبانه (۰۵:۰۰)</td>
                    <td className="py-3 px-4">بانک ملت</td>
                    <td className="py-3 px-4">۷۷۴۰۱۲</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">۱۴۰۳/۰۸/۲۳ - ۱۴:۱۰</td>
                    <td className="py-3 px-4 font-bold text-slate-900">{formatPrice(22100000)} تومان</td>
                    <td className="py-3 px-4">سیکل ظهر (۱۴:۰۰)</td>
                    <td className="py-3 px-4">بانک ملت</td>
                    <td className="py-3 px-4">۶۶۱۸۹۳</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};
