import { useEffect, useState } from "react";
import { createFileRoute, useSearch } from "@tanstack/react-router";
import { z } from "zod";

export const Route = createFileRoute("/unsubscribe")({
  validateSearch: z.object({ token: z.string().optional() }),
  component: UnsubscribePage,
});

type State =
  | { kind: "loading" }
  | { kind: "valid" }
  | { kind: "already" }
  | { kind: "invalid" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "error"; message: string };

function UnsubscribePage() {
  const { token } = useSearch({ from: "/unsubscribe" });
  const [state, setState] = useState<State>({ kind: "loading" });

  useEffect(() => {
    if (!token) {
      setState({ kind: "invalid" });
      return;
    }
    (async () => {
      try {
        const res = await fetch(`/email/unsubscribe?token=${encodeURIComponent(token)}`);
        const data = (await res.json()) as { valid?: boolean; reason?: string; error?: string };
        if (!res.ok) {
          setState({ kind: "invalid" });
          return;
        }
        if (data.valid === false && data.reason === "already_unsubscribed") {
          setState({ kind: "already" });
          return;
        }
        if (data.valid) {
          setState({ kind: "valid" });
          return;
        }
        setState({ kind: "invalid" });
      } catch {
        setState({ kind: "error", message: "Couldn't reach the server. Try again." });
      }
    })();
  }, [token]);

  const confirm = async () => {
    if (!token) return;
    setState({ kind: "submitting" });
    try {
      const res = await fetch("/email/unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const data = (await res.json()) as { success?: boolean; reason?: string; error?: string };
      if (data.success) setState({ kind: "success" });
      else if (data.reason === "already_unsubscribed") setState({ kind: "already" });
      else setState({ kind: "error", message: data.error || "Couldn't unsubscribe." });
    } catch {
      setState({ kind: "error", message: "Couldn't reach the server." });
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-6 py-20">
      <div className="max-w-md w-full text-center">
        <div className="text-xs tracking-[0.18em] uppercase text-primary mb-4 font-semibold">
          Neotix
        </div>
        {state.kind === "loading" && (
          <p className="text-muted-foreground">Checking your link…</p>
        )}
        {state.kind === "invalid" && (
          <>
            <h1 className="text-2xl font-semibold">Link not valid</h1>
            <p className="mt-3 text-muted-foreground">
              This unsubscribe link is invalid or has expired.
            </p>
          </>
        )}
        {state.kind === "already" && (
          <>
            <h1 className="text-2xl font-semibold">Already unsubscribed</h1>
            <p className="mt-3 text-muted-foreground">
              You won&rsquo;t receive further emails from us.
            </p>
          </>
        )}
        {state.kind === "valid" && (
          <>
            <h1 className="text-2xl font-semibold">Unsubscribe from Neotix emails?</h1>
            <p className="mt-3 text-muted-foreground">
              You can resubscribe at any time by contacting us.
            </p>
            <button
              onClick={confirm}
              className="mt-8 inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-medium hover:opacity-90 transition"
            >
              Confirm unsubscribe
            </button>
          </>
        )}
        {state.kind === "submitting" && (
          <p className="text-muted-foreground">Processing…</p>
        )}
        {state.kind === "success" && (
          <>
            <h1 className="text-2xl font-semibold">You&rsquo;re unsubscribed</h1>
            <p className="mt-3 text-muted-foreground">
              We&rsquo;ve removed you from our email list.
            </p>
          </>
        )}
        {state.kind === "error" && (
          <>
            <h1 className="text-2xl font-semibold">Something went wrong</h1>
            <p className="mt-3 text-muted-foreground">{state.message}</p>
          </>
        )}
      </div>
    </main>
  );
}
