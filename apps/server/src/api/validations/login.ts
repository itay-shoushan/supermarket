const Joi = require("joi");

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(2).max(18).required(),
});

function validateLoginScheme(req, res, next) {
  const { error } = loginSchema.validate(req.body);
  if (error) return next(new Error(error.message));
  next();
}

export default validateLoginScheme