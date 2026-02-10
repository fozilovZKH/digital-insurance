"use client";

import { useState } from "react";
import { MobileFrame } from "@/components/mobile-frame";
import { Auth } from "@/components/screens/auth";
import { Dashboard } from "@/components/screens/dashboard";
import { ServicesList } from "@/components/screens/services-list";
import { PaymentSuccess } from "@/components/screens/payment-success";
import { AIAssistant } from "@/components/screens/ai-assistant";
import { UserDashboard } from "@/components/screens/user-dashboard";
import { ClaimsTracker } from "@/components/screens/claims-tracker";
import { CompanyDashboard } from "@/components/screens/company-dashboard";
import { ListViewPage } from "@/components/screens/list-view-page"; // Yangi qo'shilgan
import { insuranceCompanies, insuranceServices } from "@/lib/insurance-data";
import { useTransactionStore } from "@/lib/transaction-store"; // Ma'lumotlar uchun
import { Input } from "@/components/ui/input";
import { DynamicForm } from "@/components/screens/dynamic-form";

import { 
  X, Star, ChevronRight, ShieldCheck, Search
} from "lucide-react";

// Navigatsiya turlarini yangiladik
type Screen = "auth" | "dashboard" | "services-list" | "service-info" | "dynamic-form" | "payment" | "ai-assistant" | "user-dashboard" | "claims-tracker" | "company-dashboard" | "all-companies" | "all-services" | "list-view";

interface NavigationState {
  screen: Screen;
  companyId?: number;
  companyName?: string;
  serviceId?: number;
  serviceName?: string;
  serviceType?: string;
  amount?: string;
  activeSection?: 'policies' | 'payments' | 'coverage' | 'cashback'; // Yangi bo'lim holati
}

export default function Home() {
  const [navState, setNavState] = useState<NavigationState>({ screen: "auth" });
  const [serviceSearch, setServiceSearch] = useState("");
  const [companySearch, setCompanySearch] = useState("");
  
  // Zustand store'dan ma'lumotlarni olish
  const { policies, payments } = useTransactionStore();

  const transliterate = (text: string): string => {
    const layoutMap: Record<string, string> = {
      'й': 'q', 'ц': 'w', 'у': 'e', 'к': 'r', 'е': 't', 'н': 'y', 'г': 'u', 'ш': 'i', 'щ': 'o', 'з': 'p',
      'ф': 'a', 'ы': 's', 'в': 'd', 'а': 'f', 'п': 'g', 'р': 'h', 'о': 'j', 'л': 'k', 'д': 'l',
      'я': 'z', 'ч': 'x', 'с': 'c', 'м': 'v', 'и': 'b', 'т': 'n', 'ь': 'm',
    };
    return text.split('').map(char => layoutMap[char] || char).join('');
  };

  const goHome = () => {
    setNavState({ screen: "dashboard" });
    setServiceSearch("");
    setCompanySearch("");
  };

  const handleCompanySelection = (companyId: number, companyName: string) => {
    if (navState.serviceName) {
      setNavState(prev => ({ 
        ...prev, 
        screen: "dynamic-form", 
        companyId, 
        companyName,
        serviceType: "standard" 
      }));
    } else {
      setNavState({ screen: "services-list", companyId, companyName });
    }
  };

  const goToServiceInfo = (serviceId: number, serviceName: string) => {
    setNavState(prev => ({ 
      ...prev, 
      screen: "all-companies", 
      serviceId, 
      serviceName 
    }));
  };

  // --- FILTRLASH QISMI ---
  const filteredServices = insuranceServices.filter(s => {
    const searchTerm = serviceSearch.toLowerCase();
    const translitTerm = transliterate(searchTerm);
    return s.name.toLowerCase().includes(searchTerm) || 
           s.name.toLowerCase().includes(translitTerm) ||
           s.fullName.toLowerCase().includes(searchTerm) ||
           s.fullName.toLowerCase().includes(translitTerm);
  });

  const filteredCompanies = [...insuranceCompanies]
    .sort((a,b) => b.rating - a.rating)
    .filter(c => {
      const searchTerm = companySearch.toLowerCase();
      const translitTerm = transliterate(searchTerm);
      return c.name.toLowerCase().includes(searchTerm) || 
             c.name.toLowerCase().includes(translitTerm);
    });

  const renderScreen = () => {
    switch (navState.screen) {
      case "auth": 
        return <Auth onLogin={() => setNavState({ screen: "dashboard" })} />;
      
      case "dashboard":
        return (
          <Dashboard
            onCompanyClick={handleCompanySelection}
            onServiceClick={goToServiceInfo}
            onAIAssistant={() => setNavState({ screen: "ai-assistant" })}
            onUserDashboard={() => setNavState({ screen: "user-dashboard" })}
            onClaimsTracker={() => setNavState({ screen: "claims-tracker" })}
            onCompanyDashboard={() => setNavState({ screen: "company-dashboard" })}
            onViewAllCompanies={() => setNavState({ screen: "all-companies" })}
            onViewAllServices={() => setNavState({ screen: "all-services" })}
            onLogout={() => setNavState({ screen: "auth" })}
          />
        );

      case "user-dashboard":
        return (
          <UserDashboard 
            onBack={goHome} 
            onSectionClick={(type) => setNavState({ screen: "list-view", activeSection: type })}
          />
        );

      case "list-view":
        // Bu sahifa Faol polislar, To'lovlar, Himoya va Cashback uchun umumiy
        return (
          <ListViewPage 
            type={navState.activeSection || 'policies'}
            data={navState.activeSection === 'policies' ? policies.filter(p => p.status === 'active') : payments}
            onBack={() => setNavState({ screen: "user-dashboard" })} // Faqat Status menyusiga qaytadi
          />
        );

      case "claims-tracker":
        return <ClaimsTracker onBack={goHome} />;

      case "all-services":
        return (
          <div className="bg-background h-full flex flex-col animate-in slide-in-from-bottom duration-300">
            <div className="p-5 border-b flex items-center justify-between bg-background sticky top-0 z-20">
              <div>
                <h2 className="font-bold text-foreground text-lg">Barcha xizmatlar</h2>
                <p className="text-[10px] text-muted-foreground">Qidiruv avtomatik o'zgaradi</p>
              </div>
              <button onClick={goHome} className="p-2 bg-secondary rounded-full"><X size={20} /></button>
            </div>
            <div className="px-5 pt-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input 
                    className="pl-10 bg-secondary/50 border-none rounded-2xl h-12" 
                    placeholder="Xizmatni qidiring..." 
                    value={serviceSearch} 
                    onChange={(e) => setServiceSearch(e.target.value)} 
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-5 space-y-3 no-scrollbar">
              {filteredServices.map((service) => (
                <button key={service.id} onClick={() => goToServiceInfo(service.id, service.name)} className="w-full flex items-center gap-4 p-4 bg-card rounded-[2rem] border border-border shadow-sm active:scale-[0.98] transition-all group">
                  <div className="w-14 h-14 rounded-[1.2rem] bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                    <ShieldCheck size={24} />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-bold text-foreground text-sm">{service.name}</p>
                    <p className="text-[11px] text-muted-foreground line-clamp-1 mt-1">{service.fullName}</p>
                  </div>
                  <ChevronRight size={18} className="text-muted-foreground" />
                </button>
              ))}
            </div>
          </div>
        );

      case "all-companies":
        return (
          <div className="bg-background h-full flex flex-col animate-in slide-in-from-bottom duration-300">
            <div className="p-5 border-b flex items-center justify-between bg-background sticky top-0 z-20">
              <div>
                <h2 className="font-bold text-foreground text-lg">
                    {navState.serviceName ? `${navState.serviceName}` : "Kompaniyalar"}
                </h2>
                <p className="text-[10px] text-muted-foreground">Tanlovni davom ettiring</p>
              </div>
              <button onClick={goHome} className="p-2 bg-secondary rounded-full"><X size={20} /></button>
            </div>
            <div className="px-5 pt-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input className="pl-10 bg-secondary/50 border-none rounded-2xl h-12" placeholder="Kompaniyani qidiring ..." value={companySearch} onChange={(e) => setCompanySearch(e.target.value)} />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-5 space-y-3 no-scrollbar">
              {filteredCompanies.map((comp) => (
                <button key={comp.id} onClick={() => handleCompanySelection(comp.id, comp.name)} className="w-full bg-card p-4 rounded-[2rem] border border-border flex items-center justify-between shadow-sm active:scale-[0.98] transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center font-bold text-primary text-xl">{comp.logo}</div>
                    <div className="text-left">
                      <h4 className="font-bold text-foreground">{comp.name}</h4>
                      <div className="flex items-center gap-1 text-yellow-500"><Star size={14} fill="currentColor" /> <span className="text-sm font-bold text-muted-foreground">{comp.rating}</span></div>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-muted-foreground" />
                </button>
              ))}
            </div>
          </div>
        );

      case "services-list": return <ServicesList companyName={navState.companyName || ""} onBack={goHome} onServiceSelect={(id, name, type) => setNavState(prev => ({ ...prev, screen: "dynamic-form", serviceId: id, serviceName: name, serviceType: type }))} />;
      case "dynamic-form": return <DynamicForm companyName={navState.companyName || "APEX"} serviceName={navState.serviceName || ""} serviceType={navState.serviceType || "other"} onBack={goHome} onSubmit={(amt) => setNavState(prev => ({ ...prev, screen: "payment", amount: amt }))} />;
      case "payment": return <PaymentSuccess companyName={navState.companyName || "APEX"} serviceName={navState.serviceName || ""} amount={navState.amount || "450,000"} onBack={goHome} onGoHome={goHome} />;
      case "ai-assistant": return <AIAssistant onBack={goHome} />;
      case "company-dashboard": return <CompanyDashboard onBack={goHome} />;
      default: return null;
    }
  };

  return <MobileFrame>{renderScreen()}</MobileFrame>;
}
