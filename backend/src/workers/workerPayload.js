import {
  cardSizeToPixels,
} from "../utils/units.js";
export const buildWorkerPayload=({

  project,

  layout,

  rows,
  startIndex,

})=>{

  return{

    projectId:
      project._id.toString(),

    storageFolder:
      project.storage.folderName,

    card:
      cardSizeToPixels(
      project.card
    ),

    layout,


    rows,
    startIndex,

  };

};