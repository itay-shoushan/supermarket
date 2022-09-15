export interface IProduct {
    id: number,
    name: string,
    category_id: number,
    price: number,
    picture: string,
}
export interface IAddProduct {
    name: string,
    category_id: number,
    price: number,
    picture: string,
}
export interface IProductInCart {
    product: IProduct,
    quantity: number,
}
