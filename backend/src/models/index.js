const sequelize = require("../config/sequelize");

const User = require("./user.model");
const Address = require("./address.model");

const Category = require("./category.model");
const Product = require("./product.model");
const ProductVariant = require("./product_variant.model");

const Cart = require("./cart.model");
const CartItem = require("./cart_item.model");

const Order = require("./order.model");
const OrderItem = require("./order_item.model");
const OrderShippingAddress = require("./order_shipping_address.model");
const OrderPayment = require("./order_payment.model");
const OrderVoucher = require("./order_voucher.model");

const Voucher = require("./voucher.model");

const models = {
  User,
  Address,
  Category,
  Product,
  ProductVariant,
  Cart,
  CartItem,
  Order,
  OrderItem,
  OrderShippingAddress,
  OrderPayment,
  OrderVoucher,
  Voucher,
};

require("./associations/user.assoc")(models);
require("./associations/catalog.assoc")(models);
require("./associations/cart.assoc")(models);
require("./associations/order.assoc")(models);

module.exports = {
  sequelize,
  ...models,
};
