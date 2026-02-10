"use client";

import type { ReactNode } from "react";

interface MobileFrameProps {
  children: ReactNode;
}

export function MobileFrame({ children }: MobileFrameProps) {
  return (
    <div className="min-h-screen bg-muted flex items-center justify-center p-4">
      <div className="relative w-full max-w-[390px] h-[844px] bg-background rounded-[48px] shadow-2xl border-[12px] border-foreground/90 overflow-hidden">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[32px] bg-foreground/90 rounded-b-3xl z-50" />
        
        {/* Status bar */}
        <div className="h-12 bg-background flex items-end justify-between px-8 pb-1">
          <span className="text-xs font-medium text-foreground">9:41</span>
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4 text-foreground" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2s2-.9 2-2V5c0-1.1-.9-2-2-2zm5 4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2s2-.9 2-2V9c0-1.1-.9-2-2-2zM7 9c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2s2-.9 2-2v-8c0-1.1-.9-2-2-2z" />
            </svg>
            <svg className="w-4 h-4 text-foreground" fill="currentColor" viewBox="0 0 24 24">
              <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z" />
            </svg>
            <svg className="w-6 h-4 text-foreground" viewBox="0 0 24 14" fill="currentColor">
              <rect x="0" y="0" width="22" height="14" rx="3" stroke="currentColor" strokeWidth="1" fill="none" />
              <rect x="2" y="2" width="16" height="10" rx="1" fill="currentColor" />
              <rect x="22" y="4" width="2" height="6" rx="1" fill="currentColor" />
            </svg>
          </div>
        </div>
        
        {/* Content */}
        <div className="h-[calc(100%-48px)] overflow-hidden">
          {children}
        </div>
        
        {/* Home indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[134px] h-[5px] bg-foreground/30 rounded-full" />
      </div>
    </div>
  );
}
