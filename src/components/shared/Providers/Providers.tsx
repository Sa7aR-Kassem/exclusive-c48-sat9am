"use client";
import CartProvider from "@/context/CartContext";
import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";

interface ProvidersProps {
  children: ReactNode;
}
export default function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <CartProvider>{children}</CartProvider>
    </SessionProvider>
  );
}
