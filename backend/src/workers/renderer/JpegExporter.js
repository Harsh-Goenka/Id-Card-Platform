export default class JpegExporter{
  constructor(
    canvas
  ){
    this.canvas=
      canvas;
  }
  async export(){
    return await this.canvas.encode(
      "jpeg",
      {
        quality:90,
      }
    );
  }
}