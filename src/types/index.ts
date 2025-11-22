export type UserTypes = {
  id: string;
  firstName: string;
  lastName: string;
  phone: number;
  email: string;
  role: RoleTypes;
  createdAt: string;
};

export type ProductTypes = {
  productId: string;
  name: string;
  categoryId: string;
  price: number;
  image: string;
  quantity: number;
  createdAt: string;
  description: string;
};

export type CategoryTypes = {
  categoryId: string;
  name: string;
  createdAt: string;
};

// Define a type for Role based on the values of the Role object
export type RoleTypes = keyof typeof Role;

export const Role = {
  Admin: "Admin",
  Customer: "Customer",
} as const;

export type OrderStatus = "Pending" | "Processing" | "Completed" | "Cancelled";

export type OrderItemTypes = {
  productId: string;
  quantity: number;
  productName: string;
  unitPrice: number;
};

export type OrderTypes = {
  orderId?: string;
  orderDate?: string;
  status: OrderStatus;
  items: OrderItemTypes[];
  totalPrice: number;
};

export type OrderResponse = {
  orderId: string;
  userId: string;              // ⬅️ backend sends this
  orderDate: string;
  status: OrderStatus;
  totalPrice: number;
  items: OrderItemTypes[];
};


