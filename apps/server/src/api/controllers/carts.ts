import { NextFunction, Request, Response } from 'express'
import { IOrder } from '../models/order';
import { addProductToCartService, createCartToUserService, getCartByUserIDService, getCartDetailsByIDService, getCartPriceService, isCartExist, orderCartService, removeProductFromCartService, updateQuantityService } from '../services/carts';

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
export async function getCartByUserIDHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const user_id = req?.params?.user_id;
        if (!user_id) return res.status(403).json({ message: "bad request" });
        const cart = await getCartByUserIDService(user_id);
        if (!cart) {
            const newCart = await createCartToUserService(user_id);
            console.log(newCart);
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
export async function addProductToCartByIDHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const cart_id = req?.params?.cart_id;
        const { product_id, quantity, total_price } = req?.body;
        if (!cart_id) return res.status(403).json({ message: "bad request" });
        const currentCart = await isCartExist(cart_id);
        if (!currentCart) return res.status(403).json({ message: "no open cart available for the certain id" });
        const result = await addProductToCartService(product_id, quantity, total_price, cart_id);
        if (!result || result?.affectedRows === 0) return res.status(400).json({ message: "porduct failed to add" });
        else return res.status(200).json({ message: "product added succefully" })
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
        const result = await updateQuantityService(quantity, total_price, product_id, cart_id);
        if (!result || result?.affectedRows === 0) return res.status(400).json({ message: "update quantity failed" });
        else return res.status(200).json({ message: "product updated succefully" })
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
        const result = await removeProductFromCartService(cart_id, product_id);
        if (!result || result?.affectedRows === 0) return res.status(400).json({ message: "porduct failed to add" });
        else return res.status(200).json({ message: "product removed succefully" })
    } catch (error) {
        return next(new Error("removeProductFromCartByIDHandler error: " + error?.message));
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
        const cart_total = await getCartPriceService(currentCart?.id);
        if (!cart_total) return res.status(404).json({ message: "wrong car total error please try again" });
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