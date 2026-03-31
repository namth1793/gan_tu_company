export default function SectionTitle({ title, href = '#' }) {
  return (
    <div className="flex items-center justify-between mb-3">
      <h2 className="flex items-center gap-2.5 text-sm font-black text-gray-900 uppercase tracking-wide">
        <span className="inline-flex w-1 self-stretch rounded-full" style={{ background: 'linear-gradient(to bottom, #271C1C, #c9a13b)', minHeight: '1.1rem' }} />
        <span className="border-b-2 border-[#271C1C] pb-0.5">{title}</span>
      </h2>
      <a
        href={href}
        className="text-[11px] text-[#271C1C] font-semibold flex items-center gap-1 hover:text-amber-600 transition-colors group"
      >
        Xem tất cả
        <span className="inline-block transition-transform group-hover:translate-x-0.5">›</span>
      </a>
    </div>
  );
}
