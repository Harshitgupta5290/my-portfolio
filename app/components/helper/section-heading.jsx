// Shared section heading used by every homepage section.
// eyebrow  — small uppercase label above the title
// plain    — white/ink portion of the h2
// gradient — cyan→violet gradient portion of the h2
// subtitle — optional muted paragraph below

export default function SectionHeading({ eyebrow, plain, gradient, subtitle, className = "" }) {
  return (
    <div className={className}>
      <span className="text-[9px] font-black tracking-[0.2em] uppercase text-[var(--ink-3)]">
        {eyebrow}
      </span>
      <div className="flex items-center mt-2 pb-3">
        <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-extrabold italic tracking-tighter">
          {plain && <span className="text-[var(--ink)]">{plain} </span>}
          <span className="bg-gradient-to-r from-[#16f2b3] to-violet-400 bg-clip-text text-transparent">
            {gradient}
          </span>
        </h2>
        <div className="ml-4 flex-1 h-px bg-gradient-to-r from-[#16f2b3]/30 to-transparent" />
      </div>
      {subtitle && (
        <p className="text-sm text-[var(--ink-2)] max-w-lg leading-relaxed mt-1">{subtitle}</p>
      )}
    </div>
  );
}
