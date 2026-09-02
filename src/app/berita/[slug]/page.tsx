import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Reveal, Stagger } from "@/components/motion/reveal";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { newsItems as fallback } from "@/data/news";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { createClient as createServerClient } from "@/lib/supabase/server";
import { createClient as createAnonClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

function getAnonClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY)!;
  return createAnonClient<Database>(url, key);
}

export const revalidate = 60;

export async function generateStaticParams() {
  const supabase = getAnonClient();
  const { data } = await supabase.from("berita").select("slug");
  if (data && data.length > 0) return data.map((n) => ({ slug: n.slug }));
  return fallback.map((news) => ({ slug: news.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const supabase = getAnonClient();
  const { data } = await supabase.from("berita").select("title,excerpt").eq("slug", slug).single();
  if (data) return { title: data.title, description: data.excerpt ?? undefined };
  const news = fallback.find((n) => n.slug === slug);
  if (!news) return { title: "Berita Tidak Ditemukan" };
  return { title: news.title, description: news.excerpt };
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createServerClient();
  const { data: row } = await supabase.from("berita").select("*").eq("slug", slug).single();
  const news: any = row ?? fallback.find((n) => n.slug === slug);
  if (!news) notFound();

  const { data: relatedRows } = await supabase.from("berita").select("id,slug,title,published_at").neq("id", news.id).order("published_at", { ascending: false }).limit(3);
  const relatedNews: any[] = relatedRows && relatedRows.length > 0 ? relatedRows : fallback.filter((n) => n.id !== news.id).slice(0, 3);

  return (
    <>
      <Navbar />
      <main className="flex-1" id="main-content">
          <article className="section-spacing">
          <div className="container-custom">
            <Reveal>
            <div className="mx-auto max-w-3xl">
              <Button
                nativeButton={false}
                variant="ghost"
                render={<Link href="/berita" />}
                className="mb-8 text-slate-600 hover:text-primary"
              >
                <ArrowLeft className="h-4 w-4" />
                Kembali ke Berita
              </Button>

              <div className="flex items-center gap-3 text-sm text-slate-600">
                <Badge variant="secondary" className="bg-primary/15 text-primary">
                  {news.category}
                </Badge>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {news.published_at ? new Date(news.published_at).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) : news.date}
                </span>
                {news.author && (
                  <span className="flex items-center gap-1">
                    <User className="h-3.5 w-3.5" />
                    {news.author}
                  </span>
                )}
              </div>

              <h1 className="mt-4 font-display text-[clamp(1.5rem,3.5vw,2.5rem)] leading-[1.06] tracking-tight text-slate-900">
                {news.title}
              </h1>

              {(news.image_url || news.imageUrl) && (
                <div className="relative mt-6 aspect-video overflow-hidden rounded-[24px] bg-white">
                  <Image
                    src={news.image_url ?? news.imageUrl}
                    alt={news.image_alt ?? news.imageAlt ?? news.title}
                    width={1200}
                    height={675}
                    sizes="(max-width: 768px) 100vw, 768px"
                    className="h-auto w-full object-cover"
                  />
                </div>
              )}

              <div className="mt-8 text-[15px] leading-relaxed text-slate-600">
                <p>{news.content}</p>
              </div>
            </div>
            </Reveal>

            {relatedNews.length > 0 && (
              <div className="mx-auto mt-16 max-w-3xl">
                <Reveal>
                <h2 className="mb-6 font-display text-xl tracking-tight text-slate-900">
                  Berita Terkait
                </h2>
                </Reveal>
                <Stagger className="grid gap-4 sm:grid-cols-3">
                  {relatedNews.map((item: any) => (
                    <Link
                      key={item.id}
                      href={`/berita/${item.slug}`}
                    >
                      <Card className="rounded-[16px] border-slate-200 bg-white shadow-sm ring-0 transition-all hover:border-slate-300">
                        <CardContent className="p-4">
                          <span className="text-xs text-slate-600">{item.published_at ? new Date(item.published_at).toLocaleDateString("id-ID") : item.date}</span>
                          <h3 className="mt-1 font-display text-sm tracking-tight text-slate-900 line-clamp-2">
                            {item.title}
                          </h3>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </Stagger>
              </div>
            )}
          </div>
        </article>
        </main>
        <Footer />
    </>
  );
}
