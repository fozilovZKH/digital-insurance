"use client";

import { useState } from "react";
import { ArrowLeft, CheckCircle2, Download, QrCode, Gift, Bell } from "lucide-react";
import { useTransactionStore, createPolicyFromPayment } from "@/lib/transaction-store";

interface PaymentSuccessProps {
  companyName: string;
  serviceName: string;
  amount?: string;
  onBack: () => void;
  onGoHome: () => void;
}

export function PaymentSuccess({ 
  companyName, 
  serviceName, 
  amount = "450,000",
  onBack, 
  onGoHome 
}: PaymentSuccessProps) {
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [isPaid, setIsPaid] = useState(false);
  const [policyNumber, setPolicyNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cashbackAmount, setCashbackAmount] = useState("");

  const { addPolicy, addPayment } = useTransactionStore();

  const paymentMethods = [
    { id: "payme", name: "Payme", color: "#00CDCD" },
    { id: "click", name: "Click", color: "#33AAFF" },
    { id: "uzum", name: "Uzum Bank", color: "#7B68EE" },
  ];

  const handlePayment = () => {
    if (selectedPayment) {
      const methodName = paymentMethods.find((m) => m.id === selectedPayment)?.name || "Payme";
      const { policy, payment } = createPolicyFromPayment(serviceName, companyName, amount, methodName);
      
      // Save to store
      addPolicy(policy);
      addPayment(payment);
      
      // Set display values
      setPolicyNumber(policy.policyNumber);
      setExpiryDate(policy.endDate);
      const cashback = Math.round(parseInt(amount.replace(/,/g, ""), 10) * 0.01);
      setCashbackAmount(cashback.toLocaleString());
      
      setTimeout(() => {
        setIsPaid(true);
      }, 500);
    }
  };

  if (!isPaid) {
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
              <h1 className="text-base font-bold text-foreground">{"To'lov"}</h1>
              <p className="text-xs text-muted-foreground">{serviceName}</p>
            </div>
          </div>
        </div>

        {/* Payment Content */}
        <div className="flex-1 overflow-y-auto px-5 pb-8">
          {/* Order Summary */}
          <div className="bg-card rounded-3xl border border-border p-5 mb-4">
            <h2 className="text-sm font-semibold text-foreground mb-3">Buyurtma</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Xizmat</span>
                <span className="text-sm font-medium text-foreground">{serviceName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Kompaniya</span>
                <span className="text-sm font-medium text-foreground">{companyName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Muddat</span>
                <span className="text-sm font-medium text-foreground">1 yil</span>
              </div>
              <div className="h-px bg-border my-3" />
              <div className="flex justify-between">
                <span className="text-sm font-semibold text-foreground">Jami</span>
                <span className="text-lg font-bold text-primary">{amount} {"so'm"}</span>
              </div>
            </div>
          </div>

          {/* Cashback Badge */}
          <div className="bg-[#2E7D32]/10 rounded-2xl px-4 py-3 flex items-center gap-2 mb-4">
            <Gift className="w-5 h-5 text-[#2E7D32]" />
            <span className="text-xs font-medium text-[#2E7D32]">
              1% Cashback Soliq.uz orqali
            </span>
          </div>

          {/* Payment Methods */}
          <div className="bg-card rounded-3xl border border-border p-5 mb-6">
            <h2 className="text-sm font-semibold text-foreground mb-4">{"To'lov usulini tanlang"}</h2>
            <div className="space-y-3">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setSelectedPayment(method.id)}
                  className={`w-full flex items-center gap-3 p-4 rounded-2xl border-2 transition-colors ${
                    selectedPayment === method.id
                      ? "border-primary bg-primary/5"
                      : "border-border bg-secondary hover:border-primary/50"
                  }`}
                >
                  <div
                    className="w-12 h-8 rounded-lg flex items-center justify-center text-white font-bold text-xs"
                    style={{ backgroundColor: method.color }}
                  >
                    {method.name.charAt(0)}
                  </div>
                  <span className="text-sm font-medium text-foreground">{method.name}</span>
                  {selectedPayment === method.id && (
                    <CheckCircle2 className="w-5 h-5 text-primary ml-auto" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Pay Button */}
          <button
            onClick={handlePayment}
            disabled={!selectedPayment}
            className="w-full bg-primary text-primary-foreground py-4 rounded-3xl font-semibold text-sm hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {"To'lash"}
          </button>
        </div>
      </div>
    );
  }

  // Success Screen
  return (
    <div className="h-full flex flex-col bg-background">
      {/* Notification Banner */}
      <div className="px-5 pt-4">
        <div className="bg-primary/10 rounded-2xl px-4 py-3 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
            <Bell className="w-4 h-4 text-primary" />
          </div>
          <span className="text-xs font-medium text-primary flex-1">
            {"Yangi polis profilingizga qo'shildi"}
          </span>
        </div>
      </div>

      {/* Success Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-5 pb-8">
        {/* Success Icon */}
        <div className="w-24 h-24 rounded-full bg-[#2E7D32]/10 flex items-center justify-center mb-6">
          <CheckCircle2 className="w-14 h-14 text-[#2E7D32]" />
        </div>

        <h1 className="text-xl font-bold text-foreground text-center mb-2">
          {"Polis muvaffaqiyatli rasmiylashtirildi!"}
        </h1>
        <p className="text-sm text-muted-foreground text-center mb-6">
          {serviceName} - {companyName}
        </p>

        {/* Cashback Badge */}
        <div className="bg-[#2E7D32]/10 rounded-2xl px-5 py-3 flex items-center gap-2 mb-8">
          <Gift className="w-5 h-5 text-[#2E7D32]" />
          <span className="text-sm font-semibold text-[#2E7D32]">
            {cashbackAmount} {"so'm keshbek olindi!"}
          </span>
        </div>

        {/* Policy Details */}
        <div className="w-full bg-card rounded-3xl border border-border p-5 mb-6">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Polis raqami</span>
              <span className="text-sm font-medium text-foreground">{policyNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">{"Amal qilish muddati"}</span>
              <span className="text-sm font-medium text-foreground">{expiryDate} gacha</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">{"To'langan summa"}</span>
              <span className="text-sm font-medium text-foreground">{amount} {"so'm"}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full space-y-3">
          <button className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-4 rounded-3xl font-semibold text-sm hover:bg-primary/90 transition-colors">
            <Download className="w-5 h-5" />
            PDF yuklab olish
          </button>
          <button className="w-full flex items-center justify-center gap-2 bg-card border border-border text-foreground py-4 rounded-3xl font-semibold text-sm hover:bg-secondary transition-colors">
            <QrCode className="w-5 h-5" />
            {"QR-kodni ko'rish"}
          </button>
          <button
            onClick={onGoHome}
            className="w-full text-primary py-3 font-medium text-sm hover:underline"
          >
            {"Bosh sahifaga qaytish"}
          </button>
        </div>
      </div>
    </div>
  );
}
