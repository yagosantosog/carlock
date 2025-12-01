import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Básico",
    price: "R$ 49,90",
    features: [
      "Rastreamento em Tempo Real",
      "Histórico de 30 dias",
      "Alertas de Ignição",
    ],
    isPopular: false,
  },
  {
    name: "Padrão",
    price: "R$ 69,90",
    features: [
      "Todos os recursos do plano Básico",
      "Bloqueio Remoto",
      "Controle de Velocidade",
      "Cerca Virtual",
    ],
    isPopular: true,
  },
  {
    name: "Premium",
    price: "R$ 99,90",
    features: [
      "Todos os recursos do plano Padrão",
      "Histórico de 90 dias",
      "Suporte Prioritário",
      "Relatórios Avançados",
    ],
    isPopular: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">
            Planos que cabem no seu bolso
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Escolha o plano ideal para suas necessidades e comece a rastrear hoje mesmo.
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3 items-center">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`flex flex-col ${plan.isPopular ? "border-primary shadow-lg scale-105" : "border-border"}`}
            >
              <CardHeader className="text-center">
                {plan.isPopular && (
                  <div className="text-sm font-semibold text-primary mb-2">MAIS POPULAR</div>
                )}
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>
                  <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                  /mês
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-4">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-1" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant={plan.isPopular ? "default" : "outline"}>
                  Contratar
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
