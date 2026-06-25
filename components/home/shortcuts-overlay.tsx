"use client";

import { useEffect } from "react";

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

export default function ShortcutsOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" && open) onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const groups = [
    {
      icon: "explore",
      title: "Navegación",
      gradient: "from-[#B7F0AD] to-[#52B788]",
      items: [
        { keys: ["⌘", "K"], label: "Búsqueda rápida" },
        { keys: ["⌥", "/"], label: "Este menú" },
        { keys: ["G", "H"], label: "Ir al inicio" },
        { keys: ["G", "T"], label: "Ir a tareas" },
        { keys: ["G", "M"], label: "Ir a metas" },
        { keys: ["G", "C"], label: "Ir a calendario" },
      ],
    },
    {
      icon: "add_circle",
      title: "Crear",
      gradient: "from-[#FFE39C] to-[#FFD89E]",
      items: [
        { keys: ["⌘", "N"], label: "Nueva tarea" },
        { keys: ["⌘", "⇧", "N"], label: "Nueva meta" },
        { keys: ["⌘", "⇧", "J"], label: "Nuevo diario" },
      ],
    },
    {
      icon: "edit",
      title: "Edición",
      gradient: "from-[#FFD9E0] to-[#FFB8C8]",
      items: [
        { keys: ["⌘", "E"], label: "Editar" },
        { keys: ["⌘", "D"], label: "Duplicar" },
        { keys: ["⌘", "Z"], label: "Deshacer" },
        { keys: ["⌫"], label: "Eliminar" },
      ],
    },
    {
      icon: "auto_awesome",
      title: "AI Coach",
      gradient: "from-[#D8E5FF] to-[#B8C8FF]",
      items: [
        { keys: ["⌘", "J"], label: "Chat con coach" },
        { keys: ["⌘", "⇧", "P"], label: "Plan del día" },
        { keys: ["⌘", "/"], label: "Sugerir tareas" },
      ],
    },
  ];

  return (
    <div className="fixed inset-0 z-[65] flex items-center justify-center p-4 sm:p-6">
      <div onClick={onClose} className="absolute inset-0 bg-[#171D19]/50 backdrop-blur-md" />

      <div className="relative max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-[32px] border border-white/70 bg-white/95 shadow-[0_40px_120px_-20px_rgba(56,106,32,0.4)] backdrop-blur-2xl">
        <header className="flex items-center justify-between border-b border-[#DBE5DA] px-6 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-[#386A20] to-[#52B788] shadow-sm">
              <Icon name="keyboard" size={18} filled className="text-white" />
            </div>
            <div>
              <h2 className="font-serif text-[18px] font-medium text-[#171D19]">
                Atajos de teclado
              </h2>
              <p className="text-[11px] text-[#3F4943]">
                Domina Vellium con el teclado
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#EEF5EE] text-[#171D19] transition-all hover:bg-[#FFD9D9] hover:text-[#B3261E] active:scale-95"
          >
            <Icon name="close" size={20} />
          </button>
        </header>

        <div className="grid max-h-[70vh] gap-4 overflow-y-auto p-6 sm:grid-cols-2">
          {groups.map((g) => (
            <div key={g.title} className="rounded-3xl border border-[#DBE5DA] bg-white/60 p-5">
              <div className="mb-3 flex items-center gap-2">
                <div className={`flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br ${g.gradient}`}>
                  <Icon name={g.icon} size={16} filled className="text-white" />
                </div>
                <p className="font-serif text-[15px] font-medium text-[#171D19]">{g.title}</p>
              </div>
              <ul className="space-y-1">
                {g.items.map((item) => (
                  <li
                    key={item.label}
                    className="flex items-center justify-between rounded-xl px-2 py-2 transition-colors hover:bg-[#EEF5EE]"
                  >
                    <span className="text-[12px] text-[#171D19]">{item.label}</span>
                    <div className="flex items-center gap-1">
                      {item.keys.map((k, i) => (
                        <span key={i} className="flex items-center gap-1">
                          {i > 0 && <span className="text-[10px] text-[#6F7975]">+</span>}
                          <kbd className="inline-flex h-6 min-w-[24px] items-center justify-center rounded-md border border-[#DBE5DA] bg-white px-1.5 text-[10px] font-bold text-[#171D19] shadow-sm">
                            {k}
                          </kbd>
                        </span>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <footer className="flex items-center justify-between border-t border-[#DBE5DA] bg-[#F4FBF4]/60 px-6 py-3">
          <p className="text-[11px] text-[#3F4943]">
            Presiona <kbd className="rounded border border-[#DBE5DA] bg-white px-1.5 py-0.5 text-[10px] font-bold">ESC</kbd> para cerrar
          </p>
          <div className="flex items-center gap-1">
            <Icon name="bolt" size={14} filled className="text-[#386A20]" />
            <span className="text-[11px] font-bold text-[#386A20]">Vellium Pro</span>
          </div>
        </footer>
      </div>
    </div>
  );
}