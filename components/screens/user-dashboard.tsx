"use client";

import {
  ChevronLeft, ShieldCheck, TrendingUp, Wallet,
  Gift, ChevronRight, AlertCircle, PieChart, Activity
} from "lucide-react";
import { userProfile } from "@/lib/insurance-data";
import { useTransactionStore } from "@/lib/transaction-store";

interface UserDashboardProps {
  onBack: () => void;
  // onClaimsClick olib tashlandi, chunki bo'lim o'chirildi
  onSectionClick: (type: 'policies' | 'payments' | 'coverage' | 'cashback') => void;
}

export function UserDashboard({ onBack, onSectionClick }: UserDashboardProps) {
  const { policies, payments, stats } = useTransactionStore();
  const activePolicies = policies.filter((p) => p.status === "active");

  const upcomingExpiry = activePolicies
    .map((p) => ({ type: p.type, date: p.endDate }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];

  const formatNumber = (num: number) => num.toLocaleString("uz-UZ");

  const getMonthlyData = () => {
    const months = Array(12).fill(0);
    payments.forEach((p) => {
      const month = new Date(p.date).getMonth();
      const amount = parseInt(p.amount.replace(/[^0-9]/g, ""), 10);
      months[month] += amount;
    });
    const maxAmount = Math.max(...months, 1);
    return months.map((amount) => Math.round((amount / maxAmount) * 100) || 5);
  };

  const categories = [
    { name: "Avto", color: "bg-blue-500", percent: 65 },
    { name: "Salomatlik", color: "bg-green-500", percent: 25 },
    { name: "Mulk", color: "bg-purple-500", percent: 10 },
  ];

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="px-5 pt-4 pb-3 border-b border-border bg-card/50">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="w-10 h-10 rounded-2xl bg-secondary flex items-center justify-center active:scale-90 transition-all">
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>
          <div>
            <h1 className="text-base font-bold text-foreground leading-none">Status & Analitika</h1>
            <p className="text-[10px] text-muted-foreground uppercase mt-1 tracking-wider">{userProfile.shortName}</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-5 no-scrollbar">
        
        {/* 1. Stats Grid - 4 ta interaktiv tugma */}
        <div className="grid grid-cols-2 gap-3">
          <button onClick={() => onSectionClick('policies')} className="bg-[#1B4332] rounded-[2rem] p-4 text-white shadow-lg transition-transform active:scale-95 text-left relative overflow-hidden">
            <ShieldCheck className="w-6 h-6 mb-2 opacity-80" />
            <p className="text-2xl font-black leading-none">{activePolicies.length}</p>
            <p className="text-[10px] uppercase font-bold opacity-70 mt-1 tracking-tighter">Faol polislar</p>
            <ChevronRight className="absolute right-4 bottom-4 w-4 h-4 opacity-40" />
          </button>
          
          <button onClick={() => onSectionClick('payments')} className="bg-card border border-border rounded-[2rem] p-4 shadow-sm transition-transform active:scale-95 text-left relative">
            <Wallet className="w-6 h-6 mb-2 text-[#1B4332]" />
            <p className="text-lg font-bold text-foreground leading-none">{formatNumber(stats.totalPremium)}</p>
            <p className="text-[10px] uppercase font-bold text-muted-foreground mt-1 tracking-tighter">Jami to'lovlar</p>
            <ChevronRight className="absolute right-4 bottom-4 w-4 h-4 text-muted-foreground/30" />
          </button>
          
          <button onClick={() => onSectionClick('coverage')} className="bg-card border border-border rounded-[2rem] p-4 shadow-sm transition-transform active:scale-95 text-left relative">
            <TrendingUp className="w-6 h-6 mb-2 text-[#1B4332]" />
            <p className="text-lg font-bold text-foreground leading-none">{formatNumber(stats.totalCoverage)}</p>
            <p className="text-[10px] uppercase font-bold text-muted-foreground mt-1 tracking-tighter">Jami himoya</p>
            <ChevronRight className="absolute right-4 bottom-4 w-4 h-4 text-muted-foreground/30" />
          </button>
          
          <button onClick={() => onSectionClick('cashback')} className="bg-card border border-border rounded-[2rem] p-4 shadow-sm transition-transform active:scale-95 text-left relative">
            <Gift className="w-6 h-6 mb-2 text-green-600" />
            <p className="text-lg font-bold text-foreground leading-none">{formatNumber(stats.cashbackEarned)}</p>
            <p className="text-[10px] uppercase font-bold text-muted-foreground mt-1 tracking-tighter">Cashback</p>
            <ChevronRight className="absolute right-4 bottom-4 w-4 h-4 text-muted-foreground/30" />
          </button>
        </div>

        {/* 2. Expiry Alert - Muhim bildirishnoma tepada qolishi yaxshi */}
        {upcomingExpiry && (
          <div className="bg-orange-500/10 border border-orange-500/20 rounded-[2rem] p-4 flex gap-3">
            <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center shrink-0">
              <AlertCircle className="w-5 h-5 text-orange-600" />
            </div>
            <div className="flex-1">
              <p className="text-[13px] font-bold text-foreground">Diqqat, muddat tugamoqda!</p>
              <p className="text-[11px] text-muted-foreground mt-0.5 uppercase tracking-tighter font-medium">
                {upcomingExpiry.type}: {upcomingExpiry.date}
              </p>
            </div>
          </div>
        )}

        {/* 3. Sug'urta taqsimoti */}
        <div className="bg-card border border-border rounded-[2.5rem] p-5 shadow-sm">
          <h3 className="text-xs font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
            <PieChart className="w-4 h-4 text-[#1B4332]" /> Sug'urta taqsimoti
          </h3>
          <div className="space-y-4">
            {categories.map((cat, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex justify-between text-[11px] font-bold text-foreground">
                  <span>{cat.name}</span>
                  <span>{cat.percent}%</span>
                </div>
                <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                  <div className={`h-full ${cat.color} rounded-full transition-all duration-700`} style={{ width: `${cat.percent}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Xarajatlar dinamikasi */}
        <div className="bg-card border border-border rounded-[2.5rem] p-5 shadow-sm">
          <h3 className="text-xs font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#1B4332]" /> Xarajatlar dinamikasi
          </h3>
          <div className="flex items-end gap-1.5 h-24 px-1">
            {getMonthlyData().map((height, i) => (
              <div key={i} className={`flex-1 rounded-t-lg transition-all duration-500 ${i === new Date().getMonth() ? "bg-[#1B4332]" : "bg-[#1B4332]/20"}`} style={{ height: `${height}%` }} />
            ))}
          </div>
          <div className="flex justify-between mt-3 text-[9px] font-bold text-muted-foreground px-1">
            <span>Y</span><span>F</span><span>M</span><span>A</span><span>M</span><span>I</span><span>I</span><span>A</span><span>S</span><span>O</span><span>N</span><span>D</span>
          </div>
        </div>
      </div>
    </div>
  );
}
