import fs from "fs/promises";
import fsSync from "fs";
import path from "path";
import unzipper from "unzipper";
import { pipeline } from "stream/promises";

const IMAGE_EXTENSIONS=[
  ".jpg",
  ".jpeg",
  ".png",
];

export const isSupportedPhoto=(fileName)=>{
  return IMAGE_EXTENSIONS.includes(
    path.extname(fileName).toLowerCase()
  );
};

export const getPhotoId=(fileName)=>{
  return path.parse(fileName).name;
};

export const createPhotoIndex=async(folder)=>{
  const files=await fs.readdir(folder);

  const index={};

  const sortedFiles=
    files.sort();

  for(const file of sortedFiles){

    if(file.startsWith(".")) continue;

    if(file==="index.json") continue;

    if(!isSupportedPhoto(file)) continue;

    const id=
      getPhotoId(file);

    if(index[id]) continue;

    index[id]={
      file,
      extension:path.extname(file)
    };

  }

  await fs.writeFile(
    path.join(folder,"index.json"),
    JSON.stringify(index,null,2),
    "utf8"
  );

  return{
    count:Object.keys(index).length,
    index
  };

};


export const extractPhotosFromZip=async(
  zipPath,
  destinationFolder
)=>{
  const extracted=[];
  const seen=new Set();

  const directory=
    await unzipper.Open.file(
      zipPath
    );

 

  for(const entry of directory.files){

    

    if(
      entry.type==="Directory"
    ){
      continue;
    }

    const entryPath=
      entry.path;

    const fileName=
      path.basename(
        entryPath
      );

    if(
      fileName.startsWith(".")
    ){
      continue;
    }

    if(
      entryPath.includes("__MACOSX")
    ){
      continue;
    }

    if(
      !isSupportedPhoto(
        fileName
      )
    ){
      continue;
    }

    const photoId=
      getPhotoId(
        fileName
      );

    if(
      seen.has(photoId)
    ){
      continue;
    }

    seen.add(photoId);

    const destinationFile=
      path.join(
        destinationFolder,
        fileName
      );

    await pipeline(
      entry.stream(),
      fsSync.createWriteStream(
        destinationFile
      )
    );

    extracted.push(
      fileName
    );

  }

  return extracted;

};