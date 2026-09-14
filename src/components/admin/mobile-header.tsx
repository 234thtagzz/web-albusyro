"use client";

import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { AdminNavContent } from "./sidebar";
import { Menu, LogOut } from "lucide-react";
import { Logo } from "@/components/layout/logo";

export function AdminMobileHeader({ onSignOut }: { onSignOut: () => void }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-stone-200 bg-white/95 px-4 backdrop-blur-sm lg:hidden">
      <div className="flex items-center gap-3">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            className="inline-flex size-9 items-center justify-center rounded-lg border border-stone-200 bg-white text-stone-700 shadow-xs hover:bg-stone-50 transition"
            aria-label="Buka navigasi menu"
          >
            <Menu className="h-5 w-5" />
          </SheetTrigger>
          <SheetContent side="left" className="w-[280px] p-0 bg-white" showCloseButton={true}>
            <div className="sr-only">
              <SheetTitle>Menu Navigasi Admin</SheetTitle>
            </div>
            <AdminNavContent
              onNavigate={() => setOpen(false)}
              onSignOut={onSignOut}
            />
          </SheetContent>
        </Sheet>
        <div className="flex items-center gap-2">
          <Logo />
          <span className="font-display text-sm font-bold text-primary-1">
            Admin
          </span>
        </div>
      </div>

      <form action={onSignOut}>
        <button
          type="submit"
          className="inline-flex items-center gap-1.5 rounded-lg border border-stone-200 bg-stone-50 px-2.5 py-1.5 text-xs font-medium text-stone-600 hover:bg-stone-100 hover:text-stone-900 transition"
        >
          <LogOut className="h-3.5 w-3.5" />
          Keluar
        </button>
      </form>
    </header>
  );
}
