"use client";

import { useState } from "react";
import { FiSettings } from "react-icons/fi";
import { useRouter } from "next/navigation";

export default function AddMenuItemPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    language: "English",
    itemName: "",
    itemDescription: "",
    menu: "",
    category: "",
    itemType: "Veg",
    preparationTime: "",
    isAvailable: "Yes",
    kitchenType: "",
    hasVariations: false,
    basePrice: "0.00",
    dineInPrice: "0.00",
    pickupPrice: "0.00",
    deliveryPrice: "0.00",
    foodPandaEnabled: true,
    foodPandaCommission: "10.00%",
    foodPandaFinalPrice: "0.00",
  });

  const handleCancel = () => {
    router.push("/dashboard/menu/items");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Add Menu Item</h1>
        <p className="text-sm text-gray-600 mt-1">
          Fill in the details below to add a new menu item.
        </p>
      </div>

      {/* Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Product Information */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center">
              <span className="text-blue-600 text-sm">ℹ️</span>
            </div>
            <h2 className="text-lg font-semibold text-gray-800">
              Product Information
            </h2>
          </div>

          <div className="space-y-4">
            {/* Select Language */}
            <div>
              <label className="label">
                <span className="label-text font-medium">Select Language</span>
              </label>
              <select className="select select-bordered w-full bg-white">
                <option>🇬🇧 English</option>
              </select>
            </div>

            {/* Item Name */}
            <div>
              <label className="label">
                <span className="label-text font-medium">
                  Item Name (English)
                </span>
              </label>
              <input
                type="text"
                placeholder="e.g., Margherita Pizza"
                className="input input-bordered w-full bg-white"
                value={formData.itemName}
                onChange={(e) =>
                  setFormData({ ...formData, itemName: e.target.value })
                }
              />
            </div>

            {/* Item Description */}
            <div>
              <label className="label">
                <span className="label-text font-medium">
                  Item Description (English)
                </span>
              </label>
              <textarea
                placeholder="e.g., A classic Italian pizza with fresh tomatoes and basil."
                className="textarea textarea-bordered w-full bg-white h-24"
                value={formData.itemDescription}
                onChange={(e) =>
                  setFormData({ ...formData, itemDescription: e.target.value })
                }
              />
            </div>

            {/* Choose Menu and Item Category */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="label">
                  <span className="label-text font-medium">Choose Menu</span>
                </label>
                <select className="select select-bordered w-full bg-white">
                  <option>--</option>
                  <option>Breakfast</option>
                  <option>Lunch</option>
                  <option>Dinner</option>
                </select>
              </div>
              <div>
                <label className="label">
                  <span className="label-text font-medium">Item Category</span>
                </label>
                <div className="flex gap-2">
                  <select className="select select-bordered w-full bg-white">
                    <option>--</option>
                    <option>Bread</option>
                    <option>Desserts</option>
                    <option>PLATTER</option>
                  </select>
                  <button className="btn btn-square btn-outline">
                    <FiSettings className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Item Type */}
            <div>
              <label className="label">
                <span className="label-text font-medium">Item Type</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  className={`btn ${
                    formData.itemType === "Veg"
                      ? "btn-success"
                      : "btn-outline"
                  }`}
                  onClick={() => setFormData({ ...formData, itemType: "Veg" })}
                >
                  <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                  Veg
                </button>
                <button
                  className={`btn ${
                    formData.itemType === "Non Veg"
                      ? "btn-error"
                      : "btn-outline"
                  }`}
                  onClick={() =>
                    setFormData({ ...formData, itemType: "Non Veg" })
                  }
                >
                  <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                  Non Veg
                </button>
                <button
                  className={`btn ${
                    formData.itemType === "Egg"
                      ? "btn-warning"
                      : "btn-outline"
                  }`}
                  onClick={() => setFormData({ ...formData, itemType: "Egg" })}
                >
                  🥚 Egg
                </button>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-2">
                <button
                  className={`btn ${
                    formData.itemType === "Drink"
                      ? "btn-info"
                      : "btn-outline"
                  }`}
                  onClick={() =>
                    setFormData({ ...formData, itemType: "Drink" })
                  }
                >
                  🧃 Drink
                </button>
                <button
                  className={`btn ${
                    formData.itemType === "Halal"
                      ? "btn-success"
                      : "btn-outline"
                  }`}
                  onClick={() =>
                    setFormData({ ...formData, itemType: "Halal" })
                  }
                >
                  🍗 Halal
                </button>
                <button
                  className={`btn ${
                    formData.itemType === "Other"
                      ? "btn-neutral"
                      : "btn-outline"
                  }`}
                  onClick={() =>
                    setFormData({ ...formData, itemType: "Other" })
                  }
                >
                  Other
                </button>
              </div>
            </div>

            {/* Preparation Time and Is Available */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="label">
                  <span className="label-text font-medium">
                    Preparation Time
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Minutes"
                  className="input input-bordered w-full bg-white"
                  value={formData.preparationTime}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      preparationTime: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text font-medium">Is Available</span>
                </label>
                <select className="select select-bordered w-full bg-white">
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>
            </div>

            {/* Kitchen Type */}
            <div>
              <label className="label">
                <span className="label-text font-medium">Kitchen Type</span>
              </label>
              <select className="select select-bordered w-full bg-white">
                <option>Select Kitchen Type</option>
                <option>Default Kitchen</option>
                <option>Rooftop</option>
                <option>Drinks Gallery</option>
              </select>
            </div>

            {/* Item Image */}
            <div>
              <label className="label">
                <span className="label-text font-medium">Item Image</span>
              </label>
              <div className="flex items-center gap-3">
                <button className="btn bg-gray-800 text-white hover:bg-gray-900">
                  Choose file
                </button>
                <span className="text-sm text-gray-500">No file chosen</span>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Supported formats: JPEG, PNG, JPG, GIF, SVG. Maximum size: 2MB.
                <br />
                Recommended size: 200 x 200 pixels.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column - Pricing Details */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-6 h-6 bg-orange-100 rounded flex items-center justify-center">
              <span className="text-orange-600 text-sm">💰</span>
            </div>
            <h2 className="text-lg font-semibold text-gray-800">
              Pricing Details
            </h2>
          </div>

          <div className="space-y-4">
            {/* Has Variations */}
            <div className="form-control">
              <label className="label cursor-pointer justify-start gap-3">
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={formData.hasVariations}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      hasVariations: e.target.checked,
                    })
                  }
                />
                <div>
                  <span className="label-text font-medium">
                    Has Variations
                  </span>
                  <p className="text-xs text-gray-500">
                    Enable this if the item has multiple variations with
                    different prices (e.g., size, flavor).
                  </p>
                </div>
              </label>
            </div>

            {/* Base Price */}
            <div>
              <label className="label">
                <span className="label-text font-medium">Base Price</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  ৳
                </span>
                <input
                  type="text"
                  className="input input-bordered w-full bg-white pl-8"
                  value={formData.basePrice}
                  onChange={(e) =>
                    setFormData({ ...formData, basePrice: e.target.value })
                  }
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                This will be used as the default price if order type specific
                prices are not set.
              </p>
            </div>

            {/* Order Types Pricing */}
            <div>
              <label className="label">
                <span className="label-text font-medium">
                  Order Types Pricing
                </span>
              </label>

              <div className="space-y-3">
                {/* Dine In */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 flex-1">
                    <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                    <span className="text-sm font-medium">Dine In</span>
                  </div>
                  <div className="relative w-32">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                      ৳
                    </span>
                    <input
                      type="text"
                      className="input input-sm input-bordered w-full bg-white pl-8"
                      value={formData.dineInPrice}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          dineInPrice: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                {/* Pickup */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 flex-1">
                    <span className="w-3 h-3 bg-orange-500 rounded-full"></span>
                    <span className="text-sm font-medium">Pickup</span>
                  </div>
                  <div className="relative w-32">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                      ৳
                    </span>
                    <input
                      type="text"
                      className="input input-sm input-bordered w-full bg-white pl-8"
                      value={formData.pickupPrice}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          pickupPrice: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Platforms */}
            <div>
              <label className="label">
                <span className="label-text font-medium">
                  Delivery Platforms
                </span>
              </label>

              <div className="space-y-3">
                {/* Delivery */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 flex-1">
                    <span className="text-xl">🚚</span>
                    <div>
                      <div className="text-sm font-medium">Delivery</div>
                      <div className="text-xs text-gray-500">
                        Default delivery price
                      </div>
                    </div>
                  </div>
                  <div className="relative w-32">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                      ৳
                    </span>
                    <input
                      type="text"
                      className="input input-sm input-bordered w-full bg-white pl-8"
                      value={formData.deliveryPrice}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          deliveryPrice: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                {/* Food Panda */}
                <div className="border border-gray-200 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">🐼</span>
                      <div>
                        <div className="text-sm font-medium">Food Panda</div>
                        <div className="text-xs text-gray-500">
                          Commission: {formData.foodPandaCommission}
                        </div>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      className="toggle toggle-primary"
                      checked={formData.foodPandaEnabled}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          foodPandaEnabled: e.target.checked,
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">Final Price</span>
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium">৳</span>
                      <span className="text-sm font-medium">
                        {formData.foodPandaFinalPrice}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 justify-start">
        <button className="btn bg-teal-600 hover:bg-teal-700 text-white px-8">
          Save
        </button>
        <button
          onClick={handleCancel}
          className="btn btn-outline px-8"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
