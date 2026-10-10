import { CoreMotif } from "./CoreMotif";
import { SectionGraphics } from "./SectionGraphics";

export function Philosophy() {
  return (
    <section id="company" className="relative py-14 lg:py-20 overflow-hidden">
      <SectionGraphics diagonal="tl-br" gridOpacity={0.3} />
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
            An AI-native studio for the cognitive layer of work.
          </h2>
        </div>
        <div className="lg:col-span-6 lg:pt-20 space-y-6 text-lg text-muted-foreground leading-relaxed">
          <p>
            NeotixHQ is a brand operated by{" "}
            <a
              href="https://www.nucielo.io/"
              className="text-foreground underline underline-offset-4 hover:text-accent"
            >
              NuCielo ICT B.V.
            </a>
            , a Netherlands-registered company.
          </p>
          <p>
            We explore, design, and build at the intersection of AI, technology, and business. Our
            work spans research, product creation, and collaboration in real-world environments.
          </p>
          <p>
            <a
              href="https://meridian.neotixhq.com/"
              className="text-foreground underline underline-offset-4 hover:text-accent"
            >
              Meridian
            </a>{" "}
            is our active product: a local-first AI History Explorer by NeotixHQ.
          </p>
        </div>
      </div>
    </section>
  );
}
