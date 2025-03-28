import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import productRoutes from "./routes/productRoutes";
import authRoutes from "./routes/authRoutes";

import { productDB } from "./config/productDB";
import { userDB } from "./config/userDB";
import { protectRoute } from "./middleware/authMiddleware";

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/api/users", authRoutes);
app.use("/api/products", productRoutes);

productDB()
  .then(() => userDB())
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started at PORT  ${PORT}`);
    });
  });
