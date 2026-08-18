import type { Metadata } from "next";

import { RedirectHome } from "@/components/site/redirect-home";

export const metadata: Metadata = {
  title: "About",
  robots: { index: false, follow: true },
};

export default function AboutPage() {
  return <RedirectHome />;
}
