import { getConnection } from "../../config/database_config";
import { addProductToCartQuery, getCloseOrderQuery, createCartToUserQuery, getCartByUserIDQuery, getCartDetailsByCartIDQuery, getCartPriceQuery, isCartExistQuery, isProductInCartQuery, orderCartQuery, removeProductToCartQuery, updateProductQuantityQuery, getUnavailableShippingDatesQuery, getAllOrdersQuery, deleteAllProductsFromCartQuery } from "../helpers/queries";
import { ICart, ICartDetails, ICartDetailsResponse } from "../models/cart_details";
import { IOrder } from "../models/order";

export async function getCartDetailsByIDService(cart_id: number): Promise<ICartDetailsResponse[]> {
    const query = getCartDetailsByCartIDQuery();
    const [result] = await getConnection().execute(query, [cart_id]);
    return result;
}
export async function getCartByUserIDService(user_id: number): Promise<ICart> {
    const query = getCartByUserIDQuery();
    const [result] = await getConnection().execute(query, [user_id]);
    return result[0];
}
export async function createCartToUserService(user_id: number): Promise<any> {
    const query = createCartToUserQuery();
    const [result] = await getConnection().execute(query, [user_id]);
    return result;
}
export async function addProductToCartService(product_id: number, quantity: number, total_price: number, cart_id: number): Promise<any> {
    const query = addProductToCartQuery();
    const [result] = await getConnection().execute(query, [product_id, quantity, total_price, cart_id]);
    return result;
}
export async function updateQuantityService(quantity: number, total_price: number, product_id: number, cart_id: number): Promise<any> {
    const query = updateProductQuantityQuery();
    const [result] = await getConnection().execute(query, [quantity, total_price, product_id, cart_id]);
    return result;
}
export async function removeProductFromCartService(cart_id: number, product_id: number): Promise<any> {
    const query = removeProductToCartQuery();
    const [result] = await getConnection().execute(query, [cart_id, product_id]);
    return result;
}
export async function deleteAllProductsFromCartService(cart_id: number): Promise<any> {
    const query = deleteAllProductsFromCartQuery();
    const [result] = await getConnection().execute(query, [cart_id]);
    return result;
}
export async function orderCartService(orderDetailsObject: IOrder): Promise<any> {
    const query = orderCartQuery();
    const [result] = await getConnection().execute(query, Object.values(orderDetailsObject));
    if (result?.affectedRows === 1) {
        const closeOrderQuery = getCloseOrderQuery();
        const [closeOrderResult] = await getConnection().execute(closeOrderQuery, [orderDetailsObject?.cart_id]);
        if (closeOrderResult?.affectedRows === 1) return result
        else return false
    } else return false
}
export async function isCartExist(cart_id: number): Promise<ICart> {
    const query = isCartExistQuery();
    const [result] = await getConnection().execute(query, [cart_id]);
    return result[0];
}
export async function isProductInCartService(cart_id: number, product_id: number): Promise<ICartDetails> {
    const query = isProductInCartQuery();
    const [result] = await getConnection().execute(query, [cart_id, product_id]);
    return result[0];
}
export async function getCartPriceService(cart_id: number): Promise<number> {
    const query = getCartPriceQuery();
    const [result] = await getConnection().execute(query, [cart_id]);
    if (result[0]?.total_cart_price) return parseInt(result[0]?.total_cart_price);
    else return 0
}
export async function getUnavailableShippingDatesService(): Promise<any> {
    const query = getUnavailableShippingDatesQuery();
    const [result] = await getConnection().query(query);
    return result;
}
export async function getAllOrdersService(): Promise<any> {
    const query = getAllOrdersQuery();
    const [result] = await getConnection().query(query);
    return result;
}
