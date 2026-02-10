"use client";

import {
  ChevronLeft,
  Building2,
  Users,
  TrendingUp,
  TrendingDown,
  FileText,
  Clock,
  CheckCircle2,
  Star,
  Banknote,
  BarChart3,
  PieChart,
} from "lucide-react";
import { companyDashboardStats, insuranceCompanies } from "@/lib/insurance-data";

interface CompanyDashboardProps {
  onBack: () => void;
}

export function CompanyDashboard({ onBack }: CompanyDashboardProps) {
  const stats = companyDashboardStats.apex;
  const company = insuranceCompanies.find(c => c.name === "APEX")!;

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="px-5 pt-4 pb-3 border-b border-border bg-primary">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-2xl bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-primary-foreground" />
          </button>
          <div className="w-11 h-11 rounded-2xl bg-primary-foreground/20 flex items-center justify-center">
            <span className="text-lg font-bold text-primary-foreground">{company.logo}</span>
          </div>
          <div className="flex-1">
            <h1 className="text-base font-bold text-primary-foreground">{company.name} Dashboard</h1>
            <p className="text-xs text-primary-foreground/70">B2B Boshqaruv paneli</p>
          </div>
          <div className="flex items-center gap-1 bg-primary-foreground/20 px-2 py-1 rounded-full">
            <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
            <span className="text-xs font-bold text-primary-foreground">{company.rating}</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-card border border-border rounded-3xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-5 h-5 text-primary" />
              <span className="text-xs text-muted-foreground">Jami polislar</span>
            </div>
            <p className="text-xl font-bold text-foreground">{stats.totalPolicies.toLocaleString()}</p>
            <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
              <TrendingUp className="w-3 h-3" />
              +{stats.monthlyGrowth}% oylik
            </div>
          </div>
          
          <div className="bg-card border border-border rounded-3xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <span className="text-xs text-muted-foreground">Faol polislar</span>
            </div>
            <p className="text-xl font-bold text-foreground">{stats.activePolicies.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {((stats.activePolicies / stats.totalPolicies) * 100).toFixed(1)}% faollik
            </p>
          </div>
          
          <div className="bg-card border border-border rounded-3xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Banknote className="w-5 h-5 text-primary" />
              <span className="text-xs text-muted-foreground">Jami premiya</span>
            </div>
            <p className="text-lg font-bold text-foreground">{stats.totalPremium}</p>
            <p className="text-xs text-muted-foreground mt-1">{"so'm"}</p>
          </div>
          
          <div className="bg-card border border-border rounded-3xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="text-xs text-muted-foreground">Mijoz qoniqishi</span>
            </div>
            <p className="text-xl font-bold text-foreground">{stats.customerSatisfaction}</p>
            <p className="text-xs text-muted-foreground mt-1">5 dan</p>
          </div>
        </div>

        {/* Claims Overview */}
        <div className="bg-card border border-border rounded-3xl p-4">
          <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <FileText className="w-4 h-4 text-primary" />
            {"Da'volar statistikasi"}
          </h3>
          
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">{stats.claimsReceived}</p>
              <p className="text-xs text-muted-foreground">Qabul qilingan</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{stats.claimsPaid}</p>
              <p className="text-xs text-muted-foreground">{"To'langan"}</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">{stats.claimsReceived - stats.claimsPaid}</p>
              <p className="text-xs text-muted-foreground">Jarayonda</p>
            </div>
          </div>
          
          <div className="bg-secondary rounded-2xl p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{"O'rtacha ko'rib chiqish muddati"}</span>
              </div>
              <span className="text-sm font-bold text-foreground">{stats.avgClaimTime} kun</span>
            </div>
          </div>
        </div>

        {/* Top Services */}
        <div className="bg-card border border-border rounded-3xl p-4">
          <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-primary" />
            Top xizmatlar
          </h3>
          
          <div className="space-y-3">
            {stats.topServices.map((service, index) => {
              const maxCount = Math.max(...stats.topServices.map(s => s.count));
              const width = (service.count / maxCount) * 100;
              
              return (
                <div key={service.name}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-foreground">{service.name}</span>
                    <span className="text-xs text-muted-foreground">{service.count.toLocaleString()} ta</span>
                  </div>
                  <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        index === 0 ? "bg-primary" : index === 1 ? "bg-primary/70" : "bg-primary/40"
                      }`}
                      style={{ width: `${width}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{service.revenue} {"so'm"}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Performance Indicators */}
        <div className="bg-card border border-border rounded-3xl p-4">
          <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <PieChart className="w-4 h-4 text-primary" />
            Samaradorlik ko'rsatkichlari
          </h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground">{"To'lov tezligi"}</span>
              <div className="flex items-center gap-2">
                <div className="w-24 h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: "87%" }} />
                </div>
                <span className="text-xs font-medium text-foreground">87%</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground">{"Da'vo qabul nisbati"}</span>
              <div className="flex items-center gap-2">
                <div className="w-24 h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: "92%" }} />
                </div>
                <span className="text-xs font-medium text-foreground">92%</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground">Mijoz saqlanishi</span>
              <div className="flex items-center gap-2">
                <div className="w-24 h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-500 rounded-full" style={{ width: "78%" }} />
                </div>
                <span className="text-xs font-medium text-foreground">78%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
