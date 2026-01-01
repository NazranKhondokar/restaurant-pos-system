"use client";

interface TopSellingDishProps {
  data?: Array<{
    name: string;
    quantity: number;
    revenue: number;
  }>;
}

export default function TopSellingDish({ data }: TopSellingDishProps) {
  const hasData = data && data.length > 0;

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Top Selling Dish (Today)
      </h3>

      {!hasData ? (
        <div className="flex items-center justify-center h-32">
          <p className="text-gray-500 text-sm">No Payment Found</p>
        </div>
      ) : (
        <div className="space-y-3">
          {data.map((item, index) => (
            <div key={index} className="border-b border-gray-100 pb-2 last:border-0">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-800">{item.name}</span>
                <span className="text-sm text-gray-600">×{item.quantity}</span>
              </div>
              <div className="text-xs text-gray-500">
                Revenue: ৳{item.revenue.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
