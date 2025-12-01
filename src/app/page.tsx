import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { Features } from "@/components/sections/features";
import { Pricing } from "@/components/sections/pricing";
import { Testimonials } from "@/components/sections/testimonials";
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
        <Clients />
        <Pricing />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}