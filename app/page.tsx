import { FunnelForm } from "@/components/funnel-form"
import Image from "next/image"

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-foreground">
      <section className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-4 py-12 sm:py-16">
        <Image src="/sentir-logo.svg" alt="Sentir Extranjero" width={220} height={68} priority />
        <div className="w-full max-w-3xl rounded-3xl border border-[#d5dfec] bg-white shadow-[0_18px_60px_rgba(3,18,71,0.08)]">
          <FunnelForm />
        </div>
      </section>
    </main>
  )
}
