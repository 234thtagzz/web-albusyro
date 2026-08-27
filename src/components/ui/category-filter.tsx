"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface CategoryFilterProps {
  categories: readonly string[];
  active: string;
  onChange: (category: string) => void;
}

export function CategoryFilter({
  categories,
  active,
  onChange,
}: CategoryFilterProps) {
  return (
    <ToggleGroup
      value={[active]}
      onValueChange={(values) => {
        if (values.length > 0) onChange(values[0]);
      }}
      variant="outline"
      spacing={4}
      aria-label="Filter kategori"
    >
      {categories.map((category) => (
        <ToggleGroupItem
          key={category}
          value={category}
          className="rounded-full"
        >
          {category}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
