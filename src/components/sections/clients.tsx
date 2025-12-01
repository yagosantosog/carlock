"use client";

import React from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { cn } from "@/lib/utils";

const clientLogoIds = [
  "client-truck",
  "client-speedlog",
  "client-boxtruck",
  "client-rodonaves",
  "client-grana",
];

export function Clients() {
  const imageMap = new Map(PlaceHolderImages.map((i) => [i.id, i]));
  const logos = clientLogoIds.map((id) => imageMap.get(id)).filter(Boolean);

  // Duplicate logos for a seamless loop
  const duplicatedLogos = [...logos, ...logos, ...logos, ...logos];

  const [emblaRef] = useEmblaCarousel({
    loop: true,
    align: "start",
    dragFree: true,
  });

  return (
    <section id="clients" className="py-16 sm:py-24 bg-muted/40">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">
            Nossos Clientes
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Confiança que move negócios por todo o país.
          </p>
        </div>
        <div
          className="relative w-full overflow-hidden cursor-grab active:cursor-grabbing"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          }}
          ref={emblaRef}
        >
          <div className="animate-scroll flex gap-16">
            {duplicatedLogos.map((logo, index) =>
              logo ? (
                <div
                  key={index}
                  className="flex-shrink-0"
                  style={{ flex: "0 0 160px" }}
                >
                  <Image
                    src={logo.imageUrl}
                    alt={logo.description}
                    width={160}
                    height={80}
                    className="object-contain aspect-[2/1] grayscale opacity-60 transition-all hover:grayscale-0 hover:opacity-100"
                    data-ai-hint={logo.imageHint}
                  />
                </div>
              ) : null
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
