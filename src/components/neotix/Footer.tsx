import { NeotixMark } from "../NeotixMark";

export function Footer() {
  return (
    <footer className="border-t border-border py-14">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
        <div className="flex items-start gap-3">
          <NeotixMark size={32} />
          <div>
            <p className="text-sm font-semibold tracking-tight">NeotixHQ</p>
            <p className="text-sm text-muted-foreground">
              Cognitive systems for better decisions.
            </p>
          </div>
        </div>
        <nav className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted-foreground">
          <a href="#vision" className="hover:text-foreground transition-colors">Vision</a>
          <a href="#principles" className="hover:text-foreground transition-colors">Principles</a>
          <a href="#systems" className="hover:text-foreground transition-colors">Systems</a>
          <a href="#contact" className="hover:text-foreground transition-colors">Contact</a>
        </nav>
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-10 mt-10 pt-6 border-t border-border flex flex-col md:flex-row gap-2 justify-between text-xs text-muted-foreground">
        <p>© {new Date().getFullYear()} NeotixHQ. All rights reserved.</p>
        <p className="tracking-wide">Fragmented signals → structured context → better decisions.</p>
      </div>
    </footer>
  );
}
