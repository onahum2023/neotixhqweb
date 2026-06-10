import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: "Reset password — NeotixHQ" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [hasSession, setHasSession] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setHasSession(!!session);
      setCheckingSession(false);
    });
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      toast.success("Password updated");
      navigate({ to: "/studio" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Password update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-6 py-16">
      <div className="w-full max-w-sm">
        <div className="mb-8">
          <Link to="/" className="text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground">
            ← NeotixHQ
          </Link>
          <h1 className="mt-4 text-2xl font-semibold tracking-tight">Set a new password</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Choose a new password for the NeotixHQ Studio admin account.
          </p>
        </div>

        {checkingSession ? (
          <p className="text-sm text-muted-foreground">Checking reset link…</p>
        ) : hasSession ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="password">New password</Label>
              <Input
                id="password"
                type="password"
                autoComplete="new-password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="confirm-password">Confirm password</Label>
              <Input
                id="confirm-password"
                type="password"
                autoComplete="new-password"
                required
                minLength={8}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1"
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              Update password
            </Button>
          </form>
        ) : (
          <div className="space-y-4 text-sm text-muted-foreground">
            <p>This reset link is invalid or has expired. Request a new recovery email and open the latest link.</p>
            <Link to="/" className="inline-flex text-foreground hover:text-muted-foreground">
              Back to site →
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}