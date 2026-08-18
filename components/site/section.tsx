import { cn } from "@/lib/utils";

type SectionProps = {
  id?: string;
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
};

export function Section({
  id,
  children,
  className,
  innerClassName,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn("w-full", id && "scroll-mt-20", className)}
    >
      <div
        className={cn(
          "mx-auto w-full max-w-content px-6 py-20 md:py-28",
          innerClassName,
        )}
      >
        {children}
      </div>
    </section>
  );
}
