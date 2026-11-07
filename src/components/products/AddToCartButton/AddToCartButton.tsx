"use client";
import { addToCart } from "@/actions/cart.action";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { useCart } from "@/context/CartContext";

interface AddToCartButtonProps extends React.ComponentProps<typeof Button> {
  productId: string;
}

export default function AddToCartButton({
  productId,
  variant,
  ...props
}: AddToCartButtonProps) {
  const { updateNumOfCartItems } = useCart();
  async function addProductToCart(productId: string) {
    const res = await addToCart(productId);
    console.log("res", res);
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
    <Button
      onClick={() => addProductToCart(productId)}
      variant={variant}
      className="capitalize w-full"
      {...props}>
      Add To Cart
    </Button>
  );
}
