import { useState } from "react";
import {
  // ahtar_sunset,
  hand_holding_athar,
  // athar_fancy_trees_1to1,
  // athar_on_grass,
  // athar_on_rock,
  // athar_with_cat,
  // closeup_athar_image_with_pen,
  sticking_a_skull_sticker_on_end_week_paper,
  athar_all_contents,
  athar_month_page_bunishments,
  athar_day_2_facing_pages,
  athar_monsters_page_stickers,
  athar_and_pen_and_bookmark,
} from "../assets";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function Section2Carousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const images = [
    {
      url: hand_holding_athar,
      caption: "تصميم مريح للعين يفتح نفسك تخطط ليومك في أي وقت وفي أي مكان ✨",
    },
    {
      url: athar_all_contents,
      caption:
        "كل اللي تحتاجه عشان تبدأ رحلتك وتنظم أيامك في بوكس واحد متكامل ✨",
    },
    {
      url: athar_and_pen_and_bookmark,
      caption:
        "تقسيمة يومية ذكية تجمع بين التخطيط الصارم على اليمين والكتابة الحرة على الشمال ✨",
    },
    {
      url: athar_monsters_page_stickers,
      caption:
        "حول عاداتك السلبية لوحوش حقيقية، واحتفل بانتصارك عليها كل أسبوع 🏆",
    },
    // {
    //   url: athar_month_page_bunishments,
    //   caption: "صفحة بداية الشهر: اكتب أهدافك وامضي على عهد الالتزام مع نفسك",
    // },
  ];

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div
      id="details"
      dir="rtl"
      className="w-full min-h-[calc(100vh-80px)] flex items-center relative overflow-hidden py-10 sm:py-14 select-none [--slide-w:84%] sm:[--slide-w:55%] lg:[--slide-w:38%] xl:[--slide-w:34%]"
    >
      {activeIndex >= 1 && (
        <button
          onClick={prevSlide}
          aria-label="الصورة السابقة"
          className="absolute z-20 right-3 sm:right-8 top-1/2 -translate-y-1/2 h-11 w-11 sm:h-12 sm:w-12 flex items-center justify-center rounded-full bg-white/90 hover:bg-white text-[#4C3B78] border border-[#8879B3]/30 shadow-lg hover:scale-110 active:scale-95 transition-all cursor-pointer"
        >
          <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      )}

      {activeIndex < images.length - 1 && (
        <button
          onClick={nextSlide}
          aria-label="الصورة التالية"
          className="absolute z-20 left-3 sm:left-8 top-1/2 -translate-y-1/2 h-11 w-11 sm:h-12 sm:w-12 flex items-center justify-center rounded-full bg-white/90 hover:bg-white text-[#4C3B78] border border-[#8879B3]/30 shadow-lg hover:scale-110 active:scale-95 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      )}

      {/* الشريط المتحرك بمعادلة توسيط أوتوماتيكية لأي مقاس شاشة */}
      <div
        style={{
          transform: `translateX(calc(${activeIndex} * var(--slide-w) - (100% - var(--slide-w)) / 2))`,
        }}
        className="flex items-center transition-transform duration-700 ease-out w-full"
      >
        {images.map((image, index) => {
          const isActive = index === activeIndex;

          return (
            <div
              key={index}
              onClick={() => !isActive && setActiveIndex(index)}
              onMouseEnter={() => isActive && setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className={`w-(--slide-w) shrink-0 px-2 sm:px-4 flex flex-col items-center gap-4 transition-all duration-700 relative ${
                isActive
                  ? "scale-100 opacity-100 z-10"
                  : "scale-85 opacity-40 blur-[2px] cursor-pointer hover:opacity-60"
              }`}
            >
              {/* حاوية الصورة: مربعة تماماً على كل الشاشات */}
              <div className="w-full aspect-square max-h-[65vh] rounded-3xl overflow-hidden shadow-xl border border-[#8879B3]/20 bg-white">
                <img
                  src={image.url}
                  alt={image.caption}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* الوصف + البروجريس بار تحت الصورة المعروضة */}
              <div
                className={`w-full flex flex-col items-center justify-center gap-2.5 transition-opacity duration-500 ${
                  isActive ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              >
                <p className="text-center text-sm sm:text-base font-bold text-[#1E252D] px-2 line-clamp-2 sm:line-clamp-1">
                  {image.caption}
                </p>

                {/* شريط التايمر */}
                <div className="w-40 sm:w-52 h-2 border border-[#4C3B78]/30 bg-white rounded-full overflow-hidden p-0.5 shadow-inner">
                  {isActive && (
                    <div
                      key={activeIndex}
                      onAnimationEnd={nextSlide}
                      className={`h-full bg-[#4C3B78] rounded-full progress-timer ${
                        isHovered ? "pause-timer" : ""
                      }`}
                    />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// import { useState } from "react";
// import {
//   ahtar_sunset,
//   athar_blue_sky,
//   athar_fancy_trees_1to1,
//   athar_on_grass,
//   athar_on_rock,
//   athar_with_cat,
//   closeup_athar_image_with_pen,
//   sticking_a_skull_sticker_on_end_week_paper,
// } from "../assets";
// import { ArrowLeft, ArrowRight } from "lucide-react";

// export default function Section2Carousel() {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [isHovered, setIsHovered] = useState(false);

//   const images = [
//     { url: athar_fancy_trees_1to1, caption: "athar sun set" },
//     {
//       url: closeup_athar_image_with_pen,
//       caption: "close up athar image with pen",
//     },
//     {
//       url: sticking_a_skull_sticker_on_end_week_paper,
//       caption: "sticking a skull sticker on end week paper",
//     },
//     { url: ahtar_sunset, caption: "athar sun set" },
//     { url: athar_blue_sky, caption: "athar blue sky" },
//     { url: athar_on_grass, caption: "athar on grass" },
//     { url: athar_on_rock, caption: "athar on rock" },
//     { url: athar_with_cat, caption: "athar with cat" },
//   ];

//   const nextSlide = () => {
//     setActiveIndex((prev) => (prev + 1) % images.length);
//   };

//   return (
//     <div
//       className="h-full w-full relative overflow-hidden p-10"
//       id="details"
//     >
//       {activeIndex >= 1 && (
//         <button
//           onClick={() => setActiveIndex((prev) => prev - 1)}
//           className="h-[90%] w-80 absolute z-10 right-0 flex items-center justify-center cursor-pointer group"
//         >
//           <span className="border border-black h-10 w-10 flex items-center justify-center rounded-full bg-white group-hover:bg-gray-100 group-hover:scale-110 transition-transform">
//             <ArrowRight />
//           </span>
//         </button>
//       )}
//       {activeIndex < images.length - 1 && (
//         <button
//           onClick={() => setActiveIndex((prev) => prev + 1)}
//           className="h-[90%] w-80 absolute z-10 left-0 flex items-center justify-center cursor-pointer group"
//         >
//           <span className="border border-black h-10 w-10 flex items-center justify-center rounded-full bg-white group-hover:bg-gray-100 group-hover:scale-110 transition-transform">
//             <ArrowLeft />
//           </span>
//         </button>
//       )}
//       <div
//         style={{
//           transform: `translateX(calc(${activeIndex * 40}% - 30%))`,
//         }}
//         className="flex items-center transition-transform duration-500 ease-out w-full h-full"
//       >
//         {images.map((image, index) => {
//           return (
//             <div
//               className={`w-[40%] h-full shrink-0 transition-all duration-[1.5s] relative ${
//                 index === activeIndex
//                   ? "scale-100 opacity-100"
//                   : "scale-70 opacity-30 blur-md"
//               }`}
//               onMouseEnter={() => index === activeIndex && setIsHovered(true)}
//               onMouseLeave={() => setIsHovered(false)}
//             >
//               <img
//                 src={image.url}
//                 className="w-full h-[95%] object-cover rounded-2xl"
//               />

//               {index === activeIndex && (
//                 <div className="h-10 flex items-center justify-center">
//                   {/* <p className="text-center mt-4 text-slate-800">
//                     {image.caption}
//                   </p> */}
//                   <div className="w-48 h-3 border border-black/50 border-dashed bg-white rounded-full overflow-hidden">
//                     {/* الشريط الملون اللي بيتملي ويشغل التايمر */}
//                     <div
//                       key={activeIndex} // بيخلي الشريط يبدأ من الصفر مع كل صورة جديدة
//                       onAnimationEnd={nextSlide} // أول ما يوصل 100% يقلب الصورة لوحده!
//                       className={`h-full bg-black/20 rounded-full progress-timer ${
//                         isHovered ? "pause-timer" : ""
//                       }`}
//                     />
//                   </div>
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
