"use client";

import React from "react"

import { insuranceServices } from "@/lib/insurance-data";
import {
  Car,
  ShieldCheck,
  Home,
  Heart,
  Stethoscope,
  Plane,
  HardHat,
  Truck,
  Wheat,
  Cog,
  Banknote,
  Briefcase,
  Users,
  CreditCard,
  PiggyBank,
  AlertTriangle,
  Smartphone,
  Star,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  car: <Car className="w-5 h-5" />,
  "shield-check": <ShieldCheck className="w-5 h-5" />,
  home: <Home className="w-5 h-5" />,
  heart: <Heart className="w-5 h-5" />,
  stethoscope: <Stethoscope className="w-5 h-5" />,
  plane: <Plane className="w-5 h-5" />,
  "hard-hat": <HardHat className="w-5 h-5" />,
  truck: <Truck className="w-5 h-5" />,
  wheat: <Wheat className="w-5 h-5" />,
  cog: <Cog className="w-5 h-5" />,
  banknote: <Banknote className="w-5 h-5" />,
  briefcase: <Briefcase className="w-5 h-5" />,
  users: <Users className="w-5 h-5" />,
  "credit-card": <CreditCard className="w-5 h-5" />,
  "piggy-bank": <PiggyBank className="w-5 h-5" />,
  "alert-triangle": <AlertTriangle className="w-5 h-5" />,
  smartphone: <Smartphone className="w-5 h-5" />,
  star: <Star className="w-5 h-5" />,
};

interface ServicesListProps {
  companyName: string;
  onBack: () => void;
  onServiceSelect: (serviceId: number, serviceName: string, serviceType: string) => void;
}

export function ServicesList({ companyName, onBack, onServiceSelect }: ServicesListProps) {
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
            <h1 className="text-base font-bold text-foreground">{companyName}</h1>
            <p className="text-xs text-muted-foreground">{"17+1 Xizmatlar ro'yxati"}</p>
          </div>
        </div>
      </div>

      {/* Services List */}
      <div className="flex-1 overflow-y-auto px-5 pb-8">
        <div className="bg-card rounded-3xl border border-border overflow-hidden">
          {insuranceServices.map((service, index) => (
            <button
              key={service.id}
              onClick={() => onServiceSelect(service.id, service.name, service.type)}
              className={`w-full flex items-center gap-3 p-4 hover:bg-secondary transition-colors ${
                index !== insuranceServices.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                {iconMap[service.icon]}
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-semibold text-foreground">{service.name}</p>
                <p className="text-xs text-muted-foreground">{service.fullName}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
