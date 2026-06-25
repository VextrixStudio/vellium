"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

/* ========================================================================== */
/* HELPERS                                                                    */
/* ========================================================================== */

function Icon({
  name,
  size = 18,
  filled = false,
  className = "",
}: {
  name: string;
  size?: number;
  filled?: boolean;
  className?: string;
}) {
  return (
    <span
      translate="no"
      className={`material-symbols-rounded notranslate ${filled ? "filled" : ""} ${className}`}
      style={{ fontSize: `${size}px` }}
    >
      {name}
    </span>
  );
}

/* ========================================================================== */
/* MAIN NAV                                                                   */
/* ========================================================================== */

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header className="sticky top-4 z-50 w-full px-4 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <nav
            className={`flex items-center justify-between rounded-full border px-3 py-2 transition-all duration-500 sm:px-4 sm:py-2.5 ${
              scrolled
                ? "border-white/50 bg-white/70 shadow-[0_12px_40px_rgba(56,106,32,0.12)] backdrop-blur-2xl"
                : "border-white/30 bg-white/40 shadow-[0_8px_32px_rgba(56,106,32,0.06)] backdrop-blur-xl"
            }`}
          >
            <Logo />

            <div className="hidden items-center gap-0.5 md:flex">
              <NavLink href="#product">Product</NavLink>
              <NavLink href="#features">Features</NavLink>
              <NavLink href="#how-it-works">How it works</NavLink>
              <NavLink href="#pricing">Pricing</NavLink>
              <NavLink href="#learn">Learn</NavLink>
            </div>

            <DesktopActions />
            <MobileToggle open={menuOpen} onToggle={() => setMenuOpen((v) => !v)} />
          </nav>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

/* ========================================================================== */
/* LOGO                                                                       */
/* ========================================================================== */

function Logo() {
  return (
    <Link
      href="/landing"
      className="group flex items-center gap-2 pl-1 sm:gap-2.5 sm:pl-2"
    >
      <div className="flex h-8 w-8 items-center justify-center rounded-2xl bg-gradient-to-br from-[#386A20] to-[#52B788] shadow-[0_4px_12px_rgba(56,106,32,0.35)] transition-transform group-hover:scale-105 group-hover:rotate-6">
        <Icon name="bolt" size={16} filled className="text-white" />
      </div>
      <span className="font-serif text-[18px] font-medium tracking-tight text-[#171D19]">
        Vellium
      </span>
    </Link>
  );
}


function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="rounded-full px-3.5 py-2 text-[13px] font-medium text-[#3F4943] transition-all hover:bg-white/60 hover:text-[#171D19]"
    >
      {children}
    </Link>
  );
}


function DesktopActions() {
  return (
    <div className="hidden items-center gap-1.5 pr-1 md:flex">
      <Link
        href="/auth/login"
        className="rounded-full px-4 py-2 text-[13px] font-medium text-[#171D19] transition-colors hover:text-[#386A20]"
      >
        Log in
      </Link>
      <Link
        href="/auth/register"
        className="group inline-flex items-center gap-1.5 rounded-full bg-[#171D19] px-4 py-2 text-[13px] font-semibold text-white transition-all duration-300 hover:bg-[#386A20] hover:shadow-[0_8px_24px_rgba(56,106,32,0.45)]"
      >
        Try Free
        <Icon name="arrow_forward" size={16} className="transition-transform group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
}

function MobileToggle({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      onClick={onToggle}
      className="flex h-9 w-9 items-center justify-center rounded-full bg-[#171D19] text-white transition-all hover:bg-[#386A20] md:hidden"
    >
      <Icon name={open ? "close" : "menu"} size={20} />
    </button>
  );
}

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const links = [
    { href: "#product", label: "Product", icon: "widgets" },
    { href: "#features", label: "Features", icon: "auto_awesome" },
    { href: "#how-it-works", label: "How it works", icon: "route" },
    { href: "#pricing", label: "Pricing", icon: "sell" },
    { href: "#learn", label: "Learn", icon: "school" },
  ];

  return (
    <div
      className={`fixed inset-0 z-40 transition-all duration-500 md:hidden ${
        open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      }`}
      aria-hidden={!open}
    >
      <div
        className="absolute inset-0 bg-[#171D19]/40 backdrop-blur-md"
        onClick={onClose}
      />

      <div
        className={`absolute inset-x-4 top-24 overflow-hidden rounded-[32px] border border-white/60 bg-white/95 p-6 shadow-[0_24px_60px_rgba(56,106,32,0.25)] backdrop-blur-2xl transition-all duration-500 ${
          open ? "translate-y-0 scale-100" : "-translate-y-4 scale-95"
        }`}
      >
        <ul className="space-y-1">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={onClose}
                className="group flex items-center gap-3 rounded-2xl px-4 py-3 text-[15px] font-medium text-[#171D19] transition-all hover:bg-[#B7F0AD]/40"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EEF5EE] transition-colors group-hover:bg-white">
                  <Icon name={link.icon} size={18} filled className="text-[#386A20]" />
                </div>
                {link.label}
                <Icon
                  name="arrow_forward"
                  size={16}
                  className="ml-auto text-[#3F4943] opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100"
                />
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-col gap-2 border-t border-[#DBE5DA] pt-5">
          <Link
            href="/auth/login"
            onClick={onClose}
            className="flex items-center justify-center gap-2 rounded-full border border-[#171D19]/15 bg-white px-4 py-3 text-[14px] font-semibold text-[#171D19] transition-all hover:bg-[#EEF5EE]"
          >
            <Icon name="login" size={16} />
            Log in
          </Link>
          <Link
            href="/auth/register"
            onClick={onClose}
            className="group flex items-center justify-center gap-2 rounded-full bg-[#171D19] px-4 py-3 text-[14px] font-semibold text-white transition-all hover:bg-[#386A20] hover:shadow-[0_8px_24px_rgba(56,106,32,0.45)]"
          >
            Try Vellium Free
            <Icon name="arrow_forward" size={16} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}