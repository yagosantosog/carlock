import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export function Cta() {
  const ctaImage = PlaceHolderImages.find((img) => img.id === "cta-background");

  return (
    <section
      id="cta"
      className="relative py-20 sm:py-28 w-full flex items-center justify-center bg-foreground"
    >
      {ctaImage && (
        <Image
          src={ctaImage.imageUrl}
          alt={ctaImage.description}
          fill
          className="object-cover"
          data-ai-hint={ctaImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="flex flex-col items-center md:flex-row md:justify-between md:items-center gap-8">
            <div className="text-center md:text-left">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl font-headline">
                SOLICITE UM <span className="text-primary">ORÇAMENTO</span> AGORA MESMO
                </h2>
                <p className="mt-4 text-lg text-neutral-200 max-w-2xl">
                Conheça nossos planos e tenha seu veículo protegido com nossa logística eficaz e de alta tecnologia.
                </p>
            </div>
            <div className="flex-shrink-0">
                <Button asChild size="lg" variant="outline" className="bg-transparent border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                    <Link href="#">FALE CONOSCO</Link>
                </Button>
            </div>
        </div>
      </div>
    </section>
  );
}
