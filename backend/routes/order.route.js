import express from 'express';
import { adminRoute, protectRoute } from '../middleware/auth.middleware.js';
import { getAllOrders,createOrder, deleteOrder } from '../controllers/order.controller.js';
const router = express.Router();

router.get("/",protectRoute,getAllOrders);

router.post("/",protectRoute,createOrder);

router.delete("/:id",protectRoute,adminRoute,deleteOrder);

export default router;