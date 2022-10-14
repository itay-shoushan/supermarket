const Joi = require("joi");
import { Request, Response, NextFunction } from "express";

const commonNumberSchema = Joi.number().required();

export const addProductToCartScheme = Joi.object({
  product_id: commonNumberSchema,
  quantity: commonNumberSchema,
  total_price: commonNumberSchema,
});

export function validateAddProduct(req: Request, res: Response, next: NextFunction) {
  const { product_id, quantity, total_price } = req?.body;
  if (!product_id || !quantity || !total_price) return next(new Error());
  const { error } = addProductToCartScheme.validate({ product_id, quantity, total_price });
  if (error) return next(new Error(error?.details[0]?.message));
  else next();
}