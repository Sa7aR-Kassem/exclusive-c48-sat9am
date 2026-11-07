import { getMyOrders } from "@/actions/order.action";

export default async function MyOrders() {
  const orders = await getMyOrders();
  console.log("orders", orders);

  return <div>MyOrders</div>;
}
