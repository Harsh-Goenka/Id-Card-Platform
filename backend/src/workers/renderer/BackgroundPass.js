import { loadImage } from "@napi-rs/canvas";

export default class BackgroundPass{

  constructor(
    context,
    canvas,
    templatePath
  ){

    this.ctx=context;

    this.canvas=canvas;

    this.templatePath=templatePath;

    this.template=null;

  }

  async initialize(){

    this.template=
      await loadImage(
        this.templatePath
      );

  }

  draw(){

    this.ctx.drawImage(

      this.template,

      0,

      0,

      this.canvas.width,

      this.canvas.height

    );

  }

}