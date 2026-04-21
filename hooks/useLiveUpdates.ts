"use client";

import { useEffect } from "react";
import { useStore } from "@/lib/store";

const ORDER_STATUSES = [
  "CREATED",
  "ASSIGNED",
  "PICKING",
  "PACKED",
  "OUT_FOR_DELIVERY",
];

export const useLiveUpdates = () => {
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let orderGenTimeoutId: NodeJS.Timeout;

    const tick = () => {
      // Random delay between 3000ms and 5000ms
      const delay = Math.floor(Math.random() * 2000) + 3000;

      timeoutId = setTimeout(() => {
        const state = useStore.getState();
        const { orders, inventory, setOrders, setInventory } = state;

        let ordersChanged = false;
        let inventoryChanged = false;

        let nextOrders = orders;
        let nextInventory = inventory;

        // 1. UPDATE INVENTORY (single random item)
        if (inventory.length > 0) {
          const randomIndex = Math.floor(Math.random() * inventory.length);
          const item = inventory[randomIndex] as any;

          // 20% chance to simulate a restock (+2 to 6 units), else simulate a pick (-1 unit)
          const isRestock = Math.random() < 0.2;
          const change = isRestock ? Math.floor(Math.random() * 5) + 2 : -1;

          const newAvailable = Math.max(0, (item.available ?? item.stock ?? 0) + change);

          if (newAvailable !== (item.available ?? item.stock)) {
            nextInventory = inventory.map((inv) =>
              (inv as any).sku_id === item.sku_id
                ? { ...inv, available: newAvailable }
                : inv
            ) as typeof inventory;
            inventoryChanged = true;
          }
        }

        // 2. UPDATE ORDERS (single random order that isn't finished yet)
        if (orders.length > 0) {
          const updatableOrders = orders.filter(
            (o) => (o as any).status !== "OUT_FOR_DELIVERY"
          );

          if (updatableOrders.length > 0) {
            const randomIndex = Math.floor(
              Math.random() * updatableOrders.length
            );
            const targetOrder = updatableOrders[randomIndex] as any;

            const currentIndex = ORDER_STATUSES.indexOf(targetOrder.status);
            // Move strictly forward
            const nextStatus = ORDER_STATUSES[currentIndex + 1];

            if (nextStatus) {
              nextOrders = orders.map((o) =>
                (o as any).order_id === targetOrder.order_id
                  ? { ...o, status: nextStatus }
                  : o
              ) as typeof orders;
              ordersChanged = true;
            }
          }
        }

        // Commit only if changed to avoid unnecessary re-renders
        if (inventoryChanged) setInventory(nextInventory);
        if (ordersChanged) setOrders(nextOrders);

        // Schedule next update
        tick();
      }, delay);
    };

    const orderGeneratorTick = () => {
      // Every 5-8 seconds
      const delay = Math.floor(Math.random() * 3000) + 5000;

      orderGenTimeoutId = setTimeout(() => {
        const state = useStore.getState();
        
        const newOrder = {
          order_id: `ORD${Math.floor(Math.random() * 100000)}`,
          items: Math.floor(Math.random() * 6) + 1,
          status: "CREATED",
          priority: Math.random() < 0.3 ? "URGENT" : "NORMAL",
          assigned_picker: null,
          created_at: new Date().toISOString(),
        };

        // UI: New orders appear at TOP
        state.setOrders([newOrder as any, ...state.orders]);

        orderGeneratorTick();
      }, delay);
    };

    // Start background event loops
    tick();
    orderGeneratorTick();

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(orderGenTimeoutId);
    };
  }, []);
};