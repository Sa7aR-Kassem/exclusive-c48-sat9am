import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { getCartUser } from "@/actions/cart.action";
import { CartDetails } from "@/interfaces/cart.interface";
import ProductTableRow from "@/components/cart/ProductTableRow/ProductTableRow";
import RemoveFromCartButton from "@/components/cart/RemoveFromCartButton/RemoveFromCartButton";

export default async function CartPage() {
  const { data }: { data: CartDetails } = await getCartUser();

  console.log("cartResponse", data);

  return (
    <section className="py-12">
      <div className="container mx-auto sm:px-4">
        {data.products?.length > 0 ? (
          <>
            <section className="mb-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="max-w-96 ">Product</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead className="text-right">Sub Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.products.length > 0 &&
                    data.products.map((product) => (
                      <ProductTableRow
                        key={product.product._id}
                        product={product}
                      />
                    ))}
                </TableBody>
              </Table>
            </section>

            <section className="flex items-center justify-between mb-6">
              <Button
                className="capitalize"
                variant={"outline"}
                render={<Link href={"/products"}>Return to shop</Link>}>
                <Link href={"/products"}>Return to shop</Link>
              </Button>
              <RemoveFromCartButton />
            </section>

            <section className="flex items-center justify-between mb-6">
              <form className="flex items-center gap-2">
                <Input />
                <Button className="capitalize" variant={"destructive"}>
                  apply coupon
                </Button>
              </form>

              <Card className="">
                <CardContent>
                  <div>
                    <h3>Cart Total</h3>
                    Total: {data.totalCartPrice} EGP
                  </div>

                  <Button
                    className="capitalize"
                    variant={"destructive"}
                    render={
                      <Link href={`/checkout`}>Proceed to checkout </Link>
                    }></Button>
                </CardContent>
              </Card>
            </section>
          </>
        ) : (
          <p>
            No Products in cart, continue shopping from
            <Link href={"/products"}>here</Link>
          </p>
        )}
      </div>
    </section>
  );
}
