"use client";

import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Reorder, AnimatePresence, motion } from 'framer-motion';
import { Upload, X, GripVertical, Image as ImageIcon, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

interface ImageFile {
  id: string;
  file?: File;
  url: string;
  progress: number;
  status: 'uploading' | 'complete' | 'error';
}

interface ImageUploaderProps {
  images: ImageFile[];
  onChange: (images: ImageFile[]) => void;
  maxImages?: number;
  maxSizeMB?: number;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  images,
  onChange,
  maxImages = 6,
  maxSizeMB = 5
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const imagesRef = React.useRef<ImageFile[]>(images);
  imagesRef.current = images;

  const simulateUpload = useCallback((id: string) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 30;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        onChange(imagesRef.current.map(img =>
          img.id === id ? { ...img, progress: 100, status: 'complete' as const } : img
        ));
      } else {
        onChange(imagesRef.current.map(img =>
          img.id === id ? { ...img, progress } : img
        ));
      }
    }, 400);
  }, [onChange]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const remainingSlots = maxImages - images.length;
    const filesToUpload = acceptedFiles.slice(0, remainingSlots);

    const newImages: ImageFile[] = filesToUpload.map(file => {
      const id = Math.random().toString(36).substring(7);
      const url = URL.createObjectURL(file);
      
      // Kick off simulated upload
      setTimeout(() => simulateUpload(id), 100);

      return {
        id,
        file,
        url,
        progress: 0,
        status: 'uploading'
      };
    });

    onChange([...images, ...newImages]);
  }, [images, maxImages, onChange, simulateUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    maxSize: maxSizeMB * 1024 * 1024,
    disabled: images.length >= maxImages
  });

  const removeImage = (id: string) => {
    const filtered = images.filter(img => img.id !== id);
    onChange(filtered);
  };

  const handleReorder = (newOrder: ImageFile[]) => {
    onChange(newOrder);
  };

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-2xl p-8 transition-all flex flex-col items-center justify-center gap-3 cursor-pointer",
          isDragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/40 bg-muted/30",
          images.length >= maxImages && "opacity-50 cursor-not-allowed pointer-events-none"
        )}
      >
        <input {...getInputProps()} />
        <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-400">
          <Upload className="w-6 h-6" />
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold text-slate-900">
            {images.length >= maxImages ? "Limit reached" : "Click to upload or drag and drop"}
          </p>
          <p className="text-xs text-slate-500 mt-1">
            PNG, JPG up to {maxSizeMB}MB ({images.length}/{maxImages})
          </p>
        </div>
      </div>

      <Reorder.Group
        axis="y"
        values={images}
        onReorder={handleReorder}
        className="space-y-2"
      >
        <AnimatePresence mode="popLayout">
          {images.map((img) => (
            <Reorder.Item
              key={img.id}
              value={img}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={cn(
                "flex items-center gap-4 bg-white p-3 rounded-xl border border-slate-200 shadow-sm group",
                img.status === 'uploading' && "bg-slate-50/50"
              )}
            >
              <GripVertical className="w-4 h-4 text-slate-300 cursor-grab active:cursor-grabbing shrink-0" />
              
              <div className="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden relative shrink-0">
                <img src={img.url} alt="preview" className="w-full h-full object-cover" />
                {img.status === 'uploading' && (
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <Loader2 className="w-4 h-4 text-white animate-spin" />
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs font-medium text-slate-700 truncate">
                    {img.file?.name || 'Image'}
                  </p>
                  <span className="text-[10px] font-bold text-slate-400">
                    {Math.round(img.progress)}%
                  </span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: `${img.progress}%` }}
                    transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
                  />
                </div>
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeImage(img.id)}
                className="w-8 h-8 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50"
              >
                <X className="w-4 h-4" />
              </Button>
            </Reorder.Item>
          ))}
        </AnimatePresence>
      </Reorder.Group>
    </div>
  );
};
