"use client";

import { useState } from "react";
import { FiEdit2, FiGrid, FiList, FiLayout } from "react-icons/fi";

interface Table {
  id: number;
  code: string;
  area: string;
  seats: number;
  kotCount: number;
  status: "available" | "running" | "reserved";
}

type ViewMode = "list" | "grid" | "layout";

export default function TablesPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [selectedArea, setSelectedArea] = useState("All Areas");
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    area: "",
    tableCode: "",
    seatingCapacity: "",
    status: "Active",
  });

  // Dummy data for tables
  const tables: Table[] = [
    {
      id: 1,
      code: "T01",
      area: "Gulshan-1",
      seats: 8,
      kotCount: 1,
      status: "available",
    },
    {
      id: 2,
      code: "T04",
      area: "Gulshan-1",
      seats: 2,
      kotCount: 1,
      status: "available",
    },
    {
      id: 3,
      code: "T03",
      area: "Gulshan-1",
      seats: 8,
      kotCount: 2,
      status: "available",
    },
    {
      id: 4,
      code: "T05",
      area: "Gulshan-1",
      seats: 4,
      kotCount: 1,
      status: "available",
    },
    {
      id: 5,
      code: "T02",
      area: "Gulshan-1",
      seats: 6,
      kotCount: 1,
      status: "available",
    },
    {
      id: 6,
      code: "T06",
      area: "Gulshan-1",
      seats: 4,
      kotCount: 0,
      status: "available",
    },
    {
      id: 7,
      code: "R-001",
      area: "Rooftop",
      seats: 4,
      kotCount: 0,
      status: "available",
    },
    {
      id: 8,
      code: "R02",
      area: "Rooftop",
      seats: 4,
      kotCount: 0,
      status: "available",
    },
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-blue-100 border-blue-300";
      case "running":
        return "bg-blue-200 border-blue-400";
      case "reserved":
        return "bg-red-100 border-red-300";
      default:
        return "bg-gray-100 border-gray-300";
    }
  };

  const handleSave = () => {
    setShowAddModal(false);
    setFormData({
      area: "",
      tableCode: "",
      seatingCapacity: "",
      status: "Active",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Table View</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn bg-teal-600 hover:bg-teal-700 text-white btn-sm border-none"
        >
          Add Table
        </button>
      </div>

      {/* View Controls */}
      <div className="flex items-center gap-3">
        {/* View Mode Buttons */}
        <div className="btn-group">
          <button
            className={`btn btn-sm ${
              viewMode === "list" ? "btn-active bg-teal-600 text-white" : ""
            }`}
            onClick={() => setViewMode("list")}
          >
            <FiList className="w-4 h-4 mr-1" />
            List
          </button>
          <button
            className={`btn btn-sm ${
              viewMode === "grid" ? "btn-active bg-teal-600 text-white" : ""
            }`}
            onClick={() => setViewMode("grid")}
          >
            <FiGrid className="w-4 h-4 mr-1" />
            Grid
          </button>
          <button
            className={`btn btn-sm ${
              viewMode === "layout" ? "btn-active bg-teal-600 text-white" : ""
            }`}
            onClick={() => setViewMode("layout")}
          >
            <FiLayout className="w-4 h-4 mr-1" />
            Layout
          </button>
        </div>

        {/* Filter by Availability */}
        <select className="select select-sm select-bordered bg-white">
          <option>Filter by Availability</option>
          <option>Available</option>
          <option>Running</option>
          <option>Reserved</option>
        </select>
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

      {/* Tables Display */}
      <div className="space-y-8">
        {Object.entries(tablesByArea).map(([area, areaTables]) => (
          <div key={area}>
            {/* Area Header */}
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-lg font-semibold text-gray-800">{area}</h2>
              <span className="badge badge-sm bg-gray-200">
                {areaTables.length} Table
              </span>
            </div>

            {/* List View */}
            {viewMode === "list" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {areaTables.map((table) => (
                  <div
                    key={table.id}
                    className={`border-2 rounded-lg p-4 ${getStatusColor(
                      table.status
                    )}`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">
                          {table.code}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {table.seats} Seat(s)
                        </p>
                        <p className="text-sm font-medium text-blue-600">
                          {table.kotCount} KOT
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="btn btn-sm btn-outline flex-1">
                        Show Order
                      </button>
                      <button className="btn btn-sm btn-outline flex-1">
                        New KOT
                      </button>
                      <button className="btn btn-sm btn-square btn-outline">
                        <FiEdit2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Grid View */}
            {viewMode === "grid" && (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {areaTables.map((table) => (
                  <div
                    key={table.id}
                    className={`border-2 rounded-lg p-4 text-center ${getStatusColor(
                      table.status
                    )}`}
                  >
                    <h3 className="text-xl font-bold text-gray-800 mb-1">
                      {table.code}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {table.seats} Seat(s)
                    </p>
                    {table.kotCount > 0 && (
                      <p className="text-sm font-medium text-blue-600">
                        {table.kotCount} KOT
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Layout View */}
            {viewMode === "layout" && (
              <div className="flex flex-wrap gap-6">
                {areaTables.map((table) => {
                  const isCircle = table.code === "T04";
                  const isSquare = !isCircle;

                  return (
                    <div
                      key={table.id}
                      className={`border-2 p-6 text-center ${getStatusColor(
                        table.status
                      )} ${
                        isCircle
                          ? "rounded-full w-32 h-32 flex flex-col items-center justify-center"
                          : "rounded-lg w-40"
                      }`}
                    >
                      <h3 className="text-xl font-bold text-gray-800 mb-1">
                        {table.code}
                      </h3>
                      <p className="text-xs text-gray-600">
                        {table.seats} Seat(s)
                      </p>
                      {table.kotCount > 0 && (
                        <p className="text-xs font-medium text-blue-600">
                          {table.kotCount} KOT
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
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

      {/* Add Table Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">Add Table</h2>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              {/* Choose Area */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">Choose Area</span>
                </label>
                <select
                  className="select select-bordered w-full bg-white"
                  value={formData.area}
                  onChange={(e) =>
                    setFormData({ ...formData, area: e.target.value })
                  }
                >
                  <option value="">--</option>
                  <option>Gulshan-1</option>
                  <option>Rooftop</option>
                </select>
              </div>

              {/* Table Code */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">Table Code</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. T01"
                  className="input input-bordered w-full bg-white"
                  value={formData.tableCode}
                  onChange={(e) =>
                    setFormData({ ...formData, tableCode: e.target.value })
                  }
                />
              </div>

              {/* Seating Capacity */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">
                    Seating Capacity
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Enter number of seats (e.g., 4)"
                  className="input input-bordered w-full bg-white"
                  value={formData.seatingCapacity}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      seatingCapacity: e.target.value,
                    })
                  }
                />
              </div>

              {/* Status */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">Status</span>
                </label>
                <div className="flex gap-3">
                  <button
                    className={`btn btn-sm flex-1 ${
                      formData.status === "Active"
                        ? "bg-teal-600 text-white"
                        : "btn-outline"
                    }`}
                    onClick={() => setFormData({ ...formData, status: "Active" })}
                  >
                    Active
                  </button>
                  <button
                    className={`btn btn-sm flex-1 ${
                      formData.status === "Inactive"
                        ? "bg-gray-600 text-white"
                        : "btn-outline"
                    }`}
                    onClick={() =>
                      setFormData({ ...formData, status: "Inactive" })
                    }
                  >
                    Inactive
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex gap-3 p-6 border-t border-gray-200">
              <button
                onClick={handleSave}
                className="btn bg-teal-600 hover:bg-teal-700 text-white flex-1"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setFormData({
                    area: "",
                    tableCode: "",
                    seatingCapacity: "",
                    status: "Active",
                  });
                }}
                className="btn btn-outline flex-1"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
