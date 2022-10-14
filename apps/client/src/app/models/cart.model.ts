export interface ICartDetail {
    cart_id: number,
    product_id: number,
    name: string,
    price: number,
    quantity: number,
    total_price: number,
}
export interface ICheckoutCart {
    city: string,
    street: string,
    date: Date,
    credit_card: string,
}
export interface IUnavailableDate {
    date: Date,
    shipping_date_count: number,
}
export interface IOrder {
    id: number,
    user_id: number,
    cart_id: number,
    total_price: number,
    city: string,
    street: string,
    date: Date,
    order_at:Date,
    credit_card: string,
}