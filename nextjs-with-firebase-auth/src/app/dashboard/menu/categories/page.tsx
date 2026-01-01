"use client";

import { useState } from "react";
import { FiSearch, FiEdit2, FiTrash2 } from "react-icons/fi";

interface ItemCategory {
  id: number;
  name: string;
  emoji?: string;
  menuItemCount: number;
}

export default function ItemCategoriesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  // Dummy data for item categories
  const categories: ItemCategory[] = [
    { id: 1, name: "Continental", menuItemCount: 0 },
    { id: 2, name: "Bread", menuItemCount: 1 },
    { id: 3, name: "Starters / Appetizers", emoji: "🥗", menuItemCount: 10 },
    { id: 4, name: "Deshi Curries", emoji: "🍛", menuItemCount: 3 },
    { id: 5, name: "Grilled & Fried Specials", emoji: "🍖", menuItemCount: 2 },
    { id: 6, name: "Rice & Biryani", emoji: "🍚", menuItemCount: 3 },
    { id: 7, name: "Sides & Bhartas", emoji: "🥬", menuItemCount: 2 },
    { id: 8, name: "Drinks & Refreshers", emoji: "🥤", menuItemCount: 3 },
    { id: 9, name: "Desserts", emoji: "🍰", menuItemCount: 5 },
    { id: 10, name: "PLATTER", menuItemCount: 3 },
  ];

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Item Categories</h1>
        <div className="flex gap-3">
          <button className="btn btn-outline btn-sm">
            Organize Menu Items
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="btn bg-teal-600 hover:bg-teal-700 text-white btn-sm border-none"
          >
            Add Item Category
          </button>
        </div>
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
                  Item Category
                </th>
                <th className="text-gray-600 font-semibold text-sm uppercase">
                  Menu Items
                </th>
                <th className="text-gray-600 font-semibold text-sm uppercase">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredCategories.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-center py-12 text-gray-500">
                    No item categories found
                  </td>
                </tr>
              ) : (
                filteredCategories.map((category) => (
                  <tr key={category.id} className="hover:bg-gray-50">
                    <td>
                      <div className="flex items-center gap-2">
                        {category.emoji && (
                          <span className="text-xl">{category.emoji}</span>
                        )}
                        <span className="font-medium text-gray-800">
                          {category.name}
                        </span>
                      </div>
                    </td>
                    <td className="text-gray-700">
                      {category.menuItemCount} Item(s)
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

      {/* Add Item Category Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">
                Add Item Category
              </h2>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              {/* Select Language */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">Select Language</span>
                </label>
                <select className="select select-bordered w-full bg-white">
                  <option>English</option>
                </select>
              </div>

              {/* Item Category Name */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">
                    Item Category Name (English)
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="e.g., Desserts"
                  className="input input-bordered w-full bg-white"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex flex-col gap-3 p-6 border-t border-gray-200">
              <button className="btn bg-teal-600 hover:bg-teal-700 text-white w-full">
                Save
              </button>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setNewCategoryName("");
                }}
                className="btn btn-outline w-full"
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
