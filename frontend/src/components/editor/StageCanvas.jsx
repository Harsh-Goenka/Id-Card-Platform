import { useEffect, useRef, useState } from "react";
import { Stage, Layer, Rect, Image } from "react-konva";
import ObjectLayer from "./ObjectLayer";
import SelectionTransformer from "./SelectionTransformer";
import { useEditor } from "../../context/EditorContext";

export default function StageCanvas({ canvas }) {
  const stageRef = useRef(null);
  const [background, setBackground] = useState(null);

  const {
    project,
    clearSelection,
    copySelectedObject,
    pasteClipboard,
    duplicateSelectedObject,
  } = useEditor();

  useEffect(() => {
    setBackground(null);
    if (
      !project?.template?.front?.uploaded ||
      !project?.template?.front?.fileName
    ) {
      return;
    }
    const image = new window.Image();
    image.crossOrigin = "anonymous";
    image.src = `http://localhost:5000/storage/${project.storage.folderName}/template/${project.template.front.fileName}?t=${Date.now()}`;
    image.onload = () => {
      setBackground(image);
    };
  }, [project]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const target = event.target;
      if (
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target.isContentEditable
      ) {
        return;
      }
      if (event.ctrlKey || event.metaKey) {
        const key = event.key.toLowerCase();
        switch (key) {
          case "c":
            event.preventDefault();
            copySelectedObject();
            break;
          case "v":
            event.preventDefault();
            pasteClipboard();
            break;
          case "d":
            event.preventDefault();
            duplicateSelectedObject();
            break;
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    copySelectedObject,
    pasteClipboard,
    duplicateSelectedObject,
  ]);

  return (
    <Stage
      ref={stageRef}
      width={canvas.displayWidth}
      height={canvas.displayHeight}
      onMouseDown={(event) => {
        const target = event.target;
        if (
          target === target.getStage() ||
          target.name() === "canvas-background"
        ) {
          clearSelection();
        }
      }}
    >
      <Layer scaleX={canvas.scale} scaleY={canvas.scale}>
        <Rect
          name="canvas-background"
          x={0}
          y={0}
          width={canvas.documentWidth}
          height={canvas.documentHeight}
          fill="white"
          stroke="#D8D1C7"
          strokeWidth={1}
        />
        {background && (
          <Image
            name="canvas-background"
            image={background}
            x={0}
            y={0}
            width={canvas.documentWidth}
            height={canvas.documentHeight}
          />
        )}
        <ObjectLayer />
        <SelectionTransformer stageRef={stageRef} />
      </Layer>
    </Stage>
  );
}