"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useTheme } from "@/components/providers/theme-provider";

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

type SectionId =
  | "published"
  | "tags"
  | "space"
  | "appearance"
  | "language"
  | "advanced"
  | "account"
  | "subscription"
  | "integrations"
  | "shortcuts";

type Section = {
  id: SectionId;
  label: string;
  icon: string;
  group: "space" | "general" | "user";
};

const SECTIONS: Section[] = [
  { id: "published", label: "Contenido publicado", icon: "public", group: "space" },
  { id: "tags", label: "Etiquetas", icon: "tag", group: "space" },
  { id: "space", label: "Mi espacio", icon: "workspaces", group: "space" },
  { id: "appearance", label: "Apariencia", icon: "palette", group: "general" },
  { id: "language", label: "Idioma", icon: "language", group: "general" },
  { id: "shortcuts", label: "Atajos de teclado", icon: "keyboard", group: "general" },
  { id: "advanced", label: "Avanzado", icon: "tune", group: "general" },
  { id: "account", label: "Mi cuenta", icon: "person", group: "user" },
  { id: "subscription", label: "Suscripción", icon: "card_membership", group: "user" },
  { id: "integrations", label: "Integraciones", icon: "extension", group: "user" },
];

export default function Settings({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [section, setSection] = useState<SectionId>("appearance");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" && open) onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="vellium-modal home-scope fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
      <div onClick={onClose} className="absolute inset-0 bg-[#171D19]/40 backdrop-blur-md" />

      <div className="relative flex h-full max-h-[700px] w-full max-w-5xl overflow-hidden rounded-[32px] border border-white/70 bg-white/95 shadow-[0_40px_120px_-20px_rgba(56,106,32,0.4)] backdrop-blur-2xl">
        <SidebarNav
          current={section}
          onSelect={(id) => {
            setSection(id);
            setMobileNavOpen(false);
          }}
          mobileOpen={mobileNavOpen}
          onCloseMobile={() => setMobileNavOpen(false)}
        />

        <div className="flex min-w-0 flex-1 flex-col">
          <ContentHeader
            section={SECTIONS.find((s) => s.id === section)!}
            onMenu={() => setMobileNavOpen(true)}
            onClose={onClose}
          />
          <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-8 sm:py-8">
            <SectionContent section={section} />
          </div>
        </div>
      </div>
    </div>
  );
}

function SidebarNav({
  current,
  onSelect,
  mobileOpen,
  onCloseMobile,
}: {
  current: SectionId;
  onSelect: (id: SectionId) => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}) {
  const groups = [
    { title: "Mi espacio", group: "space" as const },
    { title: "General", group: "general" as const },
    { title: "Usuario", group: "user" as const },
  ];

  return (
    <>
      {mobileOpen && (
        <div
          onClick={onCloseMobile}
          className="absolute inset-0 z-10 bg-[#171D19]/20 backdrop-blur-sm md:hidden"
        />
      )}

      <aside
        className={`absolute inset-y-0 left-0 z-20 flex w-[280px] flex-col border-r border-[#DBE5DA]/60 bg-[var(--accent-surface)] backdrop-blur-xl transition-transform duration-300 md:relative md:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <UpgradeBanner />

        <nav className="flex-1 overflow-y-auto px-3 pb-4">
          {groups.map((g) => (
            <div key={g.group} className="mt-4 first:mt-0">
              <p className="px-3 pb-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#6F7975]">
                {g.title}
              </p>
              <ul className="space-y-0.5">
                {SECTIONS.filter((s) => s.group === g.group).map((s) => (
                  <li key={s.id}>
                    <button
                      type="button"
                      onClick={() => onSelect(s.id)}
                      className={`flex w-full items-center gap-2.5 rounded-2xl px-3 py-2 text-left transition-all ${
                        current === s.id
                          ? "bg-[var(--accent-container)] text-[var(--accent-on-container)] shadow-sm"
                          : "text-[#3F4943] hover:bg-white/70 hover:text-[#171D19]"
                      }`}
                    >
                      <Icon
                        name={s.icon}
                        size={18}
                        filled={current === s.id}
                        className={current === s.id ? "text-[var(--accent-primary)]" : "text-[#3F4943]"}
                      />
                      <span className="text-[13px] font-semibold">{s.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <UserFooter />
      </aside>
    </>
  );
}

function UpgradeBanner() {
  return (
    <div className="m-3">
      <div className="relative overflow-hidden rounded-3xl bg-accent-gradient p-4 shadow-[0_12px_32px_rgba(56,106,32,0.35)]">
        <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/20 blur-2xl" />
        <div className="relative flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-white/25 backdrop-blur">
            <Icon name="bolt" size={16} filled className="text-white" />
          </div>
          <p className="font-serif text-[15px] font-medium text-white">Vellium</p>
          <span className="ml-auto rounded-full bg-white/25 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white backdrop-blur">
            Pro
          </span>
        </div>
        <p className="mt-3 text-[11px] leading-snug text-white/90">
          Cuenta completa. Metas y almacenamiento ilimitados para todas tus ideas.
        </p>
        <button
          type="button"
          className="mt-3 flex w-full items-center justify-center gap-1 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-bold text-[var(--accent-primary)] transition-all hover:scale-[1.02] hover:bg-white"
        >
          Obtener Pro
          <Icon name="arrow_forward" size={12} />
        </button>
      </div>
    </div>
  );
}

function UserFooter() {
  return (
    <div className="border-t border-[#DBE5DA]/60 p-3">
      <div className="flex items-center gap-2.5 rounded-2xl bg-white/60 p-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-gradient text-[13px] font-bold text-white shadow-sm">
          M
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[12px] font-bold text-[#171D19]">Maya Okafor</p>
          <p className="truncate text-[10px] text-[#3F4943]">maya@vellium.app</p>
        </div>
      </div>
    </div>
  );
}

function ContentHeader({
  section,
  onMenu,
  onClose,
}: {
  section: Section;
  onMenu: () => void;
  onClose: () => void;
}) {
  return (
    <header className="flex items-center justify-between border-b border-[#DBE5DA]/60 px-5 py-4 sm:px-8">
      <div className="flex items-center gap-2.5">
        <button
          type="button"
          onClick={onMenu}
          aria-label="Abrir menú"
          className="flex h-9 w-9 items-center justify-center rounded-2xl bg-[var(--accent-surface-variant)] text-[#171D19] transition-all hover:bg-[var(--accent-container)] md:hidden"
        >
          <Icon name="menu" size={20} />
        </button>
        <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-accent-gradient shadow-sm">
          <Icon name={section.icon} size={18} filled className="text-white" />
        </div>
        <h2 className="font-serif text-[20px] font-medium text-[#171D19]">{section.label}</h2>
      </div>

      <button
        type="button"
        onClick={onClose}
        aria-label="Cerrar"
        className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--accent-surface-variant)] text-[#171D19] transition-all hover:bg-[#FFD9D9] hover:text-[#B3261E] active:scale-95"
      >
        <Icon name="close" size={20} />
      </button>
    </header>
  );
}

function SectionContent({ section }: { section: SectionId }) {
  const map: Record<SectionId, React.ReactNode> = {
    space: <SpaceSection />,
    appearance: <AppearanceSection />,
    language: <LanguageSection />,
    shortcuts: <ShortcutsSection />,
    advanced: <AdvancedSection />,
    account: <AccountSection />,
    subscription: <SubscriptionSection />,
    integrations: <IntegrationsSection />,
    published: <PublishedSection />,
    tags: <TagsSection />,
  };
  return <>{map[section]}</>;
}

function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <div className="rounded-2xl border border-[#DBE5DA] bg-white/60 p-4 transition-all hover:border-[var(--accent-primary)]/30 hover:bg-white">
      <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#3F4943]">{label}</p>
      <div className="mt-2">{children}</div>
      {hint && <p className="mt-2 text-[11px] text-[#6F7975]">{hint}</p>}
    </div>
  );
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      className={`relative h-7 w-12 rounded-full transition-all ${
        checked ? "bg-[var(--accent-primary)]" : "bg-[#DBE5DA]"
      }`}
    >
      <span
        className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-md transition-all ${
          checked ? "left-6" : "left-1"
        }`}
      />
    </button>
  );
}

function ToggleRow({
  icon,
  title,
  desc,
  defaultChecked = false,
}: {
  icon: string;
  title: string;
  desc: string;
  defaultChecked?: boolean;
}) {
  const [checked, setChecked] = useState(defaultChecked);
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-[#DBE5DA] bg-white/60 p-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent-surface-variant)]">
        <Icon name={icon} size={20} filled className="text-[var(--accent-primary)]" />
      </div>
      <div className="flex-1">
        <p className="text-[13px] font-bold text-[#171D19]">{title}</p>
        <p className="text-[11px] text-[#3F4943]">{desc}</p>
      </div>
      <Toggle checked={checked} onChange={() => setChecked(!checked)} />
    </div>
  );
}

function AppearanceSection() {
  const { accent, setAccent, accents, density, setDensity, animations, setAnimations } = useTheme();
  const current = accents.find((a) => a.id === accent);

  return (
    <div className="space-y-4">
      <Field label="Tema" hint="Por ahora solo modo claro disponible.">
        <div className="grid grid-cols-3 gap-2">
          {[
            { id: "light", icon: "light_mode", label: "Claro", active: true },
            { id: "dark", icon: "dark_mode", label: "Oscuro", soon: true },
            { id: "auto", icon: "brightness_auto", label: "Auto", soon: true },
          ].map((t) => (
            <button
              key={t.id}
              type="button"
              disabled={t.soon}
              className={`relative flex flex-col items-center gap-1.5 rounded-2xl border-2 p-3 transition-all ${
                t.active
                  ? "border-[var(--accent-primary)] bg-[var(--accent-surface-variant)]"
                  : "cursor-not-allowed border-[#DBE5DA] bg-white/40 opacity-60"
              }`}
            >
              <Icon
                name={t.icon}
                size={20}
                filled={t.active}
                className={t.active ? "text-[var(--accent-primary)]" : "text-[#6F7975]"}
              />
              <span className="text-[11px] font-bold text-[#171D19]">{t.label}</span>
              {t.soon && (
                <span className="absolute -top-1.5 right-1.5 rounded-full bg-[#FFE39C] px-1.5 text-[8px] font-bold text-[#9B7E2D]">
                  Pronto
                </span>
              )}
            </button>
          ))}
        </div>
      </Field>

      <Field label="Color de acento" hint="Cambia el color principal de todo tu espacio.">
        <div className="flex flex-wrap gap-2.5">
          {accents.map((a) => (
            <button
              key={a.id}
              type="button"
              onClick={() => setAccent(a.id)}
              aria-label={a.name}
              title={a.name}
              className={`relative h-12 w-12 rounded-2xl shadow-md transition-all hover:scale-110 active:scale-95 ${
                accent === a.id ? "ring-2 ring-offset-2 ring-[#171D19]" : ""
              }`}
              style={{ background: `linear-gradient(135deg, ${a.from}, ${a.to})` }}
            >
              {accent === a.id && (
                <Icon name="check" size={22} className="absolute inset-0 m-auto text-white drop-shadow" />
              )}
            </button>
          ))}
        </div>
        {current && (
          <p className="mt-3 flex items-center gap-1.5 text-[11px] text-[#3F4943]">
            Color actual:
            <span
              className="inline-block h-3 w-3 rounded-full"
              style={{ background: current.primary }}
            />
            <span className="font-bold text-[var(--accent-primary)]">{current.name}</span>
          </p>
        )}
      </Field>

      <Field label="Densidad de la interfaz" hint="Ajusta el tamaño general del contenido.">
        <div className="grid grid-cols-3 gap-2">
          {(
            [
              { id: "compact", label: "Compacta", icon: "density_small" },
              { id: "comfortable", label: "Cómoda", icon: "density_medium" },
              { id: "spacious", label: "Espaciosa", icon: "density_large" },
            ] as const
          ).map((d) => (
            <button
              key={d.id}
              type="button"
              onClick={() => setDensity(d.id)}
              className={`flex flex-col items-center gap-1.5 rounded-2xl border-2 px-3 py-2.5 transition-all ${
                density === d.id
                  ? "border-[var(--accent-primary)] bg-[var(--accent-surface-variant)]"
                  : "border-[#DBE5DA] bg-white/60 hover:border-[var(--accent-primary)]/40"
              }`}
            >
              <Icon
                name={d.icon}
                size={18}
                className={density === d.id ? "text-[var(--accent-primary)]" : "text-[#3F4943]"}
              />
              <span className="text-[11px] font-semibold text-[#171D19]">{d.label}</span>
            </button>
          ))}
        </div>
      </Field>

      <div className="flex items-center gap-3 rounded-2xl border border-[#DBE5DA] bg-white/60 p-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent-surface-variant)]">
          <Icon name="animation" size={20} filled className="text-[var(--accent-primary)]" />
        </div>
        <div className="flex-1">
          <p className="text-[13px] font-bold text-[#171D19]">Animaciones</p>
          <p className="text-[11px] text-[#3F4943]">Activa las transiciones suaves</p>
        </div>
        <Toggle checked={animations} onChange={() => setAnimations(!animations)} />
      </div>

      <PreviewCard />
    </div>
  );
}

function PreviewCard() {
  return (
    <div className="rounded-2xl border border-[#DBE5DA] bg-white/60 p-4">
      <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.12em] text-[#3F4943]">
        Vista previa
      </p>
      <div className="rounded-2xl bg-[var(--accent-surface-variant)] p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-gradient shadow-md">
            <Icon name="rocket_launch" size={22} filled className="text-white" />
          </div>
          <div className="flex-1">
            <p className="text-[13px] font-bold text-[#171D19]">Meta destacada</p>
            <p className="text-[11px] text-[#3F4943]">Así se ve tu nuevo color</p>
          </div>
          <button
            type="button"
            className="rounded-full bg-[var(--accent-primary)] px-3 py-1.5 text-[11px] font-bold text-white transition-all hover:scale-105"
          >
            Acción
          </button>
        </div>
      </div>
    </div>
  );
}

function SpaceSection() {
  const [name, setName] = useState("Mi espacio Vellium");

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center gap-3 rounded-3xl border border-[#DBE5DA] bg-[var(--accent-surface-variant)] p-6 sm:p-8">
        <div className="relative">
          <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-accent-gradient text-[36px] font-bold text-white shadow-[0_12px_32px_rgba(56,106,32,0.4)]">
            M
          </div>
          <button
            type="button"
            aria-label="Cambiar avatar"
            className="absolute -bottom-1 -right-1 flex h-9 w-9 items-center justify-center rounded-full bg-[#171D19] text-white shadow-lg transition-all hover:scale-110 hover:bg-[var(--accent-primary)]"
          >
            <Icon name="photo_camera" size={16} filled />
          </button>
        </div>
        <p className="text-[12px] text-[#3F4943]">Toca para cambiar el avatar</p>
      </div>

      <Field label="Nombre del espacio">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-transparent text-[14px] font-semibold text-[#171D19] focus:outline-none"
        />
      </Field>

      <Field label="Descripción" hint="Una breve descripción de tu espacio.">
        <textarea
          rows={3}
          placeholder="Mi espacio personal de productividad..."
          className="w-full resize-none bg-transparent text-[13px] text-[#171D19] placeholder:text-[#6F7975] focus:outline-none"
        />
      </Field>

      <div className="rounded-2xl border border-[#FF6B6B]/30 bg-[#FFD9D9]/40 p-4">
        <div className="flex items-center gap-2">
          <Icon name="warning" size={18} filled className="text-[#B3261E]" />
          <p className="text-[13px] font-bold text-[#B3261E]">Zona de peligro</p>
        </div>
        <p className="mt-1 text-[11px] text-[#B3261E]/80">
          Eliminar este espacio borrará todos tus datos permanentemente.
        </p>
        <button
          type="button"
          className="mt-3 rounded-full bg-[#B3261E] px-4 py-1.5 text-[12px] font-bold text-white transition-all hover:bg-[#8C1D17] active:scale-95"
        >
          Eliminar espacio
        </button>
      </div>
    </div>
  );
}

function LanguageSection() {
  const [lang, setLang] = useState("es");
  const languages = [
    { id: "es", flag: "🇪🇸", label: "Español" },
    { id: "en", flag: "🇺🇸", label: "English" },
    { id: "pt", flag: "🇧🇷", label: "Português" },
    { id: "fr", flag: "🇫🇷", label: "Français" },
    { id: "de", flag: "🇩🇪", label: "Deutsch" },
    { id: "it", flag: "🇮🇹", label: "Italiano" },
  ];

  return (
    <div className="space-y-3">
      <p className="text-[13px] text-[#3F4943]">
        Elige el idioma. Tu AI Coach responderá en el mismo idioma.
      </p>
      <div className="grid gap-2 sm:grid-cols-2">
        {languages.map((l) => (
          <button
            key={l.id}
            type="button"
            onClick={() => setLang(l.id)}
            className={`flex items-center gap-3 rounded-2xl border-2 p-3 text-left transition-all ${
              lang === l.id
                ? "border-[var(--accent-primary)] bg-[var(--accent-surface-variant)]"
                : "border-[#DBE5DA] bg-white/60 hover:border-[var(--accent-primary)]/40"
            }`}
          >
            <span className="text-2xl">{l.flag}</span>
            <div className="flex-1">
              <p className="text-[13px] font-bold text-[#171D19]">{l.label}</p>
              <p className="text-[10px] uppercase text-[#3F4943]">{l.id}</p>
            </div>
            {lang === l.id && (
              <Icon name="check_circle" size={20} filled className="text-[var(--accent-primary)]" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

function ShortcutsSection() {
  const groups = [
    {
      title: "Navegación",
      items: [
        { keys: ["⌘", "K"], label: "Búsqueda rápida" },
        { keys: ["⌥", "/"], label: "Atajos de teclado" },
        { keys: ["⌘", ","], label: "Abrir ajustes" },
        { keys: ["G", "H"], label: "Ir al inicio" },
        { keys: ["G", "T"], label: "Ir a tareas" },
        { keys: ["G", "M"], label: "Ir a metas" },
      ],
    },
    {
      title: "Acciones",
      items: [
        { keys: ["⌘", "N"], label: "Nueva tarea" },
        { keys: ["⌘", "⇧", "N"], label: "Nueva meta" },
        { keys: ["⌘", "E"], label: "Editar seleccionado" },
        { keys: ["⌘", "D"], label: "Duplicar" },
        { keys: ["⌫"], label: "Eliminar" },
      ],
    },
    {
      title: "AI Coach",
      items: [
        { keys: ["⌘", "J"], label: "Abrir chat con coach" },
        { keys: ["⌘", "⇧", "P"], label: "Plan IA del día" },
        { keys: ["⌘", "/"], label: "Sugerir tareas" },
      ],
    },
  ];

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-[var(--accent-primary)]/20 bg-[var(--accent-surface-variant)] p-4">
        <div className="flex items-center gap-2">
          <Icon name="lightbulb" size={18} filled className="text-[var(--accent-primary)]" />
          <p className="text-[13px] font-bold text-[#171D19]">Tip</p>
        </div>
        <p className="mt-1 text-[12px] text-[#3F4943]">
          Presiona <Kbd>⌥</Kbd> <Kbd>/</Kbd> en cualquier momento para ver esta lista.
        </p>
      </div>

      {groups.map((g) => (
        <div key={g.title}>
          <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[#6F7975]">
            {g.title}
          </p>
          <div className="overflow-hidden rounded-2xl border border-[#DBE5DA] bg-white/60">
            {g.items.map((item, i) => (
              <div
                key={item.label}
                className={`flex items-center justify-between px-4 py-3 ${
                  i !== g.items.length - 1 ? "border-b border-[#DBE5DA]" : ""
                }`}
              >
                <span className="text-[13px] text-[#171D19]">{item.label}</span>
                <div className="flex items-center gap-1">
                  {item.keys.map((k, idx) => (
                    <span key={idx} className="flex items-center gap-1">
                      {idx > 0 && <span className="text-[10px] text-[#6F7975]">+</span>}
                      <Kbd>{k}</Kbd>
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="inline-flex h-6 min-w-[24px] items-center justify-center rounded-md border border-[#DBE5DA] bg-white px-1.5 text-[11px] font-bold text-[#171D19] shadow-[0_1px_2px_rgba(0,0,0,0.08)]">
      {children}
    </kbd>
  );
}

function AdvancedSection() {
  return (
    <div className="space-y-3">
      <ToggleRow icon="science" title="Funciones experimentales" desc="Activa features beta antes que nadie" />
      <ToggleRow icon="analytics" title="Analíticas anónimas" desc="Ayúdanos a mejorar Vellium" defaultChecked />
      <ToggleRow icon="cloud_sync" title="Sincronización en la nube" desc="Mantén tus datos sincronizados" defaultChecked />

      <Field label="Exportar datos" hint="Descarga todos tus datos en formato JSON.">
        <button
          type="button"
          className="flex items-center gap-2 rounded-full bg-[#171D19] px-4 py-2 text-[12px] font-bold text-white transition-all hover:bg-[var(--accent-primary)] active:scale-95"
        >
          <Icon name="download" size={14} />
          Exportar mis datos
        </button>
      </Field>

      <Field label="Caché">
        <button
          type="button"
          className="flex items-center gap-2 rounded-full border-2 border-[#171D19] bg-transparent px-4 py-2 text-[12px] font-bold text-[#171D19] transition-all hover:bg-[#171D19] hover:text-white active:scale-95"
        >
          <Icon name="cleaning_services" size={14} />
          Limpiar caché (2.3 MB)
        </button>
      </Field>
    </div>
  );
}

function AccountSection() {
  return (
    <div className="space-y-4">
      <Field label="Nombre">
        <input
          type="text"
          defaultValue="Maya Okafor"
          className="w-full bg-transparent text-[14px] font-semibold text-[#171D19] focus:outline-none"
        />
      </Field>

      <Field label="Correo electrónico">
        <div className="flex items-center justify-between">
          <span className="text-[14px] text-[#171D19]">maya@vellium.app</span>
          <span className="rounded-full bg-[var(--accent-surface-variant)] px-2 py-0.5 text-[10px] font-bold text-[var(--accent-primary)]">
            Verificado
          </span>
        </div>
      </Field>

      <Field label="Contraseña">
        <Link
          href="/auth/forgot"
          className="inline-flex items-center gap-2 text-[13px] font-bold text-[var(--accent-primary)] hover:underline"
        >
          <Icon name="lock_reset" size={14} />
          Cambiar contraseña
        </Link>
      </Field>

      <ToggleRow icon="security" title="Autenticación de dos factores" desc="Añade una capa extra de seguridad" />

      <div className="rounded-2xl border border-[#FF6B6B]/30 bg-[#FFD9D9]/40 p-4">
        <p className="text-[13px] font-bold text-[#B3261E]">Eliminar cuenta</p>
        <p className="mt-1 text-[11px] text-[#B3261E]/80">Esta acción es irreversible.</p>
        <button
          type="button"
          className="mt-3 rounded-full border-2 border-[#B3261E] bg-transparent px-4 py-1.5 text-[12px] font-bold text-[#B3261E] transition-all hover:bg-[#B3261E] hover:text-white active:scale-95"
        >
          Eliminar mi cuenta
        </button>
      </div>
    </div>
  );
}

function SubscriptionSection() {
  return (
    <div className="space-y-4">
      <div className="relative overflow-hidden rounded-3xl bg-accent-gradient p-6 text-white shadow-[0_12px_40px_rgba(56,106,32,0.35)]">
        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/20 blur-3xl" />
        <div className="relative flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Icon name="bolt" size={20} filled className="text-white" />
              <p className="font-serif text-[20px] font-medium">Vellium Pro</p>
            </div>
            <p className="mt-1 text-[12px] text-white/85">Plan activo · Renovación 25 ene 2026</p>
          </div>
          <span className="rounded-full bg-white/25 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider backdrop-blur">
            Activo
          </span>
        </div>
        <div className="mt-5 flex items-baseline gap-1">
          <span className="font-serif text-[36px] font-medium">$4.8</span>
          <span className="text-[12px] text-white/80">/ mes</span>
        </div>
        <button
          type="button"
          className="mt-4 rounded-full bg-white px-4 py-2 text-[12px] font-bold text-[var(--accent-primary)] transition-all hover:scale-105"
        >
          Gestionar suscripción
        </button>
      </div>

      <Field label="Método de pago">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-12 items-center justify-center rounded-lg bg-[#171D19] text-[10px] font-bold text-white">
            VISA
          </div>
          <span className="flex-1 text-[13px] text-[#171D19]">•••• •••• •••• 4242</span>
          <button
            type="button"
            className="text-[12px] font-bold text-[var(--accent-primary)] hover:underline"
          >
            Cambiar
          </button>
        </div>
      </Field>

      <Field label="Historial de facturas">
        <button
          type="button"
          className="flex items-center gap-2 text-[13px] font-bold text-[var(--accent-primary)] hover:underline"
        >
          <Icon name="receipt_long" size={16} />
          Ver todas las facturas
        </button>
      </Field>
    </div>
  );
}

function IntegrationsSection() {
  const apps = [
    { icon: "calendar_month", name: "Google Calendar", desc: "Sincroniza tus eventos", connected: true },
    { icon: "mail", name: "Gmail", desc: "Convierte correos en tareas", connected: false },
    { icon: "chat", name: "Slack", desc: "Notificaciones en tu workspace", connected: true },
    { icon: "code", name: "GitHub", desc: "Conecta issues y PRs", connected: false },
    { icon: "drive_file_move", name: "Notion", desc: "Importa páginas y bases", connected: false },
  ];

  return (
    <div className="space-y-2">
      {apps.map((a) => (
        <div
          key={a.name}
          className="flex items-center gap-3 rounded-2xl border border-[#DBE5DA] bg-white/60 p-4 transition-all hover:border-[var(--accent-primary)]/30 hover:bg-white"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--accent-surface-variant)]">
            <Icon name={a.icon} size={22} filled className="text-[var(--accent-primary)]" />
          </div>
          <div className="flex-1">
            <p className="text-[13px] font-bold text-[#171D19]">{a.name}</p>
            <p className="text-[11px] text-[#3F4943]">{a.desc}</p>
          </div>
          <button
            type="button"
            className={`rounded-full px-4 py-1.5 text-[12px] font-bold transition-all active:scale-95 ${
              a.connected
                ? "bg-[var(--accent-surface-variant)] text-[var(--accent-primary)] hover:bg-[var(--accent-container)]"
                : "bg-[#171D19] text-white hover:bg-[var(--accent-primary)]"
            }`}
          >
            {a.connected ? "Conectado" : "Conectar"}
          </button>
        </div>
      ))}
    </div>
  );
}

function PublishedSection() {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-[#DBE5DA] bg-white/40 py-16 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-[var(--accent-surface-variant)]">
        <Icon name="public_off" size={32} filled className="text-[#6F7975]" />
      </div>
      <p className="mt-4 font-serif text-[18px] font-medium text-[#171D19]">
        Aún no has publicado nada
      </p>
      <p className="mt-1 max-w-xs text-[12px] text-[#3F4943]">
        Comparte tus metas o reflexiones cuando estés listo.
      </p>
    </div>
  );
}

function TagsSection() {
  const tags = [
    { name: "urgente", count: 12, color: "from-[#FFD9E0] to-[#FFB8C8]" },
    { name: "trabajo", count: 34, color: "from-[var(--accent-from)] to-[var(--accent-to)]" },
    { name: "personal", count: 18, color: "from-[#FFE39C] to-[#FFD89E]" },
    { name: "idea", count: 7, color: "from-[#D8E5FF] to-[#B8C8FF]" },
  ];

  return (
    <div className="space-y-3">
      <button
        type="button"
        className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-[#DBE5DA] py-3 text-[12px] font-bold text-[#3F4943] transition-all hover:border-[var(--accent-primary)] hover:bg-[var(--accent-surface-variant)]/50 hover:text-[var(--accent-primary)]"
      >
        <Icon name="add" size={16} />
        Nueva etiqueta
      </button>

      {tags.map((t) => (
        <div
          key={t.name}
          className="flex items-center gap-3 rounded-2xl border border-[#DBE5DA] bg-white/60 p-3"
        >
          <div className={`flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br ${t.color}`}>
            <Icon name="tag" size={16} filled className="text-white" />
          </div>
          <div className="flex-1">
            <p className="text-[13px] font-bold text-[#171D19]">#{t.name}</p>
            <p className="text-[10px] text-[#3F4943]">{t.count} elementos</p>
          </div>
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-full text-[#3F4943] hover:bg-[var(--accent-surface-variant)] hover:text-[var(--accent-primary)]"
          >
            <Icon name="more_horiz" size={18} />
          </button>
        </div>
      ))}
    </div>
  );
}