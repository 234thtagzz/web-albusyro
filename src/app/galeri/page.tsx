import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SectionHeading } from "@/components/ui/section-heading";
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
        <section className="bg-slate-50 pt-24 pb-16 sm:pt-32 sm:pb-20">
          <div className="container-custom">
            <SectionHeading
              badge="Galeri"
              title="Dokumentasi Kegiatan"
              description="Momen-momen penting dalam kegiatan pendidikan di STTD Al-Busyro."
            />
          </div>
        </section>

        <section className="section-spacing">
          <div className="container-custom">
            <GaleriClient items={rows} fallback={isFallback} />
          </div>
        </section>
        </main>
        <Footer />
    </>
  );
}
