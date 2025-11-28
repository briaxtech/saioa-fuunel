import { FunnelForm } from "@/components/funnel-form"

export default function Home() {
  return (
    <main className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Consultas de Extranjería</h1>
          <p className="text-muted-foreground">Clasifica tu consulta para recibir la información más relevante</p>
        </header>
        <FunnelForm />
      </div>
    </main>
  )
}
