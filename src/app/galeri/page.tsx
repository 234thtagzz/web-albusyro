import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PageHero } from "@/components/ui/page-hero";
import { createClient } from "@/lib/supabase/server";
import { galleryItems as fallback } from "@/data/gallery";
import { GaleriClient } from "@/components/galeri/galeri-client";
import type { Database } from "@/types/database";

type GaleriRow = Database["public"]["Tables"]["galeri"]["Row"];

export const revalidate = 60;

export default async function GalleryPage() {
  const supabase = await createClient();
  const { data } = await supabase.from("galeri").select("*").order("created_at", { ascending: false });
  const rows: GaleriRow[] = data && data.length > 0 ? data : fallback.map((r) => ({
    id: r.id, title: r.title, category: r.category as GaleriRow["category"], description: r.description, image_url: (r as unknown as { imageUrl: string }).imageUrl ?? (r as unknown as { image_url: string }).image_url, alt: r.alt, created_at: new Date().toISOString(), updated_at: new Date().toISOString()
  }));
  const isFallback = !data || data.length === 0;

  return (
    <>
      <Navbar />
      <main className="flex-1" id="main-content">
        <PageHero
          badge="Galeri"
          title="Dokumentasi Kegiatan"
          description="Momen-momen penting dalam kegiatan pendidikan di STTD Al-Busyro — pembelajaran, tahfizh, dan kebersamaan santri."
        />
        <section className="section-spacing relative overflow-hidden border-t border-stone-200 bg-white">
          <div className="pointer-events-none absolute -top-20 left-0 h-[400px] w-[500px] rounded-full bg-primary-4/10 blur-[80px]" aria-hidden />
          <div className="pointer-events-none absolute -bottom-20 right-0 h-[360px] w-[360px] rounded-full bg-secondary-3/10 blur-[70px]" aria-hidden />
          <div className="container-custom relative">
            <GaleriClient items={rows} fallback={isFallback} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
