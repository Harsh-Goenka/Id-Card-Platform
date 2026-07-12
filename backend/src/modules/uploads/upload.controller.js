import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/apiResponse.js";
import {
  uploadExcelFile,
  uploadTemplateFile,
  uploadPhotosZip,
} from "./upload.service.js";

export const uploadExcel=asyncHandler(async(req,res)=>{
  const result=await uploadExcelFile(
    req.user._id,
    req.params.id,
    req.file
  );
  return res.status(200).json(
    new ApiResponse(
      "Excel uploaded successfully",
      result
    )
  );
});

export const uploadTemplate=asyncHandler(async(req,res)=>{
  const result=await uploadTemplateFile(
    req.user._id,
    req.params.id,
    req.params.side,
    req.file
  );
  return res.status(200).json(
    new ApiResponse(
      "Template uploaded successfully",
      result
    )
  );
});

export const uploadPhotos=asyncHandler(async(req,res)=>{
  const result=await uploadPhotosZip(
    req.user._id,
    req.params.id,
    req.file
  );
  return res.status(200).json(
    new ApiResponse(
      "Photos uploaded successfully",
      result
    )
  );
});