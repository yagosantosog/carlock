import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Target, Rocket, ShieldCheck } from "lucide-react";

const aboutData = [
    {
        icon: <Target className="w-8 h-8 text-primary" />,
        title: "Nossa Missão",
        description: "Oferecer segurança e tranquilidade através de tecnologia de rastreamento de ponta, acessível a todos.",
    },
    {
        icon: <Rocket className="w-8 h-8 text-primary" />,
        title: "Nossa Visão",
        description: "Ser a empresa líder e referência em inovação no mercado de rastreamento veicular em todo o Brasil.",
    },
    {
        icon: <ShieldCheck className="w-8 h-8 text-primary" />,
        title: "Nossos Valores",
        description: "Compromisso com a qualidade, excelência no atendimento, inovação constante e total dedicação ao cliente.",
    }
]

export function About() {
  const aboutImage = PlaceHolderImages.find((img) => img.id === "hero-image");

  return (
    <section id="about" className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-last lg:order-first">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">
              5 Anos de Experiência em Segurança e Tecnologia
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Somos uma empresa consolidada com 5 anos de experiência no mercado de rastreamento veicular. Nossa paixão é garantir sua segurança através de alta tecnologia, com agilidade e um atendimento que abrange todo o Brasil.
            </p>

            <div className="mt-10 space-y-8">
                {aboutData.map((item) => (
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
            
            <div className="mt-10">
                <Button asChild size="lg">
                    <Link href="#services">Conheça Nossas Soluções</Link>
                </Button>
            </div>
          </div>
          <div className="flex justify-center">
            {aboutImage && (
              <Image
                src={aboutImage.imageUrl}
                alt={aboutImage.description}
                width={500}
                height={500}
                className="rounded-lg object-cover aspect-square"
                data-ai-hint={aboutImage.imageHint}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
