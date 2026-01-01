"use client";

import { useState } from "react";
import { FiSearch, FiEdit2, FiTrash2 } from "react-icons/fi";
import { BiDish } from "react-icons/bi";

interface Menu {
  id: number;
  name: string;
  itemCount: number;
}

export default function MenusPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMenu, setSelectedMenu] = useState<Menu | null>(null);
  const [showAddMenuModal, setShowAddMenuModal] = useState(false);
  const [newMenuName, setNewMenuName] = useState("");

  // Dummy data for menus
  const menus: Menu[] = [
    { id: 1, name: "Breakfast", itemCount: 4 },
    { id: 2, name: "Lunch", itemCount: 7 },
    { id: 3, name: "Dinner", itemCount: 5 },
    { id: 4, name: "Snacks", itemCount: 8 },
    { id: 5, name: "Drinks & Refreshers", itemCount: 5 },
    { id: 6, name: "Kajajd", itemCount: 3 },
  ];

  // Dummy data for menu items based on selected menu
  const getMenuItems = (menuName: string) => {
    if (menuName === "Breakfast") {
      return [
        {
          id: 1,
          name: "test use item",
          price: 200.0,
          category: "Bread",
          isAvailable: true,
          showOnCustomerSite: true,
          image: null,
        },
        {
          id: 2,
          name: "Raspberry",
          price: 200.0,
          category: "Desserts",
          isAvailable: true,
          showOnCustomerSite: true,
          image: null,
        },
        {
          id: 3,
          name: "Matcha Latte",
          price: 100.0,
          category: "Desserts",
          isAvailable: true,
          showOnCustomerSite: true,
          image: null,
        },
      ];
    }
    return [];
  };

  const filteredMenus = menus.filter((menu) =>
    menu.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedMenuItems = selectedMenu ? getMenuItems(selectedMenu.name) : [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Menus</h1>
        <div className="flex gap-3">
          <button className="btn btn-outline btn-sm">Organize Menu Items</button>
          <button
            onClick={() => setShowAddMenuModal(true)}
            className="btn bg-teal-600 hover:bg-teal-700 text-white btn-sm border-none"
          >
            Add Menu
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search your menu here"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input input-bordered w-full pl-10 bg-white"
        />
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredMenus.map((menu) => (
          <div
            key={menu.id}
            onClick={() => setSelectedMenu(menu)}
            className={`card bg-white border cursor-pointer transition-all ${
              selectedMenu?.id === menu.id
                ? "border-teal-600 bg-teal-50"
                : "border-gray-200 hover:border-teal-300"
            }`}
          >
            <div className="card-body p-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <BiDish className="w-6 h-6 text-gray-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{menu.name}</h3>
                  <p className="text-sm text-gray-500">{menu.itemCount} Item(s)</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Menu Details */}
      {selectedMenu && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          {/* Menu Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">{selectedMenu.name}</h2>
            <div className="flex gap-2">
              <button className="btn btn-sm btn-outline">
                <FiEdit2 className="w-4 h-4 mr-1" />
                Update
              </button>
              <button className="btn btn-sm btn-outline border-red-500 text-red-500 hover:bg-red-50">
                <FiTrash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Menu Items Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">Menu Items</h3>
              <div className="flex gap-2">
                <div className="relative">
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search your menu item here"
                    className="input input-sm input-bordered pl-10 bg-white"
                  />
                </div>
                <button className="btn btn-sm btn-outline">
                  <FiSearch className="w-4 h-4 mr-1" />
                  Show Filters
                </button>
                <button className="btn btn-sm btn-outline">Organize Menu Items</button>
                <button className="btn btn-sm btn-outline">
                  <span className="mr-1">↓</span>
                  Bulk Upload
                </button>
                <button className="btn btn-sm bg-teal-600 hover:bg-teal-700 text-white border-none">
                  Add Menu Item
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="table table-zebra w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-gray-600 font-semibold">ITEM NAME</th>
                    <th className="text-gray-600 font-semibold">PRICE</th>
                    <th className="text-gray-600 font-semibold">ITEM CATEGORY</th>
                    <th className="text-gray-600 font-semibold">MENU NAME</th>
                    <th className="text-gray-600 font-semibold">IS AVAILABLE</th>
                    <th className="text-gray-600 font-semibold">SHOW ON CUSTOMER SITE</th>
                    <th className="text-gray-600 font-semibold">ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedMenuItems.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center py-8 text-gray-500">
                        No menu items found
                      </td>
                    </tr>
                  ) : (
                    selectedMenuItems.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                              <BiDish className="w-5 h-5 text-gray-400" />
                            </div>
                            <span className="font-medium">{item.name}</span>
                          </div>
                        </td>
                        <td>৳{item.price.toFixed(2)}</td>
                        <td>
                          <span className="badge badge-sm">{item.category}</span>
                        </td>
                        <td>{selectedMenu.name}</td>
                        <td>
                          <input
                            type="checkbox"
                            checked={item.isAvailable}
                            className="checkbox checkbox-sm checkbox-success"
                            readOnly
                          />
                        </td>
                        <td>
                          <input
                            type="checkbox"
                            checked={item.showOnCustomerSite}
                            className="checkbox checkbox-sm checkbox-success"
                            readOnly
                          />
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
      )}

      {/* No Menu Selected State */}
      {!selectedMenu && (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <BiDish className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">Select a menu to view its items</p>
        </div>
      )}

      {/* Add Menu Modal */}
      {showAddMenuModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">ADD MENU</h2>
              <button
                onClick={() => {
                  setShowAddMenuModal(false);
                  setNewMenuName("");
                }}
                className="btn btn-sm btn-circle btn-ghost"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              <p className="text-sm text-gray-600">
                Enter the menu name below to create a new menu.
              </p>

              {/* Select Language */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">Select Language</span>
                </label>
                <select className="select select-bordered w-full bg-white">
                  <option>English</option>
                </select>
              </div>

              {/* Menu Name */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">
                    Menu Name (English)
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Breakfast"
                  className="input input-bordered w-full bg-white"
                  value={newMenuName}
                  onChange={(e) => setNewMenuName(e.target.value)}
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex gap-3 p-6 border-t border-gray-200">
              <button className="btn bg-teal-600 hover:bg-teal-700 text-white flex-1">
                Save
              </button>
              <button
                onClick={() => {
                  setShowAddMenuModal(false);
                  setNewMenuName("");
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
