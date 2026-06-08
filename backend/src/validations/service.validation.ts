import Joi from 'joi';

const objectIdPattern = /^[0-9a-fA-F]{24}$/;

export const createServiceSchema = Joi.object({
  title: Joi.string().required().messages({
    'string.empty': 'Tên sản phẩm/dịch vụ không được để trống.',
    'any.required': 'Tên sản phẩm/dịch vụ là bắt buộc.',
  }),
  slug: Joi.string().allow('').messages({
    'string.base': 'Slug phải là chuỗi văn bản.',
  }),
  shortDesc: Joi.string().allow('').messages({
    'string.base': 'Mô tả ngắn phải là chuỗi văn bản.',
  }),
  description: Joi.string().allow('').messages({
    'string.base': 'Mô tả chi tiết phải là chuỗi văn bản.',
  }),
  icon: Joi.string().allow('').messages({
    'string.base': 'Icon phải là chuỗi văn bản.',
  }),
  thumbnail: Joi.string().allow('').messages({
    'string.base': 'Hình ảnh phải là chuỗi văn bản.',
  }),
  category: Joi.string().required().messages({
    'string.empty': 'Danh mục không được để trống.',
    'any.required': 'Danh mục là bắt buộc.',
  }),
  features: Joi.array().items(Joi.string()).messages({
    'array.base': 'Danh sách tính năng phải là mảng.',
  }),
  status: Joi.string().valid('active', 'inactive').messages({
    'any.only': 'Trạng thái chỉ có thể là active hoặc inactive.',
  }),
  order: Joi.number().integer().min(0).messages({
    'number.base': 'Thứ tự phải là số.',
    'number.min': 'Thứ tự không được âm.',
  }),
});

export const updateServiceSchema = Joi.object({
  title: Joi.string().messages({
    'string.empty': 'Tên sản phẩm/dịch vụ không được để trống.',
  }),
  slug: Joi.string().allow(''),
  shortDesc: Joi.string().allow(''),
  description: Joi.string().allow(''),
  icon: Joi.string().allow(''),
  thumbnail: Joi.string().allow(''),
  category: Joi.string().messages({
    'string.empty': 'Danh mục không được để trống.',
  }),
  features: Joi.array().items(Joi.string()),
  status: Joi.string().valid('active', 'inactive').messages({
    'any.only': 'Trạng thái chỉ có thể là active hoặc inactive.',
  }),
  order: Joi.number().integer().min(0),
});

export const serviceQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1).messages({
    'number.base': 'Trang phải là số nguyên.',
    'number.min': 'Trang tối thiểu là 1.',
  }),
  limit: Joi.number().integer().min(1).max(100).default(10).messages({
    'number.base': 'Số phần tử mỗi trang phải là số.',
    'number.max': 'Số phần tử tối đa là 100.',
  }),
  category: Joi.string().allow(''),
  status: Joi.string().valid('active', 'inactive').allow(''),
  search: Joi.string().allow(''),
});

export const serviceIdSchema = Joi.object({
  id: Joi.string()
    .pattern(objectIdPattern)
    .required()
    .messages({
      'string.pattern.base': 'ID sản phẩm không đúng định dạng MongoDB ObjectId.',
      'any.required': 'ID sản phẩm là bắt buộc.',
    }),
});

export const serviceSlugSchema = Joi.object({
  slug: Joi.string().required().messages({
    'string.empty': 'Slug sản phẩm không được để trống.',
    'any.required': 'Slug sản phẩm là bắt buộc.',
  }),
});
