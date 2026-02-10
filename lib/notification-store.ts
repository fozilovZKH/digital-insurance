import { NotificationItem, initialNotifications } from "./insurance-data";

// Xabarlarni xotirada saqlash uchun o'zgaruvchilar
let globalNotifications: NotificationItem[] = [...initialNotifications];
let listeners: ((ns: NotificationItem[]) => void)[] = [];

export const notificationStore = {
  // Xabarlarni olish
  get: () => globalNotifications,
  
  // Yangi xabar qo'shish (Xizmat sotib olinganda yoki Claim yuborilganda chaqiriladi)
  add: (title: string, message: string, type: NotificationItem["type"]) => {
    const newNotify: NotificationItem = {
      id: Date.now(),
      type,
      title,
      message,
      time: "Hozirgina",
      read: false,
    };
    globalNotifications = [newNotify, ...globalNotifications];
    // Dashboardga "uyg'on, yangi xabar keldi" deb signal yuboramiz
    listeners.forEach(listener => listener([...globalNotifications]));
  },

  // Hammasini o'qildi deb belgilash
  markAllAsRead: () => {
    globalNotifications = globalNotifications.map(n => ({ ...n, read: true }));
    listeners.forEach(listener => listener([...globalNotifications]));
  },

  // Dashboard xabarlarni kuzatishi uchun obuna bo'lish
  subscribe: (listener: (ns: NotificationItem[]) => void) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  }
};
