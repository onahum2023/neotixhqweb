import { Home } from "./pages/Home";
import { FieldNotes } from "./pages/FieldNotes";
import { Nav } from "./components/neotix/Nav";
import { Footer } from "./components/neotix/Footer";

function normalizePath(path: string) {
  return path.replace(/\/$/, "") || "/";
}

export function App({ path }: { path: string }) {
  const route = normalizePath(path);
  if (route === "/") return <Home />;
  if (route === "/field-notes") return <FieldNotes />;
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Nav />
      <section className="mx-auto max-w-3xl px-6 py-40">
        <p className="text-sm text-muted-foreground">404</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight">Page not found</h1>
        <p className="mt-5 text-muted-foreground">This page does not exist or has moved.</p>
        <a href="/" className="mt-8 inline-block text-accent underline underline-offset-4">
          Go home
        </a>
      </section>
      <Footer />
    </main>
  );
}
