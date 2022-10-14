import { NextFunction, Request, Response } from 'express'
import { addProductService, editProductService, getProductByNameService, getProductCategoriesService, getProductsByCategoryService, getProductsService } from '../services/products'

export async function getProductsHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const products = await getProductsService();
        if (!products) return res.status(404).json({ message: "error" })
        else return res.status(200).json({ message: "ok", products })
    } catch (error) {
        return next(new Error(error?.message));
    }
}
export async function getProductByNameHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const product_name = req?.params?.product_name;
        if (!product_name) return res.status(403).json({ message: "bad request" });
        const products = await getProductByNameService(product_name);
        if (!products) return res.status(404).json({ message: "error" });
        else return res.status(200).json({ message: "ok", products })
    } catch (error) {
        return next(new Error(error?.message));
    }
}

export async function getProductCategories(req: Request, res: Response, next: NextFunction) {
    try {
        const categories = await getProductCategoriesService();
        if (!categories) return res.status(404).json({ message: "error" });
        else return res.status(200).json({ message: "ok", categories })
    } catch (error) {
        return next(new Error(error?.message));
    }
}
export async function getProductsByCategory(req: Request, res: Response, next: NextFunction) {
    try {
        const category_id = req?.params?.category_id;
        if (!category_id) return res.status(403).json({ message: "bad request" });
        const products = await getProductsByCategoryService(category_id);
        if (!products) return res.status(404).json({ message: "error" });
        else return res.status(200).json({ message: "ok", products })
    } catch (error) {
        return next(new Error(error?.message));
    }
}
export async function addProductHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const { name, category_id, price, picture } = req.body;
        const result = await addProductService(name, category_id, price, picture);
        if (!result?.insertId) return res.status(403).json({ message: "bad request" });
        else return res.status(201).json({ message: "product added successfully", new_product_id: result?.insertId });
    } catch (error) {
        return next(new Error("addProductHandler error" + error?.message));
    }
}
export async function editProductHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const product_id = req?.params?.product_id;
        if (!product_id) return res.status(403).json({ message: "bad request" });
        const { name, category_id, price, picture } = req.body;
        const result = await editProductService(name, category_id, price, picture, product_id);
        if (result?.affectedRows !== 1) return res.status(403).json({ message: "edit fail" });
        else return res.status(201).json({ message: `product ${product_id} edited successfully` });
    } catch (error) {
        return next(new Error("editProductHandler error" + error?.message));
    }
}
