"use client";

import { useState, useRef, useEffect } from "react";
import {
  Bot,
  ChevronLeft,
  Send,
  Sparkles,
  TrendingUp,
  Building2,
  MessageCircle,
  Star,
} from "lucide-react";
import { aiAssistantData, insuranceCompanies } from "@/lib/insurance-data";

interface Message {
  id: number;
  type: "user" | "bot";
  text: string;
  timestamp: Date;
}

interface AIAssistantProps {
  onBack: () => void;
  onServiceClick?: (serviceName: string) => void;
  onCompanyClick?: (companyId: number, companyName: string) => void;
}

export function AIAssistant({ onBack, onServiceClick, onCompanyClick }: AIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: "bot",
      text: "Assalomu alaykum! Men DIGITAL sug'urta yordamchisiman. Sug'urta bo'yicha savollaringizga javob beraman, eng yaxshi kompaniya va xizmatlarni tavsiya qilaman. Qanday yordam bera olaman?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const findAnswer = (question: string): string => {
    const lowerQuestion = question.toLowerCase();
    
    // Check for FAQ matches
    for (const faq of aiAssistantData.popularQuestions) {
      const keywords = faq.question.toLowerCase().split(" ");
      const matchCount = keywords.filter(word => 
        word.length > 3 && lowerQuestion.includes(word)
      ).length;
      if (matchCount >= 2) {
        return faq.answer;
      }
    }

    // Check for company recommendation request
    if (lowerQuestion.includes("kompaniya") || lowerQuestion.includes("tavsiya") || lowerQuestion.includes("eng yaxshi")) {
      const topCompanies = [...insuranceCompanies]
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 3);
      return `Platformamizdagi eng yuqori reytingli kompaniyalar:\n\n1. ${topCompanies[0].name} - ${topCompanies[0].rating} yulduz\n2. ${topCompanies[1].name} - ${topCompanies[1].rating} yulduz\n3. ${topCompanies[2].name} - ${topCompanies[2].rating} yulduz\n\nBu reytinglar mijozlar baholari asosida shakllanadi.`;
    }

    // Check for service recommendation
    if (lowerQuestion.includes("xizmat") || lowerQuestion.includes("ommabop") || lowerQuestion.includes("mashhur")) {
      return `Eng ko'p foydalaniladigan xizmatlar:\n\n1. OSAGO - 15,420 qidiruv\n2. KASKO - 8,350 qidiruv\n3. Tibbiy sug'urta - 6,200 qidiruv\n4. Sayohat sug'urtasi - 4,100 qidiruv\n5. Mulk sug'urtasi - 3,800 qidiruv`;
    }

    // Check for price questions
    if (lowerQuestion.includes("narx") || lowerQuestion.includes("qancha") || lowerQuestion.includes("summa")) {
      return "Sug'urta narxi ko'p omillarga bog'liq: avtomobil turi, yoshi, haydovchi tajribasi va boshqalar. Aniq narxni bilish uchun kerakli xizmatni tanlang va forma to'ldiring - tizim avtomatik hisoblaydi.";
    }

    // Check for claim questions
    if (lowerQuestion.includes("claim") || lowerQuestion.includes("da'vo") || lowerQuestion.includes("zarar") || lowerQuestion.includes("hodisa")) {
      return "Sug'urta hodisasi yuz berganda:\n\n1. Hodisa joyidan ketmang va suratga oling\n2. 24 soat ichida kompaniyaga xabar bering\n3. DIGITAL ilovasida 'Claim topshirish' bo'limiga kiring\n4. Hujjatlarni yuklang\n5. Ariza holatini real vaqtda kuzating\n\nO'rtacha to'lov muddati: 10-14 ish kuni";
    }

    // Default response
    return "Kechirasiz, bu savolga aniq javob topa olmadim. Quyidagi mavzularda yordam bera olaman:\n\n• Sug'urta turlari haqida\n• Kompaniyalar taqqoslash\n• Narx hisoblash\n• Claim topshirish\n• Polis yangilash\n\nSavolingizni boshqacha shaklda bering yoki quyidagi tez savollardan birini tanlang.";
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      type: "user",
      text: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);
    setShowQuickActions(false);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: Date.now() + 1,
        type: "bot",
        text: findAnswer(input),
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleQuickQuestion = (question: string) => {
    setInput(question);
    setShowQuickActions(false);
    
    const userMessage: Message = {
      id: Date.now(),
      type: "user",
      text: question,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    setTimeout(() => {
      const answer = aiAssistantData.popularQuestions.find(
        q => q.question === question
      )?.answer || findAnswer(question);
      
      const botResponse: Message = {
        id: Date.now() + 1,
        type: "bot",
        text: answer,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="px-5 pt-4 pb-3 border-b border-border bg-card">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-2xl bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>
          <div className="w-11 h-11 rounded-2xl bg-primary flex items-center justify-center">
            <Bot className="w-6 h-6 text-primary-foreground" />
          </div>
          <div className="flex-1">
            <h1 className="text-base font-bold text-foreground">AI Yordamchi</h1>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              Onlayn
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] rounded-3xl px-4 py-3 ${
                message.type === "user"
                  ? "bg-primary text-primary-foreground rounded-br-lg"
                  : "bg-card border border-border text-foreground rounded-bl-lg"
              }`}
            >
              <p className="text-sm whitespace-pre-line">{message.text}</p>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-card border border-border rounded-3xl rounded-bl-lg px-4 py-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0.1s" }} />
                <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0.2s" }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      {showQuickActions && (
        <div className="px-4 pb-2">
          <p className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> Ko'p so'raladigan savollar
          </p>
          <div className="flex flex-wrap gap-2">
            {aiAssistantData.popularQuestions.slice(0, 3).map((q) => (
              <button
                key={q.id}
                onClick={() => handleQuickQuestion(q.question)}
                className="text-xs bg-secondary hover:bg-secondary/80 text-foreground px-3 py-2 rounded-2xl transition-colors"
              >
                {q.question}
              </button>
            ))}
          </div>
          
          {/* Popular Stats */}
          <div className="mt-4 grid grid-cols-2 gap-2">
            <button
              onClick={() => handleQuickQuestion("Eng ommabop xizmatlar qaysilar?")}
              className="flex items-center gap-2 p-3 bg-card border border-border rounded-2xl hover:bg-secondary transition-colors"
            >
              <TrendingUp className="w-4 h-4 text-primary" />
              <span className="text-xs font-medium text-foreground">Ommabop xizmatlar</span>
            </button>
            <button
              onClick={() => handleQuickQuestion("Eng yaxshi kompaniyalar qaysilar?")}
              className="flex items-center gap-2 p-3 bg-card border border-border rounded-2xl hover:bg-secondary transition-colors"
            >
              <Building2 className="w-4 h-4 text-primary" />
              <span className="text-xs font-medium text-foreground">Top kompaniyalar</span>
            </button>
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-border bg-card">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Savolingizni yozing..."
            className="flex-1 bg-secondary rounded-2xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/20"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5 text-primary-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
}
