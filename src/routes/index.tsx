import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/neotix/Nav";
import { Hero } from "@/components/neotix/Hero";
import { Products } from "@/components/neotix/Products";
import { Philosophy } from "@/components/neotix/Philosophy";
import { Positioning } from "@/components/neotix/Positioning";
import { ClosingCTA } from "@/components/neotix/ClosingCTA";
import { Footer } from "@/components/neotix/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NeotixHQ — Cognitive systems for better decisions" },
      {
        name: "description",
        content:
          "NeotixHQ designs AI-native products — Meridian and Augment-Labs — that turn fragmented signals into structured context and sharper decisions.",
      },
      { property: "og:title", content: "NeotixHQ — Cognitive systems for better decisions" },
      {
        property: "og:description",
        content:
          "A product company building AI-native cognitive systems for the next layer of work.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <Products />
      <Philosophy />
      <Positioning />
      <ClosingCTA />
      <Footer />
    </main>
  );
}
