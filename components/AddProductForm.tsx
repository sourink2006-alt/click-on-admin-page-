"use client";

import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { 
  ChevronRight, 
  Save, 
  X, 
  Plus, 
  Tag as TagIcon, 
  Layers, 
  IndianRupee, 
  Package, 
  Calendar,
  Sparkles,
  Loader2,
  CheckCircle2
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ImageUploader } from './ImageUploader';
import { PreviewCard } from './PreviewCard';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const schema = yup.object().shape({
  name: yup.string().required('Product name is required'),
  sku: yup.string().matches(/^[a-zA-Z0-9-]+$/, 'SKU must be alphanumeric').required('SKU is required'),
  category: yup.string().required('Please select a category'),
  price: yup.number().typeError('Price must be a number').positive('Price must be positive').required('Price is required'),
  discount: yup.number().typeError('Discount must be a number').min(0).max(100).optional().default(0),
  inventory: yup.number().typeError('Inventory must be a number').integer().min(0).required('Inventory is required'),
  short_description: yup.string().max(160, 'Max 160 characters').optional(),
  long_description: yup.string().optional(),
  slug: yup.string().required('Slug is required'),
  tags: yup.string().optional(),
  is_published: yup.boolean().default(false),
  publish_at: yup.string().optional(),
  attributes: yup.array().of(
    yup.object().shape({
      key: yup.string().required('Key is required'),
      value: yup.string().required('Value is required')
    })
  )
});

const CATEGORIES = [
  'Fruits & Vegetables',
  'Dairy & Bread',
  'Atta, Rice & Dal',
  'Oil & Masala',
  'Munchies',
  'Cold Drinks & Juices'
];

export const AddProductForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [images, setImages] = useState<any[]>([]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      is_published: false,
      attributes: [{ key: 'Brand', value: '' }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "attributes"
  });

  const productName = watch('name');
  const price = watch('price');
  const discount = watch('discount');
  const shortDescription = watch('short_description');
  const category = watch('category');

  // Auto-slug generation
  useEffect(() => {
    if (productName) {
      const slug = productName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      setValue('slug', slug, { shouldValidate: true });
    }
  }, [productName, setValue]);

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    
    // Simulate API call
    console.log('Submitting payload:', { 
      ...data, 
      images: images.map(img => img.url) 
    });

    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setShowSuccess(true);
    
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  const previewData = {
    name: productName || '',
    price: price?.toString() || '0',
    discount: discount?.toString() || '0',
    shortDescription: shortDescription || '',
    image: images[0]?.url || '',
    category: category || ''
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Form Side */}
      <div className="lg:col-span-8 space-y-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 pb-12">
          
          {/* Basic Info */}
          <Section card title="Basic Information" icon={Layers}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name</Label>
                <div className="relative">
                  <Input 
                    id="name" 
                    placeholder="e.g. Fresh Red Apples" 
                    {...register('name')}
                    className={cn(errors.name && "border-rose-500 focus-visible:ring-rose-500/20")}
                  />
                  {productName && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <Sparkles className="w-4 h-4 text-[#1D9E75] animate-pulse" />
                    </div>
                  )}
                </div>
                {errors.name && <p className="text-[11px] font-bold text-rose-500 mt-1">{errors.name.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="sku">SKU</Label>
                <Input 
                  id="sku" 
                  placeholder="APP-RED-001" 
                  {...register('sku')}
                  className={cn(errors.sku && "border-rose-500 focus-visible:ring-rose-500/20")}
                />
                {errors.sku && <p className="text-[11px] font-bold text-rose-500 mt-1">{errors.sku.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select onValueChange={(val) => setValue('category', val, { shouldValidate: true })}>
                  <SelectTrigger className={cn(errors.category && "border-rose-500 focus-visible:ring-rose-500/20")}>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category && <p className="text-[11px] font-bold text-rose-500 mt-1">{errors.category.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">Product Slug</Label>
                <Input 
                  id="slug" 
                  placeholder="product-url-slug" 
                  {...register('slug')}
                  className={cn(errors.slug && "border-rose-500 focus-visible:ring-rose-500/20")}
                />
                {errors.slug && <p className="text-[11px] font-bold text-rose-500 mt-1">{errors.slug.message}</p>}
              </div>
            </div>
          </Section>

          {/* Pricing & Inventory */}
          <Section card title="Pricing & Inventory" icon={IndianRupee}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="price">Price (₹)</Label>
                <div className="relative">
                  <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input 
                    id="price" 
                    type="number" 
                    className={cn("pl-9", errors.price && "border-rose-500 focus-visible:ring-rose-500/20")}
                    {...register('price')} 
                  />
                </div>
                {errors.price && <p className="text-[11px] font-bold text-rose-500 mt-1">{errors.price.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="discount">Discount %</Label>
                <Input 
                  id="discount" 
                  type="number" 
                  placeholder="0" 
                  {...register('discount')}
                  className={cn(errors.discount && "border-rose-500 focus-visible:ring-rose-500/20")}
                />
                {errors.discount && <p className="text-[11px] font-bold text-rose-500 mt-1">{errors.discount.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="inventory">Quantity</Label>
                <div className="relative">
                  <Package className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input 
                    id="inventory" 
                    type="number" 
                    className={cn("pl-9", errors.inventory && "border-rose-500 focus-visible:ring-rose-500/20")}
                    {...register('inventory')}
                  />
                </div>
                {errors.inventory && <p className="text-[11px] font-bold text-rose-500 mt-1">{errors.inventory.message}</p>}
              </div>
            </div>
          </Section>

          {/* Media */}
          <Section card title="Product Gallery" icon={Layers}>
             <ImageUploader images={images} onChange={setImages} />
          </Section>

          {/* Descriptions */}
          <Section card title="Descriptions" icon={TagIcon}>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="short_description">Short Description</Label>
                  <span className={cn(
                    "text-[10px] font-bold",
                    (shortDescription?.length || 0) > 160 ? "text-rose-500" : "text-slate-400"
                  )}>
                    {shortDescription?.length || 0}/160
                  </span>
                </div>
                <Textarea 
                  id="short_description" 
                  placeholder="A brief summary for category listings..." 
                  {...register('short_description')}
                  className={cn("h-20", errors.short_description && "border-rose-500 focus-visible:ring-rose-500/20")}
                />
                {errors.short_description && <p className="text-[11px] font-bold text-rose-500 mt-1">{errors.short_description.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="long_description">Long Description</Label>
                <Textarea 
                  id="long_description" 
                  placeholder="Detailed product information, benefits, and ingredients..." 
                  className="h-40"
                  {...register('long_description')}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input id="tags" placeholder="fresh, apple, organic" {...register('tags')} />
              </div>
            </div>
          </Section>

          {/* Attributes */}
          <Section card title="Product Attributes" icon={Plus}>
            <div className="space-y-4">
              {fields.map((field, index) => (
                <div key={field.id} className="flex gap-4 items-end animate-in fade-in slide-in-from-left-2 duration-300">
                  <div className="flex-1 space-y-2">
                    <Label className="text-[10px]">Attribute Key</Label>
                    <Input placeholder="e.g. Size" {...register(`attributes.${index}.key`)} />
                  </div>
                  <div className="flex-1 space-y-2">
                    <Label className="text-[10px]">Value</Label>
                    <Input placeholder="e.g. Large" {...register(`attributes.${index}.value`)} />
                  </div>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="icon" 
                    className="mb-[2px] text-slate-400 hover:text-rose-500"
                    onClick={() => remove(index)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button 
                type="button" 
                variant="outline" 
                className="w-full border-dashed border-2 py-6 rounded-xl hover:bg-[#1D9E75]/5 hover:border-[#1D9E75] hover:text-[#1D9E75] transition-all"
                onClick={() => append({ key: '', value: '' })}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add New Attribute
              </Button>
            </div>
          </Section>

          {/* Publishing */}
          <Section card title="Publish Settings" icon={Calendar}>
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="space-y-0.5">
                  <Label className="text-base font-bold">Publish Product</Label>
                  <p className="text-[11px] text-slate-500 font-medium">Make this product visible to users immediately</p>
                </div>
                <Switch 
                  onCheckedChange={(val) => setValue('is_published', val)}
                  {...register('is_published')}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="publish_at">Schedule Launch (Optional)</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input 
                    id="publish_at" 
                    type="datetime-local" 
                    className="pl-9"
                    {...register('publish_at')}
                  />
                </div>
                <p className="text-[10px] text-slate-400 font-medium">Product will go live at the selected time if Publish toggle is ON.</p>
              </div>
            </div>
          </Section>

          {/* Fixed bottom bar for desktop, normal button for mobile */}
          <div className="pt-4">
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-[#1D9E75] hover:bg-[#1D9E75]/90 text-white py-8 rounded-2xl text-lg font-black shadow-xl shadow-[#1D9E75]/20 flex items-center justify-center gap-3 transition-all"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  SAVING PRODUCT...
                </>
              ) : (
                <>
                  <Save className="w-6 h-6" />
                  SAVE PRODUCT
                </>
              )}
            </Button>
          </div>
        </form>
      </div>

      {/* Preview Side */}
      <div className="lg:col-span-4 sticky top-28 h-fit hidden lg:block">
        <PreviewCard data={previewData} />
      </div>

      {/* Success Toast Overlay */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
          >
            <div className="bg-slate-900 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-white/10 backdrop-blur-xl">
              <div className="w-8 h-8 rounded-full bg-[#1D9E75] flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-bold">Product Saved Successfully!</p>
                <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">Inventory updated</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Section = ({ title, icon: Icon, children, card }: any) => {
  return (
    <div className={cn(
      "space-y-6",
      card && "bg-white p-8 rounded-3xl border border-slate-200 shadow-sm"
    )}>
      <div className="flex items-center gap-2 px-1">
        <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100">
          <Icon className="w-4 h-4" />
        </div>
        <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">{title}</h3>
      </div>
      {children}
    </div>
  );
};
