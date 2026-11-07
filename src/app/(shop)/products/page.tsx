import ProductCard from "@/components/products/ProductCard/ProductCard";
import { Product } from "@/interfaces/product.interface";
import { getProducts } from "@/services/products.service";
import { ProductsResponse } from "@/types/response.type";

export default async function ProductsPage() {
  const products: ProductsResponse = await getProducts();

  // console.log("products", products);

  return (
    <section className="py-12">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.data.map((product: Product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
