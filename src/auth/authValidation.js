import Joi from "joi";

export const signupSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    'string.base': 'Name should be a string.',
    'string.empty': 'Name is required.',
    'string.min': 'Name should be at least 3 characters long.',
    'string.max': 'Name should be at most 30 characters long.',
    'any.required': 'Name is required.'
  }),
  email: Joi.string().email().min(10).max(30).required().messages({
    'string.base': 'Email should be a string.',
    'string.email': 'Invalid email format.',
    'string.empty': 'Email is required.',
    'string.min': 'Email should be at least 10 characters long.',
    'string.max': 'Email should be at most 30 characters long.',
    'any.required': 'Email is required.'
  }),
  password: Joi.string().min(8).max(30).required().messages({
    'string.base': 'Password should be a string.',
    'string.empty': 'Password is required.',
    'string.min': 'Password should be at least 8 characters long.',
    'string.max': 'Password should be at most 30 characters long.',
    'any.required': 'Password is required.'
  }),
  passwordConfirm: Joi.string().valid(Joi.ref('password')).required().messages({
    'string.base': 'Password confirmation should be a string.',
    'any.only': 'Passwords do not match.',
    'any.required': 'Password confirmation is required.'
  }),
  phoneNumber: Joi.string().required().messages({
    'string.base': 'Phone number should be a string.',
    'string.empty': 'Phone number is required.',
    'any.required': 'Phone number is required.'
  }),
  additionalPhones: Joi.array().items(Joi.string()).messages({
    'array.base': 'Additional phones should be an array of strings.',
    'string.base': 'Each phone number should be a string.'
  }),
  sendNotification: Joi.boolean().messages({
    'boolean.base': 'Send notification should be a boolean value.'
  }),
  nationalId: Joi.number().required().messages({
    'number.base': 'National ID should be a number.',
    'any.required': 'National ID is required.'
  })
});

export const loginSchema = Joi.object({
  email: Joi.string().email().min(10).max(30).required().messages({
    'string.base': 'Email should be a string.',
    'string.email': 'Invalid email format.',
    'string.empty': 'Email is required.',
    'string.min': 'Email should be at least 10 characters long.',
    'string.max': 'Email should be at most 30 characters long.',
    'any.required': 'Email is required.'
  }),
  password: Joi.string().min(8).max(20).required().messages({
    'string.base': 'Password should be a string.',
    'string.empty': 'Password is required.',
    'string.min': 'Password should be at least 8 characters long.',
    'string.max': 'Password should be at most 20 characters long.',
    'any.required': 'Password is required.'
  })
});

export const updateProfileSchema = Joi.object({
  name: Joi.string().min(3).max(30).optional().messages({
    'string.base': 'Name should be a string.',
    'string.empty': 'Name is required.',
    'string.min': 'Name should be at least 3 characters long.',
    'string.max': 'Name should be at most 30 characters long.',
    'any.required': 'Name is required.'
  }),
  email: Joi.string().email().min(10).max(30).optional().messages({
    'string.base': 'Email should be a string.',
    'string.email': 'Invalid email format.',
    'string.empty': 'Email is required.',
    'string.min': 'Email should be at least 10 characters long.',
    'string.max': 'Email should be at most 30 characters long.',
    'any.required': 'Email is required.'
  }),
  nationalId: Joi.number().optional().messages({
    'number.base': 'National ID should be a number.',
    'any.required': 'National ID is required.'
  }),
  phoneNumber :  Joi.number().optional().messages({
    'number.base': 'Phone Number should be a string.',
    'any.required': 'National ID is required.'
  }),
  sendNotification: Joi.boolean().optional().messages({
    'boolean.base': 'Send notification should be a boolean value.'
  }),
  additionalPhones: Joi.array().items(Joi.string()).optional().messages({
    'array.base': 'Additional phones should be an array of strings.',
    'string.base': 'Each phone number should be a string.'
  })  
});
