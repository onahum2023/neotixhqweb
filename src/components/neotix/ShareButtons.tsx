import { useState } from "react";
import { Linkedin, Twitter, Link2, Mail, Check } from "lucide-react";
import { toast } from "sonner";

export function ShareButtons({
  title,
  path,
  externalUrl,
}: {
  title: string;
  path: string;
  externalUrl?: string | null;
}) {
  const [copied, setCopied] = useState(false);

  const origin =
    typeof window !== "undefined" ? window.location.origin : "https://neotixhq.com";
  // For externally hosted posts, prefer sharing the original URL.
  const shareUrl = externalUrl || `${origin}${path}`;
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);

  const linkedin = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
  const twitter = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
  const email = `mailto:?subject=${encodedTitle}&body=${encodedUrl}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success("Link copied");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Could not copy");
    }
  };

  const base =
    "inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-primary/60 transition-colors";

  return (
    <div className="flex flex-wrap items-center gap-2">
      <a href={linkedin} target="_blank" rel="noopener noreferrer" className={base} aria-label="Share on LinkedIn">
        <Linkedin className="h-3.5 w-3.5" /> LinkedIn
      </a>
      <a href={twitter} target="_blank" rel="noopener noreferrer" className={base} aria-label="Share on X">
        <Twitter className="h-3.5 w-3.5" /> X
      </a>
      <a href={email} className={base} aria-label="Share via email">
        <Mail className="h-3.5 w-3.5" /> Email
      </a>
      <button type="button" onClick={copy} className={base} aria-label="Copy link">
        {copied ? <Check className="h-3.5 w-3.5" /> : <Link2 className="h-3.5 w-3.5" />}
        {copied ? "Copied" : "Copy link"}
      </button>
    </div>
  );
}
