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
  return (
    <section id="about" className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-12 items-center">
          <div>
            <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">
                5 Anos de Experiência em Segurança e Tecnologia
                </h2>
                <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                Somos uma empresa consolidada com 5 anos de experiência no mercado de rastreamento veicular. Nossa paixão é garantir sua segurança através de alta tecnologia, com agilidade e um atendimento que abrange todo o Brasil.
                </p>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                {aboutData.map((item) => (
                    <div key={item.title} className="flex flex-col items-center gap-4">
                        <div className="flex-shrink-0 bg-primary/10 p-4 rounded-full">
                           {item.icon}
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold">{item.title}</h3>
                            <p className="text-muted-foreground mt-2">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="mt-12 text-center">
                <Button asChild size="lg">
                    <Link href="#services">Conheça Nossas Soluções</Link>
                </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
