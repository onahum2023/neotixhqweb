import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/neotix/Nav";
import { Footer } from "@/components/neotix/Footer";
import { FieldNotes } from "@/components/neotix/FieldNotes";

export const Route = createFileRoute("/field-notes")({
  head: () => ({
    meta: [
      { title: "Field Notes — NeotixHQ" },
      {
        name: "description",
        content:
          "Notes from the edge of AI, memory, workflows, and the cognitive layer of work.",
      },
      { property: "og:title", content: "Field Notes — NeotixHQ" },
      {
        property: "og:description",
        content:
          "Essays and short notes on AI, memory, workflows, and cognitive systems.",
      },
      { property: "og:url", content: "/field-notes" },
    ],
    links: [{ rel: "canonical", href: "/field-notes" }],
  }),
  component: FieldNotesPage,
});

function FieldNotesPage() {
  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <Nav />
      <div className="pt-16">
        <FieldNotes />
      </div>
      <Footer />
    </main>
  );
}
