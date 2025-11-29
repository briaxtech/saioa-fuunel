"use client"

import type React from "react"

import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CATEGORIAS_GENERALES, getTemplatesByCategory, type CategoriaId } from "@/lib/templates-data"
import { CheckCircle2, ChevronLeft, ChevronRight, Loader2 } from "lucide-react"

const FALLBACK_OPTION = "NECESITO_AYUDA_ESPECIFICA"
const TOTAL_STEPS = 3

interface FormData {
  categoria_general: CategoriaId | null
  template_key_final: string | null
  email_cliente: string
  consulta_libre: string
}

export function FunnelForm() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    categoria_general: null,
    template_key_final: null,
    email_cliente: "",
    consulta_libre: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const formatTitle = (title: string) => title.replace(/^[IVXLCDM]+\.?\s*/i, "")
  const progress = useMemo(() => Math.round((step / TOTAL_STEPS) * 100), [step])

  const handleCategorySelect = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      categoria_general: value as CategoriaId,
      template_key_final: null,
    }))
  }

  const handleTemplateSelect = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      template_key_final: value,
      consulta_libre: value !== FALLBACK_OPTION ? "" : prev.consulta_libre,
    }))
  }

  const handleNext = () => {
    if (step === 1 && formData.categoria_general) {
      setStep(2)
    } else if (step === 2 && formData.template_key_final) {
      setStep(3)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateEmail(formData.email_cliente)) {
      setErrorMessage("Por favor, introduce un email válido.")
      return
    }

    if (formData.template_key_final === FALLBACK_OPTION && !formData.consulta_libre.trim()) {
      setErrorMessage("Por favor, descríbenos tu consulta.")
      return
    }

    setIsSubmitting(true)
    setErrorMessage("")

    const payload = {
      email_cliente: formData.email_cliente,
      template_key_final: formData.template_key_final,
      consulta_libre: formData.template_key_final === FALLBACK_OPTION ? formData.consulta_libre : null,
    }

    try {
      const response = await fetch("/api/webhook-n8n", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error("Error al enviar la consulta")
      }

      setSubmitStatus("success")
    } catch {
      setSubmitStatus("error")
      setErrorMessage("Hubo un error al enviar tu consulta. Por favor, inténtalo de nuevo.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const templatesForCategory = formData.categoria_general ? getTemplatesByCategory(formData.categoria_general) : []

  if (submitStatus === "success") {
    return (
      <Card className="w-full border-none bg-transparent shadow-none">
        <CardContent className="flex flex-col items-center justify-center gap-4 py-12 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/15 text-primary">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-secondary">¡Consulta enviada!</h2>
            <p className="text-base text-muted-foreground">
              Hemos recibido tu mensaje. Te responderemos lo antes posible al email proporcionado.
            </p>
            <div className="rounded-xl border border-dashed border-primary/50 bg-primary/5 px-4 py-3 text-sm text-muted-foreground">
              No olvides revisar tu carpeta de correo no deseado o spam si no ves nuestra respuesta en tu bandeja de entrada.
            </div>
          </div>
          <Button
            className="mt-2"
            onClick={() => {
              setStep(1)
              setFormData({
                categoria_general: null,
                template_key_final: null,
                email_cliente: "",
                consulta_libre: "",
              })
              setSubmitStatus("idle")
            }}
          >
            Enviar otra consulta
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full border-none bg-transparent shadow-none">
      <CardHeader className="space-y-3 pb-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-primary/15 px-4 py-1 text-sm font-semibold text-primary">
            Formulario de contacto
          </span>
          <span className="text-sm font-medium text-muted-foreground">Respuesta habitual en 24h hábiles</span>
        </div>
        <CardTitle className="text-3xl text-secondary">Cuéntanos tu consulta</CardTitle>
        <CardDescription className="text-base text-muted-foreground">
          Clasificamos tu caso para derivarlo al especialista correcto. Solo necesitamos tres pasos rápidos.
        </CardDescription>
        <div className="mt-3 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            <span>Paso {step} de {TOTAL_STEPS}</span>
            <span>
              {step === 1 && "Elige el tema"}
              {step === 2 && "Especifica tu consulta"}
              {step === 3 && "Datos de contacto"}
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#36ccca] via-[#36ccca] to-[#0e2f76] transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {step === 1 && (
            <div className="space-y-4">
              <div className="space-y-1">
                <Label className="text-base font-semibold text-secondary">Paso 1 · Selecciona la categoría</Label>
                <p className="text-sm text-muted-foreground">
                  Cuéntanos a grandes rasgos sobre qué trata tu consulta para dirigirla al área adecuada.
                </p>
              </div>
              <RadioGroup
                value={formData.categoria_general || ""}
                onValueChange={handleCategorySelect}
                className="space-y-3"
              >
                {CATEGORIAS_GENERALES.map((categoria) => (
                  <div key={categoria.id} className="relative">
                    <RadioGroupItem value={categoria.id} id={categoria.id} className="peer sr-only" />
                    <Label
                      htmlFor={categoria.id}
                      className="flex cursor-pointer flex-col gap-1 rounded-2xl border border-[#d5dfec] bg-white/80 p-4 text-left shadow-sm transition-all duration-200 active:animate-[press-pop_180ms_ease-out] hover:-translate-y-0.5 hover:border-primary hover:bg-[#e6f8f9] hover:shadow-lg peer-data-[state=checked]:-translate-y-0.5 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-[#d9f3f4] peer-data-[state=checked]:shadow-lg"
                    >
                      <span className="text-lg font-semibold text-secondary">{formatTitle(categoria.titulo)}</span>
                      <span className="text-sm text-muted-foreground">{categoria.descripcion}</span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="space-y-1">
                <Label className="text-base font-semibold text-secondary">Paso 2 · Tipo de consulta</Label>
                <p className="text-sm text-muted-foreground">
                  Elige el escenario que mejor se ajuste o dinos que necesitas una respuesta personalizada.
                </p>
              </div>
              <RadioGroup
                value={formData.template_key_final || ""}
                onValueChange={handleTemplateSelect}
                className="space-y-3 max-h-[420px] overflow-y-auto pr-2"
              >
                {templatesForCategory.map((template) => (
                  <div key={template.template_key} className="relative">
                    <RadioGroupItem value={template.template_key} id={template.template_key} className="peer sr-only" />
                    <Label
                      htmlFor={template.template_key}
                      className="flex cursor-pointer flex-col gap-1 rounded-2xl border border-[#d5dfec] bg-white/80 p-4 text-left shadow-sm transition-all duration-200 active:animate-[press-pop_180ms_ease-out] hover:-translate-y-0.5 hover:border-primary hover:bg-[#e6f8f9] hover:shadow-lg peer-data-[state=checked]:-translate-y-0.5 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-[#d9f3f4] peer-data-[state=checked]:shadow-lg"
                    >
                      <span className="text-lg font-semibold text-secondary">{template.template_key}</span>
                      <span className="text-sm text-muted-foreground">{template.descripcion}</span>
                    </Label>
                  </div>
                ))}
                <div className="relative">
                  <RadioGroupItem value={FALLBACK_OPTION} id={FALLBACK_OPTION} className="peer sr-only" />
                  <Label
                    htmlFor={FALLBACK_OPTION}
                    className="flex cursor-pointer flex-col gap-1 rounded-2xl border border-dashed border-[#d5dfec] bg-white/70 p-4 text-left shadow-sm transition-all duration-200 active:animate-[press-pop_180ms_ease-out] hover:-translate-y-0.5 hover:border-primary hover:bg-[#e6f8f9] hover:shadow-lg peer-data-[state=checked]:-translate-y-0.5 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-[#d9f3f4] peer-data-[state=checked]:shadow-lg"
                  >
                    <span className="font-semibold text-secondary">Ninguna de estas opciones me sirve</span>
                    <span className="text-sm text-muted-foreground">
                      Quiero describir mi consulta de forma personalizada
                    </span>
                  </Label>
                </div>
              </RadioGroup>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="space-y-1">
                <Label className="text-base font-semibold text-secondary">Paso 3 · Datos de contacto</Label>
                <p className="text-sm text-muted-foreground">
                  Déjanos tu email para enviarte la respuesta y los siguientes pasos.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={formData.email_cliente}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email_cliente: e.target.value }))}
                  required
                />
              </div>

              {formData.template_key_final === FALLBACK_OPTION && (
                <div className="space-y-2">
                  <Label htmlFor="consulta">Describe tu consulta *</Label>
                  <Textarea
                    id="consulta"
                    placeholder="Escribe aquí los detalles de tu consulta..."
                    value={formData.consulta_libre}
                    onChange={(e) => setFormData((prev) => ({ ...prev, consulta_libre: e.target.value }))}
                    rows={5}
                    required
                  />
                </div>
              )}

              {errorMessage && (
                <p className="text-sm font-medium text-destructive" role="alert">
                  {errorMessage}
                </p>
              )}
            </div>
          )}

          <div className="flex flex-col gap-3 pt-3 sm:flex-row sm:items-center sm:justify-between sm:pt-0">
            <Button type="button" variant="outline" onClick={handleBack} disabled={step === 1}>
              <ChevronLeft className="mr-1 h-4 w-4" />
              Anterior
            </Button>

            {step < TOTAL_STEPS ? (
              <Button
                type="button"
                onClick={handleNext}
                disabled={(step === 1 && !formData.categoria_general) || (step === 2 && !formData.template_key_final)}
              >
                Siguiente
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            ) : (
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  "Enviar consulta"
                )}
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
