import type { Metadata } from "next";

import { RedirectHome } from "@/components/site/redirect-home";

export const metadata: Metadata = {
  title: "Consulting",
  robots: { index: false, follow: true },
};

export default function ConsultingPage() {
  return <RedirectHome />;
}
