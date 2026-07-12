import express from "express";

import {

  create,

  getAll,

  getOne,

  remove,

  updateLayout,

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

router.put(

  "/:id/layout",

  protect,

  updateLayout

);

router.delete(

  "/:id",

  protect,

  remove

);

export default router;