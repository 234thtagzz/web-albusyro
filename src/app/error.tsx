"use client";

import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <>
      <Navbar />
      <main className="flex-1" id="main-content">
        <section className="section-spacing">
          <div className="container-custom">
            <div className="mx-auto max-w-md text-center">
              <p className="text-7xl font-extrabold text-primary">!</p>
              <h1 className="mt-4 font-display text-2xl tracking-tight text-slate-900">
                Terjadi Kesalahan
              </h1>
              <p className="mt-3 text-sm text-slate-600">
                Maaf, informasi belum dapat ditampilkan. Silakan coba kembali beberapa saat lagi.
              </p>
              <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <Button
                  onClick={() => reset()}
                  className="h-[44px] rounded-[12px] px-6 text-[15px] font-medium"
                >
                  Coba Lagi
                </Button>
                <Button
                  nativeButton={false}
                  variant="outline"
                  render={<Link href="/" />}
                  className="h-[44px] rounded-[12px] px-6 text-[15px] font-medium"
                >
                  Kembali ke Beranda
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
