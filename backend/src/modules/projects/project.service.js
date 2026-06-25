import { Project } from "./project.model.js";
import mongoose from "mongoose";
import {
  createProjectWorkspace,
  deleteProjectWorkspace,
} from "../../services/storage.service.js";

import { v4 as uuidv4 } from "uuid";

import AppError from "../../utils/AppError.js";

export const createProject =
  async (
    userId,
    projectData
  ) => {

    const folderName =
      uuidv4();

    try {

      await createProjectWorkspace(
        folderName
      );

      const project =
        await Project.create({

          owner: userId,

          name:
            projectData.name,

          description:
            projectData.description,

          card:
            projectData.card,

          storage: {

            folderName,

          },

        });

      return project;

    } catch (error) {

      await deleteProjectWorkspace(
        folderName
      );

      throw new AppError(
        error.message,
        500
      );

    }

};
export const getProjects = async (userId) => {

  const projects = await Project.find({
    owner: userId,
  })
    .select(
      "-storage.folderName"
    )
    .sort({
      updatedAt: -1,
    });

  return projects;

};

export const getProjectById = async (
  userId,
  projectId
) => {

  if (
    !mongoose.Types.ObjectId.isValid(projectId)
  ) {
    throw new AppError(
      "Project not found",
      404
    );
  }

  const project =
    await Project.findOne({

      _id: projectId,

      owner: userId,

    });

  if (!project) {

    throw new AppError(
      "Project not found",
      404
    );

  }

  return project;

};




export const deleteProject = async (
  userId,
  projectId
) => {

  if (
    !mongoose.Types.ObjectId.isValid(projectId)
  ) {
    throw new AppError(
      "Project not found",
      404
    );
  }

  const project =
    await Project.findOne({

      _id: projectId,

      owner: userId,

    });

  if (!project) {
    throw new AppError(
      "Project not found",
      404
    );
  }

  const folderName =
    project.storage.folderName;

  await project.deleteOne();

  try {

    await deleteProjectWorkspace(
      folderName
    );

  } catch (error) {

    console.error(
      "Workspace cleanup failed:",
      error
    );

  }

};