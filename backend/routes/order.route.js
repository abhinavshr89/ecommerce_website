import express from 'express';
import { adminRoute, protectRoute } from '../middleware/auth.middleware.js';
import { getAllOrders,createOrder, deleteOrder, getOrderByUser } from '../controllers/order.controller.js';
const router = express.Router();

router.get("/",protectRoute,getAllOrders);

router.post("/",protectRoute,createOrder);

router.delete("/:id",protectRoute,adminRoute,deleteOrder);

router.get("/user-order",protectRoute,getOrderByUser)

export default router;