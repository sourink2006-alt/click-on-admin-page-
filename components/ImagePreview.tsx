"use client";

import React from 'react';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';
import { ImageIcon, Maximize2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImagePreviewProps {
  images: string[];
  placeholder?: string;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({ images, placeholder = "Issue Image" }) => {
  if (!images || images.length === 0) {
    return (
      <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-300">
        <ImageIcon className="w-5 h-5" />
      </div>
    );
  }

  const mainImage = images[0];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="relative group cursor-zoom-in">
          <div className="w-10 h-10 rounded-lg overflow-hidden border border-slate-200">
            <img 
              src={mainImage} 
              alt={placeholder} 
              className="w-full h-full object-cover transition-transform group-hover:scale-110" 
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://placehold.co/100x100?text=No+Image';
              }}
            />
          </div>
          {images.length > 1 && (
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-slate-900 text-white rounded-full flex items-center justify-center text-[8px] font-black border border-white">
              +{images.length - 1}
            </div>
          )}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
            <Maximize2 className="w-3 h-3 text-white" />
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-3xl p-2 bg-slate-950 border-slate-800">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {images.map((img, idx) => (
            <div key={idx} className={cn(
              "rounded-2xl overflow-hidden bg-slate-900 border border-slate-800",
              images.length === 1 && "md:col-span-2"
            )}>
              <img 
                src={img} 
                alt={`${placeholder} - ${idx + 1}`} 
                className="w-full h-auto object-contain max-h-[70vh] mx-auto"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://placehold.co/800x600?text=Image+Load+Failed';
                }}
              />
            </div>
          ))}
        </div>
        <div className="p-4">
          <p className="text-white text-sm font-bold">{placeholder}</p>
          <p className="text-slate-400 text-xs font-medium uppercase tracking-widest mt-1">
            {images.length} Attachment{images.length > 1 ? 's' : ''}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
