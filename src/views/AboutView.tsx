import React from 'react';
import { 
  Building2, 
  ShieldCheck, 
  Award, 
  Users, 
  Truck, 
  Headphones, 
  PhoneCall, 
  ArrowLeft,
  CheckCircle2,
  MapPin,
  Clock,
  Briefcase
} from 'lucide-react';

interface AboutViewProps {
  onOpenConsultation: () => void;
  onNavigateToCatalog: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ 
  onOpenConsultation, 
  onNavigateToCatalog 
}) => {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Header */}
      <section className="w-full bg-[#eff4ff] py-14 px-4 sm:px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col gap-4 relative z-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white rounded-full text-emerald-800 text-xs font-bold w-fit mx-auto border border-slate-200">
            <Building2 className="w-4 h-4 text-emerald-700" />
            <span>شرکت فناوران پرداخت هوشمند پوز‌پلاس (شماره ثبت: ۵۲۸۴۹۱)</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-[#0b1c30] tracking-tight">
            پیشرو در ارائه راهکارهای پرداخت الکترونیک و پایانه‌های فروشگاهی
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            ما از سال ۱۳۹۵ با هدف تسهیل دریافت کارتخوان برای تمامی اصناف و حذف بروکراسی‌های پیچیده بانکی، سامانه‌ای امن، سریع و کاملاً آنلاین برای صاحبان کسب‌وکارهای ایرانی بنا نهادیم.
          </p>
        </div>
      </section>

      {/* Core Achievements & Numbers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 -mt-8 relative z-20 w-full">
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col gap-1">
            <span className="font-numeric text-3xl font-black text-emerald-800">+۵۰,۰۰۰</span>
            <span className="text-xs font-bold text-slate-600">پذیرنده فعال در سراسر ایران</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-numeric text-3xl font-black text-emerald-800">۳۱</span>
            <span className="text-xs font-bold text-slate-600">استان تحت پوشش تحویل و تعمیرات</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-numeric text-3xl font-black text-emerald-800">۸ سال</span>
            <span className="text-xs font-bold text-slate-600">سابقه درخشان در صنعت پرداخت (فین‌تک)</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-numeric text-3xl font-black text-emerald-800">۲۴/۷</span>
            <span className="text-xs font-bold text-slate-600">پشتیبانی تلفنی و امداد پایانه</span>
          </div>
        </div>
      </section>

      {/* Values & Principles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 w-full">
        <div className="flex flex-col gap-2 text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-4 py-1 rounded-full border border-emerald-200">
            ارزش‌های بنیادین پوز‌پلاس
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0b1c30]">
            تعهد به شفافیت، سرعت و احترام به وقت پذیرنده
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">مالکیت ۱۰۰٪ قطعی بدون شرط تراکنش</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              دستگاه‌های ارائه‌شده تماماً فروشی با مالکیت دائم هستند و هیچ‌گونه شرط حداقل تراکنش ماهانه، مسدودی یا بلوکه شدن پول در حساب بانکی شما اعمال نخواهد شد.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">سریع‌ترین شبکه ارسال و فعال‌سازی</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              در شهر تهران تحویل کمتر از ۲۴ ساعت توسط پیک اختصاصی و در سایر شهرستان‌ها ظرف ۴۸ ساعت کاری با همکاری پست پیشتاز جمهوری اسلامی ایران انجام می‌پذیرد.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">تامین مستقیم قطعات اورجینال</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              تمامی قطعات، باتری‌ها، بردهای مدار چاپی و پرینترها به‌صورت مستقیم از تولیدکنندگان بین‌المللی مانند Pax و Newpos وارد گردیده و از اصالت کامل برخوردارند.
            </p>
          </div>
        </div>
      </section>

      {/* Central Office & Visiting Address */}
      <section className="w-full bg-[#eff4ff] py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="flex flex-col gap-4">
            <span className="text-xs font-bold text-emerald-700">مقر اداری و فنی شرکت</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0b1c30]">
              مرکز تخصصی پذیرندگان و آزمایشگاه مرکزی پوز‌پلاس
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              شما همواره می‌توانید جهت خرید حضوری، تحویل فوری دستگاه یا دریافت خدمات پس از فروش و تعمیرات تخصصی به دفتر مرکزی ما در تهران مراجعه فرمایید.
            </p>

            <div className="flex flex-col gap-3 pt-2 text-xs sm:text-sm text-slate-700 font-numeric">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <span>تهران، خیابان ولیعصر، نرسیده به تقاطع بهشتی، برج فناوری مالی پوز‌پلاس، طبقه ۶، واحد ۲۴</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-5 h-5 text-emerald-700 shrink-0" />
                <span>ساعات کاری اداری: شنبه تا چهارشنبه ۸:۰۰ الی ۲۰:۰۰ | پنج‌شنبه‌ها ۸:۰۰ الی ۱۴:۰۰</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Headphones className="w-5 h-5 text-emerald-700 shrink-0" />
                <span>مرکز تماس شبانه‌روزی (۷ روز هفته): ۰۲۱-۸۸۸۸۰۰۰۰</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 flex flex-col gap-4">
            <h3 className="font-bold text-slate-900 text-base">استعلام مجوزها و تاییدیه‌ها</h3>
            <div className="flex flex-col gap-3">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800">مجوز پرداخت‌یاری رسمی شاپرک</span>
                <span className="text-[11px] text-emerald-700 font-bold">معتبر و فعال</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800">نماد اعتماد الکترونیکی (ای‌نماد ۵ ستاره)</span>
                <span className="text-[11px] text-emerald-700 font-bold">احراز هویت شده</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800">عضو سازمان نظام صنفی رایانه‌ای کشور</span>
                <span className="text-[11px] text-emerald-700 font-bold">شماره ثبت ۲۱۰۸۴</span>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={onOpenConsultation}
                className="flex-1 h-11 bg-[#006c49] hover:bg-[#005236] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
              >
                <PhoneCall className="w-4 h-4" />
                <span>درخواست مشاوره تلفنی</span>
              </button>
              <button
                onClick={onNavigateToCatalog}
                className="flex-1 h-11 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>مشاهده کارتخوان‌ها</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
