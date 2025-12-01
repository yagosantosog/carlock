import Link from "next/link";
import { CarLockLogo } from "@/components/icons/logo";
import { Facebook, Instagram, Phone } from "lucide-react";

const footerSections = [
  {
    title: "SOBRE NÓS",
    content: (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Somos uma empresa de sistema de rastreamento de veículos com 5 anos de
          experiência. Buscamos oferecer serviços que garantem segurança através
          de alta tecnologia, de forma ágil. Realizamos atendimentos em todo o
          Brasil.
        </p>
        <div className="flex items-center space-x-4">
          <Link
            href="#"
            className="text-muted-foreground hover:text-primary"
            aria-label="Facebook"
          >
            <Facebook className="h-5 w-5" />
          </Link>
          <Link
            href="#"
            className="text-muted-foreground hover:text-primary"
            aria-label="Instagram"
          >
            <Instagram className="h-5 w-5" />
          </Link>
        </div>
      </div>
    ),
  },
  {
    title: "LINKS",
    content: (
      <ul className="space-y-2 text-sm">
        <li><Link href="#" className="text-muted-foreground hover:text-primary">Home</Link></li>
        <li><Link href="#features" className="text-muted-foreground hover:text-primary">Recursos</Link></li>
        <li><Link href="#differentials" className="text-muted-foreground hover:text-primary">Diferenciais</Link></li>
        <li><Link href="#pricing" className="text-muted-foreground hover:text-primary">Contrate Agora</Link></li>
        <li><Link href="#" className="text-muted-foreground hover:text-primary">Contato</Link></li>
      </ul>
    ),
  },
  {
    title: "NOSSOS SERVIÇOS",
    content: (
        <ul className="space-y-2 text-sm">
            <li><span className="text-muted-foreground">Rastreador para carros</span></li>
            <li><span className="text-muted-foreground">Rastreador para motos</span></li>
            <li><span className="text-muted-foreground">Rastreador para caminhões</span></li>
      </ul>
    ),
  },
  {
    title: "INFORMAÇÕES",
    content: (
      <div className="space-y-2 text-sm">
        <p className="text-muted-foreground">Entre em contato conosco.</p>
        <div className="flex items-center gap-2 text-muted-foreground">
            <Phone className="w-4 h-4"/>
            <span>(16) 99316-6262</span>
        </div>
      </div>
    ),
  },
];

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
        <div className="container mx-auto px-4 py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {footerSections.map((section) => (
                    <div key={section.title}>
                        <h3 className="text-lg font-semibold text-white mb-4 relative">
                            {section.title}
                            <span className="absolute bottom-[-8px] left-0 h-0.5 w-10 bg-primary"></span>
                        </h3>
                        {section.content}
                    </div>
                ))}
            </div>
        </div>
        <div className="border-t border-gray-700">
            <div className="container mx-auto px-4 py-4">
                <p className="text-center text-sm text-muted-foreground">
                    © {new Date().getFullYear()} CarLock. Todos os direitos reservados.
                </p>
            </div>
        </div>
    </footer>
  );
}