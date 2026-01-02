"use client";

import { useState } from "react";
import { FiClock, FiUser } from "react-icons/fi";
import { BiBell } from "react-icons/bi";

interface WaiterRequest {
  id: number;
  tableCode: string;
  area: string;
  customerName: string;
  timeAgo: string;
  attended: boolean;
}

export default function WaiterRequestsPage() {
  const [selectedArea, setSelectedArea] = useState("Gulshan-1");
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState("10 Seconds");

  // Dummy data for waiter requests
  const waiterRequests: WaiterRequest[] = [
    {
      id: 1,
      tableCode: "T01",
      area: "Gulshan-1",
      customerName: "Mr. Joynal",
      timeAgo: "2 months ago",
      attended: false,
    },
    {
      id: 2,
      tableCode: "T04",
      area: "Gulshan-1",
      customerName: "--",
      timeAgo: "1 week ago",
      attended: false,
    },
    {
      id: 3,
      tableCode: "T05",
      area: "Gulshan-1",
      customerName: "--",
      timeAgo: "2 months ago",
      attended: false,
    },
  ];

  const areas = ["Gulshan-1", "Rooftop"];

  const requestsByArea = waiterRequests.reduce((acc, request) => {
    if (!acc[request.area]) {
      acc[request.area] = [];
    }
    acc[request.area].push(request);
    return acc;
  }, {} as Record<string, WaiterRequest[]>);

  const totalRequests = waiterRequests.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">
          Waiter Requests ({totalRequests})
        </h1>
        <div className="flex items-center gap-4">
          {/* Auto Refresh Toggle */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700">Auto Refresh</span>
            <input
              type="checkbox"
              className="toggle toggle-primary toggle-sm"
              checked={autoRefresh}
              onChange={(e) => setAutoRefresh(e.target.checked)}
            />
          </div>

          {/* Refresh Interval Dropdown */}
          <select
            className="select select-sm select-bordered bg-white"
            value={refreshInterval}
            onChange={(e) => setRefreshInterval(e.target.value)}
          >
            <option>10 Seconds</option>
            <option>30 Seconds</option>
            <option>1 Minute</option>
            <option>5 Minutes</option>
          </select>
        </div>
      </div>

      {/* Requests by Area */}
      <div className="space-y-8">
        {areas.map((area) => {
          const areaRequests = requestsByArea[area] || [];
          return (
            <div key={area}>
              {/* Area Header */}
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-lg font-semibold text-gray-800">{area}</h2>
                <span className="badge badge-sm bg-gray-200">
                  {areaRequests.length} Table
                </span>
              </div>

              {/* Requests Grid */}
              {areaRequests.length === 0 ? (
                <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                  <div className="flex justify-center mb-4">
                    <BiBell className="w-16 h-16 text-gray-300" />
                  </div>
                  <p className="text-gray-500">
                    No waiter request found in this area.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {areaRequests.map((request) => (
                    <div
                      key={request.id}
                      className="bg-white rounded-lg border border-gray-200 p-5"
                    >
                      {/* Table Code */}
                      <div className="mb-4">
                        <div className="inline-block bg-blue-100 text-blue-700 font-bold text-xl px-4 py-2 rounded">
                          {request.tableCode}
                        </div>
                      </div>

                      {/* Request Info */}
                      <div className="space-y-2 mb-4">
                        {/* Time */}
                        <div className="flex items-center gap-2 text-gray-600">
                          <FiClock className="w-4 h-4" />
                          <span className="text-sm">{request.timeAgo}</span>
                        </div>

                        {/* Customer Name */}
                        <div className="flex items-center gap-2 text-gray-600">
                          <FiUser className="w-4 h-4" />
                          <span className="text-sm">{request.customerName}</span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <button className="btn btn-sm btn-outline flex-1">
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          Mark Attended
                        </button>
                        <button className="btn btn-sm btn-outline flex-1">
                          Show Order
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
