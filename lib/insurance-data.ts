// Insurance Companies with Platform Ratings
export const insuranceCompanies = [
  { id: 1, name: "APEX", logo: "A", rating: 4.9 },
  { id: 2, name: "O'ZBEKINVEST", logo: "O", rating: 4.8 },
  { id: 3, name: "GROSS", logo: "G", rating: 4.7 },
  { id: 4, name: "MY-INSURANCE", logo: "M", rating: 4.6 },
  { id: 5, name: "KAFOLAT", logo: "K", rating: 4.8 },
  { id: 6, name: "KAPITAL", logo: "KP", rating: 4.5 },
  { id: 7, name: "KAFIL", logo: "KF", rating: 4.4 },
  { id: 8, name: "O'ZAGROSUG'URTA", logo: "OZ", rating: 4.3 },
  { id: 9, name: "ALFA INVEST", logo: "AI", rating: 4.6 },
  { id: 10, name: "ALSKOM", logo: "AL", rating: 4.2 },
  { id: 11, name: "MOSAIC", logo: "MS", rating: 4.5 },
  { id: 12, name: "INSON", logo: "IN", rating: 4.7 },
  { id: 13, name: "TEMIRYO'L SUG'URTA", logo: "TS", rating: 4.4 },
  { id: 14, name: "IMPEX", logo: "IM", rating: 4.3 },
  { id: 15, name: "TRUST", logo: "TR", rating: 4.6 },
  { id: 16, name: "SQB INSURANCE", logo: "SQ", rating: 4.5 },
  { id: 17, name: "INFINITY", logo: "IF", rating: 4.4 },
  { id: 18, name: "NEO", logo: "NE", rating: 4.7 },
  { id: 19, name: "XALQ SUG'URTA", logo: "XS", rating: 4.8 },
  { id: 20, name: "ISHONCH", logo: "IS", rating: 4.5 },
];

// User Profile Data (from OneID/MyID)
export const userProfile = {
  fullName: "Aliyev Vali Karimovich",
  shortName: "Aliyev Vali",
  jshshir: "12345678901234",
  passport: "AB 1234567",
  birthDate: "1990-05-15",
  address: "Toshkent sh., Mirzo Ulug'bek tumani, 25-uy, 12-xonadon",
  phone: "+998 90 123 45 67",
  avatar: "AV",
};

// Insurance History
export const insuranceHistory = [
  {
    id: 1,
    type: "OSAGO",
    company: "APEX",
    policyNumber: "DIG-2025-789012",
    startDate: "2025-03-15",
    endDate: "2026-03-15",
    amount: "350,000",
    status: "active" as const,
  },
  {
    id: 2,
    type: "Mulk sug'urtasi",
    company: "GROSS",
    policyNumber: "DIG-2024-456789",
    startDate: "2024-01-10",
    endDate: "2025-01-10",
    amount: "1,200,000",
    status: "expired" as const,
  },
  {
    id: 3,
    type: "Tibbiy sug'urta",
    company: "KAFOLAT",
    policyNumber: "DIG-2025-123456",
    startDate: "2025-06-01",
    endDate: "2026-06-01",
    amount: "2,500,000",
    status: "active" as const,
  },
];

// Payment History
export const paymentHistory = [
  {
    id: 1,
    date: "2026-02-01",
    type: "OSAGO",
    company: "APEX",
    amount: "350,000",
    method: "Payme",
  },
  {
    id: 2,
    date: "2025-06-01",
    type: "Tibbiy sug'urta",
    company: "KAFOLAT",
    amount: "2,500,000",
    method: "Click",
  },
  {
    id: 3,
    date: "2024-01-10",
    type: "Mulk sug'urtasi",
    company: "GROSS",
    amount: "1,200,000",
    method: "Uzum Bank",
  },
];

// 17+1 Insurance Services
export const insuranceServices = [
  { id: 1, name: "OSAGO", fullName: "Avtofuqarolik javobgarligi", icon: "car", type: "auto" },
  { id: 2, name: "KASKO", fullName: "Avtomobilni har tomonlama sug'urtalash", icon: "shield-check", type: "auto" },
  { id: 3, name: "Mulk sug'urtasi", fullName: "Ko'chmas mulkni sug'urtalash", icon: "home", type: "property" },
  { id: 4, name: "Hayot sug'urtasi", fullName: "Hayotni sug'urtalash", icon: "heart", type: "life" },
  { id: 5, name: "Tibbiy sug'urta", fullName: "Tibbiy xarajatlarni sug'urtalash", icon: "stethoscope", type: "health" },
  { id: 6, name: "Sayohat sug'urtasi", fullName: "Sayohatchilar uchun sug'urta", icon: "plane", type: "travel" },
  { id: 7, name: "Mehnat havfsizligi", fullName: "Ish joyida xavfsizlik sug'urtasi", icon: "hard-hat", type: "work" },
  { id: 8, name: "Cargo sug'urtasi", fullName: "Yuklarni sug'urtalash", icon: "truck", type: "cargo" },
  { id: 9, name: "Agrosug'urta", fullName: "Qishloq xo'jaligi sug'urtasi", icon: "wheat", type: "agro" },
  { id: 10, name: "Texnika sug'urtasi", fullName: "Maxsus texnikani sug'urtalash", icon: "cog", type: "tech" },
  { id: 11, name: "Moliyaviy sug'urta", fullName: "Moliyaviy risklarni sug'urtalash", icon: "banknote", type: "finance" },
  { id: 12, name: "Professional javobgarlik", fullName: "Professional mas'uliyat sug'urtasi", icon: "briefcase", type: "professional" },
  { id: 13, name: "Fuqarolik javobgarligi", fullName: "Fuqarolik javobgarligi sug'urtasi", icon: "users", type: "civil" },
  { id: 14, name: "Kredit sug'urtasi", fullName: "Kredit risklarini sug'urtalash", icon: "credit-card", type: "credit" },
  { id: 15, name: "Pensiya sug'urtasi", fullName: "Pensiya jamg'armasini sug'urtalash", icon: "piggy-bank", type: "pension" },
  { id: 16, name: "Baxtsiz hodisa", fullName: "Baxtsiz hodisalardan sug'urta", icon: "alert-triangle", type: "accident" },
  { id: 17, name: "Elektron qurilmalar", fullName: "Elektron qurilmalarni sug'urtalash", icon: "smartphone", type: "electronics" },
  { id: 18, name: "Maxsus sug'urta", fullName: "Maxsus turdagi sug'urta xizmatlari", icon: "star", type: "special" },
];

// Service info content
export const serviceInfoContent: Record<string, {
  about: string;
  coverage: string[];
  priceRange: string;
}> = {
  "OSAGO": {
    about: "OSAGO - bu avtomobil haydovchilarining uchinchi shaxslarga yetkazilgan zararlar uchun majburiy javobgarlik sug'urtasi. Bu sug'urta turi qonun bilan talab qilinadi va yo'l-transport hodisalari natijasida boshqa odamlarga yetkazilgan zararlarni qoplaydi.",
    coverage: [
      "Uchinchi shaxslarning hayoti va sog'ligiga yetkazilgan zarar",
      "Uchinchi shaxslarning mulkiga yetkazilgan zarar",
      "YTH paytida boshqa avtomobillarga yetkazilgan zarar",
      "Yo'l infrastrukturasiga yetkazilgan zarar"
    ],
    priceRange: "150,000 - 500,000 so'm/yil"
  },
  "KASKO": {
    about: "KASKO - bu avtomobil egasining o'z avtomobilini har tomonlama sug'urtalash. U o'g'irlik, tabiiy ofatlar, vandalizm va yo'l-transport hodisalaridan himoya qiladi.",
    coverage: [
      "YTH natijasida yetkazilgan zarar",
      "O'g'irlik va qaroqchilik",
      "Tabiiy ofatlar (do'l, suv toshqini)",
      "Yong'in va portlash",
      "Vandalizm va uchinchi shaxslar harakati"
    ],
    priceRange: "1,500,000 - 15,000,000 so'm/yil"
  },
  "Mulk sug'urtasi": {
    about: "Mulk sug'urtasi - bu ko'chmas mulkingizni turli xavf-xatarlardan himoya qiluvchi sug'urta turi. U uy-joyingiz, ofis yoki tijorat binolarini qamrab oladi.",
    coverage: [
      "Yong'in va tutun zararidan himoya",
      "Suv toshqini va quvur yorilishi",
      "Tabiiy ofatlar (zilzila, bo'ron)",
      "O'g'irlik va bosqinchilik",
      "Elektr ta'minotining uzilishi natijasidagi zarar"
    ],
    priceRange: "500,000 - 5,000,000 so'm/yil"
  },
  "Hayot sug'urtasi": {
    about: "Hayot sug'urtasi - bu sug'urtalangan shaxs vafot etgan yoki nogironlikka uchragan taqdirda, uning oilasiga moliyaviy yordam ko'rsatuvchi sug'urta turi.",
    coverage: [
      "Vafot etgan taqdirda to'lov",
      "Nogironlik belgilangan taqdirda to'lov",
      "Og'ir kasallik aniqlangan taqdirda to'lov",
      "Sug'urta muddati tugaganda jamg'arma"
    ],
    priceRange: "1,000,000 - 50,000,000 so'm/yil"
  },
  "Tibbiy sug'urta": {
    about: "Tibbiy sug'urta - bu sog'liqni saqlash xarajatlarini qoplaydigan sug'urta turi. U shifoxonada davolanish, dori-darmonlar va tibbiy tekshiruvlar uchun xarajatlarni qamrab oladi.",
    coverage: [
      "Ambulator davolanish",
      "Statsionar davolanish",
      "Dori-darmonlar xarajatlari",
      "Tez yordam xizmati",
      "Tibbiy tekshiruvlar va tahlillar"
    ],
    priceRange: "800,000 - 10,000,000 so'm/yil"
  }
};

// Default service info for services not explicitly defined
export const defaultServiceInfo = {
  about: "Bu sug'urta xizmati sizga va oilangizga turli xavf-xatarlardan himoya ko'rsatadi. Batafsil ma'lumot uchun sug'urta kompaniyasi bilan bog'laning.",
  coverage: [
    "Asosiy himoya",
    "Qo'shimcha xizmatlar",
    "24/7 mijozlar qo'llab-quvvatlashi",
    "Tez to'lovlar"
  ],
  priceRange: "Narx individual hisoblanadi"
};

export type ServiceType = "auto" | "property" | "life" | "health" | "travel" | "work" | "cargo" | "agro" | "tech" | "finance" | "professional" | "civil" | "credit" | "pension" | "accident" | "electronics" | "special";

// Claims data for transparency tracker
export const userClaims = [
  {
    id: 1,
    policyNumber: "DIG-2025-789012",
    type: "OSAGO",
    company: "APEX",
    status: "completed" as const,
    amount: "2,500,000",
    submittedDate: "2025-12-15",
    completedDate: "2025-12-28",
    steps: [
      { name: "Ariza topshirildi", date: "2025-12-15", completed: true },
      { name: "Hujjatlar tekshirildi", date: "2025-12-18", completed: true },
      { name: "Ekspertiza o'tkazildi", date: "2025-12-22", completed: true },
      { name: "To'lov tasdiqlandi", date: "2025-12-25", completed: true },
      { name: "To'lov amalga oshirildi", date: "2025-12-28", completed: true },
    ],
  },
  {
    id: 2,
    policyNumber: "DIG-2025-123456",
    type: "Tibbiy sug'urta",
    company: "KAFOLAT",
    status: "in_progress" as const,
    amount: "850,000",
    submittedDate: "2026-01-28",
    completedDate: null,
    steps: [
      { name: "Ariza topshirildi", date: "2026-01-28", completed: true },
      { name: "Hujjatlar tekshirildi", date: "2026-01-30", completed: true },
      { name: "Tibbiy tekshiruv", date: null, completed: false },
      { name: "To'lov tasdiqlandi", date: null, completed: false },
      { name: "To'lov amalga oshirildi", date: null, completed: false },
    ],
  },
];

// User Dashboard Statistics
export const userDashboardStats = {
  activePolicies: 2,
  totalPremium: "2,850,000",
  totalCoverage: "150,000,000",
  claimsSubmitted: 2,
  claimsPaid: 1,
  cashbackEarned: "28,500",
  nextExpiry: "2026-03-15",
  nextExpiryPolicy: "OSAGO",
};

// AI Assistant FAQ and recommendations
export const aiAssistantData = {
  popularQuestions: [
    {
      id: 1,
      question: "OSAGO va KASKO ning farqi nima?",
      answer: "OSAGO - bu majburiy sug'urta bo'lib, siz boshqalarga yetkazgan zararni qoplaydi. KASKO esa ixtiyoriy sug'urta bo'lib, o'z avtomobilingizga yetkazilgan zararni qoplaydi (o'g'irlik, tabiiy ofat, YTH).",
    },
    {
      id: 2,
      question: "Sug'urta polisini qanday yangilash mumkin?",
      answer: "Polisni yangilash uchun DIGITAL ilovasida eski polisni tanlang va 'Yangilash' tugmasini bosing. Avtomatik ravishda ma'lumotlar to'ldiriladi va siz faqat to'lovni amalga oshirasiz.",
    },
    {
      id: 3,
      question: "Claim (da'vo) qanday topshiraman?",
      answer: "Sug'urta hodisasi yuz berganda: 1) Hodisa joyida suratga oling, 2) DIGITAL ilovasida 'Claim topshirish' bo'limiga kiring, 3) Hujjatlarni yuklang, 4) Ariza holatini real vaqtda kuzating.",
    },
    {
      id: 4,
      question: "1% cashback qanday ishlaydi?",
      answer: "Har bir sug'urta xaridi summasining 1% Soliq.uz orqali soliq chegirmasiga aylanadi. Bu avtomatik amalga oshiriladi va yillik soliq deklaratsiyangizda aks etadi.",
    },
    {
      id: 5,
      question: "Qaysi kompaniya eng yaxshi?",
      answer: "Platformamizda har bir kompaniyaning reytingi bor. Hozirda APEX (4.9), KAFOLAT (4.8) va O'ZBEKINVEST (4.8) eng yuqori reytingli kompaniyalardir. Lekin eng yaxshi tanlov sizning ehtiyojlaringizga bog'liq.",
    },
  ],
  popularServices: [
    { name: "OSAGO", searches: 15420 },
    { name: "KASKO", searches: 8350 },
    { name: "Tibbiy sug'urta", searches: 6200 },
    { name: "Sayohat sug'urtasi", searches: 4100 },
    { name: "Mulk sug'urtasi", searches: 3800 },
  ],
  popularCompanies: [
    { name: "APEX", policies: 12500 },
    { name: "KAFOLAT", policies: 10200 },
    { name: "O'ZBEKINVEST", policies: 9800 },
    { name: "GROSS", policies: 8400 },
    { name: "XALQ SUG'URTA", policies: 7200 },
  ],
};

export const promoAds = [
  {
    id: 1,
    serviceId: 1, // Masalan, 1 - bu KASKO xizmati ID raqami
    title: "KASKO 20% CHEGIRMA",
    description: "Yangi yil munosabati bilan barcha sug'urta turlariga chegirmalar!",
    color: "from-blue-600 to-indigo-700",
    buttonText: "Batafsil",
  },
  {
    id: 2,
    serviceId: 3, // Masalan, 3 - bu Sayohat sug'urtasi ID raqami
    title: "SAYOHAT SUG'URTASI",
    description: "Xorijga chiqishda xavfsizligingizni bizga ishonib topshiring.",
    color: "from-emerald-500 to-teal-700",
    buttonText: "Olish",
  },
];


// Company statistics for company dashboard (B2B view)
export const companyDashboardStats = {
  apex: {
    totalPolicies: 12500,
    activePolicies: 10200,
    monthlyGrowth: 8.5,
    totalPremium: "45,500,000,000",
    claimsReceived: 340,
    claimsPaid: 298,
    avgClaimTime: 12,
    customerSatisfaction: 4.9,
    topServices: [
      { name: "OSAGO", count: 6200, revenue: "2,170,000,000" },
      { name: "KASKO", count: 3100, revenue: "31,000,000,000" },
      { name: "Tibbiy sug'urta", count: 1800, revenue: "9,000,000,000" },
    ],
  },
};

// ... mavjud kodlaringiz (insuranceCompanies, insuranceServices, userProfile) o'zgarishsiz qoladi

// --- BILDIRISHNOMALAR STRUKTURASI ---
export type NotificationType = "alert" | "success" | "promo" | "info";

export interface NotificationItem {
  id: number;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

// Boshlang'ich (demo) xabarlar
export const initialNotifications: NotificationItem[] = [
  {
    id: 1,
    type: "alert",
    title: "Polis muddati tugamoqda!",
    message: "Chevrolet Malibu (01 777 AAA) sug'urta muddati 3 kundan keyin tugaydi.",
    time: "Hozirgina",
    read: false,
  },
  {
    id: 2,
    type: "promo",
    title: "Navro'z Chegirmasi",
    message: "Bayram munosabati bilan barcha polislar uchun 15% chegirma.",
    time: "2 soat oldin",
    read: false,
  },
];
