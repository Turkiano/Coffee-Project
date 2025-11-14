// src/pages/Orders.tsx
import { useEffect, useState } from "react";
import api from "@/api";
import { OrderTypes } from "@/types";
import { Card, CardContent } from "@/components/ui/card";

//testing01234

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
  {order.orderDate
    ? new Date(order.orderDate).toLocaleString()
    : "No date available"}
</p>
<h3 className="mt-4 font-semibold">Items:</h3>
      <ul className="mt-2 space-y-2">
        {order.items.map((item, i) => (
          <li key={i} className="flex justify-between">
            <span>
              {item.productName} × {item.quantity}
            </span>
            <span>{item.unitPrice} SAR</span>
          </li>
        ))}
      </ul> 

<p className="font-bold mt-3">Total: {order.totalPrice} SAR</p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
