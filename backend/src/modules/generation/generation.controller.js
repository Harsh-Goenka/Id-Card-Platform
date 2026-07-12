import path from "path";

import asyncHandler from "../../utils/asyncHandler.js";

import {
  startGeneration,
} from "./generation.service.js";

import ExportStreamer
  from "../../workers/export/ExportStreamer.js";

export const generateProject =
asyncHandler(

  async (

    req,

    res

  ) => {

    const result =

      await startGeneration(

        req.user.id,

        req.params.id

      );

    const exporter =

      new ExportStreamer(

        res,

        result.projectFolder

      );

    await exporter.stream();

  }

);