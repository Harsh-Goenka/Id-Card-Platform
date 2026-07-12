import { useEditor } from "../../context/EditorContext";

import StageCanvas from "./StageCanvas";

import {

  getCanvasPixelSize,

  getDisplayScale,

} from "../../utils/canvas";

export default function CanvasArea() {

  const { project } =
    useEditor();

  const pixelSize =
    getCanvasPixelSize(
      project
    );

  const scale =
    getDisplayScale(

      pixelSize.width,

      pixelSize.height,

      900,

      600

    );

  const canvas = {

    documentWidth:
      pixelSize.width,

    documentHeight:
      pixelSize.height,

    displayWidth:
      pixelSize.width *
      scale,

    displayHeight:
      pixelSize.height *
      scale,

    scale,

    dpi:
      project.card.dpi,

    unit:
      project.card.unit,

  };

  return (

    <main
  className="flex-1 overflow-auto"
  style={{
    background: "#ECE8E2",
  }}
>

  <div

    className="flex min-h-full min-w-full items-center justify-center p-14"

  >

    <StageCanvas

      canvas={canvas}

    />

  </div>

</main>

  );

}