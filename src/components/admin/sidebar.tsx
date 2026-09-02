"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/layout/logo";
import { LayoutDashboard, Newspaper, Trophy, Images, GraduationCap, LogOut, Users } from "lucide-react";

const nav = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Berita", href: "/admin/berita", icon: Newspaper },
  { label: "Prestasi", href: "/admin/prestasi", icon: Trophy },
  { label: "Galeri", href: "/admin/galeri", icon: Images },
  { label: "PPDB", href: "/admin/ppdb", icon: GraduationCap },
  { label: "Pendaftar", href: "/admin/pendaftar", icon: Users },
];

export function AdminSidebar({ onSignOut }: { onSignOut: () => void }) {
  const pathname = usePathname();
  return (
    <aside className="flex h-screen w-[260px] flex-col border-r border-stone-200 bg-white">
      <div className="flex h-16 items-center gap-3 border-b border-stone-100 px-5">
        <Logo />
        <div className="leading-tight">
          <p className="font-display text-sm font-bold text-primary-1">Al-Busyro Admin</p>
          <p className="text-[11px] text-stone-400">Supabase CMS</p>
        </div>
      </div>
      <nav className="flex-1 space-y-1 p-3">
        {nav.map((item) => {
          const active = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition",
                active ? "bg-primary-1 text-white shadow-sm" : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-stone-100 p-3">
        <form action={onSignOut}>
          <button type="submit" className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-stone-600 hover:bg-stone-100">
            <LogOut className="h-4 w-4" />
            Keluar
          </button>
        </form>
        <Link href="/" className="mt-1 flex items-center gap-2 px-3 text-xs text-stone-400 hover:text-primary-1">
          ← Kembali ke website
        </Link>
      </div>
    </aside>
  );
}
