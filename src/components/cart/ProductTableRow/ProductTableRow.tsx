"use client";
import { TableCell, TableRow } from "@/components/ui/table";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ProductCart } from "@/interfaces/cart.interface";
import { X } from "lucide-react";
import { removeFromCart, updateProductQty } from "@/actions/cart.action";
import { toast } from "@/components/ui/toast";
import { useCart } from "@/context/CartContext";

interface ProductTableRowProps {
  product: ProductCart;
}

export default function ProductTableRow({ product }: ProductTableRowProps) {
  const { updateNumOfCartItems } = useCart();

  async function updateProductQuantity(productId: string, count: number) {
    const res = await updateProductQty(productId, count);
    console.log("updateProductQuantity", res);
    if (res.status === "success") {
      toast.add({
        type: "success",
        title: res.message,
      });
      updateNumOfCartItems(res.numOfCartItems);
    } else {
      toast.add({
        type: "error",
        title: res.message,
      });
    }
  }
  async function removeProductFromCart(productId: string) {
    const res = await removeFromCart(productId);
    console.log("removeProductFromCart", res);

    if (res.status === "success") {
      toast.add({
        type: "success",
        title: res.message,
      });
      updateNumOfCartItems(res.numOfCartItems);
    } else {
      toast.add({
        type: "error",
        title: res.message,
      });
    }
  }

  return (
    <TableRow>
      <TableCell className="font-medium">
        <div className="flex items-center gap-2 relative">
          <Button
            className="absolute -top-1 -inset-s-1 size-4"
            variant={"destructive"}
            size={"xs"}
            onClick={() => removeProductFromCart(product.product._id)}>
            <X />
          </Button>
          <Image
            src={product.product.imageCover}
            alt={product.product.title}
            width={54}
            height={54}
          />

          <h2 className="truncate" title={product.product.title}>
            {product.product.title}{" "}
          </h2>
        </div>
      </TableCell>
      <TableCell>{product.price}</TableCell>
      <TableCell>
        <div className="flex gap-2 items-center">
          <Button
            onClick={() =>
              updateProductQuantity(product.product._id, product.count - 1)
            }
            size="xs"
            variant={"outline"}>
            -
          </Button>
          {product.count}
          <Button
            onClick={() =>
              updateProductQuantity(product.product._id, product.count + 1)
            }
            size="xs"
            variant={"outline"}>
            +
          </Button>
        </div>
      </TableCell>
      <TableCell className="text-right">
        {product.count * product.price}
      </TableCell>
    </TableRow>
  );
}
