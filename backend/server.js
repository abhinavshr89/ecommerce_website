import dotenv from 'dotenv';
import express from 'express';
import authRoutes from './routes/auth.route.js';
import connectDb from "./lib/connectDb.js"
import cookieParser from 'cookie-parser';
import productRoutes from "./routes/product.route.js"
import cartRoutes from "./routes/cart.route.js"
import cors from 'cors';
import path from 'path';
const app = express()
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

dotenv.config();


const PORT = process.env.PORT || 5000 ;
const __dirname = path.resolve();


app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",authRoutes);
app.use("/api/products",productRoutes);
app.use("/api/cart",cartRoutes);

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

app.listen(PORT, () => {
    connectDb();
  console.log(`Server is running on port ${PORT}`)
})
