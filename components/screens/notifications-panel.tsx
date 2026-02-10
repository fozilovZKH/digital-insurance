"use client";

import React from "react";
import { X, Bell, AlertCircle, CheckCircle, Gift, Info } from "lucide-react";
import { NotificationItem } from "@/lib/insurance-data";

interface NotificationsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
}

export function NotificationsPanel({ isOpen, onClose, notifications }: NotificationsPanelProps) {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-[100] flex justify-end overflow-hidden">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={onClose}></div>
      <div className="relative w-[85%] h-full bg-background border-l border-border shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col">
        <div className="p-5 border-b border-border flex items-center justify-between bg-card/50">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-primary" />
            <h2 className="font-bold text-foreground text-sm">Xabarnomalar</h2>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
            <X size={16} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3 no-scrollbar">
          {notifications.map((item) => (
            <div key={item.id} className={`p-3 rounded-2xl border ${item.read ? 'bg-card border-border' : 'bg-primary/5 border-primary/20 shadow-sm'}`}>
              <div className="flex gap-3">
                <div className="mt-1 shrink-0">
                  {item.type === 'alert' && <AlertCircle className="w-4 h-4 text-red-500" />}
                  {item.type === 'success' && <CheckCircle className="w-4 h-4 text-green-500" />}
                  {item.type === 'promo' && <Gift className="w-4 h-4 text-purple-500" />}
                  {item.type === 'info' && <Info className="w-4 h-4 text-blue-500" />}
                </div>
                <div className="min-w-0">
                  <h3 className="text-[13px] font-bold text-foreground leading-tight">{item.title}</h3>
                  <p className="text-[11px] text-muted-foreground mt-1 leading-snug">{item.message}</p>
                  <p className="text-[9px] text-primary/60 mt-2 font-medium">{item.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
