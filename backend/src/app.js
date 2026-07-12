import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import path from "path";

import authRoutes from "./modules/auth/auth.routes.js";
import projectRoutes from "./modules/projects/project.routes.js";
import uploadRoutes from "./modules/uploads/upload.routes.js";
import generationRoutes from "./modules/generation/generation.routes.js";
import errorHandler from "./middleware/errorHandler.js";
import requestId from "./middleware/requestId.middleware.js";



const app = express();

app.use(requestId);



app.use(helmet({

  crossOriginResourcePolicy: false,

}));

app.use(

  cors({

    origin:  process.env.CLIENT_URL,

    credentials: true,

  })

);

app.use(express.json());

app.use(cookieParser());

app.use(

  "/storage",

  express.static(

    path.join(

      process.cwd(),

      "storage"

    )

  )

);

app.use(

  "/api/auth",

  authRoutes

);

app.use(

  "/api/projects",

  projectRoutes

);

app.use(

  "/api/uploads",

  uploadRoutes

);
app.use(

  "/api/generation",

  generationRoutes

);
app.get(

  "/api/health",

  (req, res) => {

    res.status(200).json({

      success: true,

      message: "Server Running",

    });

  }

);

app.use(errorHandler);

export default app;