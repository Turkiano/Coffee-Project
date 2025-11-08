import api from "@/api";
import { OrderTypes } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export default function Receipt() {
  const { orderId } = useParams();
  const {
    data: order,
    isLoading,
    error,
  } = useQuery<OrderTypes>({
    queryKey: ["order", orderId],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const res = await api.get(`/orders/${orderId}`, {
        headers: { authorization: `bearer ${token}` },
      });
      return res.data;
    },
  });

  if (isLoading) return <p>Loading receipt...</p>;
  if (error) return <p>Failed to load receipt.</p>;
  if (!order) return <p>No order found.</p>;

  return (
    <div className="p-5 max-w-lg mx-auto border rounded-lg shadow">
      <h2 className="text-xl font-bold mb-3">Order Receipt</h2>
      <p>
        <strong>Order ID:</strong> {order.orderId}
      </p>
      <p>
        <strong>Status:</strong> {order.status}
      </p>
      <p>
        <strong>Date:</strong>{" "}
        {order?.orderDate ? new Date(order.orderDate).toLocaleString() : "N/A"}
      </p>{" "}
      <p className="mt-4">Items and total not available.</p>
    </div>
  );
}
