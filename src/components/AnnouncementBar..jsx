export default function AnnouncementBar() {
  const scrollToOrder = () => {
    const orderSection = document.getElementById("order-now");
    if (orderSection) {
      orderSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      dir="rtl"
      onClick={scrollToOrder}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && scrollToOrder()}
      className="fixed top-20 inset-x-0 z-40 h-9 bg-[#4C3B78] hover:bg-[#3f3164] text-[#FAF6F0] flex items-center justify-center px-3 shadow-sm transition-colors cursor-pointer select-none"
    >
      <p className="text-[11px] sm:text-sm font-semibold tracking-wide truncate text-center">
        خصم <span className="text-[#F49474] font-black">40%</span> على الشحن
        للدفع الأونلاين ⚡ | خصم حتى{" "}
        <span className="text-[#F49474] font-black">20%</span> وشحن مجاني لـ 4
        بوكسات
      </p>
    </div>
  );
}
