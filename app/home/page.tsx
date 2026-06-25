"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Sidebar, { MobileTopBar } from "@/components/home/sidebar";
import Settings from "@/components/home/settings";
import CommandPalette from "@/components/home/command-palette";
import ShortcutsOverlay from "@/components/home/shortcuts-overlay";

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

export default function HomePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [shortcutsOpen, setShortcutsOpen] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const isMac = navigator.platform.toLowerCase().includes("mac");
      const mod = isMac ? e.metaKey : e.ctrlKey;

      if (mod && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandOpen(true);
      }
      if (e.altKey && e.key === "/") {
        e.preventDefault();
        setShortcutsOpen(true);
      }
      if (mod && e.key === ",") {
        e.preventDefault();
        setSettingsOpen(true);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="relative min-h-screen text-[#171D19] antialiased">
      <BackgroundBlobs />

      <div className="flex">
        <Sidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onOpenSettings={() => setSettingsOpen(true)}
        />

        <div className="flex min-w-0 flex-1 flex-col">
          <MobileTopBar onMenu={() => setSidebarOpen(true)} />
          <DesktopTopBar
            onSearch={() => setCommandOpen(true)}
            onShortcuts={() => setShortcutsOpen(true)}
            onSettings={() => setSettingsOpen(true)}
          />

          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-10 lg:py-8">
            <div className="mx-auto max-w-6xl space-y-6">
              <Greeting />
              <StatsGrid />
              <FocusAndCoach />
              <GoalsAndUpcoming />
              <QuickActions />
            </div>
          </main>
        </div>
      </div>

      <Settings open={settingsOpen} onClose={() => setSettingsOpen(false)} />
      <CommandPalette
        open={commandOpen}
        onClose={() => setCommandOpen(false)}
        onOpenSettings={() => setSettingsOpen(true)}
        onOpenShortcuts={() => setShortcutsOpen(true)}
      />
      <ShortcutsOverlay open={shortcutsOpen} onClose={() => setShortcutsOpen(false)} />
    </div>
  );
}

function BackgroundBlobs() {
  return (
    <>
      <div className="pointer-events-none absolute right-[-200px] top-[-100px] -z-10 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-[var(--accent-primary-light)]/30 to-[var(--accent-primary)]/10 blur-3xl" />
      <div className="pointer-events-none absolute left-[20%] top-[600px] -z-10 h-80 w-80 rounded-full bg-gradient-to-br from-[#FFE39C]/20 to-[#FFD89E]/10 blur-3xl" />
    </>
  );
}

function DesktopTopBar({
  onSearch,
  onShortcuts,
  onSettings,
}: {
  onSearch: () => void;
  onShortcuts: () => void;
  onSettings: () => void;
}) {
  return (
    <header className="hidden border-b border-[#DBE5DA]/60 bg-white/40 px-10 py-4 backdrop-blur-xl lg:block">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
        <button
          type="button"
          onClick={onSearch}
          className="flex flex-1 items-center gap-2 rounded-2xl border border-[#171D19]/10 bg-white/80 px-4 py-2.5 text-left transition-all hover:border-[var(--accent-primary)]/30 hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)]"
        >
          <Icon name="search" size={18} className="text-[#3F4943]" />
          <span className="flex-1 text-[13px] text-[#6F7975]">
            Buscar metas, tareas, comandos...
          </span>
          <kbd className="rounded-md border border-[#DBE5DA] bg-[var(--accent-surface-variant)] px-1.5 py-0.5 text-[10px] font-bold text-[#3F4943]">
            ⌘K
          </kbd>
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onShortcuts}
            aria-label="Atajos de teclado"
            title="Atajos (⌥ /)"
            className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/80 text-[#171D19] shadow-sm transition-all hover:bg-white"
          >
            <Icon name="keyboard" size={20} />
          </button>
          <button
            type="button"
            onClick={onSettings}
            aria-label="Ajustes"
            title="Ajustes (⌘ ,)"
            className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/80 text-[#171D19] shadow-sm transition-all hover:bg-white"
          >
            <Icon name="settings" size={20} />
          </button>
          <button
            type="button"
            aria-label="AI Coach"
            className="flex h-10 w-10 items-center justify-center rounded-2xl bg-accent-gradient text-white shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-all hover:scale-105"
          >
            <Icon name="auto_awesome" size={18} filled />
          </button>
          <button
            type="button"
            aria-label="Notificaciones"
            className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-white/80 text-[#171D19] shadow-sm transition-all hover:bg-white"
          >
            <Icon name="notifications" size={20} />
            <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-[#FF6B6B]" />
          </button>
        </div>
      </div>
    </header>
  );
}

function Greeting() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setTime("Buenos días");
    else if (hour < 19) setTime("Buenas tardes");
    else setTime("Buenas noches");
  }, []);

  return (
    <section className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--accent-primary)]">
          {time}
        </p>
        <h1 className="mt-1 font-serif text-[32px] font-medium leading-[1.1] tracking-[-0.01em] text-[#171D19] sm:text-[42px]">
          Hola, <em className="italic text-[var(--accent-primary)]">Maya</em>
        </h1>
        <p className="mt-1.5 text-[14px] text-[#3F4943]">
          Tienes 3 metas activas y 5 tareas para hoy. ¡Vamos por ello!
        </p>
      </div>
      <div className="flex items-center gap-2 rounded-full border border-white/60 bg-white/70 px-3 py-2 backdrop-blur-xl">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-[#FFE39C] to-[#FFD89E]">
          <Icon name="local_fire_department" size={14} filled className="text-[#9B7E2D]" />
        </div>
        <div>
          <p className="text-[11px] font-bold text-[#171D19]">Racha: 7 días</p>
          <p className="text-[9px] text-[#3F4943]">¡Sigue así!</p>
        </div>
      </div>
    </section>
  );
}

function StatsGrid() {
  const stats = [
    { label: "Hoy", value: "4/7", sub: "Tareas", icon: "task_alt", gradient: "from-[var(--accent-from)] to-[var(--accent-to)]" },
    { label: "Esta semana", value: "82%", sub: "Completado", icon: "trending_up", gradient: "from-[#FFE39C] to-[#FFD89E]" },
    { label: "Metas", value: "3", sub: "Activas", icon: "track_changes", gradient: "from-[#FFD9E0] to-[#FFB8C8]" },
    { label: "Focus", value: "2.5h", sub: "Hoy", icon: "schedule", gradient: "from-[#D8E5FF] to-[#B8C8FF]" },
  ];

  return (
    <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {stats.map((s) => (
        <div
          key={s.label}
          className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br ${s.gradient} p-4 shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.12)]`}
        >
          <div className="flex items-center justify-between">
            <Icon name={s.icon} size={20} filled className="text-[#171D19]" />
            <span className="rounded-full bg-white/60 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#171D19]/70">
              {s.label}
            </span>
          </div>
          <p className="mt-4 font-serif text-[32px] font-medium leading-none text-[#171D19] sm:text-[36px]">
            {s.value}
          </p>
          <p className="mt-1 text-[11px] font-semibold text-[#171D19]/70">{s.sub}</p>
        </div>
      ))}
    </section>
  );
}

function FocusAndCoach() {
  return (
    <section className="grid gap-4 lg:grid-cols-3">
      <TodayFocus />
      <AICoach />
    </section>
  );
}

function TodayFocus() {
  const tasks = [
    { done: true, label: "Revisar mockups del landing", time: "9:00" },
    { done: true, label: "Llamada con cliente Acme", time: "10:30" },
    { done: false, label: "Escribir copy del hero", time: "14:00", current: true },
    { done: false, label: "Enviar propuesta de pricing", time: "16:00" },
    { done: false, label: "Review de PR del equipo", time: "17:30" },
  ];

  return (
    <div className="lg:col-span-2">
      <div className="rounded-[32px] border border-white/60 bg-white/80 p-5 shadow-[0_8px_32px_rgba(0,0,0,0.05)] backdrop-blur-xl sm:p-6">
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-accent-gradient shadow-sm">
              <Icon name="rocket_launch" size={18} filled className="text-white" />
            </div>
            <div>
              <h2 className="font-serif text-[20px] font-medium text-[#171D19]">Tu enfoque de hoy</h2>
              <p className="text-[11px] text-[#3F4943]">5 tareas · 2 completadas</p>
            </div>
          </div>
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full text-[#3F4943] transition-colors hover:bg-[var(--accent-surface-variant)] hover:text-[var(--accent-primary)]"
            aria-label="Más opciones"
          >
            <Icon name="more_horiz" size={20} />
          </button>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between text-[11px] font-semibold">
            <span className="text-[#3F4943]">Progreso del día</span>
            <span className="text-[var(--accent-primary)]">40%</span>
          </div>
          <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-[var(--accent-surface-variant)]">
            <div className="h-full rounded-full bg-accent-gradient" style={{ width: "40%" }} />
          </div>
        </div>

        <ul className="space-y-2">
          {tasks.map((t) => (
            <li
              key={t.label}
              className={`group flex items-center gap-3 rounded-2xl border px-3 py-2.5 transition-all ${
                t.current
                  ? "border-[var(--accent-primary)]/30 bg-[var(--accent-surface-variant)] shadow-[0_4px_16px_rgba(0,0,0,0.05)]"
                  : "border-transparent bg-white/40 hover:border-[#DBE5DA]"
              }`}
            >
              <button type="button" className="shrink-0" aria-label="Toggle">
                <Icon
                  name={t.done ? "check_circle" : "radio_button_unchecked"}
                  size={22}
                  filled={t.done}
                  className={t.done ? "text-[var(--accent-primary)]" : "text-[var(--accent-primary)]/40 group-hover:text-[var(--accent-primary)]"}
                />
              </button>
              <div className="min-w-0 flex-1">
                <p className={`truncate text-[13px] font-medium ${t.done ? "text-[#3F4943] line-through" : "text-[#171D19]"}`}>
                  {t.label}
                </p>
                {t.current && (
                  <p className="mt-0.5 flex items-center gap-1 text-[10px] font-semibold text-[var(--accent-primary)]">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--accent-primary)]" />
                    En curso ahora
                  </p>
                )}
              </div>
              <span className="shrink-0 text-[11px] font-semibold text-[#3F4943]">{t.time}</span>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-[#DBE5DA] py-2.5 text-[12px] font-semibold text-[#3F4943] transition-all hover:border-[var(--accent-primary)] hover:bg-[var(--accent-surface-variant)]/50 hover:text-[var(--accent-primary)]"
        >
          <Icon name="add" size={16} />
          Agregar tarea
        </button>
      </div>
    </div>
  );
}

function AICoach() {
  return (
    <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#171D19] via-[var(--accent-primary-dark)] to-[#171D19] p-5 text-white shadow-[0_12px_40px_rgba(0,0,0,0.25)] sm:p-6">
      <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-[var(--accent-primary)]/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-[var(--accent-primary-light)]/30 blur-3xl" />
      <div className="relative">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-accent-gradient shadow-lg">
            <Icon name="auto_awesome" size={18} filled className="text-white" />
          </div>
          <div>
            <p className="font-serif text-[16px] font-medium">Tu coach</p>
            <p className="text-[10px] text-[var(--accent-container)]">Online · Listo para ti</p>
          </div>
        </div>
        <div className="mt-5 rounded-2xl bg-white/10 p-4 backdrop-blur">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--accent-container)]">
            Mensaje de hoy
          </p>
          <p className="mt-2 text-[13px] leading-relaxed text-white/95">
            Buen comienzo, Maya. Llevas 2 tareas completadas. Te recomiendo abordar el copy del hero ahora — es tu mayor bloqueo. ✦
          </p>
        </div>
        <div className="mt-4 space-y-2">
          <button
            type="button"
            className="flex w-full items-center justify-between rounded-2xl bg-white/10 px-4 py-2.5 text-[12px] font-semibold text-white backdrop-blur transition-all hover:bg-white/20"
          >
            <span className="flex items-center gap-2">
              <Icon name="psychology" size={16} filled className="text-[var(--accent-container)]" />
              Planear mi día
            </span>
            <Icon name="arrow_forward" size={14} />
          </button>
          <button
            type="button"
            className="flex w-full items-center justify-between rounded-2xl bg-white/10 px-4 py-2.5 text-[12px] font-semibold text-white backdrop-blur transition-all hover:bg-white/20"
          >
            <span className="flex items-center gap-2">
              <Icon name="chat" size={16} filled className="text-[var(--accent-container)]" />
              Hablar con coach
            </span>
            <Icon name="arrow_forward" size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

function GoalsAndUpcoming() {
  return (
    <section className="grid gap-4 lg:grid-cols-3">
      <ActiveGoals />
      <UpcomingEvents />
    </section>
  );
}

function ActiveGoals() {
  const goals = [
    { title: "Ship landing v2", tag: "Trabajo", gradient: "from-[var(--accent-from)] to-[var(--accent-to)]", icon: "rocket_launch", progress: 67, due: "Viernes" },
    { title: "Rutina matutina", tag: "Personal", gradient: "from-[#FFE39C] to-[#FFD89E]", icon: "wb_sunny", progress: 85, due: "Diaria" },
    { title: "Q1 strategy doc", tag: "Estratégico", gradient: "from-[#FFD9E0] to-[#FFB8C8]", icon: "trending_up", progress: 30, due: "31 Mar" },
  ];

  return (
    <div className="lg:col-span-2">
      <div className="rounded-[32px] border border-white/60 bg-white/80 p-5 shadow-[0_8px_32px_rgba(0,0,0,0.05)] backdrop-blur-xl sm:p-6">
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-[var(--accent-surface-variant)]">
              <Icon name="track_changes" size={18} filled className="text-[var(--accent-primary)]" />
            </div>
            <div>
              <h2 className="font-serif text-[20px] font-medium text-[#171D19]">Metas activas</h2>
              <p className="text-[11px] text-[#3F4943]">3 en progreso</p>
            </div>
          </div>
          <Link
            href="/goals"
            className="flex items-center gap-1 rounded-full bg-[var(--accent-surface-variant)] px-3 py-1.5 text-[11px] font-bold text-[var(--accent-primary)] transition-all hover:bg-[var(--accent-container)]"
          >
            Ver todas
            <Icon name="arrow_forward" size={12} />
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {goals.map((g) => (
            <div
              key={g.title}
              className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${g.gradient} p-4 transition-all hover:-translate-y-1 hover:shadow-lg`}
            >
              <div className="flex items-center justify-between">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/40 backdrop-blur">
                  <Icon name={g.icon} size={16} filled className="text-[#171D19]" />
                </div>
                <span className="rounded-full bg-white/60 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#171D19]/70">
                  {g.tag}
                </span>
              </div>
              <p className="mt-3 text-[13px] font-bold text-[#171D19]">{g.title}</p>
              <div className="mt-3">
                <div className="flex items-center justify-between text-[10px] font-semibold text-[#171D19]/70">
                  <span>{g.progress}%</span>
                  <span>{g.due}</span>
                </div>
                <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/50">
                  <div className="h-full rounded-full bg-[#171D19]" style={{ width: `${g.progress}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function UpcomingEvents() {
  const events = [
    { time: "14:00", title: "Sesión deep work", type: "Focus", color: "bg-[var(--accent-container)] text-[var(--accent-on-container)]" },
    { time: "16:30", title: "Reunión equipo", type: "Meeting", color: "bg-[#D8E5FF] text-[#1A4F8B]" },
    { time: "18:00", title: "Check-in vespertino", type: "Vellium", color: "bg-[#FFE39C] text-[#9B7E2D]" },
    { time: "19:30", title: "Workout", type: "Personal", color: "bg-[#FFD9E0] text-[#B3445B]" },
  ];

  return (
    <div className="rounded-[32px] border border-white/60 bg-white/80 p-5 shadow-[0_8px_32px_rgba(0,0,0,0.05)] backdrop-blur-xl sm:p-6">
      <div className="mb-5 flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-[var(--accent-surface-variant)]">
          <Icon name="calendar_month" size={18} filled className="text-[var(--accent-primary)]" />
        </div>
        <h2 className="font-serif text-[16px] font-medium text-[#171D19]">Próximos eventos</h2>
      </div>
      <ul className="space-y-2.5">
        {events.map((e) => (
          <li key={e.title} className="flex items-start gap-3">
            <div className="shrink-0 text-right">
              <p className="text-[12px] font-bold text-[#171D19]">{e.time}</p>
            </div>
            <div className="mt-1 h-full w-px bg-[#DBE5DA]" />
            <div className="flex-1 pb-2">
              <p className="text-[12px] font-semibold text-[#171D19]">{e.title}</p>
              <span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${e.color}`}>
                {e.type}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function QuickActions() {
  const actions = [
    { icon: "add_task", label: "Nueva tarea", color: "from-[var(--accent-from)] to-[var(--accent-to)]" },
    { icon: "flag", label: "Nueva meta", color: "from-[#FFE39C] to-[#FFD89E]" },
    { icon: "edit_note", label: "Diario", color: "from-[#FFD9E0] to-[#FFB8C8]" },
    { icon: "psychology", label: "Plan IA", color: "from-[#D8E5FF] to-[#B8C8FF]" },
  ];

  return (
    <section>
      <div className="mb-3 flex items-center gap-2">
        <Icon name="bolt" size={18} filled className="text-[var(--accent-primary)]" />
        <h2 className="font-serif text-[18px] font-medium text-[#171D19]">Acciones rápidas</h2>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {actions.map((a) => (
          <button
            key={a.label}
            type="button"
            className={`group flex flex-col items-center gap-2 rounded-3xl bg-gradient-to-br ${a.color} p-4 shadow-[0_8px_20px_rgba(0,0,0,0.08)] transition-all hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(0,0,0,0.12)] active:scale-95`}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/60 backdrop-blur transition-transform group-hover:scale-110">
              <Icon name={a.icon} size={22} filled className="text-[#171D19]" />
            </div>
            <span className="text-[12px] font-bold text-[#171D19]">{a.label}</span>
          </button>
        ))}
      </div>
    </section>
  );
}