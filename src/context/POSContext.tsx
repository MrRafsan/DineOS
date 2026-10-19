import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Table,
  Order,
  MenuItem,
  Category,
  RestaurantSettings,
  WorkPeriod,
  Expense,
  OrderType,
  ActiveNavView,
  OrderItem,
} from '../types/pos';
import {
  INITIAL_TABLES,
  INITIAL_ORDERS,
  INITIAL_COMPLETED_ORDERS,
  INITIAL_MENU_ITEMS,
  INITIAL_CATEGORIES,
  INITIAL_SETTINGS,
  INITIAL_WORK_PERIOD,
  INITIAL_EXPENSES,
} from '../data/mockData';

interface POSContextType {
  tables: Table[];
  orders: Order[];
  orderHistory: Order[];
  menuItems: MenuItem[];
  categories: Category[];
  settings: RestaurantSettings;
  workPeriod: WorkPeriod;
  expenses: Expense[];
  activeBranch: string;
  setActiveBranch: (branch: string) => void;
  activeNavView: ActiveNavView;
  setActiveNavView: (view: ActiveNavView) => void;
  selectedOrderType: OrderType;
  setSelectedOrderType: (type: OrderType) => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean | ((prev: boolean) => boolean)) => void;
  mobileSidebarOpen: boolean;
  setMobileSidebarOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
  isBannerDismissed: boolean;
  setIsBannerDismissed: (dismissed: boolean) => void;

  // Active table & modal management
  selectedTable: Table | null;
  setSelectedTable: (table: Table | null) => void;
  isOrderModalOpen: boolean;
  setIsOrderModalOpen: (open: boolean) => void;
  isTableDetailModalOpen: boolean;
  setIsTableDetailModalOpen: (open: boolean) => void;
  isPaymentModalOpen: boolean;
  setIsPaymentModalOpen: (open: boolean) => void;
  orderToPay: Order | null;
  setOrderToPay: (order: Order | null) => void;
  isReceiptModalOpen: boolean;
  setIsReceiptModalOpen: (open: boolean) => void;
  receiptOrder: Order | null;
  setReceiptOrder: (order: Order | null) => void;
  isCalculatorOpen: boolean;
  setIsCalculatorOpen: (open: boolean) => void;

  // In-app notifications/toasts (replaces window.alert)
  toast: { message: string; type: 'success' | 'info' | 'error' } | null;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  hideToast: () => void;

  // POS Actions
  createOrder: (params: {
    type: OrderType;
    tableId?: string;
    tableName?: string;
    waiterName: string;
    customerName: string;
    customerPhone: string;
    items: OrderItem[];
    discountType: 'flat' | 'percentage';
    discountValue: number;
  }) => Order;
  addItemsToTableOrder: (tableId: string, newItems: OrderItem[]) => void;
  settleOrder: (
    orderId: string,
    paymentMethod: 'Cash' | 'bKash' | 'Nagad' | 'Card',
    paymentDetails?: { cashReceived?: number; changeReturned?: number; transactionId?: string }
  ) => void;
  transferTable: (sourceTableId: string, destinationTableId: string) => boolean;
  cancelOrder: (orderId: string) => void;
  updateKotItemStatus: (orderId: string, itemId: string, status: 'pending' | 'preparing' | 'ready' | 'served') => void;
  markAllKdsOrderReady: (orderId: string) => void;

  // Store Management
  addMenuItem: (item: Omit<MenuItem, 'id'>) => void;
  addTable: (name: string, floor: string, capacity: number) => void;
  addExpense: (title: string, category: string, amount: number, paymentMethod: string, note?: string) => void;
  closeWorkPeriod: (closingCash: number, notes?: string) => void;
  openNewWorkPeriod: (startingCash: number) => void;
  updateSettings: (newSettings: Partial<RestaurantSettings>) => void;
  resetToDemoData: () => void;
}

const STORAGE_KEY = 'chillypos_app_state_v2';

const POSContext = createContext<POSContextType | undefined>(undefined);

export const POSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load saved state or default
  const [tables, setTables] = useState<Table[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_tables`);
      return saved ? JSON.parse(saved) : INITIAL_TABLES;
    } catch {
      return INITIAL_TABLES;
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_orders`);
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  const [orderHistory, setOrderHistory] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_history`);
      return saved ? JSON.parse(saved) : INITIAL_COMPLETED_ORDERS;
    } catch {
      return INITIAL_COMPLETED_ORDERS;
    }
  });

  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_menu`);
      return saved ? JSON.parse(saved) : INITIAL_MENU_ITEMS;
    } catch {
      return INITIAL_MENU_ITEMS;
    }
  });

  const [categories] = useState<Category[]>(INITIAL_CATEGORIES);

  const [settings, setSettings] = useState<RestaurantSettings>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_settings`);
      return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
    } catch {
      return INITIAL_SETTINGS;
    }
  });

  const [workPeriod, setWorkPeriod] = useState<WorkPeriod>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_work_period`);
      return saved ? JSON.parse(saved) : INITIAL_WORK_PERIOD;
    } catch {
      return INITIAL_WORK_PERIOD;
    }
  });

  const [expenses, setExpenses] = useState<Expense[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_expenses`);
      return saved ? JSON.parse(saved) : INITIAL_EXPENSES;
    } catch {
      return INITIAL_EXPENSES;
    }
  });

  const [activeBranch, setActiveBranch] = useState<string>('Mirpur 10');
  const [activeNavView, setActiveNavView] = useState<ActiveNavView>('pos_order');
  const [selectedOrderType, setSelectedOrderType] = useState<OrderType>('dine_in');
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState<boolean>(false);
  const [isBannerDismissed, setIsBannerDismissed] = useState<boolean>(false);

  // Modals state
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState<boolean>(false);
  const [isTableDetailModalOpen, setIsTableDetailModalOpen] = useState<boolean>(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState<boolean>(false);
  const [orderToPay, setOrderToPay] = useState<Order | null>(null);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState<boolean>(false);
  const [receiptOrder, setReceiptOrder] = useState<Order | null>(null);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState<boolean>(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'info') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast((current) => (current?.message === message ? null : current));
    }, 3500);
  };

  const hideToast = () => setToast(null);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_tables`, JSON.stringify(tables));
      localStorage.setItem(`${STORAGE_KEY}_orders`, JSON.stringify(orders));
      localStorage.setItem(`${STORAGE_KEY}_history`, JSON.stringify(orderHistory));
      localStorage.setItem(`${STORAGE_KEY}_menu`, JSON.stringify(menuItems));
      localStorage.setItem(`${STORAGE_KEY}_settings`, JSON.stringify(settings));
      localStorage.setItem(`${STORAGE_KEY}_work_period`, JSON.stringify(workPeriod));
      localStorage.setItem(`${STORAGE_KEY}_expenses`, JSON.stringify(expenses));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }, [tables, orders, orderHistory, menuItems, settings, workPeriod, expenses]);

  // Live timer tick for active table orders
  const [, setTick] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setTick((t) => t + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Helper to generate next token number
  const getNextTokenNumber = () => {
    const allTokens = [...orders, ...orderHistory].map((o) => o.tokenNumber || 0);
    const maxToken = allTokens.length > 0 ? Math.max(...allTokens) : 0;
    return maxToken >= 99 ? 1 : maxToken + 1;
  };

  // Create new order
  const createOrder = (params: {
    type: OrderType;
    tableId?: string;
    tableName?: string;
    waiterName: string;
    customerName: string;
    customerPhone: string;
    items: OrderItem[];
    discountType: 'flat' | 'percentage';
    discountValue: number;
  }): Order => {
    const tokenNumber = getNextTokenNumber();
    const subtotal = params.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    
    let discountAmt = 0;
    if (params.discountType === 'percentage') {
      discountAmt = Math.round((subtotal * params.discountValue) / 100);
    } else {
      discountAmt = params.discountValue;
    }
    const afterDiscount = Math.max(0, subtotal - discountAmt);
    const vatAmount = Math.round((afterDiscount * settings.vatPercent) / 100);
    const serviceCharge = Math.round((afterDiscount * settings.serviceChargePercent) / 100);
    const total = afterDiscount + vatAmount + serviceCharge;

    const newOrder: Order = {
      id: `ord_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      tokenNumber,
      type: params.type,
      tableId: params.tableId,
      tableName: params.tableName,
      waiterName: params.waiterName || 'Default Waiter',
      customerName: params.customerName || 'Walk-in Guest',
      customerPhone: params.customerPhone || '',
      items: params.items,
      subtotal,
      discountType: params.discountType,
      discountValue: params.discountValue,
      vatRate: settings.vatPercent / 100,
      vatAmount,
      serviceCharge,
      total,
      status: 'active',
      createdAt: new Date().toISOString(),
      initialSeconds: 0,
      channelOrderNumber: params.type !== 'dine_in' ? `${params.type.toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}` : undefined,
    };

    setOrders((prev) => [newOrder, ...prev]);

    // If dine in and table was selected, mark table as occupied
    if (params.tableId) {
      setTables((prev) =>
        prev.map((tbl) =>
          tbl.id === params.tableId
            ? { ...tbl, status: 'occupied', currentOrderId: newOrder.id }
            : tbl
        )
      );
    }

    return newOrder;
  };

  // Add items to existing table order
  const addItemsToTableOrder = (tableId: string, newItems: OrderItem[]) => {
    const targetTable = tables.find((t) => t.id === tableId);
    if (!targetTable || !targetTable.currentOrderId) return;

    setOrders((prev) =>
      prev.map((order) => {
        if (order.id !== targetTable.currentOrderId) return order;

        const mergedItems = [...order.items, ...newItems];
        const subtotal = mergedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        let discountAmt = 0;
        if (order.discountType === 'percentage') {
          discountAmt = Math.round((subtotal * order.discountValue) / 100);
        } else {
          discountAmt = order.discountValue;
        }
        const afterDiscount = Math.max(0, subtotal - discountAmt);
        const vatAmount = Math.round((afterDiscount * settings.vatPercent) / 100);
        const total = afterDiscount + vatAmount + order.serviceCharge;

        return {
          ...order,
          items: mergedItems,
          subtotal,
          vatAmount,
          total,
        };
      })
    );
  };

  // Settle order (Payment complete)
  const settleOrder = (
    orderId: string,
    paymentMethod: 'Cash' | 'bKash' | 'Nagad' | 'Card',
    paymentDetails?: { cashReceived?: number; changeReturned?: number; transactionId?: string }
  ) => {
    const targetOrder = orders.find((o) => o.id === orderId);
    if (!targetOrder) return;

    const completedOrder: Order = {
      ...targetOrder,
      status: 'completed',
      paymentMethod,
      paymentDetails: {
        method: paymentMethod,
        cashReceived: paymentDetails?.cashReceived || targetOrder.total,
        changeReturned: paymentDetails?.changeReturned || 0,
        transactionId: paymentDetails?.transactionId || (paymentMethod !== 'Cash' ? `TXN-${Math.random().toString(36).substring(2, 8).toUpperCase()}` : undefined),
      },
      closedAt: new Date().toISOString(),
    };

    // Remove from active orders and append to order history
    setOrders((prev) => prev.filter((o) => o.id !== orderId));
    setOrderHistory((prev) => [completedOrder, ...prev]);

    // Free the table
    if (targetOrder.tableId) {
      setTables((prev) =>
        prev.map((t) =>
          t.id === targetOrder.tableId
            ? { ...t, status: 'available', currentOrderId: undefined }
            : t
        )
      );
    }

    // Update Work Period stats
    setWorkPeriod((prev) => {
      const isCash = paymentMethod === 'Cash';
      return {
        ...prev,
        totalCashSales: isCash ? prev.totalCashSales + targetOrder.total : prev.totalCashSales,
        totalDigitalSales: !isCash ? prev.totalDigitalSales + targetOrder.total : prev.totalDigitalSales,
      };
    });

    // Set as receipt order to allow instant thermal receipt print preview
    setReceiptOrder(completedOrder);
    setIsReceiptModalOpen(true);
  };

  // Transfer table order to another available table
  const transferTable = (sourceTableId: string, destinationTableId: string): boolean => {
    const source = tables.find((t) => t.id === sourceTableId);
    const dest = tables.find((t) => t.id === destinationTableId);

    if (!source || !dest || !source.currentOrderId || dest.status !== 'available') {
      return false;
    }

    const orderId = source.currentOrderId;

    // Update table statuses
    setTables((prev) =>
      prev.map((t) => {
        if (t.id === sourceTableId) {
          return { ...t, status: 'available', currentOrderId: undefined };
        }
        if (t.id === destinationTableId) {
          return { ...t, status: 'occupied', currentOrderId: orderId };
        }
        return t;
      })
    );

    // Update order reference
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? { ...o, tableId: destinationTableId, tableName: dest.name }
          : o
      )
    );

    return true;
  };

  // Cancel order
  const cancelOrder = (orderId: string) => {
    const target = orders.find((o) => o.id === orderId);
    if (!target) return;

    const cancelledOrder: Order = {
      ...target,
      status: 'cancelled',
      closedAt: new Date().toISOString(),
    };

    setOrders((prev) => prev.filter((o) => o.id !== orderId));
    setOrderHistory((prev) => [cancelledOrder, ...prev]);

    if (target.tableId) {
      setTables((prev) =>
        prev.map((t) =>
          t.id === target.tableId
            ? { ...t, status: 'available', currentOrderId: undefined }
            : t
        )
      );
    }
  };

  // KDS kitchen item status updates
  const updateKotItemStatus = (
    orderId: string,
    itemId: string,
    status: 'pending' | 'preparing' | 'ready' | 'served'
  ) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== orderId) return o;
        return {
          ...o,
          items: o.items.map((item) =>
            item.id === itemId ? { ...item, kotStatus: status } : item
          ),
        };
      })
    );
  };

  const markAllKdsOrderReady = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== orderId) return o;
        return {
          ...o,
          items: o.items.map((item) => ({ ...item, kotStatus: 'ready' as const })),
        };
      })
    );
  };

  // Store Management methods
  const addMenuItem = (item: Omit<MenuItem, 'id'>) => {
    const newItem: MenuItem = {
      ...item,
      id: `item_${Date.now()}`,
    };
    setMenuItems((prev) => [newItem, ...prev]);
  };

  const addTable = (name: string, floor: string, capacity: number) => {
    const newTable: Table = {
      id: `tbl_${Date.now()}`,
      name,
      floor,
      capacity,
      status: 'available',
    };
    setTables((prev) => [...prev, newTable]);
  };

  const addExpense = (
    title: string,
    category: string,
    amount: number,
    paymentMethod: string,
    note?: string
  ) => {
    const newExpense: Expense = {
      id: `exp_${Date.now()}`,
      title,
      category,
      amount,
      paymentMethod,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: new Date().toISOString().split('T')[0],
      note,
    };
    setExpenses((prev) => [newExpense, ...prev]);
    setWorkPeriod((prev) => ({
      ...prev,
      totalExpenses: prev.totalExpenses + amount,
    }));
  };

  const closeWorkPeriod = (closingCash: number, notes?: string) => {
    setWorkPeriod((prev) => ({
      ...prev,
      status: 'closed',
      closedAt: new Date().toISOString(),
      closingCash,
      notes,
    }));
  };

  const openNewWorkPeriod = (startingCash: number) => {
    setWorkPeriod({
      id: `wp_${Date.now()}`,
      openedAt: new Date().toISOString(),
      openedBy: 'ZEVOOX (Owner)',
      startingCash,
      totalCashSales: 0,
      totalDigitalSales: 0,
      totalExpenses: 0,
      status: 'open',
    });
  };

  const updateSettings = (newSettings: Partial<RestaurantSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const resetToDemoData = () => {
    localStorage.removeItem(`${STORAGE_KEY}_tables`);
    localStorage.removeItem(`${STORAGE_KEY}_orders`);
    localStorage.removeItem(`${STORAGE_KEY}_history`);
    localStorage.removeItem(`${STORAGE_KEY}_menu`);
    localStorage.removeItem(`${STORAGE_KEY}_settings`);
    localStorage.removeItem(`${STORAGE_KEY}_work_period`);
    localStorage.removeItem(`${STORAGE_KEY}_expenses`);

    setTables(INITIAL_TABLES);
    setOrders(INITIAL_ORDERS);
    setOrderHistory(INITIAL_COMPLETED_ORDERS);
    setMenuItems(INITIAL_MENU_ITEMS);
    setSettings(INITIAL_SETTINGS);
    setWorkPeriod(INITIAL_WORK_PERIOD);
    setExpenses(INITIAL_EXPENSES);
  };

  return (
    <POSContext.Provider
      value={{
        tables,
        orders,
        orderHistory,
        menuItems,
        categories,
        settings,
        workPeriod,
        expenses,
        activeBranch,
        setActiveBranch,
        activeNavView,
        setActiveNavView,
        selectedOrderType,
        setSelectedOrderType,
        sidebarCollapsed,
        setSidebarCollapsed,
        mobileSidebarOpen,
        setMobileSidebarOpen,
        isBannerDismissed,
        setIsBannerDismissed,
        selectedTable,
        setSelectedTable,
        isOrderModalOpen,
        setIsOrderModalOpen,
        isTableDetailModalOpen,
        setIsTableDetailModalOpen,
        isPaymentModalOpen,
        setIsPaymentModalOpen,
        orderToPay,
        setOrderToPay,
        isReceiptModalOpen,
        setIsReceiptModalOpen,
        receiptOrder,
        setReceiptOrder,
        isCalculatorOpen,
        setIsCalculatorOpen,
        toast,
        showToast,
        hideToast,
        createOrder,
        addItemsToTableOrder,
        settleOrder,
        transferTable,
        cancelOrder,
        updateKotItemStatus,
        markAllKdsOrderReady,
        addMenuItem,
        addTable,
        addExpense,
        closeWorkPeriod,
        openNewWorkPeriod,
        updateSettings,
        resetToDemoData,
      }}
    >
      {children}
    </POSContext.Provider>
  );
};

export const usePOS = () => {
  const context = useContext(POSContext);
  if (!context) {
    throw new Error('usePOS must be used within a POSProvider');
  }
  return context;
};
