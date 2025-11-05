import { useEffect, useState } from "react";
import api from "@/api";
import { OrderTypes } from "@/types";

export function Orders() {
  const [orders, setOrders] = useState<OrderTypes[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get("/Orders", {
          headers: { authorization: `bearer ${token}` },
        });

        setOrders(res.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <p>Loading orders...</p>;
  if (orders.length === 0) return <p>No orders found.</p>;

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-xl font-semibold">Your Orders</h2>
    </div>
  );
}
