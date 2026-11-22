import React, { useState, useEffect } from "react";

export default function BatchStockCounter({ scriptUrl }) {
  const [stock, setStock] = useState({ total: 50, remaining: 30 });

  useEffect(() => {
    if (!scriptUrl) return;

    fetch(scriptUrl)
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data.remaining === "number") {
          setStock({
            total: Number(data.total) || 50,
            remaining: Math.max(0, Number(data.remaining)),
          });
        }
      })
      .catch((err) => {
        console.error("Failed to fetch stock:", err);
      });
  }, [scriptUrl]);

  const sold = Math.max(0, stock.total - stock.remaining);
  const percentage = Math.min(100, Math.round((sold / stock.total) * 100));
  if (stock.remaining > 30) return null;
  return (
    <div
      className="mb-5 pb-4 border-b border-[#4C3B78]/15 text-right"
      dir="rtl"
    >
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="text-xs font-bold text-[#4C3B78] flex items-center gap-1.5">
          <span className="inline-block w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          حجز الدفعة الأولى (سعر الإطلاق 350 ج.م)
        </span>
        <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-[#4C3B78] text-[#FAF6F0]">
          متبقي {stock.remaining} من {stock.total}
        </span>
      </div>

      {/* شريط التقدم المدمج */}
      <div className="w-full h-2 bg-[#4C3B78]/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#4C3B78] rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="flex items-center justify-between text-[11px] text-gray-500 mt-1.5">
        <span>كمية محدودة — الأولوية بأسبقية الحجز</span>
        <span>الدفعة القادمة بـ 400 ج.م</span>
      </div>
    </div>
  );
}
