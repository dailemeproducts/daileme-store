export default function OrderInput({
  formDataItem,
  handleChange,
  label = "",
  placeholder = "",
  id = "",
  inputMode = "text",
  autoComplete = "",
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold text-[#1E252D]">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={inputMode}
        required
        placeholder={placeholder}
        autoComplete={autoComplete}
        value={formDataItem}
        onChange={handleChange}
        className="border border-gray-300 focus:border-[#4C3B78] focus:ring-2 focus:ring-[#4C3B78]/20 bg-[#FAF6F0]/50 outline-none rounded-xl p-3 text-[#1E252D] transition-all"
      />
    </div>
  );
}
