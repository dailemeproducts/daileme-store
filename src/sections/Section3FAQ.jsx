import { ChevronDown } from "lucide-react";
import { useState } from "react";

export default function Section3FAQ() {
  // بنخزن رقم السؤال المفتوح (null يعني كله مقفول في البداية)
  const [openIndex, setOpenIndex] = useState(null);

  const FAQs = [
    // {
    //   q: "أثر عبارة عن اي؟",
    //   a: ""أثر" هو دفتر لإدارة الوقت والإنتاجية ومحاسبة النفس؛ بيساعدك تخطط لشهرك وأسبوعك ويومك، وتتابع مصروفاتك، وتفرّغ أفكارك في مساحة حرة. والأجمل إنه بيحول الالتزام لتحدي ممتع: عقود بتوقّع عليها، وحوش لعاداتك السيئة بتقضي عليها، وأوسمة بتكسبها.. وتفاصيل تانية هتكتشفها بنفسك.",
    // },
    {
      q: "الشحن بياخد كام يوم ومصاريفه كام؟",
      a: "التوصيل بياخد من يومين لـ 4 أيام عمل لجميع محافظات مصر، والشحن 100 جنيه لكل المحافظات.",
    },
    {
      q: "هل متاح معاينة المنتج قبل الاستلام والدفع؟",
      a: "أكيد، تقدر تفتح الشحنة وتعاين النوتة وتتأكد من سلامتها وجودتها مع مندوب الشحن قبل ما تدفع أي مليم.",
    },
    {
      q: "هل النوتة مؤرخة ولا أقدر أبدأ في أي وقت؟",
      a: "النوتة غير مؤرخة تماماً، تقدر تبدأ في أي شهر أو أي أسبوع في السنة من غير ما يفوتك أي ورق أو تحس بالذنب.",
    },
  ];

  const toggleFAQ = (index) => {
    // لو داس على السؤال المفتوح يقفله، لو داس على غيره يفتحه ويقفل الباقي
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="FAQ"
      className="w-full h-full max-w-3xl mx-auto px-4 py-16 pt-20 flex flex-col justify-center"
    >
      <h2 className="text-3xl font-bold text-center text-[#1E252D] mb-10">
        الأسئلة الشائعة
      </h2>

      <div className="space-y-4">
        {FAQs.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={index}
              className="border border-[#8879B3]/20 rounded-2xl bg-[#faf2e6] overflow-hidden transition-colors duration-200"
            >
              {/* زرار السؤال */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-5 text-right font-semibold text-[#1E252D] hover:text-[#4C3B78] transition-colors cursor-pointer"
              >
                <span className="text-lg">{faq.q}</span>

                {/* السهم اللي بيلف بنعومة */}
                <span
                  className={`transform transition-transform duration-300 text-[#4C3B78] ${
                    isOpen ? "rotate-180" : "rotate-0"
                  }`}
                >
                  <ChevronDown />
                </span>
              </button>

              {/* حاوية الإجابة المتحركة بالـ CSS Grid */}
              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                {/* الديف الداخلي المقفول عليه الـ overflow */}
                <div className="overflow-hidden bg-white pt-4">
                  <p className="p-5 pt-0 text-[#1E252D]/80 leading-relaxed text-sm md:text-base border-[#8879B3]/10">
                    {faq.a}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
