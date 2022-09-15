import { NextFunction, Request, Response } from 'express'
import { IOrder } from '../models/order';
import { addProductToCartService, createCartToUserService, deleteAllProductsFromCartService, getAllOrdersService, getCartByUserIDService, getCartDetailsByIDService, getCartPriceService, getUnavailableShippingDatesService, isCartExist, isProductInCartService, orderCartService, removeProductFromCartService, updateQuantityService } from '../services/carts';

export async function getCartDetailsByCartIDHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const cart_id = req?.params?.cart_id;
        if (!cart_id) return res.status(403).json({ message: "bad request" });
        const currentCart = await isCartExist(cart_id);
        if (!currentCart) return res.status(403).json({ message: "no open cart available for the certain id" });
        const cartDetails = await getCartDetailsByIDService(cart_id);
        if (cartDetails?.length === 0) return res.status(204).json({ message: "cart is empty", cartDetails: [] });
        else return res.status(200).json({ message: "ok", cartDetails })
    } catch (error) {
        return next(new Error("getCartDetailsByCartIDHandler" + error?.message));
    }
}
export async function getUnavailableShippingDatesHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const unavailableShippingDates = await getUnavailableShippingDatesService();
        if (!unavailableShippingDates) return res.status(404).json({ message: "somthing went wrong please try again" });
        else return res.status(200).json({ message: "ok", unavailable_shipping_dates: unavailableShippingDates });
    } catch (error) {
        return next(new Error("getUnavailableShippingDatesHandler" + error?.message));
    }
}
export async function getCartByUserIDHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const user_id = req?.params?.user_id;
        if (!user_id) return res.status(403).json({ message: "bad request" });
        const cart = await getCartByUserIDService(user_id);
        if (!cart) {
            const newCart = await createCartToUserService(user_id);
            if (newCart?.insertId) {
                const currentCart = await getCartByUserIDService(user_id);
                if (!currentCart) return res.status(404).json({ message: "getting cart details went wrong" });
                return res.status(200).json({ message: "cart details succeed", cart: currentCart });
            } else {
                return res.status(404).json({ message: "getting cart details went wrong" });
            }
        } else {
            return res.status(200).json({ message: "cart details succeed", cart });
        }
    } catch (error) {
        return next(new Error("getCartByUserIDHandler error" + error?.message));

    }
}
export async function getAllOrdersHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const allOrders = await getAllOrdersService();
        if (!allOrders) return res.status(404).json({ message: "no orders available" });
        else return res.status(200).json({ message: "ok", orders: allOrders });
    } catch (error) {
        return next(new Error("getAllOrdersHandler error" + error?.message));
    }
}
export async function addProductToCartByIDHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const cart_id = req?.params?.cart_id;
        const { product_id, quantity, total_price } = req?.body;
        if (!cart_id) return res.status(403).json({ message: "bad request" });
        const currentCart = await isCartExist(cart_id);
        if (!currentCart) return res.status(403).json({ message: "no open cart available for the certain id" });
        const isProductInCart = await isProductInCartService(cart_id, product_id);
        if (isProductInCart) {
            const newQuantity = isProductInCart?.quantity + quantity;
            const newTotalPrice = isProductInCart?.total_price + total_price;
            const result = await updateQuantityService(newQuantity, newTotalPrice, product_id, cart_id);
            if (!result || result?.affectedRows === 0) return res.status(400).json({ message: "update quantity failed" });
            else return res.status(200).json({ message: "product updated succefully" })
        } else {
            const result = await addProductToCartService(product_id, quantity, total_price, cart_id);
            if (!result || result?.affectedRows === 0) return res.status(400).json({ message: "porduct failed to add" });
            else return res.status(200).json({ message: "product added succefully" })
        }
    } catch (error) {
        return next(new Error("addProductToCartByIDHandler error" + error?.message));
    }
}
export async function updateProductQuantityHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const cart_id = req?.params?.cart_id;
        const { product_id, quantity, total_price } = req?.body;
        if (!cart_id) return res.status(403).json({ message: "bad request" });
        const currentCart = await isCartExist(cart_id);
        if (!currentCart) return res.status(403).json({ message: "no open cart available for the certain id" });
        const isProductInCart = await isProductInCartService(cart_id, product_id);
        if (!isProductInCart) return res.status(403).json({ message: "the product is not in the cart" });
        else {
            if (isProductInCart.quantity === 1) {
                const result = await removeProductFromCartService(cart_id, product_id);
                if (!result || result?.affectedRows === 0) return res.status(400).json({ message: "porduct failed to add" });
                else return res.status(200).json({ message: "product removed succefully" })
            } else {
                const newQuantity = isProductInCart?.quantity + quantity;
                const newTotalPrice = isProductInCart?.total_price + total_price;
                const result = await updateQuantityService(newQuantity, newTotalPrice, product_id, cart_id);
                if (!result || result?.affectedRows === 0) return res.status(400).json({ message: "update quantity failed" });
                else return res.status(200).json({ message: "product updated succefully" })
            }
        }
    } catch (error) {
        return next(new Error("updateProductQuantityHandler error" + error?.message));
    }
}

export async function removeProductFromCartByIDHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const cart_id = req?.params?.cart_id;
        const { product_id } = req?.body;
        if (!cart_id || !product_id) return res.status(403).json({ message: "bad request" });
        const currentCart = await isCartExist(cart_id);
        if (!currentCart) return res.status(403).json({ message: "no open cart available for the certain id" });
        const isProductInCart = await isProductInCartService(cart_id, product_id);
        if (!isProductInCart) return res.status(403).json({ message: "the product is not in the cart" });
        const result = await removeProductFromCartService(cart_id, product_id);
        if (!result || result?.affectedRows === 0) return res.status(400).json({ message: "porduct failed to add" });
        else return res.status(200).json({ message: "product removed succefully" })
    } catch (error) {
        return next(new Error("removeProductFromCartByIDHandler error: " + error?.message));
    }
}
export async function deleteAllCartHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const cart_id = req?.params?.cart_id;
        if (!cart_id) return res.status(403).json({ message: "bad request" });
        const currentCart = await isCartExist(cart_id);
        if (!currentCart) return res.status(403).json({ message: "no open cart available for the certain id" });
        const result = await deleteAllProductsFromCartService(cart_id);
        if(!result) return res.status(400).json({ message: "porducts failed to removed from cart" });
        else return res.status(200).json({ message: "porducts removed from cart succefully " });
    } catch (error) {
        return next(new Error("deleteAllCartHandler error: " + error?.message));
    }
}
export async function getCartTotalPriceHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const cart_id = req?.params?.cart_id;
        const currentCart = await isCartExist(cart_id);
        if (!currentCart) return res.status(403).json({ message: "no open cart available for the certain id" });
        const cart_total = await getCartPriceService(currentCart?.id);
        return res.status(200).json({ message: "ok", total_price: cart_total });
    } catch (error) {
        return next(new Error("getCartTotalPriceHandler error: " + error?.message));
    }
}
export async function orderCartByIDHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const cart_id = req?.params?.cart_id;
        if (!cart_id) return res.status(403).json({ message: "bad request" });
        const currentCart = await isCartExist(cart_id);
        if (!currentCart) return res.status(403).json({ message: "no open cart available for the certain id" });
        const currentUser = req.userData;
        if (!currentUser) return res.status(401).json({ message: "unauthorized" });
        const { city, street, date, credit_card } = req.body;
        const fullShippingDates = await getUnavailableShippingDatesService();
        let isDateAvailable = true;
        fullShippingDates.map((result: any) => {
            const tempDate = new Date((result?.date).toString());
            const currentStringDate = `${tempDate.getFullYear()}-${("0" + (tempDate.getMonth() + 1)).slice(-2)}-${("0" + tempDate.getDate()).slice(-2)}`
            if (currentStringDate === date) isDateAvailable = false;
            else isDateAvailable = true
        })
        if (!isDateAvailable) return res.status(404).json({ message: "date is already full of shipping please select another date" });
        const cart_total = await getCartPriceService(currentCart?.id);
        if (!cart_total) return res.status(404).json({ message: "error, please try again" });
        const orderDetailsObject: IOrder = {
            user_id: currentUser?.id,
            cart_id: currentCart?.id,
            total_price: cart_total,
            city: city,
            street: street,
            date: date,
            credit_card: credit_card,
        }
        const orderResult = await orderCartService(orderDetailsObject);
        if (!orderResult) return res.status(404).json({ message: "bad order" })
        else return res.status(200).json({ message: "order success", order_id: orderResult?.insertId })
    } catch (error) {
        return next(new Error("orderCartByIDHandler error: " + error?.message));
    }
}