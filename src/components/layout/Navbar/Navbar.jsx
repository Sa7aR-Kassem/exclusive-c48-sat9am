"use client";

import { Heart, MenuIcon, ShoppingCart, User } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import { getCartUser } from "@/actions/cart.action";
import { useCart } from "@/context/CartContext";

// interface NavbarProps {
//   className?: string;
// }

const links = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "Products",
    path: "/products",
  },
  {
    label: "Categories",
    path: "/categories",
  },
  {
    label: "Brands",
    path: "/brands",
  },
];

const Navbar = () => {
  const pathname = usePathname();
  const { numOfCartItems, updateNumOfCartItems, updateCartId } = useCart();

  const { data: userData, status } = useSession();
  console.log("session", { userData, status });

  function logoutHandler() {
    signOut({ callbackUrl: "/" });
  }

  useEffect(() => {
    if (status === "authenticated") {
      getCartUser().then(function (data) {
        updateNumOfCartItems(data.numOfCartItems);
        console.log("Navbar", data.cartId);

        updateCartId(data.cartId);
      });
    }
  }, [updateNumOfCartItems, status, updateCartId]);

  return (
    <section className={cn("py-4")}>
      <div className="container mx-auto sm:px-4">
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-lg font-semibold tracking-tighter">
              Exclusive
            </span>
          </Link>
          <NavigationMenu className="hidden lg:block">
            <NavigationMenuList>
              {links.map((link) => (
                <NavigationMenuItem key={link.path}>
                  <NavigationMenuLink
                    href={link.path}
                    className={cn(
                      navigationMenuTriggerStyle(),
                      pathname == link.path ? "bg-black text-white" : "",
                    )}>
                    {link.label}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          <div className="hidden items-center gap-4 lg:flex">
            {status === "unauthenticated" || status === "loading" ? (
              <>
                <Button
                  render={<Link href={"register"}>Sign up</Link>}
                  variant="outline">
                  <Link href={"register"}>Sign up</Link>
                </Button>
                <Button render={<Link href={"/login"}>Sign in</Link>}></Button>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Link href="/wishlist" className="relative">
                  <Heart size={32} />
                  <Badge
                    variant={"destructive"}
                    className="absolute -top-2 -inset-e-2 z-10">
                    5
                  </Badge>
                </Link>
                <Link href="/cart" className="relative">
                  <ShoppingCart size={32} />
                  <Badge
                    variant={"destructive"}
                    className="absolute -top-2 -inset-e-2 z-10">
                    {numOfCartItems}
                  </Badge>
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={<User size={32} />}></DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        <Link href={"/profile"}>Profile</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href={"/allorders"}>My Orders</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={logoutHandler}>
                        Sign out
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>
          <Sheet>
            <SheetTrigger
              render={
                <Button variant="outline" size="icon">
                  <MenuIcon className="h-4 w-4" />
                </Button>
              }
              className="lg:hidden"></SheetTrigger>
            <SheetContent side="top" className="max-h-screen overflow-auto">
              <SheetHeader>
                <SheetTitle>
                  <Link href="/" className="flex items-center gap-2">
                    <span className="text-lg font-semibold tracking-tighter">
                      Exclusive
                    </span>
                  </Link>
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col p-4">
                <div className="flex flex-col gap-6">
                  {links.map((link) => (
                    <Link
                      key={link.path}
                      href={link.path}
                      className={cn(
                        "font-medium",
                        pathname == link.path ? "underline" : "",
                      )}>
                      {link.label}
                    </Link>
                  ))}
                </div>
                <div className="mt-6 flex flex-col gap-4">
                  {status === "unauthenticated" || status === "loading" ? (
                    <>
                      <Button
                        render={<Link href={"register"}>Sign up</Link>}
                        variant="outline"></Button>
                      <Button
                        render={<Link href={"/login"}>Sign in</Link>}></Button>
                    </>
                  ) : (
                    <>
                      <Link href={"/profile"}>Sahar</Link>
                      <Button variant="outline" onClick={logoutHandler}>
                        Sign out
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </section>
  );
};

export default Navbar;
