export type OrderType = 
  | 'dine_in' 
  | 'foodpanda' 
  | 'foodi' 
  | 'pathao' 
  | 'delivery' 
  | 'takeaway';

export type TableStatus = 'available' | 'occupied' | 'reserved' | 'billed';

export interface Table {
  id: string;
  name: string;
  floor: string;
  capacity: number;
  status: TableStatus;
  currentOrderId?: string;
}

export interface MenuItem {
  id: string;
  name: string;
  banglaName?: string;
  category: string;
  price: number;
  image: string;
  description?: string;
  isAvailable: boolean;
  prepTime: number; // minutes
  spicyLevel?: number;
}

export interface OrderItem {
  id: string;
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
  notes?: string;
  kotStatus: 'pending' | 'preparing' | 'ready' | 'served';
}

export interface Order {
  id: string;
  tokenNumber: number;
  type: OrderType;
  tableId?: string;
  tableName?: string;
  waiterName: string;
  customerName: string;
  customerPhone: string;
  items: OrderItem[];
  subtotal: number;
  discountType: 'flat' | 'percentage';
  discountValue: number;
  vatRate: number; // 0.05 for 5%
  vatAmount: number;
  serviceCharge: number;
  total: number;
  status: 'active' | 'completed' | 'cancelled';
  paymentMethod?: 'Cash' | 'bKash' | 'Nagad' | 'Card' | 'Split';
  paymentDetails?: {
    method: string;
    cashReceived?: number;
    changeReturned?: number;
    transactionId?: string;
  };
  createdAt: string; // ISO date string
  initialSeconds?: number; // seconds elapsed at seed time
  closedAt?: string;
  channelOrderNumber?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface WorkPeriod {
  id: string;
  openedAt: string;
  closedAt?: string;
  openedBy: string;
  startingCash: number;
  closingCash?: number;
  totalCashSales: number;
  totalDigitalSales: number;
  totalExpenses: number;
  status: 'open' | 'closed';
  notes?: string;
}

export interface Expense {
  id: string;
  title: string;
  category: string;
  amount: number;
  paymentMethod: string;
  time: string;
  date: string;
  note?: string;
}

export interface RestaurantSettings {
  name: string;
  branch: string;
  phone: string;
  salesPhone: string;
  currency: string;
  currencySymbol: string;
  vatPercent: number;
  serviceChargePercent: number;
  address: string;
  receiptFooter: string;
  packageExpiryDays: number;
  packageExpiryHours: number;
  packageExpiryMins: number;
}

export type ActiveNavView = 
  | 'pos_order'
  | 'dashboard'
  | 'order_history'
  | 'work_period'
  | 'reports'
  | 'reservation'
  | 'tables'
  | 'categories'
  | 'food_items'
  | 'combined'
  | 'estimator'
  | 'accounting'
  | 'expenses'
  | 'preparation'
  | 'stocks'
  | 'purchases'
  | 'ingredients'
  | 'suppliers'
  | 'kds'
  | 'cds'
  | 'customers'
  | 'subscription'
  | 'marketing'
  | 'branches'
  | 'role_access'
  | 'hrm'
  | 'assets'
  | 'settings'
  | 'help';
