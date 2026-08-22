import {
  BookOpen,
  Heart,
  GraduationCap,
  Users,
  Shield,
  HandHeart,
} from "lucide-react";

export const iconMap = {
  BookOpen,
  Heart,
  GraduationCap,
  Users,
  Shield,
  HandHeart,
} as const;

export type IconName = keyof typeof iconMap;
