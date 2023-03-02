import express from 'express';
import { createNewCustomer } from '../controllers/customerController.js';
import { createNewOrder } from '../controllers/orderController.js';
const router = express.Router();

router.post('/customer', createNewCustomer);
router.post('/customer/:id/order', createNewOrder);
router.get('/customer/:id/order');
router.get('/customer');

export default router;
