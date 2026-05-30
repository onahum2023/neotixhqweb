import { CoreMotif } from "./CoreMotif";

export function Philosophy() {
  return (
    <section id="company" className="relative py-24 lg:py-36 overflow-hidden">
      <div className="absolute -left-32 top-1/2 -translate-y-1/2 w-[720px] h-[720px] pointer-events-none hidden md:block">
        <CoreMotif opacity={0.035} rotate={-12} />
      </div>
      <div className="absolute inset-0 bg-atmos-cyan opacity-40 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-6">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Company
          </p>
          <h2 className="mt-5 text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05] text-balance">
            A product company for the cognitive layer of work.
          </h2>
        </div>
        <div className="lg:col-span-6 lg:pt-20 space-y-6 text-lg text-muted-foreground leading-relaxed">
          <p>
            NeotixHQ sits at the intersection of AI, product engineering, workflow intelligence,
            and human-centered systems design.
          </p>
          <p>
            We are focused on a simple pattern: people do not need more information. They need
            systems that help them
            <span className="text-foreground"> recognize what matters, preserve what matters, and act when it matters.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
