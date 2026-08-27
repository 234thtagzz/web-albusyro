import { ImageIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: ReactNode;
}

export function EmptyState({ title, description, icon }: EmptyStateProps) {
  return (
    <Card className="mx-auto max-w-md">
      <CardContent className="flex flex-col items-center text-center">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
          {icon ?? <ImageIcon className="h-7 w-7" />}
        </div>
        <p className="text-[15px] font-medium text-slate-800">{title}</p>
        {description && (
          <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
