'use client'

import type React from 'react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { concernOptions } from './data'

type FormState = {
  name: string
  email: string
  phone: string
  concern: string
}

type FormErrors = Partial<Record<keyof FormState, string>>

const EMPTY_FORM: FormState = { name: '', email: '', phone: '', concern: '' }

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {}
  if (!form.name.trim()) errors.name = 'Please enter your name.'
  if (!form.email.trim()) {
    errors.email = 'Please enter your email.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Please enter a valid email address.'
  }
  if (!form.phone.trim()) errors.phone = 'Please enter your phone number.'
  if (!form.concern) errors.concern = 'Please select a primary concern.'
  return errors
}

export function ConsultationDialog({
  triggerLabel = 'Request an Elite Facial Analysis',
  triggerVariant = 'default',
  triggerClassName,
}: {
  triggerLabel?: string
  triggerVariant?: 'default' | 'outline' | 'ghost' | 'link' | 'secondary'
  triggerClassName?: string
}) {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState<FormState>(EMPTY_FORM)
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)

  function reset() {
    setForm(EMPTY_FORM)
    setErrors({})
    setSubmitted(false)
  }

  function handleOpenChange(next: boolean) {
    setOpen(next)
    if (!next) {
      // Clear state when the dialog closes so it reopens clean.
      setTimeout(reset, 200)
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors = validate(form)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      return
    }
    console.log('[v0] Consultation request submitted:', form)
    setSubmitted(true)
  }

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant={triggerVariant}
          size="lg"
          className={triggerClassName}
        >
          {triggerLabel}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        {submitted ? (
          <div className="flex flex-col items-center gap-4 py-6 text-center">
            <DialogHeader className="items-center gap-3">
              <DialogTitle className="font-heading text-2xl font-normal">
                Thank you.
              </DialogTitle>
              <DialogDescription className="text-pretty leading-relaxed">
                Your request has been received. A member of Dr. Thorne&apos;s
                practice will contact you within one business day to arrange
                your Elite Facial Analysis.
              </DialogDescription>
            </DialogHeader>
            <Button
              variant="outline"
              onClick={() => handleOpenChange(false)}
              className="mt-2"
            >
              Close
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="font-heading text-2xl font-normal">
                Request an Elite Facial Analysis
              </DialogTitle>
              <DialogDescription className="text-pretty leading-relaxed">
                Share a few details and we will arrange a private consultation
                with Dr. Thorne.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} noValidate className="mt-2">
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={form.name}
                    onChange={(e) => update('name', e.target.value)}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    autoComplete="name"
                  />
                  {errors.name ? (
                    <p id="name-error" className="text-sm text-destructive">
                      {errors.name}
                    </p>
                  ) : null}
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => update('email', e.target.value)}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    autoComplete="email"
                  />
                  {errors.email ? (
                    <p id="email-error" className="text-sm text-destructive">
                      {errors.email}
                    </p>
                  ) : null}
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => update('phone', e.target.value)}
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={errors.phone ? 'phone-error' : undefined}
                    autoComplete="tel"
                  />
                  {errors.phone ? (
                    <p id="phone-error" className="text-sm text-destructive">
                      {errors.phone}
                    </p>
                  ) : null}
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="concern">Primary Concern</Label>
                  <Select
                    value={form.concern}
                    onValueChange={(value) => update('concern', value)}
                  >
                    <SelectTrigger
                      id="concern"
                      aria-invalid={Boolean(errors.concern)}
                      aria-describedby={
                        errors.concern ? 'concern-error' : undefined
                      }
                      className="w-full"
                    >
                      <SelectValue placeholder="Select a concern" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {concernOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {errors.concern ? (
                    <p id="concern-error" className="text-sm text-destructive">
                      {errors.concern}
                    </p>
                  ) : null}
                </div>

                <Button type="submit" size="lg" className="mt-1 w-full">
                  Submit Request
                </Button>
              </div>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
