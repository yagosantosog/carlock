import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Car, Bike, Truck } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const servicesData = [
  {
    icon: <Car className="w-8 h-8 text-primary group-hover:text-white transition-colors duration-300" />,
    title: "Rastreador para Carros",
    description: "Tecnologia de ponta para total controle e segurança do seu carro. Monitore em tempo real, receba alertas e tenha a tranquilidade que você merece.",
  },
  {
    icon: <Bike className="w-8 h-8 text-primary group-hover:text-white transition-colors duration-300" />,
    title: "Rastreador para Motos",
    description: "Agilidade e precisão no rastreamento da sua moto. Estacione em qualquer lugar com a certeza de que seu patrimônio está protegido 24 horas por dia.",
  },
  {
    icon: <Truck className="w-8 h-8 text-primary group-hover:text-white transition-colors duration-300" />,
    title: "Rastreador para Frotas",
    description: "Gestão inteligente para sua frota de caminhões. Otimize rotas, controle entregas e garanta a segurança da sua carga com nossa solução completa.",
  },
];

export function Services() {
  return (
    <section id="services" className="py-16 sm:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">
            Soluções Completas em Rastreamento
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Oferecemos a tecnologia ideal para proteger cada tipo de veículo com
            precisão e confiabilidade.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service) => (
            <Card
              key={service.title}
              className="group relative overflow-hidden rounded-lg border bg-card shadow-md transition-all duration-300 hover:border-primary hover:shadow-2xl hover:-translate-y-2 flex flex-col"
            >
              <CardHeader className="flex flex-col items-start p-8">
                <div className="flex-shrink-0 bg-primary/10 p-4 rounded-full mb-5 transition-colors duration-300 group-hover:bg-primary">
                  {service.icon}
                </div>
                <CardTitle className="text-2xl font-bold">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-8 pt-0 flex flex-col flex-grow">
                <p className="text-muted-foreground mb-6 flex-grow">{service.description}</p>
                <Button asChild variant="link" className="p-0 h-auto self-start font-semibold text-lg text-primary">
                   <Link href="#">Saiba Mais</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
