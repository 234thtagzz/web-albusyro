import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { newsItems } from "@/data/news";
import { ArrowLeft, Calendar, User } from "lucide-react";

export function generateStaticParams() {
  return newsItems.map((news) => ({ slug: news.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const news = newsItems.find((n) => n.slug === slug);
  if (!news) return { title: "Berita Tidak Ditemukan" };
  return { title: news.title, description: news.excerpt };
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const news = newsItems.find((n) => n.slug === slug);
  if (!news) notFound();

  const relatedNews = newsItems.filter((n) => n.id !== news.id).slice(0, 3);

  return (
    <>
      <Navbar />
      <main className="flex-1" id="main-content">
        <article className="section-spacing">
          <div className="container-custom">
            <div className="mx-auto max-w-3xl">
              <Link
                href="/berita"
                className="mb-8 inline-flex items-center gap-2 text-sm text-slate-600 transition-colors hover:text-primary"
              >
                <ArrowLeft className="h-4 w-4" />
                Kembali ke Berita
              </Link>

              <div className="flex items-center gap-3 text-sm text-slate-600">
                <span className="rounded-full bg-primary/15 px-3 py-1 font-medium text-primary">
                  {news.category}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {news.date}
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

              {news.imageUrl && (
                <div className="mt-6 aspect-video overflow-hidden rounded-[24px] bg-white">
                  <Image
                    src={news.imageUrl}
                    alt={news.imageAlt}
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

            {relatedNews.length > 0 && (
              <div className="mx-auto mt-16 max-w-3xl">
                <h2 className="mb-6 font-display text-xl tracking-tight text-slate-900">
                  Berita Terkait
                </h2>
                <div className="grid gap-4 sm:grid-cols-3">
                  {relatedNews.map((item) => (
                    <Link
                      key={item.id}
                      href={`/berita/${item.slug}`}
                      className="rounded-[16px] border border-slate-200 bg-white shadow-sm p-4 transition-all hover:border-slate-300"
                    >
                      <span className="text-xs text-slate-600">{item.date}</span>
                      <h3 className="mt-1 font-display text-sm tracking-tight text-slate-900 line-clamp-2">
                        {item.title}
                      </h3>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
