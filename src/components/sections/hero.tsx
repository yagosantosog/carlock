import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export function Hero() {
  const heroImage = PlaceHolderImages.find((img) => img.id === "hero-image");

  return (
    <section className="relative w-full h-[70vh] min-h-[500px] flex items-center justify-center">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover"
          priority
          data-ai-hint={heroImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl font-headline">
          Rastreamento Veicular Inteligente
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-neutral-200">
          Segurança e controle para seu veículo na palma da sua mão.
        </p>
        <div className="mt-8 flex justify-center">
          <Button asChild size="lg">
            <Link href="#contact">Solicite uma Cotação</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
