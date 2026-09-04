import React, { useState } from 'react';
import { X, PhoneCall, CheckCircle2, ShieldCheck, Sparkles, ArrowLeft } from 'lucide-react';
import { TERMINALS_DATA } from '../data/terminals';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTerminalId?: string;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({ 
  isOpen, 
  onClose,
  defaultTerminalId 
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [guild, setGuild] = useState('retail');
  const [preferredModel, setPreferredModel] = useState(defaultTerminalId || 'newpos-7210');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setName('');
    setPhone('');
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100">
        
        {/* Header Ribbon */}
        <div className="bg-[#131b2e] text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute left-4 top-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            aria-label="بستن پنجره"
          >
            <X className="w-4 h-4" />
          </button>
          
          <div className="flex items-center gap-2.5 text-emerald-400 text-xs font-bold mb-1.5">
            <Sparkles className="w-4 h-4" />
            <span>پاسخگویی سریع توسط کارشناسان ارشد بانکی</span>
          </div>

          <h3 className="text-xl font-bold">درخواست مشاوره رایگان انتخاب کارتخوان</h3>
          <p className="text-slate-300 text-xs mt-1 leading-relaxed">
            فرم زیر را تکمیل نمایید؛ کارشناس فنی پوز‌پلاس ظرف حداکثر ۱۵ دقیقه با شما تماس خواهد گرفت.
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6">
          {submitted ? (
            <div className="py-8 flex flex-col items-center text-center gap-3 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-lg font-bold text-slate-900">
                درخواست شما با موفقیت ثبت شد
              </h4>
              <p className="text-slate-600 text-sm max-w-xs leading-relaxed">
                همکاران ما به زودی با شماره <span className="font-bold text-emerald-800 font-numeric">{phone}</span> تماس خواهند گرفت.
              </p>
              <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl text-xs text-slate-500 mt-2">
                کد رهگیری مشاوره: <span className="font-bold font-numeric text-slate-800">CNS-40918</span>
              </div>
              <button
                onClick={handleReset}
                className="mt-4 px-6 h-11 bg-slate-900 text-white hover:bg-black rounded-lg text-sm font-semibold transition-colors"
              >
                متوجه شدم
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              
              <div className="flex flex-col gap-1.5 text-right">
                <label className="text-xs font-bold text-slate-700">
                  نام و نام خانوادگی
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="مثال: علیرضا محمدی"
                  className="h-12 px-4 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all"
                />
              </div>

              <div className="flex flex-col gap-1.5 text-right">
                <label className="text-xs font-bold text-slate-700">
                  شماره تلفن همراه در دسترس
                </label>
                <input
                  type="tel"
                  required
                  dir="ltr"
                  maxLength={11}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                  className="h-12 px-4 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-800 font-numeric focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all text-right"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5 text-right">
                  <label className="text-xs font-bold text-slate-700">
                    صنف یا نوع کسب‌وکار
                  </label>
                  <select
                    value={guild}
                    onChange={(e) => setGuild(e.target.value)}
                    className="h-12 px-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all"
                  >
                    <option value="retail">خرده‌فروشی و سوپرمارکت</option>
                    <option value="restaurant">رستوران و کافی‌شاپ</option>
                    <option value="clothing">پوشاک و طلا و جواهر</option>
                    <option value="courier">پیک موتوری و خدمات سیار</option>
                    <option value="medical">پزشکی و داروخانه</option>
                    <option value="other">سایر مشاغل</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5 text-right">
                  <label className="text-xs font-bold text-slate-700">
                    دستگاه مد نظر (اختیاری)
                  </label>
                  <select
                    value={preferredModel}
                    onChange={(e) => setPreferredModel(e.target.value)}
                    className="h-12 px-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all"
                  >
                    {TERMINALS_DATA.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name} ({t.category === 'smart-android' ? 'لمسی هوشمند' : 'سیار دکمه‌ای'})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2 p-3 bg-emerald-50 rounded-xl border border-emerald-100 text-xs text-emerald-900">
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>مشاوره و ارزیابی مالیاتی کاملاً رایگان بوده و تعهدی برای خرید ایجاد نمی‌کند.</span>
              </div>

              <div className="pt-2 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 h-12 rounded-xl text-slate-600 hover:bg-slate-100 text-sm font-semibold transition-colors"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  className="flex-1 h-12 rounded-xl bg-[#006c49] hover:bg-[#005236] text-white text-sm font-bold flex items-center justify-center gap-2 shadow-md shadow-emerald-700/20 transition-all active:scale-95"
                >
                  <span>درخواست تماس فوری</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
