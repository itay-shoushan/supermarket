import express from "express";
import { getProductByNameHandler, getProductCategories, getProductsByCategory, getProductsHandler } from "../controllers/products";
const router = express.Router();

router.get("/",getProductsHandler);
router.get("/search/:product_name",getProductByNameHandler);
router.get("/categories",getProductCategories);
router.get("/search_all/:category_id",getProductsByCategory);

export default router;
