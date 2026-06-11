import Image from 'next/image'
import type { Transformation } from './data'

export function TransformationCard({
  transformation,
}: {
  transformation: Transformation
}) {
  return (
    <figure className="flex flex-col gap-5">
      <div className="grid grid-cols-2 gap-2">
        <div className="relative aspect-[3/4] overflow-hidden rounded-sm border border-border">
          <Image
            src={transformation.beforeSrc || '/placeholder.svg'}
            alt={`Before: ${transformation.alt}`}
            fill
            sizes="(max-width: 768px) 50vw, 20vw"
            className="object-cover"
          />
          <span className="absolute bottom-2 left-2 bg-background/80 px-2 py-0.5 text-xs uppercase tracking-[0.15em] text-muted-foreground backdrop-blur-sm">
            Before
          </span>
        </div>
        <div className="relative aspect-[3/4] overflow-hidden rounded-sm border border-border">
          <Image
            src={transformation.afterSrc || '/placeholder.svg'}
            alt={`After: ${transformation.alt}`}
            fill
            sizes="(max-width: 768px) 50vw, 20vw"
            className="object-cover"
          />
          <span className="absolute bottom-2 left-2 bg-foreground/85 px-2 py-0.5 text-xs uppercase tracking-[0.15em] text-primary-foreground backdrop-blur-sm">
            After
          </span>
        </div>
      </div>
      <figcaption className="flex flex-col gap-3">
        <blockquote className="text-pretty font-heading text-lg font-normal italic leading-relaxed text-foreground">
          &ldquo;{transformation.quote}&rdquo;
        </blockquote>
        <cite className="not-italic text-sm text-muted-foreground">
          {transformation.patient}
        </cite>
      </figcaption>
    </figure>
  )
}
