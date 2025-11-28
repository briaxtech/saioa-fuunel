"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CATEGORIAS_GENERALES, getTemplatesByCategory, type CategoriaId } from "@/lib/templates-data"
import { CheckCircle2, ChevronLeft, ChevronRight, Loader2 } from "lucide-react"

const FALLBACK_OPTION = "NECESITO_AYUDA_ESPECIFICA"

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

  const handleCategorySelect = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      categoria_general: value as CategoriaId,
      template_key_final: null, // Reset template selection when category changes
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

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (!validateEmail(formData.email_cliente)) {
      setErrorMessage("Por favor, introduce un email válido.")
      return
    }

    if (formData.template_key_final === FALLBACK_OPTION && !formData.consulta_libre.trim()) {
      setErrorMessage("Por favor, describe tu consulta.")
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
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-2">¡Consulta Enviada!</h2>
            <p className="text-muted-foreground">
              Hemos recibido tu consulta correctamente. Te responderemos lo antes posible al email proporcionado.
            </p>
            <Button
              className="mt-6"
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
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl">Clasificador de Consultas de Extranjería</CardTitle>
        <CardDescription>Completa los siguientes pasos para clasificar tu consulta</CardDescription>
        {/* Progress indicator */}
        <div className="flex items-center gap-2 mt-4">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                  s === step
                    ? "bg-primary text-primary-foreground"
                    : s < step
                      ? "bg-primary/20 text-primary"
                      : "bg-muted text-muted-foreground"
                }`}
              >
                {s}
              </div>
              {s < 3 && (
                <div className={`w-12 h-1 mx-1 rounded transition-colors ${s < step ? "bg-primary/50" : "bg-muted"}`} />
              )}
            </div>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          {/* Step 1: Category Selection */}
          {step === 1 && (
            <div className="space-y-4">
              <Label className="text-base font-semibold">Paso 1: Selecciona la categoría de tu consulta</Label>
              <RadioGroup
                value={formData.categoria_general || ""}
                onValueChange={handleCategorySelect}
                className="space-y-3"
              >
                {CATEGORIAS_GENERALES.map((categoria) => (
                  <div key={categoria.id} className="flex items-start space-x-3">
                    <RadioGroupItem value={categoria.id} id={categoria.id} className="mt-1" />
                    <Label htmlFor={categoria.id} className="flex flex-col cursor-pointer">
                      <span className="font-medium text-foreground">{categoria.titulo}</span>
                      <span className="text-sm text-muted-foreground">{categoria.descripcion}</span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}

          {/* Step 2: Template Selection */}
          {step === 2 && (
            <div className="space-y-4">
              <Label className="text-base font-semibold">Paso 2: Selecciona el tipo de consulta específica</Label>
              <RadioGroup
                value={formData.template_key_final || ""}
                onValueChange={handleTemplateSelect}
                className="space-y-3 max-h-[400px] overflow-y-auto pr-2"
              >
                {templatesForCategory.map((template) => (
                  <div key={template.template_key} className="flex items-start space-x-3">
                    <RadioGroupItem value={template.template_key} id={template.template_key} className="mt-1" />
                    <Label htmlFor={template.template_key} className="flex flex-col cursor-pointer">
                      <span className="font-medium text-foreground">{template.template_key}</span>
                      <span className="text-sm text-muted-foreground">{template.descripcion}</span>
                    </Label>
                  </div>
                ))}
                {/* Fallback option */}
                <div className="flex items-start space-x-3 pt-3 border-t">
                  <RadioGroupItem value={FALLBACK_OPTION} id={FALLBACK_OPTION} className="mt-1" />
                  <Label htmlFor={FALLBACK_OPTION} className="flex flex-col cursor-pointer">
                    <span className="font-medium text-foreground">Ninguna de estas opciones me sirve</span>
                    <span className="text-sm text-muted-foreground">
                      Quiero describir mi consulta de forma personalizada
                    </span>
                  </Label>
                </div>
              </RadioGroup>
            </div>
          )}

          {/* Step 3: Contact Info & Free Text */}
          {step === 3 && (
            <div className="space-y-6">
              <Label className="text-base font-semibold">Paso 3: Datos de contacto</Label>

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

              {errorMessage && <p className="text-sm text-destructive">{errorMessage}</p>}
            </div>
          )}

          {/* Navigation buttons */}
          <div className="flex justify-between mt-6 pt-4 border-t">
            <Button type="button" variant="outline" onClick={handleBack} disabled={step === 1}>
              <ChevronLeft className="w-4 h-4 mr-1" />
              Anterior
            </Button>

            {step < 3 ? (
              <Button
                type="button"
                onClick={handleNext}
                disabled={(step === 1 && !formData.categoria_general) || (step === 2 && !formData.template_key_final)}
              >
                Siguiente
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            ) : (
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  "Enviar Consulta"
                )}
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
