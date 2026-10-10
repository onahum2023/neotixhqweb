import { NeotixMark } from "../NeotixMark";

export function Nav() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/60 border-b border-border">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 h-16 flex items-center justify-between">
        <a href="/#top" className="flex items-center gap-2.5 group">
          <NeotixMark size={26} />
          <span className="text-sm font-semibold tracking-tight">NeotixHQ</span>
        </a>
        <nav
          aria-label="Main navigation"
          className="hidden lg:flex items-center gap-9 text-sm text-muted-foreground"
        >
          <a href="/#vision" className="hover:text-foreground transition-colors">
            Vision
          </a>
          <a href="/#principles" className="hover:text-foreground transition-colors">
            Principles
          </a>
          <a href="/#explore" className="hover:text-foreground transition-colors">
            Explorations
          </a>
          <a href="/#engage" className="hover:text-foreground transition-colors">
            Engage
          </a>
          <a href="/#products" className="hover:text-foreground transition-colors">
            Meridian
          </a>
          <a href="/field-notes" className="hover:text-foreground transition-colors">
            Field Notes
          </a>
          <a href="/#company" className="hover:text-foreground transition-colors">
            Company
          </a>
        </nav>
        <details className="lg:hidden ml-auto mr-4">
          <summary className="cursor-pointer text-sm text-muted-foreground">Menu</summary>
          <nav
            aria-label="Mobile navigation"
            className="absolute inset-x-6 top-16 rounded-xl border border-border bg-background p-6 shadow-card grid gap-4 text-sm"
          >
            <a href="/#vision">Vision</a>
            <a href="/#principles">Principles</a>
            <a href="/#explore">Explorations</a>
            <a href="/#products">Meridian</a>
            <a href="/#engage">Engage</a>
            <a href="/field-notes">Field Notes</a>
            <a href="/#company">Company</a>
            <a href="/#contact">Contact</a>
          </nav>
        </details>
        <a
          href="/#contact"
          className="text-xs font-medium tracking-wide px-4 py-2 rounded-full border border-border hover:border-primary/60 hover:text-foreground transition-colors text-muted-foreground"
        >
          Contact
        </a>
      </div>
    </header>
  );
}
