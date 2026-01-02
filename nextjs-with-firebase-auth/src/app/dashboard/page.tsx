"use client";

import StatisticsCards from "@/components/Dashboard/StatisticsCards";
import SalesChart from "@/components/Dashboard/SalesChart";
import TodayOrders from "@/components/Dashboard/TodayOrders";
import PaymentMethodChart from "@/components/Dashboard/PaymentMethodChart";
import TopSellingDish from "@/components/Dashboard/TopSellingDish";
import TopSellingTables from "@/components/Dashboard/TopSellingTables";

export default function DashboardPage() {
  // Dummy data for all sections
  const dummyStats = {
    todayOrders: 0,
    todayOrdersChange: -100,
    todayEarnings: 0,
    todayEarningsChange: -100,
    todayCustomers: 0,
    todayCustomersChange: 0,
    averageDailyEarnings: 0,
    averageDailyEarningsChange: -100,
    salesThisMonth: 0,
    salesThisMonthChange: -100,
  };

  const dummySalesData = [
    { month: "৳6", sales: 0 },
    { month: "৳5", sales: 0 },
    { month: "৳4", sales: 0 },
    { month: "৳3", sales: 0 },
    { month: "৳2", sales: 0 },
    { month: "৳1", sales: 0 },
    { month: "৳0", sales: 0 },
  ];

  const dummyTodayOrders: never[] = [];
  const dummyPaymentMethods: never[] = [];
  const dummyTopDishes: never[] = [];
  const dummyTopTables: never[] = [];

  return (
    <div className="space-y-6">
      {/* Notification Banner */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-center justify-between">
        <p className="text-sm text-yellow-800">
          Enable push notifications to receive important updates instantly.
        </p>
        <button className="btn btn-sm bg-teal-600 hover:bg-teal-700 text-white border-none">
          Enable Notifications
        </button>
      </div>

      {/* Statistics Section */}
      <section>
        <h2 className="text-xl font-bold text-gray-800 mb-4">Statistics</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Stats Cards */}
          <div className="lg:col-span-2">
            <StatisticsCards stats={dummyStats} />
          </div>

          {/* Right Column - Today Orders */}
          <div className="lg:col-span-1">
            <TodayOrders orders={dummyTodayOrders} />
          </div>
        </div>
      </section>

      {/* Sales Chart Section */}
      <section>
        <SalesChart
          salesData={dummySalesData}
          salesThisMonth={dummyStats.salesThisMonth}
          salesThisMonthChange={dummyStats.salesThisMonthChange}
        />
      </section>

      {/* Additional Analytics Sections */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <PaymentMethodChart data={dummyPaymentMethods} />
        <TopSellingDish data={dummyTopDishes} />
        <TopSellingTables data={dummyTopTables} />
      </section>
    </div>
  );
}
