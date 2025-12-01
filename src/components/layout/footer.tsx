import Link from "next/link";
import { CarLockLogo } from "@/components/icons/logo";
import { Facebook, Instagram, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-muted/40">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center space-x-2">
            <CarLockLogo className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold">CarLock</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} CarLock. Todos os direitos reservados.
          </p>
          <div className="flex items-center space-x-4">
            <Link href="#" className="text-muted-foreground hover:text-primary" aria-label="Facebook">
              <Facebook className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary" aria-label="Twitter">
              <Twitter className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary" aria-label="Instagram">
              <Instagram className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
