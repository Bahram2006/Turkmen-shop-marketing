import { Hero } from "@/components/home/Hero";
import { ProductSection } from "@/components/home/ProductSection";

export default function Home() {
  return (
    <main className="bg-white">
      <Hero />
      <ProductSection />
      {/* Indiki ädimde bura "Featured Collection" ýa-da "Footer" goşarys */}
    </main>
  );
}
