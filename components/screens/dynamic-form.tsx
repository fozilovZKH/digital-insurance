"use client";

import { useState } from "react";
import { ArrowLeft, ShieldCheck, Loader2, CheckCircle2, Phone } from "lucide-react";

interface DynamicFormProps {
  companyName: string;
  serviceName: string;
  serviceType: string;
  onBack: () => void;
  onSubmit: (amount: string) => void;
  onContactSpecialist?: () => void;
}

// Service prices in UZS
const servicePrices: Record<string, string> = {
  auto: "350,000",
  property: "850,000",
  life: "1,200,000",
  health: "2,500,000",
  travel: "180,000",
  work: "450,000",
  civil: "320,000",
  credit: "280,000",
  pension: "1,500,000",
  accident: "420,000",
  electronics: "150,000",
  special: "550,000",
};

// Heavy asset types that require specialist contact
const heavyAssetTypes = ["cargo", "agro", "tech", "finance", "professional"];

export function DynamicForm({ 
  companyName, 
  serviceName, 
  serviceType, 
  onBack, 
  onSubmit,
  onContactSpecialist 
}: DynamicFormProps) {
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  
  // Auto form state
  const [jshshir, setJshshir] = useState("");
  const [autoNumber, setAutoNumber] = useState("");
  const [autoData, setAutoData] = useState<{
    fullName: string;
    carModel: string;
    techPassport: string;
  } | null>(null);

  // Property form state
  const [cadastreNumber, setCadastreNumber] = useState("");
  const [propertyData, setPropertyData] = useState<{
    owner: string;
    address: string;
    area: string;
  } | null>(null);

  // Health/Travel form state
  const [passportSeries, setPassportSeries] = useState("");
  const [birthDate, setBirthDate] = useState("");

  // Lead form state
  const [leadName, setLeadName] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [leadCompany, setLeadCompany] = useState("");

  const isAutoService = serviceType === "auto";
  const isPropertyService = serviceType === "property";
  const isHealthOrTravelService = serviceType === "health" || serviceType === "travel";
  const isHeavyAssetService = heavyAssetTypes.includes(serviceType);

  const handleVerify = () => {
    setLoading(true);
    setTimeout(() => {
      if (isAutoService) {
        setAutoData({
          fullName: "Aliyev Vali Karimovich",
          carModel: "Chevrolet Malibu 2 (2023)",
          techPassport: "AAF 1234567",
        });
      } else if (isPropertyService) {
        setPropertyData({
          owner: "Aliyev Vali Karimovich",
          address: "Toshkent sh., Mirzo Ulug'bek t., 25-uy",
          area: "85.5",
        });
      }
      setLoading(false);
      setVerified(true);
    }, 1500);
  };

  const handleLeadSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setLeadSubmitted(true);
    }, 1000);
  };

  const isFormValid = () => {
    if (isAutoService) {
      return jshshir.length >= 14 && autoNumber.length >= 6;
    }
    if (isPropertyService) {
      return cadastreNumber.length >= 8;
    }
    if (isHealthOrTravelService) {
      return passportSeries.length >= 9 && birthDate.length >= 10;
    }
    if (isHeavyAssetService) {
      return leadName.length >= 3 && leadPhone.length >= 9;
    }
    return true;
  };

  // Lead generation form for heavy assets
  if (isHeavyAssetService) {
    if (leadSubmitted) {
      return (
        <div className="h-full flex flex-col bg-background">
          <div className="px-5 pt-4 pb-3">
            <div className="flex items-center gap-3">
              <button
                onClick={onBack}
                className="w-10 h-10 rounded-2xl bg-card border border-border flex items-center justify-center hover:bg-secondary transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-foreground" />
              </button>
              <div className="flex-1">
                <h1 className="text-base font-bold text-foreground">{serviceName}</h1>
                <p className="text-xs text-muted-foreground">{companyName}</p>
              </div>
            </div>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center px-5 pb-8">
            <div className="w-20 h-20 rounded-full bg-[#2E7D32]/10 flex items-center justify-center mb-6">
              <CheckCircle2 className="w-12 h-12 text-[#2E7D32]" />
            </div>
            <h2 className="text-lg font-bold text-foreground text-center mb-2">
              {"So'rovingiz qabul qilindi!"}
            </h2>
            <p className="text-sm text-muted-foreground text-center mb-6">
              Mutaxassisimiz 24 soat ichida siz bilan bog'lanadi
            </p>
            <button
              onClick={onBack}
              className="text-primary font-medium text-sm hover:underline"
            >
              {"Bosh sahifaga qaytish"}
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="h-full flex flex-col bg-background">
        <div className="px-5 pt-4 pb-3">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="w-10 h-10 rounded-2xl bg-card border border-border flex items-center justify-center hover:bg-secondary transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </button>
            <div className="flex-1">
              <h1 className="text-base font-bold text-foreground">{serviceName}</h1>
              <p className="text-xs text-muted-foreground">{companyName}</p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-5 pb-8">
          <div className="bg-card rounded-3xl border border-border p-5">
            <div className="flex items-center gap-3 mb-4">
              <Phone className="w-5 h-5 text-primary" />
              <h2 className="text-sm font-semibold text-foreground">
                {"Mutaxassis bilan bog'lanish"}
              </h2>
            </div>
            <p className="text-xs text-muted-foreground mb-4">
              {"Bu xizmat turi bo'yicha mutaxassisimiz siz bilan bog'lanib, individual taklif tayyorlaydi."}
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-2">
                  F.I.O
                </label>
                <input
                  type="text"
                  value={leadName}
                  onChange={(e) => setLeadName(e.target.value)}
                  placeholder="To'liq ismingiz"
                  className="w-full px-4 py-3 bg-secondary rounded-2xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-2">
                  Telefon raqami
                </label>
                <input
                  type="text"
                  value={leadPhone}
                  onChange={(e) => setLeadPhone(e.target.value)}
                  placeholder="+998 90 123 45 67"
                  className="w-full px-4 py-3 bg-secondary rounded-2xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-2">
                  Tashkilot nomi (ixtiyoriy)
                </label>
                <input
                  type="text"
                  value={leadCompany}
                  onChange={(e) => setLeadCompany(e.target.value)}
                  placeholder="Kompaniya nomi"
                  className="w-full px-4 py-3 bg-secondary rounded-2xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <button
                onClick={handleLeadSubmit}
                disabled={!isFormValid() || loading}
                className="w-full bg-primary text-primary-foreground py-3.5 rounded-2xl font-semibold text-sm hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {"Yuborilmoqda..."}
                  </>
                ) : (
                  "Mutaxassis bilan bog'lanish"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="px-5 pt-4 pb-3">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-2xl bg-card border border-border flex items-center justify-center hover:bg-secondary transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <div className="flex-1">
            <h1 className="text-base font-bold text-foreground">{serviceName}</h1>
            <p className="text-xs text-muted-foreground">{companyName}</p>
          </div>
        </div>
      </div>

      {/* Verified Badge */}
      <div className="px-5 mb-4">
        <div className="bg-primary/10 rounded-2xl px-4 py-3 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-primary" />
          <span className="text-xs font-medium text-primary">
            Rasmiy davlat xizmati orqali tasdiqlangan
          </span>
        </div>
      </div>

      {/* Form Content */}
      <div className="flex-1 overflow-y-auto px-5 pb-8">
        <div className="bg-card rounded-3xl border border-border p-5">
          <h2 className="text-sm font-semibold text-foreground mb-4">
            {"Ma'lumotlarni kiriting"}
          </h2>

          {/* Auto Form (OSAGO/KASKO) */}
          {isAutoService && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-2">
                  JSHSHIR (14 raqam)
                </label>
                <input
                  type="text"
                  value={jshshir}
                  onChange={(e) => setJshshir(e.target.value.replace(/\D/g, "").slice(0, 14))}
                  placeholder="12345678901234"
                  className="w-full px-4 py-3 bg-secondary rounded-2xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-2">
                  Avto raqami
                </label>
                <input
                  type="text"
                  value={autoNumber}
                  onChange={(e) => setAutoNumber(e.target.value.toUpperCase().slice(0, 8))}
                  placeholder="01A123AA"
                  className="w-full px-4 py-3 bg-secondary rounded-2xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {!verified && (
                <button
                  onClick={handleVerify}
                  disabled={!isFormValid() || loading}
                  className="w-full bg-primary text-primary-foreground py-3.5 rounded-2xl font-semibold text-sm hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {"Tekshirilmoqda..."}
                    </>
                  ) : (
                    "Ma'lumotlarni integratsiya orqali to'ldirish"
                  )}
                </button>
              )}

              {autoData && (
                <div className="mt-4 space-y-3">
                  <div className="flex items-center gap-2 text-primary mb-3">
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="text-xs font-medium">{"Ma'lumotlar tasdiqlandi"}</span>
                  </div>
                  <div className="bg-secondary rounded-2xl p-4 space-y-3">
                    <div>
                      <p className="text-xs text-muted-foreground">F.I.O</p>
                      <p className="text-sm font-medium text-foreground">{autoData.fullName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Mashina modeli</p>
                      <p className="text-sm font-medium text-foreground">{autoData.carModel}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Tex-pasport raqami</p>
                      <p className="text-sm font-medium text-foreground">{autoData.techPassport}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Property Form (Mulk/Uy-joy) */}
          {isPropertyService && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-2">
                  Kadastr raqami
                </label>
                <input
                  type="text"
                  value={cadastreNumber}
                  onChange={(e) => setCadastreNumber(e.target.value.slice(0, 20))}
                  placeholder="10:03:05:12:0045"
                  className="w-full px-4 py-3 bg-secondary rounded-2xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {!verified && (
                <button
                  onClick={handleVerify}
                  disabled={!isFormValid() || loading}
                  className="w-full bg-primary text-primary-foreground py-3.5 rounded-2xl font-semibold text-sm hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {"Tekshirilmoqda..."}
                    </>
                  ) : (
                    "Uy ma'lumotlarini aniqlash"
                  )}
                </button>
              )}

              {propertyData && (
                <div className="mt-4 space-y-3">
                  <div className="flex items-center gap-2 text-primary mb-3">
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="text-xs font-medium">{"Ma'lumotlar tasdiqlandi"}</span>
                  </div>
                  <div className="bg-secondary rounded-2xl p-4 space-y-3">
                    <div>
                      <p className="text-xs text-muted-foreground">Uy egasi</p>
                      <p className="text-sm font-medium text-foreground">{propertyData.owner}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Manzil</p>
                      <p className="text-sm font-medium text-foreground">{propertyData.address}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Maydoni</p>
                      <p className="text-sm font-medium text-foreground">{propertyData.area} kv.m</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Health/Travel Form */}
          {isHealthOrTravelService && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-2">
                  Pasport seriyasi va raqami
                </label>
                <input
                  type="text"
                  value={passportSeries}
                  onChange={(e) => setPassportSeries(e.target.value.toUpperCase().slice(0, 9))}
                  placeholder="AB 1234567"
                  className="w-full px-4 py-3 bg-secondary rounded-2xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-2">
                  {"Tug'ilgan sana"}
                </label>
                <input
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="w-full px-4 py-3 bg-secondary rounded-2xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          )}

          {/* Generic Form for other services */}
          {!isAutoService && !isPropertyService && !isHealthOrTravelService && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-2">
                  JSHSHIR (14 raqam)
                </label>
                <input
                  type="text"
                  value={jshshir}
                  onChange={(e) => setJshshir(e.target.value.replace(/\D/g, "").slice(0, 14))}
                  placeholder="12345678901234"
                  className="w-full px-4 py-3 bg-secondary rounded-2xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-2">
                  Telefon raqami
                </label>
                <input
                  type="text"
                  placeholder="+998 90 123 45 67"
                  className="w-full px-4 py-3 bg-secondary rounded-2xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          )}
        </div>

        {/* Continue Button */}
        {(verified || isHealthOrTravelService || (!isAutoService && !isPropertyService)) && !isHeavyAssetService && (
          <div className="mt-4">
            <div className="bg-card rounded-2xl border border-border p-4 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Xizmat narxi</span>
                <span className="text-lg font-bold text-primary">
                  {servicePrices[serviceType] || "450,000"} {"so'm"}
                </span>
              </div>
            </div>
            <button
              onClick={() => onSubmit(servicePrices[serviceType] || "450,000")}
              className="w-full bg-primary text-primary-foreground py-4 rounded-3xl font-semibold text-sm hover:bg-primary/90 transition-colors"
            >
              {"To'lovga o'tish"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
