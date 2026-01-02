"use client";

import { useState } from "react";
import {
  FiShoppingCart,
  FiBarChart2,
  FiBell,
  FiMaximize,
  FiMoon,
  FiSun,
  FiMessageSquare,
  FiChevronDown,
  FiUser,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";
import { useRouter } from "next/navigation";
import { logout } from "@/lib/firebase/firebaseAuth";
import { useAppSelector } from "@/redux/reduxHooks";

export default function Header() {
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const user = useAppSelector((state) => state.user.user);

  const currentDate = new Date().toLocaleString("en-US", {
    weekday: "long",
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
      {/* Left Side - Breadcrumb/Title */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
      </div>

      {/* Right Side - Icons and User Menu */}
      <div className="flex items-center gap-4">
        {/* Date & Time */}
        <div className="text-sm text-gray-600 hidden lg:block">
          {currentDate}
        </div>

        {/* Shopping Cart */}
        <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <FiShoppingCart className="w-5 h-5 text-gray-600" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            0
          </span>
        </button>

        {/* Analytics */}
        <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <FiBarChart2 className="w-5 h-5 text-gray-600" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            0
          </span>
        </button>

        {/* Notifications */}
        <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <FiBell className="w-5 h-5 text-gray-600" />
          <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            3
          </span>
        </button>

        {/* Language Selector */}
        <select className="select select-sm border-gray-300 text-sm">
          <option>English</option>
          <option>Bangla</option>
          <option>Hindi</option>
        </select>

        {/* Fullscreen Toggle */}
        <button
          onClick={toggleFullscreen}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <FiMaximize className="w-5 h-5 text-gray-600" />
        </button>

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          {isDarkMode ? (
            <FiSun className="w-5 h-5 text-gray-600" />
          ) : (
            <FiMoon className="w-5 h-5 text-gray-600" />
          )}
        </button>

        {/* User Profile Menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
              {user?.firstName?.charAt(0) || "B"}
            </div>
            <FiChevronDown className="w-4 h-4 text-gray-600" />
          </button>

          {/* Dropdown Menu */}
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
              <div className="px-4 py-2 border-b border-gray-200">
                <p className="text-sm font-semibold text-gray-800">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
              <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2">
                <FiUser className="w-4 h-4" />
                Profile
              </button>
              <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2">
                <FiSettings className="w-4 h-4" />
                Settings
              </button>
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2 text-red-600"
              >
                <FiLogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Messages */}
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <FiMessageSquare className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </header>
  );
}
