import express from 'express';
import { createNewCustomer, getAllCustomers } from '../controllers/customerController.js';
import { createNewOrder, getAllCustomersOrdersById, addOrdersBulk } from '../controllers/orderController.js';
const router = express.Router();

router.post('/customer', createNewCustomer);
router.post('/customer/:id/order', createNewOrder);
router.get('/customer/:id/order', getAllCustomersOrdersById);
router.get('/customer', getAllCustomers);
router.post('/customer/:id/order/bulk', addOrdersBulk);

export default router;
