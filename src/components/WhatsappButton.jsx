import React from "react";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsappButton() {
  const openWhatsApp = (customMessage = "أهلاً، عندي استفسار:") => {
    const PHONE = "201555972563";
    const url = `https://wa.me/${PHONE}?text=${encodeURIComponent(customMessage)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <button
      onClick={() => openWhatsApp()}
      title="تواصل عبر واتساب"
      className="bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full cursor-pointer h-12 w-12 flex items-center justify-center fixed bottom-5 left-5 z-50 shadow-lg"
    >
      <FaWhatsapp size={24} />
    </button>
  );
}
