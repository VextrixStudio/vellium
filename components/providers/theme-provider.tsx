"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";

export type AccentId = "green" | "purple" | "orange" | "blue" | "pink";
export type Density = "compact" | "comfortable" | "spacious";

type AccentTokens = {
  id: AccentId;
  name: string;
  primary: string;
  primaryDark: string;
  primaryLight: string;
  container: string;
  onContainer: string;
  surface: string;
  surfaceVariant: string;
  from: string;
  to: string;
};

const ACCENTS: Record<AccentId, AccentTokens> = {
  green: {
    id: "green",
    name: "Verde",
    primary: "#386A20",
    primaryDark: "#1A4314",
    primaryLight: "#52B788",
    container: "#B7F0AD",
    onContainer: "#062100",
    surface: "#F4FBF4",
    surfaceVariant: "#EEF5EE",
    from: "#386A20",
    to: "#52B788",
  },
  purple: {
    id: "purple",
    name: "Púrpura",
    primary: "#6750A4",
    primaryDark: "#4A3D80",
    primaryLight: "#9B8DDB",
    container: "#EADDFF",
    onContainer: "#21005D",
    surface: "#FBF7FF",
    surfaceVariant: "#F4EFF4",
    from: "#6750A4",
    to: "#9B8DDB",
  },
  orange: {
    id: "orange",
    name: "Naranja",
    primary: "#D97757",
    primaryDark: "#9B4F35",
    primaryLight: "#E9B89C",
    container: "#FFE39C",
    onContainer: "#4A1F00",
    surface: "#FBF7F3",
    surfaceVariant: "#F4EEE8",
    from: "#D97757",
    to: "#E9B89C",
  },
  blue: {
    id: "blue",
    name: "Azul",
    primary: "#1A4F8B",
    primaryDark: "#0D2D52",
    primaryLight: "#5B8DEF",
    container: "#D8E5FF",
    onContainer: "#001A40",
    surface: "#F7F9FE",
    surfaceVariant: "#EEF1F8",
    from: "#1A4F8B",
    to: "#5B8DEF",
  },
  pink: {
    id: "pink",
    name: "Rosa",
    primary: "#B3445B",
    primaryDark: "#7A2A3D",
    primaryLight: "#FFB8C8",
    container: "#FFD9E0",
    onContainer: "#3E0014",
    surface: "#FFF7F9",
    surfaceVariant: "#F8EEF1",
    from: "#B3445B",
    to: "#FFB8C8",
  },
};

const DENSITY_SCALE: Record<Density, string> = {
  compact: "0.92",
  comfortable: "1",
  spacious: "1.08",
};

type ThemeContextValue = {
  accent: AccentId;
  setAccent: (id: AccentId) => void;
  accents: AccentTokens[];
  tokens: AccentTokens;
  density: Density;
  setDensity: (d: Density) => void;
  animations: boolean;
  setAnimations: (v: boolean) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = "vellium_home_appearance_v1";

type StoredPrefs = {
  accent: AccentId;
  density: Density;
  animations: boolean;
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [accent, setAccentState] = useState<AccentId>("green");
  const [density, setDensityState] = useState<Density>("comfortable");
  const [animations, setAnimationsState] = useState(true);
  const [hydrated, setHydrated] = useState(false);
  const scopeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const prefs = JSON.parse(raw) as StoredPrefs;
        if (prefs.accent && ACCENTS[prefs.accent]) setAccentState(prefs.accent);
        if (prefs.density) setDensityState(prefs.density);
        if (typeof prefs.animations === "boolean") setAnimationsState(prefs.animations);
      }
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const prefs: StoredPrefs = { accent, density, animations };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  }, [accent, density, animations, hydrated]);

  useEffect(() => {
    const scopes = document.querySelectorAll<HTMLElement>(".home-scope");
    const t = ACCENTS[accent];

    scopes.forEach((el) => {
      el.style.setProperty("--accent-primary", t.primary);
      el.style.setProperty("--accent-primary-dark", t.primaryDark);
      el.style.setProperty("--accent-primary-light", t.primaryLight);
      el.style.setProperty("--accent-container", t.container);
      el.style.setProperty("--accent-on-container", t.onContainer);
      el.style.setProperty("--accent-surface", t.surface);
      el.style.setProperty("--accent-surface-variant", t.surfaceVariant);
      el.style.setProperty("--accent-from", t.from);
      el.style.setProperty("--accent-to", t.to);
      el.style.setProperty("--ui-scale", DENSITY_SCALE[density]);
      el.dataset.accent = accent;
      el.dataset.density = density;
      el.dataset.animations = animations ? "on" : "off";
    });

    const root = document.documentElement;
    root.style.setProperty("--accent-primary", t.primary);
    root.style.setProperty("--accent-primary-dark", t.primaryDark);
    root.style.setProperty("--accent-primary-light", t.primaryLight);
    root.style.setProperty("--accent-container", t.container);
    root.style.setProperty("--accent-on-container", t.onContainer);
    root.style.setProperty("--accent-surface", t.surface);
    root.style.setProperty("--accent-surface-variant", t.surfaceVariant);
    root.style.setProperty("--accent-from", t.from);
    root.style.setProperty("--accent-to", t.to);
    root.dataset.homeAccent = accent;
  }, [accent, density, animations, hydrated]);

  const value: ThemeContextValue = {
    accent,
    setAccent: setAccentState,
    accents: Object.values(ACCENTS),
    tokens: ACCENTS[accent],
    density,
    setDensity: setDensityState,
    animations,
    setAnimations: setAnimationsState,
  };

  return (
    <ThemeContext.Provider value={value}>
      <div ref={scopeRef} style={{ display: "contents" }}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    return {
      accent: "green" as AccentId,
      setAccent: () => {},
      accents: Object.values(ACCENTS),
      tokens: ACCENTS.green,
      density: "comfortable" as Density,
      setDensity: () => {},
      animations: true,
      setAnimations: () => {},
    };
  }
  return ctx;
}