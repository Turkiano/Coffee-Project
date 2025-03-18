
export type ProductTypes = {
    productId: string//change it from id to productId
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


