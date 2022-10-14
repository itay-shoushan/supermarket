export interface IOrder {
    user_id:string,
    cart_id:number,
    total_price:number,
    city: string,
    street: string,
    date: Date,
    credit_card: string,
}
