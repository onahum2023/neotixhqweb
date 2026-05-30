export function Philosophy() {
  return (
    <section id="philosophy" className="relative py-28 lg:py-40 border-t border-border">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Philosophy
          </p>
          <h2 className="mt-5 text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05] text-balance">
            We do not build AI for novelty.
          </h2>
        </div>
        <div className="lg:col-span-5 lg:pt-20 space-y-6 text-lg text-muted-foreground leading-relaxed">
          <p>
            We build products around broken workflows, cognitive overload, and the gap between
            information and judgment.
          </p>
          <p>
            Most AI products try to answer faster. NeotixHQ products are designed to help people
            <span className="text-foreground"> notice better, decide better, and act with more context.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
