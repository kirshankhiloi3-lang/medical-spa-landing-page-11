import { transformations } from './data'
import { TransformationCard } from './transformation-card'

export function Transformations() {
  return (
    <section
      id="transformations"
      className="border-t border-border bg-background py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex max-w-2xl flex-col gap-4">
          <p className="text-sm uppercase tracking-[0.25em] text-muted-foreground">
            Transformations
          </p>
          <h2 className="text-balance font-heading text-4xl font-normal leading-tight text-foreground md:text-5xl">
            Results you have to be told about.
          </h2>
          <p className="text-pretty leading-relaxed text-muted-foreground">
            Real patients, photographed under identical clinical conditions.
            The change is undeniable up close and invisible to everyone else.
          </p>
        </div>

        <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
          {transformations.map((transformation) => (
            <TransformationCard
              key={transformation.beforeSrc}
              transformation={transformation}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
