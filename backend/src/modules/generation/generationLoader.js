import fs from "fs/promises";
import path from "path";
import ExcelJS from "exceljs";
import AppError from "../../utils/AppError.js";
import {
  findProjectForUser,
} from "../projects/project.service.js";
export const loadGenerationData=
async(
  userId,
  projectId
)=>{
  const project=
    await findProjectForUser(
      userId,
      projectId
    );
  if(
    !project.excel.uploaded
  ){
    throw new AppError(
      "Excel not uploaded",
      400
    );
  }
  if(
    !project.photos.uploaded
  ){
    throw new AppError(
      "Photos not uploaded",
      400
    );
  }
  if(
    !project.template.front.uploaded
  ){
    throw new AppError(
      "Front template not uploaded",
      400
    );
  }
  const projectFolder=
    path.join(
      process.cwd(),
      "storage",
      project.storage.folderName
    );
  const workbook=
    new ExcelJS.Workbook();
  await workbook.xlsx.readFile(
    path.join(
      projectFolder,
      "excel",
      "data.xlsx"
    )
  );
  const worksheet=
    workbook.getWorksheet(1);
  if(
    !worksheet
  ){
    throw new AppError(
      "Worksheet not found",
      400
    );
  }
  const rows=[];
  const headers=
    worksheet.getRow(1)
      .values
      .slice(1);
  worksheet.eachRow(
    (
      row,
      rowNumber
    )=>{
      if(
        rowNumber===1
      ) return;
      const obj={};
      headers.forEach(
        (
          header,
          index
        )=>{
          const cell =
  row.getCell(index + 1).value;

const value =
  typeof cell === "object" && cell !== null
    ? String(cell.text ?? cell.result ?? "")
    : cell;

console.log(
  "HEADER:",
  header,
  "| VALUE:",
  value,
  "| RAW:",
  cell
);

obj[header] = value;
        }
      );
      rows.push(
        obj
      );
    }
  );
  const photoIndex=
    JSON.parse(
      await fs.readFile(
        path.join(
          projectFolder,
          "photos",
          "index.json"
        ),
        "utf8"
      )
    );
  return{
    project,
    rows,
    layout:
      project.layout.objects.map(
        object => object.toObject()
      ),
    photoIndex,
  };
};