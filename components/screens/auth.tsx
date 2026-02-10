"use client";

import { useState } from "react";
import { ShieldCheck, Smartphone, Fingerprint, KeySquare, Loader2, Building2, User } from "lucide-react";
import { userProfile } from "@/lib/insurance-data";

interface AuthProps {
  onLogin: () => void;
}

type AuthMethod = "one-id" | "my-id" | "eri" | null;
type UserType = "individual" | "legal" | null;

export function Auth({ onLogin }: AuthProps) {
  const [userType, setUserType] = useState<UserType>(null);
  const [selectedMethod, setSelectedMethod] = useState<AuthMethod>(null);
  const [loading, setLoading] = useState(false);

  // Metodlar massivi logikasi
  const authMethods = [
    {
      id: "one-id" as const,
      name: "ONE ID",
      description: "Davlat xizmatlari portali orqali",
      icon: <Fingerprint className="w-6 h-6" />,
      color: "bg-blue-600",
      forLegal: false,
    },
    {
      id: "my-id" as const,
      name: "MY ID",
      description: "Mobil ilova orqali tasdiqlash",
      icon: <Smartphone className="w-6 h-6" />,
      color: "bg-teal-600",
      forLegal: false,
    },
    {
      id: "eri" as const,
      name: "ERI",
      description: "Elektron raqamli imzo",
      icon: <KeySquare className="w-6 h-6" />,
      color: "bg-purple-600",
      forLegal: true,
    },
  ];

  const handleAuth = (method: AuthMethod) => {
    setSelectedMethod(method);
    setLoading(true);
    
    // Ma'lumotlarni saqlash (Sidebar uchun)
    (userProfile as any).loginMethod = method;
    (userProfile as any).userType = userType || "individual";

    setTimeout(() => {
      setLoading(false);
      onLogin();
    }, 2000);
  };

  const filteredMethods = userType === "legal" 
    ? authMethods.filter(m => m.forLegal) 
    : authMethods.filter(m => !m.forLegal);

  return (
    <div className="h-full flex flex-col bg-background p-6">
      <div className="flex-1 flex flex-col items-center justify-center">
        
        {/* HAR DOIM KO'RINADIGAN LOGO VA HEADER */}
        <div className="mb-8 flex flex-col items-center">
          <div className="w-20 h-20 rounded-3xl bg-primary flex items-center justify-center mb-4 shadow-lg shadow-primary/20">
            <ShieldCheck className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">DIGITAL Insurance</h1>
          <p className="text-sm text-muted-foreground mt-1">Raqamli Sug'urta</p>
        </div>

        {/* 1-ETAP: FOYDALANUVCHI TURINI TANLASH */}
        {!userType && (
          <div className="w-full max-w-sm space-y-4">
            <h2 className="text-sm font-bold text-center mb-6 text-muted-foreground uppercase tracking-widest">
              Foydalanuvchi turi
            </h2>
            <button 
              onClick={() => setUserType("individual")} 
              className="w-full p-5 bg-card border-2 border-border rounded-[2rem] flex items-center gap-4 active:scale-95 transition-all hover:border-primary/50"
            >
              <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                <User />
              </div>
              <div className="text-left font-bold text-sm">Jismoniy shaxs</div>
            </button>
            <button 
              onClick={() => setUserType("legal")} 
              className="w-full p-5 bg-card border-2 border-border rounded-[2rem] flex items-center gap-4 active:scale-95 transition-all hover:border-purple-600/50"
            >
              <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600 shrink-0">
                <Building2 />
              </div>
              <div className="text-left font-bold text-sm">Yuridik shaxs (ERI)</div>
            </button>
          </div>
        )}

        {/* 2-ETAP: KIRISH METODINI TANLASH */}
        {userType && !loading && (
          <div className="w-full max-w-sm space-y-3">
            <div className="flex justify-between items-center mb-4 px-2">
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-tighter">
                {userType === "legal" ? "Yuridik" : "Jismoniy"} kirish usuli
              </p>
              <button 
                onClick={() => setUserType(null)} 
                className="text-xs text-primary font-bold hover:underline"
              >
                Orqaga
              </button>
            </div>
            
            {filteredMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => handleAuth(method.id)}
                className="w-full p-4 bg-card border border-border rounded-[2rem] flex items-center gap-4 active:scale-95 transition-all shadow-sm"
              >
                <div className={`w-12 h-12 rounded-2xl ${method.color} flex items-center justify-center text-white shrink-0`}>
                  {method.icon}
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold">{method.name}</p>
                  <p className="text-[10px] text-muted-foreground">{method.description}</p>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* 3-ETAP: LOADING (TASDIQLASH) */}
        {loading && (
          <div className="text-center space-y-4 animate-in fade-in duration-500">
            <div className="relative">
              <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto" />
              <div className="absolute inset-0 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 text-primary" />
              </div>
            </div>
            <p className="text-xs font-black text-muted-foreground uppercase tracking-[0.2em]">
              {selectedMethod?.toUpperCase()} TASDIQLANMOQDA...
            </p>
          </div>
        )}
      </div>

      {/* FOOTER */}
      {!loading && (
        <div className="px-6 pb-4">
          <div className="bg-primary/5 rounded-2xl px-4 py-3 flex items-center justify-center gap-2 border border-primary/10">
            <ShieldCheck className="w-4 h-4 text-primary" />
            <span className="text-[10px] text-primary font-bold uppercase tracking-tight">
              Raqamli Hukumat loyihalarni boshqarish markazi
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
