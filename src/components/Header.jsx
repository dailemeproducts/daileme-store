import { ShoppingCart } from "lucide-react";
import { daileme_logo_png_colored } from "../assets";

export default function Header() {
  return (
    <header
      dir="rtl"
      className="h-20 w-full shrink-0 flex items-center justify-between border-b border-[#8879B3]/20 bg-[#FAF6F0]/85 backdrop-blur-md px-4 sm:px-10 lg:px-24 z-50 select-none"
    >
      {/* 1. اللوجو */}
      <a href="#hero" className="shrink-0">
        <img
          src={daileme_logo_png_colored}
          alt="daileme logo"
          className="h-8 sm:h-10 w-auto object-contain"
        />
      </a>

      {/* 2. الروابط وزرار الشراء */}
      <nav className="flex items-center gap-1 sm:gap-2">
        <a
          href="#hero"
          className="hidden md:inline-block py-2 px-3.5 rounded-xl text-sm font-semibold text-[#1E252D] hover:bg-[#8879B3]/10 hover:text-[#4C3B78] transition-colors"
        >
          الرئيسية
        </a>
        <a
          href="#details"
          className="hidden sm:inline-block py-2 px-3.5 rounded-xl text-sm font-semibold text-[#1E252D] hover:bg-[#8879B3]/10 hover:text-[#4C3B78] transition-colors"
        >
          التفاصيل
        </a>
        <a
          href="#FAQ"
          className="hidden sm:inline-block py-2 px-3.5 rounded-xl text-sm font-semibold text-[#1E252D] hover:bg-[#8879B3]/10 hover:text-[#4C3B78] transition-colors"
        >
          الأسئلة الشائعة
        </a>

        {/* زرار الشراء السريع (ظاهر دايماً على الموبايل والديسكتوب) */}
        <a
          href="#order-now"
          className="py-2.5 px-5 rounded-xl bg-[#4C3B78] hover:bg-[#3a2c5e] active:scale-95 text-white text-sm font-bold shadow-sm transition-all ms-2 flex gap-2 items-center justify-center"
        >
          <span> اطلب الآن </span>
          <span>
            <ShoppingCart size={16} />
          </span>
        </a>
      </nav>
    </header>
  );
}

// import { daileme_logo_png_colored } from "../assets";

// export default function Header() {
//   return (
//     <div className="h-20 w-full flex items-center justify-between border-b border-black/10 px-30 fixed top-0 backdrop-blur-lg z-50">
//       {/* LOGO */}
//       <img
//         src={daileme_logo_png_colored}
//         alt="daileme-logo-png-colored"
//         className="h-10"
//       />
//       {/* LINKS */}
//       <div className="flex">
//         <a href="#hero" className="py-2 px-3 hover:bg-black/5">
//           الرئيسية
//         </a>
//         <a href="#details" className="py-2 px-3 hover:bg-black/5">
//           التفاصيل
//         </a>
//         {/* <a href="#here" className="py-2 px-3 hover:bg-black/5">
//           التقييمات
//         </a> */}
//         <a href="#FAQ" className="py-2 px-3 hover:bg-black/5">
//           الاسئلة الشائعة
//         </a>
//         <a
//           href="#order-now"
//           className="py-2 px-3 hover:bg-[#5d3faf] bg-[#7359bd] text-white ms-3"
//         >
//           اطلب الآن
//         </a>
//       </div>
//     </div>
//   );
// }
