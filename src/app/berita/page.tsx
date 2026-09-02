import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PageHero } from "@/components/ui/page-hero";
import { createClient } from "@/lib/supabase/server";
import { newsItems as fallback } from "@/data/news";
import { BeritaClient } from "@/components/berita/berita-client";
import type { Database } from "@/types/database";

type BeritaRow = Database["public"]["Tables"]["berita"]["Row"];

export const revalidate = 60;

export default async function NewsPage() {
  const supabase = await createClient();
  const { data } = await supabase.from("berita").select("*").order("published_at", { ascending: false });
  const rows: BeritaRow[] = data && data.length > 0 ? data : fallback.map((r) => ({
    id: r.id, slug: r.slug, title: r.title, excerpt: r.excerpt, content: r.content, category: r.category as BeritaRow["category"], author: r.author, image_url: r.imageUrl, image_alt: r.imageAlt, published_at: new Date().toISOString(), created_at: new Date().toISOString(), updated_at: new Date().toISOString()
  }));
  const isFallback = !data || data.length === 0;

  return (
    <>
      <Navbar />
      <main className="flex-1" id="main-content">
        <PageHero
          badge="Berita"
          title="Berita & Pengumuman"
          description="Informasi terkini dari STTD Al-Busyro — kegiatan, prestasi, dan pengumuman resmi madrasah."
        />
        <section className="section-spacing relative overflow-hidden border-t border-stone-200 bg-white">
          <div className="pointer-events-none absolute -top-20 left-0 h-[400px] w-[500px] rounded-full bg-primary-4/10 blur-[80px]" aria-hidden />
          <div className="pointer-events-none absolute -bottom-20 right-0 h-[360px] w-[360px] rounded-full bg-secondary-3/10 blur-[70px]" aria-hidden />
          <div className="container-custom relative">
            <BeritaClient items={rows} fallback={isFallback} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
