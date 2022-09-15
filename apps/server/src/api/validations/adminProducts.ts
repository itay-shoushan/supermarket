const Joi = require("joi");

export const adminProductScheme = Joi.object({
    name: Joi.string().min(2).max(45).required(),
    category_id: Joi.number().required(),
    price: Joi.number().min(0.1).required(),
    picture: Joi.string().required(),
});

function validateAdminProductScheme(req, res, next) {
    const { name, category_id, price, picture } = req.body;
    if (!name || !category_id || !price || !picture) return next(new Error("all fields must be sent to the server"));
    const { error } = adminProductScheme.validate(req.body);
    if (error) return next(new Error(error.message));
    else next();
}

export default validateAdminProductScheme