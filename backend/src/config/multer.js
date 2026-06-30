import multer from "multer";
import crypto from "crypto";
import os from "os";
import path from "path";
import fs from "fs";

const tempUploadPath = path.join(
  os.tmpdir(),
  "id-card-platform"
);

fs.mkdirSync(tempUploadPath, {
  recursive: true,
});

const storage = multer.diskStorage({

  destination(req, file, cb) {

    cb(null, tempUploadPath);

  },

  filename(req, file, cb) {

    const extension =
      path.extname(file.originalname);

    cb(
      null,
      `${crypto.randomUUID()}${extension}`
    );

  },

});

const createUploader = ({
  allowedMimeTypes,
  maxFileSize,
}) => {

  return multer({

    storage,

    limits: {

      fileSize: maxFileSize,

    },

    fileFilter(req, file, cb) {

      if (
        !allowedMimeTypes.includes(
          file.mimetype
        )
      ) {

        return cb(
          new Error(
            "Invalid file type"
          )
        );

      }

      cb(null, true);

    },

  });

};

export const excelUpload =
  createUploader({

    allowedMimeTypes: [

      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",

    ],

    maxFileSize:
      20 * 1024 * 1024,

  });

export const templateUpload =
  createUploader({

    allowedMimeTypes: [

      "image/jpeg",

      "image/png",

    ],

    maxFileSize:
      20 * 1024 * 1024,

  });

export const photosUpload =
  createUploader({

    allowedMimeTypes: [

      "application/zip",

      "application/x-zip-compressed",

    ],

    maxFileSize:
      500 * 1024 * 1024,

  });
  