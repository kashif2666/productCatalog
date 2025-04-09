import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import productRoutes from "./routes/productRoutes";
import authRoutes from "./routes/authRoutes";

import { productDB } from "./config/productDB";
import { userDB } from "./config/userDB";
import cors from "cors";
import { protectRoute } from "./middleware/authMiddleware";

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/v1/auth", authRoutes);
app.use("/api/products", protectRoute, productRoutes);

productDB()
  .then(() => userDB())
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started at PORT  ${PORT}`);
    });
  });
