import { create } from "zustand";

export type OrderStatus = 'picking' | 'packing' | 'transit' | 'done';

export type Order = {
  id: string;
  user: string;
  status: OrderStatus;
  timer: number;
};

export type InventoryItem = {
  item: string;
  stock: number;
  zone: string;
};

export type LogEntry = {
  id: string;
  timestamp: string;
  message: string;
};

type Store = {
  orders: Order[];
  inventory: InventoryItem[];
  slaBreaches: number;
  peakMode: boolean;
  logs: LogEntry[];
  insights: string;
  activeSection: string;
  
  // Actions
  setOrders: (orders: Order[]) => void;
  setInventory: (inventory: InventoryItem[]) => void;
  setActiveSection: (section: string) => void;
  togglePeakMode: () => void;
  addLog: (message: string) => void;
  incrementTimers: () => void;
  transitionOrder: (orderId: string, nextStatus: OrderStatus) => void;
  raisePO: (item: string) => void;
  setInsights: (text: string) => void;
  addOrder: (order: Order) => void;
};

export const useStore = create<Store>((set) => ({
  orders: [
    { id: '#4821', user: 'Rahul M.', status: 'picking', timer: 120 },
    { id: '#4822', user: 'Sneha K.', status: 'packing', timer: 45 }
  ],
  inventory: [
    { item: 'Amul Butter 500g', stock: 4, zone: 'A1' },
    { item: 'Coke 2L', stock: 45, zone: 'C2' },
    { item: 'Brown Bread', stock: 2, zone: 'B4' }
  ],
  slaBreaches: 0,
  peakMode: false,
  logs: [
    { id: '1', timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), message: 'System Initialized...' },
    { id: '2', timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), message: 'HSR Node Active.' }
  ],
  insights: "System stable. Monitoring IPL match demand spike for Zone C.",
  activeSection: 'overview',

  setOrders: (orders) => set({ orders }),
  setInventory: (inventory) => set({ inventory }),
  setActiveSection: (activeSection) => set({ activeSection }),
  
  togglePeakMode: () => set((state) => {
    const nextMode = !state.peakMode;
    const logMsg = nextMode ? "CRITICAL: Peak Mode Enabled. Inbound volume increasing." : "Peak Mode Disabled.";
    return { 
      peakMode: nextMode,
      logs: [{
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        message: logMsg
      }, ...state.logs]
    };
  }),

  addLog: (message) => set((state) => ({
    logs: [{
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      message
    }, ...state.logs]
  })),

  incrementTimers: () => set((state) => {
    let breached = 0;
    const nextOrders = state.orders.map(o => {
      const nextTimer = o.timer + 1;
      if (nextTimer === 300) breached++;
      return { ...o, timer: nextTimer };
    });

    if (breached > 0) {
      // Side effects in actions are okay in Zustand but we should be careful.
      // The requirement said "no heavy logic", this is fairly light.
      return { 
        orders: nextOrders, 
        slaBreaches: state.slaBreaches + breached,
        logs: [{
           id: Math.random().toString(36).substr(2, 9),
           timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
           message: `CRITICAL: ${breached} order(s) breached 5m picking SLA.`
        }, ...state.logs]
      };
    }
    return { orders: nextOrders };
  }),

  transitionOrder: (orderId, nextStatus) => set((state) => ({
    orders: state.orders.map(o => o.id === orderId ? { ...o, status: nextStatus } : o)
  })),

  raisePO: (item) => {
    const { addLog, setInventory, inventory } = useStore.getState();
    addLog(`PO Raised for ${item}... Vendor notified.`);
    
    setTimeout(() => {
      const currentInventory = useStore.getState().inventory;
      const nextInv = currentInventory.map(i => 
        i.item === item ? { ...i, stock: i.stock + 50 } : i
      );
      setInventory(nextInv);
      useStore.getState().addLog(`GRN Updated: ${item} +50 units received.`);
    }, 2000);
  },


  setInsights: (insights) => set({ insights }),
  
  addOrder: (order) => set((state) => ({
    orders: [order, ...state.orders]
  }))
}));