import { ProductCard } from "./ProductCard";
import { MeridianVisual } from "./MeridianVisual";
import { AugmentVisual } from "./AugmentVisual";

export function Products() {
  return (
    <section id="products" className="relative py-28 lg:py-40 border-t border-border">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-2xl">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Products
          </p>
          <h2 className="mt-4 text-4xl md:text-5xl font-semibold tracking-tight text-balance">
            Products by NeotixHQ
          </h2>
          <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
            Each NeotixHQ product is built around a specific broken workflow where context,
            memory, and decision quality matter.
          </p>
        </div>

        <div className="mt-16 grid lg:grid-cols-2 gap-8">
          <ProductCard
            label="Meridian by NeotixHQ"
            name="Meridian"
            tagline="Temporal memory for modern work."
            description="Meridian is a temporal context and memory layer for people who think, decide, and create across conversations. It turns fragmented dialogue into structured memory, helping important patterns, decisions, and ideas resurface when they matter."
            ctaLabel="Explore Meridian"
            ctaHref="#contact"
            visual={<MeridianVisual />}
          />
          <ProductCard
            label="Augment-Labs by NeotixHQ"
            name="Augment-Labs"
            tagline="AI-assisted hiring for busy managers."
            description="Augment-Labs helps hiring managers turn job requirements, candidate profiles, and interview preparation into a faster, clearer, more structured hiring workflow."
            ctaLabel="Explore Augment-Labs"
            ctaHref="#contact"
            visual={<AugmentVisual />}
          />
        </div>
      </div>
    </section>
  );
}
