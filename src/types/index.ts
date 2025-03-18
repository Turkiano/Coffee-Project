
export type ProductTypes = {
    productId: string//change it from id to productId
    name: string
    categoryId: string
    price: number
}

export const  Role = {
    Admin: "Admin",
    Customer: "Customer"
} as const


