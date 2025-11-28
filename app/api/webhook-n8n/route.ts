import { NextResponse } from "next/server"

const FALLBACK_TEMPLATE = "NECESITO_AYUDA_ESPECIFICA"

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null)

    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Payload JSON no valido" }, { status: 400 })
    }

    const webhookUrl = process.env.WEBHOOK_URL
    if (!webhookUrl) {
      return NextResponse.json({ error: "Falta la configuracion del webhook remoto" }, { status: 500 })
    }

    // Validaciones basicas
    if (!body.email_cliente || !body.template_key_final) {
      return NextResponse.json(
        { error: "Campos requeridos faltantes: email_cliente y template_key_final" },
        { status: 400 },
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email_cliente)) {
      return NextResponse.json({ error: "Formato de email invalido" }, { status: 400 })
    }

    if (body.template_key_final === FALLBACK_TEMPLATE && !body.consulta_libre) {
      return NextResponse.json({ error: "Se requiere descripcion de la consulta para esta opcion" }, { status: 400 })
    }

    const payload = {
      email_cliente: body.email_cliente,
      template_key_final: body.template_key_final,
      consulta_libre: body.template_key_final === FALLBACK_TEMPLATE ? body.consulta_libre : null,
    }

    const webhookResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })

    const responseText = await webhookResponse.text()

    if (!webhookResponse.ok) {
      console.error("[v0] Webhook error:", webhookResponse.status, responseText)
      return NextResponse.json(
        {
          error: "El servicio de webhook devolvio un error",
          status: webhookResponse.status,
          body: responseText?.slice(0, 2000) ?? null,
        },
        { status: 502 },
      )
    }

    let webhookData: unknown = null
    try {
      webhookData = responseText ? JSON.parse(responseText) : null
    } catch {
      webhookData = responseText
    }

    return NextResponse.json({
      success: true,
      message: "Consulta enviada correctamente",
      data: webhookData,
    })
  } catch (error) {
    console.error("[v0] Error processing webhook:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}
