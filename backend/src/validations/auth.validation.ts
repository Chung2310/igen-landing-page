import Joi from 'joi';

export const registerSchema = Joi.object({
  username: Joi.string()
    .min(3)
    .max(30)
    .required()
    .messages({
      'string.base': 'Tên đăng nhập phải là văn bản.',
      'string.empty': 'Tên đăng nhập không được để trống.',
      'string.min': 'Tên đăng nhập phải có ít nhất 3 ký tự.',
      'string.max': 'Tên đăng nhập không được vượt quá 30 ký tự.',
      'any.required': 'Tên đăng nhập là bắt buộc.',
    }),
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.base': 'Email phải là văn bản.',
      'string.empty': 'Email không được để trống.',
      'string.email': 'Email phải đúng định dạng.',
      'any.required': 'Email là bắt buộc.',
    }),
  password: Joi.string()
    .min(6)
    .required()
    .messages({
      'string.base': 'Mật khẩu phải là văn bản.',
      'string.empty': 'Mật khẩu không được để trống.',
      'string.min': 'Mật khẩu phải có ít nhất 6 ký tự.',
      'any.required': 'Mật khẩu là bắt buộc.',
    }),
  role: Joi.string()
    .valid('admin', 'user')
    .messages({
      'any.only': 'Vai trò không hợp lệ.',
    }),
});

export const loginSchema = Joi.object({
  username: Joi.string()
    .required()
    .messages({
      'string.empty': 'Tên đăng nhập không được để trống.',
      'any.required': 'Tên đăng nhập là bắt buộc.',
    }),
  password: Joi.string()
    .required()
    .messages({
      'string.empty': 'Mật khẩu không được để trống.',
      'any.required': 'Mật khẩu là bắt buộc.',
    }),
});
