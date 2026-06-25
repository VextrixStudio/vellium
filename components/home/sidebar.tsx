"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

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

export default function Sidebar({
  open,
  onClose,
  onOpenSettings,
}: {
  open: boolean;
  onClose: () => void;
  onOpenSettings?: () => void;
}) {
  const safeOpenSettings = onOpenSettings ?? (() => {});

  return (
    <>
      <DesktopSidebar onOpenSettings={safeOpenSettings} />
      <MobileSidebar
        open={open}
        onClose={onClose}
        onOpenSettings={safeOpenSettings}
      />
    </>
  );
}

export function MobileTopBar({ onMenu }: { onMenu: () => void }) {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-[#DBE5DA]/60 bg-[var(--accent-surface)]/80 px-4 py-3 backdrop-blur-xl lg:hidden">
      <button
        type="button"
        onClick={onMenu}
        aria-label="Abrir menú"
        className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/80 text-[#171D19] shadow-sm transition-all hover:bg-white active:scale-95"
      >
        <Icon name="menu" size={22} />
      </button>

      <Link href="/home" className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-2xl bg-accent-gradient shadow-[0_4px_12px_rgba(0,0,0,0.15)]">
          <Icon name="bolt" size={16} filled className="text-white" />
        </div>
        <span className="font-serif text-[18px] font-medium text-[#171D19]">
          Vellium
        </span>
      </Link>

      <button
        type="button"
        aria-label="Notificaciones"
        className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-white/80 text-[#171D19] shadow-sm transition-all hover:bg-white active:scale-95"
      >
        <Icon name="notifications" size={20} />
        <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-[#FF6B6B]" />
      </button>
    </header>
  );
}

const MAIN_NAV = [
  { href: "/home", icon: "home", label: "Inicio" },
  { href: "/goals", icon: "track_changes", label: "Metas", badge: "3" },
  { href: "/tasks", icon: "task_alt", label: "Tareas", badge: "12" },
  { href: "/calendar", icon: "calendar_month", label: "Calendario" },
  { href: "/coach", icon: "auto_awesome", label: "AI Coach" },
];

const TOOLS_NAV = [
  { href: "/analytics", icon: "analytics", label: "Analíticas" },
  { href: "/journal", icon: "edit_note", label: "Diario" },
  { href: "/streaks", icon: "local_fire_department", label: "Rachas" },
];

const STARRED = [
  {
    href: "/goals/q1",
    icon: "rocket_launch",
    label: "Q1 Launch",
    color: "from-[#FFD9E0] to-[#FFB8C8]",
  },
  {
    href: "/goals/landing",
    icon: "language",
    label: "Landing v2",
    color: "from-[var(--accent-from)] to-[var(--accent-to)]",
  },
  {
    href: "/goals/routine",
    icon: "wb_sunny",
    label: "Morning routine",
    color: "from-[#FFE39C] to-[#FFD89E]",
  },
];

function DesktopSidebar({ onOpenSettings }: { onOpenSettings: () => void }) {
  return (
    <aside className="sticky top-0 hidden h-screen w-[260px] shrink-0 flex-col border-r border-[#DBE5DA]/60 bg-white/50 backdrop-blur-xl lg:flex">
      <SidebarContent onOpenSettings={onOpenSettings} />
    </aside>
  );
}

function MobileSidebar({
  open,
  onClose,
  onOpenSettings,
}: {
  open: boolean;
  onClose: () => void;
  onOpenSettings: () => void;
}) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div
      className={`fixed inset-0 z-50 transition-all duration-500 lg:hidden ${
        open ? "pointer-events-auto" : "pointer-events-none"
      }`}
      aria-hidden={!open}
    >
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-[#171D19]/40 backdrop-blur-md transition-opacity duration-500 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      <aside
        className={`absolute left-0 top-0 h-full w-[280px] max-w-[85vw] overflow-hidden bg-[var(--accent-surface)] shadow-2xl transition-transform duration-500 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar menú"
            className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-[#171D19] shadow-sm transition-all hover:bg-white active:scale-95"
          >
            <Icon name="close" size={20} />
          </button>
          <SidebarContent
            onItemClick={onClose}
            onOpenSettings={onOpenSettings}
          />
        </div>
      </aside>
    </div>
  );
}

function SidebarContent({
  onItemClick,
  onOpenSettings,
}: {
  onItemClick?: () => void;
  onOpenSettings: () => void;
}) {
  return (
    <>
      <BrandHeader />
      <NewGoalButton onClick={onItemClick} />

      <nav className="flex-1 overflow-y-auto px-3 pb-4">
        <NavSection
          title="Principal"
          items={MAIN_NAV}
          onItemClick={onItemClick}
        />
        <NavSection
          title="Herramientas"
          items={TOOLS_NAV}
          onItemClick={onItemClick}
        />
        <StarredSection onItemClick={onItemClick} />
      </nav>

      <UserCard
        onOpenSettings={() => {
          onItemClick?.();
          if (typeof onOpenSettings === "function") onOpenSettings();
        }}
      />
    </>
  );
}

function BrandHeader() {
  return (
    <div className="flex items-center gap-2.5 px-5 py-5">
      <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-accent-gradient shadow-[0_4px_12px_rgba(0,0,0,0.15)]">
        <Icon name="bolt" size={18} filled className="text-white" />
      </div>
      <div>
        <p className="font-serif text-[18px] font-medium leading-none text-[#171D19]">
          Vellium
        </p>
        <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--accent-primary)]">
          AI Coach
        </p>
      </div>
    </div>
  );
}

function NewGoalButton({ onClick }: { onClick?: () => void }) {
  return (
    <div className="px-3 pb-3">
      <button
        type="button"
        onClick={onClick}
        className="group flex w-full items-center gap-2 rounded-2xl bg-accent-gradient px-3.5 py-3 text-left text-white shadow-[0_8px_20px_rgba(0,0,0,0.18)] transition-all hover:scale-[1.02] active:scale-100"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/20 transition-transform group-hover:rotate-90">
          <Icon name="add" size={20} className="text-white" />
        </div>
        <div className="flex-1">
          <p className="text-[13px] font-bold leading-tight">Nueva meta</p>
          <p className="text-[10px] text-white/80">Crear con IA</p>
        </div>
        <Icon name="auto_awesome" size={16} filled className="text-white/90" />
      </button>
    </div>
  );
}

function NavSection({
  title,
  items,
  onItemClick,
}: {
  title: string;
  items: { href: string; icon: string; label: string; badge?: string }[];
  onItemClick?: () => void;
}) {
  return (
    <div className="mt-3">
      <p className="px-3 pb-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#6F7975]">
        {title}
      </p>
      <ul className="space-y-0.5">
        {items.map((item) => (
          <NavItem key={item.href} {...item} onClick={onItemClick} />
        ))}
      </ul>
    </div>
  );
}

function NavItem({
  href,
  icon,
  label,
  badge,
  onClick,
}: {
  href: string;
  icon: string;
  label: string;
  badge?: string;
  onClick?: () => void;
}) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <li>
      <Link
        href={href}
        onClick={onClick}
        className={`group flex items-center gap-3 rounded-2xl px-3 py-2.5 transition-all ${
          active
            ? "bg-[var(--accent-container)] text-[var(--accent-on-container)] shadow-sm"
            : "text-[#3F4943] hover:bg-white/60 hover:text-[#171D19]"
        }`}
      >
        <Icon
          name={icon}
          size={20}
          filled={active}
          className={
            active
              ? "text-[var(--accent-primary)]"
              : "text-[#3F4943] group-hover:text-[var(--accent-primary)]"
          }
        />
        <span className="flex-1 text-[13px] font-semibold">{label}</span>
        {badge && (
          <span
            className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
              active
                ? "bg-white text-[var(--accent-primary)]"
                : "bg-[var(--accent-surface-variant)] text-[var(--accent-primary)]"
            }`}
          >
            {badge}
          </span>
        )}
      </Link>
    </li>
  );
}

function StarredSection({ onItemClick }: { onItemClick?: () => void }) {
  return (
    <div className="mt-5">
      <div className="flex items-center justify-between px-3 pb-1.5">
        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#6F7975]">
          Destacadas
        </p>
        <button
          type="button"
          aria-label="Agregar"
          className="flex h-5 w-5 items-center justify-center rounded-full text-[#6F7975] hover:bg-white/60 hover:text-[var(--accent-primary)]"
        >
          <Icon name="add" size={14} />
        </button>
      </div>
      <ul className="space-y-1">
        {STARRED.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              onClick={onItemClick}
              className="group flex items-center gap-2.5 rounded-2xl px-3 py-2 text-[#3F4943] transition-all hover:bg-white/60 hover:text-[#171D19]"
            >
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-xl bg-gradient-to-br ${item.color} shadow-sm transition-transform group-hover:scale-110`}
              >
                <Icon
                  name={item.icon}
                  size={14}
                  filled
                  className="text-white"
                />
              </div>
              <span className="flex-1 truncate text-[12px] font-medium">
                {item.label}
              </span>
              <Icon
                name="arrow_forward_ios"
                size={10}
                className="opacity-0 transition-opacity group-hover:opacity-60"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function UserCard({ onOpenSettings }: { onOpenSettings: () => void }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, [open]);

  return (
    <div className="relative border-t border-[#DBE5DA]/60 p-3">
      {open && (
        <div
          className="absolute bottom-full left-3 right-3 mb-2 overflow-hidden rounded-2xl border border-white/60 bg-white/95 shadow-[0_16px_40px_rgba(0,0,0,0.12)] backdrop-blur-xl"
          onClick={(e) => e.stopPropagation()}
        >
          <Link
            href="/profile"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2.5 px-3 py-2.5 text-[13px] font-medium text-[#171D19] transition-colors hover:bg-[var(--accent-surface-variant)]"
          >
            <Icon
              name="person"
              size={16}
              className="text-[var(--accent-primary)]"
            />
            Mi perfil
          </Link>
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              onOpenSettings();
            }}
            className="flex w-full items-center gap-2.5 px-3 py-2.5 text-left text-[13px] font-medium text-[#171D19] transition-colors hover:bg-[var(--accent-surface-variant)]"
          >
            <Icon
              name="settings"
              size={16}
              className="text-[var(--accent-primary)]"
            />
            Ajustes
            <kbd className="ml-auto rounded border border-[#DBE5DA] bg-[var(--accent-surface-variant)] px-1.5 py-0.5 text-[9px] font-bold text-[#3F4943]">
              ⌘,
            </kbd>
          </button>
          <Link
            href="/help"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2.5 px-3 py-2.5 text-[13px] font-medium text-[#171D19] transition-colors hover:bg-[var(--accent-surface-variant)]"
          >
            <Icon
              name="help"
              size={16}
              className="text-[var(--accent-primary)]"
            />
            Ayuda
          </Link>
          <div className="h-px bg-[#DBE5DA]" />
          <Link
            href="/auth/login"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2.5 px-3 py-2.5 text-[13px] font-medium text-[#B3261E] transition-colors hover:bg-[#FFD9D9]/40"
          >
            <Icon name="logout" size={16} />
            Cerrar sesión
          </Link>
        </div>
      )}

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setOpen((v) => !v);
        }}
        className="flex w-full items-center gap-2.5 rounded-2xl border border-white/60 bg-white/70 p-2.5 transition-all hover:bg-white"
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-gradient text-[13px] font-bold text-white shadow-sm">
          M
        </div>
        <div className="min-w-0 flex-1 text-left">
          <p className="truncate text-[12px] font-bold text-[#171D19]">
            Maya Okafor
          </p>
          <p className="truncate text-[10px] text-[#3F4943]">
            Plan Pro · Activo
          </p>
        </div>
        <Icon
          name="expand_more"
          size={18}
          className={`text-[#3F4943] transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
    </div>
  );
}
