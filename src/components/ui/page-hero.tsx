import { Badge } from "@/components/ui/badge";

function Blob({ className, delay = "" }: { className: string; delay?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute rounded-full blur-3xl opacity-40 ${className} ${delay ? delay : "animate-blob"}`}
    />
  );
}

interface PageHeroProps {
  badge: string;
  title: string;
  description: string;
  meta?: string; // small line under description, e.g. "Kontak: ..." 
}

export function PageHero({ badge, title, description, meta }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-primary-1">
      {/* gradient overlay seperti Hero */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-1 via-primary-2 to-secondary-1/40" />
      <div className="absolute inset-0 bg-[#0f172a]/10" />

      <Blob className="h-[420px] w-[520px] -top-28 -left-24 bg-primary-4/30" />
      <Blob className="h-[360px] w-[460px] -bottom-24 -right-20 bg-secondary-3/30 animate-blob-delay" />
      <Blob className="h-[220px] w-[220px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/10 blur-2xl opacity-20 animate-float" />

      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: "22px 22px",
        }}
      />
      {/* repeating linear seperti Identity header */}
      <div className="absolute inset-0 opacity-[0.06]">
        <div className="h-full w-full bg-[repeating-linear-gradient(135deg,transparent_0_12px,white_12px_13px)]" />
      </div>

      <div className="container-custom relative flex min-h-[380px] flex-col justify-center pb-20 pt-28 sm:min-h-[420px] sm:pb-24">
        <Badge
          variant="outline"
          className="inline-flex w-fit items-center gap-2 rounded-full border-white/20 bg-white/15 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur"
        >
          {badge}
        </Badge>
        <h1 className="mt-3 max-w-3xl font-display text-[30px] font-bold leading-[0.95] tracking-tight text-white sm:text-[40px] lg:text-[46px]">
          {title}
        </h1>
        <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-white/80 sm:text-[15px]">
          {description}
        </p>
        {meta && <p className="mt-2 text-xs font-medium text-white/60">{meta}</p>}
      </div>

      {/* wave seperti Hero */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 leading-none">
        <svg viewBox="0 0 1440 64" preserveAspectRatio="none" className="h-[48px] w-full sm:h-[64px]">
          <path d="M0 32 Q 180 64 360 32 T 720 32 T 1080 32 T 1440 32 L 1440 64 L 0 64 Z" className="fill-white" />
          <path d="M0 36 Q 180 60 360 36 T 720 36 T 1080 36 T 1440 36" className="fill-secondary-3/20" />
        </svg>
      </div>
    </section>
  );
}
