import express from "express";
import { addProductToCartByIDHandler, getCartByUserIDHandler, getCartDetailsByCartIDHandler, orderCartByIDHandler, removeProductFromCartByIDHandler, updateProductQuantityHandler } from "../controllers/carts";
import { validateAddProduct } from "../validations/addToCart";
const router = express.Router();

router.get("/cart_details/:cart_id", getCartDetailsByCartIDHandler);
router.get("/user_cart/:user_id", getCartByUserIDHandler);
router.post("/add_to_cart/:cart_id", validateAddProduct, addProductToCartByIDHandler);
router.put("/update_quantity/:cart_id",validateAddProduct, updateProductQuantityHandler);
router.delete("/remove_from_cart/:cart_id", removeProductFromCartByIDHandler);
router.post("/order/:cart_id", orderCartByIDHandler);

export default router;
