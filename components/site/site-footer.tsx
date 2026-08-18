import { CommandHintButton } from "@/components/site/command-hint-button";
import { copyrightLine } from "@/content/profile";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-background">
      <div className="mx-auto flex w-full max-w-content items-center justify-between px-6 py-6">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground">
          {copyrightLine(year)}
        </p>
        <CommandHintButton />
      </div>
    </footer>
  );
}
