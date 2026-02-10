"use client";

import { 
  User, History, ReceiptText, CheckCircle2, 
  Clock, Calendar, LogOut, Building2, 
  Fingerprint, Smartphone, KeySquare, Download, ArrowLeft 
} from "lucide-react";
import { userProfile } from "@/lib/insurance-data";
import { useTransactionStore } from "@/lib/transaction-store";
import { useState } from "react";

interface SidebarMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export function SidebarMenu({ isOpen, onClose, onLogout }: SidebarMenuProps) {
  const { policies, payments } = useTransactionStore();
  const [historyTab, setHistoryTab] = useState<"active" | "expired">("active");

  if (!isOpen) return null;

  const filteredPolicies = policies.filter(p => p.status === historyTab);

  const getMethodInfo = () => {
    switch (userProfile.loginMethod) {
      case "one-id": return { icon: <Fingerprint size={14} />, label: "ONE ID" };
      case "my-id": return { icon: <Smartphone size={14} />, label: "MY ID" };
      case "eri": return { icon: <KeySquare size={14} />, label: "ERI IMZO" };
      default: return { icon: <User size={14} />, label: "Mehmon" };
    }
  };

  const authMethod = getMethodInfo();

  return (
    /* MUHIM: absolute inset-0 ishlatamiz, bu Dashboard konteyneridan chiqib ketmaydi.
       z-[100] Dashboard elementlari ustida turishini ta'minlaydi.
    */
    <div className="absolute inset-0 z-[100] bg-background flex flex-col animate-in slide-in-from-right duration-300">
      
      {/* Header */}
      <div className="p-5 border-b flex items-center gap-4 bg-background sticky top-0 z-10 shadow-sm">
        <button 
          onClick={onClose} 
          className="p-2 bg-secondary rounded-full active:scale-90 transition-all"
        >
          <ArrowLeft size={20} className="text-foreground" />
        </button>
        <h2 className="font-bold text-lg text-foreground">Shaxsiy profil</h2>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar p-5 space-y-8">
        {/* User Identity */}
        <div className="flex flex-col items-center py-4">
          <div className="relative">
            <div className={`w-24 h-24 rounded-[2.5rem] flex items-center justify-center text-white text-3xl font-bold shadow-xl ${
              userProfile.userType === 'legal' ? 'bg-purple-600' : 'bg-primary'
            }`}>
              {userProfile.userType === 'legal' ? <Building2 size={40} /> : userProfile.avatar}
            </div>
            <div className="absolute -bottom-1 -right-1 p-2 bg-background border border-border rounded-2xl shadow-md text-primary">
              {authMethod.icon}
            </div>
          </div>
          
          <div className="mt-5 text-center">
            <h3 className="font-extrabold text-xl text-foreground leading-tight px-4">
              {userProfile.userType === 'legal' ? userProfile.companyName : userProfile.fullName}
            </h3>
            <div className="flex items-center justify-center gap-2 mt-3">
              <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase text-white ${
                userProfile.userType === 'legal' ? 'bg-purple-600' : 'bg-primary'
              }`}>
                {userProfile.userType === 'legal' ? 'Yuridik' : 'Jismoniy'}
              </span>
              <span className="px-3 py-1 bg-secondary rounded-full text-[10px] font-bold text-muted-foreground uppercase">
                {authMethod.label}
              </span>
            </div>
          </div>
        </div>

        {/* Data Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-card border border-border p-4 rounded-[1.8rem] shadow-sm">
            <p className="text-[9px] text-muted-foreground font-bold uppercase mb-1">
              {userProfile.userType === 'legal' ? 'STIR' : 'JSHSHIR'}
            </p>
            <p className="text-xs font-bold text-foreground truncate">
              {userProfile.userType === 'legal' ? userProfile.stir : userProfile.jshshir}
            </p>
          </div>
          <div className="bg-card border border-border p-4 rounded-[1.8rem] shadow-sm">
            <p className="text-[9px] text-muted-foreground font-bold uppercase mb-1">
              {userProfile.userType === 'legal' ? 'VAKIL' : 'PASPORT'}
            </p>
            <p className="text-xs font-bold text-foreground truncate">
              {userProfile.userType === 'legal' ? userProfile.shortName : userProfile.passport}
            </p>
          </div>
        </div>

        {/* Insurance History */}
        <section className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="font-bold text-sm flex items-center gap-2 text-foreground">
              <History size={18} className="text-primary" /> Sug'urta tarixi
            </h3>
            <div className="bg-secondary/50 p-1 rounded-xl flex border border-border/50">
              <button 
                onClick={() => setHistoryTab("active")} 
                className={`px-4 py-1.5 rounded-lg text-[10px] font-bold transition-all ${historyTab === 'active' ? 'bg-card text-primary shadow-sm' : 'text-muted-foreground'}`}
              >
                Faol
              </button>
              <button 
                onClick={() => setHistoryTab("expired")} 
                className={`px-4 py-1.5 rounded-lg text-[10px] font-bold transition-all ${historyTab === 'expired' ? 'bg-card text-primary shadow-sm' : 'text-muted-foreground'}`}
              >
                Arxiv
              </button>
            </div>
          </div>

          <div className="space-y-3 pb-4">
            {filteredPolicies.length > 0 ? (
              filteredPolicies.map((p) => (
                <div key={p.id} className={`bg-card border rounded-[2rem] p-5 shadow-sm active:scale-[0.98] transition-all ${
                  p.status === 'active' ? 'border-l-4 border-l-green-500' : 'border-l-4 border-l-muted opacity-80'
                }`}>
                  <div className="flex justify-between items-start mb-3">
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-foreground truncate">{p.type}</p>
                      <p className="text-[10px] text-muted-foreground uppercase">{p.company}</p>
                    </div>
                    <div className={`shrink-0 flex items-center gap-1 px-2 py-1 rounded-lg text-[9px] font-black uppercase ${
                      p.status === 'active' ? 'bg-green-500/10 text-green-600 border border-green-500/20' : 'bg-secondary text-muted-foreground'
                    }`}>
                      {p.status === 'active' ? 'Faol' : 'Yakunlangan'}
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-[10px] pt-4 border-t border-border/40">
                    <span className="text-muted-foreground flex items-center gap-1"><Calendar size={12} /> {p.endDate}</span>
                    <button className="flex items-center gap-1 text-primary font-bold"><Download size={14} /> Polis</button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-10 bg-secondary/10 rounded-[2rem] border-2 border-dashed border-border/50 text-muted-foreground text-xs">
                Ma'lumotlar mavjud emas
              </div>
            )}
          </div>
        </section>

        {/* Last Payments */}
        <section className="space-y-4 pb-10">
          <h3 className="font-bold text-sm flex items-center gap-2 text-foreground px-1">
            <ReceiptText size={18} className="text-primary" /> Oxirgi to'lovlar
          </h3>
          <div className="space-y-2">
            {payments.slice(0, 4).map((pay) => (
              <div key={pay.id} className="flex items-center justify-between bg-card p-4 rounded-[1.5rem] border border-border/50">
                <div className="flex flex-col gap-0.5">
                  <p className="text-[11px] font-bold text-foreground">{pay.type}</p>
                  <p className="text-[9px] text-muted-foreground">{pay.date}</p>
                </div>
                <p className="text-[11px] font-black text-foreground">{pay.amount} so'm</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Logout */}
      <div className="p-6 border-t bg-background mt-auto sticky bottom-0">
        <button onClick={onLogout} className="w-full flex items-center justify-center gap-3 py-4 bg-red-50 text-red-600 rounded-[1.5rem] font-bold text-sm active:scale-95 transition-all border border-red-100">
          <LogOut size={18} /> Profildan chiqish
        </button>
      </div>
    </div>
  );
}
