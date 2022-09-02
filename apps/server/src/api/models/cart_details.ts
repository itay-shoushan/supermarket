export interface ICartDetails{
    id: number,
    product_id: number,
    quantity: number,
    total_price: number,
    cart_id: number,
}
export interface ICart{
    id: number,
    user_id: string,
    created_at: Date,
    status:number
}
export interface ICartDetailsResponse{
    cart_id: number,
    product_id: number,
    quantity: number,
    total_price: number,
    created_at: Date,
    user_id: string,
}
