import express from "express";

import { protect } from "../../middleware/auth.middleware.js";

import {
  generateProject,
} from "./generation.controller.js";

const router =
  express.Router();

router.post(

  "/projects/:id",

  protect,

  generateProject

);

export default router;