import { createRequire } from "module";
import path from "path";
import cleanup
  from "./cleanup.js";
const require = createRequire(import.meta.url);

const archiver = require("archiver");

export default class ExportStreamer {

  constructor(
    response,
    projectFolder
  ) {

    this.res = response;

    this.projectFolder = projectFolder;

  }

  async stream() {

    const archive =
      archiver("zip", {

        zlib: {

          level: 9,

        },

      });

    this.res.setHeader(

      "Content-Type",

      "application/zip"

    );

    this.res.setHeader(

      "Content-Disposition",

      'attachment; filename="id-cards.zip"'

    );

    archive.pipe(this.res);
    const cleanupFiles =
  async()=>{

    await cleanup(

      this.projectFolder

    );

  };

this.res.once(

  "finish",

  cleanupFiles

);

this.res.once(

  "close",

  cleanupFiles

);

    archive.directory(

      path.join(

        this.projectFolder,

        "cards"

      ),

      "individual-cards"

    );

    archive.file(

      path.join(

        this.projectFolder,

        "cards.pdf"

      ),

      {

        name: "cards.pdf",

      }

    );

    await archive.finalize();
  

  }

}