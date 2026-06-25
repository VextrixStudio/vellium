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

export default function RegisterPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [showPwd2, setShowPwd2] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    birthYear: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  useEffect(() => setMounted(true), []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }
    if (form.password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    router.push("/auth/verify");
  }

  const passwordStrength = getPasswordStrength(form.password);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F4FBF4] px-4 py-8 text-[#171D19] antialiased sm:px-6">
      <BackgroundBlobs />

      <div
        className={`relative z-10 w-full max-w-md transition-all duration-700 ${
          mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        <BackButton />

        <div className="relative overflow-hidden rounded-[36px] border border-white/70 bg-white/85 p-7 shadow-[0_30px_80px_-20px_rgba(56,106,32,0.25)] backdrop-blur-2xl sm:p-10">
          <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br from-[#B7F0AD]/60 to-[#52B788]/20 blur-2xl" />
          <div className="pointer-events-none absolute -left-12 -bottom-12 h-36 w-36 rounded-full bg-gradient-to-br from-[#FFE39C]/40 to-[#FFD89E]/10 blur-2xl" />

          <div className="relative">
            <Header
              icon="person_add"
              title="Crea tu cuenta"
              subtitle="Empieza a transformar tus metas en logros"
            />

            <form onSubmit={handleSubmit} className="mt-8 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <Field
                  icon="badge"
                  label="Nombre"
                  name="firstName"
                  placeholder="Maya"
                  value={form.firstName}
                  onChange={handleChange}
                  required
                />
                <Field
                  icon="badge"
                  label="Apellido"
                  name="lastName"
                  placeholder="Okafor"
                  value={form.lastName}
                  onChange={handleChange}
                  required
                />
              </div>

              <Field
                icon="cake"
                label="Año de nacimiento"
                name="birthYear"
                type="number"
                placeholder="1995"
                value={form.birthYear}
                onChange={handleChange}
                required
                min={1900}
                max={new Date().getFullYear()}
              />

              <Field
                icon="mail"
                label="Correo electrónico"
                name="email"
                type="email"
                placeholder="tu@correo.com"
                value={form.email}
                onChange={handleChange}
                required
              />

              <Field
                icon="lock"
                label="Contraseña"
                name="password"
                type={showPwd ? "text" : "password"}
                placeholder="Mínimo 8 caracteres"
                value={form.password}
                onChange={handleChange}
                required
                trailing={
                  <button
                    type="button"
                    onClick={() => setShowPwd((v) => !v)}
                    className="flex h-7 w-7 items-center justify-center rounded-full text-[#3F4943] hover:bg-[#EEF5EE]"
                    aria-label={showPwd ? "Ocultar" : "Mostrar"}
                  >
                    <Icon name={showPwd ? "visibility_off" : "visibility"} size={18} />
                  </button>
                }
              />

              {form.password && <PasswordMeter strength={passwordStrength} />}

              <Field
                icon="lock_reset"
                label="Confirmar contraseña"
                name="confirmPassword"
                type={showPwd2 ? "text" : "password"}
                placeholder="Repite tu contraseña"
                value={form.confirmPassword}
                onChange={handleChange}
                required
                trailing={
                  <button
                    type="button"
                    onClick={() => setShowPwd2((v) => !v)}
                    className="flex h-7 w-7 items-center justify-center rounded-full text-[#3F4943] hover:bg-[#EEF5EE]"
                    aria-label={showPwd2 ? "Ocultar" : "Mostrar"}
                  >
                    <Icon name={showPwd2 ? "visibility_off" : "visibility"} size={18} />
                  </button>
                }
              />

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
                <span className="relative">{loading ? "Creando cuenta..." : "Crear cuenta"}</span>
                {!loading && (
                  <Icon name="arrow_forward" size={18} className="relative transition-transform group-hover:translate-x-1" />
                )}
              </button>
            </form>

            <p className="mt-6 text-center text-[13px] text-[#3F4943]">
              ¿Ya tienes una cuenta?{" "}
              <Link href="/auth/login" className="font-bold text-[#386A20] hover:underline">
                Inicia sesión
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

function getPasswordStrength(pwd: string): { score: number; label: string; color: string } {
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

function PasswordMeter({ strength }: { strength: ReturnType<typeof getPasswordStrength> }) {
  return (
    <div className="px-1">
      <div className="flex gap-1">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-all ${
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

/* ========== SHARED ========== */

function BackgroundBlobs() {
  return (
    <>
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-gradient-to-br from-[#52B788]/40 to-[#B7F0AD]/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 -bottom-32 h-[28rem] w-[28rem] rounded-full bg-gradient-to-br from-[#B7F0AD]/40 to-[#FFE39C]/20 blur-3xl" />
    </>
  );
}

function BackButton() {
  return (
    <Link
      href="/"
      className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/60 px-4 py-2 text-[12px] font-semibold text-[#171D19] backdrop-blur-xl transition-all hover:-translate-x-0.5 hover:bg-white/90"
    >
      <Icon name="arrow_back" size={14} />
      Atrás
    </Link>
  );
}

function Header({ icon, title, subtitle }: { icon: string; title: string; subtitle: string }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br from-[#386A20] to-[#52B788] shadow-[0_12px_32px_rgba(56,106,32,0.4)]">
        <Icon name={icon} size={26} filled className="text-white" />
      </div>
      <h1 className="mt-5 font-serif text-[28px] font-medium leading-[1.15] tracking-[-0.01em] text-[#171D19] sm:text-[32px]">
        {title}
      </h1>
      <p className="mt-2 max-w-xs text-[13px] leading-[1.55] text-[#3F4943] sm:text-[14px]">
        {subtitle}
      </p>
    </div>
  );
}

function Field({
  icon,
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  required,
  trailing,
  min,
  max,
}: {
  icon: string;
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  trailing?: React.ReactNode;
  min?: number;
  max?: number;
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
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          min={min}
          max={max}
          className="flex-1 bg-transparent text-[14px] text-[#171D19] placeholder:text-[#6F7975] focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
        {trailing}
      </div>
    </div>
  );
}