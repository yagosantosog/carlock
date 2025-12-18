
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Check } from "lucide-react";

const highlights = [
    "Localização em Tempo Real",
    "Bloqueio Remoto do Veículo",
    "Cercas Virtuais e Alertas",
    "Histórico Completo de Rotas",
];

export function AppShowcase() {
    return (
        <section id="app-showcase" className="py-16 sm:py-24 bg-background">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Image Column */}
                    <div className="flex justify-center p-8">
                        <div className="relative aspect-[3/4] w-full max-w-sm rounded-lg overflow-hidden shadow-2xl transition-all duration-300 hover:scale-105">
                            <Image
                                src="/celular.png"
                                alt="Aplicativo CarLock em um celular"
                                fill
                                className="object-cover"
                                data-ai-hint="app screenshot"
                            />
                        </div>
                    </div>
                    {/* Content Column */}
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline relative pb-4">
                            Tecnologia na palma da sua mão
                            <span className="absolute bottom-0 left-0 h-1 w-20 bg-primary"></span>
                        </h2>
                        <p className="mt-8 text-lg text-muted-foreground">
                            Com nosso aplicativo intuitivo, você tem controle total sobre a segurança do seu veículo. Monitore, gerencie e proteja seu patrimônio de onde estiver, com agilidade e simplicidade.
                        </p>
                        <ul className="mt-8 space-y-4">
                            {highlights.map((text) => (
                                <li key={text} className="flex items-center gap-3">
                                    <div className="flex-shrink-0 flex items-center justify-center h-6 w-6 bg-green-500/10 text-green-500 rounded-full">
                                        <Check className="w-4 h-4" />
                                    </div>

                                    <span className="font-medium">{text}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-10">
                             <Button asChild size="lg" className="transition-transform duration-300 hover:scale-105 active:scale-95">
                                <Link href="https://api.whatsapp.com/send?phone=5516993166262" target="_blank">Fale com um especialista</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
