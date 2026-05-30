import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/neotix/Nav";
import { Hero } from "@/components/neotix/Hero";
import { Vision } from "@/components/neotix/Vision";
import { Positioning } from "@/components/neotix/Positioning";
import { Products } from "@/components/neotix/Products";
import { Philosophy } from "@/components/neotix/Philosophy";
import { FieldNotes } from "@/components/neotix/FieldNotes";
import { ClosingCTA } from "@/components/neotix/ClosingCTA";
import { Footer } from "@/components/neotix/Footer";
import { CoreDivider } from "@/components/neotix/CoreDivider";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NeotixHQ — Cognitive systems for better decisions" },
      {
        name: "description",
        content:
          "NeotixHQ is an AI-native product studio building cognitive systems that turn fragmented information into structured context and better decisions.",
      },
      { property: "og:title", content: "NeotixHQ — Cognitive systems for better decisions" },
      {
        property: "og:description",
        content:
          "An AI-native product company building the missing cognitive layer for modern work.",
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
      <Vision />
      <CoreDivider />
      <Positioning />
      <CoreDivider />
      <Products />
      <CoreDivider />
      <Philosophy />
      <CoreDivider />
      <FieldNotes />
      <ClosingCTA />
      <Footer />
    </main>
  );
}
