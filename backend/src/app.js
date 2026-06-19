import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import authRoutes from "./modules/auth/auth.routes.js";
import errorHandler from "./middleware/errorHandler.js";
const app = express();

app.use(helmet());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use(cookieParser());

app.use(
  "/api/auth",
  authRoutes
);

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server Running",
  });
});

app.use(errorHandler);

export default app;