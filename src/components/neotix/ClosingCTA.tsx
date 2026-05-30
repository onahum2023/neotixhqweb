import { useState, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { NeotixMark } from "../NeotixMark";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { submitContactMessage } from "@/lib/contact.functions";

export function ClosingCTA() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const submit = useServerFn(submitContactMessage);
  const mutation = useMutation({
    mutationFn: () => submit({ data: { name, email, message } }),
    onSuccess: () => {
      toast.success("Message sent. We'll be in touch.");
      setName("");
      setEmail("");
      setMessage("");
      setOpen(false);
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Couldn't send message"),
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutation.mutate();
  };

  return (
    <section id="contact" className="relative py-28 lg:py-40 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "var(--gradient-radial)" }}
      />
      <div className="absolute inset-0 bg-atmos-violet pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 50% at 50% 50%, oklch(0.66 0.22 295 / 0.18), transparent 70%)",
        }}
      />
      <div className="absolute inset-0 bg-grid-soft mask-fade-edges opacity-40 pointer-events-none" />
      <div className="relative mx-auto max-w-4xl px-6 lg:px-10 text-center">
        <div className="flex justify-center mb-10">
          <NeotixMark size={56} glow />
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05] text-balance">
          The next wave of AI will not be defined by more answers.
        </h2>
        <p className="mt-8 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          It will be defined by systems that preserve continuity, understand context, and help
          people act with better judgment.
        </p>
        <div className="mt-12">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <button className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-medium bg-primary text-primary-foreground hover:opacity-90 transition-opacity shadow-[0_0_50px_-10px_rgba(139,92,246,0.7)]">
                Start a conversation
                <span aria-hidden>→</span>
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Start a conversation</DialogTitle>
                <DialogDescription>
                  Tell us a bit about you and what you're working on. We read every message.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 mt-2 text-left">
                <div>
                  <Label htmlFor="contact-name">Name</Label>
                  <Input
                    id="contact-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    maxLength={100}
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="contact-email">Email</Label>
                  <Input
                    id="contact-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    maxLength={255}
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="contact-message">Message</Label>
                  <Textarea
                    id="contact-message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    maxLength={2000}
                    rows={5}
                    className="mt-1.5"
                  />
                </div>
                <Button type="submit" disabled={mutation.isPending} className="w-full">
                  {mutation.isPending ? "Sending…" : "Send message"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
}
