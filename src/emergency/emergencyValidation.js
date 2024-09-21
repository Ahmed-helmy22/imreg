import Joi from "joi";

export const createEmergencySchema = Joi.object({
  lat: Joi.number()
    .required()
    .messages({
      'number.base': 'Latitude should be a number.',
      'any.required': 'Latitude is required.'
    }),
  long: Joi.number()
    .required()
    .messages({
      'number.base': 'Longitude should be a number.',
      'any.required': 'Longitude is required.'
    }),
  emergencyText: Joi.string()
    .max(500)
    .messages({
      'string.base': 'Emergency text should be a string.',
      'string.max': 'Emergency text should be at most 500 characters long.'
    }),
  emergencyRecord: Joi.any()
    .optional()
    .messages({
      'any.base': 'Emergency record should be a valid file.'
    }),
  emergencyPhoto: Joi.any()
    .optional()
    .messages({
      'any.base': 'Emergency photo should be a valid file.'
    }),
  emergencyVideo: Joi.any()
    .optional()
    .messages({
      'any.base': 'Emergency video should be a valid file.'
    }),
});
