import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/layout/logo";
import Link from "next/link";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string }>;
}) {
  const params = await searchParams;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDF9F3] px-4 py-12">
      <Card className="w-full max-w-md rounded-[24px] border-stone-200 bg-white shadow-xl">
        <CardContent className="p-8">
          <Link href="/" className="flex items-center gap-3 justify-center">
            <Logo />
            <span className="font-display text-lg font-bold text-primary-1">STTD Al-Busyro</span>
          </Link>
          <h1 className="mt-6 text-center font-display text-2xl font-bold text-stone-900">Login Admin</h1>
          <p className="mt-1 text-center text-sm text-stone-500">Masuk untuk mengelola berita, prestasi, galeri, dan PPDB</p>

          {params.error && (
            <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-700">{params.error}</div>
          )}

          <form action={loginAction} className="mt-6 space-y-4">
            {params.next && <input type="hidden" name="next" value={params.next} />}
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="admin@albusyro.sch.id" required />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" required />
            </div>
            <Button type="submit" className="w-full rounded-full bg-primary-1 text-white hover:bg-primary-2 h-10">
              Masuk
            </Button>
          </form>

          <p className="mt-4 text-center text-xs text-stone-400">
            Buat user via Supabase Dashboard &gt; Authentication &gt; Add user
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

async function loginAction(formData: FormData) {
  "use server";
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/admin");

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    redirect(`/login?error=${encodeURIComponent(error.message)}`);
  }
  redirect(next);
}
