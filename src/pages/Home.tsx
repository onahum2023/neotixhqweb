import { Nav } from "@/components/neotix/Nav";
import { Hero } from "@/components/neotix/Hero";
import { Products } from "@/components/neotix/Products";
import { Vision } from "@/components/neotix/Vision";
import { Positioning } from "@/components/neotix/Positioning";
import { WhatWeExplore } from "@/components/neotix/WhatWeExplore";
import { HowWeEngage } from "@/components/neotix/HowWeEngage";

import { Philosophy } from "@/components/neotix/Philosophy";
import { ClosingCTA } from "@/components/neotix/ClosingCTA";
import { Footer } from "@/components/neotix/Footer";
import { BeamDivider } from "@/components/neotix/dividers/BeamDivider";

export function Home() {
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
      <Products />
      <BeamDivider />
      <HowWeEngage />
      <BeamDivider />
      <Philosophy />
      <ClosingCTA />
      <Footer />
    </main>
  );
}
