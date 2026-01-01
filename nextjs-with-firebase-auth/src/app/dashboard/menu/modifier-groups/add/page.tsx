"use client";

import { useState } from "react";
import { FiTrash2, FiChevronRight } from "react-icons/fi";
import { useRouter } from "next/navigation";

interface ModifierOption {
  id: number;
  name: string;
  defaultPrice: number;
  isAvailable: boolean;
  dineInPrice: number;
  pickupPrice: number;
  baseDeliveryPrice: number;
  foodPandaEnabled: boolean;
  foodPandaCommission: string;
  foodPandaFinalPrice: number;
}

export default function AddModifierGroupPage() {
  const router = useRouter();
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [modifierName, setModifierName] = useState("");
  const [description, setDescription] = useState("");
  const [modifierOptions, setModifierOptions] = useState<ModifierOption[]>([
    {
      id: 1,
      name: "Option 1",
      defaultPrice: 0,
      isAvailable: true,
      dineInPrice: 0,
      pickupPrice: 0,
      baseDeliveryPrice: 0,
      foodPandaEnabled: false,
      foodPandaCommission: "10.00%",
      foodPandaFinalPrice: 0,
    },
  ]);

  const languages = [
    { code: "en", name: "English", flag: "🇬🇧" },
    { code: "de", name: "Deutsch", flag: "🇩🇪" },
    { code: "it", name: "Italiano", flag: "🇮🇹" },
    { code: "tr", name: "Türkçe", flag: "🇹🇷" },
    { code: "zh", name: "中国人", flag: "🇨🇳" },
  ];

  const addModifierOption = () => {
    const newOption: ModifierOption = {
      id: modifierOptions.length + 1,
      name: `Option ${modifierOptions.length + 1}`,
      defaultPrice: 0,
      isAvailable: true,
      dineInPrice: 0,
      pickupPrice: 0,
      baseDeliveryPrice: 0,
      foodPandaEnabled: false,
      foodPandaCommission: "10.00%",
      foodPandaFinalPrice: 0,
    };
    setModifierOptions([...modifierOptions, newOption]);
  };

  const removeModifierOption = (id: number) => {
    setModifierOptions(modifierOptions.filter((option) => option.id !== id));
  };

  const handleCancel = () => {
    router.push("/dashboard/menu/modifier-groups");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Add Modifier Group
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Fill in the details below to add a new modifier group.
        </p>
      </div>

      {/* Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Modifier Information */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="space-y-4">
            {/* Select Language */}
            <div>
              <label className="label">
                <span className="label-text font-medium">Select Language</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setSelectedLanguage(lang.name)}
                    className={`btn btn-sm ${
                      selectedLanguage === lang.name
                        ? "btn-success text-white"
                        : "btn-outline"
                    }`}
                  >
                    <span className="mr-1">{lang.flag}</span>
                    {lang.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Modifier Name */}
            <div>
              <label className="label">
                <span className="label-text font-medium">
                  Modifier Name (English)
                </span>
              </label>
              <input
                type="text"
                placeholder="e.g., Toppings"
                className="input input-bordered w-full bg-white"
                value={modifierName}
                onChange={(e) => setModifierName(e.target.value)}
              />
            </div>

            {/* Description */}
            <div>
              <label className="label">
                <span className="label-text font-medium">
                  Description (English)
                </span>
              </label>
              <textarea
                placeholder="e.g., Additional toppings for your pizza."
                className="textarea textarea-bordered w-full bg-white h-24"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* Locations */}
            <div>
              <label className="label">
                <span className="label-text font-medium">Locations</span>
                <span className="label-text-alt text-gray-500">
                  0 selected
                </span>
              </label>
              <select className="select select-bordered w-full bg-white">
                <option>Select Menu Item</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">
                Select menu items to which this modifier group should be applied
              </p>
            </div>
          </div>
        </div>

        {/* Right Column - Modifier Options */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-6 h-6 bg-orange-100 rounded flex items-center justify-center">
              <span className="text-orange-600 text-sm">🏷️</span>
            </div>
            <h2 className="text-lg font-semibold text-gray-800">
              Modifier Options
            </h2>
          </div>

          <div className="space-y-4">
            {/* Modifier Options List */}
            {modifierOptions.map((option, index) => (
              <div
                key={option.id}
                className="border border-blue-300 rounded-lg p-4"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <FiChevronRight className="w-4 h-4 text-gray-400" />
                    <span className="font-medium text-gray-800">
                      {option.name}
                    </span>
                  </div>
                  {modifierOptions.length > 1 && (
                    <button
                      onClick={() => removeModifierOption(option.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FiTrash2 className="w-5 h-5" />
                    </button>
                  )}
                </div>

                <div className="space-y-4">
                  {/* Option Name and Default Price */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="label">
                        <span className="label-text text-sm font-medium">
                          Option Name (English)
                        </span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., Extra Cheese"
                        className="input input-sm input-bordered w-full bg-white"
                        value={option.name}
                        onChange={(e) => {
                          const newOptions = modifierOptions.map((opt) =>
                            opt.id === option.id
                              ? { ...opt, name: e.target.value }
                              : opt
                          );
                          setModifierOptions(newOptions);
                        }}
                      />
                    </div>
                    <div>
                      <label className="label">
                        <span className="label-text text-sm font-medium">
                          Default Price
                        </span>
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          className="input input-sm input-bordered w-full bg-white"
                          value={option.defaultPrice}
                          onChange={(e) => {
                            const newOptions = modifierOptions.map((opt) =>
                              opt.id === option.id
                                ? {
                                    ...opt,
                                    defaultPrice:
                                      parseFloat(e.target.value) || 0,
                                  }
                                : opt
                            );
                            setModifierOptions(newOptions);
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Is Available */}
                  <div className="form-control">
                    <label className="label cursor-pointer justify-start gap-2">
                      <input
                        type="checkbox"
                        className="checkbox checkbox-sm checkbox-success"
                        checked={option.isAvailable}
                        onChange={(e) => {
                          const newOptions = modifierOptions.map((opt) =>
                            opt.id === option.id
                              ? { ...opt, isAvailable: e.target.checked }
                              : opt
                          );
                          setModifierOptions(newOptions);
                        }}
                      />
                      <span className="label-text font-medium">
                        Is Available
                      </span>
                    </label>
                  </div>

                  {/* Order Types Pricing */}
                  <div>
                    <label className="label">
                      <span className="label-text font-medium">
                        Order Types Pricing
                      </span>
                    </label>

                    <div className="space-y-2">
                      {/* Dine In */}
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Dine In</span>
                        <div className="relative w-32">
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                            ৳
                          </span>
                          <input
                            type="number"
                            className="input input-sm input-bordered w-full bg-white pl-8"
                            value={option.dineInPrice}
                            onChange={(e) => {
                              const newOptions = modifierOptions.map((opt) =>
                                opt.id === option.id
                                  ? {
                                      ...opt,
                                      dineInPrice:
                                        parseFloat(e.target.value) || 0,
                                    }
                                  : opt
                              );
                              setModifierOptions(newOptions);
                            }}
                          />
                        </div>
                      </div>

                      {/* Pickup */}
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Pickup</span>
                        <div className="relative w-32">
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                            ৳
                          </span>
                          <input
                            type="number"
                            className="input input-sm input-bordered w-full bg-white pl-8"
                            value={option.pickupPrice}
                            onChange={(e) => {
                              const newOptions = modifierOptions.map((opt) =>
                                opt.id === option.id
                                  ? {
                                      ...opt,
                                      pickupPrice:
                                        parseFloat(e.target.value) || 0,
                                    }
                                  : opt
                              );
                              setModifierOptions(newOptions);
                            }}
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
                      {/* Base Delivery Price */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">🚚</span>
                          <span className="text-sm font-medium">
                            Base Delivery Price
                          </span>
                        </div>
                        <div className="relative w-32">
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                            ৳
                          </span>
                          <input
                            type="number"
                            className="input input-sm input-bordered w-full bg-white pl-8"
                            value={option.baseDeliveryPrice}
                            onChange={(e) => {
                              const newOptions = modifierOptions.map((opt) =>
                                opt.id === option.id
                                  ? {
                                      ...opt,
                                      baseDeliveryPrice:
                                        parseFloat(e.target.value) || 0,
                                    }
                                  : opt
                              );
                              setModifierOptions(newOptions);
                            }}
                          />
                        </div>
                      </div>

                      {/* Food Panda */}
                      <div className="border border-gray-200 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">🐼</span>
                            <div>
                              <div className="text-sm font-medium">
                                Food Panda
                              </div>
                              <div className="text-xs text-gray-500">
                                Commission: {option.foodPandaCommission}
                              </div>
                            </div>
                          </div>
                          <input
                            type="checkbox"
                            className="toggle toggle-primary toggle-sm"
                            checked={option.foodPandaEnabled}
                            onChange={(e) => {
                              const newOptions = modifierOptions.map((opt) =>
                                opt.id === option.id
                                  ? {
                                      ...opt,
                                      foodPandaEnabled: e.target.checked,
                                    }
                                  : opt
                              );
                              setModifierOptions(newOptions);
                            }}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-600">
                            Final Price
                          </span>
                          <div className="flex items-center gap-1">
                            <span className="text-sm font-medium">৳</span>
                            <span className="text-sm font-medium">
                              {option.foodPandaFinalPrice.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Add Modifier Option Button */}
            <button
              onClick={addModifierOption}
              className="btn btn-outline btn-sm w-full"
            >
              Add Modifier Option
            </button>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 justify-start">
        <button className="btn bg-teal-600 hover:bg-teal-700 text-white px-8">
          Save
        </button>
        <button onClick={handleCancel} className="btn btn-outline px-8">
          Cancel
        </button>
      </div>
    </div>
  );
}
