"use client";

import { removeCartUser } from "@/actions/cart.action";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { useCart } from "@/context/CartContext";
import React from "react";

export default function RemoveFromCartButton() {
  const { updateNumOfCartItems } = useCart();

  async function clearCartUser() {
    const res = await removeCartUser();
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
    <Button
      onClick={clearCartUser}
      className="capitalize"
      variant={"destructive"}>
      Remove all products
    </Button>
  );
}
