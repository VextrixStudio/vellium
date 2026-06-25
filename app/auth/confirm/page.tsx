"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
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

export default function ConfirmPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (countdown <= 0) {
      router.push("/home");
      return;
    }
    const id = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(id);
  }, [countdown, router]);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F4FBF4] px-4 py-8 text-[#171D19] antialiased sm:px-6">
      <BackgroundBlobs />
      <ConfettiBlobs />

      <div
        className={`relative z-10 w-full max-w-md transition-all duration-700 ${
          mounted ? "translate-y-0 scale-100 opacity-100" : "translate-y-4 scale-95 opacity-0"
        }`}
      >
        <div className="relative overflow-hidden rounded-[36px] border border-white/70 bg-white/85 p-7 shadow-[0_30px_80px_-20px_rgba(56,106,32,0.25)] backdrop-blur-2xl sm:p-10">
          <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br from-[#B7F0AD]/60 to-[#52B788]/30 blur-2xl" />
          <div className="pointer-events-none absolute -left-12 -bottom-12 h-36 w-36 rounded-full bg-gradient-to-br from-[#FFE39C]/40 to-[#FFD89E]/10 blur-2xl" />

          <div className="relative flex flex-col items-center text-center">
            <SuccessBadge />

            <h1 className="mt-7 font-serif text-[32px] font-medium leading-[1.1] tracking-[-0.01em] text-[#171D19] sm:text-[40px]">
              ¡Bienvenido a <em className="italic text-[#386A20]">Vellium</em>!
            </h1>
            <p className="mt-3 max-w-sm text-[14px] leading-[1.55] text-[#3F4943] sm:text-[15px]">
              Tu cuenta fue creada con éxito. Estamos preparando tu espacio personal.
            </p>

            <StepsCompleted />

            <Link
              href="/home"
              className="group relative mt-6 flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-[#171D19] px-5 py-4 text-[15px] font-bold text-white shadow-[0_8px_24px_rgba(23,29,25,0.25)] transition-all duration-300 hover:bg-[#386A20] hover:shadow-[0_12px_32px_rgba(56,106,32,0.45)] active:scale-[0.98]"
            >
              <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#386A20]/40 blur-2xl transition-all duration-500 group-hover:bg-[#52B788]/40" />
              <span className="relative">Ir a mi espacio</span>
              <Icon name="arrow_forward" size={20} className="relative transition-transform group-hover:translate-x-1" />
            </Link>

            <p className="mt-4 text-[12px] text-[#6F7975]">
              Redirigiendo automáticamente en{" "}
              <span className="font-bold text-[#386A20]">{countdown}s</span>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

function SuccessBadge() {
  return (
    <div className="relative">
      <div className="absolute inset-0 animate-ping rounded-full bg-[#52B788]/30" style={{ animationDuration: "2s" }} />
      <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[#386A20] to-[#52B788] shadow-[0_20px_50px_rgba(56,106,32,0.5)]">
        <svg width="56" height="56" viewBox="0 0 56 56" fill="none" aria-hidden>
          <path
            d="M28 0L34.5 4.2L42 2.5L45.5 9.1L52.8 11L52.5 18.7L57 25L52.5 31.3L52.8 39L45.5 40.9L42 47.5L34.5 45.8L28 50L21.5 45.8L14 47.5L10.5 40.9L3.2 39L3.5 31.3L-1 25L3.5 18.7L3.2 11L10.5 9.1L14 2.5L21.5 4.2L28 0Z"
            fill="white"
            fillOpacity="0.15"
          />
        </svg>
        <Icon name="check" size={56} className="absolute font-black text-white" />
      </div>
    </div>
  );
}

function StepsCompleted() {
  const steps = [
    { icon: "mail", label: "Correo verificado" },
    { icon: "person_check", label: "Cuenta creada" },
    { icon: "rocket_launch", label: "Espacio listo" },
  ];

  return (
    <div className="mt-7 w-full space-y-2">
      {steps.map((s) => (
        <div
          key={s.label}
          className="flex items-center gap-3 rounded-2xl border border-[#B7F0AD]/50 bg-[#EEF5EE] px-4 py-3"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white">
            <Icon name={s.icon} size={18} filled className="text-[#386A20]" />
          </div>
          <span className="flex-1 text-left text-[13px] font-semibold text-[#171D19]">
            {s.label}
          </span>
          <Icon name="check_circle" size={20} filled className="text-[#386A20]" />
        </div>
      ))}
    </div>
  );
}

function BackgroundBlobs() {
  return (
    <>
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-gradient-to-br from-[#52B788]/40 to-[#B7F0AD]/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 -bottom-32 h-[28rem] w-[28rem] rounded-full bg-gradient-to-br from-[#B7F0AD]/40 to-[#FFE39C]/20 blur-3xl" />
    </>
  );
}

function ConfettiBlobs() {
  return (
    <>
      <div className="pointer-events-none absolute left-[15%] top-[20%] h-3 w-3 rotate-12 rounded-sm bg-[#386A20]" />
      <div className="pointer-events-none absolute right-[20%] top-[25%] h-4 w-4 -rotate-12 rounded-sm bg-[#52B788]" />
      <div className="pointer-events-none absolute left-[10%] bottom-[25%] h-3 w-3 rotate-45 rounded-sm bg-[#FFE39C]" />
      <div className="pointer-events-none absolute right-[12%] bottom-[20%] h-4 w-4 -rotate-45 rounded-sm bg-[#FFD9E0]" />
      <div className="pointer-events-none absolute left-[25%] top-[15%] h-2 w-2 rounded-full bg-[#B7F0AD]" />
      <div className="pointer-events-none absolute right-[28%] bottom-[15%] h-2 w-2 rounded-full bg-[#52B788]" />
    </>
  );
}