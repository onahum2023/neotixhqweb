import { createFileRoute, Outlet, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/studio")({
  head: () => ({
    meta: [
      { title: "Studio — NeotixHQ" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: StudioLayout,
});

function StudioLayout() {
  const { isAuthenticated, isAdmin, isLoading, user, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) return;
    if (!isAuthenticated) navigate({ to: "/login" });
  }, [isLoading, isAuthenticated, navigate]);

  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center text-sm text-muted-foreground">
        Loading…
      </main>
    );
  }

  if (!isAuthenticated) return null;

  if (!isAdmin) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background px-6">
        <div className="max-w-md text-center">
          <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Studio</p>
          <h1 className="mt-4 text-2xl font-semibold tracking-tight">Not authorized</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Your account is signed in as <span className="text-foreground">{user?.email}</span> but
            does not have admin access. Ask a NeotixHQ admin to grant your account access.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Button variant="outline" onClick={() => signOut()}>Sign out</Button>
            <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
              Back to site →
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto max-w-5xl px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground">
              NeotixHQ
            </Link>
            <span className="text-muted-foreground">/</span>
            <Link to="/studio" className="text-sm font-medium">Studio</Link>
            <nav className="hidden sm:flex items-center gap-4 ml-4 text-sm">
              <Link
                to="/studio"
                activeOptions={{ exact: true }}
                className="text-muted-foreground hover:text-foreground"
                activeProps={{ className: "text-foreground" }}
              >
                Field Notes
              </Link>
              <Link
                to="/studio/inbox"
                className="text-muted-foreground hover:text-foreground"
                activeProps={{ className: "text-foreground" }}
              >
                Inbox
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline text-xs text-muted-foreground">{user?.email}</span>
            <Button size="sm" variant="ghost" onClick={() => signOut()}>Sign out</Button>
          </div>
        </div>
      </header>
      <div className="mx-auto max-w-5xl px-6 py-10">
        <Outlet />
      </div>
    </main>
  );
}
