export type NavLink = {
  label: string
  href: string
}

export const navLinks: NavLink[] = [
  { label: 'Treatments', href: '#treatments' },
  { label: 'Philosophy', href: '#philosophy' },
  { label: 'Transformations', href: '#transformations' },
  { label: 'FAQ', href: '#faq' },
]

export type Treatment = {
  name: string
  description: string
  priceRange: string
}

export const treatments: Treatment[] = [
  {
    name: 'Neuromodulator Refinement',
    description:
      'Precision micro-dosing of botulinum toxin to soften dynamic lines while preserving full, natural expression. Tailored to your facial anatomy.',
    priceRange: '$650 – $1,200',
  },
  {
    name: 'Architectural Filler',
    description:
      'Hyaluronic acid contouring that restores volume and structure with restraint. Defined cheekbones and jawline without the overfilled look.',
    priceRange: '$900 – $2,400',
  },
  {
    name: 'Skin Health Protocol',
    description:
      'A medical-grade regimen of resurfacing, microneedling, and bespoke topicals designed to rebuild collagen and luminous skin quality over time.',
    priceRange: '$450 – $1,500',
  },
  {
    name: 'Liquid Rhinoplasty',
    description:
      'Non-surgical nasal refinement using strategically placed filler to correct asymmetry and smooth the profile in a single, considered session.',
    priceRange: '$1,100 – $1,800',
  },
  {
    name: 'Under-Eye Restoration',
    description:
      'Targeted treatment for hollows, shadows, and fine crepiness. A delicate approach that brightens and rests the entire upper face.',
    priceRange: '$800 – $1,400',
  },
  {
    name: 'Full-Face Harmonization',
    description:
      'A comprehensive, multi-session plan that balances proportion across the face. Reserved for patients seeking complete, gradual refinement.',
    priceRange: '$3,500 – $8,000',
  },
]

export type Transformation = {
  beforeSrc: string
  afterSrc: string
  alt: string
  quote: string
  patient: string
}

export const transformations: Transformation[] = [
  {
    beforeSrc: '/transform-1-before.png',
    afterSrc: '/transform-1-after.png',
    alt: 'female patient in her early forties before and after a neuromodulator and skin health treatment',
    quote:
      'No one can tell I had anything done. They just keep asking if I have been on holiday. That is exactly what I wanted.',
    patient: 'Patient, age 42 — Neuromodulator & Skin Health',
  },
  {
    beforeSrc: '/transform-2-before.png',
    afterSrc: '/transform-2-after.png',
    alt: 'male patient in his late forties before and after architectural filler treatment',
    quote:
      'Dr. Thorne talked me out of the procedure I came in asking for and did something far more subtle. I look like myself, rested.',
    patient: 'Patient, age 48 — Architectural Filler',
  },
  {
    beforeSrc: '/transform-3-before.png',
    afterSrc: '/transform-3-after.png',
    alt: 'female patient in her mid fifties before and after full-face harmonization treatment',
    quote:
      'After years of feeling invisible, I finally see the version of me I remember. It happened so gradually that it never felt drastic.',
    patient: 'Patient, age 55 — Full-Face Harmonization',
  },
]

export type Faq = {
  question: string
  answer: string
}

export const faqs: Faq[] = [
  {
    question: 'Will I still look like myself, or will it be obvious?',
    answer:
      'Our entire philosophy is built on results that go unnoticed by everyone but you. Dr. Thorne is known for under-treating rather than over-treating, refining your existing features instead of changing your face. The goal is for people to say you look well-rested, never that you look "done."',
  },
  {
    question: 'How much recovery time should I plan for?',
    answer:
      'Most treatments are designed to fit into a busy life. Neuromodulators and most filler appointments involve little to no downtime, with any minor swelling or bruising typically resolving within a few days. Resurfacing and skin protocols may involve a short period of redness. We will give you a precise recovery timeline during your consultation.',
  },
  {
    question: 'How are your prices structured?',
    answer:
      'Pricing reflects the complexity of your plan and the time required to do it properly. The ranges shown are a starting reference; your exact investment is confirmed during your consultation, where we build a plan specific to your anatomy and goals rather than a one-size-fits-all menu.',
  },
  {
    question: 'What happens during the Elite Facial Analysis?',
    answer:
      'Your initial consultation is an unhurried assessment of your facial structure, skin health, and aesthetic goals. Dr. Thorne reviews your history, discusses what is realistic, and designs a phased plan. There is never pressure to proceed on the same day.',
  },
  {
    question: 'Who performs the treatments?',
    answer:
      'Every injectable and medical treatment at Thorne Aesthetics is performed personally by Dr. Evelyn Thorne. We do not delegate clinical work, which is central to the consistency and safety of our results.',
  },
]

export type ConcernOption = {
  value: string
  label: string
}

export const concernOptions: ConcernOption[] = [
  { value: 'botox', label: 'Botox / Neuromodulators' },
  { value: 'filler', label: 'Dermal Filler' },
  { value: 'skin-health', label: 'Skin Health' },
  { value: 'other', label: 'Other' },
]
