"use client";

import { useState, useMemo } from "react";
import {
  ChevronLeft,
  FileText,
  Clock,
  CheckCircle2,
  Circle,
  AlertCircle,
  Camera,
  Upload,
  Plus,
  Hourglass,
  Wallet,
  Filter
} from "lucide-react";
import { useTransactionStore } from "@/lib/transaction-store";

interface ClaimsTrackerProps {
  onBack: () => void;
}

// Filtr turlari uchun type
type FilterType = 'all' | 'processing' | 'completed';

export function ClaimsTracker({ onBack }: ClaimsTrackerProps) {
  const { claims, addClaim, policies } = useTransactionStore();
  
  const [selectedClaim, setSelectedClaim] = useState<any>(null);
  const [showNewClaim, setShowNewClaim] = useState(false);
  
  // YANGI: Hozirgi aktiv filtr holati
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  // Form state
  const [formData, setFormData] = useState({
    policyId: "",
    date: "",
    description: "",
    amount: ""
  });

  const activePolicies = policies.filter(p => p.status === "active");

  // Statistikani hisoblash
  const claimsStats = useMemo(() => {
    const processing = claims.filter(c => c.status === 'processing').length;
    const completed = claims.filter(c => c.status === 'completed').length;
    return { processing, completed };
  }, [claims]);

  // YANGI: Ro'yxatni filtrlab olish logikasi
  const filteredClaims = useMemo(() => {
    if (activeFilter === 'all') return claims;
    return claims.filter(c => c.status === activeFilter);
  }, [claims, activeFilter]);

  // Filtrni o'zgartirish funksiyasi (bosilganda o'chirish yoki yoqish)
  const toggleFilter = (type: FilterType) => {
    if (activeFilter === type) {
      setActiveFilter('all'); // Agar shu tugma oldin bosilgan bo'lsa, filtrni bekor qilish
    } else {
      setActiveFilter(type); // Aks holda yangi filtrni yoqish
    }
  };

  const handleFormSubmit = () => {
    if (!formData.policyId || !formData.date || !formData.amount) {
      alert("Iltimos, barcha majburiy maydonlarni to'ldiring!");
      return;
    }

    const selectedPolicy = policies.find(p => p.id.toString() === formData.policyId);

    const newClaim = {
      id: Math.floor(1000 + Math.random() * 9000),
      type: selectedPolicy?.type || "Sug'urta hodisasi",
      company: selectedPolicy?.company || "Noma'lum",
      policyNumber: selectedPolicy?.policyNumber || "Noma'lum",
      amount: formData.amount,
      status: 'processing' as const,
      submittedDate: new Date().toLocaleDateString('uz-UZ'),
      steps: [
        { name: "Ariza qabul qilindi", date: "Bugun", completed: true },
        { name: "Ekspertizaga yuborildi", completed: false },
        { name: "To'lov jarayoni", completed: false }
      ]
    };

    addClaim(newClaim);
    setShowNewClaim(false);
    setFormData({ policyId: "", date: "", description: "", amount: "" });
    setActiveFilter('processing'); // Yangi ariza qo'shilganda avtomat 'Jarayonda' ga o'tish
  };

  // 1. YANGI ARIZA BERISH EKRANI (O'zgarmadi)
  if (showNewClaim) {
    return (
      <div className="h-full flex flex-col bg-background animate-in slide-in-from-right duration-300">
        <div className="px-5 pt-4 pb-3 border-b border-border">
          <div className="flex items-center gap-3">
            <button onClick={() => setShowNewClaim(false)} className="w-10 h-10 rounded-2xl bg-secondary flex items-center justify-center active:scale-90 transition-all">
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
            <div>
              <h1 className="text-base font-bold">Yangi Claim</h1>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Ariza yuborish</p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-5 no-scrollbar">
          <div className="space-y-2">
            <label className="text-sm font-bold">Polis tanlang *</label>
            <select 
              className="w-full bg-card border border-border rounded-2xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              value={formData.policyId}
              onChange={(e) => setFormData({...formData, policyId: e.target.value})}
            >
              <option value="">Polisni tanlang...</option>
              {activePolicies.map(p => (
                <option key={p.id} value={p.id}>{p.policyNumber} - {p.type}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold">Hodisa sanasi *</label>
            <input
              type="date"
              className="w-full bg-card border border-border rounded-2xl px-4 py-3 text-sm outline-none"
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold">Hodisa tavsifi</label>
            <textarea
              rows={3}
              className="w-full bg-card border border-border rounded-2xl px-4 py-3 text-sm outline-none resize-none"
              placeholder="Nima sodir bo'lganini yozing..."
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold">Hujjatlar va suratlar <span className="text-[10px] text-muted-foreground font-normal">(ixtiyoriy)</span></label>
            <div className="grid grid-cols-3 gap-3">
              <button className="aspect-square bg-card border-2 border-dashed border-border rounded-2xl flex flex-col items-center justify-center gap-1 active:bg-secondary transition-colors group">
                <Camera className="w-6 h-6 text-muted-foreground group-active:text-primary" />
                <span className="text-[10px] text-muted-foreground">Kamera</span>
              </button>
              <button className="aspect-square bg-card border-2 border-dashed border-border rounded-2xl flex flex-col items-center justify-center gap-1 active:bg-secondary transition-colors group">
                <Upload className="w-6 h-6 text-muted-foreground group-active:text-primary" />
                <span className="text-[10px] text-muted-foreground">Yuklash</span>
              </button>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold">Taxminiy zarar summasi (so'm) *</label>
            <input
              type="text"
              className="w-full bg-card border border-border rounded-2xl px-4 py-3 text-sm outline-none"
              placeholder="1,500,000"
              value={formData.amount}
              onChange={(e) => setFormData({...formData, amount: e.target.value})}
            />
          </div>
          <div className="bg-primary/5 rounded-2xl p-4 flex gap-3 border border-primary/10">
            <AlertCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <p className="text-[11px] text-muted-foreground leading-tight">
              Arizangiz 24 soat ichida ko'rib chiqiladi. Mutaxassislarimiz siz bilan bog'lanishadi.
            </p>
          </div>
        </div>
        <div className="p-5 border-t border-border bg-background">
          <button 
            onClick={handleFormSubmit}
            className="w-full bg-primary text-primary-foreground rounded-2xl py-4 font-bold active:scale-95 transition-all shadow-lg shadow-primary/20"
          >
            Arizani topshirish
          </button>
        </div>
      </div>
    );
  }

  // 2. ARIZA DETALLARI EKRANI (O'zgarmadi)
  if (selectedClaim) {
    const completedSteps = selectedClaim.steps.filter((s: any) => s.completed).length;
    return (
      <div className="h-full flex flex-col bg-background animate-in slide-in-from-right duration-300">
        <div className="px-5 pt-4 pb-3 border-b border-border">
          <div className="flex items-center gap-3">
            <button onClick={() => setSelectedClaim(null)} className="w-10 h-10 rounded-2xl bg-secondary flex items-center justify-center">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h1 className="text-base font-bold">Claim #{selectedClaim.id}</h1>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-5 space-y-4 no-scrollbar">
            <div className="bg-card border border-border rounded-[2rem] p-5">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <p className="text-lg font-bold">{selectedClaim.type}</p>
                        <p className="text-xs text-muted-foreground">{selectedClaim.company}</p>
                    </div>
                    <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase ${selectedClaim.status === 'completed' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
                        {selectedClaim.status === 'completed' ? 'To\'langan' : 'Jarayonda'}
                    </span>
                </div>
                <div className="pt-4 border-t border-border/50 grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-[10px] text-muted-foreground uppercase font-bold">Summa</p>
                        <p className="text-sm font-black">{selectedClaim.amount} so'm</p>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] text-muted-foreground uppercase font-bold">Sana</p>
                        <p className="text-sm font-bold">{selectedClaim.submittedDate}</p>
                    </div>
                </div>
            </div>
            <div className="bg-card border border-border rounded-[2rem] p-5">
                <p className="text-sm font-bold mb-4">Jarayon holati</p>
                <div className="space-y-6 relative">
                    <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-secondary"></div>
                    {selectedClaim.steps.map((step: any, idx: number) => (
                        <div key={idx} className="flex gap-4 relative z-10">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step.completed ? 'bg-primary border-primary text-white' : 'bg-background border-secondary text-muted-foreground'}`}>
                                {step.completed ? <CheckCircle2 size={16} /> : <Circle size={16} />}
                            </div>
                            <div>
                                <p className={`text-sm font-bold ${step.completed ? 'text-foreground' : 'text-muted-foreground'}`}>{step.name}</p>
                                {step.date && <p className="text-[10px] text-muted-foreground">{step.date}</p>}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>
    );
  }

  // 3. ASOSIY RO'YXAT (O'zgartirildi)
  return (
    <div className="h-full flex flex-col bg-background animate-in fade-in duration-300">
      <div className="px-5 pt-4 pb-3">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={onBack} className="w-10 h-10 rounded-2xl bg-secondary flex items-center justify-center active:scale-90 transition-all">
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>
          <div className="flex-1">
            <h1 className="text-base font-bold">Da'volar markazi</h1>
            <p className="text-[10px] text-muted-foreground">Arizalar tarixi va holati</p>
          </div>
          <button onClick={() => setShowNewClaim(true)} className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20 active:scale-90 transition-all">
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {/* STATISTIKA VA FILTR TUGMALARI */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {/* Jarayonda Tugmasi */}
          <button 
            onClick={() => toggleFilter('processing')}
            className={`relative overflow-hidden p-4 rounded-[1.8rem] text-left transition-all active:scale-95 duration-200 border-2
              ${activeFilter === 'processing' 
                ? 'bg-[#1e293b] border-primary shadow-lg ring-2 ring-primary/20' 
                : 'bg-[#1e293b] border-transparent shadow-md'
              }`}
          >
             <div className="relative z-10">
               <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center mb-3 text-white">
                 <Hourglass size={16} />
               </div>
               <p className="text-2xl font-bold text-white leading-none mb-1">{claimsStats.processing}</p>
               <div className="flex items-center justify-between">
                 <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Jarayonda</p>
                 {activeFilter === 'processing' && <Filter size={10} className="text-white animate-pulse"/>}
               </div>
             </div>
             {/* Vizual bezak */}
             <div className="absolute -right-2 -bottom-4 w-16 h-16 rounded-full border-4 border-white/5"></div>
          </button>

          {/* To'langan Tugmasi */}
          <button 
            onClick={() => toggleFilter('completed')}
            className={`relative overflow-hidden p-4 rounded-[1.8rem] text-left transition-all active:scale-95 duration-200 border-2
              ${activeFilter === 'completed'
                ? 'bg-white border-green-500 shadow-lg ring-2 ring-green-500/20'
                : 'bg-white border-border shadow-sm'
              }`}
          >
             <div className="relative z-10">
               <div className="w-8 h-8 bg-green-500/10 rounded-lg flex items-center justify-center mb-3 text-green-600">
                 <Wallet size={16} />
               </div>
               <p className="text-2xl font-bold text-foreground leading-none mb-1">{claimsStats.completed}</p> 
               <div className="flex items-center justify-between">
                 <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">To'langan</p>
                 {activeFilter === 'completed' && <Filter size={10} className="text-green-600 animate-pulse"/>}
               </div>
             </div>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-10 space-y-3 no-scrollbar">
        <div className="flex items-center justify-between mb-2 px-1">
            <h3 className="text-xs font-black text-foreground uppercase tracking-widest">
              {activeFilter === 'all' ? "Barcha arizalar" : activeFilter === 'processing' ? "Jarayondagi arizalar" : "To'langan arizalar"}
            </h3>
            {activeFilter !== 'all' && (
              <button onClick={() => setActiveFilter('all')} className="text-[10px] text-primary font-bold">Barchasini ko'rish</button>
            )}
        </div>
        
        {filteredClaims.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center bg-secondary/20 rounded-[2.5rem] border-2 border-dashed border-border/50">
            <FileText className="w-12 h-12 text-muted-foreground/30 mb-3" />
            <p className="text-xs font-bold text-muted-foreground">
              {activeFilter === 'all' ? "Hozircha arizalar yo'q" : "Bu bo'limda arizalar topilmadi"}
            </p>
          </div>
        ) : (
          filteredClaims.map((claim: any) => (
            <button
              key={claim.id}
              onClick={() => setSelectedClaim(claim)}
              className="w-full bg-card border border-border rounded-[2rem] p-4 active:scale-[0.98] transition-all shadow-sm group animate-in slide-in-from-bottom-2 duration-300"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                    <p className="text-sm font-bold text-foreground text-left">{claim.type}</p>
                    <p className="text-[10px] text-muted-foreground text-left">{claim.company}</p>
                </div>
                <div className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase ${
                  claim.status === "completed" ? "bg-green-100 text-green-600" : "bg-yellow-100 text-yellow-600"
                }`}>
                  {claim.status === "completed" ? "To'landi" : "Jarayonda"}
                </div>
              </div>
              <div className="flex justify-between items-center mt-4 pt-3 border-t border-border/40">
                <span className="text-sm font-black text-foreground">{claim.amount} <span className="text-[10px] font-normal text-muted-foreground">so'm</span></span>
                <div className="flex items-center gap-1 text-[10px] text-muted-foreground font-bold">
                    <Clock size={12} /> {claim.submittedDate}
                </div>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}
