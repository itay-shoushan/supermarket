const Joi = require("joi");
import { Request, Response, NextFunction } from "express";

const commonStringSchema = Joi.string().min(2).max(18).required();
const commonPasswordSchema = Joi.string().min(6).max(24).required();

export const registerSchema = Joi.object({
  id: Joi.number().min(11111111).max(999999999).required(),
  email: Joi.string().email().required(),
  password: commonPasswordSchema,
  passwordConfirm: commonPasswordSchema,
  city: commonStringSchema,
  street: Joi.string().min(2).max(50).required(),
  first_name: commonStringSchema,
  last_name: commonStringSchema,
});

export function validateRegistrationScheme(req: Request, res: Response, next: NextFunction) {
  const { id, email, password, passwordConfirm, city, street, first_name, last_name } = req?.body;
  if (!id || !email || !password || !passwordConfirm || !city || !street || !first_name || !last_name) return next(new Error());
  if (password !== passwordConfirm) return next(new Error("passwords didn't match"));
  const { error } = registerSchema.validate({ id, email, password, passwordConfirm, city, street, first_name, last_name });
  if (error) return next(new Error(error?.details[0]?.message));
  else next();
}