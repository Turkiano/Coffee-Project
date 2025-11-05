// src/pages/Orders.tsx
import { useEffect, useState } from "react";
import api from "@/api";
import { OrderTypes } from "@/types";
import { Card, CardContent } from "@/components/ui/card";

export default function Orders() {
  const [orders, setOrders] = useState<OrderTypes[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get("/orders", {
          headers: { authorization: `bearer ${token}` },
        });
        setOrders(res.data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-xl font-bold mb-4">My Orders</h1>
      <div className="grid gap-4">
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          orders.map((order) => (
            <Card key={order.orderId}>
              <CardContent className="p-4">
                <p>
                  <strong>Order ID:</strong> {order.orderId}
                </p>
                <p>
                  <strong>Status:</strong> {order.status}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(order.orderDate).toLocaleString()}
                </p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
