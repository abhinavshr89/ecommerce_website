import express from 'express';
import { addToCart, removeAllFromCart,updateQuantity,getCartProducts } from '../controllers/cart.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get("/",getCartProducts);
router.post("/",protectRoute,addToCart);
router.post("/",removeAllFromCart);
router.put("/",protectRoute,updateQuantity);





export default router;