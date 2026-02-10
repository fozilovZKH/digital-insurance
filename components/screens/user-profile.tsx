"use client";

import { useState } from "react";
import { ArrowLeft, Calendar, CreditCard, Hash, FileCheck, FileX, History, Clock, MapPin, Phone } from "lucide-react";
import { userProfile, insuranceHistory, paymentHistory } from "@/lib/insurance-data";

interface UserProfileProps {
  onBack: () => void;
}

export function UserProfile({ onBack }: UserProfileProps) {
  // Tablar: 'active' (Faol) va 'expired' (No faol / Tarix)
  const [activeTab, setActiveTab] = useState<"active" | "expired">("active");

  // Tanlangan tabga qarab sug'urtalarni filterlash
  const filteredPolicies = insuranceHistory.filter(p => p.status === activeTab);

  return (
    <div className="h-full flex flex-col bg-background animate-in slide-in-from-right duration-300">
      
      {/* 1. Header */}
      <div className="p-5 border-b sticky top-0 bg-background z-20 flex items-center gap-3">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center active:scale-90 transition-transform">
          <ArrowLeft size={20} className="text-foreground" />
        </button>
        <h2 className="text-lg font-bold text-foreground">Mening profilim</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-6 no-scrollbar">
        
        {/* 2. User Information Card */}
        <div className="bg-card p-5 rounded-[2rem] border border-border shadow-sm space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xl font-bold border-4 border-background shadow-md">
              {userProfile.avatar}
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground leading-tight">{userProfile.fullName}</h3>
              <div className="flex items-center gap-1.5 mt-1 text-muted-foreground">
                <Phone size={12} />
                <p className="text-xs">{userProfile.phone}</p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="bg-secondary/50 p-3 rounded-2xl">
              <div className="flex items-center gap-2 mb-1 text-muted-foreground">
                <Calendar size={14} />
                <span className="text-[10px] font-medium">Tug'ilgan sana</span>
              </div>
              <p className="text-sm font-bold text-foreground">{userProfile.birthDate}</p>
            </div>
            <div className="bg-secondary/50 p-3 rounded-2xl">
              <div className="flex items-center gap-2 mb-1 text-muted-foreground">
                <Hash size={14} />
                <span className="text-[10px] font-medium">JSHSHIR</span>
              </div>
              <p className="text-sm font-bold text-foreground tracking-tight truncate">{userProfile.jshshir}</p>
            </div>
            <div className="col-span-2 bg-secondary/50 p-3 rounded-2xl">
              <div className="flex items-center gap-2 mb-1 text-muted-foreground">
                <MapPin size={14} />
                <span className="text-[10px] font-medium">Manzil</span>
              </div>
              <p className="text-xs font-bold text-foreground line-clamp-2">{userProfile.address}</p>
            </div>
          </div>
        </div>

        {/* 3. Sug'urta Tarixi (Tabs: Active / Inactive) */}
        <div>
          <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
            <FileCheck size={18} className="text-primary" />
            Sug'urta polislari
          </h3>
          
          <div className="flex p-1 bg-secondary rounded-full mb-4">
            <button 
              onClick={() => setActiveTab("active")}
              className={`flex-1 py-2.5 text-xs font-bold rounded-full transition-all ${activeTab === 'active' ? 'bg-background text-primary shadow-sm' : 'text-muted-foreground'}`}
            >
              Faol
            </button>
            <button 
              onClick={() => setActiveTab("expired")}
              className={`flex-1 py-2.5 text-xs font-bold rounded-full transition-all ${activeTab === 'expired' ? 'bg-background text-primary shadow-sm' : 'text-muted-foreground'}`}
            >
              No faol / Arxiv
            </button>
          </div>

          <div className="space-y-3 min-h-[100px]">
            {filteredPolicies.length > 0 ? (
              filteredPolicies.map((policy) => (
                <div key={policy.id} className="bg-card p-4 rounded-[1.5rem] border border-border flex flex-col gap-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-md inline-block mb-1">{policy.company}</p>
                      <h4 className="font-bold text-foreground text-sm">{policy.type}</h4>
                    </div>
                    <span className={`text-[10px] px-2 py-1 rounded-full font-bold ${policy.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {policy.endDate} gacha
                    </span>
                  </div>
                  <div className="flex justify-between items-end border-t border-border/50 pt-2 mt-1">
                     <div>
                        <p className="text-[10px] text-muted-foreground">Polis raqami</p>
                        <p className="text-xs font-mono font-medium">{policy.policyNumber}</p>
                     </div>
                     <p className="text-sm font-bold">{policy.amount} so'm</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-muted-foreground bg-secondary/30 rounded-[1.5rem] border border-dashed border-border">
                <FileX size={32} className="mb-2 opacity-50" />
                <p className="text-xs">Ushbu bo'limda ma'lumot yo'q</p>
              </div>
            )}
          </div>
        </div>

        {/* 4. Tranzaksiyalar Tarixi (Payment History) */}
        <div className="pb-8">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
              <History size={18} className="text-primary" />
              To'lovlar tarixi
            </h3>
            {/* Bu tugma hozircha shunchaki vizual, lekin buni alohida to'liq list sahifasiga ulash mumkin */}
            <button className="text-[11px] font-bold text-primary px-3 py-1 bg-primary/5 rounded-full active:bg-primary/10">
              Barchasi
            </button>
          </div>

          <div className="bg-card rounded-[2rem] border border-border overflow-hidden">
            {paymentHistory.slice(0, 3).map((payment, index) => (
              <div key={payment.id} className={`p-4 flex items-center justify-between ${index !== paymentHistory.length - 1 && index !== 2 ? 'border-b border-border' : ''}`}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center">
                    <CreditCard size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">{payment.type}</p>
                    <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                      <span>{payment.date}</span>
                      <span className="w-1 h-1 rounded-full bg-muted-foreground/50"></span>
                      <span>{payment.method}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                    <p className="text-sm font-bold text-foreground">-{payment.amount}</p>
                    <p className="text-[10px] text-muted-foreground">so'm</p>
                </div>
              </div>
            ))}
             {paymentHistory.length === 0 && (
                 <div className="p-6 text-center text-xs text-muted-foreground">To'lovlar tarixi bo'sh</div>
             )}
          </div>
        </div>

      </div>
    </div>
  );
}
