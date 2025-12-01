import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import {
  MapPin,
  ShieldAlert,
  History,
  Lock,
  Gauge,
  SquareDashed,
} from "lucide-react";

const featureData = [
  {
    icon: <MapPin className="w-6 h-6 text-primary" />,
    title: "Rastreamento em Tempo Real",
    description: "Acompanhe a localização do seu veículo 24/7 com precisão e em tempo real.",
  },
  {
    icon: <ShieldAlert className="w-6 h-6 text-primary" />,
    title: "Alertas de Segurança",
    description: "Receba notificações instantâneas sobre ignição, movimento e excesso de velocidade.",
  },
  {
    icon: <History className="w-6 h-6 text-primary" />,
    title: "Histórico de Rotas",
    description: "Acesse o histórico detalhado de todas as rotas percorridas pelo seu veículo.",
  },
  {
    icon: <Lock className="w-6 h-6 text-primary" />,
    title: "Bloqueio Remoto",
    description: "Em caso de roubo, bloqueie seu veículo remotamente com apenas um clique.",
  },
  {
    icon: <Gauge className="w-6 h-6 text-primary" />,
    title: "Controle de Velocidade",
    description: "Monitore e seja alertado sempre que o limite de velocidade for ultrapassado.",
  },
  {
    icon: <SquareDashed className="w-6 h-6 text-primary" />,
    title: "Cerca Virtual",
    description: "Defina áreas seguras e receba alertas quando o veículo entrar ou sair delas.",
  },
];

export function Features() {
  const featuresImage = PlaceHolderImages.find((img) => img.id === "features-app");

  return (
    <section id="features" className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Column */}
          <div className="flex justify-center">
            {featuresImage && (
              <Image
                src={featuresImage.imageUrl}
                alt={featuresImage.description}
                width={500}
                height={500}
                className="rounded-lg object-contain"
                data-ai-hint={featuresImage.imageHint}
              />
            )}
          </div>

          {/* Content Column */}
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">
              Tudo que você precisa para sua segurança
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Explore os recursos que fazem do CarLock a melhor solução de rastreamento veicular.
            </p>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
              {featureData.map((feature) => (
                <div key={feature.title} className="flex items-start gap-4">
                  <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 bg-primary/10 rounded-lg">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{feature.title}</h3>
                    <p className="mt-1 text-muted-foreground text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
