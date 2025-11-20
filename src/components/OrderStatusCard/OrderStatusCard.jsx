import React from "react";

export const OrderStatusCard = ({ isShrink = true }) => {
  const orderStatusData = [
    { label: "New orders", count: 5000, change: "+20%", color: "green" },
    { label: "In Progress", count: 100, change: "-20%", color: "red" },
    { label: "Completed", count: 100, change: "+20%", color: "green" },
    { label: "Rejected", count: 600, change: "+20%", color: "green" },
    { label: "Disputed", count: 400, change: "+20%", color: "green" },
  ];

  const orders = [
    {
      id: 1063,
      customer: "Joe B",
      items: "2 Items",
      amount: "N6522.54",
      method: "Wallet",
      status: "Completed",
    },
    {
      id: 2036,
      customer: "Lisa",
      items: "23 Items",
      amount: "N3000.54",
      method: "Debit Card",
      status: "New Order",
    },
    {
      id: 418,
      customer: "Lawrence",
      items: "12 Items",
      amount: "N84.54",
      method: "Bank Transfer",
      status: "In Transit",
    },
  ];

  const statusColors = {
    "Completed": "bg-green-100 text-green-700 border border-green-400",
    "New Order": "bg-blue-100 text-blue-700 border border-blue-400",
    "In Transit": "bg-yellow-100 text-yellow-700 border border-yellow-400",
    "Rejected": "bg-red-100 text-red-700 border border-red-400",
    "Dispute": "bg-gray-200 text-gray-700 border border-gray-400",
  };

  return (
    <div className="bg-[#e5e5e5] w-full rounded-2xl shadow-sm p-6 border border-gray-100">
      <div className="items-end mb-4">
        <h2 className="font-semibold text-lg">Track order status</h2>
        <span className="text-xs text-gray-500">Last 30days</span>
      </div>

      {/* --- Status Metrics Row --- */}
      <div className={`${isShrink ? 'grid grid-cols-5 gap-4' : 'flex justify-between gap-4 overflow-x-auto'} mb-6`}>
        {orderStatusData.map((item, idx) => (
          <div key={idx} className={isShrink ? '' : 'flex-shrink-0'}>
            <p className={`font-semibold ${isShrink ? 'text-xl' : 'text-2xl'} ${!isShrink && 'whitespace-nowrap'}`}>
              {isShrink ? item.count : item.count.toLocaleString()}
            </p>
            <div className="flex">
              <p className={`text-gray-500 text-xs ${!isShrink && 'whitespace-nowrap'}`}>{item.label}</p>
              <p
                className={`text-xs font-medium ${!isShrink && 'whitespace-nowrap'} ${
                  item.change.includes("+") ? "text-green-600" : "text-red-500"
                }`}
              >
                {item.change}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className={`border-t pt-4 ${!isShrink && 'overflow-x-auto'}`}>
        <div className={!isShrink ? 'min-w-max' : ''}>
          {/* Table Header */}
          <div 
            className={`grid grid-cols-6 ${isShrink ? 'gap-2' : 'gap-4'} text-xs text-gray-500 mb-2`}
            style={!isShrink ? {gridTemplateColumns: "60px 120px 100px 100px 140px 140px"} : {}}
          >
            <div>ID</div>
            <div>Customer Name</div>
            <div>Item Qty</div>
            <div>Amount</div>
            <div>Payment Method</div>
            <div>Status</div>
          </div>

          {/* Table Rows */}
          {orders.map((order, idx) => (
            <div
              key={idx}
              className={`grid grid-cols-6 ${isShrink ? 'gap-2' : 'gap-4'} py-3 text-sm border-t border-gray-200`}
              style={!isShrink ? {gridTemplateColumns: "60px 120px 100px 100px 140px 140px"} : {}}
            >
              <div className={!isShrink ? 'whitespace-nowrap' : ''}>{order.id}</div>
              <div className={!isShrink ? 'whitespace-nowrap' : ''}>{order.customer}</div>
              <div className={!isShrink ? 'whitespace-nowrap' : ''}>{order.items}</div>
              <div className={!isShrink ? 'whitespace-nowrap' : ''}>{order.amount}</div>
              <div className={!isShrink ? 'whitespace-nowrap' : ''}>{order.method}</div>

              <div>
                <span
                  className={`px-3 py-1 rounded-full text-xs ${!isShrink && 'whitespace-nowrap inline-block'} ${statusColors[order.status]}`}
                >
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// export default OrderStatusCard;