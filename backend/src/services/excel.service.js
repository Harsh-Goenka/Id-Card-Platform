import ExcelJS from "exceljs";

import AppError from "../utils/AppError.js";

export const extractHeaders =
  async (filePath) => {

    const workbook =
      new ExcelJS.Workbook();

    await workbook.xlsx.readFile(
      filePath
    );

    const worksheet =
      workbook.getWorksheet(1);

    if (!worksheet) {

      throw new AppError(
        "Excel file must contain at least one worksheet",
        400
      );

    }

    const firstRow =
      worksheet.getRow(1);

    const headers =
      firstRow.values
        .slice(1)
        .map((value) =>
          String(value ?? "").trim()
        )
        .filter(Boolean);

    if (
      headers.length === 0
    ) {

      throw new AppError(
        "Header row is empty",
        400
      );

    }

    return headers;

};