import { useState } from "react";
import OrderInput from "../components/OrderInput";
import { Copy, Check, MessageCircle } from "lucide-react";
import BatchStockCounter from "../components/BatchStockCounter";

const GOVERNORATES = [
  "القاهرة",
  "الجيزة",
  "الإسكندرية",
  "الدقهلية",
  "البحر الأحمر",
  "البحيرة",
  "الفيوم",
  "الغربية",
  "الإسماعيلية",
  "المنوفية",
  "المنيا",
  "القليوبية",
  "الوادي الجديد",
  "السويس",
  "أسوان",
  "أسيوط",
  "بني سويف",
  "بورسعيد",
  "دمياط",
  "الشرقية",
  "جنوب سيناء",
  "كفر الشيخ",
  "مطروح",
  "الأقصر",
  "قنا",
  "شمال سيناء",
  "سوهاج",
];

const BASE_PRICE = 370;
const COD_SHIPPING_COST = 80;
const ONLINE_SHIPPING_COST = 60;
const PAYMENT_PHONE = "01555972563";
const PAYMENT_RECIPIENT = "رمضان";
const WHATSAPP_NUMBER = "201555972563";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyjJeVaPE2LZGF0_Cq56am0F479w4v1F1qUPJUyEHESKSUq7sAsgZDRCWWDcNBsQ2B4/exec";

export default function Section4Order() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    governorate: "",
    address: "",
    quantity: 1,
    payment: "COD", // "COD" = عند الاستلام | "Online" = فودافون كاش / إنستا باي
    botField: "", // حقل خفي لمصيدة البوتات (Honeypot)
  });

  const [lastOrderCode, setLastOrderCode] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [isPhoneCopied, setIsPhoneCopied] = useState(false);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // نسخ كود الطلب للحافظة
  const handleCopyCode = () => {
    if (!lastOrderCode) return;
    navigator.clipboard.writeText(lastOrderCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // نسخ رقم التحويل للحافظة
  const handleCopyPhone = () => {
    navigator.clipboard.writeText(PAYMENT_PHONE);
    setIsPhoneCopied(true);
    setTimeout(() => setIsPhoneCopied(false), 2000);
  };

  // حساب الأسعار والشحن (سعر البوكس ثابت + شحن مجاني لبوكسين فأكثر)
  const subtotal = BASE_PRICE * formData.quantity;
  const isFreeShipping = formData.quantity >= 2;
  const baseShippingForMethod =
    formData.payment === "Online" ? ONLINE_SHIPPING_COST : COD_SHIPPING_COST;
  const currentShippingCost = isFreeShipping ? 0 : baseShippingForMethod;

  const totalSaved = isFreeShipping
    ? COD_SHIPPING_COST
    : formData.payment === "Online"
      ? COD_SHIPPING_COST - ONLINE_SHIPPING_COST
      : 0;

  const finalTotal = subtotal + currentShippingCost;

  // رابط واتساب جاهز بالرسالة وكود الطلب
  const whatsappMessage = encodeURIComponent(
    `أهلاً Daileme، تم تحويل مبلغ ${finalTotal} ج.م لتأكيد أوردر بوكس أثر.\nكود الطلب: ${lastOrderCode}\nمرفق صورة التحويل 👇`,
  );
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;

  // تحديث الحقول النصية مع تحويل الأرقام العربي لإنجليزي في خانة الموبايل
  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrorMsg("");

    if (name === "phone") {
      const normalizedPhone = value
        .replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d))
        .replace(/\D/g, "")
        .slice(0, 11);

      setFormData((prev) => ({ ...prev, phone: normalizedPhone }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // تغيير الكمية
  const setQuantity = (newQty) => {
    if (newQty < 1) return;
    setFormData((prev) => ({ ...prev, quantity: newQty }));
  };

  // خطوة 1: الضغط على "مراجعة البيانات" لفتح التيكت
  const handleOpenReview = (e) => {
    e.preventDefault();

    const phoneRegex = /^01[0125][0-9]{8}$/;
    const repeatedDigitsRegex = /^01[0125](\d)\1{7}$/;

    if (
      !phoneRegex.test(formData.phone) ||
      repeatedDigitsRegex.test(formData.phone)
    ) {
      setErrorMsg(
        "برجاء إدخال رقم موبايل مصري صحيح وحقيقي مكون من 11 رقم (مثال: 01012345678)",
      );
      return;
    }

    setErrorMsg("");
    setIsReviewOpen(true);
  };

  const generateOrderCode = () => {
    const chars = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
    let code = "";
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return `ATH-${code}`;
  };

  // خطوة 2: الضغط على "إتمام الطلب" من داخل التيكت وإرساله لجوجل شيتس
  const handleConfirmOrder = async () => {
    setIsSubmitting(true);
    setErrorMsg("");

    const generatedCode = generateOrderCode();

    const orderPayload = {
      secretKey: "DAILEME_ORDERS_2026_SECRET_KEY",
      botField: formData.botField,
      orderCode: generatedCode,
      product: "بوكس أثر",
      dateTime: new Date().toLocaleString("ar-EG"),
      name: formData.name.trim(),
      phone: formData.phone,
      governate: formData.governorate,
      address: formData.address.trim(),
      quantity: formData.quantity,
      payment: formData.payment,
      shippingFee: currentShippingCost,
      grandTotal: finalTotal,
    };

    try {
      const response = await fetch(SCRIPT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(orderPayload),
      });

      const result = await response.json();

      if (result.status === "success") {
        if (window.gtag) {
          window.gtag("event", "purchase", {
            transaction_id: generatedCode,
            value: finalTotal,
            currency: "EGP",
            shipping: currentShippingCost,
            items: [
              {
                item_id: "ATHAR-BOX-01",
                item_name: "بوكس أثر",
                price: BASE_PRICE,
                quantity: formData.quantity,
              },
            ],
          });
        }

        setLastOrderCode(generatedCode);
        setIsReviewOpen(false);
        setIsSubmitted(true);
      } else if (result.status === "duplicate") {
        setErrorMsg("تم تسجيل نفس هذا الطلب بالفعل منذ لحظات!");
        setIsReviewOpen(false);
      } else if (result.status === "blocked") {
        setErrorMsg("البيانات المدخلة غير صالحة، برجاء التأكد من رقم الهاتف.");
        setIsReviewOpen(false);
      } else {
        setErrorMsg("حدث خطأ أثناء تسجيل الطلب، برجاء المحاولة مرة أخرى.");
        setIsReviewOpen(false);
      }
    } catch {
      setErrorMsg("حدث خطأ في الاتصال، تأكد من الإنترنت وحاول مرة أخرى.");
      setIsReviewOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      id="order-now"
      dir="rtl"
      className="min-h-full w-full py-10 px-4 flex items-center justify-center relative"
    >
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl border border-[#8879B3]/20 p-6 sm:p-10">
        {isSubmitted ? (
          /* شاشة النجاح النهائية */
          <div className="text-center py-6 space-y-5 animate-fadeIn">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto text-3xl font-bold shadow-sm">
              ✓
            </div>
            <h3 className="text-2xl font-bold text-[#1E252D]">
              تم تسجيل طلبك بنجاح يا {formData.name.split(" ")[0]}! 🎉
            </h3>

            {/* كود الطلب + زرار النسخ */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-3 bg-[#FAF6F0] px-4 py-2 rounded-full border border-[#8879B3]/30">
                <span className="text-sm font-bold text-[#4C3B78]">
                  كود الطلب: <span dir="ltr">{lastOrderCode}</span>
                </span>
                <button
                  type="button"
                  onClick={handleCopyCode}
                  title="نسخ كود الطلب"
                  className="inline-flex items-center gap-1 text-xs font-semibold bg-white hover:bg-[#4C3B78] text-[#4C3B78] hover:text-white border border-[#8879B3]/30 px-2.5 py-1 rounded-full transition-all cursor-pointer"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-green-600" />
                      <span>تم النسخ</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>نسخ</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {formData.payment === "Online" ? (
              /* كارت تعليمات التحويل الأونلاين + زرار واتساب */
              <div className="bg-[#FAF6F0] p-5 rounded-2xl max-w-md mx-auto text-sm text-[#1E252D] border-2 border-[#4C3B78]/25 space-y-4">
                <div className="space-y-1">
                  <p className="text-gray-600">الإجمالي المطلوب تحويله:</p>
                  <p className="font-black text-2xl text-[#4C3B78]">
                    {finalTotal} ج.م
                  </p>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-gray-200 space-y-2">
                  <p className="text-xs text-gray-500">
                    حوّل المبلغ على محفظة إلكترونية أو إنستا باي على الرقم:
                  </p>
                  <div className="flex items-center justify-center gap-2.5">
                    <span
                      className="font-black text-lg tracking-wider text-[#1E252D]"
                      dir="ltr"
                    >
                      {PAYMENT_PHONE}
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyPhone}
                      className="inline-flex items-center gap-1 text-xs font-bold bg-[#FAF6F0] hover:bg-[#4C3B78] text-[#4C3B78] hover:text-white border border-[#8879B3]/30 px-3 py-1.5 rounded-lg transition-all cursor-pointer"
                    >
                      {isPhoneCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-green-600" />
                          <span>تم النسخ</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>نسخ الرقم</span>
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-xs font-semibold text-[#4C3B78]">
                    الرقم مسجل باسم: {PAYMENT_RECIPIENT}
                  </p>
                </div>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold text-sm py-3.5 px-5 rounded-xl shadow-md transition-all"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>ابعت سكرين التحويل على واتساب لتأكيد الشحن</span>
                </a>
              </div>
            ) : (
              /* ملخص الدفع عند الاستلام */
              <>
                <p className="text-gray-600 max-w-md mx-auto leading-relaxed text-sm">
                  تم تسجيل طلبك ({formData.quantity} بوكس أثر)، وهنتواصل معاك
                  على رقم{" "}
                  <span className="font-bold text-[#4C3B78]" dir="ltr">
                    {formData.phone}
                  </span>{" "}
                  لتأكيد موعد التوصيل.
                </p>
                <div className="bg-[#FAF6F0] p-4 rounded-2xl max-w-sm mx-auto text-sm text-[#1E252D] border border-[#8879B3]/20 space-y-1">
                  <p>
                    الإجمالي المطلوب عند الاستلام:{" "}
                    <span className="font-black text-lg text-[#4C3B78]">
                      {finalTotal} ج.م
                    </span>
                  </p>
                  <p className="text-xs text-gray-500">
                    طريقة الدفع: الدفع عند الاستلام
                  </p>
                </div>
              </>
            )}

            <button
              onClick={() => {
                setIsSubmitted(false);
                setIsCopied(false);
                setIsPhoneCopied(false);
                setFormData({
                  name: "",
                  phone: "",
                  governorate: "",
                  address: "",
                  quantity: 1,
                  payment: "COD",
                  botField: "",
                });
              }}
              className="text-sm text-[#8879B3] underline hover:text-[#4C3B78] pt-2 cursor-pointer"
            >
              تسجيل طلب جديد
            </button>
          </div>
        ) : (
          /* فورم إدخال البيانات + كارت الملخص الجانبي */
          <>
            <div className="text-center mb-8">
              <h2 className="text-[#1E252D] text-2xl sm:text-3xl font-bold">
                احجز نسختك الآن من{" "}
                <span className="font-black text-[#4C3B78]">أثر</span>
              </h2>
              <p className="text-gray-500 text-sm mt-2">
                شحن مجاني عند طلب بوكسين فأكثر 🚚✨
              </p>
            </div>

            <BatchStockCounter scriptUrl={SCRIPT_URL} />

            <form
              onSubmit={handleOpenReview}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start"
            >
              {/* العمود الأول: حقول إدخال البيانات */}
              <div className="lg:col-span-7 space-y-6">
                {/* حقل مصيدة البوتات المخفي (Honeypot) */}
                <input
                  type="text"
                  name="botField"
                  value={formData.botField}
                  onChange={handleChange}
                  className="hidden"
                  tabIndex="-1"
                  autoComplete="off"
                />

                {/* 1. اختيار الكمية (زرارين سريعين + عداد حر) */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-[#1E252D] block">
                    اختر الباقة أو حدد الكمية:
                  </label>

                  {/* زرارين الاختيار السريع (بوكس 1 vs بوكسين) */}
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setQuantity(1)}
                      className={`text-right p-3.5 rounded-2xl border-2 transition-all cursor-pointer ${
                        formData.quantity === 1
                          ? "border-[#4C3B78] bg-[#FAF6F0] shadow-xs"
                          : "border-gray-200 bg-white hover:border-[#8879B3]/60"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-[#1E252D]">
                          بوكس واحد
                        </span>
                        <span
                          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                            formData.quantity === 1
                              ? "border-[#4C3B78]"
                              : "border-gray-300"
                          }`}
                        >
                          {formData.quantity === 1 && (
                            <span className="w-2 h-2 rounded-full bg-[#4C3B78]" />
                          )}
                        </span>
                      </div>
                      <p className="font-black text-lg text-[#4C3B78] mt-1">
                        {BASE_PRICE} ج.م
                      </p>
                      <p className="text-[11px] text-gray-500 mt-0.5">
                        + مصاريف الشحن
                      </p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setQuantity(2)}
                      className={`relative text-right p-3.5 rounded-2xl border-2 transition-all cursor-pointer ${
                        formData.quantity === 2
                          ? "border-[#4C3B78] bg-[#FAF6F0] shadow-xs"
                          : "border-gray-200 bg-white hover:border-[#8879B3]/60"
                      }`}
                    >
                      <span className="absolute -top-2.5 left-3 bg-green-600 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-xs">
                        شحن مجاني 🎉
                      </span>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-[#1E252D]">
                          بوكسين (2)
                        </span>
                        <span
                          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                            formData.quantity === 2
                              ? "border-[#4C3B78]"
                              : "border-gray-300"
                          }`}
                        >
                          {formData.quantity === 2 && (
                            <span className="w-2 h-2 rounded-full bg-[#4C3B78]" />
                          )}
                        </span>
                      </div>
                      <p className="font-black text-lg text-[#4C3B78] mt-1">
                        {BASE_PRICE * 2} ج.م
                      </p>
                      <p className="text-[11px] font-semibold text-green-700 mt-0.5">
                        توفير {COD_SHIPPING_COST} ج.م شحن
                      </p>
                    </button>
                  </div>

                  {/* عداد الكمية الحر */}
                  <div className="flex items-center justify-between bg-[#FAF6F0] px-4 py-3 rounded-2xl border border-[#8879B3]/20">
                    <div className="text-sm flex flex-wrap items-center gap-1.5">
                      <span className="font-semibold text-[#1E252D]">
                        الكمية المختارة:
                      </span>
                      {totalSaved > 0 && (
                        <span className="text-xs bg-green-100 text-green-700 font-bold px-2.5 py-0.5 rounded-full">
                          وفرت {totalSaved} ج.م
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setQuantity(formData.quantity - 1)}
                        disabled={formData.quantity <= 1}
                        className="w-8 h-8 rounded-lg bg-white border border-gray-300 font-bold text-lg flex items-center justify-center hover:bg-gray-100 disabled:opacity-40 cursor-pointer"
                      >
                        -
                      </button>
                      <span className="font-black text-lg text-[#4C3B78] w-6 text-center">
                        {formData.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQuantity(formData.quantity + 1)}
                        className="w-8 h-8 rounded-lg bg-[#4C3B78] text-white font-bold text-lg flex items-center justify-center hover:bg-[#3a2c5e] cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* 2. الاسم ورقم الموبايل */}
                <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
                  <OrderInput
                    formDataItem={formData.name}
                    handleChange={handleChange}
                    label={"الاسم كامل:"}
                    placeholder="محمد أكرم عبدالمجيد"
                    id="name"
                    inputMode="text"
                    autoComplete="name"
                  />
                  <OrderInput
                    formDataItem={formData.phone}
                    handleChange={handleChange}
                    label="رقم الموبايل (عليه واتساب):"
                    placeholder="01012345678"
                    id="phone"
                    inputMode="numeric"
                    autoComplete="tel"
                  />
                </div>

                {/* 3. المحافظة والعنوان */}
                <div className="grid sm:grid-cols-3 grid-cols-1 gap-4">
                  <div className="flex flex-col gap-1.5 sm:col-span-1">
                    <label
                      htmlFor="governorate"
                      className="text-sm font-semibold text-[#1E252D]"
                    >
                      المحافظة:
                    </label>
                    <select
                      id="governorate"
                      name="governorate"
                      translate="no"
                      required
                      value={formData.governorate}
                      onChange={handleChange}
                      className="border border-gray-300 focus:border-[#4C3B78] focus:ring-2 focus:ring-[#4C3B78]/20 bg-[#FAF6F0]/50 outline-none rounded-xl p-3 text-[#1E252D] transition-all"
                    >
                      <option value="" disabled>
                        اختر المحافظة...
                      </option>
                      {GOVERNORATES.map((gov) => (
                        <option key={gov} value={gov}>
                          {gov}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5 sm:col-span-2">
                    <label
                      htmlFor="address"
                      className="text-sm font-semibold text-[#1E252D]"
                    >
                      العنوان بالتفصيل:
                    </label>
                    <input
                      id="address"
                      name="address"
                      type="text"
                      required
                      placeholder="اسم الشارع، رقم العمارة، علامة مميزة..."
                      autoComplete="street-address"
                      value={formData.address}
                      onChange={handleChange}
                      className="border border-gray-300 focus:border-[#4C3B78] focus:ring-2 focus:ring-[#4C3B78]/20 bg-[#FAF6F0]/50 outline-none rounded-xl p-3 text-[#1E252D] transition-all"
                    />
                  </div>
                </div>

                {/* 4. طريقة الدفع (عند الاستلام vs أونلاين) */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-[#1E252D] block">
                    طريقة الدفع:
                  </label>
                  <div className="grid sm:grid-cols-2 grid-cols-1 gap-3">
                    {/* خيار الدفع عند الاستلام COD */}
                    <label
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, payment: "COD" }))
                      }
                      className={`cursor-pointer border-2 rounded-2xl p-3.5 flex items-center gap-3 transition-all ${
                        formData.payment === "COD"
                          ? "border-[#4C3B78] bg-[#FAF6F0] shadow-xs"
                          : "border-gray-200 hover:border-[#8879B3]/60"
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value="COD"
                        checked={formData.payment === "COD"}
                        onChange={handleChange}
                        className="accent-[#4C3B78] w-4 h-4 shrink-0"
                      />
                      <div>
                        <p className="font-bold text-[#1E252D] text-sm">
                          الدفع عند الاستلام (COD)
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          الشحن{" "}
                          {isFreeShipping
                            ? "مجاني"
                            : `${COD_SHIPPING_COST} ج.م`}
                        </p>
                      </div>
                    </label>

                    {/* خيار الدفع أونلاين Online */}
                    <label
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, payment: "Online" }))
                      }
                      className={`relative cursor-pointer border-2 rounded-2xl p-3.5 flex items-center gap-3 transition-all ${
                        formData.payment === "Online"
                          ? "border-emerald-600 bg-emerald-50/70 shadow-sm"
                          : "border-emerald-300/80 bg-emerald-50/30 hover:border-emerald-500"
                      }`}
                    >
                      {!isFreeShipping && (
                        <span className="absolute -top-2.5 left-3 bg-emerald-600 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-xs">
                          خصم 25% على الشحن
                        </span>
                      )}
                      <input
                        type="radio"
                        name="payment"
                        value="Online"
                        checked={formData.payment === "Online"}
                        onChange={handleChange}
                        className="accent-emerald-600 w-4 h-4 shrink-0"
                      />
                      <div>
                        <p className="font-bold text-[#1E252D] text-sm">
                          دفع أونلاين (فودافون كاش / إنستا باي)
                        </p>
                        <p className="text-xs font-semibold text-emerald-700 mt-0.5">
                          {isFreeShipping ? (
                            "الشحن مجاني"
                          ) : (
                            <>
                              الشحن {ONLINE_SHIPPING_COST} ج.م{" "}
                              <span className="text-gray-400 line-through font-normal">
                                بدلاً من {COD_SHIPPING_COST} ج.م
                              </span>
                            </>
                          )}
                        </p>
                      </div>
                    </label>
                  </div>
                </div>

                {errorMsg && (
                  <p className="text-red-600 bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-center font-medium">
                    {errorMsg}
                  </p>
                )}
              </div>

              {/* العمود الثاني: كارت ملخص الطلب الجانبي (Sticky على الديسكتوب) */}
              <div className="lg:col-span-5 lg:sticky lg:top-6">
                <div className="bg-[#FAF6F0] rounded-2xl p-5 sm:p-6 border border-[#8879B3]/25 space-y-5">
                  <div className="flex items-center justify-between border-b border-[#8879B3]/20 pb-3.5">
                    <h3 className="font-extrabold text-base text-[#1E252D]">
                      ملخص الطلب
                    </h3>
                    <span className="text-xs font-bold text-[#4C3B78] bg-white px-2.5 py-1 rounded-full border border-[#8879B3]/20">
                      {formData.quantity} بوكس أثر
                    </span>
                  </div>

                  {/* تفاصيل السعر */}
                  <div className="space-y-3 text-sm text-[#1E252D]">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">
                        سعر {formData.quantity} بوكس:
                      </span>
                      <span className="font-bold">{subtotal} ج.م</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">مصاريف الشحن:</span>
                      <div>
                        {isFreeShipping ? (
                          <span className="font-bold text-green-600">
                            مجاني 🎉{" "}
                            <span className="text-xs text-gray-400 line-through font-normal">
                              {COD_SHIPPING_COST} ج.م
                            </span>
                          </span>
                        ) : formData.payment === "Online" ? (
                          <span className="font-bold text-emerald-700">
                            {ONLINE_SHIPPING_COST} ج.م{" "}
                            <span className="text-xs text-gray-400 line-through font-normal">
                              {COD_SHIPPING_COST} ج.م
                            </span>
                          </span>
                        ) : (
                          <span className="font-bold">
                            {COD_SHIPPING_COST} ج.م
                          </span>
                        )}
                      </div>
                    </div>

                    {totalSaved > 0 && (
                      <div className="flex items-center justify-between bg-green-100/80 text-green-800 px-3 py-2 rounded-xl text-xs font-bold">
                        <span>إجمالي الوفر:</span>
                        <span>{totalSaved} ج.م 🎉</span>
                      </div>
                    )}
                  </div>

                  {/* الإجمالي النهائي */}
                  <div className="border-t border-dashed border-[#8879B3]/40 pt-4 flex items-center justify-between">
                    <span className="font-bold text-[#1E252D] text-base">
                      الإجمالي النهائي:
                    </span>
                    <span className="font-black text-2xl text-[#4C3B78]">
                      {finalTotal} ج.م
                    </span>
                  </div>

                  {/* زرار مراجعة البيانات */}
                  <button
                    type="submit"
                    className="w-full bg-[#F49474] hover:bg-[#e58261] active:scale-[0.98] text-white font-bold text-lg py-3.5 px-6 rounded-xl shadow-md transition-all cursor-pointer"
                  >
                    مراجعة البيانات 🧾
                  </button>

                  <p className="text-[11px] text-center text-gray-500">
                    الشحن خلال 2–4 أيام عمل لجميع المحافظات 🚚
                  </p>
                </div>
              </div>
            </form>
          </>
        )}
      </div>

      {/* ========================================================= */}
      {/* بوب-أب التيكت (Ticket Modal) بأنيميشن ظهور واختفاء سلس */}
      {/* ========================================================= */}
      <div
        onClick={() => !isSubmitting && setIsReviewOpen(false)}
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-all duration-300 ${
          isReviewOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* جسم التيكت */}
        <div
          onClick={(e) => e.stopPropagation()}
          className={`relative w-full max-w-md bg-[#FAF6F0] rounded-3xl shadow-2xl overflow-hidden border border-[#8879B3]/30 transition-all duration-300 transform ${
            isReviewOpen
              ? "scale-100 translate-y-0 opacity-100"
              : "scale-90 translate-y-8 opacity-0"
          }`}
        >
          {/* رأس التيكت */}
          <div className="bg-[#4C3B78] text-white p-5 text-center relative">
            <h3 className="text-xl font-black tracking-wide">مراجعة الطلب</h3>
            <p className="text-xs text-purple-200 mt-1">
              تأكد من صحة بياناتك قبل إتمام الطلب 📦
            </p>
          </div>

          {/* بيانات العميل */}
          <div className="p-6 space-y-3 text-sm text-[#1E252D]">
            <div className="flex justify-between border-b border-gray-200/80 pb-2">
              <span className="text-gray-500">الاسم:</span>
              <span className="font-bold">{formData.name}</span>
            </div>
            <div className="flex justify-between border-b border-gray-200/80 pb-2">
              <span className="text-gray-500">رقم الموبايل:</span>
              <span className="font-bold" dir="ltr">
                {formData.phone}
              </span>
            </div>
            <div className="flex justify-between border-b border-gray-200/80 pb-2">
              <span className="text-gray-500">المحافظة:</span>
              <span className="font-bold">{formData.governorate}</span>
            </div>
            <div className="flex flex-col gap-1 border-b border-gray-200/80 pb-2">
              <span className="text-gray-500">العنوان بالتفصيل:</span>
              <span className="font-semibold text-right leading-relaxed bg-white p-2 rounded-lg border border-gray-200">
                {formData.address}
              </span>
            </div>
            <div className="flex justify-between pt-1">
              <span className="text-gray-500">طريقة الدفع:</span>
              <span className="font-bold text-[#4C3B78]">
                {formData.payment === "COD"
                  ? "الدفع عند الاستلام 💵"
                  : "أونلاين (فودافون كاش / إنستا باي) 📱"}
              </span>
            </div>
          </div>

          {/* فاصل التيكت المخرم */}
          <div className="relative flex items-center justify-between my-1">
            <div className="w-full border-t-2 border-dashed border-[#8879B3]/40 mx-2" />
          </div>

          {/* تفاصيل الحساب في التيكت */}
          <div className="p-6 pt-4 space-y-2.5 text-sm text-[#1E252D]">
            <div className="flex justify-between">
              <span className="text-gray-600">الكمية:</span>
              <span className="font-bold">{formData.quantity} بوكس أثر</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">سعر البوكس:</span>
              <span className="font-bold">{BASE_PRICE} ج.م</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">مصاريف الشحن:</span>
              {isFreeShipping ? (
                <span className="font-bold text-green-600">
                  مجاني 🎉{" "}
                  <span className="text-xs text-gray-400 line-through font-normal">
                    {COD_SHIPPING_COST} ج.م
                  </span>
                </span>
              ) : formData.payment === "Online" ? (
                <span className="font-bold text-emerald-700">
                  {ONLINE_SHIPPING_COST} ج.م{" "}
                  <span className="text-xs text-gray-400 line-through font-normal">
                    {COD_SHIPPING_COST} ج.م
                  </span>
                </span>
              ) : (
                <span className="font-bold">{COD_SHIPPING_COST} ج.م</span>
              )}
            </div>

            {totalSaved > 0 && (
              <div className="flex justify-between text-green-700 bg-green-50 px-2.5 py-1.5 rounded-lg text-xs font-bold">
                <span>إجمالي الوفر في العرض:</span>
                <span>{totalSaved} ج.م 🎉</span>
              </div>
            )}

            <div className="flex justify-between items-center pt-3 border-t border-gray-300 text-base">
              <span className="font-black text-[#1E252D]">
                {formData.payment === "COD"
                  ? "المطلوب عند الاستلام:"
                  : "الإجمالي المطلوب تحويله:"}
              </span>
              <span className="font-black text-2xl text-[#4C3B78]">
                {finalTotal} ج.م
              </span>
            </div>

            {/* أزرار التيكت (إتمام الطلب أو تعديل) */}
            <div className="pt-4 flex flex-col gap-2.5">
              <button
                type="button"
                onClick={handleConfirmOrder}
                disabled={isSubmitting}
                className="w-full bg-[#F49474] hover:bg-[#e58261] active:scale-[0.98] disabled:opacity-60 text-white font-bold text-base py-3.5 rounded-xl shadow-md transition-all cursor-pointer"
              >
                {isSubmitting
                  ? "جاري تسجيل طلبك..."
                  : "البيانات صحيحة، إتمام الطلب ✓"}
              </button>

              <button
                type="button"
                onClick={() => setIsReviewOpen(false)}
                disabled={isSubmitting}
                className="w-full bg-white hover:bg-gray-100 text-gray-600 font-semibold text-sm py-2.5 rounded-xl border border-gray-300 transition-all cursor-pointer"
              >
                تعديل البيانات ✎
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
