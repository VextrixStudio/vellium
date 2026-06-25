"use client";

import Link from "next/link";
import Nav from "@/components/landing/nav";

/* ========================================================================== */
/* CONSTANTS                                                                  */
/* ========================================================================== */

const COLORS = {
  primary: "#386A20",
  primaryLight: "#52B788",
  primaryDark: "#1A4314",
  surface: "#F4FBF4",
  surfaceDim: "#D5E8D4",
  onSurface: "#171D19",
  onSurfaceVariant: "#3F4943",
  outline: "#6F7975",
  container: "#B7F0AD",
  onContainer: "#062100",
};

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

function Chip({
  icon,
  label,
  variant = "default",
}: {
  icon: string;
  label: string;
  variant?: "default" | "white" | "dark";
}) {
  const styles = {
    default: "border-[#386A20]/20 bg-white/60 text-[#386A20]",
    white: "border-white/60 bg-white/80 text-[#386A20]",
    dark: "border-white/20 bg-white/15 text-white",
  };
  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 backdrop-blur-xl ${styles[variant]}`}
    >
      <Icon name={icon} size={14} filled />
      <span className="text-[11px] font-bold uppercase tracking-[0.14em]">{label}</span>
    </div>
  );
}

/* ========================================================================== */
/* MAIN PAGE                                                                  */
/* ========================================================================== */

export default function LandingPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#F4FBF4] text-[#171D19] antialiased">
      <BackgroundBlobs />
      <Nav />
      <Hero />
      <Marquee />
      <UseCases />
      <PlanSection />
      <OrganizeSection />
      <FeatureBig />
      <Testimonials />
      <Awards />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}

/* ========================================================================== */
/* BACKGROUND BLOBS                                                           */
/* ========================================================================== */

function BackgroundBlobs() {
  return (
    <>
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[900px] bg-gradient-to-b from-[#B7F0AD] via-[#D5E8D4] to-[#F4FBF4]" />
      <div className="pointer-events-none absolute left-[-150px] top-[300px] -z-10 h-96 w-96 rounded-full bg-gradient-to-br from-[#52B788]/40 to-[#B7F0AD]/30 blur-3xl" />
      <div className="pointer-events-none absolute right-[-100px] top-[500px] -z-10 h-80 w-80 rounded-full bg-gradient-to-br from-[#FFF4D6]/60 to-[#FFEABF]/30 blur-3xl" />
      <div className="pointer-events-none absolute left-[20%] top-[1200px] -z-10 h-64 w-64 rounded-full bg-gradient-to-br from-[#C8F2E0]/50 to-[#A8E5C8]/20 blur-3xl" />
      <div className="pointer-events-none absolute right-[10%] top-[1800px] -z-10 h-72 w-72 rounded-full bg-gradient-to-br from-[#B7F0AD]/50 to-[#52B788]/20 blur-3xl" />
      <div className="pointer-events-none absolute left-[5%] top-[140px] -z-10 h-16 w-32 rounded-full bg-white/70 blur-2xl" />
      <div className="pointer-events-none absolute right-[8%] top-[200px] -z-10 h-20 w-44 rounded-full bg-white/60 blur-2xl" />
      <div className="pointer-events-none absolute left-[25%] top-[420px] -z-10 h-14 w-28 rounded-full bg-white/50 blur-xl" />
    </>
  );
}

/* ========================================================================== */
/* HERO                                                                       */
/* ========================================================================== */

function Hero() {
  return (
    <section className="relative px-6 pt-20 sm:pt-28">
      <div className="mx-auto max-w-6xl text-center">
        <div className="mb-8 inline-flex">
          <Chip icon="auto_awesome" label="AI Coach · Beta v2" variant="white" />
        </div>

        <h1 className="font-serif text-[44px] font-medium leading-[1.02] tracking-[-0.02em] text-[#171D19] sm:text-[68px] lg:text-[88px]">
          Your space for goals,
          <br />
          tasks, and big <em className="italic text-[#386A20]">ideas</em>
        </h1>

        <p className="mx-auto mt-8 max-w-xl text-[16px] leading-[1.6] text-[#3F4943] sm:text-[18px]">
          Vellium turns scattered intentions into shipped work — with AI planning, daily check-ins, and a coach that adapts to you.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="#"
            className="group inline-flex items-center gap-2 rounded-full bg-[#171D19] px-6 py-3.5 text-[14px] font-semibold text-white shadow-[0_8px_24px_rgba(23,29,25,0.25)] transition-all duration-300 hover:bg-[#386A20] hover:shadow-[0_12px_32px_rgba(56,106,32,0.45)]"
          >
            Try Vellium Pro
            <Icon name="arrow_forward" size={18} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="#how-it-works"
            className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/60 px-6 py-3.5 text-[14px] font-semibold text-[#171D19] backdrop-blur-xl transition-all hover:bg-white/90"
          >
            <Icon name="play_circle" size={18} filled className="text-[#386A20]" />
            Watch demo
          </Link>
        </div>

        <div className="relative mt-20">
          <DecorativeNotes />
          <HeroMockup />
        </div>
      </div>
    </section>
  );
}

function DecorativeNotes() {
  return (
    <>
      <div className="pointer-events-none absolute -left-8 top-12 hidden h-36 w-28 rotate-[-12deg] rounded-3xl bg-gradient-to-br from-[#52B788] to-[#386A20] p-4 shadow-2xl md:block">
        <Icon name="bookmark" size={16} filled className="text-white" />
        <div className="mt-3 space-y-1.5">
          <div className="h-1 w-3/4 rounded bg-white/40" />
          <div className="h-1 w-1/2 rounded bg-white/40" />
          <div className="h-1 w-5/6 rounded bg-white/40" />
        </div>
      </div>

      <div className="pointer-events-none absolute -right-10 top-20 hidden h-44 w-32 rotate-[10deg] rounded-3xl bg-gradient-to-br from-[#FFF4D6] to-[#FFE39C] p-4 shadow-2xl md:block">
        <Icon name="lightbulb" size={20} filled className="text-[#9B7E2D]" />
        <div className="mt-3 space-y-1.5">
          <div className="h-1 w-2/3 rounded bg-[#171D19]/15" />
          <div className="h-1 w-3/4 rounded bg-[#171D19]/15" />
          <div className="h-1 w-1/2 rounded bg-[#171D19]/15" />
        </div>
      </div>

      <div className="pointer-events-none absolute left-[8%] bottom-[-30px] hidden h-32 w-44 rounded-tl-[100px] rounded-tr-[60px] bg-gradient-to-br from-[#52B788] to-[#386A20] md:block" />
      <div className="pointer-events-none absolute right-[12%] bottom-[-10px] hidden h-20 w-28 rounded-tl-[40px] rounded-tr-[80px] bg-[#171D19]/85 md:block" />
    </>
  );
}

function HeroMockup() {
  return (
    <div className="relative mx-auto max-w-4xl">
      <div className="absolute -inset-8 -z-10 rounded-[40px] bg-gradient-to-br from-[#52B788]/30 via-[#B7F0AD]/30 to-[#FFE39C]/30 blur-3xl" />

      <div className="relative overflow-hidden rounded-[32px] border border-white/80 bg-white/95 shadow-[0_40px_100px_-20px_rgba(56,106,32,0.3)] backdrop-blur-xl">
        <WindowChrome />
        <div className="grid grid-cols-[200px_1fr]">
          <MockSidebar />
          <MockMainContent />
        </div>
      </div>

      <FloatingWidget
        position="-left-6 top-32"
        gradient="from-[#FFF4D6] to-[#FFD89E]"
        iconColor="text-[#9B7E2D]"
        icon="local_fire_department"
        title="7-day streak"
        subtitle="Keep it going!"
      />
      <FloatingWidget
        position="-right-4 bottom-20"
        gradient="from-[#C8F2E0] to-[#52B788]"
        iconColor="text-white"
        icon="check_circle"
        title="Goal shipped!"
        subtitle="5 min ago"
      />
    </div>
  );
}

function WindowChrome() {
  return (
    <div className="flex items-center justify-between border-b border-[#DBE5DA] px-5 py-3">
      <div className="flex items-center gap-1.5">
        <div className="h-3 w-3 rounded-full bg-[#FF6B6B]" />
        <div className="h-3 w-3 rounded-full bg-[#FFD93D]" />
        <div className="h-3 w-3 rounded-full bg-[#6BCB77]" />
      </div>
      <div className="flex items-center gap-1.5 rounded-full bg-[#EEF5EE] px-3 py-1">
        <Icon name="lock" size={12} className="text-[#3F4943]" />
        <span className="text-[11px] font-medium text-[#3F4943]">vellium.app/today</span>
      </div>
      <div className="flex items-center gap-2">
        <Icon name="search" size={16} className="text-[#3F4943]" />
        <Icon name="notifications" size={16} className="text-[#3F4943]" />
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-[#386A20] to-[#52B788] text-[10px] font-bold text-white">M</div>
      </div>
    </div>
  );
}

function MockSidebar() {
  const navItems = [
    { icon: "track_changes", label: "All Goals", active: true },
    { icon: "task_alt", label: "Tasks" },
    { icon: "calendar_month", label: "Calendar" },
    { icon: "analytics", label: "Analytics" },
  ];

  return (
    <aside className="hidden border-r border-[#DBE5DA] bg-[#F4FBF4]/50 p-4 sm:block">
      <button className="flex w-full items-center gap-2 rounded-2xl bg-[#B7F0AD] px-3 py-2 text-[12px] font-semibold text-[#062100] shadow-sm">
        <Icon name="add" size={16} />
        New Goal
      </button>

      <div className="mt-5 flex items-center gap-2 px-3">
        <div className="h-5 w-5 rounded-md bg-gradient-to-br from-[#386A20] to-[#52B788] shadow-sm" />
        <span className="text-[12px] font-semibold text-[#171D19]">Maya&apos;s Space</span>
      </div>

      <ul className="mt-4 space-y-0.5">
        {navItems.map((item) => (
          <li
            key={item.label}
            className={`flex items-center gap-2.5 rounded-xl px-3 py-2 text-[12px] ${
              item.active ? "bg-white font-semibold text-[#386A20] shadow-sm" : "text-[#3F4943]"
            }`}
          >
            <Icon name={item.icon} size={16} />
            {item.label}
          </li>
        ))}
      </ul>

      <p className="mt-5 px-3 text-[10px] font-bold uppercase tracking-wider text-[#6F7975]">Starred</p>
      <ul className="mt-2 space-y-0.5">
        {["Daily check-in", "Q1 ideas"].map((label) => (
          <li key={label} className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-[12px] text-[#3F4943]">
            <Icon name="bookmark" size={14} filled className="text-[#386A20]" />
            {label}
          </li>
        ))}
      </ul>
    </aside>
  );
}

function MockMainContent() {
  const goals = [
    { title: "Ship landing v2", tag: "Active", gradient: "from-[#B7F0AD] to-[#52B788]", icon: "rocket_launch", progress: 67 },
    { title: "Morning routine", tag: "Daily", gradient: "from-[#FFF4D6] to-[#FFD89E]", icon: "wb_sunny", progress: 85 },
    { title: "Weekend plan", tag: "Personal", gradient: "from-[#FFD9E0] to-[#FFB8C8]", icon: "hiking", progress: 30 },
    { title: "Q1 strategy", tag: "Goals", gradient: "from-[#C8F2E0] to-[#A8E5C8]", icon: "trending_up", progress: 50 },
  ];

  return (
    <div className="p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon name="track_changes" size={18} className="text-[#386A20]" />
          <h3 className="font-serif text-[20px] font-medium text-[#171D19]">All Goals</h3>
        </div>
        <div className="flex gap-1">
          {["grid_view", "view_agenda", "view_list", "sort"].map((icon) => (
            <button key={icon} className="flex h-7 w-7 items-center justify-center rounded-lg text-[#3F4943] hover:bg-[#EEF5EE]">
              <Icon name={icon} size={14} />
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        {goals.map((g) => (
          <MockCard key={g.title} {...g} />
        ))}
      </div>
    </div>
  );
}

function MockCard({
  title,
  tag,
  gradient,
  icon,
  progress,
}: {
  title: string;
  tag: string;
  gradient: string;
  icon: string;
  progress: number;
}) {
  return (
    <div className={`rounded-2xl bg-gradient-to-br ${gradient} p-3 transition-transform hover:scale-105`}>
      <div className="flex items-center justify-between">
        <Icon name={icon} size={16} filled className="text-[#171D19]" />
        <span className="rounded-full bg-white/70 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider text-[#171D19]/70">
          {tag}
        </span>
      </div>
      <p className="mt-3 text-[11px] font-bold text-[#171D19]">{title}</p>
      <div className="mt-3">
        <div className="h-1 overflow-hidden rounded-full bg-white/50">
          <div className="h-full rounded-full bg-[#171D19]" style={{ width: `${progress}%` }} />
        </div>
        <p className="mt-1 text-[9px] font-semibold text-[#171D19]/70">{progress}%</p>
      </div>
    </div>
  );
}

function FloatingWidget({
  position,
  gradient,
  iconColor,
  icon,
  title,
  subtitle,
}: {
  position: string;
  gradient: string;
  iconColor: string;
  icon: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className={`absolute ${position} hidden rounded-2xl border border-white/60 bg-white/90 p-3 shadow-[0_12px_32px_rgba(56,106,32,0.15)] backdrop-blur-xl lg:flex lg:items-center lg:gap-2.5`}>
      <div className={`flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br ${gradient}`}>
        <Icon name={icon} size={18} filled className={iconColor} />
      </div>
      <div>
        <p className="text-[11px] font-bold text-[#171D19]">{title}</p>
        <p className="text-[10px] text-[#3F4943]">{subtitle}</p>
      </div>
    </div>
  );
}

/* ========================================================================== */
/* MARQUEE                                                                    */
/* ========================================================================== */

function Marquee() {
  const items = [
    "Featured on Product Hunt",
    "12,000+ active users",
    "4.9 ★ on App Store",
    "1.2M goals shipped",
    "89% completion rate",
    "Backed by Y Combinator",
  ];

  return (
    <section className="border-y border-[#DBE5DA]/50 bg-white/40 py-8 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-6">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-2 text-[12px] font-medium text-[#3F4943]">
            <Icon name="verified" size={14} filled className="text-[#386A20]" />
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ========================================================================== */
/* USE CASES                                                                  */
/* ========================================================================== */

function UseCases() {
  const features = [
    { name: "Goals", icon: "track_changes" },
    { name: "Tasks", icon: "task_alt" },
    { name: "Calendar", icon: "calendar_month" },
    { name: "AI Coach", icon: "auto_awesome" },
    { name: "Analytics", icon: "analytics" },
  ];

  const cases = [
    { gradient: "from-[#386A20] to-[#52B788]", icon: "person", role: "Tom, Freelancer", desc: "Client work, deadlines" },
    { gradient: "from-[#FFD9E0] to-[#FFB8C8]", icon: "rocket_launch", role: "Ana, Founder", desc: "Product launches" },
    { gradient: "from-[#FFE39C] to-[#FFD89E]", icon: "trending_up", role: "Gagan, PM", desc: "Sprints, OKRs" },
    { gradient: "from-[#C8F2E0] to-[#A8E5C8]", icon: "edit_note", role: "Amity, Creator", desc: "Content calendar" },
    { gradient: "from-[#B7F0AD] to-[#52B788]", icon: "menu_book", role: "Aaron, Writer", desc: "Books, daily writing" },
    { gradient: "from-[#D8C5FF] to-[#B8B5FF]", icon: "palette", role: "Seo, Designer", desc: "Creative sprints" },
    { gradient: "from-[#171D19] to-[#3F4943]", icon: "groups", role: "Gian, Manager", desc: "Team goals" },
    { gradient: "from-[#FFB8C8] to-[#FF8FA8]", icon: "auto_awesome", role: "Steph, Dreamer", desc: "Big side projects" },
  ];

  return (
    <section id="product" className="px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl text-center">
        <h2 className="font-serif text-[40px] font-medium leading-[1.1] text-[#171D19] sm:text-[56px]">
          Vellium isn&apos;t just for one thing,
          <br />
          it&apos;s for <em className="italic text-[#386A20]">your</em> things.
        </h2>

        <div className="mt-14 flex flex-wrap justify-center gap-x-14 gap-y-6">
          {features.map((item) => (
            <div key={item.name} className="group flex flex-col items-center gap-2">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/80 bg-white/80 shadow-[0_8px_24px_rgba(56,106,32,0.1)] backdrop-blur-xl transition-all group-hover:-translate-y-1 group-hover:bg-gradient-to-br group-hover:from-[#B7F0AD] group-hover:to-[#52B788]">
                <Icon name={item.icon} size={26} filled className="text-[#386A20] group-hover:text-white" />
              </div>
              <span className="text-[12px] font-semibold text-[#171D19]">{item.name}</span>
            </div>
          ))}
        </div>

        <h3 className="mt-28 font-serif text-[36px] font-medium text-[#171D19] sm:text-[44px]">
          How people use <em className="italic text-[#386A20]">Vellium</em>
        </h3>

        <div className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-4 lg:grid-cols-8">
          {cases.map((c) => (
            <div key={c.role} className="group flex flex-col items-center">
              <div className={`relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-[28px] bg-gradient-to-br ${c.gradient} shadow-[0_8px_24px_rgba(56,106,32,0.15)] transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_16px_40px_rgba(56,106,32,0.25)]`}>
                <Icon name={c.icon} size={44} filled className="text-white drop-shadow-lg" />
                <div
                  className="pointer-events-none absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: "radial-gradient(circle at 20% 20%, white 1px, transparent 1px), radial-gradient(circle at 80% 80%, white 1px, transparent 1px)",
                    backgroundSize: "24px 24px",
                  }}
                />
              </div>
              <p className="mt-3 text-[10px] font-bold uppercase tracking-wider text-[#171D19]">{c.role}</p>
              <p className="mt-0.5 px-1 text-[11px] leading-tight text-[#3F4943]">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ========================================================================== */
/* PLAN SECTION                                                               */
/* ========================================================================== */

function PlanSection() {
  return (
    <section id="features" className="px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 rounded-[40px] bg-gradient-to-br from-[#B7F0AD] via-[#D5E8D4] to-[#C8F2E0] p-8 shadow-[0_20px_60px_-20px_rgba(56,106,32,0.25)] sm:grid-cols-[1fr_1.4fr] sm:p-14">
          <div className="flex flex-col justify-between">
            <div>
              <Chip icon="event_note" label="Plan" variant="white" />
              <h3 className="mt-5 font-serif text-[34px] font-medium leading-[1.05] text-[#171D19] sm:text-[44px]">
                Planning that doesn&apos;t <em className="italic">feel like work</em>
              </h3>
              <p className="mt-5 text-[15px] leading-[1.6] text-[#3F4943]">
                Vellium turns your goals into a daily plan that adapts to your energy — so you actually finish what you start.
              </p>
            </div>
            <Link
              href="#"
              className="group mt-8 inline-flex w-fit items-center gap-1.5 rounded-full bg-[#171D19] px-5 py-2.5 text-[13px] font-semibold text-white transition-all hover:bg-[#386A20]"
            >
              Learn more
              <Icon name="arrow_forward" size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <PlanCard title="Calendar" icon="calendar_month">
              <div className="rounded-2xl bg-[#B7F0AD] p-3">
                <p className="text-[9px] font-bold uppercase text-[#386A20]">25 Jan</p>
                <p className="mt-1 text-[14px] font-bold text-[#171D19]">Today</p>
                <div className="mt-3 flex gap-1">
                  {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                    <div key={i} className={`h-1.5 flex-1 rounded ${i <= 4 ? "bg-[#386A20]" : "bg-[#171D19]/10"}`} />
                  ))}
                </div>
                <p className="mt-2 text-[9px] text-[#3F4943]">4 of 7 tasks done</p>
              </div>
            </PlanCard>

            <PlanCard title="Tasks" icon="task_alt">
              <div className="space-y-1.5">
                {[
                  { done: true, label: "Plan demo" },
                  { done: true, label: "Send invoice" },
                  { done: false, label: "Reply email" },
                  { done: false, label: "Review draft" },
                ].map((t) => (
                  <div key={t.label} className="flex items-center gap-2 rounded-xl bg-[#EEF5EE]/60 px-2 py-1.5">
                    <Icon
                      name={t.done ? "check_circle" : "radio_button_unchecked"}
                      size={14}
                      filled={t.done}
                      className={t.done ? "text-[#386A20]" : "text-[#386A20]/40"}
                    />
                    <span className={`text-[10px] ${t.done ? "text-[#3F4943] line-through" : "text-[#171D19]"}`}>{t.label}</span>
                  </div>
                ))}
              </div>
            </PlanCard>

            <PlanCard title="Journal" icon="edit_note">
              <div className="rounded-2xl bg-[#EEF5EE] p-3">
                <p className="text-[9px] font-bold uppercase text-[#386A20]">Today</p>
                <div className="mt-2 space-y-1.5">
                  {[100, 80, 75, 90].map((w, i) => (
                    <div key={i} className="h-1.5 rounded bg-[#171D19]/15" style={{ width: `${w}%` }} />
                  ))}
                </div>
              </div>
            </PlanCard>

            <PlanCard title="Reminders" icon="notifications">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 rounded-xl bg-[#B7F0AD] p-2">
                  <Icon name="alarm" size={14} filled className="text-[#386A20]" />
                  <div>
                    <p className="text-[9px] font-bold text-[#386A20]">9:00</p>
                    <p className="text-[10px] text-[#171D19]">Morning check-in</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-[#EEF5EE] p-2">
                  <Icon name="alarm" size={14} className="text-[#3F4943]" />
                  <div>
                    <p className="text-[9px] font-bold text-[#3F4943]">18:00</p>
                    <p className="text-[10px] text-[#171D19]">Evening review</p>
                  </div>
                </div>
              </div>
            </PlanCard>
          </div>
        </div>
      </div>
    </section>
  );
}

function PlanCard({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-white/60 bg-white/95 p-4 shadow-[0_8px_24px_rgba(56,106,32,0.08)] backdrop-blur-xl">
      <div className="mb-3 flex items-center gap-1.5">
        <Icon name={icon} size={16} className="text-[#386A20]" />
        <p className="text-[11px] font-bold text-[#171D19]">{title}</p>
      </div>
      {children}
    </div>
  );
}

/* ========================================================================== */
/* ORGANIZE                                                                   */
/* ========================================================================== */

function OrganizeSection() {
  return (
    <section className="px-6 py-24 text-center sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="inline-flex">
          <Chip icon="dashboard_customize" label="Organize" />
        </div>
        <h2 className="mt-5 font-serif text-[40px] font-medium leading-[1.1] text-[#171D19] sm:text-[56px]">
          Structure that adapts
          <br />
          to your <em className="italic text-[#386A20]">thinking</em>
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-[15px] leading-[1.6] text-[#3F4943]">
          Choose any approach that fits your mind: organize with spaces, folders & tags, or build rich databases with collections.
        </p>

        <div className="mt-16 grid gap-5 sm:grid-cols-3">
          <OrganizeSpaces />
          <OrganizeFolders />
          <OrganizeCollections />
        </div>
      </div>
    </section>
  );
}

function OrganizeCard({
  title,
  icon,
  gradient,
  children,
}: {
  title: string;
  icon: string;
  gradient: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`rounded-[32px] bg-gradient-to-br ${gradient} p-7 text-left shadow-[0_12px_32px_rgba(56,106,32,0.1)] transition-all hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(56,106,32,0.18)]`}>
      <div className="inline-flex items-center gap-1.5 rounded-full bg-white/60 px-3 py-1 backdrop-blur">
        <Icon name={icon} size={14} filled className="text-[#171D19]" />
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#171D19]">{title}</span>
      </div>
      {children}
    </div>
  );
}

function OrganizeSpaces() {
  const spaces = [
    { name: "Personal", icon: "person", color: "from-[#FFD9E0] to-[#FFB8C8]" },
    { name: "Work", icon: "work", color: "from-[#386A20] to-[#52B788]", active: true },
    { name: "Side project", icon: "rocket_launch", color: "from-[#FFE39C] to-[#FFD89E]" },
  ];

  return (
    <OrganizeCard title="Spaces" icon="space_dashboard" gradient="from-[#B7F0AD] via-[#C8F2E0] to-[#A8E5C8]">
      <div className="mt-5 space-y-2">
        {spaces.map((s) => (
          <div key={s.name} className={`flex items-center gap-2 rounded-xl px-3 py-2 ${s.active ? "bg-white shadow-sm" : "bg-white/60"}`}>
            <div className={`flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-br ${s.color}`}>
              <Icon name={s.icon} size={12} filled className="text-white" />
            </div>
            <span className="text-[12px] font-medium text-[#171D19]">{s.name}</span>
          </div>
        ))}
      </div>
    </OrganizeCard>
  );
}

function OrganizeFolders() {
  const folders = [
    { icon: "folder", label: "Projects", count: "24" },
    { icon: "folder", label: "Archive", count: "108" },
  ];

  return (
    <OrganizeCard title="Folders & Tags" icon="folder" gradient="from-[#FFD9E0] via-[#FFC4D0] to-[#FFB8C8]">
      <div className="mt-5 space-y-2">
        {folders.map((f) => (
          <div key={f.label} className="flex items-center justify-between rounded-xl bg-white px-3 py-2">
            <div className="flex items-center gap-2">
              <Icon name={f.icon} size={14} filled className="text-[#386A20]" />
              <span className="text-[12px] font-medium text-[#171D19]">{f.label}</span>
            </div>
            <span className="text-[10px] text-[#3F4943]">{f.count}</span>
          </div>
        ))}
        <div className="flex flex-wrap gap-1 px-1 pt-1">
          {["#urgent", "#idea", "#done", "#review", "#draft"].map((tag) => (
            <span key={tag} className="rounded-full bg-white px-2 py-1 text-[10px] font-medium text-[#386A20]">{tag}</span>
          ))}
        </div>
      </div>
    </OrganizeCard>
  );
}

function OrganizeCollections() {
  const rows = [
    { name: "Q1 Launch", status: "Active", dot: "bg-[#386A20]" },
    { name: "Site redesign", status: "Done", dot: "bg-[#2D7A4F]" },
    { name: "Pricing v2", status: "Active", dot: "bg-[#386A20]" },
    { name: "Newsletter", status: "Idea", dot: "bg-[#9B7E2D]" },
  ];

  return (
    <OrganizeCard title="Collections" icon="table_view" gradient="from-[#FFF4D6] via-[#FFE39C] to-[#FFD89E]">
      <div className="mt-5 overflow-hidden rounded-2xl bg-white">
        {rows.map((row, i) => (
          <div
            key={row.name}
            className={`flex items-center justify-between border-b border-[#DBE5DA] px-3 py-2 last:border-0 ${i === 0 ? "bg-[#B7F0AD]/30" : ""}`}
          >
            <div className="flex items-center gap-2">
              <span className={`h-1.5 w-1.5 rounded-full ${row.dot}`} />
              <span className="text-[11px] font-medium text-[#171D19]">{row.name}</span>
            </div>
            <span className="text-[9px] font-semibold text-[#3F4943]">{row.status}</span>
          </div>
        ))}
      </div>
    </OrganizeCard>
  );
}

/* ========================================================================== */
/* FEATURE BIG                                                                */
/* ========================================================================== */

function FeatureBig() {
  return (
    <section id="how-it-works" className="px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-[40px] bg-gradient-to-br from-[#52B788] via-[#B7F0AD] to-[#D5E8D4] p-8 shadow-[0_20px_60px_-20px_rgba(56,106,32,0.3)] sm:p-14">
          <div className="grid gap-12 sm:grid-cols-2 sm:items-center">
            <FeatureMockup />
            <FeatureText />
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureMockup() {
  const tasks = [
    { done: true, label: "Write hero copy" },
    { done: true, label: "Finalize design system" },
    { done: false, label: "Ship to production" },
    { done: false, label: "Send launch email" },
  ];

  return (
    <div className="relative">
      <div className="absolute -top-4 left-4 right-4 rounded-2xl border border-white/60 bg-white/70 p-3 backdrop-blur">
        <p className="text-[10px] font-bold uppercase tracking-wider text-[#386A20]">Yesterday</p>
      </div>

      <div className="relative mt-3 rounded-3xl border border-white/80 bg-white p-6 shadow-[0_20px_50px_rgba(56,106,32,0.25)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="rocket_launch" size={20} filled className="text-[#386A20]" />
            <h4 className="font-serif text-[20px] font-medium text-[#171D19]">Today&apos;s Focus</h4>
          </div>
          <span className="rounded-full bg-[#B7F0AD] px-2.5 py-0.5 text-[9px] font-bold uppercase text-[#386A20]">Active</span>
        </div>

        <div className="mt-5 space-y-2">
          {tasks.map((t) => (
            <div key={t.label} className="flex items-center gap-3 rounded-2xl bg-[#EEF5EE] px-3 py-2.5">
              <Icon
                name={t.done ? "check_circle" : "radio_button_unchecked"}
                size={18}
                filled={t.done}
                className={t.done ? "text-[#386A20]" : "text-[#386A20]/40"}
              />
              <span className={`text-[12px] ${t.done ? "text-[#3F4943] line-through" : "text-[#171D19]"}`}>{t.label}</span>
            </div>
          ))}
        </div>

        <div className="mt-5 flex items-start gap-2.5 rounded-2xl bg-[#171D19] p-3.5 text-white">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#386A20] to-[#52B788]">
            <Icon name="auto_awesome" size={14} filled className="text-white" />
          </div>
          <div>
            <p className="text-[9px] font-bold uppercase tracking-wider text-[#B7F0AD]">Your coach</p>
            <p className="mt-1 text-[11px] leading-relaxed text-white/90">
              Great progress! Focus the next 2 hours on shipping. You&apos;re 67% done — finish strong ✦
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureText() {
  const items = [
    { icon: "description", label: "Templates" },
    { icon: "draw", label: "Whiteboards" },
    { icon: "auto_awesome", label: "Write with AI" },
    { icon: "share", label: "Publish & share" },
  ];

  return (
    <div>
      <Chip icon="bolt" label="Execute" variant="white" />
      <h3 className="mt-4 font-serif text-[36px] font-medium leading-[1.05] text-[#171D19] sm:text-[44px]">
        From first thought
        <br />
        to <em className="italic">shipped work</em>
      </h3>
      <p className="mt-5 text-[15px] leading-[1.6] text-[#3F4943]">
        In Vellium, your scattered goals become a clear daily plan — your AI coach checks in, adapts to your energy, and keeps you shipping. No more Sunday-night planning panic.
      </p>
      <Link
        href="#"
        className="group mt-6 inline-flex items-center gap-1.5 rounded-full bg-[#171D19] px-5 py-2.5 text-[13px] font-semibold text-white transition-all hover:bg-[#386A20]"
      >
        Learn more
        <Icon name="arrow_forward" size={16} className="transition-transform group-hover:translate-x-0.5" />
      </Link>

      <div className="mt-7 grid grid-cols-2 gap-2">
        {items.map((item) => (
          <div key={item.label} className="flex items-center gap-2 rounded-2xl border border-white/40 bg-white/50 px-3 py-2.5 backdrop-blur">
            <Icon name={item.icon} size={16} filled className="text-[#386A20]" />
            <span className="text-[12px] font-medium text-[#171D19]">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ========================================================================== */
/* TESTIMONIALS                                                               */
/* ========================================================================== */

function Testimonials() {
  const testimonials = [
    {
      quote: "Vellium turned my scattered ideas into shipped work. The daily check-ins feel less like nagging and more like having a thoughtful co-founder.",
      name: "Maya Okafor",
      role: "Founder, Loop Studio",
      gradient: "from-[#386A20] to-[#52B788]",
    },
    {
      quote: "I planned for years and shipped nothing. Two months with Vellium and I've launched three products. The AI coach doesn't let you lie to yourself.",
      name: "Diego Martín",
      role: "Indie developer",
      gradient: "from-[#FFD9E0] to-[#FFB8C8]",
    },
    {
      quote: "It's the first productivity tool that actually understands my energy. The morning ritual is the most important 5 minutes of my day.",
      name: "Sarah Lin",
      role: "Designer & consultant",
      gradient: "from-[#FFE39C] to-[#FFD89E]",
    },
  ];

  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <div className="inline-flex">
            <Chip icon="favorite" label="Loved by shippers" />
          </div>
          <h2 className="mt-5 font-serif text-[40px] font-medium leading-[1.1] text-[#171D19] sm:text-[52px]">
            What our users <em className="italic text-[#386A20]">say</em>
          </h2>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="flex flex-col justify-between rounded-[28px] border border-white/60 bg-white/70 p-7 backdrop-blur-xl shadow-[0_8px_32px_rgba(56,106,32,0.08)] transition-all hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(56,106,32,0.15)]"
            >
              <div>
                <Icon name="format_quote" size={28} filled className="text-[#386A20]" />
                <div className="mb-3 flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Icon key={s} name="star" size={14} filled className="text-[#FFB800]" />
                  ))}
                </div>
                <blockquote className="font-serif text-[17px] leading-[1.5] text-[#171D19]">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
              </div>
              <figcaption className="mt-6 flex items-center gap-3">
                <div className={`flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br ${t.gradient} text-[14px] font-bold text-white shadow-md`}>
                  {t.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <p className="text-[13px] font-bold text-[#171D19]">{t.name}</p>
                  <p className="text-[11px] text-[#3F4943]">{t.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ========================================================================== */
/* AWARDS                                                                     */
/* ========================================================================== */

function Awards() {
  const awards = [
    { name: "Product Hunt", sub: "#1 of the Day", icon: "trophy", color: "from-[#FF8FA8] to-[#FF6B85]" },
    { name: "Apple Design", sub: "Finalist 2024", icon: "emoji_events", color: "from-[#52B788] to-[#386A20]" },
    { name: "Webby Award", sub: "Productivity", icon: "workspace_premium", color: "from-[#FFE39C] to-[#FFD89E]" },
    { name: "Design Award", sub: "Excellent UX", icon: "diamond", color: "from-[#B7F0AD] to-[#52B788]" },
  ];

  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {awards.map((a) => (
            <div key={a.name} className="group flex flex-col items-center text-center">
              <div className={`flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br ${a.color} shadow-[0_8px_24px_rgba(56,106,32,0.15)] transition-transform group-hover:scale-110 group-hover:rotate-6`}>
                <Icon name={a.icon} size={28} filled className="text-white" />
              </div>
              <p className="mt-4 text-[12px] font-bold text-[#171D19]">{a.name}</p>
              <p className="mt-1 text-[10px] text-[#3F4943]">{a.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ========================================================================== */
/* PRICING                                                                    */
/* ========================================================================== */

function Pricing() {
  return (
    <section id="pricing" className="px-6 py-24 text-center">
      <div className="mx-auto max-w-5xl">
        <div className="inline-flex">
          <Chip icon="sell" label="Pricing" />
        </div>
        <h2 className="mt-5 font-serif text-[40px] font-medium leading-[1.1] text-[#171D19] sm:text-[56px]">
          Your pace, your <em className="italic text-[#386A20]">plan</em>
        </h2>
        <p className="mt-5 text-[15px] text-[#3F4943]">
          Use it now and forever, or upgrade to unlock your daily flow.
        </p>

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          <PricingFree />
          <PricingPro />
        </div>

        <p className="mt-10 text-[12px] text-[#3F4943]">
          Learn more about <Link href="#" className="font-semibold text-[#386A20] hover:underline">group discounts →</Link>
        </p>
      </div>
    </section>
  );
}

function PricingFree() {
  const features = ["Up to 3 active goals", "Daily AI check-ins", "30-day history", "Community support"];

  return (
    <div className="rounded-[32px] border border-white/60 bg-white/80 p-8 text-left shadow-[0_8px_32px_rgba(56,106,32,0.06)] backdrop-blur-xl">
      <div className="flex items-center gap-2">
        <Icon name="workspaces" size={20} filled className="text-[#386A20]" />
        <p className="text-[18px] font-bold text-[#171D19]">Free</p>
      </div>
      <p className="mt-2 text-[13px] text-[#3F4943]">Full access for personal use. Perfect to get started.</p>
      <div className="mt-6 flex items-baseline gap-1">
        <span className="text-[44px] font-bold text-[#171D19]">$0</span>
        <span className="text-[13px] text-[#3F4943]">/month</span>
      </div>

      <ul className="mt-6 space-y-2.5">
        {features.map((item) => (
          <li key={item} className="flex items-center gap-2.5 text-[13px] text-[#171D19]">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#B7F0AD]">
              <Icon name="check" size={12} className="text-[#386A20]" />
            </span>
            {item}
          </li>
        ))}
      </ul>

      <Link
        href="#"
        className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-[#171D19] px-5 py-3 text-[13px] font-semibold text-[#171D19] transition-all hover:bg-[#171D19] hover:text-white"
      >
        Get Started
      </Link>
    </div>
  );
}

function PricingPro() {
  const features = [
    "Unlimited goals",
    "Advanced AI planning",
    "Full analytics dashboard",
    "Unlimited history",
    "Priority support",
    "Custom integrations",
  ];

  return (
    <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#171D19] via-[#1A4314] to-[#171D19] p-8 text-left text-white shadow-[0_20px_60px_-15px_rgba(56,106,32,0.5)]">
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#386A20]/50 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-[#52B788]/30 blur-3xl" />

      <div className="relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="auto_awesome" size={20} filled className="text-[#B7F0AD]" />
            <p className="text-[18px] font-bold">Vellium Pro</p>
          </div>
          <span className="rounded-full bg-gradient-to-r from-[#386A20] to-[#52B788] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider">
            Best value
          </span>
        </div>
        <p className="mt-2 text-[13px] text-white/70">Designed to effortlessly fit into your everyday flow.</p>
        <div className="mt-6 flex items-baseline gap-1">
          <span className="text-[44px] font-bold">$4.8</span>
          <span className="text-[13px] text-white/60">/month</span>
        </div>

        <ul className="mt-6 space-y-2.5">
          {features.map((item) => (
            <li key={item} className="flex items-center gap-2.5 text-[13px]">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#386A20]">
                <Icon name="check" size={12} className="text-white" />
              </span>
              {item}
            </li>
          ))}
        </ul>

        <Link
          href="#"
          className="group mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#B7F0AD] px-5 py-3 text-[13px] font-bold text-[#062100] transition-all hover:bg-white"
        >
          <Icon name="bolt" size={16} filled />
          Upgrade to Pro
        </Link>
      </div>
    </div>
  );
}

/* ========================================================================== */
/* FAQ                                                                        */
/* ========================================================================== */

function FAQ() {
  const faqs = [
    {
      q: "How is Vellium different from Notion or Todoist?",
      a: "Vellium isn't just a list — it's a coach. AI plans your week, checks in daily, and adapts to your real energy. No more managing the tool instead of doing the work.",
    },
    {
      q: "Do I need to spend hours setting it up?",
      a: "No. Tell Vellium your goal and it builds your plan in under 2 minutes. The AI learns as you go.",
    },
    {
      q: "Is my data private?",
      a: "Yes. Your goals and notes are encrypted end-to-end. We never train models on your data.",
    },
    {
      q: "Can I cancel anytime?",
      a: "Absolutely. Cancel from settings in one click — no questions asked.",
    },
  ];

  return (
    <section id="learn" className="px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <div className="inline-flex">
            <Chip icon="help" label="FAQ" />
          </div>
          <h2 className="mt-5 font-serif text-[40px] font-medium leading-[1.1] text-[#171D19] sm:text-[48px]">
            Frequently asked <em className="italic text-[#386A20]">questions</em>
          </h2>
        </div>

        <div className="mt-12 space-y-3">
          {faqs.map((f) => (
            <details
              key={f.q}
              className="group rounded-3xl border border-white/60 bg-white/70 p-6 backdrop-blur-xl transition-all hover:bg-white/90"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                <h3 className="text-[15px] font-semibold text-[#171D19]">{f.q}</h3>
                <Icon name="add" size={20} className="text-[#386A20] transition-transform group-open:rotate-45" />
              </summary>
              <p className="mt-4 text-[14px] leading-[1.6] text-[#3F4943]">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ========================================================================== */
/* FINAL CTA                                                                  */
/* ========================================================================== */

function FinalCTA() {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-br from-[#386A20] via-[#52B788] to-[#B7F0AD] p-10 shadow-[0_30px_80px_-20px_rgba(56,106,32,0.5)] sm:p-16">
          <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-[#FFE39C]/30 blur-3xl" />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 28px, rgba(255,255,255,0.4) 28px, rgba(255,255,255,0.4) 29px)",
            }}
          />

          <div className="relative text-center">
            <div className="mx-auto inline-flex">
              <Chip icon="rocket_launch" label="Ready when you are" variant="dark" />
            </div>

            <h2 className="mt-6 font-serif text-[44px] font-medium leading-[1.05] text-white sm:text-[64px]">
              The work is <em className="italic">waiting</em>
            </h2>
            <p className="mx-auto mt-5 max-w-md text-[15px] leading-[1.6] text-white/90">
              Join 12,000+ builders who stopped planning and started shipping. Your first check-in takes 2 minutes.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="#"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-[14px] font-bold text-[#171D19] shadow-lg transition-all hover:scale-105 hover:shadow-2xl"
              >
                Start free
                <Icon name="arrow_forward" size={18} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="#"
                className="inline-flex items-center gap-2 rounded-full bg-[#171D19] px-6 py-3.5 text-[14px] font-bold text-white transition-all hover:scale-105"
              >
                <Icon name="download" size={18} filled />
                Download app
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ========================================================================== */
/* FOOTER                                                                     */
/* ========================================================================== */

function Footer() {
  const cols = [
    { title: "Product", links: ["Features", "Goals", "Plan", "Organize", "Customize", "Pricing"] },
    { title: "Community", links: ["Slack", "Reddit", "X / Twitter", "Learn", "Templates"] },
    { title: "Support", links: ["Help Center", "Contact"] },
    { title: "Company", links: ["About", "Blog", "Careers", "Affiliates", "Terms", "Privacy"] },
    { title: "Download", links: ["iPhone", "iPad", "Mac", "Windows", "Vision Pro", "Android"] },
  ];

  const socials = [
    { icon: "photo_camera", name: "Instagram", href: "https://instagram.com" },
    { icon: "play_circle", name: "YouTube", href: "https://youtube.com" },
    { icon: "tag", name: "X", href: "https://x.com" },
    { icon: "business_center", name: "LinkedIn", href: "https://linkedin.com" },
  ];

  return (
    <footer className="mt-12 overflow-hidden rounded-t-[40px] bg-gradient-to-br from-[#171D19] via-[#1A4314] to-[#171D19] px-6 py-16 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[#386A20] to-[#52B788] shadow-[0_4px_16px_rgba(56,106,32,0.5)]">
              <Icon name="bolt" size={20} filled className="text-white" />
            </div>
            <span className="font-serif text-[22px] font-medium text-white">Vellium</span>
          </div>
          <p className="max-w-sm text-[13px] text-white/60">
            AI Accountability Coach for builders. Stop planning, start shipping.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-12 sm:grid-cols-3 lg:grid-cols-5">
          {cols.map((col) => (
            <div key={col.title}>
              <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#B7F0AD]">{col.title}</p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <Link href="#" className="text-[12px] text-white/70 transition-colors hover:text-[#B7F0AD]">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center">
          <p className="text-[11px] text-white/60">© 2026 Vellium Inc. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-[11px] text-white/60">
              <Icon name="language" size={14} />
              English
            </span>
            <div className="flex gap-2">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit our ${s.name} page`}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-white/70 transition-all hover:bg-[#386A20] hover:text-white"
                >
                  <Icon name={s.icon} size={16} filled />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}