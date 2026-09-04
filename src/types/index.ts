export type NavigationTab = 
  | 'home' 
  | 'pos-terminals-catalog' 
  | 'order-registration-and-documents' 
  | 'services-and-support' 
  | 'about-posplus'
  | 'customer-portal-login'
  | 'terminal-detail';

export interface POSTerminal {
  id: string;
  name: string;
  persianName: string;
  subtitle: string;
  category: 'smart-android' | 'mobile-button' | 'pocket-mini' | 'stationary-lan';
  os: string;
  connectivity: string;
  connectivityType: '4g' | 'wifi' | 'lan' | 'dual';
  battery: string;
  batteryCapacity: number;
  transactionSpeed: string;
  speedSeconds: number;
  price: number;
  originalPrice: number;
  discountPercent?: number;
  warranty: string;
  warrantyMonths: number;
  weight: string;
  printerType: string;
  inStock: boolean;
  rating: number;
  reviewsCount: number;
  isHot?: boolean;
  isSpecial?: boolean;
  isBestseller?: boolean;
  isBudget?: boolean;
  image: string;
  gallery: {
    id: string;
    title: string;
    url: string;
  }[];
  description: string;
  features: string[];
  specs: {
    cpu: string;
    display: string;
    memory: string;
    dimensions: string;
    simSlots: string;
    batterySpec: string;
    printerSpec: string;
    ports: string;
    security: string;
    cardReaders: string;
  };
  accountsSupported: number;
  suitedFor: string;
}

export interface OrderFormData {
  fullName: string;
  nationalCode: string;
  cellPhone: string;
  birthDate: string;
  shopName: string;
  guildCategory: string;
  postalCode: string;
  phoneLandline: string;
  shopAddress: string;
  taxStatus: 'existing' | 'need_assistance';
  taxCode: string;
  bankSelect: string;
  accountHolderName: string;
  iban: string;
  nationalCardFile: string | null;
  birthCertFile: string | null;
  ibanSheetFile: string | null;
  termsAccepted: boolean;
  selectedTerminalId: string;
  warrantyTier: 'golden' | 'vip';
  selectedColor: string;
}

export interface RepairTicketData {
  ownerName: string;
  phone: string;
  terminalModel: string;
  issueType: string;
  description: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'connection' | 'sim' | 'tamper' | 'warranty';
}

export interface ReviewItem {
  id: string;
  author: string;
  role: string;
  location: string;
  rating: number;
  date: string;
  comment: string;
}
