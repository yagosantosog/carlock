import Image from "next/image";
import {
  Award,
  Wrench,
  Users,
  Clock,
} from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const differentialsData = [
    {
      icon: <Award className="w-8 h-8 text-primary" />,
      title: "Produtos Certificados",
      description:
        "Buscamos oferecer produtos de qualidade e com certificação, ressaltando que nossa perspectiva é a inovação e o acompanhamento da tecnologia.",
    },
    {
      icon: <Wrench className="w-8 h-8 text-primary" />,
      title: "Qualidade No Serviço",
      description:
        "Nós priorizamos sempre por qualidade e excelência, buscamos sempre proporcionar o melhor em nossos serviços para garantir sua satisfação.",
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "Equipe Dedicada",
      description:
        "Nosso propósito é trabalhar com uma equipe de excelência, dedicação e compromisso, para assim atendê-los da melhor maneira.",
    },
    {
      icon: <Clock className="w-8 h-8 text-primary" />,
      title: "Atendimento 24/7",
      description:
        "Nosso atendimento é totalmente dedicado a você. Estamos sempre à disposição para atender suas necessidades a todo e qualquer momento.",
    },
  ];

export function Differentials() {
    const vehiclesImage = PlaceHolderImages.find((img) => img.id === "vehicles");

  return (
    <section id="differentials" className="py-16 sm:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">
            Nossos Diferenciais
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Veja por que a CarLock é a escolha certa para você.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            {/* Left Column */}
            <div className="space-y-10">
                {differentialsData.slice(0, 2).map((item) => (
                    <div key={item.title} className="flex items-start gap-4">
                        <div className="flex-shrink-0 bg-primary/10 p-3 rounded-full">
                            {item.icon}
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">{item.title}</h3>
                            <p className="text-muted-foreground mt-1">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Center Image */}
            <div className="my-8 lg:my-0">
                {vehiclesImage && (
                    <Image
                        src={vehiclesImage.imageUrl}
                        alt={vehiclesImage.description}
                        width={600}
                        height={400}
                        className="rounded-lg object-contain mx-auto"
                        data-ai-hint={vehiclesImage.imageHint}
                    />
                )}
            </div>

            {/* Right Column */}
            <div className="space-y-10">
                {differentialsData.slice(2, 4).map((item) => (
                     <div key={item.title} className="flex items-start gap-4">
                        <div className="flex-shrink-0 bg-primary/10 p-3 rounded-full">
                            {item.icon}
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">{item.title}</h3>
                            <p className="text-muted-foreground mt-1">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>

        </div>
      </div>
    </section>
  );
}
