import express from "express";

import {
  create,
  getAll,
  getOne,
  remove,
} from "./project.controller.js";

import {
  protect,
} from "../../middleware/auth.middleware.js";

const router =
  express.Router();

router
  .route("/")
  .post(
    protect,
    create
  )
  .get(
    protect,
    getAll
  );
router.get(
  "/:id",
  protect,
  getOne
);
router.delete(
  "/:id",
  protect,
  remove
);
export default router;