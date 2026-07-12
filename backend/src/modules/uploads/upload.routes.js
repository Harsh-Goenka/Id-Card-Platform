import express from "express";
import { protect } from "../../middleware/auth.middleware.js";
import {
  excelUpload,
  templateUpload,
  photosUpload,
} from "../../config/multer.js";
import {
  uploadExcel,
  uploadTemplate,
  uploadPhotos,
} from "./upload.controller.js";

const router=express.Router();

router.post(
  "/projects/:id/excel",
  protect,
  excelUpload.single("excel"),
  uploadExcel
);

router.post(
  "/projects/:id/template/:side",
  protect,
  templateUpload.single("template"),
  uploadTemplate
);

router.post(
  "/projects/:id/photos",
  protect,
  photosUpload.single("photos"),
  uploadPhotos
);


export default router;