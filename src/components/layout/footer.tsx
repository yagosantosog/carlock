import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Phone } from "lucide-react";

const footerSections = [
  {
    title: "SOBRE",
    content: (
        <p className="text-sm text-muted-foreground text-justify">
            Somos uma Empresa de Sistema de Rastreamento de Veículos situada no município de Franca-SP, com 5 anos de experiência no mercado e que busca oferecer seviços garatindo a segurança, diante a alta tecnologia, de forma ágil e sem preceitos. Realizamos atendimentos em todo Brasil.
        </p>
    ),
  },
  {
    title: "MENU",
    content: (
      <ul className="space-y-2 text-sm">
        <li><Link href="#" className="text-muted-foreground hover:text-primary">Home</Link></li>
        <li><Link href="#services" className="text-muted-foreground hover:text-primary">Soluções</Link></li>
        <li><Link href="#about" className="text-muted-foreground hover:text-primary">Sobre</Link></li>
        <li><Link href="#differentials" className="text-muted-foreground hover:text-primary">Diferenciais</Link></li>
        <li><Link href="#features" className="text-muted-foreground hover:text-primary">Serviços</Link></li>
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
        <Link href="https://api.whatsapp.com/send?phone=5516993166262" target="_blank" className="flex items-center gap-2 text-muted-foreground hover:text-primary">
            <Phone className="w-4 h-4"/>
            <span>(16) 99316-6262</span>
        </Link>
        <div className="flex items-center space-x-4 pt-2">
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
];

export function Footer() {
  return (
    <footer className="bg-zinc-900 text-background">
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
            <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center">
                <div className="flex items-center mb-4 md:mb-0">
                  <Image src="/logo_1.png" alt="CarLock Logo" width={120} height={30} />
                </div>
                <p className="text-center text-sm text-muted-foreground">
                    © {new Date().getFullYear()} CarLock. Todos os direitos reservados.
                </p>
            </div>
        </div>
    </footer>
  );
}
