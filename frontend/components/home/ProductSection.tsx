import { ProductCard } from "../ui/ProductCard";

const DUMMY_PRODUCTS = [
  { id: 1, name: "iPhone 15 Pro Max", price: 1399, image: "https://unsplash.com" },
  { id: 2, name: "MacBook Air M3", price: 1199, image: "https://unsplash.com" },
  { id: 3, name: "AirPods Max", price: 549, image: "https://unsplash.com" },
  { id: 4, name: "iPad Pro 12.9", price: 1099, image: "https://unsplash.com" },
];

export const ProductSection = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-32">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <div className="space-y-4">
          <h2 className="text-5xl font-black text-gray-900 tracking-tighter leading-none">
            Saýlanan <br /> <span className="text-blue-600">Önümler.</span>
          </h2>
          <p className="text-gray-500 font-medium max-w-sm">
            Iň täze tehnologiýalar we minimalist dizaýnyň birleşmesi.
          </p>
        </div>
        <div className="flex gap-4">
          {/* Sahypalama ýa-da Filter düwmeleri bura gelip biler */}
          <button className="text-[11px] font-black uppercase tracking-widest px-8 py-4 border-2 border-gray-100 rounded-2xl hover:border-blue-600 transition-all">
            Ählisini Gör
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {DUMMY_PRODUCTS.map((product) => (
          <ProductCard 
            key={product.id}
            name={product.name}
            price={product.price}
            image={product.image}
          />
        ))}
      </div>
    </section>
  );
};
