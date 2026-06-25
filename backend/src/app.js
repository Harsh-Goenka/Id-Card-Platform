import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import authRoutes from "./modules/auth/auth.routes.js";
import errorHandler from "./middleware/errorHandler.js";
import requestId from "./middleware/requestId.middleware.js";
import logger from "./config/morgan.js";
import projectRoutes
from "./modules/projects/project.routes.js";


const app = express();


app.use(requestId);
app.use(logger);
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

app.use(
  "/api/projects",
  projectRoutes
);

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server Running",
  });
});

app.use(errorHandler);

export default app;