import React, { useState } from 'react';
import { Layers, X, Check, ArrowLeft, Trash2, Shield, Battery, Wifi, Cpu, Scale, Printer } from 'lucide-react';
import { POSTerminal } from '../types';
import { formatPrice } from '../data/terminals';

interface CompareDrawerProps {
  selectedTerminals: POSTerminal[];
  onRemove: (id: string) => void;
  onClear: () => void;
  onSelectTerminalForOrder: (terminal: POSTerminal) => void;
}

export const CompareDrawer: React.FC<CompareDrawerProps> = ({
  selectedTerminals,
  onRemove,
  onClear,
  onSelectTerminalForOrder,
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  if (selectedTerminals.length === 0) return null;

  return (
    <>
      {/* Sticky Bottom Floating Ribbon */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[94%] max-w-2xl bg-white/95 backdrop-blur-xl p-3 sm:p-4 rounded-2xl shadow-2xl border border-slate-200/90 flex items-center justify-between gap-3 animate-in slide-in-from-bottom-6 duration-300">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-base font-numeric shadow-inner">
            {selectedTerminals.length}
          </div>
          <div className="flex flex-col text-right">
            <span className="text-sm font-bold text-slate-900">
              مدل‌های انتخاب‌شده جهت مقایسه فنی
            </span>
            <span className="text-xs text-slate-500">
              حداکثر ۳ مدل همزمان ({selectedTerminals.map(t => t.name).join('، ')})
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onClear}
            className="h-10 px-3 rounded-lg text-slate-500 hover:text-red-600 hover:bg-red-50 text-xs font-semibold transition-colors flex items-center gap-1"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">پاکسازی</span>
          </button>

          <button
            onClick={() => setModalOpen(true)}
            className="h-10 px-4 rounded-xl bg-[#006c49] hover:bg-[#005236] text-white text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-md shadow-emerald-700/20 transition-all active:scale-95"
          >
            <span>جدول مقایسه</span>
            <Layers className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Comparison Modal Dialog */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-5xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-slate-200">
            
            {/* Modal Header */}
            <div className="bg-[#131b2e] text-white p-5 flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">مقایسه تخصصی پایانه‌های فروشگاهی</h3>
                  <span className="text-xs text-slate-400">بررسی سخت‌افزاری بر اساس استاندارد شاپرک</span>
                </div>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Scrollable Table */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              <div className="grid grid-cols-4 gap-3 sm:gap-4 min-w-[650px] text-right">
                
                {/* Column 0: Row Labels */}
                <div className="flex flex-col gap-3 font-semibold text-xs text-slate-500 pt-36">
                  <div className="h-10 flex items-center border-b border-slate-100">قیمت و تخفیف</div>
                  <div className="h-10 flex items-center border-b border-slate-100">سیستم عامل</div>
                  <div className="h-10 flex items-center border-b border-slate-100">صفحه نمایش</div>
                  <div className="h-10 flex items-center border-b border-slate-100">سرعت تراکنش</div>
                  <div className="h-10 flex items-center border-b border-slate-100">ظرفیت باتری</div>
                  <div className="h-10 flex items-center border-b border-slate-100">وزن دستگاه</div>
                  <div className="h-10 flex items-center border-b border-slate-100">نوع ارتباطات</div>
                  <div className="h-10 flex items-center border-b border-slate-100">تعداد حساب متصل</div>
                  <div className="h-10 flex items-center border-b border-slate-100">گارانتی تعویض</div>
                </div>

                {/* Terminals Columns */}
                {selectedTerminals.map((terminal) => (
                  <div 
                    key={terminal.id} 
                    className="flex flex-col gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200"
                  >
                    {/* Header with image */}
                    <div className="flex flex-col items-center text-center relative pb-2 border-b border-slate-200">
                      <button
                        onClick={() => onRemove(terminal.id)}
                        className="absolute top-0 left-0 text-slate-400 hover:text-red-500 p-1"
                        title="حذف از مقایسه"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <img 
                        src={terminal.image} 
                        alt={terminal.name} 
                        className="w-20 h-20 object-contain mb-2" 
                      />
                      <span className="font-bold text-slate-900 text-sm">{terminal.name}</span>
                      <span className="text-[11px] text-emerald-700 font-semibold">{terminal.persianName}</span>
                    </div>

                    {/* Attribute Cells */}
                    <div className="h-10 flex items-center font-bold text-sm text-slate-900 font-numeric border-b border-slate-200/80">
                      {formatPrice(terminal.price)} تومان
                    </div>
                    <div className="h-10 flex items-center text-xs text-slate-700 border-b border-slate-200/80">
                      {terminal.os}
                    </div>
                    <div className="h-10 flex items-center text-xs text-slate-700 border-b border-slate-200/80">
                      {terminal.specs.display}
                    </div>
                    <div className="h-10 flex items-center text-xs font-bold text-emerald-700 font-numeric border-b border-slate-200/80">
                      {terminal.transactionSpeed}
                    </div>
                    <div className="h-10 flex items-center text-xs text-slate-700 font-numeric border-b border-slate-200/80">
                      {terminal.battery}
                    </div>
                    <div className="h-10 flex items-center text-xs text-slate-700 font-numeric border-b border-slate-200/80">
                      {terminal.weight}
                    </div>
                    <div className="h-10 flex items-center text-xs text-slate-700 border-b border-slate-200/80">
                      {terminal.connectivity}
                    </div>
                    <div className="h-10 flex items-center text-xs text-slate-700 font-numeric border-b border-slate-200/80">
                      اتصال به {terminal.accountsSupported} حساب همزمان
                    </div>
                    <div className="h-10 flex items-center text-xs font-bold text-slate-900 border-b border-slate-200/80">
                      {terminal.warranty}
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={() => {
                          setModalOpen(false);
                          onSelectTerminalForOrder(terminal);
                        }}
                        className="w-full h-10 rounded-lg bg-[#006c49] hover:bg-[#005236] text-white text-xs font-bold flex items-center justify-center gap-1 transition-colors"
                      >
                        <span>انتخاب و ثبت سفارش</span>
                        <ArrowLeft className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                همه پایانه‌ها دارای گواهی رسمی اصالت کالا و تست شاپرک می‌باشند.
              </span>
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg text-xs font-bold transition-colors"
              >
                بستن جدول
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
