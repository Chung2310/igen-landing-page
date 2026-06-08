import Joi from 'joi';

export const createContactSchema = Joi.object({
  name: Joi.string()
    .required()
    .messages({
      'string.empty': 'Họ và tên không được để trống.',
      'any.required': 'Họ và tên là bắt buộc.',
    }),
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.empty': 'Email không được để trống.',
      'string.email': 'Email phải đúng định dạng.',
      'any.required': 'Email là bắt buộc.',
    }),
  phone: Joi.string()
    .pattern(/^[0-9+\-\s()]{8,15}$/)
    .required()
    .messages({
      'string.empty': 'Số điện thoại không được để trống.',
      'string.pattern.base': 'Số điện thoại không hợp lệ (từ 8 đến 15 chữ số).',
      'any.required': 'Số điện thoại là bắt buộc.',
    }),
  message: Joi.string()
    .required()
    .messages({
      'string.empty': 'Lời nhắn không được để trống.',
      'any.required': 'Lời nhắn là bắt buộc.',
    }),
});

export const updateContactStatusSchema = Joi.object({
  status: Joi.string()
    .valid('unread', 'read', 'replied')
    .required()
    .messages({
      'any.only': 'Trạng thái chỉ có thể là unread, read hoặc replied.',
      'any.required': 'Trạng thái là bắt buộc.',
    }),
});

export const contactQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
  status: Joi.string().valid('unread', 'read', 'replied').allow(''),
  search: Joi.string().allow(''),
});

export const idParamSchema = Joi.object({
  id: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      'string.pattern.base': 'Mã định danh ID phải đúng định dạng MongoDB ObjectId.',
      'any.required': 'ID là bắt buộc.',
    }),
});
