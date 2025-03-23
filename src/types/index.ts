
export type ProductTypes = {
    productId: string
    name: string
    categoryId: string
    price: number
    image: string
    quantity: number
    createdAt: string
}

export const  Role = {
    Admin: "Admin",
    Customer: "Customer"
} as const


export type OrderTypes = {
    userId: string
    status: OrderStatus 
    items: OrderItemTypes []
}

type OrderStatus = "Pending" | "Processing" | "Completed" | "Cancelled";


export type OrderItemTypes = {
    orderItemsId: string 
    orderId: string
    productId: string 
    quantity: number 
    price: number
}