"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiHome,
  FiMenu,
  FiGrid,
  FiBell,
  FiCalendar,
  FiMonitor,
  FiShoppingBag,
  FiUsers,
  FiUser,
  FiTruck,
  FiDollarSign,
  FiCreditCard,
  FiBarChart2,
  FiSettings,
  FiPackage,
  FiChevronDown,
  FiChevronRight,
  FiExternalLink,
} from "react-icons/fi";
import { BiDish } from "react-icons/bi";

interface MenuItem {
  name: string;
  icon: React.ReactNode;
  path: string;
  hasSubmenu?: boolean;
  submenu?: { name: string; path: string }[];
  isExternal?: boolean;
}

export default function Sidebar() {
  const pathname = usePathname();
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);

  const menuItems: MenuItem[] = [
    {
      name: "Dashboard",
      icon: <FiHome className="w-5 h-5" />,
      path: "/dashboard",
    },
    {
      name: "Menu",
      icon: <FiMenu className="w-5 h-5" />,
      path: "/dashboard/menu",
      hasSubmenu: true,
      submenu: [
        { name: "Categories", path: "/dashboard/menu/categories" },
        { name: "Items", path: "/dashboard/menu/items" },
      ],
    },
    {
      name: "Tables",
      icon: <FiGrid className="w-5 h-5" />,
      path: "/dashboard/tables",
      hasSubmenu: true,
      submenu: [
        { name: "Floors", path: "/dashboard/tables/floors" },
        { name: "All Tables", path: "/dashboard/tables/all" },
      ],
    },
    {
      name: "Waiter Requests",
      icon: <FiBell className="w-5 h-5" />,
      path: "/dashboard/waiter-requests",
    },
    {
      name: "Reservations",
      icon: <FiCalendar className="w-5 h-5" />,
      path: "/dashboard/reservations",
    },
    {
      name: "POS",
      icon: <FiMonitor className="w-5 h-5" />,
      path: "/dashboard/pos",
    },
    {
      name: "Orders",
      icon: <FiShoppingBag className="w-5 h-5" />,
      path: "/dashboard/orders",
    },
    {
      name: "Customers",
      icon: <FiUsers className="w-5 h-5" />,
      path: "/dashboard/customers",
    },
    {
      name: "Staff",
      icon: <FiUser className="w-5 h-5" />,
      path: "/dashboard/staff",
    },
    {
      name: "Delivery Executive",
      icon: <FiTruck className="w-5 h-5" />,
      path: "/dashboard/delivery",
    },
    {
      name: "Expenses",
      icon: <FiDollarSign className="w-5 h-5" />,
      path: "/dashboard/expenses",
      hasSubmenu: true,
      submenu: [
        { name: "All Expenses", path: "/dashboard/expenses/all" },
        { name: "Add Expense", path: "/dashboard/expenses/add" },
      ],
    },
    {
      name: "Payments",
      icon: <FiCreditCard className="w-5 h-5" />,
      path: "/dashboard/payments",
      hasSubmenu: true,
      submenu: [
        { name: "All Payments", path: "/dashboard/payments/all" },
        { name: "Payment Methods", path: "/dashboard/payments/methods" },
      ],
    },
    {
      name: "Reports",
      icon: <FiBarChart2 className="w-5 h-5" />,
      path: "/dashboard/reports",
      hasSubmenu: true,
      submenu: [
        { name: "Sales Reports", path: "/dashboard/reports/sales" },
        { name: "Inventory Reports", path: "/dashboard/reports/inventory" },
        { name: "Customer Reports", path: "/dashboard/reports/customers" },
      ],
    },
    {
      name: "Cash Register",
      icon: <FiSettings className="w-5 h-5" />,
      path: "/dashboard/cash-register",
      hasSubmenu: true,
      submenu: [
        { name: "Open Register", path: "/dashboard/cash-register/open" },
        { name: "Close Register", path: "/dashboard/cash-register/close" },
        { name: "Sessions", path: "/dashboard/cash-register/sessions" },
      ],
    },
    {
      name: "Inventory",
      icon: <FiPackage className="w-5 h-5" />,
      path: "/dashboard/inventory",
      hasSubmenu: true,
      submenu: [
        { name: "Items", path: "/dashboard/inventory/items" },
        { name: "Categories", path: "/dashboard/inventory/categories" },
        { name: "Stock Movement", path: "/dashboard/inventory/stock-movement" },
      ],
    },
    {
      name: "Kitchens",
      icon: <BiDish className="w-5 h-5" />,
      path: "/dashboard/kitchens",
      hasSubmenu: true,
      submenu: [
        { name: "All Kitchens", path: "/dashboard/kitchens/all" },
        { name: "KOT Queue", path: "/dashboard/kitchens/kot-queue" },
      ],
    },
  ];

  const toggleMenu = (menuName: string) => {
    setExpandedMenus((prev) =>
      prev.includes(menuName)
        ? prev.filter((item) => item !== menuName)
        : [...prev, menuName]
    );
  };

  const isActive = (path: string) => {
    return pathname === path;
  };

  const isSubmenuActive = (submenu?: { name: string; path: string }[]) => {
    return submenu?.some((item) => pathname === item.path);
  };

  return (
    <div className="w-64 bg-[#1e293b] text-white h-screen overflow-y-auto flex flex-col">
      {/* Logo */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">B</span>
          </div>
          <div>
            <h1 className="text-lg font-bold">BROWSE & BITE</h1>
          </div>
        </div>
      </div>

      {/* Branch Selector */}
      <div className="p-4 border-b border-gray-700">
        <select className="select select-bordered w-full bg-[#2d3b4e] text-white border-gray-600">
          <option>Gulshan</option>
          <option>Banani</option>
          <option>Dhanmondi</option>
        </select>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 py-4">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.name}>
              {item.hasSubmenu ? (
                <>
                  <button
                    onClick={() => toggleMenu(item.name)}
                    className={`w-full flex items-center justify-between px-4 py-3 hover:bg-[#2d3b4e] transition-colors ${
                      isSubmenuActive(item.submenu)
                        ? "bg-[#2d3b4e] border-l-4 border-orange-500"
                        : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      <span className="text-sm font-medium">{item.name}</span>
                    </div>
                    {expandedMenus.includes(item.name) ? (
                      <FiChevronDown className="w-4 h-4" />
                    ) : (
                      <FiChevronRight className="w-4 h-4" />
                    )}
                  </button>
                  {expandedMenus.includes(item.name) && item.submenu && (
                    <ul className="bg-[#172132] py-1">
                      {item.submenu.map((subItem) => (
                        <li key={subItem.name}>
                          <Link
                            href={subItem.path}
                            className={`block px-4 py-2 pl-14 text-sm hover:bg-[#2d3b4e] transition-colors ${
                              isActive(subItem.path)
                                ? "bg-[#2d3b4e] text-orange-400"
                                : ""
                            }`}
                          >
                            {subItem.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <Link
                  href={item.path}
                  className={`flex items-center gap-3 px-4 py-3 hover:bg-[#2d3b4e] transition-colors ${
                    isActive(item.path)
                      ? "bg-[#2d3b4e] border-l-4 border-orange-500"
                      : ""
                  }`}
                >
                  {item.icon}
                  <span className="text-sm font-medium">{item.name}</span>
                </Link>
              )}
            </li>
          ))}

          {/* Customer Site - External Link */}
          <li>
            <a
              href="/customer-site"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3 hover:bg-[#2d3b4e] transition-colors"
            >
              <FiExternalLink className="w-5 h-5" />
              <span className="text-sm font-medium">Customer Site</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
