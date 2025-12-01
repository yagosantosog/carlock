import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const testimonials = [
  {
    name: "João Silva",
    title: "Cliente Satisfeito",
    quote: "O serviço da CarLock me deu a tranquilidade que eu precisava. O rastreamento é super preciso e o aplicativo é muito fácil de usar. Recomendo!",
    avatarId: "testimonial-1",
  },
  {
    name: "Maria Oliveira",
    title: "Frotista",
    quote: "Gerencio uma pequena frota e o sistema da CarLock foi um divisor de águas. Consigo otimizar rotas e garantir a segurança dos meus veículos.",
    avatarId: "testimonial-2",
  },
  {
    name: "Carlos Pereira",
    title: "Cliente Satisfeito",
    quote: "Tive meu carro roubado e, graças ao bloqueio remoto da CarLock, consegui recuperá-lo em menos de uma hora. Valeu cada centavo!",
    avatarId: "testimonial-3",
  },
];

export function Testimonials() {
  const imageMap = new Map(PlaceHolderImages.map(i => [i.id, i]));

  return (
    <section id="testimonials" className="py-16 sm:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">
            O que nossos clientes dizem
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            A confiança dos nossos clientes é o nosso maior ativo.
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-1 lg:grid-cols-3">
          {testimonials.map((testimonial) => {
            const avatar = imageMap.get(testimonial.avatarId);
            return (
              <Card key={testimonial.name} className="flex flex-col justify-between">
                <CardContent className="pt-6">
                  <blockquote className="italic text-lg text-foreground">
                    "{testimonial.quote}"
                  </blockquote>
                </CardContent>
                <div className="flex items-center p-6 pt-0">
                  {avatar && (
                     <Image
                      src={avatar.imageUrl}
                      alt={`Avatar de ${testimonial.name}`}
                      width={48}
                      height={48}
                      className="rounded-full mr-4"
                      data-ai-hint={avatar.imageHint}
                    />
                  )}
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
