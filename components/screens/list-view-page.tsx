"use client";

import { ChevronLeft, ShieldCheck, Wallet, TrendingUp, Gift } from "lucide-react";

interface ListViewPageProps {
  type: 'policies' | 'payments' | 'coverage' | 'cashback';
  data: any[];
  onBack: () => void;
}

export function ListViewPage({ type, data, onBack }: ListViewPageProps) {
  const titles = {
    policies: "Faol polislar ro'yxati",
    payments: "To'lovlar tarixi",
    coverage: "Sug'urta himoyalari",
    cashback: "Cashback tarixi"
  };

  const icons = {
    policies: <ShieldCheck className="w-5 h-5 text-primary" />,
    payments: <Wallet className="w-5 h-5 text-primary" />,
    coverage: <TrendingUp className="w-5 h-5 text-primary" />,
    cashback: <Gift className="w-5 h-5 text-green-600" />
  };

  return (
    <div className="h-full flex flex-col bg-background animate-in slide-in-from-right duration-300">
      <div className="px-5 pt-4 pb-3 border-b border-border flex items-center gap-3 bg-card/50">
        <button onClick={onBack} className="w-10 h-10 rounded-2xl bg-secondary flex items-center justify-center active:scale-90 transition-all">
          <ChevronLeft className="w-5 h-5 text-foreground" />
        </button>
        <h1 className="text-base font-bold text-foreground">{titles[type]}</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-3 no-scrollbar">
        {data.map((item, idx) => (
          <div key={idx} className="bg-card border border-border rounded-[2rem] p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                  {icons[type]}
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground leading-none">{item.title || item.type}</p>
                  <p className="text-[10px] text-muted-foreground mt-1">{item.subtitle || item.company || item.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-black text-primary">{item.amount || item.value} so'm</p>
                {item.status && (
                   <span className="text-[8px] font-black uppercase bg-green-500/10 text-green-600 px-1.5 py-0.5 rounded ml-auto block w-fit mt-1">
                     {item.status}
                   </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
