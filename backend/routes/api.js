const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const productController = require('../controllers/productController');
const cartController = require('../controllers/cartController');
const orderController = require('../controllers/orderController');
const authenticate = require('../middleware/auth');

// Auth Routes
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);

// Product Routes
router.get('/products', productController.getAllProducts);
router.get('/products/:id', productController.getProductById);
router.post('/products', authenticate, productController.createProduct); // In real app, check for admin role
router.put('/products/:id', authenticate, productController.updateProduct);
router.delete('/products/:id', authenticate, productController.deleteProduct);

// Cart Routes
router.get('/cart', authenticate, cartController.getCart);
router.post('/cart', authenticate, cartController.addToCart);
router.put('/cart/:id', authenticate, cartController.updateQuantity);
router.delete('/cart/:id', authenticate, cartController.removeFromCart);

// Order Routes
router.post('/orders', authenticate, orderController.createOrder);
router.get('/orders', authenticate, orderController.getOrderHistory);

module.exports = router;
