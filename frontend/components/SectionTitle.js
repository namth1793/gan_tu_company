export default function SectionTitle({ title, href = '#' }) {
  return (
    <div className="flex items-center justify-between border-b-2 border-[#271C1C] pb-1.5 mb-3">
      <h2 className="text-sm font-bold text-gray-800 uppercase flex items-center gap-2">
        <span className="w-1 h-5 bg-[#271C1C] rounded-sm inline-block flex-shrink-0"></span>
        {title}
      </h2>
      <a
        href={href}
        className="text-xs text-[#271C1C] hover:underline font-medium whitespace-nowrap ml-2"
      >
        Xem tất cả »
      </a>
    </div>
  );
}
