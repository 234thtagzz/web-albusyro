"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { mainNavigation, ctaNavigation } from "@/data/navigation";
import { Logo } from "./logo";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  const isActive = useCallback(
    (href: string) => {
      if (href === "/") return pathname === "/";
      return pathname === href || pathname.startsWith(href + "/");
    },
    [pathname]
  );

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const closeMobile = () => setIsMobileOpen(false);

  return (
    <>
      {/* Aksesibilitas: Skip to Content */}
      <a
        href="#main-content"
        className="fixed top-2 left-2 z-[100] -translate-y-20 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-transform focus:translate-y-0"
      >
        Langsung ke konten
      </a>

      {/* Floating Header Wrapper */}
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4 transition-all duration-300",
          isScrolled ? "sm:pt-2" : "sm:pt-5 lg:pt-10"
        )}
      >
        {/* Glassmorphism Capsule Navbar */}
        <nav
          className={cn(
            "mx-auto flex h-14 max-w-6xl items-center justify-between rounded-full border px-4 transition-all duration-300 sm:px-6 lg:h-16",
            isScrolled || isMobileOpen
              ? "border-slate-200/80 bg-white/90 shadow-md shadow-slate-900/5 backdrop-blur-xl"
              : "border-white/70 bg-white/60 shadow-lg shadow-slate-900/5 backdrop-blur-md hover:bg-white/80"
          )}
        >
          {/* Brand Logo */}
          <Link href="/" className="group flex items-center gap-2.5">
            <Logo />
            <span className="leading-tight">
              <span className="block font-display text-[14px] font-bold tracking-tight text-slate-900 sm:text-[15px]">
                STTD Al&#8209;BUSYRO
              </span>
              <span className="block text-[10px] font-medium uppercase tracking-[0.12em] text-slate-500 sm:text-[11px]">
                Sekolah Tahfidz — Setara SD
              </span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden items-center gap-1 lg:flex">
            {mainNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-3.5 py-1.5 text-[14px] font-medium transition-colors",
                  isActive(item.href)
                    ? "bg-slate-900/10 text-slate-900 font-semibold"
                    : "text-slate-600 hover:bg-slate-900/5 hover:text-slate-900"
                )}
              >
                {item.label}
              </Link>
            ))}

            {/* CTA Button */}
            <Button
              render={<Link href={ctaNavigation.href} />}
              nativeButton={false}
              className="ml-2 h-9 rounded-full bg-teal-600 px-5 text-[13.5px] font-semibold text-white shadow-md shadow-teal-600/20 transition-all hover:bg-teal-700 hover:shadow-lg lg:h-10"
            >
              {ctaNavigation.label}
            </Button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="h-9 w-9 rounded-full text-slate-700 hover:bg-slate-900/5 lg:hidden"
            aria-label={isMobileOpen ? "Tutup menu" : "Buka menu"}
          >
            {isMobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </nav>

        {/* Mobile Navigation Drawer / Sheet */}
        <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
          <SheetContent
            side="top"
            showCloseButton={false}
            className="top-16 mx-auto max-w-[calc(100%-1.5rem)] rounded-3xl border border-slate-200/80 bg-white/95 p-4 shadow-xl backdrop-blur-xl lg:hidden"
          >
            <SheetTitle className="sr-only">Menu Navigasi</SheetTitle>
            <SheetDescription className="sr-only">
              Navigasi utama situs web STTD Al-Busyro
            </SheetDescription>
            <div className="flex flex-col gap-1 py-2">
              {mainNavigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMobile}
                  className={cn(
                    "rounded-2xl px-4 py-2.5 text-base font-medium transition-colors",
                    isActive(item.href)
                      ? "bg-teal-50 text-teal-900 font-semibold"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href={ctaNavigation.href}
                onClick={closeMobile}
                className="mt-3 block w-full rounded-full bg-teal-600 py-3 text-center text-base font-semibold text-white shadow-md transition-colors hover:bg-teal-700"
              >
                {ctaNavigation.label}
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </header>
    </>
  );
}