import { NextFunction, Request, Response } from 'express'
import { getProductByNameService, getProductCategoriesService, getProductsByCategoryService, getProductsService } from '../services/products'

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
