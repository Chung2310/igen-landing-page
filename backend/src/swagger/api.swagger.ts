export const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'iGen Technology API Documentation',
    version: '1.0.0',
    description: 'Tài liệu chi tiết hệ thống API cho dự án Landing Page và Admin Dashboard iGen Technology.',
  },
  servers: [
    {
      url: 'http://localhost:5000/api/v1',
      description: 'Development Server v1',
    },
  ],
  components: {
    securitySchemes: {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Nhập Access Token dưới dạng Bearer <token>',
      },
    },
    schemas: {
      ErrorResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: false },
          message: { type: 'string', example: 'Thông tin hoặc dữ liệu không hợp lệ.' },
          errors: {
            type: 'array',
            items: { type: 'string' },
            example: ['Email không đúng định dạng.'],
          },
        },
      },
    },
  },
  paths: {
    '/health': {
      get: {
        summary: 'Kiểm tra trạng thái máy chủ và cơ sở dữ liệu',
        tags: ['Health Check'],
        responses: {
          200: {
            description: 'Hệ thống hoạt động bình thường',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: { type: 'string', example: 'UP' },
                    timestamp: { type: 'string', example: '2026-06-08T04:00:00.000Z' },
                    services: {
                      type: 'object',
                      properties: {
                        server: { type: 'string', example: 'Healthy' },
                        database: { type: 'string', example: 'Healthy' },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/auth/register': {
      post: {
        summary: 'Đăng ký tài khoản mới',
        tags: ['Authentication'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['username', 'email', 'password'],
                properties: {
                  username: { type: 'string', example: 'igen_admin' },
                  email: { type: 'string', example: 'admin@igen.vn' },
                  password: { type: 'string', example: 'Admin@123456' },
                  role: { type: 'string', enum: ['admin', 'user'], example: 'admin' },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: 'Đăng ký tài khoản thành công',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    message: { type: 'string', example: 'Đăng ký tài khoản thành công.' },
                    data: {
                      type: 'object',
                      properties: {
                        id: { type: 'string', example: '60c72b2f9b1d8e2518e229a1' },
                        username: { type: 'string', example: 'igen_admin' },
                        email: { type: 'string', example: 'admin@igen.vn' },
                        role: { type: 'string', example: 'admin' },
                      },
                    },
                  },
                },
              },
            },
          },
          400: {
            description: 'Dữ liệu đầu vào hoặc tài khoản đã tồn tại',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } },
          },
        },
      },
    },
    '/auth/login': {
      post: {
        summary: 'Đăng nhập vào hệ thống',
        tags: ['Authentication'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email', 'password'],
                properties: {
                  email: { type: 'string', example: 'admin@igen.vn' },
                  password: { type: 'string', example: 'Admin@123456' },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Đăng nhập thành công',
            headers: {
              'Set-Cookie': {
                schema: { type: 'string', example: 'refreshToken=xyz...; Path=/; HttpOnly; Secure' },
                description: 'Refresh Token lưu dưới dạng Cookie bảo mật',
              },
            },
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    message: { type: 'string', example: 'Đăng nhập thành công.' },
                    data: {
                      type: 'object',
                      properties: {
                        accessToken: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsIn...' },
                        user: {
                          type: 'object',
                          properties: {
                            id: { type: 'string', example: '60c72b2f9b1d8e2518e229a1' },
                            username: { type: 'string', example: 'igen_admin' },
                            email: { type: 'string', example: 'admin@igen.vn' },
                            role: { type: 'string', example: 'admin' },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          400: {
            description: 'Email hoặc mật khẩu không chính xác',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } },
          },
        },
      },
    },
    '/auth/refresh-token': {
      post: {
        summary: 'Làm mới Access Token thông qua Refresh Token trong Cookie',
        tags: ['Authentication'],
        responses: {
          200: {
            description: 'Làm mới token thành công',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    message: { type: 'string', example: 'Làm mới Access Token thành công.' },
                    data: {
                      type: 'object',
                      properties: {
                        accessToken: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsIn...' },
                      },
                    },
                  },
                },
              },
            },
          },
          401: {
            description: 'Refresh Token không tồn tại hoặc không hợp lệ',
          },
        },
      },
    },
    '/auth/me': {
      get: {
        summary: 'Lấy thông tin người dùng hiện tại đang đăng nhập',
        tags: ['Authentication'],
        security: [{ BearerAuth: [] }],
        responses: {
          200: {
            description: 'Lấy thông tin thành công',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    data: {
                      type: 'object',
                      properties: {
                        id: { type: 'string', example: '60c72b2f9b1d8e2518e229a1' },
                        username: { type: 'string', example: 'igen_admin' },
                        email: { type: 'string', example: 'admin@igen.vn' },
                        role: { type: 'string', example: 'admin' },
                      },
                    },
                  },
                },
              },
            },
          },
          401: { description: 'Chưa xác thực hoặc token không hợp lệ' },
        },
      },
    },
    '/articles': {
      get: {
        summary: 'Lấy danh sách bài viết (Có phân trang, lọc và tìm kiếm)',
        tags: ['Articles'],
        parameters: [
          { name: 'page', in: 'query', schema: { type: 'integer', default: 1 }, description: 'Số trang' },
          { name: 'limit', in: 'query', schema: { type: 'integer', default: 10 }, description: 'Số lượng bài viết trên 1 trang' },
          { name: 'category', in: 'query', schema: { type: 'string' }, description: 'Lọc theo danh mục bài viết' },
          { name: 'status', in: 'query', schema: { type: 'string', enum: ['draft', 'published'] }, description: 'Lọc theo trạng thái' },
          { name: 'search', in: 'query', schema: { type: 'string' }, description: 'Tìm kiếm theo tiêu đề hoặc nội dung' },
        ],
        responses: {
          200: {
            description: 'Thành công',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    data: {
                      type: 'object',
                      properties: {
                        docs: { type: 'array', items: { type: 'object' } },
                        totalDocs: { type: 'integer', example: 25 },
                        limit: { type: 'integer', example: 10 },
                        page: { type: 'integer', example: 1 },
                        totalPages: { type: 'integer', example: 3 },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      post: {
        summary: 'Tạo bài viết mới (Yêu cầu Admin)',
        tags: ['Articles'],
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['title', 'slug', 'content', 'category'],
                properties: {
                  title: { type: 'string', example: 'Kỷ nguyên AI Marketing' },
                  slug: { type: 'string', example: 'ky-nguyen-ai-marketing' },
                  content: { type: 'string', example: 'Nội dung chi tiết về AI Marketing...' },
                  excerpt: { type: 'string', example: 'Tóm tắt bài viết.' },
                  category: { type: 'string', example: 'AI Trends' },
                  thumbnail: { type: 'string', example: 'http://example.com/image.png' },
                  status: { type: 'string', enum: ['draft', 'published'], default: 'draft' },
                },
              },
            },
          },
        },
        responses: {
          201: { description: 'Tạo bài viết thành công' },
          400: { description: 'Dữ liệu không hợp lệ' },
          401: { description: 'Không có quyền truy cập' },
        },
      },
    },
    '/articles/{slug}': {
      get: {
        summary: 'Lấy chi tiết bài viết qua Slug',
        tags: ['Articles'],
        parameters: [{ name: 'slug', in: 'path', required: true, schema: { type: 'string' } }],
        responses: {
          200: { description: 'Thành công' },
          404: { description: 'Không tìm thấy bài viết' },
        },
      },
    },
    '/articles/{id}': {
      patch: {
        summary: 'Cập nhật bài viết qua ID (Yêu cầu Admin)',
        tags: ['Articles'],
        security: [{ BearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { type: 'object' } } },
        },
        responses: {
          200: { description: 'Cập nhật thành công' },
          400: { description: 'Dữ liệu không hợp lệ' },
          404: { description: 'Không tìm thấy bài viết' },
        },
      },
      delete: {
        summary: 'Xóa bài viết qua ID (Yêu cầu Admin)',
        tags: ['Articles'],
        security: [{ BearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: {
          200: { description: 'Xóa thành công' },
          404: { description: 'Không tìm thấy bài viết' },
        },
      },
    },
    '/contacts': {
      post: {
        summary: 'Gửi tin nhắn liên hệ (Công khai)',
        tags: ['Contacts'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['name', 'email', 'phone', 'message'],
                properties: {
                  name: { type: 'string', example: 'Nguyễn Văn A' },
                  email: { type: 'string', example: 'anguyen@example.com' },
                  phone: { type: 'string', example: '0901234567' },
                  message: { type: 'string', example: 'Tôi cần nhận tư vấn về giải pháp AI' },
                },
              },
            },
          },
        },
        responses: {
          201: { description: 'Gửi liên hệ thành công' },
          400: { description: 'Dữ liệu không hợp lệ' },
        },
      },
      get: {
        summary: 'Lấy danh sách liên hệ khách hàng gửi về (Yêu cầu Admin)',
        tags: ['Contacts'],
        security: [{ BearerAuth: [] }],
        parameters: [
          { name: 'page', in: 'query', schema: { type: 'integer', default: 1 } },
          { name: 'limit', in: 'query', schema: { type: 'integer', default: 10 } },
          { name: 'status', in: 'query', schema: { type: 'string', enum: ['unread', 'read', 'replied'] } },
          { name: 'search', in: 'query', schema: { type: 'string' } },
        ],
        responses: {
          200: { description: 'Lấy thành công' },
          401: { description: 'Chưa xác thực' },
        },
      },
    },
    '/contacts/{id}/status': {
      patch: {
        summary: 'Cập nhật trạng thái liên hệ (Yêu cầu Admin)',
        tags: ['Contacts'],
        security: [{ BearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['status'],
                properties: {
                  status: { type: 'string', enum: ['unread', 'read', 'replied'], example: 'read' },
                },
              },
            },
          },
        },
        responses: {
          200: { description: 'Cập nhật trạng thái thành công' },
          404: { description: 'Không tìm thấy liên hệ' },
        },
      },
    },
    '/services': {
      get: {
        summary: 'Lấy danh sách sản phẩm/dịch vụ (Có phân trang, lọc và tìm kiếm)',
        tags: ['Services'],
        parameters: [
          { name: 'page', in: 'query', schema: { type: 'integer', default: 1 }, description: 'Số trang' },
          { name: 'limit', in: 'query', schema: { type: 'integer', default: 10 }, description: 'Số lượng dịch vụ trên 1 trang' },
          { name: 'category', in: 'query', schema: { type: 'string' }, description: 'Lọc theo danh mục' },
          { name: 'status', in: 'query', schema: { type: 'string', enum: ['active', 'inactive'] }, description: 'Lọc theo trạng thái' },
          { name: 'search', in: 'query', schema: { type: 'string' }, description: 'Tìm kiếm theo tên hoặc mô tả ngắn' },
        ],
        responses: {
          200: {
            description: 'Thành công',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    data: {
                      type: 'object',
                      properties: {
                        docs: { type: 'array', items: { type: 'object' } },
                        totalDocs: { type: 'integer', example: 6 },
                        limit: { type: 'integer', example: 10 },
                        page: { type: 'integer', example: 1 },
                        totalPages: { type: 'integer', example: 1 },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      post: {
        summary: 'Tạo sản phẩm/dịch vụ mới (Yêu cầu Admin)',
        tags: ['Services'],
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['title', 'category'],
                properties: {
                  title: { type: 'string', example: 'Thiết kế Website' },
                  slug: { type: 'string', example: 'thiet-ke-website' },
                  shortDesc: { type: 'string', example: 'Mô tả ngắn về dịch vụ thiết kế web.' },
                  description: { type: 'string', example: 'Chi tiết mô tả dịch vụ...' },
                  icon: { type: 'string', example: 'language' },
                  thumbnail: { type: 'string', example: 'http://example.com/image.png' },
                  category: { type: 'string', example: 'Web' },
                  features: { type: 'array', items: { type: 'string' }, example: ['Tối ưu SEO', 'Responsive'] },
                  status: { type: 'string', enum: ['active', 'inactive'], default: 'active' },
                  order: { type: 'integer', example: 1 },
                },
              },
            },
          },
        },
        responses: {
          201: { description: 'Tạo sản phẩm/dịch vụ thành công' },
          400: { description: 'Dữ liệu không hợp lệ' },
          401: { description: 'Không có quyền truy cập' },
        },
      },
    },
    '/services/{slug}': {
      get: {
        summary: 'Lấy chi tiết sản phẩm/dịch vụ qua Slug',
        tags: ['Services'],
        parameters: [{ name: 'slug', in: 'path', required: true, schema: { type: 'string' } }],
        responses: {
          200: { description: 'Thành công' },
          404: { description: 'Không tìm thấy sản phẩm/dịch vụ' },
        },
      },
    },
    '/services/{id}': {
      patch: {
        summary: 'Cập nhật sản phẩm/dịch vụ qua ID (Yêu cầu Admin)',
        tags: ['Services'],
        security: [{ BearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { type: 'object' } } },
        },
        responses: {
          200: { description: 'Cập nhật thành công' },
          400: { description: 'Dữ liệu không hợp lệ' },
          404: { description: 'Không tìm thấy sản phẩm/dịch vụ' },
        },
      },
      delete: {
        summary: 'Xóa sản phẩm/dịch vụ qua ID (Yêu cầu Admin)',
        tags: ['Services'],
        security: [{ BearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: {
          200: { description: 'Xóa thành công' },
          404: { description: 'Không tìm thấy sản phẩm/dịch vụ' },
        },
      },
    },
    '/upload': {
      post: {
        summary: 'Tải lên hình ảnh lên Cloudinary (Yêu cầu Admin)',
        tags: ['Upload'],
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'multipart/form-data': {
              schema: {
                type: 'object',
                required: ['image'],
                properties: {
                  image: {
                    type: 'string',
                    format: 'binary',
                    description: 'Tệp hình ảnh cần tải lên (Chấp nhận jpeg, png, gif... tối đa 5MB)'
                  }
                }
              }
            }
          }
        },
        responses: {
          200: {
            description: 'Tải lên thành công',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    message: { type: 'string', example: 'Tải lên hình ảnh thành công.' },
                    url: { type: 'string', example: 'https://res.cloudinary.com/igentech/image/upload/v12345/igentech/xyz.jpg' }
                  }
                }
              }
            }
          },
          400: { description: 'Tệp tải lên không hợp lệ' },
          401: { description: 'Không có quyền truy cập' },
          500: { description: 'Lỗi upload Cloudinary' }
        }
      }
    },
  },
};
export default swaggerDocument;
