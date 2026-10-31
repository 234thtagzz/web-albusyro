import { unstable_rethrow } from "next/navigation";
import { createClient } from "./server";
import type { News } from "@/data/news";

export async function getLatestNews(limit = 3): Promise<News[]> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("berita")
      .select("*")
      .order("published_at", { ascending: false })
      .limit(limit);

    if (error) {
      console.error("Error fetching news:", error);
      return [];
    }

    // Map database row to News interface
    return (data || []).map((row) => ({
      id: row.id,
      slug: row.slug,
      title: row.title,
      excerpt: row.excerpt ?? "",
      content: row.content,
      category: row.category,
      date: row.published_at,
      author: row.author ?? "",
      imageUrl: row.image_url ?? "/images/dummy/news-1.png",
      imageAlt: row.image_alt ?? row.title,
    }));
  } catch (error) {
    // Jangan gagalkan build/render hanya karena env Supabase belum siap.
    unstable_rethrow(error);
    console.error("Error fetching latest news:", error);
    return [];
  }
}
