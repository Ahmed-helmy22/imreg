import Joi from 'joi';

export const idSchema = Joi.object({
  id: Joi.string().hex().length(24).required()
});

export const paginationSchema = Joi.object({
  page: Joi.number().integer().min(1).optional(),
  limit: Joi.number().integer().min(1).optional()
});

export const softDeleteSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
  active: Joi.boolean().required()
});
