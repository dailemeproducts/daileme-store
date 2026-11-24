import { ShoppingCart } from "lucide-react";
import { holding_athar_on_sky_yellow_green_theme } from "../assets";

export default function Section1Hero() {
  return (
    <div
      id="hero"
      dir="rtl"
      className="h-full w-full grid grid-cols-1 lg:grid-cols-2 items-center select-none pt-10"
    >
      {/* 1. قسم الصورة */}
      <div className="w-full h-[42vh] sm:h-[50vh] lg:h-full overflow-hidden p-5 flex items-center justify-center">
        <div className="relative h-full w-full max-w-xl lg:max-w-none overflow-hidden rounded-3xl shadow-xl border border-[#8879B3]/20 group">
          <img
            src={holding_athar_on_sky_yellow_green_theme}
            alt="نوتة أثر للتخطيط اليومي"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* لمسة إضاءة ناعمة على أطراف الصورة */}
          <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-black/10 pointer-events-none" />
        </div>
      </div>

      {/* 2. قسم النصوص والأزرار */}
      <div className="flex flex-col justify-center items-center lg:items-start text-center lg:text-right gap-5 sm:gap-6 px-6 sm:px-12 lg:px-16 xl:px-24 py-8 lg:py-0">
        {/* Badge صغير فوق العنوان يدي فخامة ويكسر الفراغ */}
        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold bg-[#8879B3]/15 text-[#4C3B78] border border-[#8879B3]/20">
          أثر - Daileme ✨
        </span>

        {/* العنوان الرئيسي */}
        <h1 className="text-3xl sm:text-4xl xl:text-5xl font-bold leading-tight sm:leading-snug text-[#7862b6]">
          خطة يومية{" "}
          <span className="block sm:inline text-[#4C3B78] font-black">
            لحياة أكثر وعياً وإنجازاً
          </span>
        </h1>

        {/* الوصف */}
        <p className="text-sm sm:text-lg text-[#1E252D]/75 leading-relaxed max-w-xl text-center lg:text-right">
          "أثر" هو دفتر لإدارة الوقت والإنتاجية ومحاسبة النفس؛ بيساعدك تخطط
          لشهرك وأسبوعك ويومك، وتتابع مصروفاتك، وتفرّغ أفكارك في مساحة حرة.
          <span className="hidden sm:inline">
            {" "}
            والأجمل إنه بيحول الالتزام لتحدي ممتع: عقود بتوقّع عليها، وحوش
            لعاداتك السيئة بتقضي عليها، وأوسمة بتكسبها.. وتفاصيل تانية هتكتشفها
            بنفسك.
          </span>
        </p>

        {/* مميزات سريعة (تزود معدل التحويل من أول نظرة) */}
        {/* <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-2 text-xs sm:text-sm font-semibold text-[#1E252D]/80">
          <span className="flex items-center gap-1.5">
            <span className="text-[#F49474] text-base">✔</span> ورق أبيض 100
            جرام
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-[#F49474] text-base">✔</span> شامل الفواصل
            والستيكرز
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-[#F49474] text-base">✔</span> الدفع عند
            الاستلام
          </span>
        </div> */}

        {/* أزرار الـ CTA */}
        <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto pt-2">
          <a
            href="#order-now"
            className="w-full sm:w-auto text-center px-6 py-4 bg-[#4C3B78] hover:bg-[#3a2c5e] active:scale-[0.98] text-white font-bold text-base sm:text-lg rounded-xl shadow-lg shadow-[#4C3B78]/20 transition-all cursor-pointer flex gap-2 items-center justify-center"
          >
            <span >اطلب الآن - 370 ج.م</span>
            <span className="line-through font-medium text-white/60 text-sm">
              400 ج.م
            </span>{" "}
            <ShoppingCart className="ms-1" />
          </a>
          <a
            href="#details"
            className="w-full sm:w-auto text-center px-8 py-4 bg-white hover:bg-gray-50 active:scale-[0.98] text-[#1E252D] font-semibold border border-[#8879B3]/30 text-base sm:text-lg rounded-xl shadow-xs transition-all cursor-pointer"
          >
            رؤية التفاصيل
          </a>
        </div>
      </div>
    </div>
  );
}

// import { holding_athar_on_sky_yellow_green_theme } from "../assets";

// export default function Section1Hero() {
//   return (
//     <div
//       className="h-screen w-full grid sm:grid-cols-2 pt-20 select-none"
//       id="hero"
//     >
//       <div className="h-[calc(100vh-80px)] p-5 flex items-center justify-center">
//         <img
//           src={holding_athar_on_sky_yellow_green_theme}
//           alt="athar-at-sunset-square-aspect-ratio"
//           className="h-full w-full object-cover rounded-3xl border border-black/10"
//         />
//       </div>
//       <div className="flex flex-col justify-center gap-5 px-30">
//         <h2 className="text-5xl font-bold flex flex-wrap gap-3 text-[#7862b6]">
//           <span>خطة يومية</span>
//           <span className="text-[#573e9b]">لحياة أكثر وعياً وإنجازاً</span>
//         </h2>
//         <p className="text-lg text-black/60">
//           نوتة التخطيط اليومية المصممة عشان تاخد بإيدك من فوضى المهام لهدوء
//           الإنجاز. بـ 4 أركان أساسية توازن بيهم بين شغلك ونفسيتك، وبتصميم مريح
//           يفتح نفسك تبدأ من أي يوم في السنة.
//         </p>
//         {/* CTA */}
//         <div className="flex items-center gap-4">
//           <a
//             href="#order-now"
//             className="p-4 bg-[#573e9b] text-white text-lg w-fit cursor-pointer rounded-lg"
//           >
//             اطلب الآن - 350 ج.م
//           </a>
//           <a
//             href="#details"
//             className="p-4 bg-gray-100 border border-black/10 text-lg w-fit cursor-pointer rounded-lg"
//           >
//             رؤية التفاصيل
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// }
