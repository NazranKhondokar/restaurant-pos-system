// Dashboard Types

export interface IDashboardStats {
  todayOrders: number;
  todayOrdersChange: number;
  todayEarnings: number;
  todayEarningsChange: number;
  todayCustomers: number;
  todayCustomersChange: number;
  averageDailyEarnings: number;
  averageDailyEarningsChange: number;
  salesThisMonth: number;
  salesThisMonthChange: number;
}

export interface ISalesData {
  month: string;
  sales: number;
}

export interface ITodayOrder {
  id: number;
  orderNumber: string;
  orderType: string;
  customerName: string;
  amount: number;
  status: string;
  time: string;
}

export interface IDashboardData {
  stats: IDashboardStats;
  salesData: ISalesData[];
  todayOrders: ITodayOrder[];
}
