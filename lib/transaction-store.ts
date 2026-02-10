"use client";

import { create } from "zustand";
import { userClaims as initialClaimsData } from "./insurance-data";

// --- Types ---
export interface InsurancePolicy {
  id: number;
  type: string;
  company: string;
  policyNumber: string;
  startDate: string;
  endDate: string;
  amount: string;
  status: "active" | "expired";
}

export interface PaymentTransaction {
  id: number;
  date: string;
  type: string;
  company: string;
  amount: string;
  method: string;
  policyNumber: string;
}

export interface ClaimStep {
  name: string;
  date?: string;
  completed: boolean;
}

export interface Claim {
  id: number;
  type: string;
  company: string;
  policyNumber: string;
  amount: string;
  status: 'processing' | 'completed' | 'rejected';
  submittedDate: string;
  steps: ClaimStep[];
}

export interface UserStats {
  activePolicies: number;
  totalPremium: number;
  totalCoverage: number;
  claimsSubmitted: number;
  claimsPaid: number;
  cashbackEarned: number;
}

interface TransactionStore {
  // State
  policies: InsurancePolicy[];
  payments: PaymentTransaction[];
  claims: Claim[];
  stats: UserStats;
  
  // Actions
  addPolicy: (policy: Omit<InsurancePolicy, "id">) => void;
  addPayment: (payment: Omit<PaymentTransaction, "id">) => void;
  addClaim: (claim: Claim) => void; // Yangi ariza qo'shish
  updateStats: () => void;
}

// --- Helpers ---
const generatePolicyNumber = () => {
  const year = new Date().getFullYear();
  const random = Math.floor(100000 + Math.random() * 900000);
  return `DIG-${year}-${random}`;
};

const formatDate = (date: Date) => {
  return date.toISOString().split("T")[0];
};

const addOneYear = (date: Date) => {
  const newDate = new Date(date);
  newDate.setFullYear(newDate.getFullYear() + 1);
  return newDate;
};

// --- Initial Data ---
const initialPolicies: InsurancePolicy[] = [
  {
    id: 1,
    type: "OSAGO",
    company: "APEX",
    policyNumber: "DIG-2025-789012",
    startDate: "2025-03-15",
    endDate: "2026-03-15",
    amount: "350,000",
    status: "active",
  },
  {
    id: 2,
    type: "Mulk sug'urtasi",
    company: "GROSS",
    policyNumber: "DIG-2024-456789",
    startDate: "2024-01-10",
    endDate: "2025-01-10",
    amount: "1,200,000",
    status: "expired",
  },
];

const initialPayments: PaymentTransaction[] = [
  {
    id: 1,
    date: "2025-03-15",
    type: "OSAGO",
    company: "APEX",
    amount: "350,000",
    method: "Payme",
    policyNumber: "DIG-2025-789012",
  },
  {
    id: 2,
    date: "2024-01-10",
    type: "Mulk sug'urtasi",
    company: "GROSS",
    amount: "1,200,000",
    method: "Click",
    policyNumber: "DIG-2024-456789",
  },
];

// --- Store Implementation ---
export const useTransactionStore = create<TransactionStore>((set, get) => ({
  policies: initialPolicies,
  payments: initialPayments,
  claims: initialClaimsData as Claim[], // Boshlang'ich arizalar
  stats: {
    activePolicies: 1,
    totalPremium: 1550000,
    totalCoverage: 150000000,
    claimsSubmitted: initialClaimsData.length,
    claimsPaid: initialClaimsData.filter(c => c.status === 'completed').length,
    cashbackEarned: 15500,
  },

  addPolicy: (policyData) => {
    const newPolicy: InsurancePolicy = {
      ...policyData,
      id: Date.now(),
    };
    
    set((state) => ({
      policies: [newPolicy, ...state.policies],
    }));
    
    get().updateStats();
  },

  addPayment: (paymentData) => {
    const newPayment: PaymentTransaction = {
      ...paymentData,
      id: Date.now(),
    };
    
    set((state) => ({
      payments: [newPayment, ...state.payments],
    }));
    
    get().updateStats();
  },

  addClaim: (newClaim) => {
    set((state) => ({
      claims: [newClaim, ...state.claims],
    }));
    
    get().updateStats();
  },

  updateStats: () => {
    const { policies, payments, claims } = get();
    
    const activePolicies = policies.filter((p) => p.status === "active").length;
    
    const totalPremium = payments.reduce((sum, p) => {
      const amount = parseInt(p.amount.toString().replace(/,/g, ""), 10);
      return sum + amount;
    }, 0);

    const claimsSubmitted = claims.length;
    const claimsPaid = claims.filter(c => c.status === 'completed').length;
    const cashbackEarned = Math.round(totalPremium * 0.01);
    
    set({
      stats: {
        activePolicies,
        totalPremium,
        totalCoverage: activePolicies * 75000000,
        claimsSubmitted,
        claimsPaid,
        cashbackEarned,
      },
    });
  },
}));

// Helper function to create new policy from payment
export function createPolicyFromPayment(
  serviceName: string,
  companyName: string,
  amount: string,
  paymentMethod: string
): { policy: Omit<InsurancePolicy, "id">; payment: Omit<PaymentTransaction, "id"> } {
  const now = new Date();
  const policyNumber = generatePolicyNumber();
  
  return {
    policy: {
      type: serviceName,
      company: companyName,
      policyNumber,
      startDate: formatDate(now),
      endDate: formatDate(addOneYear(now)),
      amount,
      status: "active",
    },
    payment: {
      date: formatDate(now),
      type: serviceName,
      company: companyName,
      amount,
      method: paymentMethod,
      policyNumber,
    },
  };
}
