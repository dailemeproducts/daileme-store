import { useState } from "react";

const POLICIES_DATA = {
  refund: {
    title: "سياسة الاستبدال",
    content: [
      "في حال وجود أي عيب صناعة في بوكس «أثر» (مثل خطأ في الطباعة، نقص في المحتويات، أو تلف ناتج عن الشحن)، يتم استبدال البوكس بآخر سليم تماماً دون أي تكلفة إضافية.",
      "شروط الاستبدال:",
      "• التواصل معنا خلال 48 ساعة من تاريخ استلام الطلب.",
      "• أن يكون البوكس وجميع محتوياته في نفس الحالة التي تم استلامها عليها، وأن تكون النوتة مغلفة بغلافها الأصلي (Sealed) وغير مستخدمة.",
      "طريقة طلب الاستبدال:",
      "• أرسل رسالة عبر واتساب على الرقم (01555972563) موضحاً كود الطلب وصورة توضح المشكلة.",
      "• سنقوم بإرسال مندوب الشحن لاستلام البوكس وتسليمك البديل السليم مجاناً بالكامل.",
    ],
  },
  shipping: {
    title: "سياسة الشحن والتوصيل",
    content: [
      "نقوم بالشحن لجميع محافظات جمهورية مصر العربية عبر شركات شحن معتمدة لضمان وصول طلبك بأمان.",
      "• مدة التوصيل: من 2 إلى 4 أيام عمل (تستثنى أيام الجمعة والعطلات الرسمية) من تاريخ تأكيد الطلب.",
      "• مصاريف الشحن:",
      "  - 60 ج.م فقط عند اختيار الدفع أونلاين (خصم 40% على الشحن).",
      "  - 100 ج.م عند اختيار الدفع عند الاستلام (COD).",
      "  - شحن مجاني بالكامل عند طلب 4 بوكسات فأكثر.",
      "• تأكيد الطلبات: في حال اختيار الدفع أونلاين، يبدأ تجهيز وشحن الطلب فور استلام صورة إيصال التحويل على واتساب.",
    ],
  },
  privacy: {
    title: "سياسة الخصوصية وحماية البيانات",
    content: [
      "نلتزم في براند «أثر» بحماية خصوصية بياناتك الشخصية وعدم مشاركتها مع أي جهات خارجية لأغراض تسويقية.",
      "• البيانات التي نجمعها: نجمع فقط الاسم، رقم الهاتف، والمحافظة والعنوان التفصيلي عند إتمامك لطلب الشراء.",
      "• كيفية استخدام البيانات: تُستخدم بياناتك حصرياً لتأكيد طلبك، تسليمه لشركة الشحن المختصة، والتواصل معك بخصوص حالة التوصيل.",
      "• ملفات تعريف الارتباط والتتبع: يستخدم الموقع أدوات تحليل وإعلانات قياسية (مثل Meta Pixel) لقياس أداء الزيارات وتحسين تجربة المستخدم وتقديم عروض مناسبة، دون الوصول لأي بيانات مالية سرية.",
    ],
  },
};

export default function PoliciesFooter() {
  const [activePolicy, setActivePolicy] = useState(null);

  return (
    <>
      {/* روابط السياسات في الفوتر */}
      <footer
        dir="rtl"
        className="bg-[#FAF6F0] border-t border-[#4C3B78]/15 py-8 px-4 text-center text-[#2D2446]"
      >
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-4">
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm font-semibold text-[#4C3B78]">
            <button
              type="button"
              onClick={() => setActivePolicy("refund")}
              className="hover:text-[#F49474] underline-offset-4 hover:underline transition-colors cursor-pointer"
            >
              سياسة الاستبدال والاسترجاع
            </button>
            <span className="text-[#4C3B78]/30">|</span>
            <button
              type="button"
              onClick={() => setActivePolicy("shipping")}
              className="hover:text-[#F49474] underline-offset-4 hover:underline transition-colors cursor-pointer"
            >
              سياسة الشحن والتوصيل
            </button>
            <span className="text-[#4C3B78]/30">|</span>
            <button
              type="button"
              onClick={() => setActivePolicy("privacy")}
              className="hover:text-[#F49474] underline-offset-4 hover:underline transition-colors cursor-pointer"
            >
              سياسة الخصوصية
            </button>
          </div>

          <p className="text-xs text-[#2D2446]/60">
            © {new Date().getFullYear()} daileme - بوكس أثر. جميع الحقوق محفوظة.
          </p>
        </div>
      </footer>

      {/* النافذة المنبثقة (Modal) لعرض تفاصيل السياسة */}
      {activePolicy && (
        <div
          dir="rtl"
          onClick={() => setActivePolicy(null)}
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#FAF6F0] border border-[#4C3B78]/20 rounded-2xl max-w-lg w-full max-h-[85vh] flex flex-col shadow-xl overflow-hidden"
          >
            {/* رأس النافذة */}
            <div className="bg-[#4C3B78] text-[#FAF6F0] px-5 py-4 flex items-center justify-between">
              <h3 className="font-bold text-base sm:text-lg">
                {POLICIES_DATA[activePolicy].title}
              </h3>
              <button
                type="button"
                onClick={() => setActivePolicy(null)}
                aria-label="إغلاق"
                className="text-[#FAF6F0]/80 hover:text-white text-xl font-bold leading-none px-2 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* محتوى السياسة */}
            <div className="p-5 overflow-y-auto space-y-3 text-sm leading-relaxed text-[#2D2446]">
              {POLICIES_DATA[activePolicy].content.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* زر الإغلاق السفلي */}
            <div className="px-5 py-3 border-t border-[#4C3B78]/10 bg-white/50 flex justify-end">
              <button
                type="button"
                onClick={() => setActivePolicy(null)}
                className="bg-[#4C3B78] hover:bg-[#3f3164] text-white text-xs sm:text-sm font-semibold px-5 py-2 rounded-lg transition-colors cursor-pointer"
              >
                فهمت، إغلاق
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
