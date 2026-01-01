"use client";

interface PaymentMethodChartProps {
  data?: Array<{
    method: string;
    amount: number;
  }>;
}

export default function PaymentMethodChart({ data }: PaymentMethodChartProps) {
  const hasData = data && data.length > 0;

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Payment Method (Today)
      </h3>

      {!hasData ? (
        <div className="flex items-center justify-center h-32">
          <p className="text-gray-500 text-sm">No Payment Found</p>
        </div>
      ) : (
        <div className="space-y-3">
          {data.map((item, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="text-sm text-gray-600">{item.method}</span>
              <span className="text-sm font-medium text-gray-800">
                ৳{item.amount.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
