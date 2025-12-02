import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Phone } from "lucide-react";

interface MenuItem {
  title: string;
  links: {
    text: string;
    url: string;
    isExternal?: boolean;
  }[];
}

const menuItems: MenuItem[] = [
    {
      title: "MENU",
      links: [
        { text: "Home", url: "#" },
        { text: "Soluções", url: "#services" },
        { text: "Sobre", url: "#about" },
        { text: "Diferenciais", url: "#differentials" },
        { text: "Serviços", url: "#features" },
      ],
    },
    {
      title: "SERVIÇOS",
      links: [
        { text: "Rastreador para carros", url: "#services" },
        { text: "Rastreador para motos", url: "#services" },
        { text: "Rastreador para caminhões", url: "#services" },
      ],
    },
    {
      title: "INFORMAÇÕES",
      links: [
        { text: "(16) 99316-6262", url: "https://api.whatsapp.com/send?phone=5516993166262", isExternal: true },
      ],
    },
    {
      title: "Social",
      links: [
        { text: "Facebook", url: "#" },
        { text: "Instagram", url: "#" },
      ],
    },
  ];

const copyright = `© ${new Date().getFullYear()} CarLock. Todos os direitos reservados.`;


export function Footer() {
  return (
    <footer className="bg-zinc-900 text-background py-16 sm:py-24">
      <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            <div className="col-span-1 md:col-span-2 lg:col-span-2 mb-8 lg:mb-0">
               <Link href="/" className="flex items-center gap-2">
                  <Image src="/logo_1.png" alt="CarLock Logo" width={160} height={40} />
               </Link>
              <p className="mt-4 text-sm text-muted-foreground text-justify">
                  Somos uma Empresa de Sistema de Rastreamento de Veículos situada no município de Franca-SP, com 5 anos de experiência no mercado e que busca oferecer seviços garatindo a segurança, diante a alta tecnologia, de forma ágil e sem preceitos. Realizamos atendimentos em todo Brasil.
              </p>
            </div>
            
            {menuItems.slice(0, 2).map((section) => (
              <div key={section.title}>
                <h3 className="mb-4 font-bold text-white">{section.title}</h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.text} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                      <Link href={link.url}>{link.text}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

             <div>
                <h3 className="mb-4 font-bold text-white">CONTATO</h3>
                <ul className="space-y-3">
                    <li className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                        <Link href="https://api.whatsapp.com/send?phone=5516993166262" target="_blank" className="flex items-center gap-2">
                            <Phone className="w-4 h-4"/>
                            <span>(16) 99316-6262</span>
                        </Link>
                    </li>
                </ul>
                <div className="flex items-center space-x-4 pt-4">
                  <Link href="#" className="text-muted-foreground hover:text-primary" aria-label="Facebook">
                    <Facebook className="h-5 w-5" />
                  </Link>
                  <Link href="#" className="text-muted-foreground hover:text-primary" aria-label="Instagram">
                    <Instagram className="h-5 w-5" />
                  </Link>
                </div>
              </div>
          </div>
          <div className="mt-24 flex flex-col justify-between gap-4 border-t border-gray-700 pt-8 text-sm font-medium text-muted-foreground md:flex-row md:items-center">
            <p>{copyright}</p>
          </div>
      </div>
    </footer>
  );
};
