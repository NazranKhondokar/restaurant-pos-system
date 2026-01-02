import { apiSlice } from "./apiSlice";
import { IDashboardData, ITodayOrder } from "@/types/Dashboard";

export const dashboardAPISlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardStats: builder.query<IDashboardData, { branchId?: number }>({
      query: ({ branchId }) => ({
        url: branchId
          ? `/dashboard/stats?branchId=${branchId}`
          : `/dashboard/stats`,
        method: "GET",
      }),
      providesTags: ["Dashboard"],
    }),

    getOrdersToday: builder.query<ITodayOrder[], { branchId?: number }>({
      query: ({ branchId }) => ({
        url: branchId
          ? `/dashboard/orders/today?branchId=${branchId}`
          : `/dashboard/orders/today`,
        method: "GET",
      }),
      providesTags: ["Order"],
    }),
  }),
});

export const { useGetDashboardStatsQuery, useGetOrdersTodayQuery } =
  dashboardAPISlice;
