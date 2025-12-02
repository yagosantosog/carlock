"use client";

import { Award, Wrench, Users, Clock } from "lucide-react";
import {
  HighlightGroup,
  HighlighterItem,
  Particles,
} from "@/components/ui/highlighter";

const differentialsData = [
  {
    icon: (
      <Award className="w-8 h-8 text-primary group-hover:text-white transition-colors duration-300" />
    ),
    title: "Produtos Certificados",
    description:
      "Buscamos oferecer produtos de qualidade e com certificação, ressaltando que nossa perspectiva é a inovação e o acompanhamento da tecnologia.",
  },
  {
    icon: (
      <Wrench className="w-8 h-8 text-primary group-hover:text-white transition-colors duration-300" />
    ),
    title: "Qualidade No Serviço",
    description:
      "Nós priorizamos sempre por qualidade e excelência, buscamos sempre proporcionar o melhor em nossos serviços para garantir sua satisfação.",
  },
  {
    icon: (
      <Users className="w-8 h-8 text-primary group-hover:text-white transition-colors duration-300" />
    ),
    title: "Equipe Dedicada",
    description:
      "Nosso propósito é trabalhar com uma equipe de excelência, dedicação e compromisso, para assim atendê-los da melhor maneira.",
  },
  {
    icon: (
      <Clock className="w-8 h-8 text-primary group-hover:text-white transition-colors duration-300" />
    ),
    title: "Atendimento 24/7",
    description:
      "Nosso atendimento é totalmente dedicado a você. Estamos sempre à disposição para atender suas necessidades a todo e qualquer momento.",
  },
];

export function Differentials() {
  return (
    <section id="differentials" className="py-16 sm:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline relative pb-4">
            Nossos Diferenciais
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-1 w-20 bg-primary"></span>
          </h2>
          <p className="mt-8 text-lg text-muted-foreground">
            Veja por que a CarLock é a escolha certa para você.
          </p>
        </div>

        <HighlightGroup className="group grid grid-cols-1 md:grid-cols-2 gap-8">
          {differentialsData.map((item) => (
            <div key={item.title} className="h-full">
              <HighlighterItem className="h-full rounded-3xl">
                <div className="relative z-20 h-full overflow-hidden rounded-3xl border border-border/20 bg-card p-6">
                   <Particles
                    className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-1000 ease-in-out group-hover:opacity-100"
                    quantity={50}
                    color={"hsl(var(--primary))"}
                    vy={-0.1}
                    vx={0.1}
                  />
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 bg-primary/10 p-3 rounded-full transition-all duration-300 group-hover:bg-primary group-hover:scale-110">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                      <p className="text-muted-foreground mt-1">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </HighlighterItem>
            </div>
          ))}
        </HighlightGroup>
      </div>
    </section>
  );
}