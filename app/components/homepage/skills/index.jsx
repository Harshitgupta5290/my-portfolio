"use client";

import { useRef, useCallback, useState } from "react";
import { motion, useInView } from "framer-motion";
import { skillsData, SKILL_CATEGORIES } from "@/utils/data/skills";
import { skillsImage } from "@/utils/skill-image";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import { useLocale } from "@/app/context/locale-context";
import SectionHeading from "../../helper/section-heading";

const CAT_META = {
  'Backend':  { color: '#16f2b3', num: '01', desc: 'APIs, databases & server logic' },
  'Frontend': { color: '#a78bfa', num: '02', desc: 'Interfaces, components & UX' },
  'AI / ML':  { color: '#ec4899', num: '03', desc: 'Models, pipelines & data science' },
  'DevOps':   { color: '#f59e0b', num: '04', desc: 'Infrastructure, CI/CD & cloud' },
};

const grouped = Object.entries(CAT_META).map(([cat, meta]) => ({
  cat,
  ...meta,
  skills: skillsData.filter(s => SKILL_CATEGORIES[s] === cat),
}));

/* ── Skill pill inside a card ── */
function SkillPill({ skill, color, index, cardInView }) {
  const img = skillsImage(skill);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.75, y: 6 }}
      animate={cardInView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.22, delay: 0.25 + index * 0.03, ease: [0.22, 1, 0.36, 1] }}
      className="group/p flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg cursor-default transition-all duration-200"
      style={{
        background: `${color}0c`,
        border: `1px solid ${color}22`,
      }}
    >
      {img ? (
        <Image
          src={img.src} alt={skill} width={14} height={14} unoptimized
          className="object-contain flex-shrink-0 group-hover/p:scale-110 transition-transform duration-200"
          style={{ width: 14, height: 14 }}
        />
      ) : (
        <span className="text-[8px] font-black leading-none" style={{ color }}>{skill.slice(0, 2)}</span>
      )}
      <span className="text-white text-[11px] font-medium whitespace-nowrap leading-none">{skill}</span>
    </motion.div>
  );
}

/* ── 3D tilt card ── */
function CategoryCard({ cat, color, num, desc, skills, index }) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-60px' });
  const [glow, setGlow] = useState({ x: 50, y: 50, active: false });

  const onMouseMove = useCallback((e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setGlow({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
      active: true,
    });
  }, []);

  const onMouseLeave = useCallback(() => {
    setGlow(g => ({ ...g, active: false }));
  }, []);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 48 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className="group relative rounded-2xl overflow-hidden cursor-default h-full"
        style={{ border: `1px solid ${color}28`, background: 'var(--card)' }}
      >
        {/* Mouse-tracking radial spotlight */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 rounded-2xl"
          style={{
            opacity: glow.active ? 1 : 0,
            background: `radial-gradient(380px circle at ${glow.x}% ${glow.y}%, ${color}14, transparent 65%)`,
          }}
        />

        {/* Static top-left ambient glow */}
        <div
          className="absolute -top-12 -left-12 w-40 h-40 rounded-full pointer-events-none"
          style={{ background: `radial-gradient(circle, ${color}0e, transparent 70%)` }}
        />

        {/* Ghost number watermark */}
        <div
          className="absolute -bottom-6 -right-3 font-black leading-none select-none pointer-events-none"
          style={{ fontSize: '8.5rem', color: `${color}07`, fontVariantNumeric: 'tabular-nums' }}
        >
          {num}
        </div>

        {/* Corner brackets — appear on hover */}
        {[['top-3 left-3', 'border-t border-l', 'rounded-tl-sm'],
          ['top-3 right-3', 'border-t border-r', 'rounded-tr-sm'],
          ['bottom-3 left-3', 'border-b border-l', 'rounded-bl-sm'],
          ['bottom-3 right-3', 'border-b border-r', 'rounded-br-sm'],
        ].map(([pos, border, radius], i) => (
          <div
            key={i}
            className={`absolute ${pos} w-3.5 h-3.5 ${border} ${radius} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
            style={{ borderColor: `${color}60` }}
          />
        ))}

        {/* Top shimmer line */}
        <div
          className="absolute top-0 left-0 right-0 h-px pointer-events-none"
          style={{ background: `linear-gradient(to right, transparent, ${color}50, transparent)` }}
        />

        {/* Content */}
        <div className="relative z-10 p-6 flex flex-col gap-4 h-full">

          {/* Header row */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <span
                className="text-[9px] font-black tracking-[0.3em] uppercase block mb-1"
                style={{ color: `${color}70` }}
              >
                {num} ——
              </span>
              <h3 className="text-2xl font-extrabold text-white tracking-tight leading-none">
                {cat}
              </h3>
              <p className="text-[11px] text-[var(--ink-3)] mt-1.5 leading-relaxed">{desc}</p>
            </div>
            {/* Count badge */}
            <div
              className="flex-shrink-0 flex flex-col items-center justify-center w-12 h-12 rounded-xl border"
              style={{ borderColor: `${color}30`, background: `${color}0d` }}
            >
              <span className="text-xl font-extrabold leading-none" style={{ color }}>{skills.length}</span>
              <span className="text-[8px] font-mono text-[var(--ink-3)] mt-0.5">skills</span>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px" style={{ background: `linear-gradient(to right, ${color}40, transparent)` }} />

          {/* Skill pills */}
          <div className="flex flex-wrap gap-2 flex-1">
            {skills.map((skill, i) => (
              <SkillPill key={skill} skill={skill} color={color} index={i} cardInView={isInView} />
            ))}
          </div>
        </div>

        {/* Bottom glow bar */}
        <div
          className="absolute bottom-0 left-6 right-6 h-px opacity-60 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{ background: `linear-gradient(to right, transparent, ${color}60, transparent)` }}
        />
      </div>
    </motion.div>
  );
}

/* ── Main ── */
export default function Skills() {
  const { t } = useLocale();

  return (
    <div id="skills" className="relative z-50 border-t my-12 lg:my-24 border-[var(--line)]">
      {/* Section top line */}
      <div className="flex justify-center -translate-y-[1px]">
        <div className="w-3/4 h-[1px] bg-gradient-to-r from-transparent via-violet-500 to-transparent" />
      </div>

      <SectionHeading
        eyebrow="Tools &amp; technologies"
        plain="My"
        gradient={t("skills.heading")}
        subtitle={t("skills.subtitle")}
        className="mt-12 mb-10"
      />

      {/* 2 × 2 bento grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {grouped.map((item, i) => (
          <CategoryCard key={item.cat} {...item} index={i} />
        ))}
      </div>

      {/* Skill ticker */}
      <div className="relative mt-14 py-3 border-y border-[var(--line)] overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r from-[var(--bg)] to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l from-[var(--bg)] to-transparent pointer-events-none" />
        <Marquee gradient={false} speed={32} pauseOnHover>
          {skillsData.map((skill, i) => {
            const color = CAT_META[SKILL_CATEGORIES[skill]]?.color ?? '#16f2b3';
            const img = skillsImage(skill);
            return (
              <span key={i} className="mx-5 flex items-center gap-2">
                {img && (
                  <Image src={img.src} alt={skill} width={13} height={13} unoptimized
                    className="object-contain opacity-50" style={{ width: 13, height: 13 }} />
                )}
                <span className="text-[11px] font-medium" style={{ color: `${color}70` }}>{skill}</span>
              </span>
            );
          })}
        </Marquee>
      </div>

      {/* Tagline */}
      <div className="flex justify-center mt-8">
        <div className="flex items-center gap-3 px-6 py-3 rounded-full border border-[var(--line)] bg-[var(--card)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#16f2b3] animate-pulse" />
          <span className="text-[var(--ink-2)] text-xs font-mono tracking-wider">{t("skills.tagline")}</span>
        </div>
      </div>
    </div>
  );
}
