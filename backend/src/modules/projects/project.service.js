import { Project } from "./project.model.js";
import mongoose from "mongoose";

import {
  createProjectWorkspace,
  deleteProjectWorkspace,
} from "../../services/storage.service.js";

import crypto from "crypto";
import AppError from "../../utils/AppError.js";

export const createProject =
  async (
    userId,
    projectData
  ) => {

    const folderName =
      crypto.randomUUID();

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

          layout: {

            objects: [],

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

export const getProjects =
  async (userId) => {

    return await Project.find({

      owner: userId,

    })

      .select(

        "-storage.folderName"

      )

      .sort({

        updatedAt: -1,

      });

};

export const deleteProject =
  async (
    userId,
    projectId
  ) => {

    if (

      !mongoose.Types.ObjectId.isValid(

        projectId

      )

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

      console.error(error);

    }

};

export const findProjectForUser =
  async (
    userId,
    projectId
  ) => {

    if (

      !mongoose.Types.ObjectId.isValid(

        projectId

      )

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

export const saveLayout =
  async (

    userId,

    projectId,

    objects

  ) => {

    const project =
      await findProjectForUser(

        userId,

        projectId

      );

    project.layout.objects =
      objects;

    await project.save();

    return project.layout;

};