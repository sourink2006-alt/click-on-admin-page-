"use client";

import { useEffect } from "react";
import { useStore, OrderStatus } from "@/lib/store";

export const useSimulation = () => {
  const { 
    peakMode, 
    incrementTimers, 
    addOrder, 
    addLog, 
    inventory, 
    setInventory,
    setInsights 
  } = useStore();

  useEffect(() => {
    const interval = setInterval(() => {
      // 1. Tick timers & check SLA
      incrementTimers();

      // 2. Chance for new order
      const chance = peakMode ? 0.3 : 0.05;
      if (Math.random() < chance) {
        const newId = '#' + Math.floor(4800 + Math.random() * 200);
        const statuses: OrderStatus[] = ['picking', 'packing', 'transit'];
        const randomStatus = statuses[0]; // Always start with picking for new orders
        
        addOrder({
          id: newId,
          user: 'Guest User',
          status: randomStatus,
          timer: 0
        });
        
        addLog(`New Inbound Order: ${newId}`);
      }

      // 3. Random stock depletion
      if (Math.random() < 0.1) {
        const randomIndex = Math.floor(Math.random() * inventory.length);
        const item = inventory[randomIndex];
        if (item.stock > 0) {
          const nextInventory = inventory.map((inv, idx) => 
            idx === randomIndex ? { ...inv, stock: inv.stock - 1 } : inv
          );
          setInventory(nextInventory);
          
          if (item.stock - 1 === 0) {
            addLog(`WARNING: ${item.item} is OUT OF STOCK.`);
          }
        }
      }

      // 4. Update AI Insights periodically (every 30 ticks roughly)
      if (Math.random() < 0.03) {
        const insights = [
          "Predicting 20% surge in Beverages due to weather.",
          "Rider availability high. Current ETAs < 4m.",
          "Efficiency Alert: Zone B picking routes are suboptimal.",
          "Inventory Risk: Dairy stock depleting faster than PO lead time."
        ];
        const randomInsight = insights[Math.floor(Math.random() * insights.length)];
        setInsights(randomInsight);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [peakMode, incrementTimers, addOrder, addLog, inventory, setInventory, setInsights]);
};
