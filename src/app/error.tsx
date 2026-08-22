"use client";

import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

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
                <button
                  onClick={() => reset()}
                  className="inline-flex h-[44px] items-center gap-2 rounded-[12px] bg-primary px-6 text-[15px] font-medium text-white transition-colors hover:bg-emerald-700"
                >
                  Coba Lagi
                </button>
                <Link
                  href="/"
                  className="inline-flex h-[44px] items-center gap-2 rounded-[12px] border border-slate-300 bg-transparent px-6 text-[15px] font-medium text-slate-700 transition-colors hover:bg-slate-100"
                >
                  Kembali ke Beranda
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
