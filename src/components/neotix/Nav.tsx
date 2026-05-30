import { Link } from "@tanstack/react-router";
import { NeotixMark } from "../NeotixMark";

export function Nav() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/60 border-b border-border">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 h-16 flex items-center justify-between">
        <Link to="/" hash="top" className="flex items-center gap-2.5 group">
          <NeotixMark size={26} />
          <span className="text-sm font-semibold tracking-tight">NeotixHQ</span>
        </Link>
        <nav className="hidden md:flex items-center gap-9 text-sm text-muted-foreground">
          <Link to="/" hash="vision" className="hover:text-foreground transition-colors">Vision</Link>
          <Link to="/" hash="principles" className="hover:text-foreground transition-colors">Principles</Link>
          <Link to="/" hash="studio" className="hover:text-foreground transition-colors">Early Systems</Link>
          <Link to="/field-notes" className="hover:text-foreground transition-colors">Field Notes</Link>
          <Link to="/" hash="company" className="hover:text-foreground transition-colors">Company</Link>
        </nav>
        <Link
          to="/"
          hash="contact"
          className="text-xs font-medium tracking-wide px-4 py-2 rounded-full border border-border hover:border-primary/60 hover:text-foreground transition-colors text-muted-foreground"
        >
          Contact
        </Link>
      </div>
    </header>
  );
}
