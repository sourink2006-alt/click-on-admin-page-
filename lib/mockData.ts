export type OrderStatus = 'picking' | 'packing' | 'transit' | 'delayed' | 'done';

export interface Order {
  id: string;
  name: string;
  items: number;
  amount: string;
  picker: string;
  status: OrderStatus;
  label: string;
  timer: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  stock: number;
  max: number;
  reorder: number;
  supplier: string;
  expiry: string;
  status: 'critical' | 'low' | 'ok';
}

export interface Zone {
  name: string;
  utilization: number;
  color: string;
  bins: {
    lbl: string;
    status: 'stocked' | 'low' | 'empty' | 'picker';
    who?: string;
    products: string[];
  }[];
}

export interface Complaint {
  id: string;
  order: string;
  name: string;
  rating: number;
  text: string;
  tag: string;
  image: string;
  rider?: string;
  picker?: string;
  isCritical?: boolean;
}

export interface ReturnRequest {
  id: string;
  orderId: string;
  name: string;
  item: string;
  reason: string;
  type: string;
  status: 'pending' | 'approved' | 'rejected';
  amount: string;
  images: string[];
}

export interface PAndLEntry {
  label: string;
  value: number;
  type: 'positive' | 'negative';
}

export interface Worker {
  id: string;
  name: string;
  role: string;
  shift: string;
  status: 'incoming' | 'standby';
}

export interface IncomingBatch {
  id: string;
  supplier: string;
  skus: number;
  expectedAt: string;
  status: 'pending' | 'confirmed';
  progress: number;
}

export interface HandoverBatch {
  id: string;
  origin: string;
  totalItems: number;
  processedItems: number; // Updated name
  status: 'pending' | 'in progress' | 'completed';
  products: {
    sku: string;
    name: string;
    delivered: number; // Updated name
    processed: number; // Updated name
    location: string;
  }[];
}

export const MOCK_DATA = {
  orders: [
    { id: '#4821', name: 'Rahul M.', items: 4, amount: '₹348', picker: 'Divya', status: 'picking', label: 'Picking', timer: '3:12' },
    { id: '#4820', name: 'Sneha K.', items: 2, amount: '₹219', picker: 'Ravi', status: 'packing', label: 'Packing', timer: '6:40' },
    { id: '#4819', name: 'Arjun P.', items: 7, amount: '₹540', picker: 'Divya', status: 'transit', label: 'On way', timer: '7:55' },
    { id: '#4818', name: 'Priya R.', items: 1, amount: '₹126', picker: 'Suresh', status: 'delayed', label: 'Delayed', timer: '12:20' },
  ] as Order[],

  inventory: [
    { id: 'SKU-001', name: 'Amul butter 500g', category: 'Dairy', stock: 4, max: 50, reorder: 10, supplier: 'Amul', expiry: 'Apr 26', status: 'critical' },
    { id: 'SKU-002', name: 'Eggs tray (30)', category: 'Eggs', stock: 11, max: 50, reorder: 15, supplier: 'Fresh Farms', expiry: 'Apr 22', status: 'low' },
    { id: 'SKU-003', name: 'Bread (brown)', category: 'Bakery', stock: 9, max: 50, reorder: 12, supplier: 'Britannia', expiry: 'Apr 21', status: 'low' },
    { id: 'SKU-005', name: 'Coke 2L', category: 'Beverages', stock: 38, max: 50, reorder: 10, supplier: 'Coca-Cola', expiry: 'Dec 25', status: 'ok' },
  ] as InventoryItem[],

  zones: [
    { 
      name: 'Zone A — Dairy & chilled', 
      utilization: 72, 
      color: '#1D9E75',
      bins: [
        { lbl: 'A1', status: 'stocked', products: ['SKU-001', 'SKU-002'] }, 
        { lbl: 'A2', status: 'stocked', products: ['SKU-003'] }, 
        { lbl: 'A3', status: 'low', products: ['SKU-004'] }, 
        { lbl: 'A4', status: 'picker', who: 'D', products: ['SKU-001'] }
      ] 
    },
    { 
      name: 'Zone B — Staples & dry', 
      utilization: 88, 
      color: '#1D9E75',
      bins: [
        { lbl: 'B1', status: 'stocked', products: ['SKU-006'] }, 
        { lbl: 'B2', status: 'stocked', products: ['SKU-007'] }, 
        { lbl: 'B3', status: 'empty', products: [] }
      ] 
    }
  ] as Zone[],

  returns: [
    { id: '#R-041', orderId: '#4803', name: 'Kavitha P.', item: 'Amul butter 500g', reason: 'Wrong item delivered', type: 'Wrong item', status: 'pending', amount: '₹70', images: ['/returns/wrong-1.jpg'] },
    { id: '#R-040', orderId: '#4798', name: 'Sandeep R.', item: 'Maggi 12-pack', reason: 'Pack damaged, noodles spilled', type: 'Damaged', status: 'pending', amount: '₹185', images: ['/returns/damage-1.jpg', '/returns/damage-2.jpg'] },
    { id: '#R-039', orderId: '#4790', name: 'Anjali T.', item: 'Eggs tray (30)', reason: '3 eggs broken on delivery', type: 'Damaged', status: 'pending', amount: '₹72', images: ['/returns/eggs-broken.jpg'] },
  ] as ReturnRequest[],

  complaints: [
    { id: '1', order: '#4818', name: 'Priya R.', rating: 1, text: 'Order took 22 minutes! Completely unacceptable for a 10-min promise.', image: '/complaints/late.jpg', tag: 'Late delivery', rider: 'Sanjay P.', isCritical: true },
    { id: '2', order: '#4810', name: 'Arun M.', rating: 2, text: 'Got white bread instead of brown bread. Picker clearly didn\'t read the order.', image: '/complaints/wrong.jpg', tag: 'Wrong item', picker: 'Suresh M.' },
    { id: '3', order: '#4805', name: 'Nisha K.', rating: 3, text: 'Packaging was very flimsy, chips bag was crushed.', image: '/complaints/damaged.jpg', tag: 'Packaging' },
    { id: '4', order: '#4799', name: 'Dev S.', rating: 2, text: 'Milk was about to expire — 1 day left. This is unacceptable.', image: '/complaints/quality.jpg', tag: 'Quality' },
  ] as Complaint[],

  pnl: [
    { label: 'Gross revenue', value: 82400, type: 'positive' },
    { label: 'Cost of goods sold', value: 52300, type: 'negative' },
    { label: 'Rider payouts', value: 8200, type: 'negative' },
    { label: 'Staff wages (today)', value: 1200, type: 'negative' },
    { label: 'Wastage / expiry loss', value: 1800, type: 'negative' },
    { label: 'Packaging & misc', value: 600, type: 'negative' },
  ] as PAndLEntry[],

  incomingBatches: [
    { id: 'B-8812', supplier: 'Amul Dairy', skus: 12, expectedAt: '14:30', status: 'confirmed', progress: 85 },
    { id: 'B-8813', supplier: 'Britannia', skus: 8, expectedAt: '16:00', status: 'pending', progress: 40 },
    { id: 'B-8814', supplier: 'Fresh Farms', skus: 24, expectedAt: 'Tomorrow 09:00', status: 'pending', progress: 10 },
  ] as IncomingBatch[],

  handoverBatches: [
    {
      id: 'HB-001',
      origin: 'Main Warehouse',
      totalItems: 42,
      processedItems: 18,
      status: 'in progress',
      products: [
        { sku: 'SKU-001', name: 'Amul butter 500g', delivered: 24, processed: 18, location: 'A1' },
        { sku: 'SKU-002', name: 'Eggs tray (30)', delivered: 18, processed: 0, location: 'A2' },
      ]
    },
    {
      id: 'HB-002',
      origin: 'Regional DC',
      totalItems: 12,
      processedItems: 0,
      status: 'pending',
      products: [
        { sku: 'SKU-005', name: 'Coke 2L', delivered: 12, processed: 0, location: 'B1' },
      ]
    }
  ] as HandoverBatch[],

  handover: [
    { id: 'W-001', name: 'Renu K.', role: 'Store Manager', shift: 'Evening (2PM - 10PM)', status: 'incoming' },
  ] as Worker[],

  hourlyOrders: [
    { hour: '6am', count: 12 }, { hour: '7am', count: 8 }, { hour: '8am', count: 15 },
    { hour: '9am', count: 22 }, { hour: '10am', count: 34 }, { hour: '11am', count: 41 },
    { hour: '12pm', count: 38 }, { hour: '1pm', count: 44 }, { hour: '2pm', count: 52 },
    { hour: '3pm', count: 48 }, { hour: '4pm', count: 60 }, { hour: '5pm', count: 67 },
    { hour: '6pm', count: 71 }, { hour: '7pm', count: 58 }, { hour: '8pm', count: 49 },
    { hour: '9pm', count: 55 }, { hour: '10pm', count: 62 }, { hour: '11pm', count: 70 },
  ],

  weeklyProfit: [
    { day: 'Mon', profit: 14000 }, { day: 'Tue', profit: 13000 }, { day: 'Wed', profit: 16000 },
    { day: 'Thu', profit: 12000 }, { day: 'Fri', profit: 20000 }, { day: 'Sat', profit: 22000 },
    { day: 'Today', profit: 18000 },
  ],
};