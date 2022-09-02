import { getConnection } from "../../config/database_config";
import { getProductByNameQuery, getProductCategoriesQuery, getProductsByCategoryQuery, getProductsQuery } from "../helpers/queries";
import { ICategory, IProduct } from "../models/product";

export async function getProductsService(): Promise<IProduct[]> {
    const query = getProductsQuery();
    const [result] = await getConnection().query(query);
    return result;
}
export async function getProductByNameService(name: string): Promise<IProduct[]> {
    const query = getProductByNameQuery();
    const queryString = `%${name}%`
    const [result] = await getConnection().execute(query, [queryString]);
    return result;
}
export async function getProductCategoriesService(): Promise<ICategory[]> {
    const query = getProductCategoriesQuery();
    const [result] = await getConnection().query(query);
    return result;
}
export async function getProductsByCategoryService(category_id:number): Promise<IProduct[]> {
    const query = getProductsByCategoryQuery();
    const [result] = await getConnection().execute(query,[category_id]);
    return result;
}
