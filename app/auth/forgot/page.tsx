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

export default function ForgotPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => setMounted(true), []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) {
      setError("Ingresa un correo válido");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    sessionStorage.setItem("vellium_forgot_email", email);
    router.push("/auth/forgot/verify");
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F4FBF4] px-4 py-8 text-[#171D19] antialiased sm:px-6">
      <BackgroundBlobs />

      <div
        className={`relative z-10 w-full max-w-md transition-all duration-700 ${
          mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        <Link
          href="/auth/login"
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/60 px-4 py-2 text-[12px] font-semibold text-[#171D19] backdrop-blur-xl transition-all hover:-translate-x-0.5 hover:bg-white/90"
        >
          <Icon name="arrow_back" size={14} />
          Volver al login
        </Link>

        <div className="relative overflow-hidden rounded-[36px] border border-white/70 bg-white/85 p-7 shadow-[0_30px_80px_-20px_rgba(56,106,32,0.25)] backdrop-blur-2xl sm:p-10">
          <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br from-[#B7F0AD]/60 to-[#52B788]/20 blur-2xl" />
          <div className="pointer-events-none absolute -left-12 -bottom-12 h-36 w-36 rounded-full bg-gradient-to-br from-[#FFE39C]/40 to-[#FFD89E]/10 blur-2xl" />

          <div className="relative">
            <div className="flex flex-col items-center text-center">
              <div className="relative">
                <div className="flex h-20 w-20 items-center justify-center rounded-[28px] bg-gradient-to-br from-[#386A20] to-[#52B788] shadow-[0_16px_40px_rgba(56,106,32,0.45)]">
                  <Icon name="lock_reset" size={40} filled className="text-white" />
                </div>
                <div className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#FFE39C] shadow-md">
                  <Icon name="key" size={14} filled className="text-[#9B7E2D]" />
                </div>
              </div>

              <h1 className="mt-6 font-serif text-[28px] font-medium leading-[1.15] tracking-[-0.01em] text-[#171D19] sm:text-[32px]">
                ¿Olvidaste tu contraseña?
              </h1>
              <p className="mt-2 max-w-xs text-[13px] leading-[1.55] text-[#3F4943] sm:text-[14px]">
                No te preocupes. Ingresa tu correo y te enviaremos un código para recuperarla.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-3">
              <div className="group">
                <label htmlFor="email" className="mb-1.5 block px-1 text-[11px] font-bold uppercase tracking-[0.12em] text-[#3F4943]">
                  Correo electrónico
                </label>
                <div className="flex items-center gap-2 rounded-2xl border border-[#171D19]/10 bg-white/80 px-4 py-3 transition-all focus-within:border-[#386A20] focus-within:bg-white focus-within:shadow-[0_4px_16px_rgba(56,106,32,0.12)]">
                  <Icon name="mail" size={18} className="text-[#3F4943]" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="tu@correo.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError("");
                    }}
                    required
                    className="flex-1 bg-transparent text-[14px] text-[#171D19] placeholder:text-[#6F7975] focus:outline-none"
                  />
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 rounded-2xl border border-[#FF6B6B]/30 bg-[#FFD9D9]/40 px-4 py-3">
                  <Icon name="error" size={16} filled className="text-[#B3261E]" />
                  <p className="text-[12px] font-medium text-[#B3261E]">{error}</p>
                </div>
              )}

              <div className="flex items-start gap-2 rounded-2xl border border-[#B7F0AD]/50 bg-[#EEF5EE] px-4 py-3">
                <Icon name="info" size={16} filled className="mt-0.5 shrink-0 text-[#386A20]" />
                <p className="text-[11px] leading-[1.5] text-[#3F4943]">
                  Te enviaremos un código de 4 dígitos. Si no lo recibes, revisa tu carpeta de spam.
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="group relative mt-4 flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-[#171D19] px-5 py-4 text-[15px] font-bold text-white shadow-[0_8px_24px_rgba(23,29,25,0.25)] transition-all duration-300 hover:bg-[#386A20] hover:shadow-[0_12px_32px_rgba(56,106,32,0.45)] active:scale-[0.98] disabled:opacity-70"
              >
                <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#386A20]/40 blur-2xl transition-all duration-500 group-hover:bg-[#52B788]/40" />
                <span className="relative">{loading ? "Enviando..." : "Enviar código"}</span>
                {!loading && (
                  <Icon name="send" size={18} className="relative transition-transform group-hover:translate-x-1" />
                )}
              </button>
            </form>

            <p className="mt-6 text-center text-[13px] text-[#3F4943]">
              ¿Recordaste tu contraseña?{" "}
              <Link href="/auth/login" className="font-bold text-[#386A20] hover:underline">
                Iniciar sesión
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
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