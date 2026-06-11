import Image from 'next/image'

export function Philosophy() {
  return (
    <section
      id="philosophy"
      className="border-t border-border bg-secondary py-20 md:py-28"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 md:grid-cols-2 md:gap-16">
        <div className="relative order-last aspect-[4/5] w-full overflow-hidden rounded-sm border border-border md:order-first">
          <Image
            src="/philosophy.png"
            alt="The minimalist treatment room at Thorne Aesthetics"
            fill
            sizes="(max-width: 768px) 100vw, 45vw"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col gap-6">
          <p className="text-sm uppercase tracking-[0.25em] text-muted-foreground">
            Philosophy
          </p>
          <h2 className="text-balance font-heading text-4xl font-normal leading-tight text-foreground md:text-5xl">
            The architecture of natural elegance.
          </h2>
          <div className="flex flex-col gap-4 text-pretty leading-relaxed text-muted-foreground">
            <p>
              Beauty is structural. Before a single treatment is considered, Dr.
              Thorne studies the underlying architecture of your face — its
              proportions, its movement, the way light falls across it. Only
              then does a plan take shape.
            </p>
            <p>
              A double-board-certified physician with over fifteen years in
              facial aesthetics, Dr. Thorne trained in reconstructive surgery
              before dedicating her practice to restraint: doing less, more
              precisely. She treats every patient personally and turns away more
              requests than she accepts.
            </p>
            <p className="text-foreground">
              The result is work that disappears into you — never the other way
              around.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
