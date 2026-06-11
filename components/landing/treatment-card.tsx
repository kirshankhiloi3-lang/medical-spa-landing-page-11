import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import type { Treatment } from './data'

export function TreatmentCard({ treatment }: { treatment: Treatment }) {
  return (
    <Card className="group h-full rounded-sm border-border bg-card transition-all duration-300 hover:scale-[1.02] hover:border-foreground/40">
      <CardHeader>
        <CardTitle className="font-heading text-2xl font-normal">
          {treatment.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <CardDescription className="text-pretty leading-relaxed">
          {treatment.description}
        </CardDescription>
      </CardContent>
      <CardFooter>
        <span className="text-sm uppercase tracking-[0.15em] text-muted-foreground">
          {treatment.priceRange}
        </span>
      </CardFooter>
    </Card>
  )
}
