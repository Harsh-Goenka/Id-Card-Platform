import fs from "fs/promises";
import path from "path";

export default async function cleanup(
  projectFolder
){

  try{

    const cardsFolder =
      path.join(

        projectFolder,

        "cards"

      );

    let files = [];

    try{

      files =
        await fs.readdir(
          cardsFolder
        );

    }

    catch{

      // cards folder doesn't exist

    }

    await Promise.all(

      files.map(

        file =>

          fs.rm(

            path.join(

              cardsFolder,

              file

            ),

            {

              force:true,

            }

          )

      )

    );

    await fs.rm(

      path.join(

        projectFolder,

        "cards.pdf"

      ),

      {

        force:true,

      }

    );

    console.log(
      "Temporary export cleaned."
    );

  }

  catch(error){

    console.error(

      "Cleanup failed:",

      error

    );

  }

}