"use client";

import { useState } from "react";
import { FiSearch, FiEdit2, FiTrash2 } from "react-icons/fi";

interface ItemModifier {
  id: number;
  itemName: string;
  modifierGroup: string;
  isRequired: boolean;
  allowMultipleSelection: boolean;
}

export default function ItemModifiersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    menuItemName: "",
    modifierGroup: "",
    allowMultipleSelection: false,
    isRequired: false,
  });

  // Dummy data for item modifiers
  const itemModifiers: ItemModifier[] = [
    {
      id: 1,
      itemName: "Chingri Pakora (Prawn fritters)",
      modifierGroup: "Shonar Bangla Special",
      isRequired: false,
      allowMultipleSelection: false,
    },
    {
      id: 2,
      itemName: "Chingri Pakora (Prawn fritters)",
      modifierGroup: "Jhal Jhol Package",
      isRequired: true,
      allowMultipleSelection: true,
    },
    {
      id: 3,
      itemName: "Borhani",
      modifierGroup: "Shonar Bangla Special",
      isRequired: false,
      allowMultipleSelection: false,
    },
    {
      id: 4,
      itemName: "Egg Fried rice",
      modifierGroup: "Platter 1",
      isRequired: false,
      allowMultipleSelection: false,
    },
    {
      id: 5,
      itemName: "BBQ Chicken",
      modifierGroup: "Platter 1",
      isRequired: false,
      allowMultipleSelection: false,
    },
    {
      id: 6,
      itemName: "Chicken Chilli Onion",
      modifierGroup: "Platter 1",
      isRequired: false,
      allowMultipleSelection: false,
    },
  ];

  const filteredModifiers = itemModifiers.filter(
    (modifier) =>
      modifier.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      modifier.modifierGroup.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddModifier = () => {
    setShowAddModal(false);
    setFormData({
      menuItemName: "",
      modifierGroup: "",
      allowMultipleSelection: false,
      isRequired: false,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Item Modifiers</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn bg-teal-600 hover:bg-teal-700 text-white btn-sm border-none"
        >
          Add Item Modifier
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
                  Item Name
                </th>
                <th className="text-gray-600 font-semibold text-sm uppercase">
                  Modifier Group
                </th>
                <th className="text-gray-600 font-semibold text-sm uppercase">
                  Is Required
                </th>
                <th className="text-gray-600 font-semibold text-sm uppercase">
                  Allow Multiple Selection
                </th>
                <th className="text-gray-600 font-semibold text-sm uppercase">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredModifiers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-12 text-gray-500">
                    No item modifiers found
                  </td>
                </tr>
              ) : (
                filteredModifiers.map((modifier) => (
                  <tr key={modifier.id} className="hover:bg-gray-50">
                    <td className="text-gray-800">{modifier.itemName}</td>
                    <td className="text-gray-700">{modifier.modifierGroup}</td>
                    <td>
                      {modifier.isRequired ? (
                        <span className="badge badge-error badge-sm text-white">
                          Required
                        </span>
                      ) : (
                        <span className="badge badge-ghost badge-sm">
                          Optional
                        </span>
                      )}
                    </td>
                    <td>
                      {modifier.allowMultipleSelection ? (
                        <span className="badge badge-success badge-sm text-white">
                          Yes
                        </span>
                      ) : (
                        <span className="badge badge-ghost badge-sm">No</span>
                      )}
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

      {/* Add Item Modifier Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">
                Add Item Modifier
              </h2>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              {/* Menu Item Name */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">
                    Menu Item Name
                  </span>
                </label>
                <select
                  className="select select-bordered w-full bg-white"
                  value={formData.menuItemName}
                  onChange={(e) =>
                    setFormData({ ...formData, menuItemName: e.target.value })
                  }
                >
                  <option value="">Select Menu Item</option>
                  <option>Chingri Pakora (Prawn fritters)</option>
                  <option>Borhani</option>
                  <option>Egg Fried rice</option>
                  <option>BBQ Chicken</option>
                  <option>Chicken Chilli Onion</option>
                </select>
              </div>

              {/* Modifier Group */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">
                    Modifier Group
                  </span>
                </label>
                <select
                  className="select select-bordered w-full bg-white"
                  value={formData.modifierGroup}
                  onChange={(e) =>
                    setFormData({ ...formData, modifierGroup: e.target.value })
                  }
                >
                  <option value="">Select Modifier Group</option>
                  <option>Shonar Bangla Special</option>
                  <option>Jhal Jhol Package</option>
                  <option>Platter 1</option>
                  <option>Grameen Classic Package</option>
                </select>
              </div>

              {/* Allow Multiple Selection */}
              <div className="form-control">
                <label className="label cursor-pointer justify-start gap-3">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-sm"
                    checked={formData.allowMultipleSelection}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        allowMultipleSelection: e.target.checked,
                      })
                    }
                  />
                  <div>
                    <span className="label-text font-medium">
                      Allow Multiple Selection
                    </span>
                    <p className="text-xs text-gray-500">
                      Allow users to select multiple options
                    </p>
                  </div>
                </label>
              </div>

              {/* Is Required */}
              <div className="form-control">
                <label className="label cursor-pointer justify-start gap-3">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-sm"
                    checked={formData.isRequired}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        isRequired: e.target.checked,
                      })
                    }
                  />
                  <span className="label-text font-medium">Is Required</span>
                </label>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex gap-3 p-6 border-t border-gray-200">
              <button
                onClick={handleAddModifier}
                className="btn bg-teal-600 hover:bg-teal-700 text-white flex-1"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setFormData({
                    menuItemName: "",
                    modifierGroup: "",
                    allowMultipleSelection: false,
                    isRequired: false,
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
