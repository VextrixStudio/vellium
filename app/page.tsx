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
/* MAIN PAGE                                                                  */
/* ========================================================================== */

export default function WelcomePage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F4FBF4] px-4 py-8 text-[#171D19] antialiased sm:px-6">
      <BackgroundBlobs />
      <FloatingWidgets />

      <div className="relative z-10 w-full max-w-md">
        <WelcomeCard />
      </div>
    </main>
  );
}

/* ========================================================================== */
/* BACKGROUND BLOBS                                                           */
/* ========================================================================== */

function BackgroundBlobs() {
  return (
    <>
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-gradient-to-br from-[#52B788]/40 to-[#B7F0AD]/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 -bottom-32 h-[28rem] w-[28rem] rounded-full bg-gradient-to-br from-[#B7F0AD]/40 to-[#FFE39C]/20 blur-3xl" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-[#C8F2E0]/30 to-[#52B788]/10 blur-3xl" />
      <div className="pointer-events-none absolute right-[15%] top-[10%] h-20 w-40 rounded-full bg-white/60 blur-2xl" />
      <div className="pointer-events-none absolute left-[10%] bottom-[15%] h-16 w-32 rounded-full bg-white/50 blur-2xl" />
    </>
  );
}

/* ========================================================================== */
/* FLOATING WIDGETS (decoration)                                              */
/* ========================================================================== */

function FloatingWidgets() {
  return (
    <>
      <div className="pointer-events-none absolute left-[5%] top-[12%] hidden lg:block">
        <div className="rotate-[-8deg] rounded-3xl border border-white/60 bg-white/80 p-4 shadow-[0_12px_32px_rgba(56,106,32,0.15)] backdrop-blur-xl">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-[#386A20] to-[#52B788]">
              <Icon name="track_changes" size={18} filled className="text-white" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-[#171D19]">Goal shipped!</p>
              <p className="text-[10px] text-[#3F4943]">Just now · 67%</p>
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute right-[8%] top-[20%] hidden lg:block">
        <div className="rotate-[6deg] rounded-3xl border border-white/60 bg-white/80 p-4 shadow-[0_12px_32px_rgba(56,106,32,0.15)] backdrop-blur-xl">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FFE39C] to-[#FFD89E]">
              <Icon name="local_fire_department" size={18} filled className="text-[#9B7E2D]" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-[#171D19]">7-day streak</p>
              <p className="text-[10px] text-[#3F4943]">Keep it going 🔥</p>
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute left-[8%] bottom-[15%] hidden lg:block">
        <div className="rotate-[5deg] rounded-3xl border border-white/60 bg-white/80 p-4 shadow-[0_12px_32px_rgba(56,106,32,0.15)] backdrop-blur-xl">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-[#B7F0AD] to-[#52B788]">
              <Icon name="auto_awesome" size={18} filled className="text-white" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-[#171D19]">AI Coach ready</p>
              <p className="text-[10px] text-[#3F4943]">Plan your day</p>
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute right-[6%] bottom-[18%] hidden lg:block">
        <div className="rotate-[-7deg] rounded-3xl border border-white/60 bg-white/80 p-4 shadow-[0_12px_32px_rgba(56,106,32,0.15)] backdrop-blur-xl">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FFD9E0] to-[#FFB8C8]">
              <Icon name="check_circle" size={18} filled className="text-white" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-[#171D19]">3 tasks done</p>
              <p className="text-[10px] text-[#3F4943]">Today · Great job!</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* ========================================================================== */
/* WELCOME CARD                                                               */
/* ========================================================================== */

function WelcomeCard() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      className={`relative overflow-hidden rounded-[36px] border border-white/70 bg-white/85 p-7 shadow-[0_30px_80px_-20px_rgba(56,106,32,0.25)] backdrop-blur-2xl transition-all duration-700 sm:p-10 ${
        mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
    >
      <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br from-[#B7F0AD]/60 to-[#52B788]/20 blur-2xl" />
      <div className="pointer-events-none absolute -left-12 -bottom-12 h-36 w-36 rounded-full bg-gradient-to-br from-[#FFE39C]/40 to-[#FFD89E]/10 blur-2xl" />

      <div className="relative">
        <BrandHeader />
        <Heading />
        <ActionsBlock />
        <Footer />
      </div>
    </div>
  );
}

/* ========================================================================== */
/* BRAND HEADER                                                               */
/* ========================================================================== */

function BrandHeader() {
  return (
    <div className="flex flex-col items-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-[#386A20] to-[#52B788] shadow-[0_12px_32px_rgba(56,106,32,0.4)]">
        <Icon name="bolt" size={32} filled className="text-white" />
      </div>
      <span className="mt-4 font-serif text-[22px] font-medium tracking-tight text-[#171D19]">
        Vellium
      </span>
      <div className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-[#386A20]/15 bg-white/60 px-3 py-1 backdrop-blur">
        <span className="h-1.5 w-1.5 rounded-full bg-[#386A20]" />
        <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#386A20]">
          AI Coach
        </span>
      </div>
    </div>
  );
}

/* ========================================================================== */
/* HEADING                                                                    */
/* ========================================================================== */

function Heading() {
  return (
    <div className="mt-8 text-center">
      <h1 className="font-serif text-[28px] font-medium leading-[1.15] tracking-[-0.01em] text-[#171D19] sm:text-[34px]">
        Elige una de las opciones
        <br />
        para <em className="italic text-[#386A20]">empezar</em>
      </h1>
      <p className="mx-auto mt-3 max-w-xs text-[13px] leading-[1.55] text-[#3F4943] sm:text-[14px]">
        Convierte tus metas en trabajo entregado con tu coach personal de IA.
      </p>
    </div>
  );
}

/* ========================================================================== */
/* MAIN ACTIONS (Login + Register)                                            */
/* ========================================================================== */

function ActionsBlock() {
  return (
    <div className="mt-8 flex flex-col gap-2.5">
      <Link
        href="/auth/register"
        className="group relative flex items-center justify-between overflow-hidden rounded-2xl bg-[#171D19] px-5 py-4 text-white shadow-[0_8px_24px_rgba(23,29,25,0.25)] transition-all duration-300 hover:bg-[#386A20] hover:shadow-[0_12px_32px_rgba(56,106,32,0.45)] active:scale-[0.98]"
      >
        <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#386A20]/40 blur-2xl transition-all duration-500 group-hover:bg-[#52B788]/40" />
        <div className="relative flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[#386A20] to-[#52B788] shadow-[0_4px_12px_rgba(56,106,32,0.5)]">
            <Icon name="rocket_launch" size={20} filled className="text-white" />
          </div>
          <div className="text-left">
            <p className="text-[15px] font-bold leading-tight">Crear cuenta</p>
            <p className="text-[11px] text-white/70">Prueba Vellium gratis</p>
          </div>
        </div>
        <Icon
          name="arrow_forward"
          size={20}
          className="relative transition-transform group-hover:translate-x-1"
        />
      </Link>

      <Link
        href="/auth/login"
        className="group relative flex items-center justify-between overflow-hidden rounded-2xl border border-[#171D19]/10 bg-white/80 px-5 py-4 text-[#171D19] backdrop-blur-xl transition-all duration-300 hover:border-[#386A20]/30 hover:bg-white hover:shadow-[0_8px_24px_rgba(56,106,32,0.15)] active:scale-[0.98]"
      >
        <div className="pointer-events-none absolute -left-12 -bottom-12 h-32 w-32 rounded-full bg-[#B7F0AD]/30 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="relative flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#EEF5EE] transition-colors group-hover:bg-[#B7F0AD]">
            <Icon name="login" size={20} className="text-[#386A20]" />
          </div>
          <div className="text-left">
            <p className="text-[15px] font-bold leading-tight">Iniciar sesión</p>
            <p className="text-[11px] text-[#3F4943]">Ya tengo una cuenta</p>
          </div>
        </div>
        <Icon
          name="arrow_forward"
          size={20}
          className="relative text-[#3F4943] transition-all group-hover:translate-x-1 group-hover:text-[#386A20]"
        />
      </Link>
    </div>
  );
}



function Footer() {
  return (
    <div className="mt-7 space-y-3 text-center">
      <p className="text-[11px] leading-relaxed text-[#3F4943]">
        Al continuar, aceptas nuestros{" "}
        <Link href="/terms" className="font-semibold text-[#386A20] hover:underline">
          Términos
        </Link>{" "}
        y{" "}
        <Link href="/privacy" className="font-semibold text-[#386A20] hover:underline">
          Política de Privacidad
        </Link>
        .
      </p>

      <Link
        href="/landing"
        className="inline-flex items-center gap-1 text-[12px] font-medium text-[#3F4943] transition-colors hover:text-[#386A20]"
      >
        <Icon name="arrow_back" size={14} />
        Volver al inicio
      </Link>
    </div>
  );
}