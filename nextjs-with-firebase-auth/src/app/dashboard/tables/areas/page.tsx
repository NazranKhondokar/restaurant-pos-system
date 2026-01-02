"use client";

import { useState } from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

interface Area {
  id: number;
  name: string;
  numberOfTables: number;
}

export default function AreasPage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [areaName, setAreaName] = useState("");

  // Dummy data for areas
  const areas: Area[] = [
    { id: 1, name: "Gulshan-1", numberOfTables: 6 },
    { id: 2, name: "Rooftop", numberOfTables: 2 },
  ];

  const handleSave = () => {
    setShowAddModal(false);
    setAreaName("");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">All Areas</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn bg-teal-600 hover:bg-teal-700 text-white btn-sm border-none"
        >
          Add Area
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-gray-600 font-semibold text-sm uppercase">
                  Area Name
                </th>
                <th className="text-gray-600 font-semibold text-sm uppercase">
                  No of Tables
                </th>
                <th className="text-gray-600 font-semibold text-sm uppercase">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {areas.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-center py-12 text-gray-500">
                    No areas found
                  </td>
                </tr>
              ) : (
                areas.map((area) => (
                  <tr key={area.id} className="hover:bg-gray-50">
                    <td className="text-gray-800 font-medium">{area.name}</td>
                    <td className="text-gray-700">{area.numberOfTables}</td>
                    <td>
                      <div className="flex gap-2">
                        <button className="btn btn-sm btn-outline">
                          <FiEdit2 className="w-4 h-4 mr-1" />
                          Update
                        </button>
                        <button className="btn btn-sm btn-outline border-red-500 text-red-500 hover:bg-red-50">
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Area Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">Add Area</h2>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <div>
                <label className="label">
                  <span className="label-text font-medium">Area Name</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Rooftop"
                  className="input input-bordered w-full bg-white"
                  value={areaName}
                  onChange={(e) => setAreaName(e.target.value)}
                />
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
                  setAreaName("");
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
