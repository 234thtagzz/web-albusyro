import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

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
        <Badge
          variant="outline"
          className={cn(
            "mb-4 gap-2.5 rounded-full border-primary-1/15 bg-primary-1/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-primary-1",
            align === "center" && "justify-center"
          )}
        >
          {badge}
        </Badge>
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
