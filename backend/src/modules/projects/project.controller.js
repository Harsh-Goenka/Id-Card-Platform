import asyncHandler from "../../utils/asyncHandler.js";

import ApiResponse from "../../utils/apiResponse.js";

import { createProjectSchema } from "./project.validation.js";

import {
  createProject,
  getProjects,
  getProjectById,
  deleteProject,
} from "./project.service.js";

export const create =
  asyncHandler(async (req, res) => {

    const validatedData =
      createProjectSchema.parse(
        req.body
      );

    const project =
      await createProject(
        req.user._id,
        validatedData
      );

    return res
      .status(201)
      .json(
        new ApiResponse(
          "Project created successfully",
          project
        )
      );

  });

export const getAll =
  asyncHandler(async (req, res) => {

    const projects =
      await getProjects(
        req.user._id
      );

    return res
      .status(200)
      .json(
        new ApiResponse(
          "Projects fetched successfully",
          projects
        )
      );

  });

export const getOne =
  asyncHandler(async (req, res) => {

    const project =
      await getProjectById(

        req.user._id,

        req.params.id

      );

    return res
      .status(200)
      .json(

        new ApiResponse(

          "Project fetched successfully",

          project

        )

      );

  });


export const remove =
  asyncHandler(async (req, res) => {

    await deleteProject(

      req.user._id,

      req.params.id

    );

    return res
      .status(200)
      .json(

        new ApiResponse(

          "Project deleted successfully"

        )

      );

  });