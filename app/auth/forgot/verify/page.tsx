"use client";

import Link from "next/link";
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

const CODE_LENGTH = 4;

export default function ForgotVerifyPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [code, setCode] = useState<string[]>(Array(CODE_LENGTH).fill(""));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resendTimer, setResendTimer] = useState(30);
  const [email, setEmail] = useState("");
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    setMounted(true);
    inputsRef.current[0]?.focus();
    const stored = sessionStorage.getItem("vellium_forgot_email");
    if (stored) setEmail(stored);
  }, []);

  useEffect(() => {
    if (resendTimer <= 0) return;
    const id = setTimeout(() => setResendTimer((t) => t - 1), 1000);
    return () => clearTimeout(id);
  }, [resendTimer]);

  function handleChange(index: number, value: string) {
    const v = value.replace(/\D/g, "").slice(-1);
    const next = [...code];
    next[index] = v;
    setCode(next);
    setError("");
    if (v && index < CODE_LENGTH - 1) inputsRef.current[index + 1]?.focus();
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
    if (e.key === "ArrowLeft" && index > 0) inputsRef.current[index - 1]?.focus();
    if (e.key === "ArrowRight" && index < CODE_LENGTH - 1) inputsRef.current[index + 1]?.focus();
  }

  function handlePaste(e: React.ClipboardEvent<HTMLInputElement>) {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, CODE_LENGTH);
    if (!pasted) return;
    const next = pasted.split("").concat(Array(CODE_LENGTH).fill("")).slice(0, CODE_LENGTH);
    setCode(next);
    inputsRef.current[Math.min(pasted.length, CODE_LENGTH - 1)]?.focus();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const full = code.join("");
    if (full.length !== CODE_LENGTH) {
      setError("Por favor ingresa el código completo");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    sessionStorage.setItem("vellium_forgot_code", full);
    router.push("/auth/forgot/reset");
  }

  function handleResend() {
    if (resendTimer > 0) return;
    setResendTimer(30);
    setCode(Array(CODE_LENGTH).fill(""));
    inputsRef.current[0]?.focus();
  }

  function maskEmail(e: string) {
    if (!e.includes("@")) return e;
    const [user, domain] = e.split("@");
    const masked = user.length <= 2 ? user[0] + "*" : user[0] + "*".repeat(Math.max(user.length - 2, 1)) + user.slice(-1);
    return `${masked}@${domain}`;
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
          href="/auth/forgot"
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/60 px-4 py-2 text-[12px] font-semibold text-[#171D19] backdrop-blur-xl transition-all hover:-translate-x-0.5 hover:bg-white/90"
        >
          <Icon name="arrow_back" size={14} />
          Atrás
        </Link>

        <div className="relative overflow-hidden rounded-[36px] border border-white/70 bg-white/85 p-7 shadow-[0_30px_80px_-20px_rgba(56,106,32,0.25)] backdrop-blur-2xl sm:p-10">
          <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br from-[#B7F0AD]/60 to-[#52B788]/20 blur-2xl" />

          <div className="relative">
            <div className="flex flex-col items-center text-center">
              <div className="relative">
                <div className="flex h-20 w-20 items-center justify-center rounded-[28px] bg-gradient-to-br from-[#386A20] to-[#52B788] shadow-[0_16px_40px_rgba(56,106,32,0.45)]">
                  <Icon name="forward_to_inbox" size={40} filled className="text-white" />
                </div>
                <div className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#FFE39C] shadow-md">
                  <Icon name="pin" size={14} filled className="text-[#9B7E2D]" />
                </div>
              </div>

              <h1 className="mt-6 font-serif text-[28px] font-medium leading-[1.15] tracking-[-0.01em] text-[#171D19] sm:text-[32px]">
                Revisa tu correo
              </h1>
              <p className="mt-2 max-w-xs text-[13px] leading-[1.55] text-[#3F4943] sm:text-[14px]">
                Ingresa el código de 4 dígitos que enviamos a
              </p>
              {email && (
                <div className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-[#386A20]/15 bg-[#EEF5EE] px-3 py-1">
                  <Icon name="mail" size={12} filled className="text-[#386A20]" />
                  <span className="text-[12px] font-semibold text-[#386A20]">
                    {maskEmail(email)}
                  </span>
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="mt-8">
              <div className="flex justify-center gap-3 sm:gap-4">
                {code.map((digit, i) => (
                  <input
                    key={i}
                    ref={(el) => {
                      inputsRef.current[i] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    onPaste={handlePaste}
                    className="h-16 w-14 rounded-2xl border-2 border-[#171D19]/10 bg-white/80 text-center font-serif text-[28px] font-medium text-[#171D19] transition-all focus:border-[#386A20] focus:bg-white focus:shadow-[0_4px_16px_rgba(56,106,32,0.15)] focus:outline-none sm:h-20 sm:w-16 sm:text-[32px]"
                  />
                ))}
              </div>

              {error && (
                <div className="mt-4 flex items-center justify-center gap-2 rounded-2xl border border-[#FF6B6B]/30 bg-[#FFD9D9]/40 px-4 py-3">
                  <Icon name="error" size={16} filled className="text-[#B3261E]" />
                  <p className="text-[12px] font-medium text-[#B3261E]">{error}</p>
                </div>
              )}

              <div className="mt-6 text-center text-[13px] text-[#3F4943]">
                ¿No recibiste el código?{" "}
                {resendTimer > 0 ? (
                  <span className="font-semibold text-[#6F7975]">
                    Reenviar en {resendTimer}s
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={handleResend}
                    className="font-bold text-[#386A20] hover:underline"
                  >
                    Reenviar código
                  </button>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="group relative mt-6 flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-[#171D19] px-5 py-4 text-[15px] font-bold text-white shadow-[0_8px_24px_rgba(23,29,25,0.25)] transition-all duration-300 hover:bg-[#386A20] hover:shadow-[0_12px_32px_rgba(56,106,32,0.45)] active:scale-[0.98] disabled:opacity-70"
              >
                <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#386A20]/40 blur-2xl transition-all duration-500 group-hover:bg-[#52B788]/40" />
                <span className="relative">{loading ? "Verificando..." : "Continuar"}</span>
                {!loading && (
                  <Icon name="arrow_forward" size={18} className="relative transition-transform group-hover:translate-x-1" />
                )}
              </button>
            </form>
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