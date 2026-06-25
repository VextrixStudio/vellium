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

export default function LoginPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  useEffect(() => setMounted(true), []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    router.push("/auth/verify");
  }

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
              icon="login"
              title="Bienvenido de vuelta"
              subtitle="Inicia sesión para continuar tu progreso"
            />

            <form onSubmit={handleSubmit} className="mt-8 space-y-3">
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
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                required
                trailing={
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="flex h-7 w-7 items-center justify-center rounded-full text-[#3F4943] hover:bg-[#EEF5EE]"
                    aria-label={showPassword ? "Ocultar" : "Mostrar"}
                  >
                    <Icon name={showPassword ? "visibility_off" : "visibility"} size={18} />
                  </button>
                }
              />

              <div className="flex justify-end pt-1">
                <Link
                  href="/auth/forgot"
                  className="text-[12px] font-semibold text-[#386A20] hover:underline"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="group relative mt-4 flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-[#171D19] px-5 py-4 text-[15px] font-bold text-white shadow-[0_8px_24px_rgba(23,29,25,0.25)] transition-all duration-300 hover:bg-[#386A20] hover:shadow-[0_12px_32px_rgba(56,106,32,0.45)] active:scale-[0.98] disabled:opacity-70"
              >
                <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#386A20]/40 blur-2xl transition-all duration-500 group-hover:bg-[#52B788]/40" />
                <span className="relative">{loading ? "Verificando..." : "Iniciar sesión"}</span>
                {!loading && (
                  <Icon name="arrow_forward" size={18} className="relative transition-transform group-hover:translate-x-1" />
                )}
              </button>
            </form>

            <FooterLink
              text="¿No tienes una cuenta?"
              linkLabel="Regístrate"
              href="/auth/register"
            />
          </div>
        </div>
      </div>
    </main>
  );
}

/* ========== SHARED COMPONENTS ========== */

function BackgroundBlobs() {
  return (
    <>
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-gradient-to-br from-[#52B788]/40 to-[#B7F0AD]/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 -bottom-32 h-[28rem] w-[28rem] rounded-full bg-gradient-to-br from-[#B7F0AD]/40 to-[#FFE39C]/20 blur-3xl" />
      <div className="pointer-events-none absolute right-[15%] top-[10%] h-20 w-40 rounded-full bg-white/60 blur-2xl" />
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
          className="flex-1 bg-transparent text-[14px] text-[#171D19] placeholder:text-[#6F7975] focus:outline-none"
        />
        {trailing}
      </div>
    </div>
  );
}

function FooterLink({ text, linkLabel, href }: { text: string; linkLabel: string; href: string }) {
  return (
    <p className="mt-6 text-center text-[13px] text-[#3F4943]">
      {text}{" "}
      <Link href={href} className="font-bold text-[#386A20] hover:underline">
        {linkLabel}
      </Link>
    </p>
  );
}