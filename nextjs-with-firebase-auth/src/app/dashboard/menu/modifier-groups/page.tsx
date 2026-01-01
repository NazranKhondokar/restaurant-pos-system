"use client";

import { useState } from "react";
import { FiSearch, FiEdit2, FiTrash2 } from "react-icons/fi";
import { useRouter } from "next/navigation";

interface ModifierGroup {
  id: number;
  name: string;
  options: Array<{
    name: string;
    price: number;
  }>;
}

export default function ModifierGroupsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  // Dummy data for modifier groups
  const modifierGroups: ModifierGroup[] = [
    {
      id: 1,
      name: "Grameen Classic Package",
      options: [{ name: "Deshi Style", price: 180.0 }],
    },
    {
      id: 2,
      name: "Jhal Jhol Package",
      options: [{ name: "Eat & Treat", price: 300.0 }],
    },
    {
      id: 3,
      name: "Kacchi Combo Feast",
      options: [{ name: "Eat & Treat", price: 700.0 }],
    },
    {
      id: 4,
      name: "Shonar Bangla Special",
      options: [{ name: "Eat & Treat", price: 550.0 }],
    },
    {
      id: 5,
      name: "Shonar Bangla Special",
      options: [{ name: "Eat & Treat", price: 1000.0 }],
    },
    {
      id: 6,
      name: "Platter 1",
      options: [{ name: "Platter 1", price: 220.0 }],
    },
  ];

  const filteredGroups = modifierGroups.filter((group) =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Modifier Groups</h1>
        <button
          onClick={() => router.push("/dashboard/menu/modifier-groups/add")}
          className="btn bg-teal-600 hover:bg-teal-700 text-white btn-sm border-none"
        >
          Add Modifier Group
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search your item category here"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input input-bordered w-full pl-10 bg-white"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-gray-600 font-semibold text-sm uppercase">
                  Group Name
                </th>
                <th className="text-gray-600 font-semibold text-sm uppercase">
                  Options
                </th>
                <th className="text-gray-600 font-semibold text-sm uppercase">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredGroups.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-center py-12 text-gray-500">
                    No modifier groups found
                  </td>
                </tr>
              ) : (
                filteredGroups.map((group) => (
                  <tr key={group.id} className="hover:bg-gray-50">
                    <td>
                      <span className="font-medium text-gray-800">
                        {group.name}
                      </span>
                    </td>
                    <td>
                      <div className="flex flex-wrap gap-2">
                        {group.options.map((option, index) => (
                          <span
                            key={index}
                            className="badge badge-success badge-md text-white"
                          >
                            {option.name}: ৳{option.price.toFixed(2)}
                          </span>
                        ))}
                      </div>
                    </td>
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
    </div>
  );
}
