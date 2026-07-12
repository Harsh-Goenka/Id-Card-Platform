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
      
      return;
    }
    
    const photo=
      this.photoIndex[
        photoId
      ];
    
    if(
      !photo
    ){
      
      
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
    
    const image=
      await loadImage(
        imagePath
      );
    
    this.ctx.drawImage(
      image,
      object.x,
      object.y,
      object.width,
      object.height
    );
   
  }
}