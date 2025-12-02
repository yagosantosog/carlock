import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { Features } from "@/components/sections/features";
import { Services } from "@/components/sections/services";
import { Differentials } from "@/components/sections/differentials";
import { Clients } from "@/components/sections/clients";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Features />
        <Differentials />
        <Services />
        <Clients />
      </main>
      <Footer />
    </div>
  );
}
