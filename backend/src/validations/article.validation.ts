import Joi from 'joi';

export const createArticleSchema = Joi.object({
  title: Joi.string()
    .required()
    .messages({
      'string.empty': 'Tiêu đề bài viết không được để trống.',
      'any.required': 'Tiêu đề bài viết là bắt buộc.',
    }),
  slug: Joi.string()
    .required()
    .messages({
      'string.empty': 'Slug không được để trống.',
      'any.required': 'Slug là bắt buộc.',
    }),
  content: Joi.string()
    .required()
    .messages({
      'string.empty': 'Nội dung bài viết không được để trống.',
      'any.required': 'Nội dung bài viết là bắt buộc.',
    }),
  excerpt: Joi.string()
    .allow('')
    .messages({
      'string.base': 'Tóm tắt bài viết phải là chuỗi văn bản.',
    }),
  category: Joi.string()
    .required()
    .messages({
      'string.empty': 'Danh mục bài viết không được để trống.',
      'any.required': 'Danh mục bài viết là bắt buộc.',
    }),
  thumbnail: Joi.string()
    .allow('')
    .messages({
      'string.base': 'Hình đại diện phải là chuỗi văn bản.',
    }),
  author: Joi.string()
    .allow('')
    .messages({
      'string.base': 'Tác giả phải là chuỗi văn bản.',
    }),
  status: Joi.string()
    .valid('draft', 'published')
    .messages({
      'any.only': 'Trạng thái bài viết chỉ có thể là draft hoặc published.',
    }),
});

export const updateArticleSchema = Joi.object({
  title: Joi.string().messages({
    'string.empty': 'Tiêu đề bài viết không được để trống.',
  }),
  slug: Joi.string().messages({
    'string.empty': 'Slug không được để trống.',
  }),
  content: Joi.string().messages({
    'string.empty': 'Nội dung bài viết không được để trống.',
  }),
  excerpt: Joi.string().allow(''),
  category: Joi.string().messages({
    'string.empty': 'Danh mục bài viết không được để trống.',
  }),
  thumbnail: Joi.string().allow(''),
  author: Joi.string().allow(''),
  status: Joi.string().valid('draft', 'published').messages({
    'any.only': 'Trạng thái bài viết chỉ có thể là draft hoặc published.',
  }),
});

export const articleQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1).messages({
    'number.base': 'Trang phải là số.',
    'number.min': 'Trang tối thiểu là 1.',
  }),
  limit: Joi.number().integer().min(1).max(100).default(10).messages({
    'number.base': 'Số phần tử mỗi trang phải là số.',
    'number.min': 'Số phần tử tối thiểu là 1.',
    'number.max': 'Số phần tử tối đa là 100.',
  }),
  category: Joi.string().allow(''),
  status: Joi.string().valid('draft', 'published').allow(''),
  search: Joi.string().allow(''),
});
