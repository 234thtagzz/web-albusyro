import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SectionHeading } from "@/components/ui/section-heading";
import { createClient } from "@/lib/supabase/server";
import { galleryItems as fallback } from "@/data/gallery";
import { GaleriClient } from "@/components/galeri/galeri-client";

export const revalidate = 60;

export default async function GalleryPage() {
  const supabase = await createClient();
  const { data } = await supabase.from("galeri").select("*").order("created_at", { ascending: false });
  const mapped = data && data.length > 0
    ? data.map((r) => ({ ...r, imageUrl: r.image_url, alt: r.alt ?? r.title } as any))
    : fallback.map((r) => ({ ...r, image_url: r.imageUrl, alt: r.alt } as any));
  // GaleriClient expects Row[] shape; we pass raw rows
  const rows = data && data.length > 0 ? data : fallback.map((r) => ({
    id: r.id, title: r.title, category: r.category as any, description: r.description, image_url: (r as any).imageUrl ?? (r as any).image_url, alt: r.alt, created_at: new Date().toISOString(), updated_at: new Date().toISOString()
  } as any));
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
            <GaleriClient items={rows as any} fallback={isFallback} />
          </div>
        </section>
        </main>
        <Footer />
    </>
  );
}
