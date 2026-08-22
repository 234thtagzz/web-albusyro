"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { mainNavigation, ctaNavigation } from "@/data/navigation";

function BrandMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-[10px] bg-primary",
        className
      )}
    >
      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" aria-hidden="true">
        <g fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="7" y="7" width="10" height="10" />
          <rect x="7" y="7" width="10" height="10" transform="rotate(45 12 12)" />
        </g>
      </svg>
    </span>
  );
}

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

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
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
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          isScrolled || isMobileOpen
            ? "border-b border-slate-200/80 bg-white/85 shadow-[0_1px_3px_rgba(15,23,42,0.05)] backdrop-blur-md"
            : "bg-transparent"
        )}
      >
        <nav className="container-custom flex h-16 items-center justify-between lg:h-[76px]">
          <Link href="/" className="group flex items-center gap-2.5">
            <BrandMark className="text-primary-foreground transition-colors group-hover:bg-emerald-700" />
            <span className="leading-tight">
              <span className="block font-display text-[15px] tracking-tight text-slate-900">
                STTD Al&#8209;Busyro
              </span>
              <span className="block text-[11px] font-medium uppercase tracking-[0.14em] text-slate-500">
                Tahfizhul Qur&rsquo;an · Solo Raya
              </span>
            </span>
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {mainNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-3.5 py-2 text-[14.5px] font-medium transition-colors",
                  isActive(item.href)
                    ? "bg-emerald-50 text-emerald-800"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                )}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={ctaNavigation.href}
              className="ml-2 rounded-full bg-primary px-5 py-2.5 text-[14.5px] font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-emerald-700"
            >
              {ctaNavigation.label}
            </Link>
          </div>

          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-slate-700 transition-colors hover:bg-slate-100 lg:hidden"
            aria-label={isMobileOpen ? "Tutup menu" : "Buka menu"}
          >
            {isMobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </nav>

        {isMobileOpen && (
          <div className="border-b border-slate-200 bg-white lg:hidden">
            <div className="container-custom flex flex-col gap-1 py-4 pb-6">
              {mainNavigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMobile}
                  className={cn(
                    "rounded-[12px] px-4 py-3 text-base font-medium transition-colors",
                    isActive(item.href)
                      ? "bg-emerald-50 text-emerald-800"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href={ctaNavigation.href}
                onClick={closeMobile}
                className="mt-2 rounded-full bg-primary px-5 py-3 text-center text-base font-semibold text-primary-foreground transition-colors hover:bg-emerald-700"
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
