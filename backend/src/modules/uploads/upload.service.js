import path from "path";
import {
  extractHeaders,
} from "../../services/excel.service.js";
import {
  moveFileToProject,
  clearProjectFolder,
  clearTemplateSide,
  createTempPhotosFolder,
  replaceProjectPhotos,
} from "../../services/storage.service.js";
import {
  findProjectForUser,
} from "../projects/project.service.js";
import AppError from "../../utils/AppError.js";
import fs from "fs/promises";
import {
  extractPhotosFromZip,
  createPhotoIndex,
} from "../../services/photos.service.js";

export const uploadExcelFile =
  async (

    userId,

    projectId,

    file

  ) => {

    const project =
      await findProjectForUser(

        userId,

        projectId

      );

    const headers =
      await extractHeaders(
        file.path
      );
      await clearProjectFolder(

  project.storage.folderName,

  "excel"

);

    await moveFileToProject(

      file.path,

      project.storage.folderName,

      "excel",

      "data.xlsx"

    );

    project.excel = {

      uploaded: true,

      originalName:
        file.originalname,

      headers,

    };

    await project.save();

    return project;

};

export const uploadTemplateFile =
  async (

    userId,

    projectId,

    side,

    file

  ) => {

    if (

      side !== "front" &&

      side !== "back"

    ) {

      throw new AppError(

        "Invalid template side",

        400

      );

    }

    const project =
      await findProjectForUser(

        userId,

        projectId

      );

    const extension =
      path.extname(

        file.originalname

      );

    const storedFileName =
      `${side}${extension}`;

    await clearTemplateSide(

  project.storage.folderName,

  side

);

    await moveFileToProject(

      file.path,

      project.storage.folderName,

      "template",

      storedFileName

    );

    project.template[side] = {

      uploaded: true,

      originalName:
        file.originalname,

      fileName:
        storedFileName,

    };

    await project.save();

    return project;

};
export const uploadPhotosZip=
async(
  userId,
  projectId,
  file
)=>{
  const project=
    await findProjectForUser(
      userId,
      projectId
    );

  

  const tempPhotosFolder =
  await createTempPhotosFolder(

    project.storage.folderName

  );



  try{

    

    await extractPhotosFromZip(
      file.path,
      tempPhotosFolder
    );

   

    const{
      count
    }=
      await createPhotoIndex(
        tempPhotosFolder
      );

  

    await replaceProjectPhotos(

  project.storage.folderName,

  tempPhotosFolder

);



    project.photos={
      uploaded:true,
      count,
      indexFile:"index.json",
    };



    await project.save();

  

    return project;

  }
  catch(error){

    console.error(error);

    await fs.rm(
      tempPhotosFolder,
      {
        recursive:true,
        force:true,
      }
    );

    throw error;

  }
  finally{

  

    await fs.unlink(
      file.path
    ).catch(()=>{});

  }

};