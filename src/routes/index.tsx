import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/neotix/Nav";
import { Hero } from "@/components/neotix/Hero";
import { Vision } from "@/components/neotix/Vision";
import { Positioning } from "@/components/neotix/Positioning";
import { WhatWeExplore } from "@/components/neotix/WhatWeExplore";
import { HowWeEngage } from "@/components/neotix/HowWeEngage";
import { FieldNotes } from "@/components/neotix/FieldNotes";
import { Philosophy } from "@/components/neotix/Philosophy";
import { ClosingCTA } from "@/components/neotix/ClosingCTA";
import { Footer } from "@/components/neotix/Footer";
import { BeamDivider } from "@/components/neotix/dividers/BeamDivider";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NeotixHQ — An AI-native studio for the cognitive layer of work" },
      {
        name: "description",
        content:
          "NeotixHQ is an AI-native studio exploring context engineering, AI memory, human-AI collaboration, decision intelligence, and workflow intelligence.",
      },
      { property: "og:title", content: "NeotixHQ — An AI-native studio for the cognitive layer of work" },
      {
        property: "og:description",
        content:
          "An AI-native studio exploring context, memory, and judgment at the intersection of research, advisory, and product.",
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
      <BeamDivider />
      <Positioning />
      <BeamDivider />
      <WhatWeExplore />
      <BeamDivider />
      <HowWeEngage />
      <BeamDivider />
      <FieldNotes />
      <BeamDivider />
      <Philosophy />
      <ClosingCTA />
      <Footer />
    </main>
  );
}
