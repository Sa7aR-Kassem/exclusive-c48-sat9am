import ProductCard from "@/components/products/ProductCard/ProductCard";
import SectionTitle from "@/components/shared/SectionTitle/SectionTitle";
import { Button } from "@/components/ui/button";
import { getProducts } from "@/services/products.service";
import { ProductsResponse } from "@/types/response.type";
import Link from "next/link";

export default async function Products() {
  const products: ProductsResponse = await getProducts();

  const popular = products.data.filter((product) => product.sold > 2000);
  // console.log("products", products);

  return (
    <div className="py-12">
      <SectionTitle title="Our Products" subtitle="Explore Our Products" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
        {popular.length > 0 ? (
          <>
            {popular.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </>
        ) : (
          <p>No Products to Show</p>
        )}
      </div>

      {popular.length > 0 && (
        <div className="flex justify-center text-center">
          <Button
            className={"rounded-sm"}
            variant={"default"}
            render={<Link href={"/products"} />}>
            View all products{" "}
          </Button>
        </div>
      )}
    </div>
  );
}
