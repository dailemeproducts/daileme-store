import React, { useState, useEffect } from "react";

export default function StickyCTA({ formId = "order-now" }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const scrollContainer = document.getElementById("main-scroll");
    if (!scrollContainer) return;

    const handleScroll = () => {
      const scrolledPastHero = scrollContainer.scrollTop > 300;
      const formElement = document.getElementById(formId);

      if (!formElement) {
        setIsVisible(scrolledPastHero);
        return;
      }

      const formRect = formElement.getBoundingClientRect();
      const containerRect = scrollContainer.getBoundingClientRect();

      const isFormInView =
        formRect.top <= containerRect.bottom - 80 &&
        formRect.bottom >= containerRect.top;

      setIsVisible(scrolledPastHero && !isFormInView);
    };

    scrollContainer.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, [formId]);

  // const scrollToForm = () => {
  //   const formElement = document.getElementById(formId);
  //   if (formElement) {
  //     formElement.scrollIntoView({ behavior: "smooth", block: "start" });
  //   }
  // };

  if (!isVisible) return null;

  return (
    <div
      dir="rtl"
      className="fixed bottom-0 left-0 right-0 md:bottom-5 md:left-1/2 md:right-auto md:-translate-x-1/2 md:w-auto md:min-w-[420px] md:rounded-2xl md:border z-[9999] bg-[#FAF6F0]/95 backdrop-blur-md border-t border-[#4C3B78]/15 px-4 py-3 shadow-[0_-4px_20px_rgba(76,59,120,0.12)]"
    >
      <div className="flex items-center justify-between gap-6 max-w-md mx-auto">
        <div className="flex flex-col">
          <span className="text-[11px] text-gray-500 font-medium">
            بوكس أثر (الدفعة الأولى)
          </span>
          <span className="text-lg font-extrabold text-[#4C3B78] leading-tight">
            370 ج.م
          </span>
        </div>

        <a
          href={`#${formId}`}
          // onClick={scrollToForm}
          className="bg-[#4C3B78] hover:bg-[#3b2d5f] active:scale-95 text-[#FAF6F0] font-bold text-sm px-6 py-3 rounded-xl shadow-md transition-all cursor-pointer"
        >
          اطلب نسختك الآن
        </a>
      </div>
    </div>
  );
}
