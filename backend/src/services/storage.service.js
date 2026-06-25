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
      path.join(projectRoot, "cards"),
      { recursive: true }
    );

    await fs.mkdir(
      path.join(projectRoot, "pages"),
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

