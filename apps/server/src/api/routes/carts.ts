import express from "express";
import { addProductToCartByIDHandler, deleteAllCartHandler, getAllOrdersHandler, getCartByUserIDHandler, getCartDetailsByCartIDHandler, getCartTotalPriceHandler, getUnavailableShippingDatesHandler, orderCartByIDHandler, removeProductFromCartByIDHandler, updateProductQuantityHandler } from "../controllers/carts";
import { validateAddProduct } from "../validations/addToCart";
const router = express.Router();


router.get("/user_cart/:user_id", getCartByUserIDHandler);
router.get("/all_orders", getAllOrdersHandler);
router.get("/unavailable_shipping_dates", getUnavailableShippingDatesHandler);
router.get("/cart_details/:cart_id", getCartDetailsByCartIDHandler);
router.post("/add_to_cart/:cart_id", validateAddProduct, addProductToCartByIDHandler);
router.put("/update_quantity/:cart_id", validateAddProduct, updateProductQuantityHandler);
router.delete("/remove_from_cart/:cart_id", removeProductFromCartByIDHandler);
router.delete("/delete_cart/:cart_id", deleteAllCartHandler);
router.get("/cart_total_price/:cart_id", getCartTotalPriceHandler);
router.post("/order/:cart_id", orderCartByIDHandler);

export default router;
