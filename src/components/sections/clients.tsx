"use client";

import React from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { cn } from "@/lib/utils";
import Autoplay from "embla-carousel-autoplay";

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

  const [emblaRef] = useEmblaCarousel({ loop: true, align: "start" }, [
    Autoplay({ playOnInit: true, delay: 2000, stopOnInteraction: false, stopOnMouseEnter: true }),
  ]);

  return (
    <section id="clients" className="py-16 sm:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline relative pb-4">
            Nossos Clientes
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-1 w-20 bg-primary"></span>
          </h2>
          <p className="mt-8 text-lg text-muted-foreground">
            Confiança que move negócios por todo o país.
          </p>
        </div>
        <div className="max-w-6xl mx-auto">
          <div
            className="overflow-hidden"
            ref={emblaRef}
            style={{
              maskImage:
                "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
            }}
          >
            <div className="flex gap-16">
              {[...logos, ...logos].map((logo, index) =>
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
                      className="object-contain aspect-[2/1] transition-transform duration-300 ease-in-out hover:scale-110"
                      data-ai-hint={logo.imageHint}
                    />
                  </div>
                ) : null
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
