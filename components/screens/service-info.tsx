"use client";

import { serviceInfoContent, defaultServiceInfo } from "@/lib/insurance-data";
import { ArrowLeft, CheckCircle2, Banknote, Info } from "lucide-react";

interface ServiceInfoProps {
  serviceName: string;
  onBack: () => void;
  onSelectCompany: () => void;
}

export function ServiceInfo({ serviceName, onBack, onSelectCompany }: ServiceInfoProps) {
  const content = serviceInfoContent[serviceName] || defaultServiceInfo;

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
            <p className="text-xs text-muted-foreground">{"Xizmat haqida ma'lumot"}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5 pb-8">
        {/* About Section */}
        <div className="bg-card rounded-3xl border border-border p-5 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
              <Info className="w-4 h-4 text-primary" />
            </div>
            <h2 className="text-sm font-semibold text-foreground">Xizmat haqida</h2>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {content.about}
          </p>
        </div>

        {/* Coverage Section */}
        <div className="bg-card rounded-3xl border border-border p-5 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4 text-primary" />
            </div>
            <h2 className="text-sm font-semibold text-foreground">Nimalarni qoplaydi?</h2>
          </div>
          <ul className="space-y-2">
            {content.coverage.map((item, index) => (
              <li key={index} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Price Section */}
        <div className="bg-card rounded-3xl border border-border p-5 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
              <Banknote className="w-4 h-4 text-primary" />
            </div>
            <h2 className="text-sm font-semibold text-foreground">Narxi qancha?</h2>
          </div>
          <div className="bg-secondary rounded-2xl p-4">
            <p className="text-lg font-bold text-primary">{content.priceRange}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {"Aniq narx kompaniya va shartlarga bog'liq"}
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={onSelectCompany}
          className="w-full bg-primary text-primary-foreground py-4 rounded-3xl font-semibold text-sm hover:bg-primary/90 transition-colors"
        >
          {"Kompaniyani tanlash va sotib olish"}
        </button>
      </div>
    </div>
  );
}
