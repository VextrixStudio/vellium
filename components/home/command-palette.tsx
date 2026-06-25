"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

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

type Command = {
  id: string;
  label: string;
  icon: string;
  group: string;
  action?: () => void;
  shortcut?: string[];
  href?: string;
};

export default function CommandPalette({
  open,
  onClose,
  onOpenSettings,
  onOpenShortcuts,
}: {
  open: boolean;
  onClose: () => void;
  onOpenSettings: () => void;
  onOpenShortcuts: () => void;
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const commands: Command[] = [
    { id: "new-task", label: "Nueva tarea", icon: "add_task", group: "Crear", shortcut: ["⌘", "N"] },
    { id: "new-goal", label: "Nueva meta", icon: "flag", group: "Crear", shortcut: ["⌘", "⇧", "N"] },
    { id: "new-note", label: "Nueva nota", icon: "edit_note", group: "Crear" },
    { id: "go-home", label: "Ir al inicio", icon: "home", group: "Navegar", href: "/home", shortcut: ["G", "H"] },
    { id: "go-goals", label: "Ir a metas", icon: "track_changes", group: "Navegar", href: "/goals", shortcut: ["G", "M"] },
    { id: "go-tasks", label: "Ir a tareas", icon: "task_alt", group: "Navegar", href: "/tasks", shortcut: ["G", "T"] },
    { id: "go-calendar", label: "Ir a calendario", icon: "calendar_month", group: "Navegar", href: "/calendar" },
    { id: "go-coach", label: "Abrir AI Coach", icon: "auto_awesome", group: "Navegar", href: "/coach", shortcut: ["⌘", "J"] },
    { id: "settings", label: "Abrir ajustes", icon: "settings", group: "Sistema", action: onOpenSettings },
    { id: "shortcuts", label: "Ver atajos de teclado", icon: "keyboard", group: "Sistema", action: onOpenShortcuts, shortcut: ["⌥", "/"] },
    { id: "theme", label: "Cambiar tema", icon: "palette", group: "Sistema" },
    { id: "logout", label: "Cerrar sesión", icon: "logout", group: "Sistema", href: "/auth/login" },
  ];

  const filtered = commands.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase())
  );

  const grouped = filtered.reduce((acc, cmd) => {
    if (!acc[cmd.group]) acc[cmd.group] = [];
    acc[cmd.group].push(cmd);
    return acc;
  }, {} as Record<string, Command[]>);

  useEffect(() => {
    if (open) {
      setQuery("");
      setSelected(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => setSelected(0), [query]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!open) return;
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelected((s) => Math.min(s + 1, filtered.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelected((s) => Math.max(s - 1, 0));
      }
      if (e.key === "Enter" && filtered[selected]) {
        e.preventDefault();
        executeCommand(filtered[selected]);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, filtered, selected]);

  function executeCommand(cmd: Command) {
    onClose();
    if (cmd.action) cmd.action();
    else if (cmd.href) router.push(cmd.href);
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-start justify-center p-4 pt-[12vh] sm:p-6 sm:pt-[15vh]">
      <div onClick={onClose} className="absolute inset-0 bg-[#171D19]/40 backdrop-blur-md" />

      <div className="relative w-full max-w-2xl overflow-hidden rounded-[28px] border border-white/70 bg-white/95 shadow-[0_40px_120px_-20px_rgba(56,106,32,0.4)] backdrop-blur-2xl">
        <div className="flex items-center gap-3 border-b border-[#DBE5DA] px-5 py-4">
          <Icon name="search" size={22} className="text-[#386A20]" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Busca comandos, tareas, metas..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-[15px] text-[#171D19] placeholder:text-[#6F7975] focus:outline-none"
          />
          <kbd className="hidden h-6 items-center rounded-md border border-[#DBE5DA] bg-white px-2 text-[10px] font-bold text-[#3F4943] shadow-sm sm:inline-flex">
            ESC
          </kbd>
        </div>

        <div className="max-h-[420px] overflow-y-auto p-2">
          {Object.keys(grouped).length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Icon name="search_off" size={32} className="text-[#6F7975]" />
              <p className="mt-2 text-[14px] font-semibold text-[#171D19]">
                No hay resultados
              </p>
              <p className="text-[12px] text-[#3F4943]">
                Intenta con otra búsqueda
              </p>
            </div>
          ) : (
            Object.entries(grouped).map(([group, items]) => (
              <div key={group} className="mb-2 last:mb-0">
                <p className="px-3 pb-1 pt-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[#6F7975]">
                  {group}
                </p>
                <ul className="space-y-0.5">
                  {items.map((cmd) => {
                    const idx = filtered.indexOf(cmd);
                    const isSelected = idx === selected;
                    return (
                      <li key={cmd.id}>
                        <button
                          type="button"
                          onClick={() => executeCommand(cmd)}
                          onMouseEnter={() => setSelected(idx)}
                          className={`flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition-all ${
                            isSelected
                              ? "bg-[#B7F0AD] text-[#062100]"
                              : "text-[#3F4943] hover:bg-[#EEF5EE]"
                          }`}
                        >
                          <div
                            className={`flex h-9 w-9 items-center justify-center rounded-xl transition-colors ${
                              isSelected ? "bg-white" : "bg-[#EEF5EE]"
                            }`}
                          >
                            <Icon
                              name={cmd.icon}
                              size={18}
                              filled={isSelected}
                              className="text-[#386A20]"
                            />
                          </div>
                          <span className="flex-1 text-[13px] font-semibold text-[#171D19]">
                            {cmd.label}
                          </span>
                          {cmd.shortcut && (
                            <div className="hidden items-center gap-1 sm:flex">
                              {cmd.shortcut.map((k, i) => (
                                <kbd
                                  key={i}
                                  className={`inline-flex h-6 min-w-[24px] items-center justify-center rounded-md border px-1.5 text-[10px] font-bold ${
                                    isSelected
                                      ? "border-white/60 bg-white/80 text-[#386A20]"
                                      : "border-[#DBE5DA] bg-white text-[#171D19]"
                                  }`}
                                >
                                  {k}
                                </kbd>
                              ))}
                            </div>
                          )}
                          {isSelected && (
                            <Icon name="keyboard_return" size={16} className="text-[#386A20]" />
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))
          )}
        </div>

        <div className="flex items-center justify-between border-t border-[#DBE5DA] bg-[#F4FBF4]/60 px-4 py-2.5">
          <div className="flex items-center gap-3 text-[10px] text-[#3F4943]">
            <span className="flex items-center gap-1">
              <kbd className="rounded border border-[#DBE5DA] bg-white px-1 font-bold">↑↓</kbd>
              Navegar
            </span>
            <span className="flex items-center gap-1">
              <kbd className="rounded border border-[#DBE5DA] bg-white px-1 font-bold">↵</kbd>
              Seleccionar
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Icon name="bolt" size={12} filled className="text-[#386A20]" />
            <span className="text-[10px] font-bold text-[#386A20]">Vellium</span>
          </div>
        </div>
      </div>
    </div>
  );
}