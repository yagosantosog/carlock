"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button, buttonVariants } from "@/components/ui/button";
import { MenuToggle } from "@/components/ui/menu-toggle";
import { cn } from "@/lib/utils";

export function Header() {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navLinks = [
    { href: "#features", label: "Serviços" },
    { href: "#about", label: "Sobre" },
    { href: "#differentials", label: "Diferenciais" },
    { href: "#services", label: "Soluções" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
          : "bg-transparent"
      )}
    >
      <nav className="container mx-auto flex h-24 items-center justify-between px-4">
        <Link href="/" className="flex items-center">
          <Image
            src={isScrolled ? "/logo.png" : "/logo_1.png"}
            alt="CarLock Logo"
            width={200}
            height={50}
          />
        </Link>
        <div className="hidden items-center gap-2 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                isScrolled ? "text-foreground/60 hover:text-foreground/80" : "text-white/80 hover:text-white"
              )}
            >
              {link.label}
            </Link>
          ))}
           <Button asChild size="lg" className="transition-transform duration-300 hover:scale-105 active:scale-95 ml-4">
            <Link href="https://api.whatsapp.com/send?phone=5516993166262" target="_blank">Fale Conosco</Link>
          </Button>
        </div>
        <Sheet open={open} onOpenChange={setOpen}>
            <Button
              size="icon"
              variant="outline"
              className={cn(
                "lg:hidden",
                isScrolled ? "text-foreground bg-background" : "text-white bg-transparent border-white/50 hover:bg-white/10 hover:text-white"
              )}
              onClick={() => setOpen(true)}
            >
              <MenuToggle
                strokeWidth={2}
                open={open}
                onOpenChange={setOpen}
                className="size-6"
              />
            </Button>
          <SheetContent
            className="bg-background/95 supports-[backdrop-filter]:bg-background/80 flex flex-col gap-0 backdrop-blur-lg p-0"
            showClose={false}
            side="left"
          >
            <SheetHeader className="p-4 flex-row items-center justify-between border-b">
              <Link href="/" className="flex items-center" onClick={() => setOpen(false)}>
                <Image src="/logo.png" alt="CarLock Logo" width={160} height={40} />
              </Link>
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <SheetDescription className="sr-only">Navegue pelas seções do site.</SheetDescription>
              <Button size="icon" variant="ghost" onClick={() => setOpen(false)}>
                  <MenuToggle
                    strokeWidth={2}
                    open={open}
                    onOpenChange={setOpen}
                    className="size-6"
                  />
              </Button>
            </SheetHeader>
            <div className="grid gap-y-2 overflow-y-auto px-4 pt-5 pb-5">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  className={buttonVariants({
                    variant: "ghost",
                    className: "justify-start text-lg",
                  })}
                  href={link.href}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </div>
            <SheetFooter className="p-4 mt-auto border-t">
              <Button asChild size="lg" className="w-full">
                <Link href="https://api.whatsapp.com/send?phone=5516993166262" target="_blank">Fale Conosco</Link>
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
