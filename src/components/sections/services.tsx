import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Car, Bike, Truck, Wifi } from "lucide-react";
import Link from "next/link";

const servicesData = [
  {
    icon: <Car className="w-8 h-8 text-primary" />,
    title: "Rastreador para carros",
    description: "O rastreador para carro da CarLock oferece a você uma maior segurança, a partir de uma alta tecnologia e agilidade, o que permite o controle do seu veículo sem ter problemas com recursos. Além do mais, os rastreadores CarLock são compatíveis a todas as marcas de carros que estão no mercado, assim desempenhando suas funcionalidades em todos os modelos e anos.",
  },
  {
    icon: <Bike className="w-8 h-8 text-primary" />,
    title: "Rastreador para motos",
    description: "A CarLock dispõe de rastreador exclusivo para motos, o que garante confiança e segurança ao estacioná-la em qualquer lugar. Os benefícios vão além da segurança contra furtos e roubos, o rastreador também permite o acompanhamento dos percursos realizados por seus funcionários em tempos real, o que concede em muitos casos um melhor gerenciamento e planejamento de praxes.",
  },
  {
    icon: <Truck className="w-8 h-8 text-primary" />,
    title: "Rastreador para caminhões",
    description: "Com a visão ampla, a CarLock enxergou a importância de também rastrear as cargas de caminhão, com isso oferece rastreadores próprios para essa finalidade. Os mesmos são oriundos da alta tecnologia e permitem o controle de modo eficaz.",
  },
];

export function Services() {
  return (
    <section id="services" className="py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">
            Nossos Serviços
          </h2>
          <div className="flex justify-center items-center mt-4 mb-2">
            <Wifi className="text-primary" />
          </div>
          <p className="max-w-xl mx-auto text-muted-foreground">
            Com os rastreadores para carros e motos da CarLock você pode
            rastrear seu veículo de uma forma rápido e fácil.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service) => (
            <Card key={service.title} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="flex flex-col items-start p-6">
                <div className="flex-shrink-0 bg-primary/10 p-4 rounded-full mb-4">
                  {service.icon}
                </div>
                <CardTitle className="text-xl font-bold">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <p className="text-muted-foreground mb-6">{service.description}</p>
                <Link href="#" className="font-semibold text-primary hover:underline">
                  SAIBA MAIS
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
