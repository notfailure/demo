import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Search, 
  Wrench, 
  Clock, 
  Download, 
  HelpCircle, 
  PhoneCall, 
  CheckCircle2, 
  FileText, 
  RefreshCw, 
  ChevronDown, 
  ChevronUp, 
  AlertTriangle,
  BatteryCharging,
  Printer,
  FileCheck,
  Send
} from 'lucide-react';
import { FAQS_DATA } from '../data/terminals';

export const ServicesSupportView: React.FC = () => {
  // Serial number inquiry state
  const [serialInput, setSerialInput] = useState('PAX-9302-8841');
  const [inquiryResult, setInquiryResult] = useState<null | {
    serial: string;
    model: string;
    owner: string;
    warrantyStatus: 'active' | 'expired';
    daysLeft: number;
    issueCount: number;
  }>({
    serial: 'PAX-9302-8841',
    model: 'Pax A930 هوشمند لمسی',
    owner: 'فروشگاه نارنجستان (رضا کریمی)',
    warrantyStatus: 'active',
    daysLeft: 240,
    issueCount: 0
  });

  const handleSearchSerial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!serialInput.trim()) return;
    setInquiryResult({
      serial: serialInput.toUpperCase(),
      model: serialInput.toLowerCase().includes('7210') ? 'Newpos 7210 4G' : 'Pax A930 هوشمند لمسی',
      owner: 'پذیرنده فعال سامانه شاپرک',
      warrantyStatus: 'active',
      daysLeft: 310,
      issueCount: 0
    });
  };

  // Ticket submission state
  const [ticketName, setTicketName] = useState('');
  const [ticketPhone, setTicketPhone] = useState('');
  const [ticketModel, setTicketModel] = useState('newpos-7210');
  const [ticketIssue, setTicketIssue] = useState('tamper');
  const [ticketDescription, setTicketDescription] = useState('');
  const [ticketSubmitted, setTicketSubmitted] = useState(false);

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTicketSubmitted(true);
  };

  // FAQ accordion state
  const [expandedFaq, setExpandedFaq] = useState<string | null>('faq-1');

  return (
    <div className="flex flex-col w-full">
      {/* Support Hero */}
      <section className="w-full bg-[#eff4ff] py-12 px-4 sm:px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-6 relative z-10">
          <div className="flex flex-col gap-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white rounded-full text-emerald-800 text-xs font-bold w-fit border border-slate-200">
              <Wrench className="w-3.5 h-3.5 text-emerald-700" />
              <span>مرکز تخصصی خدمات پس از فروش و گارانتی شاپرک</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-[#0b1c30]">
              خدمات فنی، پشتیبانی و استعلام گارانتی
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed">
              پوز‌پلاس با در اختیار داشتن بزرگ‌ترین آزمایشگاه تخصصی تعمیرات پایانه‌های فروشگاهی و تامین مستقیم قطعات اورجینال، بالاترین سرعت پشتیبانی را برای پذیرندگان سراسر کشور تضمین می‌کند.
            </p>
          </div>

          <a
            href="tel:02188880000"
            className="inline-flex items-center gap-2 h-12 px-6 rounded-xl bg-[#006c49] text-white hover:bg-[#005236] font-bold text-xs sm:text-sm shadow-md transition-colors"
          >
            <PhoneCall className="w-4 h-4" />
            <span>واحد پشتیبانی ۲۴ ساعته: ۰۲۱-۸۸۸۸۰۰۰۰</span>
          </a>
        </div>
      </section>

      {/* Serial / Warranty Inquiry Tool */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 -mt-6 relative z-20 w-full">
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 flex flex-col gap-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-col">
              <h2 className="text-lg font-bold text-slate-900">استعلام آنلاین اصالت و اعتبار گارانتی دستگاه</h2>
              <span className="text-xs text-slate-500">شماره سریال (S/N) درج‌شده در پشت بدنه دستگاه کارتخوان را وارد فرمایید:</span>
            </div>

            <form onSubmit={handleSearchSerial} className="flex items-center gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:w-72">
                <input
                  type="text"
                  value={serialInput}
                  onChange={(e) => setSerialInput(e.target.value)}
                  placeholder="مثال: PAX-9302-8841"
                  className="w-full h-11 px-4 rounded-xl bg-slate-50 border border-slate-200 text-sm font-numeric text-slate-800 outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all text-left"
                  dir="ltr"
                />
              </div>
              <button
                type="submit"
                className="h-11 px-5 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold transition-colors shrink-0 flex items-center gap-1.5"
              >
                <Search className="w-3.5 h-3.5" />
                <span>استعلام</span>
              </button>
            </form>
          </div>

          {/* Inquiry Live Result Card */}
          {inquiryResult && (
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-in fade-in duration-200">
              <div className="flex flex-col">
                <span className="text-xs text-slate-400">مدل پایانه:</span>
                <span className="text-sm font-bold text-slate-800">{inquiryResult.model}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-slate-400">وضعیت گارانتی طلایی:</span>
                <span className="text-sm font-bold text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>معتبر و فعال ({inquiryResult.daysLeft} روز باقیمانده)</span>
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-slate-400">شماره سریال شاپرک:</span>
                <span className="text-sm font-bold font-numeric text-slate-800">{inquiryResult.serial}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-slate-400">مرکز تخصصی پذیرش:</span>
                <span className="text-sm font-bold text-slate-800">مرکز فنی ولیعصر تهران</span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 4 Primary Maintenance Services with Turnaround Time */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 w-full">
        <div className="flex flex-col gap-2 text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-4 py-1 rounded-full border border-emerald-200">
            تعهدات پشتیبانی
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0b1c30]">
            خدمات تخصصی تعمیرات و تعویض قطعات
          </h2>
          <p className="text-sm text-slate-600">
            تمام خدمات تحت استانداردهای امنیتی شاپرک و در کوتاه‌ترین زمان ممکن انجام می‌گردند.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">رفع خطای تمپر (Tamper)</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              تزریق مجدد کلیدهای رمزنگاری شاپرک پس از ضربه یا باز شدن بدنه با ابزارهای امنیتی رسمی کارخانه.
            </p>
            <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400">مدت زمان:</span>
              <span className="font-bold text-emerald-800">حداکثر ۲۴ ساعت کاری</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center">
              <Printer className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">تعویض پرینتر و چرخ‌دنده</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              رفع مشکل عدم چاپ رسید، کم‌رنگ بودن نوشته یا گیر کردن رول کاغذ با تعویض هد حرارتی اصل ژاپن.
            </p>
            <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400">مدت زمان:</span>
              <span className="font-bold text-emerald-800">۳۰ دقیقه (تعمیر فوری حضوری)</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <BatteryCharging className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">تعویض و احیای باتری</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              ارائه باتری‌های سلول ژاپنی با ماندگاری بالا و پایداری شارژ برای اصناف پرتراکنش و پخش سرد.
            </p>
            <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400">مدت زمان:</span>
              <span className="font-bold text-emerald-800">تحویل آنی در محل یا ارسال</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-3">
            <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center">
              <RefreshCw className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">تغییر حساب و انتقال مالکیت</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              تغییر شماره شبا مقصد تراکنش‌ها یا انتقال قانونی و قطعی کارتخوان به شخص یا کسب‌وکار دیگر.
            </p>
            <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400">مدت زمان:</span>
              <span className="font-bold text-emerald-800">۴۸ ساعت در سوییچ شاپرک</span>
            </div>
          </div>
        </div>
      </section>

      {/* Online Repair Ticket & File Downloads */}
      <section className="w-full bg-[#eff4ff] py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Repair Ticket Form (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-bold text-slate-900">ثبت آنلاین تیکت خرابی یا درخواست تعمیر</h3>
              <span className="text-xs text-slate-500">پس از ثبت، تکنسین مربوطه جهت هماهنگی دریافت دستگاه با شما تماس خواهد گرفت.</span>
            </div>

            {ticketSubmitted ? (
              <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 flex flex-col items-center text-center gap-3 animate-in zoom-in-95">
                <CheckCircle2 className="w-12 h-12 text-emerald-700" />
                <h4 className="text-base font-bold text-slate-900">درخواست تعمیر شما ثبت گردید</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  کد رهگیری تیکت پشتیبانی: <span className="font-bold font-numeric text-emerald-800">TCK-88102</span>
                  <br />
                  پیک اختصاصی شرکت جهت تحویل دستگاه یا رفع اشکال نرم‌افزاری با شما تماس خواهد گرفت.
                </p>
                <button
                  onClick={() => setTicketSubmitted(false)}
                  className="mt-2 text-xs font-bold text-slate-700 underline"
                >
                  ثبت درخواست جدید
                </button>
              </div>
            ) : (
              <form onSubmit={handleTicketSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1 text-right">
                    <label className="text-xs font-bold text-slate-700">نام پذیرنده / صاحب دستگاه *</label>
                    <input
                      type="text"
                      required
                      placeholder="حمیدرضا احمدی"
                      value={ticketName}
                      onChange={(e) => setTicketName(e.target.value)}
                      className="h-11 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-600 focus:bg-white outline-none"
                    />
                  </div>

                  <div className="flex flex-col gap-1 text-right">
                    <label className="text-xs font-bold text-slate-700">شماره تلفن در دسترس *</label>
                    <input
                      type="tel"
                      required
                      dir="ltr"
                      placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                      value={ticketPhone}
                      onChange={(e) => setTicketPhone(e.target.value)}
                      className="h-11 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-numeric focus:ring-2 focus:ring-emerald-600 focus:bg-white outline-none text-right"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1 text-right">
                    <label className="text-xs font-bold text-slate-700">مدل دستگاه کارتخوان</label>
                    <select
                      value={ticketModel}
                      onChange={(e) => setTicketModel(e.target.value)}
                      className="h-11 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-600 focus:bg-white outline-none"
                    >
                      <option value="pax-a930">Pax A930 هوشمند</option>
                      <option value="newpos-7210">Newpos 7210 4G</option>
                      <option value="morefun-h9">Morefun H9</option>
                      <option value="pax-s90">Pax S90</option>
                      <option value="nexgo-g3">Nexgo G3</option>
                      <option value="other">سایر مدل‌ها</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1 text-right">
                    <label className="text-xs font-bold text-slate-700">نوع ایراد یا نیاز به سرویس</label>
                    <select
                      value={ticketIssue}
                      onChange={(e) => setTicketIssue(e.target.value)}
                      className="h-11 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-600 focus:bg-white outline-none"
                    >
                      <option value="tamper">خطای تمپر یا قفل سخت‌افزاری</option>
                      <option value="printer">خرابی چاپگر یا گیر کردن کاغذ</option>
                      <option value="battery">خالی شدن سریع باتری یا شارژ نشدن</option>
                      <option value="connection">خطای ارتباط با سوییچ شاپرک</option>
                      <option value="account_change">درخواست تغییر شماره حساب بانکی</option>
                      <option value="ownership">انتقال مالکیت به پذیرنده جدید</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1 text-right">
                  <label className="text-xs font-bold text-slate-700">شرح دقیق مشکل (اختیاری)</label>
                  <textarea
                    rows={3}
                    placeholder="پیام نمایش‌داده شده روی صفحه، علت بروز خطا و یا ساعت مناسب جهت تماس کارشناس..."
                    value={ticketDescription}
                    onChange={(e) => setTicketDescription(e.target.value)}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-600 focus:bg-white outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="h-11 bg-[#006c49] hover:bg-[#005236] text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md active:scale-95"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>ثبت تیکت و اعزام پیک پشتیبانی</span>
                </button>
              </form>
            )}
          </div>

          {/* Downloadable Documents Repository (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 flex flex-col gap-4">
              <h3 className="text-lg font-bold text-slate-900">فرم‌ها و نرم‌افزارهای مورد نیاز</h3>
              <span className="text-xs text-slate-500">جهت تسریع در امور اداری و تغییرات سوییچ:</span>

              <div className="flex flex-col gap-3">
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <FileText className="w-4 h-4 text-emerald-700" />
                    <div className="flex flex-col text-right">
                      <span className="text-xs font-bold text-slate-800">فرم تغییر حساب شاپرک</span>
                      <span className="text-[10px] text-slate-400">فرمت PDF - حجم ۱.۲ مگابایت</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => alert('دانلود فرم تغییر حساب شاپرک انجام شد.')}
                    className="p-2 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700"
                    title="دانلود فایل"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <FileText className="w-4 h-4 text-emerald-700" />
                    <div className="flex flex-col text-right">
                      <span className="text-xs font-bold text-slate-800">استشهاد محلی مشاغل بدون جواز</span>
                      <span className="text-[10px] text-slate-400">فرمت PDF تاییدشده شاپرک</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => alert('دانلود استشهاد محلی انجام شد.')}
                    className="p-2 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700"
                    title="دانلود فایل"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Download className="w-4 h-4 text-emerald-700" />
                    <div className="flex flex-col text-right">
                      <span className="text-xs font-bold text-slate-800">درایور و نرم‌افزار اتصال به PC</span>
                      <span className="text-[10px] text-slate-400">ویندوز ۱۰ و ۱۱ - اتصال به هلو و سپیدار</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => alert('دانلود درایور کامپیوتر آغاز شد.')}
                    className="p-2 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700"
                    title="دانلود فایل"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Central Repair Office Box */}
            <div className="bg-[#131b2e] text-white rounded-3xl p-6 flex flex-col gap-2.5">
              <span className="text-xs text-emerald-400 font-bold">مرکز پذیرش حضوری و آزمایشگاه مرکزی:</span>
              <p className="text-xs text-slate-300 leading-relaxed">
                تهران، خیابان ولیعصر، تقاطع شهید بهشتی، برج فناوری مالی پوز‌پلاس، طبقه ۶
              </p>
              <span className="text-xs text-slate-400 font-numeric">
                ساعت پذیرش: شنبه تا چهارشنبه ۸:۰۰ الی ۱۸:۰۰ | پنج‌شنبه ۸:۰۰ الی ۱۳:۰۰
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* Frequently Asked Questions Accordion */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 w-full">
        <div className="flex flex-col gap-2 text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-4 py-1 rounded-full border border-emerald-200">
            پاسخ به ابهامات رایج
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0b1c30]">
            پرسش‌های متداول پذیرندگان و خریداران کارتخوان
          </h2>
        </div>

        <div className="max-w-3xl mx-auto flex flex-col gap-3">
          {FAQS_DATA.map((faq) => {
            const isExpanded = expandedFaq === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden transition-all shadow-xs"
              >
                <button
                  onClick={() => setExpandedFaq(isExpanded ? null : faq.id)}
                  className="w-full p-5 text-right flex items-center justify-between gap-4 font-bold text-sm text-slate-900 hover:text-emerald-800 transition-colors"
                >
                  <span>{faq.question}</span>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-emerald-700 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                  )}
                </button>

                {isExpanded && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3 animate-in fade-in duration-150">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
