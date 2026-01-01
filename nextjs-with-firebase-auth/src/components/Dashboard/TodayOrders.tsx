"use client";

import { FiShoppingBag } from "react-icons/fi";

interface Order {
  id: number;
  orderNumber: string;
  orderType: string;
  customerName: string;
  amount: number;
  status: string;
  time: string;
}

interface TodayOrdersProps {
  orders?: Order[];
}

export default function TodayOrders({ orders }: TodayOrdersProps) {
  const hasOrders = orders && orders.length > 0;

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 h-full">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Today Orders</h2>

      {!hasOrders ? (
        <div className="flex flex-col items-center justify-center h-64">
          <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mb-4">
            <FiShoppingBag className="w-10 h-10 text-orange-500" />
          </div>
          <p className="text-gray-600 text-center">
            Waiting for the today&apos;s first order 🏆
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <div
              key={order.id}
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-semibold text-gray-800">
                    {order.orderNumber}
                  </p>
                  <p className="text-sm text-gray-600">{order.customerName}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    order.status === "Completed"
                      ? "bg-green-100 text-green-700"
                      : order.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {order.status}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">{order.orderType}</span>
                <div className="text-right">
                  <p className="font-bold text-gray-800">৳{order.amount.toFixed(2)}</p>
                  <p className="text-xs text-gray-500">{order.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
