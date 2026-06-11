import Image from 'next/image'
import { ConsultationDialog } from './consultation-dialog'

export function Hero() {
  return (
    <section
      id="top"
      className="mx-auto max-w-6xl px-6 pt-28 pb-16 md:pt-40 md:pb-28"
    >
      <div className="grid items-center gap-12 md:grid-cols-[1.1fr_0.9fr] md:gap-16">
        <div className="flex flex-col gap-8">
          <p className="text-sm uppercase tracking-[0.25em] text-muted-foreground">
            Medical Aesthetics — Union Square, SF
          </p>
          <h1 className="text-balance font-heading text-5xl font-normal leading-[1.05] text-foreground md:text-7xl">
            Refined precision.
            <br />
            Invisible artistry.
          </h1>
          <p className="max-w-md text-pretty leading-relaxed text-muted-foreground">
            Led by Dr. Evelyn Thorne, our practice is built on a single
            principle: the finest work is the work no one notices. Subtle,
            anatomy-led results that look like nothing more than you, at your
            best.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <ConsultationDialog />
            <a
              href="#treatments"
              className="text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
            >
              Explore treatments
            </a>
          </div>
        </div>

        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm border border-border">
          <Image
            src="/dr-thorne.png"
            alt="Dr. Evelyn Thorne, founder of Thorne Aesthetics, in her clinic"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 40vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  )
}
