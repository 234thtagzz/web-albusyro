import { school } from "@/data/school";
import Image from "next/image";
import { cn } from "@/lib/utils";

function Logo({ className }: { className?: string }) {
  return (
      <div
        className={cn(
          "relative flex h-9 w-9 items-center justify-center bg-transparent",
          className
        )}
      >
        <Image
          src="/images/logo_.png"
          alt={`Logo ${school.name}`}
          fill
          priority
          sizes="36px"
          className="object-cover"
        />
    </div>
  );
}
export { Logo };