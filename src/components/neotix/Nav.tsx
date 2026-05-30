import { NeotixMark } from "../NeotixMark";

export function Nav() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/60 border-b border-border">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5 group">
          <NeotixMark size={26} />
          <span className="text-sm font-semibold tracking-tight">NeotixHQ</span>
        </a>
        <nav className="hidden md:flex items-center gap-9 text-sm text-muted-foreground">
          <a href="#products" className="hover:text-foreground transition-colors">Products</a>
          <a href="#philosophy" className="hover:text-foreground transition-colors">Philosophy</a>
          <a href="#positioning" className="hover:text-foreground transition-colors">Approach</a>
          <a href="#contact" className="hover:text-foreground transition-colors">Contact</a>
        </nav>
        <a
          href="#contact"
          className="text-xs font-medium tracking-wide px-4 py-2 rounded-full border border-border hover:border-primary/60 hover:text-foreground transition-colors text-muted-foreground"
        >
          Contact
        </a>
      </div>
    </header>
  );
}
