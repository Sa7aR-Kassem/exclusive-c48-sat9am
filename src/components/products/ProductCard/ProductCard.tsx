import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@/interfaces/product.interface";
import AddToCartButton from "../AddToCartButton/AddToCartButton";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="col-span-1">
      <div className="bg-gray-200 mb-4 relative overflow-hidden group">
        <Image
          src={product.imageCover}
          alt={product.title}
          width={180}
          height={200}
          className="mx-auto"
        />

        {/* <Button className="w-full rounded-sm absolute -bottom-10 invisible group-hover:visible group-hover:bottom-0">
          Add to card
        </Button> */}

        <AddToCartButton
          productId={product._id}
          variant={"default"}
          className="w-full rounded-sm absolute -bottom-10 invisible group-hover:visible group-hover:bottom-0"
        />
      </div>
      <h3 className="text-lg font-semibold mb-2 truncate" title={product.title}>
        <Link href={`/products/${product._id}`}>{product.title}</Link>
      </h3>
      <div className="flex gap-2">
        <p
          className={`text-gray-500 ${product?.priceAfterDiscount ? "line-through" : ""}`}>
          {product.price}
        </p>
        {product.priceAfterDiscount && (
          <p className="text-red-600">{product.priceAfterDiscount}</p>
        )}
      </div>

      <div className="flex items-center gap-2">
        <Star className="text-yellow-500 fill-yellow-500" />
        <span>{product.ratingsAverage}</span>
        <span>({product.ratingsQuantity})</span>
      </div>
    </div>
  );
}
