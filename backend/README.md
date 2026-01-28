# Food Retail Backend API

Node.js + Express API for a food e-commerce platform.

## 🏗️ Tech Stack

- **Framework**: Express.js + Node.js
- **Database**: MySQL + Sequelize ORM
- **Authentication**: JWT (Access & Refresh tokens)
- **Security**: Helmet, CORS, Bcrypt password hashing
- **File Storage**: Cloudinary CDN
- **Logging**: Morgan
- **Validation**: Joi

## 📊 Database Models

- **User**: Authentication, roles (customer/staff/admin), status management
- **Product/Category**: Catalog with hierarchical categories
- **ProductVariant**: Price, size, stock management
- **Order**: Order tracking with 6 statuses (pending → completed/cancelled)
- **OrderItem, OrderPayment, OrderVoucher**: Order details
- **Cart/CartItem**: Shopping cart
- **Address**: Shipping address

The database includes indexing on important fields (slug, status, user_id, order_code, created_at).

## 🔐 Security Features

- ✅ JWT token authentication
- ✅ Bcrypt password hashing (salt rounds: 10)
- ✅ Helmet security headers
- ✅ CORS whitelist configuration
- ✅ Input validation & sanitization
- ✅ Role-based access control (Admin middleware)
- ✅ Centralized error handling

## 🔌 API Routes

### Auth

- `POST /api/auth/register` - Register
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get user info
- `POST /api/auth/refresh` - Refresh token

### Categories

- `GET /api/categories` - Get categories
- `GET /api/categories/tree` - Get category tree
- `POST /api/categories` - Create category (Admin)

### Upload

- `POST /api/upload` - Upload image → Cloudinary

## 🎯 Key Features

- Service layer pattern (Controllers → Services → Models)
- Async/await + error handling
- Database migration & sync automation
- Environment-based configuration
- File upload with Multer + Cloudinary
- User validation (email, phone number, gender)
- Order status management
- Voucher/discount system ready

## 📦 Main Dependencies

```json
{
  "express": "4.22.1",
  "sequelize": "6.37.7",
  "mysql2": "3.16.0",
  "jsonwebtoken": "9.0.3",
  "bcrypt": "6.0.0",
  "helmet": "8.1.0",
  "cors": "2.8.5",
  "multer": "2.0.2",
  "cloudinary": "1.41.3",
  "joi": "18.0.2",
  "morgan": "1.10.1"
}
```

## ✨ Production Ready

- Database connection retry logic
- Proper HTTP status codes
- Global error handler
- Security headers
- CORS configuration
- Environment variables support

**Author**: Ngoc Phat Tran  
**License**: ISC  
**Version**: 1.0.0
