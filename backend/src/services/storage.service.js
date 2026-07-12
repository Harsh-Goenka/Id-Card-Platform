import fs from "fs/promises";
import path from "path";

const STORAGE_ROOT = path.join(
  process.cwd(),
  "storage"
);

export const createProjectWorkspace =
  async (folderName) => {

    const projectRoot =
      path.join(
        STORAGE_ROOT,
        folderName
      );

    await fs.mkdir(
      path.join(projectRoot, "excel"),
      { recursive: true }
    );

    await fs.mkdir(
      path.join(projectRoot, "template"),
      { recursive: true }
    );

    await fs.mkdir(
      path.join(projectRoot, "photos"),
      { recursive: true }
    );

    await fs.mkdir(
      path.join(projectRoot, "cards"),
      { recursive: true }
    );

    await fs.mkdir(
      path.join(projectRoot, "exports"),
      { recursive: true }
    );

    return {
      projectRoot,
    };

};

export const deleteProjectWorkspace =
  async (folderName) => {

    const projectRoot =
      path.join(
        STORAGE_ROOT,
        folderName
      );

    await fs.rm(
      projectRoot,
      {
        recursive: true,
        force: true,
      }
    );

};

export const moveFileToProject =
  async (
    tempFilePath,
    folderName,
    destinationFolder,
    destinationFileName
  ) => {

    const targetFolder =
      path.join(
        STORAGE_ROOT,
        folderName,
        destinationFolder
      );

    await fs.mkdir(
      targetFolder,
      {
        recursive: true,
      }
    );

    const destinationPath =
      path.join(
        targetFolder,
        destinationFileName
      );

    await fs.copyFile(
      tempFilePath,
      destinationPath
    );

    await fs.unlink(
      tempFilePath
    );

    return destinationPath;

};



export const replaceProjectPhotos =
async(
  folderName,
  tempFolder
)=>{

  const photosFolder =
    path.join(

      STORAGE_ROOT,

      folderName,

      "photos"

    );

  await fs.rm(

    photosFolder,

    {

      recursive:true,

      force:true,

    }

  );

  await fs.rename(

    tempFolder,

    photosFolder

  );

  return photosFolder;

};
export const createTempPhotosFolder =
async(
  folderName
)=>{

  const folder =
    path.join(

      STORAGE_ROOT,

      folderName,

      "photos_tmp"

    );

  await fs.rm(

    folder,

    {

      recursive:true,

      force:true,

    }

  );

  await fs.mkdir(

    folder,

    {

      recursive:true,

    }

  );

  return folder;

};

export const clearProjectFolder =
async(
  folderName,
  subFolder
)=>{

  const folder =
    path.join(

      STORAGE_ROOT,

      folderName,

      subFolder

    );

  await fs.mkdir(
    folder,
    {
      recursive:true,
    }
  );

  const files =
    await fs.readdir(
      folder
    );

  await Promise.all(

    files.map(

      file=>

        fs.rm(

          path.join(
            folder,
            file
          ),

          {
            recursive:true,
            force:true,
          }

        )

    )

  );

};


export const clearTemplateSide =
async(
  folderName,
  side
)=>{

  const folder =
    path.join(

      STORAGE_ROOT,

      folderName,

      "template"

    );

  await fs.mkdir(
    folder,
    {
      recursive:true,
    }
  );

  const files =
    await fs.readdir(
      folder
    );

  await Promise.all(

    files

      .filter(

        file=>

          file.startsWith(
            `${side}.`
          )

      )

      .map(

        file=>

          fs.rm(

            path.join(
              folder,
              file
            ),

            {
              force:true,
            }

          )

      )

  );

};


export const clearTemporaryUploads =
async (
  folderName
) => {

  await clearProjectFolder(
    folderName,
    "excel"
  );

  await clearProjectFolder(
    folderName,
    "photos"
  );

};