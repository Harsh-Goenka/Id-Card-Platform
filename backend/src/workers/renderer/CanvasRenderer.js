import {
  createCanvas,
} from "@napi-rs/canvas";
import BackgroundPass from "./BackgroundPass.js";
import PhotoPass from "./PhotoPass.js";
import TextPass from "./TextPass.js";
import JpegExporter
  from "./JpegExporter.js";
export default class CanvasRenderer{
  constructor(card){
    this.card=card;
    this.background=null;
    this.photoPass = null;
    this.textPass = null;


    
    this.canvas=
      createCanvas(
        Math.round(
          card.width
        ),
        Math.round(
          card.height
        )
      );
    this.ctx=
      this.canvas.getContext(
        "2d"
      );
      this.exporter =
  new JpegExporter(
    this.canvas
  );
  }
 async initialize(
  templatePath,
  photoIndex,
  storageFolder
){
  this.background =
    new BackgroundPass(
      this.ctx,
      this.canvas,
      templatePath
    );
  await this.background.initialize();
  this.photoPass =
    new PhotoPass(
      this.ctx,
      photoIndex,
      storageFolder
    );
  this.textPass =
    new TextPass(
      this.ctx
    );
}
  drawBackground(){
  if(
    !this.background
  ){
    throw new Error(
      "CanvasRenderer not initialized"
    );
  }
  this.background.draw();
}
  getContext(){
    return this.ctx;
  }
  getCanvas(){
    return this.canvas;
  }
  async renderCard(
  objects
){
  this.clear();
  this.drawBackground();
  for(
    const object
    of objects
  ){
    if(
      object.type==="image"
    ){
      await this.photoPass.draw(
        object,
        object.photoId
      );
      continue;
    }
    if(
      object.type==="text"
    ){
      this.textPass.draw(
        object
      );
    }
  }
}
  // clear(){
  //   this.ctx.clearRect(
  //     0,
  //     0,
  //     this.canvas.width,
  //     this.canvas.height
  //   );
  // }

  //new code
  clear(){
    this.ctx.clearRect(
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );
    // Explicit low-level canvas buffer flush hook
    this.canvas.width = this.canvas.width; 
  }
  async exportJpeg(){
  return await this.exporter.export();
}
}