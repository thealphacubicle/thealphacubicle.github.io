"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function RedirectHome() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/");
  }, [router]);

  return (
    <main className="mx-auto flex min-h-[40vh] w-full max-w-content items-center px-6 py-28">
      <p className="text-sm text-muted-foreground">Redirecting home…</p>
    </main>
  );
}
