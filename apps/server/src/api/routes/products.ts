import express from "express";
import { addProductHandler, editProductHandler, getProductByNameHandler, getProductCategories, getProductsByCategory, getProductsHandler } from "../controllers/products";
import { verifyAdminMiddleware } from "../middlewares/verifyToken";
import validateAdminProductScheme from "../validations/adminProducts";
const router = express.Router();

router.get("/", getProductsHandler);
router.get("/search/:product_name", getProductByNameHandler);
router.get("/categories", getProductCategories);
router.get("/search_all/:category_id", getProductsByCategory);
router.post("/add_product", verifyAdminMiddleware, validateAdminProductScheme, addProductHandler);
router.put("/edit_product/:product_id", verifyAdminMiddleware, validateAdminProductScheme, editProductHandler);

export default router;
