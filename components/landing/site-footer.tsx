import { navLinks } from './data'

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-foreground text-primary-foreground">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          <div className="flex flex-col gap-4">
            <span className="font-heading text-2xl">Thorne Aesthetics</span>
            <p className="max-w-xs text-pretty text-sm leading-relaxed text-primary-foreground/70">
              A private medical aesthetics practice dedicated to natural,
              anatomy-led results.
            </p>
          </div>

          <nav className="flex flex-col gap-3" aria-label="Footer">
            <span className="text-sm uppercase tracking-[0.15em] text-primary-foreground/50">
              Explore
            </span>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-primary-foreground/80 transition-colors hover:text-primary-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-3">
            <span className="text-sm uppercase tracking-[0.15em] text-primary-foreground/50">
              Visit
            </span>
            <address className="text-sm not-italic leading-relaxed text-primary-foreground/80">
              388 Geary Street, Suite 700
              <br />
              Union Square, San Francisco, CA 94102
            </address>
            <p className="text-sm leading-relaxed text-primary-foreground/80">
              Tue – Sat, 9:00 AM – 6:00 PM
              <br />
              By appointment only
            </p>
          </div>
        </div>

        <div className="mt-12 border-t border-primary-foreground/15 pt-8">
          <p className="text-pretty text-xs leading-relaxed text-primary-foreground/50">
            Medical disclaimer: All treatments are medical procedures and
            results vary by individual. Information on this site is for general
            educational purposes only and does not constitute medical advice.
            Photographs depict individual patient results and are not a
            guarantee of outcome. A consultation with Dr. Thorne is required to
            determine candidacy for any treatment.
          </p>
          <p className="mt-6 text-xs text-primary-foreground/50">
            &copy; {new Date().getFullYear()} Thorne Aesthetics. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
