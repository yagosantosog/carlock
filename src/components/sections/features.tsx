import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
    icon: <MapPin className="w-8 h-8 text-primary" />,
    title: "Rastreamento em Tempo Real",
    description: "Acompanhe a localização do seu veículo 24/7 com precisão e em tempo real.",
  },
  {
    icon: <ShieldAlert className="w-8 h-8 text-primary" />,
    title: "Alertas de Segurança",
    description: "Receba notificações instantâneas sobre ignição, movimento e excesso de velocidade.",
  },
  {
    icon: <History className="w-8 h-8 text-primary" />,
    title: "Histórico de Rotas",
    description: "Acesse o histórico detalhado de todas as rotas percorridas pelo seu veículo.",
  },
  {
    icon: <Lock className="w-8 h-8 text-primary" />,
    title: "Bloqueio Remoto",
    description: "Em caso de roubo, bloqueie seu veículo remotamente com apenas um clique.",
  },
  {
    icon: <Gauge className="w-8 h-8 text-primary" />,
    title: "Controle de Velocidade",
    description: "Monitore e seja alertado sempre que o limite de velocidade for ultrapassado.",
  },
  {
    icon: <SquareDashed className="w-8 h-8 text-primary" />,
    title: "Cerca Virtual",
    description: "Defina áreas seguras e receba alertas quando o veículo entrar ou sair delas.",
  },
];

export function Features() {
  return (
    <section id="features" className="py-16 sm:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">
            Tudo que você precisa para sua segurança
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Explore os recursos que fazem do CarLock a melhor solução de rastreamento veicular.
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featureData.map((feature, index) => (
            <Card key={index} className="flex flex-col items-center text-center p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <CardHeader className="p-0 flex flex-col items-center">
                <div className="flex items-center justify-center h-16 w-16 bg-primary/10 rounded-full mb-4">
                  {feature.icon}
                </div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardDescription className="mt-2">
                {feature.description}
              </CardDescription>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
