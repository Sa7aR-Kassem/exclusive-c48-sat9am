import AddToCartButton from "@/components/products/AddToCartButton/AddToCartButton";
import ProductCard from "@/components/products/ProductCard/ProductCard";
import ProductSlider from "@/components/products/ProductSlider/ProductSlider";
import SectionTitle from "@/components/shared/SectionTitle/SectionTitle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Product } from "@/interfaces/product.interface";
import { getProducts, getSingleProduct } from "@/services/products.service";
import { ProductsResponse } from "@/types/response.type";
import { Heart, Star } from "lucide-react";
import Image from "next/image";
import React from "react";

interface ProductDetailsProps {
  params: Promise<{ productId: string }>;
}

export default async function ProductDetails({ params }: ProductDetailsProps) {
  const { productId } = await params;
  // console.log("productId", productId);
  const { data: product }: { data: Product } =
    await getSingleProduct(productId);
  console.log(product);

  const {
    _id,
    imageCover,
    images,
    title,
    ratingsAverage,
    ratingsQuantity,
    description,
    price,
    priceAfterDiscount,
    category,
    brand,
  } = product;

  // const slides = product.map()

  const relatedProduct: ProductsResponse = await getProducts(category._id, 8);
  console.log("relatedProduct", relatedProduct);

  return (
    <>
      <section className="mb-12">
        <div className="container mx-auto sm:px-4">
          <div className="grid grid-cols-3 gap-8 items-center">
            <div className="col-span-2">
              <ProductSlider images={images} title={title} />
            </div>
            <div className="col-span-1">
              <h1 className="text-2xl font-bold mb-4">{title}</h1>

              <div className="flex items-center gap-2">
                <Star className="text-yellow-500 fill-yellow-500" />
                <span>{ratingsAverage}</span>
                <span>({ratingsQuantity})</span>
              </div>

              <div className="flex gap-2">
                <p
                  className={`text-gray-500  text-2xl ${priceAfterDiscount ? "line-through" : ""}`}>
                  {price}
                </p>
                {priceAfterDiscount && (
                  <p className="text-red-600  text-2xl">{priceAfterDiscount}</p>
                )}
              </div>

              <p className="mb-6 text-sm">{description}</p>

              <Badge variant={"outline"}>{category.name}</Badge>
              <Badge variant={"ghost"}>{brand.name}</Badge>

              <Separator className="my-6" />

              <div className="flex gap-4">
                {/* <Button variant={"destructive"} className="flex-1 rounded-0">
                Add to cat{" "}
              </Button> */}

                <AddToCartButton
                  productId={_id}
                  variant={"destructive"}
                  className="flex-1 rounded-0"
                />
                <Button
                  variant={"outline"}
                  size={"icon-lg"}
                  className="rounded-0">
                  <Heart />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="">
        <div className="container mx-auto sm:px-4">
          <SectionTitle title="Related Products" subtitle="Explore products" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {relatedProduct.data.map((product: Product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
