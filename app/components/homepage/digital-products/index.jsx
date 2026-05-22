"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  FiExternalLink, FiShoppingCart, FiZap,
  FiClock, FiPlay, FiArrowUpRight, FiCheck,
} from "react-icons/fi";
import { productsData } from "@/utils/data/products-data";
import SectionHeading from "../../helper/section-heading";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";

/* ── tilt + glow hook ── */
function useTiltGlow() {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({});
  const [glow, setGlow] = useState({ x: 50, y: 50, visible: false });

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left, y = e.clientY - r.top;
    setTilt({
      transform: `perspective(1200px) rotateX(${-((y - r.height / 2) / r.height) * 6}deg) rotateY(${((x - r.width / 2) / r.width) * 6}deg) scale3d(1.008,1.008,1.008)`,
      transition: "transform 0.08s linear",
    });
    setGlow({ x: (x / r.width) * 100, y: (y / r.height) * 100, visible: true });
  };
  const onLeave = () => {
    setTilt({ transform: "perspective(1200px) rotateX(0) rotateY(0) scale3d(1,1,1)", transition: "transform 0.6s cubic-bezier(0.23,1,0.32,1)" });
    setGlow(p => ({ ...p, visible: false }));
  };

  return { ref, tilt, glow, onMove, onLeave };
}

/* ── HERO CARD (featured product, full width) ── */
function HeroCard({ product }) {
  const { ref, tilt, glow, onMove, onLeave } = useTiltGlow();
  const { accent, glow: glowColor } = product;

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={tilt}
      className="group relative rounded-3xl overflow-hidden w-full"
    >
      {/* background */}
      <div className="absolute inset-0 rounded-3xl"
        style={{
          background: `radial-gradient(ellipse at 70% 50%, ${accent}18 0%, transparent 65%), var(--card)`,
          border: `1px solid ${accent}30`,
        }}
      />

      {/* cursor glow */}
      <div className="absolute inset-0 pointer-events-none z-0 rounded-3xl transition-opacity duration-300"
        style={{ opacity: glow.visible ? 1 : 0, background: `radial-gradient(circle at ${glow.x}% ${glow.y}%, ${glowColor} 0%, transparent 55%)` }}
      />

      {/* top shine line */}
      <div className="absolute top-0 inset-x-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent 0%, ${accent}70 40%, ${accent}70 60%, transparent 100%)` }}
      />

      <div className="relative z-10 flex flex-col lg:flex-row gap-0 min-h-[380px]">

        {/* ── Left: content ── */}
        <div className="flex flex-col justify-between p-8 sm:p-10 lg:w-[46%] gap-6">

          {/* top badges */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase"
              style={{ background: `${accent}20`, color: accent, border: `1px solid ${accent}40` }}>
              ⭐ Featured
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase border border-[var(--line)] text-[var(--ink-3)]">
              {product.badge}
            </span>
          </div>

          {/* name + tagline */}
          <div>
            <h3 className="text-4xl sm:text-5xl font-black tracking-tight leading-none text-[var(--ink)]">
              {product.name}
            </h3>
            <p className="mt-2 text-sm font-semibold" style={{ color: accent }}>
              {product.tagline}
            </p>
            <p className="mt-3 text-[var(--ink-2)] text-sm leading-relaxed max-w-sm">
              {product.description}
            </p>
          </div>

          {/* feature checklist */}
          <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
            {product.features.slice(0, 6).map((f, i) => (
              <li key={i} className="flex items-center gap-2 text-[11px] text-[var(--ink-2)]">
                <FiCheck size={11} style={{ color: accent, flexShrink: 0 }} />
                {f}
              </li>
            ))}
          </ul>

          {/* price + CTA */}
          <div className="flex items-center gap-3 flex-wrap">
            {product.price && (
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black" style={{ color: accent }}>${product.price}</span>
                <span className="text-xs text-[var(--ink-3)]">one-time</span>
              </div>
            )}
            <div className="flex items-center gap-2 ml-auto sm:ml-0">
              {product.demo && (
                <Link href={product.demo} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold border transition-all duration-200 hover:bg-[var(--surface-2)]"
                  style={{ color: `${accent}cc`, borderColor: `${accent}30` }}>
                  <FiPlay size={11} /> Preview
                </Link>
              )}
              <Link href={product.link} target="_blank" rel="noopener noreferrer"
                className="group/btn flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black tracking-widest uppercase transition-all duration-300"
                style={{ background: `linear-gradient(135deg, ${accent}, ${accent}99)`, color: "#0c0c0e", boxShadow: `0 4px 24px -4px ${accent}70` }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 8px 32px -4px ${accent}90`; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = `0 4px 24px -4px ${accent}70`; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <FiShoppingCart size={13} />
                {product.price ? `Buy $${product.price}` : "Get it now"}
                <FiArrowUpRight size={12} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* tech stack */}
          <div className="flex flex-wrap gap-1.5">
            {product.tags.map((t, i) => (
              <span key={i} className="text-[9px] font-mono px-2 py-0.5 rounded border text-[var(--ink-3)]"
                style={{ borderColor: "var(--line)", background: "var(--surface-2)" }}>
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* ── Right: image ── */}
        <div className="relative lg:flex-1 min-h-[240px] lg:min-h-0 overflow-hidden rounded-b-3xl lg:rounded-b-none lg:rounded-r-3xl">
          {/* gradient fade on left edge (desktop) */}
          <div className="absolute inset-y-0 left-0 w-20 z-10 hidden lg:block"
            style={{ background: `linear-gradient(90deg, var(--card), transparent)` }} />
          {/* gradient fade on top (mobile) */}
          <div className="absolute inset-x-0 top-0 h-16 z-10 lg:hidden"
            style={{ background: "linear-gradient(180deg, var(--card), transparent)" }} />

          {product.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={`${BASE}${product.image}`}
              alt={product.name}
              className="w-full h-full object-cover object-left-top transition-transform duration-700 group-hover:scale-[1.03]"
              style={{ minHeight: "240px" }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center"
              style={{ background: `${accent}08` }}>
              <FiZap size={48} style={{ color: `${accent}30` }} />
            </div>
          )}

          {/* bottom right glow bleed */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: `radial-gradient(ellipse at 80% 80%, ${accent}20 0%, transparent 60%)` }} />
        </div>
      </div>

      {/* hover border */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ boxShadow: `0 0 0 1px ${accent}50, 0 20px 60px -12px ${accent}30` }} />
    </div>
  );
}

/* ── COMPACT CARD (bottom row) ── */
function CompactCard({ product }) {
  const { ref, tilt, glow, onMove, onLeave } = useTiltGlow();
  const { accent, glow: glowColor, comingSoon } = product;

  return (
    <div
      ref={ref}
      onMouseMove={!comingSoon ? onMove : undefined}
      onMouseLeave={!comingSoon ? onLeave : undefined}
      style={!comingSoon ? tilt : {}}
      className="group relative rounded-2xl overflow-hidden flex flex-col h-full"
    >
      {/* bg */}
      <div className="absolute inset-0 rounded-2xl"
        style={{
          background: comingSoon ? "var(--surface)" : "var(--card)",
          border: `1px solid ${comingSoon ? "var(--line-2)" : "var(--line)"}`,
        }}
      />

      {/* cursor glow */}
      {!comingSoon && (
        <div className="absolute inset-0 pointer-events-none z-0 rounded-2xl transition-opacity duration-300"
          style={{ opacity: glow.visible ? 1 : 0, background: `radial-gradient(circle at ${glow.x}% ${glow.y}%, ${glowColor} 0%, transparent 60%)` }} />
      )}

      {/* top bar */}
      <div className="h-[2px] w-full relative z-10 flex-shrink-0"
        style={{ background: comingSoon ? `linear-gradient(90deg, ${accent}35, transparent)` : `linear-gradient(90deg, ${accent}, transparent 70%)` }} />

      {/* image */}
      {product.image && (
        <div className="relative z-10 overflow-hidden flex-shrink-0" style={{ aspectRatio: "16/8" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${BASE}${product.image}`}
            alt={product.name}
            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            style={{ filter: comingSoon ? "grayscale(0.3) brightness(0.85)" : "none" }}
          />
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "linear-gradient(180deg, transparent 55%, var(--card) 100%)" }} />
          {comingSoon && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="px-4 py-1.5 rounded-full text-[9px] font-black tracking-widest uppercase border border-dashed backdrop-blur-sm"
                style={{ color: accent, borderColor: `${accent}50`, background: `${accent}18` }}>
                Coming Soon
              </span>
            </div>
          )}
        </div>
      )}

      {/* content */}
      <div className={`relative z-10 flex flex-col flex-1 p-5 gap-4 ${comingSoon ? "opacity-75" : ""}`}>
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-lg font-black tracking-tight text-[var(--ink)]">{product.name}</h3>
            <p className="text-[10px] font-semibold mt-0.5" style={{ color: accent }}>{product.tagline}</p>
          </div>
          <span className="text-[8px] font-black tracking-widest uppercase px-2.5 py-1 rounded-full border flex-shrink-0"
            style={{ color: accent, background: `${accent}10`, borderColor: `${accent}28` }}>
            {product.badge}
          </span>
        </div>

        <p className="text-[var(--ink-2)] text-xs leading-relaxed line-clamp-3">{product.description}</p>

        {/* feature list */}
        <ul className="space-y-1.5">
          {product.features.slice(0, 4).map((f, i) => (
            <li key={i} className="flex items-center gap-2 text-[11px] text-[var(--ink-2)]">
              <FiCheck size={10} style={{ color: comingSoon ? `${accent}60` : accent, flexShrink: 0 }} />
              {f}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="mt-auto pt-4 border-t border-[var(--line)] flex items-center gap-3">
          {product.price && !comingSoon && (
            <span className="text-xl font-black" style={{ color: accent }}>${product.price}</span>
          )}

          {comingSoon ? (
            <div className="ml-auto flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black tracking-widest uppercase border border-dashed cursor-not-allowed"
              style={{ color: `${accent}60`, borderColor: `${accent}25` }}>
              <FiClock size={11} /> Notify me
            </div>
          ) : !product.link ? (
            /* preview-only — no Gumroad listing yet */
            <div className="flex items-center gap-2 ml-auto">
              {product.demo && (
                <Link href={product.demo} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[10px] font-black tracking-widest uppercase transition-all duration-300 border"
                  style={{ color: accent, borderColor: `${accent}40`, background: `${accent}10` }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  <FiPlay size={10} /> Live Preview
                </Link>
              )}
              <span className="text-[9px] text-[var(--ink-3)] border border-dashed border-[var(--line)] px-2.5 py-1.5 rounded-lg">
                Coming to Gumroad
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2 ml-auto">
              {product.demo && (
                <Link href={product.demo} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-[10px] font-bold border transition-all hover:bg-[var(--surface-2)]"
                  style={{ color: `${accent}bb`, borderColor: `${accent}25` }}>
                  <FiPlay size={10} /> Live
                </Link>
              )}
              <Link href={product.link} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[10px] font-black tracking-widest uppercase transition-all duration-300"
                style={{ background: `linear-gradient(135deg, ${accent}dd, ${accent}88)`, color: "#0c0c0e", boxShadow: `0 3px 16px -3px ${accent}60` }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = `0 6px 20px -4px ${accent}80`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = `0 3px 16px -3px ${accent}60`; }}
              >
                <FiShoppingCart size={11} />
                {product.price ? `Buy $${product.price}` : "Get it"}
              </Link>
            </div>
          )}
        </div>
      </div>

      {!comingSoon && (
        <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ boxShadow: `0 0 0 1px ${accent}40, 0 12px 40px -8px ${accent}25` }} />
      )}
    </div>
  );
}

/* ── MAIN SECTION ── */
export default function DigitalProducts() {
  const [featured, ...rest] = productsData;

  return (
    <section id="products" className="relative z-50 my-12 lg:my-24">

      {/* ambient orbs */}
      <div className="pointer-events-none absolute -top-32 right-0 w-[500px] h-[500px] rounded-full opacity-[0.04] blur-3xl"
        style={{ background: "radial-gradient(circle, #16f2b3, transparent 70%)" }} />
      <div className="pointer-events-none absolute bottom-0 left-1/4 w-80 h-80 rounded-full opacity-[0.03] blur-3xl"
        style={{ background: "radial-gradient(circle, #7c3aed, transparent 70%)" }} />

      {/* ── Section header ── */}
      <div className="mb-12 flex items-end justify-between gap-4 border-b border-[var(--line)] pb-4">
        <SectionHeading eyebrow="What I build &amp; sell" plain="Digital" gradient="Products" />
        <Link href="https://harshitg5290.gumroad.com" target="_blank" rel="noopener noreferrer"
          className="group hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border border-[var(--line)] text-[var(--ink-2)] hover:text-[#16f2b3] hover:border-[#16f2b3]/40 transition-all duration-200 flex-shrink-0 mb-1">
          My store
          <FiArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Link>
      </div>

      {/* ── Hero featured card ── */}
      <HeroCard product={featured} />

      {/* ── Bottom row ── */}
      {rest.length > 0 && (
        <div className={`mt-5 grid grid-cols-1 gap-5 ${rest.length === 1 ? "sm:grid-cols-1 max-w-xl" : "sm:grid-cols-2"}`}>
          {rest.map(p => <CompactCard key={p.id} product={p} />)}
        </div>
      )}

      {/* ── Store strip ── */}
      <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl px-6 py-4 border border-[var(--line)]"
        style={{ background: "var(--surface)" }}>
        <p className="text-[var(--ink-2)] text-sm">
          All products sold via <span className="text-[#16f2b3] font-semibold">Gumroad</span>
          <span className="text-[var(--ink-3)] mx-2">·</span>
          <span className="text-[var(--ink-3)] text-xs">Instant download · One-time payment · Lifetime updates</span>
        </p>
        <Link href="https://harshitg5290.gumroad.com" target="_blank" rel="noopener noreferrer"
          className="group flex items-center gap-2 shrink-0 px-5 py-2 rounded-xl text-xs font-bold tracking-widest uppercase border border-[#16f2b3]/30 text-[#16f2b3] hover:bg-[#16f2b3]/8 hover:border-[#16f2b3]/60 transition-all duration-200">
          Visit store
          <FiExternalLink size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Link>
      </div>
    </section>
  );
}
