import path from "path";

import {
  loadGenerationData,
} from "./generationLoader.js";

import PdfGenerator
  from "../../workers/export/PdfGenerator.js";

import GenerationEngine
  from "../../workers/generationEngine.js";



export const startGeneration =
async (
  userId,
  projectId
) => {

  const {

    project,

    rows,

    layout,

    photoIndex,

  } =
    await loadGenerationData(

      userId,

      projectId

    );

  const engine =
    new GenerationEngine({

      project,

      rows,

      layout,

      photoIndex,

    });

  await engine.run();

  const projectFolder =
    path.join(

      process.cwd(),

      "storage",

      project.storage.folderName

    );

  const pdf =
    new PdfGenerator({

      project,

      cardsFolder:
        path.join(

          projectFolder,

          "cards"

        ),

      outputFolder:
        projectFolder,

    });

  await pdf.initialize();

  await pdf.generate();

  await pdf.save();

  return {

  projectFolder,

  rows:
    rows.length,

};

};