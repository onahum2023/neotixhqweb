import { Nav } from "../components/neotix/Nav";
import { Footer } from "../components/neotix/Footer";

export function FieldNotes() {
  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <Nav />
      <section className="pt-32 pb-20">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <header className="border-b border-border pb-10">
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Journal
            </p>
            <h1 className="mt-4 text-4xl md:text-5xl font-semibold tracking-tight">Field Notes</h1>
            <p className="mt-5 text-base text-muted-foreground leading-relaxed max-w-2xl">
              Essays, short notes, and links from the edge of AI, memory, workflows, and the
              cognitive layer of work.
            </p>
          </header>
          <p className="py-16 text-sm text-muted-foreground">
            No notes published yet. Check back soon.
          </p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
