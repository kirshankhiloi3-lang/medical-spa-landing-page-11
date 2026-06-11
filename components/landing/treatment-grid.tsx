import { treatments } from './data'
import { TreatmentCard } from './treatment-card'

export function TreatmentGrid() {
  return (
    <section
      id="treatments"
      className="border-t border-border bg-background py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex max-w-2xl flex-col gap-4">
          <p className="text-sm uppercase tracking-[0.25em] text-muted-foreground">
            Treatments
          </p>
          <h2 className="text-balance font-heading text-4xl font-normal leading-tight text-foreground md:text-5xl">
            A considered menu, never a catalogue.
          </h2>
          <p className="text-pretty leading-relaxed text-muted-foreground">
            Each treatment is performed personally by Dr. Thorne and tailored to
            your anatomy. Pricing reflects the time and precision each plan
            requires.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {treatments.map((treatment) => (
            <TreatmentCard key={treatment.name} treatment={treatment} />
          ))}
        </div>
      </div>
    </section>
  )
}
