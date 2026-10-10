import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/neotix/Nav";
import { Hero } from "@/components/neotix/Hero";
import { Vision } from "@/components/neotix/Vision";
import { Positioning } from "@/components/neotix/Positioning";
import { WhatWeExplore } from "@/components/neotix/WhatWeExplore";
import { HowWeEngage } from "@/components/neotix/HowWeEngage";

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
          "NeotixHQ is an AI-native studio and a brand operated by NuCielo ICT B.V. Meridian is its local-first AI History Explorer for ChatGPT, Claude, and Gemini conversation history.",
      },
      { property: "og:title", content: "NeotixHQ — An AI-native studio for the cognitive layer of work" },
      {
        property: "og:description",
        content:
          "NeotixHQ is an AI-native studio and a brand operated by NuCielo ICT B.V. Meridian is its local-first AI History Explorer for ChatGPT, Claude, and Gemini conversation history.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://neotixhq.com/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "NeotixHQ — An AI-native studio for the cognitive layer of work" },
      {
        name: "twitter:description",
        content:
          "NeotixHQ is an AI-native studio and a brand operated by NuCielo ICT B.V. Meridian is its local-first AI History Explorer for ChatGPT, Claude, and Gemini conversation history.",
      },
    ],
    links: [{ rel: "canonical", href: "https://neotixhq.com/" }],
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
      <Philosophy />
      <ClosingCTA />
      <Footer />
    </main>
  );
}
