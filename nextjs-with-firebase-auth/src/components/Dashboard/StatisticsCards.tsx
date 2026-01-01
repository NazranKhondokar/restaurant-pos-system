"use client";

import { FiTrendingDown, FiTrendingUp } from "react-icons/fi";

interface StatCardProps {
  title: string;
  value: string | number;
  change: number;
  changeText: string;
  currency?: boolean;
}

function StatCard({
  title,
  value,
  change,
  changeText,
  currency = false,
}: StatCardProps) {
  const isNegative = change < 0;
  const changeValue = Math.abs(change);

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <h3 className="text-sm text-gray-600 mb-2">{title}</h3>
      <div className="flex items-baseline gap-1 mb-2">
        {currency && <span className="text-2xl font-bold text-gray-800">৳</span>}
        <p className="text-3xl font-bold text-gray-800">{value}</p>
      </div>
      <div className="flex items-center gap-1">
        {isNegative ? (
          <FiTrendingDown className="w-4 h-4 text-red-500" />
        ) : (
          <FiTrendingUp className="w-4 h-4 text-green-500" />
        )}
        <span
          className={`text-sm font-medium ${
            isNegative ? "text-red-500" : "text-green-500"
          }`}
        >
          {isNegative ? "-" : "+"}
          {changeValue}%
        </span>
        <span className="text-sm text-gray-500">{changeText}</span>
      </div>
    </div>
  );
}

interface StatisticsCardsProps {
  stats?: {
    todayOrders: number;
    todayOrdersChange: number;
    todayEarnings: number;
    todayEarningsChange: number;
    todayCustomers: number;
    todayCustomersChange: number;
    averageDailyEarnings: number;
    averageDailyEarningsChange: number;
  };
}

export default function StatisticsCards({ stats }: StatisticsCardsProps) {
  const defaultStats = {
    todayOrders: 0,
    todayOrdersChange: -100,
    todayEarnings: 0,
    todayEarningsChange: -100,
    todayCustomers: 0,
    todayCustomersChange: 0,
    averageDailyEarnings: 0,
    averageDailyEarningsChange: -100,
  };

  const data = stats || defaultStats;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <StatCard
        title="Today's Orders"
        value={data.todayOrders}
        change={data.todayOrdersChange}
        changeText="Since yesterday"
      />
      <StatCard
        title="Today's Earnings"
        value={data.todayEarnings.toFixed(2)}
        change={data.todayEarningsChange}
        changeText="Since yesterday"
        currency
      />
      <StatCard
        title="Today's Customer"
        value={data.todayCustomers}
        change={data.todayCustomersChange}
        changeText="Since yesterday"
      />
      <StatCard
        title="Average Daily Earnings (January)"
        value={data.averageDailyEarnings.toFixed(2)}
        change={data.averageDailyEarningsChange}
        changeText="Since Previous Month"
        currency
      />
    </div>
  );
}
