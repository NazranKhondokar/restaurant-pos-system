"use client";

import { useState } from "react";
import StatisticsCards from "@/components/Dashboard/StatisticsCards";
import SalesChart from "@/components/Dashboard/SalesChart";
import TodayOrders from "@/components/Dashboard/TodayOrders";
import { useGetDashboardStatsQuery } from "@/redux/slices/api/dashboardAPISlice";
import Spinner from "@/components/Spinner/Spinner";

export default function DashboardPage() {
  const [selectedBranch, setSelectedBranch] = useState<number | undefined>(
    undefined
  );

  // Fetch dashboard data
  const { data, isLoading, isError } = useGetDashboardStatsQuery({
    branchId: selectedBranch,
  });

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

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center h-64">
          <Spinner />
        </div>
      )}

      {/* Error State */}
      {isError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-sm text-red-800">
            Failed to load dashboard data. Please try again.
          </p>
        </div>
      )}

      {/* Dashboard Content */}
      {!isLoading && !isError && (
        <>
          {/* Statistics Section */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Statistics
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Stats Cards */}
              <div className="lg:col-span-2">
                <StatisticsCards stats={data?.stats} />
              </div>

              {/* Right Column - Today Orders */}
              <div className="lg:col-span-1">
                <TodayOrders orders={data?.todayOrders} />
              </div>
            </div>
          </section>

          {/* Sales Chart Section */}
          <section>
            <SalesChart
              salesData={data?.salesData}
              salesThisMonth={data?.stats?.salesThisMonth || 0}
              salesThisMonthChange={data?.stats?.salesThisMonthChange || -100}
            />
          </section>
        </>
      )}
    </div>
  );
}
