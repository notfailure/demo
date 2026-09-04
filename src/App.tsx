import React, { useState, useEffect } from 'react';
import { NavigationTab, POSTerminal } from './types';
import { TERMINALS_DATA } from './data/terminals';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ConsultationModal } from './components/ConsultationModal';
import { CompareDrawer } from './components/CompareDrawer';

import { HomeView } from './views/HomeView';
import { CatalogView } from './views/CatalogView';
import { TerminalDetailView } from './views/TerminalDetailView';
import { OrderRegistrationView } from './views/OrderRegistrationView';
import { ServicesSupportView } from './views/ServicesSupportView';
import { CustomerPortalView } from './views/CustomerPortalView';
import { AboutView } from './views/AboutView';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavigationTab>('home');
  const [selectedTerminal, setSelectedTerminal] = useState<POSTerminal>(TERMINALS_DATA[1]); // Newpos 7210 default
  const [orderOptions, setOrderOptions] = useState<{ warrantyTier: 'golden' | 'vip'; color: string }>({
    warrantyTier: 'golden',
    color: 'مشکی مات',
  });
  const [compareList, setCompareList] = useState<POSTerminal[]>([]);
  const [consultationModalOpen, setConsultationModalOpen] = useState(false);

  // Scroll to top on navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentTab, selectedTerminal]);

  const handleNavigate = (tab: NavigationTab, terminalId?: string) => {
    if (terminalId) {
      const found = TERMINALS_DATA.find((t) => t.id === terminalId);
      if (found) {
        setSelectedTerminal(found);
      }
    }
    setCurrentTab(tab);
  };

  const handleSelectTerminal = (terminal: POSTerminal) => {
    setSelectedTerminal(terminal);
    setCurrentTab('terminal-detail');
  };

  const handleStartOrder = (
    terminal?: POSTerminal,
    options?: { warrantyTier: 'golden' | 'vip'; color: string }
  ) => {
    if (terminal) setSelectedTerminal(terminal);
    if (options) setOrderOptions(options);
    setCurrentTab('order-registration-and-documents');
  };

  const handleToggleCompare = (terminal: POSTerminal) => {
    setCompareList((prev) => {
      const exists = prev.some((t) => t.id === terminal.id);
      if (exists) {
        return prev.filter((t) => t.id !== terminal.id);
      }
      if (prev.length >= 3) {
        alert('حداکثر ۳ دستگاه می‌توانید به طور همزمان مقایسه نمایید.');
        return prev;
      }
      return [...prev, terminal];
    });
  };

  const handleRemoveFromCompare = (terminalId: string) => {
    setCompareList((prev) => prev.filter((t) => t.id !== terminalId));
  };

  const handleClearCompare = () => {
    setCompareList([]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fafcff] text-slate-900 selection:bg-emerald-100 selection:text-emerald-900 font-sans antialiased">
      {/* Top Fixed Header */}
      <Header
        currentTab={currentTab}
        onNavigate={handleNavigate}
        onOpenConsultation={() => setConsultationModalOpen(true)}
      />

      {/* Main Page Content (with top padding for fixed header) */}
      <main className="flex-1 pt-26 sm:pt-28 flex flex-col items-center w-full">
        {currentTab === 'home' && (
          <HomeView
            onNavigateToCatalog={() => setCurrentTab('pos-terminals-catalog')}
            onSelectTerminal={handleSelectTerminal}
            onStartOrder={handleStartOrder}
            onOpenConsultation={() => setConsultationModalOpen(true)}
          />
        )}

        {currentTab === 'pos-terminals-catalog' && (
          <CatalogView
            onSelectTerminal={handleSelectTerminal}
            onStartOrder={handleStartOrder}
            onOpenConsultation={() => setConsultationModalOpen(true)}
            compareList={compareList}
            onToggleCompare={handleToggleCompare}
          />
        )}

        {currentTab === 'terminal-detail' && (
          <TerminalDetailView
            terminal={selectedTerminal}
            onBackToCatalog={() => setCurrentTab('pos-terminals-catalog')}
            onStartOrder={handleStartOrder}
            onOpenConsultation={() => setConsultationModalOpen(true)}
            onSelectRelated={handleSelectTerminal}
          />
        )}

        {currentTab === 'order-registration-and-documents' && (
          <OrderRegistrationView
            selectedTerminal={selectedTerminal}
            onNavigateToCatalog={() => setCurrentTab('pos-terminals-catalog')}
            warrantyTier={orderOptions.warrantyTier}
            selectedColor={orderOptions.color}
          />
        )}

        {currentTab === 'services-and-support' && (
          <ServicesSupportView />
        )}

        {currentTab === 'customer-portal-login' && (
          <CustomerPortalView />
        )}

        {currentTab === 'about-posplus' && (
          <AboutView
            onOpenConsultation={() => setConsultationModalOpen(true)}
            onNavigateToCatalog={() => setCurrentTab('pos-terminals-catalog')}
          />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Floating Comparison Drawer */}
      <CompareDrawer
        selectedTerminals={compareList}
        onRemove={handleRemoveFromCompare}
        onClear={handleClearCompare}
        onSelectTerminalForOrder={(t) => handleStartOrder(t)}
      />

      {/* Free Phone Consultation Dialog */}
      <ConsultationModal
        isOpen={consultationModalOpen}
        onClose={() => setConsultationModalOpen(false)}
        defaultTerminalId={selectedTerminal?.id}
      />
    </div>
  );
}
