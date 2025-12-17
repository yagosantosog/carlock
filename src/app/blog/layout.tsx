import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-24 bg-background">
        {children}
      </main>
      <Footer />
    </div>
  );
}
