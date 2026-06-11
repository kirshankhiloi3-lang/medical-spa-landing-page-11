'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { faqs } from './data'

export function Faq() {
  return (
    <section
      id="faq"
      className="border-t border-border bg-secondary py-20 md:py-28"
    >
      <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
        <div className="flex flex-col gap-4">
          <p className="text-sm uppercase tracking-[0.25em] text-muted-foreground">
            FAQ
          </p>
          <h2 className="text-balance font-heading text-4xl font-normal leading-tight text-foreground md:text-5xl">
            Considered answers.
          </h2>
          <p className="text-pretty leading-relaxed text-muted-foreground">
            The questions our patients ask most, answered plainly.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={faq.question} value={`item-${index}`}>
              <AccordionTrigger className="text-left font-heading text-lg font-normal">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-pretty leading-relaxed text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
