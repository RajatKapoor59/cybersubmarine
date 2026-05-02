import { cn } from "@/lib/cn";

interface BadgeProps {
  children: React.ReactNode;
  color?: string;
  className?: string;
}

export function Badge({ children, color, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center text-[0.875rem] font-semibold uppercase tracking-wider",
        className
      )}
      style={color ? { color } : undefined}
    >
      {children}
    </span>
  );
}
