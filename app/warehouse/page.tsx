"use client";

import { useStore } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Layers } from "lucide-react";

export default function WarehousePage() {
  const inventory = useStore((state) => state.inventory);
  
  // Note: This page uses a legacy data structure. Showing empty state.
  const bins: { id: string; zone: string; rack: string; shelf: string; bin: string; quantity: number; product: string }[] = [];


  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Warehouse Layout</h1>
        <p className="text-muted-foreground">View and manage storage locations.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {bins.length === 0 ? (
          <p className="text-muted-foreground">No location data available.</p>
        ) : (
          bins.map((binData, i) => (
            <Card key={`${binData.id}-${i}`}>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold flex items-center space-x-2">
                  <Layers className="h-4 w-4" />
                  <span>Zone {binData.zone}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="ml-2 mt-2 space-y-3 border-l-2 border-muted pl-4">
                  <div className="relative">
                    <span className="absolute -left-[21px] top-1.5 h-2 w-2 rounded-full bg-muted-foreground ring-4 ring-background" />
                    <span className="text-sm font-medium">Rack {binData.rack}</span>
                  </div>
                  
                  <div className="space-y-3 border-l-2 border-muted pl-4 ml-1">
                    <div className="relative">
                      <span className="absolute -left-[21px] top-1.5 h-2 w-2 rounded-full bg-muted-foreground ring-4 ring-background" />
                      <span className="text-sm font-medium">Shelf {binData.shelf}</span>
                    </div>

                    <div className="space-y-1 pl-4 ml-1">
                      <div className="relative">
                        <span className="absolute -left-[21px] top-1.5 h-2 w-2 rounded-full bg-primary ring-4 ring-background" />
                        <span className="text-sm font-bold text-primary">Bin {binData.bin}</span>
                        <div className="text-sm text-muted-foreground mt-0.5">
                          {binData.quantity} units of {binData.product}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
