import { SiteNav } from '@/components/landing/site-nav'
import { Hero } from '@/components/landing/hero'
import { TreatmentGrid } from '@/components/landing/treatment-grid'
import { Philosophy } from '@/components/landing/philosophy'
import { Transformations } from '@/components/landing/transformations'
import { Faq } from '@/components/landing/faq'
import { SiteFooter } from '@/components/landing/site-footer'

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main>
        <Hero />
        <TreatmentGrid />
        <Philosophy />
        <Transformations />
        <Faq />
      </main>
      <SiteFooter />
    </div>
  )
}
