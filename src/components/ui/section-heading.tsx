import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  description?: string;
  badge?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  title,
  description,
  badge,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {badge && (
        <span
          className={cn(
            "mb-4 flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700",
            align === "center" && "justify-center"
          )}
        >
          <span className="h-px w-8 bg-amber-500" aria-hidden="true" />
          {badge}
          {align === "center" && (
            <span className="h-px w-8 bg-amber-500" aria-hidden="true" />
          )}
        </span>
      )}
      <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.625rem)] leading-[1.08] text-slate-900">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-[15px] leading-relaxed text-slate-600 sm:text-base">
          {description}
        </p>
      )}
    </div>
  );
}
