import { NeotixMark } from "../NeotixMark";
import { CoreMotif } from "./CoreMotif";

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.95v5.66H9.37V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.26 2.37 4.26 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden>
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56 0-.27-.01-1-.02-1.97-3.2.7-3.87-1.54-3.87-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.18-3.1-.12-.3-.51-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.24 2.76.12 3.06.74.81 1.18 1.84 1.18 3.1 0 4.43-2.7 5.4-5.27 5.69.41.36.77 1.06.77 2.14 0 1.55-.01 2.8-.01 3.18 0 .31.21.67.8.55A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function Column({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </p>
      <ul className="mt-5 space-y-3 text-sm text-muted-foreground">{children}</ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer
      className="relative overflow-hidden"
      style={{ backgroundColor: "var(--color-surface-deep)" }}
    >
      {/* top hairline gradient band */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, oklch(0.66 0.22 295 / 0.5), oklch(0.82 0.13 200 / 0.5), transparent)",
        }}
      />
      {/* watermark Core motif */}
      <div className="absolute left-1/2 -translate-x-1/2 top-8 w-[560px] h-[560px] pointer-events-none">
        <CoreMotif opacity={0.03} />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10 pt-16 pb-10 grid gap-12 lg:gap-16 md:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-5 lg:pr-10">
          <div className="flex items-center gap-2.5">
            <NeotixMark size={28} />
            <span className="text-sm font-semibold tracking-tight">NeotixHQ</span>
          </div>
          <p className="mt-5 text-sm text-foreground/85 leading-relaxed">
            An AI-native studio for the cognitive layer of work.
          </p>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-sm">
            We explore practical applications of AI and emerging technologies, develop ideas, and
            turn selected concepts into working products.
          </p>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-sm">
            NeotixHQ is a brand operated by{" "}
            <a href="https://www.nucielo.io/" className="hover:text-foreground transition-colors">
              NuCielo ICT B.V.
            </a>
            .
          </p>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-sm">
            <a
              href="https://meridian.neotixhq.com/"
              className="hover:text-foreground transition-colors"
            >
              Meridian
            </a>{" "}
            is a local-first AI History Explorer by NeotixHQ for importing, analyzing, searching,
            reading, and exporting ChatGPT, Claude, and Gemini conversation history.
          </p>
        </div>

        <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-10">
          <Column label="Explore">
            <li>
              <a href="/#vision" className="hover:text-foreground transition-colors">
                Vision
              </a>
            </li>
            <li>
              <a href="/#principles" className="hover:text-foreground transition-colors">
                Principles
              </a>
            </li>
            <li>
              <a href="/#explore" className="hover:text-foreground transition-colors">
                What We Explore
              </a>
            </li>
            <li>
              <a href="/#engage" className="hover:text-foreground transition-colors">
                How We Engage
              </a>
            </li>
          </Column>
          <Column label="Studio">
            <li>
              <a href="/#products" className="hover:text-foreground transition-colors">
                Meridian
              </a>
            </li>
            <li>
              <a href="/#company" className="hover:text-foreground transition-colors">
                Company
              </a>
            </li>
            <li>
              <a href="/field-notes" className="hover:text-foreground transition-colors">
                Field Notes
              </a>
            </li>
            <li>
              <a href="/#contact" className="hover:text-foreground transition-colors">
                Contact
              </a>
            </li>
          </Column>
          <Column label="Connect">
            <li>
              <a
                href="https://www.linkedin.com/company/neotixhq"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2.5 hover:text-foreground transition-colors"
              >
                <LinkedInIcon /> LinkedIn
              </a>
            </li>
            <li>
              <a
                href="https://github.com/neotixhq"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2.5 hover:text-foreground transition-colors"
              >
                <GitHubIcon /> GitHub
              </a>
            </li>
            <li>
              <a
                href="mailto:hello@neotixhq.com"
                className="inline-flex items-center gap-2.5 hover:text-foreground transition-colors"
              >
                <MailIcon /> Email
              </a>
            </li>
          </Column>
        </div>
      </div>

      <div className="relative border-t border-white/[0.06]">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-6 flex flex-col md:flex-row gap-2 justify-between text-xs text-muted-foreground">
          <p>© 2026 NeotixHQ. All rights reserved.</p>
          <p className="tracking-wide">Building the cognitive layer of work.</p>
        </div>
      </div>
    </footer>
  );
}
