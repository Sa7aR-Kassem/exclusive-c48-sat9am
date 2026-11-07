import { Brand } from "./brand.interface"
import { Category } from "./category.interface"
import { Subcategory } from "./subcategory.interface"

export interface CartResponse {
    status: string
    message: string
    numOfCartItems: number
    cartId: string
    data: CartDetails
}

export interface CartDetails {
    _id: string
    cartOwner: string
    products: ProductCart[]
    createdAt: string
    updatedAt: string
    __v: number
    totalCartPrice: number
}

export interface ProductCart {
    count: number
    _id: string
    product: ProductCartDetails
    price: number
}

export interface ProductCartDetails {
    subcategory: Subcategory[]
    _id: string
    title: string
    slug: string
    quantity: number
    imageCover: string
    category: Category
    brand: Brand
    ratingsAverage: number
    id: string
}
