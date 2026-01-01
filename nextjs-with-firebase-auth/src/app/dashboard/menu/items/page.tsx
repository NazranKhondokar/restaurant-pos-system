"use client";

import { useState } from "react";
import { FiSearch, FiEdit2, FiTrash2, FiFilter } from "react-icons/fi";
import { BiDish } from "react-icons/bi";
import { useRouter } from "next/navigation";

interface MenuItem {
  id: number;
  name: string;
  price: number | null;
  category: string;
  menuName: string;
  isAvailable: boolean;
  showOnCustomerSite: boolean;
  isVeg: boolean;
}

export default function MenuItemsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // Dummy data for menu items
  const menuItems: MenuItem[] = [
    {
      id: 1,
      name: "Chicken Chilli Onion",
      price: null,
      category: "PLATTER",
      menuName: "Kajajd",
      isAvailable: true,
      showOnCustomerSite: true,
      isVeg: false,
    },
    {
      id: 2,
      name: "BBQ Chicken",
      price: null,
      category: "PLATTER",
      menuName: "Kajajd",
      isAvailable: true,
      showOnCustomerSite: true,
      isVeg: false,
    },
    {
      id: 3,
      name: "Egg Fried rice",
      price: null,
      category: "PLATTER",
      menuName: "Kajajd",
      isAvailable: true,
      showOnCustomerSite: true,
      isVeg: false,
    },
    {
      id: 4,
      name: "Prawn Pasta",
      price: 180.0,
      category: "Starters / Appetizers",
      menuName: "Snacks",
      isAvailable: true,
      showOnCustomerSite: true,
      isVeg: false,
    },
    {
      id: 5,
      name: "Beef Pasta",
      price: 150.0,
      category: "Starters / Appetizers",
      menuName: "Snacks",
      isAvailable: true,
      showOnCustomerSite: true,
      isVeg: false,
    },
    {
      id: 6,
      name: "Veg Pasta",
      price: 80.0,
      category: "Starters / Appetizers",
      menuName: "Snacks",
      isAvailable: true,
      showOnCustomerSite: true,
      isVeg: true,
    },
  ];

  const filteredItems = menuItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalResults = filteredItems.length;
  const totalPages = Math.ceil(totalResults / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, endIndex);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Menu Items</h1>
      </div>

      {/* Action Bar */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search your menu item here"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input input-bordered w-full pl-10 bg-white"
          />
        </div>

        {/* Buttons */}
        <button className="btn btn-outline btn-sm">
          <FiFilter className="w-4 h-4 mr-1" />
          Show Filters
        </button>
        <button className="btn btn-outline btn-sm">Organize Menu Items</button>
        <button className="btn btn-outline btn-sm">
          <span className="mr-1">↓</span>
          Bulk Upload
        </button>
        <button
          onClick={() => router.push("/dashboard/menu/items/add")}
          className="btn bg-teal-600 hover:bg-teal-700 text-white btn-sm border-none"
        >
          Add Menu Item
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-gray-600 font-semibold text-sm uppercase">
                  Item Name
                </th>
                <th className="text-gray-600 font-semibold text-sm uppercase">
                  Price
                </th>
                <th className="text-gray-600 font-semibold text-sm uppercase">
                  Item Category
                </th>
                <th className="text-gray-600 font-semibold text-sm uppercase">
                  Menu Name
                </th>
                <th className="text-gray-600 font-semibold text-sm uppercase">
                  Is Available
                </th>
                <th className="text-gray-600 font-semibold text-sm uppercase">
                  Show on Customer Site
                </th>
                <th className="text-gray-600 font-semibold text-sm uppercase">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-gray-500">
                    No menu items found
                  </td>
                </tr>
              ) : (
                currentItems.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center relative">
                          <BiDish className="w-6 h-6 text-gray-400" />
                          {item.isVeg ? (
                            <span className="absolute -top-1 -left-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></span>
                          ) : (
                            <span className="absolute -top-1 -left-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white"></span>
                          )}
                        </div>
                        <span className="font-medium text-gray-800">
                          {item.name}
                        </span>
                      </div>
                    </td>
                    <td className="text-gray-700">
                      {item.price ? `৳${item.price.toFixed(2)}` : "--"}
                    </td>
                    <td>
                      {item.category === "PLATTER" ? (
                        <span className="text-gray-700">{item.category}</span>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 flex items-center justify-center text-sm">
                            🥗
                          </span>
                          <span className="text-gray-700">{item.category}</span>
                        </div>
                      )}
                    </td>
                    <td className="text-gray-700">{item.menuName}</td>
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

        {/* Pagination */}
        <div className="border-t border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Showing {startIndex + 1} To {Math.min(endIndex, totalResults)} of{" "}
            {totalResults} results
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="btn btn-sm btn-outline"
            >
              &lt;
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`btn btn-sm ${
                  currentPage === page
                    ? "bg-gray-700 text-white hover:bg-gray-800"
                    : "btn-outline"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
              disabled={currentPage === totalPages}
              className="btn btn-sm btn-outline"
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
