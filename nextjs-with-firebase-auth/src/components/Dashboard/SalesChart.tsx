"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { FiTrendingDown } from "react-icons/fi";

interface SalesChartProps {
  salesData?: Array<{
    month: string;
    sales: number;
  }>;
  salesThisMonth: number;
  salesThisMonthChange: number;
}

export default function SalesChart({
  salesData,
  salesThisMonth = 0,
  salesThisMonthChange = -100,
}: SalesChartProps) {
  const defaultData = [
    { month: "Jan", sales: 0 },
    { month: "Feb", sales: 0 },
    { month: "Mar", sales: 0 },
    { month: "Apr", sales: 0 },
    { month: "May", sales: 0 },
    { month: "Jun", sales: 0 },
  ];

  const data = salesData || defaultData;

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-baseline gap-1 mb-2">
          <span className="text-2xl font-bold text-gray-800">৳</span>
          <p className="text-3xl font-bold text-gray-800">
            {salesThisMonth.toFixed(2)}
          </p>
        </div>
        <p className="text-sm text-gray-600 mb-2">Sales This Month</p>
        <div className="flex items-center gap-1">
          <FiTrendingDown className="w-4 h-4 text-red-500" />
          <span className="text-sm font-medium text-red-500">
            {salesThisMonthChange}%
          </span>
          <span className="text-sm text-gray-500">Since Previous Month</span>
        </div>
      </div>

      {/* Chart */}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 12 }}
              stroke="#9ca3af"
            />
            <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
              }}
              formatter={(value: number) => [`৳${value.toFixed(2)}`, "Sales"]}
            />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ fill: "#3b82f6", r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
