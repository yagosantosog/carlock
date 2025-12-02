import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      <video
        src="/car-location-video.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      />
      <div className="absolute inset-0 bg-black/50 z-10" />
      <div className="relative z-20 container mx-auto px-4 text-center text-white">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl font-headline">
          Rastreamento Veicular Inteligente
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-neutral-200">
          Segurança e controle para seu veículo na palma da sua mão.
        </p>
        <div className="mt-8 flex justify-center">
          <Button asChild size="lg" className="transition-transform duration-300 hover:scale-105 active:scale-95">
            <Link href="https://api.whatsapp.com/send?phone=5516993166262" target="_blank">Solicite uma Cotação</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
