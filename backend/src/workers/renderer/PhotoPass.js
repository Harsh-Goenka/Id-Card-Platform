import path from "path";
import {
  loadImage,
} from "@napi-rs/canvas";
export default class PhotoPass{
  constructor(
    context,
    photoIndex,
    storageFolder
  ){
    this.ctx=context;
    this.photoIndex=
      photoIndex;
    this.storageFolder=
      storageFolder;
  }
  async draw(
    object,
    photoId
  ){
    if(
      !photoId
    ){
      console.log(
        "No photoId received"
      );
      return;
    }
    console.log(
      "PhotoId:",
      photoId
    );
    const photo=
      this.photoIndex[
        photoId
      ];
    console.log(
      "Photo object:",
      photo
    );
    if(
      !photo
    ){
      console.log(
        "Photo not found in index.json"
      );
      return;
    }
    const imagePath=
      path.join(
        process.cwd(),
        "storage",
        this.storageFolder,
        "photos",
        photo.file
      );
    console.log(
      "Loading image:",
      imagePath
    );
    const image=
      await loadImage(
        imagePath
      );
    console.log(
      "Image loaded:",
      image.width,
      image.height
    );
    this.ctx.drawImage(
      image,
      object.x,
      object.y,
      object.width,
      object.height
    );
    console.log(
      "Photo drawn on canvas"
    );
  }
}