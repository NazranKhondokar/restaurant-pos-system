"use client";

import { useState } from "react";
import { FiDownload, FiRefreshCw } from "react-icons/fi";
import { BiQr } from "react-icons/bi";

interface Table {
  id: number;
  code: string;
  area: string;
  seats: number;
}

export default function QRCodesPage() {
  const [selectedArea, setSelectedArea] = useState("All Areas");

  // Dummy data for tables
  const tables: Table[] = [
    { id: 1, code: "T01", area: "Gulshan-1", seats: 8 },
    { id: 2, code: "T04", area: "Gulshan-1", seats: 2 },
    { id: 3, code: "T03", area: "Gulshan-1", seats: 8 },
    { id: 4, code: "T05", area: "Gulshan-1", seats: 4 },
    { id: 5, code: "T02", area: "Gulshan-1", seats: 6 },
    { id: 6, code: "T06", area: "Gulshan-1", seats: 4 },
    { id: 7, code: "R-001", area: "Rooftop", seats: 4 },
    { id: 8, code: "R02", area: "Rooftop", seats: 4 },
  ];

  const areas = ["All Areas", "Gulshan-1", "Rooftop"];

  const filteredTables =
    selectedArea === "All Areas"
      ? tables
      : tables.filter((table) => table.area === selectedArea);

  const tablesByArea = filteredTables.reduce((acc, table) => {
    if (!acc[table.area]) {
      acc[table.area] = [];
    }
    acc[table.area].push(table);
    return acc;
  }, {} as Record<string, Table[]>);

  // Generate a placeholder QR code SVG
  const generateQRPlaceholder = () => {
    return (
      <svg
        width="200"
        height="200"
        viewBox="0 0 200 200"
        className="w-full h-full"
      >
        <rect width="200" height="200" fill="white" />
        {/* Generate random-looking QR pattern */}
        {Array.from({ length: 20 }).map((_, row) =>
          Array.from({ length: 20 }).map((_, col) => {
            const shouldFill = Math.random() > 0.5;
            return shouldFill ? (
              <rect
                key={`${row}-${col}`}
                x={col * 10}
                y={row * 10}
                width="10"
                height="10"
                fill="black"
              />
            ) : null;
          })
        )}
        {/* Position markers */}
        <rect x="0" y="0" width="30" height="30" fill="black" />
        <rect x="10" y="10" width="10" height="10" fill="white" />
        <rect x="170" y="0" width="30" height="30" fill="black" />
        <rect x="180" y="10" width="10" height="10" fill="white" />
        <rect x="0" y="170" width="30" height="30" fill="black" />
        <rect x="10" y="180" width="10" height="10" fill="white" />
      </svg>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">QR Codes</h1>
      </div>

      {/* Area Filter Tabs */}
      <div className="flex gap-2">
        {areas.map((area) => (
          <button
            key={area}
            onClick={() => setSelectedArea(area)}
            className={`btn btn-sm ${
              selectedArea === area
                ? "bg-teal-100 text-teal-700 border-teal-300"
                : "btn-ghost"
            }`}
          >
            {area}
          </button>
        ))}
      </div>

      {/* QR Codes Display */}
      <div className="space-y-8">
        {/* Show All Areas QR at the top when "All Areas" is selected */}
        {selectedArea === "All Areas" && (
          <div>
            <div className="bg-white rounded-lg border border-gray-200 p-6 max-w-xs">
              <div className="aspect-square bg-white mb-4 flex items-center justify-center">
                {generateQRPlaceholder()}
              </div>
              <div className="flex gap-2">
                <button className="btn btn-sm btn-outline flex-1">
                  <FiDownload className="w-4 h-4" />
                </button>
                <button className="btn btn-sm btn-outline flex-1">
                  <BiQr className="w-4 h-4" />
                </button>
                <button className="btn btn-sm btn-outline flex-1">
                  <FiRefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tables by Area */}
        {Object.entries(tablesByArea).map(([area, areaTables]) => (
          <div key={area}>
            {/* Area Header */}
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-lg font-semibold text-gray-800">{area}</h2>
              <span className="badge badge-sm bg-gray-200">
                {areaTables.length} Table
              </span>
            </div>

            {/* QR Codes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {areaTables.map((table) => (
                <div
                  key={table.id}
                  className="bg-white rounded-lg border border-gray-200 p-4"
                >
                  {/* Table Info */}
                  <div className="mb-3">
                    <h3 className="text-xl font-bold text-blue-600">
                      {table.code}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {table.seats} Seat(s)
                    </p>
                  </div>

                  {/* QR Code */}
                  <div className="aspect-square bg-white mb-4 border border-gray-200 rounded p-2">
                    {generateQRPlaceholder()}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button className="btn btn-sm btn-outline flex-1">
                      <FiDownload className="w-4 h-4" />
                    </button>
                    <button className="btn btn-sm btn-outline flex-1">
                      <BiQr className="w-4 h-4" />
                    </button>
                    <button className="btn btn-sm btn-outline flex-1">
                      <FiRefreshCw className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-end gap-4 pt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-sm text-gray-600">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span className="text-sm text-gray-600">Running</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <span className="text-sm text-gray-600">Reserved</span>
        </div>
      </div>
    </div>
  );
}
