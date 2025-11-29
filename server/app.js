import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";

import authRoutes from "./routes/authRoutes.js";

import dotenv from "dotenv";
dotenv.config();
const app = express();

app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL, 
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(rateLimit({
  windowMs: 60000,
  max: 100,
}));

console.log(process.env.FRONTEND_URL,'fronted url')

app.use("/api/auth",authRoutes );

app.get("/health", (_, res) => res.json({ status: "ok" }));

export default app;
