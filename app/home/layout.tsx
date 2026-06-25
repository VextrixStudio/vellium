import type { Metadata } from "next";
import { ThemeProvider } from "@/components/providers/theme-provider";
import "./style.css";

export const metadata: Metadata = {
  title: "Vellium — Home",
  description: "Tu espacio personal en Vellium",
};

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider>
      <div className="home-scope min-h-screen">{children}</div>
    </ThemeProvider>
  );
}