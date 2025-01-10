import dotenv from 'dotenv';
import express from 'express';
import authRoutes from './routes/auth.route.js';
import connectDb from "./lib/connectDb.js"
import cookieParser from 'cookie-parser';
import productRoutes from "./routes/product.route.js"
import cartRoutes from "./routes/cart.route.js"

dotenv.config();

const app = express()
const PORT = process.env.PORT ;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",authRoutes);
app.use("/api/products",productRoutes);
app.use("/api/cart",cartRoutes);


app.listen(PORT, () => {
    connectDb();
  console.log(`Server is running on port ${PORT}`)
})
