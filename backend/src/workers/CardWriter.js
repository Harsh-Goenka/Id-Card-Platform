import fs from "fs/promises";
import path from "path";

export default class CardWriter{

  constructor(folder){

    this.folder=folder;

  }

  async save(

    fileName,

    buffer

  ){

    await fs.writeFile(

      path.join(

        this.folder,

        fileName

      ),

      buffer

    );

  }

}