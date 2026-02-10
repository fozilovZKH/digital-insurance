"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Zap } from "lucide-react";

interface PromoBannerProps {
  onAction: (id: number, name: string) => void;
}

const promos = [
  {
    id: 1,
    title: "Yangi yil aksiyasi!",
    desc: "KASKO sug'urtasiga 20% chegirma oling",
    color: "bg-blue-600",
    actionName: "KASKO"
  },
  {
    id: 2,
    title: "Sayohat sug'urtasi",
    desc: "Yevropa bo'ylab sayohat uchun maxsus taklif",
    color: "bg-purple-600",
    actionName: "Sayohat"
  }
];

export function PromoBanner({ onAction }: PromoBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === promos.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? promos.length - 1 : prev - 1));
  };

  const current = promos[currentIndex];

  return (
    <div className="px-5 pt-4">
      <div className={`${current.color} rounded-[2.5rem] p-6 min-h-[160px] relative overflow-hidden transition-all duration-500 shadow-lg shadow-primary/10`}>
        {/* Orqa fon bezagi */}
        <div className="absolute right-[-10%] top-[-20%] w-40 h-40 bg-white/10 rounded-full blur-3xl" />
        
        <div className="relative z-10 h-full flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-[10px] font-bold text-white/80 uppercase tracking-widest">Maxsus taklif</span>
          </div>
          <h2 className="text-xl font-bold text-white mb-1">{current.title}</h2>
          <p className="text-xs text-white/80 mb-4 max-w-[180px] leading-relaxed">{current.desc}</p>
          
          <div>
            <button 
              onClick={() => onAction(current.id, current.actionName)}
              className="bg-white text-foreground text-[11px] font-bold px-6 py-2.5 rounded-xl active:scale-95 transition-all shadow-md"
            >
              Batafsil
            </button>
          </div>
        </div>

        {/* Boshqaruv strelkalari */}
        <div className="absolute inset-y-0 left-2 flex items-center">
          <button 
            onClick={prevSlide} 
            className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white active:bg-white/20 transition-all"
          >
            <ChevronLeft size={18} />
          </button>
        </div>
        <div className="absolute inset-y-0 right-2 flex items-center">
          <button 
            onClick={nextSlide} 
            className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white active:bg-white/20 transition-all"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Sahifa ko'rsatkichi (Dots) */}
        <div className="absolute bottom-4 right-6 flex gap-1.5">
          {promos.map((_, idx) => (
            <div 
              key={idx} 
              className={`h-1 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-4 bg-white' : 'w-1.5 bg-white/40'}`} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}
