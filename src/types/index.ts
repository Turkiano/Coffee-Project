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
  orderItemsId?: string;
  orderId?: string;
  productId: string;
  quantity: number;
  price?: number;
  product?: ProductTypes; // ✅ include related product details
};

export type OrderTypes = {
  userId: string;
  orderId?: string;
  orderDate?: string;
  status: OrderStatus;
  items: OrderItemTypes[];
};
