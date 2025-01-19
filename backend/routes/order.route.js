import express from 'express';
import { adminRoute, protectRoute } from '../middleware/auth.middleware.js';
import { getAllOrders,createOrder } from '../controllers/order.controller.js';
const router = express.Router();

router.get("/",protectRoute,getAllOrders);

router.post("/",protectRoute,createOrder);

export default router;