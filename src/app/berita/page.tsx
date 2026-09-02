import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SectionHeading } from "@/components/ui/section-heading";
import { createClient } from "@/lib/supabase/server";
import { newsItems as fallback } from "@/data/news";
import { BeritaClient } from "@/components/berita/berita-client";

export const revalidate = 60;

export default async function NewsPage() {
  const supabase = await createClient();
  const { data } = await supabase.from("berita").select("*").order("published_at", { ascending: false });
  const rows = data && data.length > 0 ? data : fallback.map((r) => ({
    id: r.id, slug: r.slug, title: r.title, excerpt: r.excerpt, content: r.content, category: r.category as any, author: r.author, image_url: r.imageUrl, image_alt: r.imageAlt, published_at: new Date().toISOString(), created_at: new Date().toISOString(), updated_at: new Date().toISOString()
  } as any));
  const isFallback = !data || data.length === 0;

  return (
    <>
      <Navbar />
      <main className="flex-1" id="main-content">
        <section className="bg-slate-50 pt-24 pb-16 sm:pt-32 sm:pb-20">
          <div className="container-custom">
            <SectionHeading
              badge="Berita"
              title="Berita & Pengumuman"
              description="Informasi terkini dari STTD Al-Busyro."
            />
          </div>
        </section>

        <section className="section-spacing">
          <div className="container-custom">
            <BeritaClient items={rows as any} fallback={isFallback} />
          </div>
        </section>
        </main>
        <Footer />
    </>
  );
}
