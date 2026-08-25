"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { mainNavigation, ctaNavigation } from "@/data/navigation";
import { school } from "@/data/school";
import { Logo } from "@/components/layout/logo";

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
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
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

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileOpen]);

  const closeMobile = () => setIsMobileOpen(false);

  return (
    <>
      <a
        href="#main-content"
        className="fixed top-0 left-0 z-[100] -translate-y-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-transform focus:translate-y-0"
      >
        Langsung ke konten
      </a>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-primary-3/90 backdrop-blur-md border-b border-white/5"
            : "bg-transparent"
        )}
      >
        <nav className="container-custom flex h-16 items-center justify-between lg:h-[72px]">
          <Link
            href="/"
            className="flex items-center gap-2.5 font-heading text-lg font-extrabold tracking-tight text-white"
          >
            <Logo />
            <span className="hidden sm:inline">{school.shortName}</span>
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {mainNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-[10px] px-3.5 py-2 text-[15px] font-medium transition-colors",
                  isActive(item.href)
                    ? "text-white bg-white/10"
                    : "text-fog hover:text-white hover:bg-white/5"
                )}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={ctaNavigation.href}
              className="ml-2 rounded-[12px] bg-primary px-5 py-2.5 text-[15px] font-medium text-white transition-colors hover:bg-emerald-dark"
            >
              {ctaNavigation.label}
            </Link>
          </div>

          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-[12px] text-white lg:hidden"
            aria-label={isMobileOpen ? "Tutup menu" : "Buka menu"}
          >
            {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>

        {isMobileOpen && (
          <div className="fixed inset-0 top-16 z-40 bg-cosmic lg:hidden">
            <div className="container-custom flex flex-col gap-1 py-4">
              {mainNavigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMobile}
                  className={cn(
                    "rounded-[12px] px-4 py-3.5 text-base font-medium transition-colors",
                    isActive(item.href)
                      ? "bg-white/10 text-white"
                      : "text-fog hover:bg-white/5 hover:text-white"
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <div className="my-2 h-px bg-white/8" />
              <Link
                href={ctaNavigation.href}
                onClick={closeMobile}
                className="rounded-[12px] bg-primary px-5 py-3.5 text-center text-base font-medium text-white transition-colors hover:bg-emerald-dark"
              >
                {ctaNavigation.label}
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
