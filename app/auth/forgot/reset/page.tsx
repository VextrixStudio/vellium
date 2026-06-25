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

export default function ResetPasswordPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [showPwd2, setShowPwd2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ password: "", confirmPassword: "" });

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!success) return;
    const id = setTimeout(() => router.push("/auth/login"), 3000);
    return () => clearTimeout(id);
  }, [success, router]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (form.password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    sessionStorage.removeItem("vellium_forgot_email");
    sessionStorage.removeItem("vellium_forgot_code");
    setSuccess(true);
  }

  const strength = getPasswordStrength(form.password);
  const checks = getPasswordChecks(form.password);

  if (success) return <SuccessView />;

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F4FBF4] px-4 py-8 text-[#171D19] antialiased sm:px-6">
      <BackgroundBlobs />

      <div
        className={`relative z-10 w-full max-w-md transition-all duration-700 ${
          mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        <Link
          href="/auth/forgot/verify"
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/60 px-4 py-2 text-[12px] font-semibold text-[#171D19] backdrop-blur-xl transition-all hover:-translate-x-0.5 hover:bg-white/90"
        >
          <Icon name="arrow_back" size={14} />
          Atrás
        </Link>

        <div className="relative overflow-hidden rounded-[36px] border border-white/70 bg-white/85 p-7 shadow-[0_30px_80px_-20px_rgba(56,106,32,0.25)] backdrop-blur-2xl sm:p-10">
          <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br from-[#B7F0AD]/60 to-[#52B788]/20 blur-2xl" />
          <div className="pointer-events-none absolute -left-12 -bottom-12 h-36 w-36 rounded-full bg-gradient-to-br from-[#FFE39C]/40 to-[#FFD89E]/10 blur-2xl" />

          <div className="relative">
            <div className="flex flex-col items-center text-center">
              <div className="relative">
                <div className="flex h-20 w-20 items-center justify-center rounded-[28px] bg-gradient-to-br from-[#386A20] to-[#52B788] shadow-[0_16px_40px_rgba(56,106,32,0.45)]">
                  <Icon name="password" size={40} filled className="text-white" />
                </div>
                <div className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#FFE39C] shadow-md">
                  <Icon name="autorenew" size={14} filled className="text-[#9B7E2D]" />
                </div>
              </div>

              <h1 className="mt-6 font-serif text-[28px] font-medium leading-[1.15] tracking-[-0.01em] text-[#171D19] sm:text-[32px]">
                Nueva contraseña
              </h1>
              <p className="mt-2 max-w-xs text-[13px] leading-[1.55] text-[#3F4943] sm:text-[14px]">
                Crea una contraseña fuerte y segura para proteger tu cuenta
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-3">
              <PasswordField
                label="Nueva contraseña"
                name="password"
                placeholder="Mínimo 8 caracteres"
                value={form.password}
                onChange={handleChange}
                show={showPwd}
                onToggle={() => setShowPwd((v) => !v)}
              />

              {form.password && (
                <>
                  <PasswordMeter strength={strength} />
                  <PasswordChecks checks={checks} />
                </>
              )}

              <PasswordField
                label="Confirmar contraseña"
                name="confirmPassword"
                placeholder="Repite tu nueva contraseña"
                value={form.confirmPassword}
                onChange={handleChange}
                show={showPwd2}
                onToggle={() => setShowPwd2((v) => !v)}
                icon="lock_reset"
              />

              {form.confirmPassword && form.password === form.confirmPassword && (
                <div className="flex items-center gap-2 rounded-2xl border border-[#386A20]/20 bg-[#EEF5EE] px-4 py-2.5">
                  <Icon name="check_circle" size={16} filled className="text-[#386A20]" />
                  <p className="text-[12px] font-semibold text-[#386A20]">
                    Las contraseñas coinciden
                  </p>
                </div>
              )}

              {error && (
                <div className="flex items-center gap-2 rounded-2xl border border-[#FF6B6B]/30 bg-[#FFD9D9]/40 px-4 py-3">
                  <Icon name="error" size={16} filled className="text-[#B3261E]" />
                  <p className="text-[12px] font-medium text-[#B3261E]">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="group relative mt-4 flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-[#171D19] px-5 py-4 text-[15px] font-bold text-white shadow-[0_8px_24px_rgba(23,29,25,0.25)] transition-all duration-300 hover:bg-[#386A20] hover:shadow-[0_12px_32px_rgba(56,106,32,0.45)] active:scale-[0.98] disabled:opacity-70"
              >
                <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#386A20]/40 blur-2xl transition-all duration-500 group-hover:bg-[#52B788]/40" />
                <span className="relative">{loading ? "Guardando..." : "Restablecer contraseña"}</span>
                {!loading && (
                  <Icon name="check" size={20} className="relative" />
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

/* ========== PASSWORD HELPERS ========== */

function getPasswordStrength(pwd: string) {
  let score = 0;
  if (pwd.length >= 8) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;

  if (score <= 1) return { score: 1, label: "Débil", color: "bg-[#FF6B6B]" };
  if (score === 2) return { score: 2, label: "Regular", color: "bg-[#FFB800]" };
  if (score === 3) return { score: 3, label: "Buena", color: "bg-[#52B788]" };
  return { score: 4, label: "Excelente", color: "bg-[#386A20]" };
}

function getPasswordChecks(pwd: string) {
  return [
    { label: "Mínimo 8 caracteres", ok: pwd.length >= 8 },
    { label: "Una mayúscula", ok: /[A-Z]/.test(pwd) },
    { label: "Un número", ok: /[0-9]/.test(pwd) },
    { label: "Un símbolo especial", ok: /[^A-Za-z0-9]/.test(pwd) },
  ];
}

/* ========== SUBCOMPONENTS ========== */

function PasswordField({
  label,
  name,
  placeholder,
  value,
  onChange,
  show,
  onToggle,
  icon = "lock",
}: {
  label: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  show: boolean;
  onToggle: () => void;
  icon?: string;
}) {
  return (
    <div className="group">
      <label htmlFor={name} className="mb-1.5 block px-1 text-[11px] font-bold uppercase tracking-[0.12em] text-[#3F4943]">
        {label}
      </label>
      <div className="flex items-center gap-2 rounded-2xl border border-[#171D19]/10 bg-white/80 px-4 py-3 transition-all focus-within:border-[#386A20] focus-within:bg-white focus-within:shadow-[0_4px_16px_rgba(56,106,32,0.12)]">
        <Icon name={icon} size={18} className="text-[#3F4943]" />
        <input
          id={name}
          name={name}
          type={show ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required
          className="flex-1 bg-transparent text-[14px] text-[#171D19] placeholder:text-[#6F7975] focus:outline-none"
        />
        <button
          type="button"
          onClick={onToggle}
          className="flex h-7 w-7 items-center justify-center rounded-full text-[#3F4943] hover:bg-[#EEF5EE]"
          aria-label={show ? "Ocultar" : "Mostrar"}
        >
          <Icon name={show ? "visibility_off" : "visibility"} size={18} />
        </button>
      </div>
    </div>
  );
}

function PasswordMeter({ strength }: { strength: ReturnType<typeof getPasswordStrength> }) {
  return (
    <div className="px-1">
      <div className="flex gap-1">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-all duration-300 ${
              i <= strength.score ? strength.color : "bg-[#DBE5DA]"
            }`}
          />
        ))}
      </div>
      <p className="mt-1.5 text-[11px] font-semibold text-[#3F4943]">
        Fortaleza: <span className="text-[#171D19]">{strength.label}</span>
      </p>
    </div>
  );
}

function PasswordChecks({ checks }: { checks: ReturnType<typeof getPasswordChecks> }) {
  return (
    <div className="grid grid-cols-2 gap-1.5 rounded-2xl border border-[#171D19]/5 bg-[#EEF5EE]/50 p-3">
      {checks.map((c) => (
        <div key={c.label} className="flex items-center gap-1.5">
          <Icon
            name={c.ok ? "check_circle" : "radio_button_unchecked"}
            size={14}
            filled={c.ok}
            className={c.ok ? "text-[#386A20]" : "text-[#6F7975]"}
          />
          <span className={`text-[10px] ${c.ok ? "font-semibold text-[#386A20]" : "text-[#6F7975]"}`}>
            {c.label}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ========== SUCCESS VIEW ========== */

function SuccessView() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F4FBF4] px-4 py-8 text-[#171D19] antialiased sm:px-6">
      <BackgroundBlobs />
      <ConfettiBlobs />

      <div className="relative z-10 w-full max-w-md">
        <div className="relative overflow-hidden rounded-[36px] border border-white/70 bg-white/85 p-7 shadow-[0_30px_80px_-20px_rgba(56,106,32,0.25)] backdrop-blur-2xl sm:p-10">
          <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br from-[#B7F0AD]/60 to-[#52B788]/30 blur-2xl" />
          <div className="pointer-events-none absolute -left-12 -bottom-12 h-36 w-36 rounded-full bg-gradient-to-br from-[#FFE39C]/40 to-[#FFD89E]/10 blur-2xl" />

          <div className="relative flex flex-col items-center text-center">
            <div className="relative">
              <div className="absolute inset-0 animate-ping rounded-full bg-[#52B788]/30" style={{ animationDuration: "2s" }} />
              <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[#386A20] to-[#52B788] shadow-[0_20px_50px_rgba(56,106,32,0.5)]">
                <Icon name="lock_open" size={48} filled className="text-white" />
              </div>
            </div>

            <h1 className="mt-7 font-serif text-[32px] font-medium leading-[1.1] tracking-[-0.01em] text-[#171D19] sm:text-[36px]">
              ¡Contraseña <em className="italic text-[#386A20]">actualizada</em>!
            </h1>
            <p className="mt-3 max-w-sm text-[14px] leading-[1.55] text-[#3F4943]">
              Tu contraseña fue cambiada con éxito. Ya puedes iniciar sesión con tus nuevas credenciales.
            </p>

            <div className="mt-7 w-full space-y-2">
              <div className="flex items-center gap-3 rounded-2xl border border-[#B7F0AD]/50 bg-[#EEF5EE] px-4 py-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white">
                  <Icon name="shield_lock" size={18} filled className="text-[#386A20]" />
                </div>
                <span className="flex-1 text-left text-[13px] font-semibold text-[#171D19]">
                  Cuenta protegida
                </span>
                <Icon name="check_circle" size={20} filled className="text-[#386A20]" />
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-[#B7F0AD]/50 bg-[#EEF5EE] px-4 py-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white">
                  <Icon name="key" size={18} filled className="text-[#386A20]" />
                </div>
                <span className="flex-1 text-left text-[13px] font-semibold text-[#171D19]">
                  Nueva contraseña activa
                </span>
                <Icon name="check_circle" size={20} filled className="text-[#386A20]" />
              </div>
            </div>

            <Link
              href="/auth/login"
              className="group relative mt-6 flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-[#171D19] px-5 py-4 text-[15px] font-bold text-white shadow-[0_8px_24px_rgba(23,29,25,0.25)] transition-all duration-300 hover:bg-[#386A20] hover:shadow-[0_12px_32px_rgba(56,106,32,0.45)] active:scale-[0.98]"
            >
              <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#386A20]/40 blur-2xl transition-all duration-500 group-hover:bg-[#52B788]/40" />
              <span className="relative">Iniciar sesión</span>
              <Icon name="arrow_forward" size={20} className="relative transition-transform group-hover:translate-x-1" />
            </Link>

            <p className="mt-4 text-[12px] text-[#6F7975]">
              Redirigiendo automáticamente en unos segundos...
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