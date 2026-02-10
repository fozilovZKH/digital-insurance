"use client";

import React, { useState, useEffect } from "react";
import { insuranceCompanies, insuranceServices, userProfile, NotificationItem } from "@/lib/insurance-data";
import { notificationStore } from "@/lib/notification-store"; 
import { ShieldCheck, Star, ChevronRight, Bot, LayoutDashboard, FileText, Building2, Bell } from "lucide-react";
import { SidebarMenu } from "./sidebar-menu";
import { PromoBanner } from "./promo-banner";
import { NotificationsPanel } from "./notifications-panel";

interface DashboardProps {
  onCompanyClick: (id: number, name: string) => void;
  onServiceClick: (id: number, name: string) => void;
  onAIAssistant: () => void;
  onUserDashboard: () => void;
  onClaimsTracker: () => void;
  onCompanyDashboard: () => void;
  onViewAllCompanies: () => void;
  onViewAllServices: () => void;
  onLogout: () => void;
}

export function Dashboard({ 
  onCompanyClick, onServiceClick, onAIAssistant, onUserDashboard, 
  onClaimsTracker, onCompanyDashboard, onViewAllCompanies, onViewAllServices, onLogout
}: DashboardProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  
  // Foydalanuvchi turini aniqlash
  const isLegalEntity = (userProfile as any).userType === 'legal';

  const [notifications, setNotifications] = useState<NotificationItem[]>(notificationStore.get());

  useEffect(() => {
    const unsubscribe = notificationStore.subscribe((newNotifications) => {
      setNotifications(newNotifications);
    });
    return () => unsubscribe();
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleServiceClick = (id: number, name: string) => {
    notificationStore.add(
      "Polis rasmiylashtirildi", 
      `${name} xizmati bo'yicha yangi polis muvaffaqiyatli sotib olindi.`, 
      "success"
    );
    onServiceClick(id, name);
  };

  const handleClaimsClick = () => {
    onClaimsTracker();
  };

  const handleCompanyClick = (id: number, name: string) => {
    onCompanyClick(id, name);
  };

  const handleOpenNotifications = () => {
    setNotificationsOpen(true);
    setTimeout(() => {
      notificationStore.markAllAsRead();
    }, 1000);
  };

  return (
    <div className="h-full flex flex-col bg-background relative overflow-x-hidden">
      {/* Header */}
      <div className="px-5 pt-4 pb-3 flex-shrink-0">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
              <ShieldCheck className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-foreground leading-none">Digital Insurance</h1>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">Raqamli sug'urta</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={handleOpenNotifications} className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center relative active:scale-90 transition-all shadow-sm text-foreground">
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-card animate-pulse" />
              )}
            </button>
            <button onClick={() => setSidebarOpen(true)} className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-xs border-2 border-background shadow-md">
              {userProfile.avatar}
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-10 no-scrollbar">
        <PromoBanner onAction={(id, name) => handleServiceClick(id, name)} />

        {/* Quick Actions - DINAMIK GRUD */}
        <div className="px-5 pt-6">
          <div className={`grid ${isLegalEntity ? 'grid-cols-4' : 'grid-cols-3'} gap-3`}>
            <button onClick={onAIAssistant} className="flex flex-col items-center gap-2 p-3 bg-primary rounded-[2rem] active:scale-95 transition-all shadow-sm">
              <Bot className="w-6 h-6 text-primary-foreground" />
              <span className="text-[10px] font-bold text-primary-foreground">AI</span>
            </button>
            
            <button onClick={onUserDashboard} className="flex flex-col items-center gap-2 p-3 bg-card border border-border rounded-[2rem] active:scale-95 transition-all shadow-sm">
              <LayoutDashboard className="w-6 h-6 text-primary" />
              <span className="text-[10px] font-bold text-foreground">Status</span>
            </button>
            
            <button onClick={handleClaimsClick} className="flex flex-col items-center gap-2 p-3 bg-card border border-border rounded-[2rem] active:scale-95 transition-all shadow-sm">
              <FileText className="w-6 h-6 text-primary" />
              <span className="text-[10px] font-bold text-foreground">Claims</span>
            </button>
            
            {/* Faqat yuridik shaxs uchun B2B tugmasi */}
            {isLegalEntity && (
              <button onClick={onCompanyDashboard} className="flex flex-col items-center gap-2 p-3 bg-card border border-border rounded-[2rem] active:scale-95 transition-all shadow-sm">
                <Building2 className="w-6 h-6 text-primary" />
                <span className="text-[10px] font-bold text-foreground">B2B</span>
              </button>
            )}
          </div>
        </div>

        {/* Companies Section */}
        <div className="px-5 pt-8 overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-foreground uppercase tracking-tighter">Kompaniyalar</h2>
            <button onClick={onViewAllCompanies} className="text-[11px] font-bold text-primary px-3 py-1 bg-primary/5 rounded-full active:scale-90 transition-all">Barchasi</button>
          </div>
          <div className="w-full overflow-x-auto no-scrollbar touch-pan-x">
            <div className="flex gap-3 pb-2 w-max">
              {insuranceCompanies.slice(0, 4).map((company) => (
                <button
                  key={company.id}
                  onClick={() => handleCompanyClick(company.id, company.name)}
                  className="flex flex-col items-center justify-center p-3 bg-card rounded-[2rem] shadow-sm border border-border min-w-[105px] h-[115px] active:scale-95 transition-all"
                >
                  <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-bold text-sm mb-1.5">{company.logo}</div>
                  <span className="text-[10px] font-extrabold text-foreground truncate w-20 uppercase tracking-tighter text-center">{company.name}</span>
                  <div className="flex items-center gap-0.5 mt-1.5">
                    <Star className="w-2.5 h-2.5 text-yellow-500 fill-yellow-500" />
                    <span className="text-[9px] font-bold text-muted-foreground">{company.rating}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div className="px-5 pt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-foreground uppercase tracking-tighter">Xizmatlar</h2>
            <button onClick={onViewAllServices} className="text-[11px] font-bold text-primary px-3 py-1 bg-primary/5 rounded-full active:scale-90 transition-all">Barchasi</button>
          </div>
          <div className="space-y-3">
            {insuranceServices.slice(0, 4).map((service) => (
              <button key={service.id} onClick={() => handleServiceClick(service.id, service.name)} className="w-full flex items-center gap-4 p-4 bg-card rounded-[2rem] border border-border active:scale-[0.98] transition-all shadow-sm">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <ShieldCheck size={20} />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <p className="text-sm font-bold text-foreground truncate">{service.name}</p>
                  <p className="text-[10px] text-muted-foreground truncate mt-0.5">{service.fullName}</p>
                </div>
                <ChevronRight size={18} className="text-muted-foreground shrink-0" />
              </button>
            ))}
          </div>
        </div>
      </div>

      <SidebarMenu isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} onLogout={onLogout} />
      <NotificationsPanel 
        isOpen={notificationsOpen} 
        onClose={() => setNotificationsOpen(false)} 
        notifications={notifications} 
      />
    </div>
  );
}
