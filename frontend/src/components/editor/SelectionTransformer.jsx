import { useEffect, useRef } from "react";

import { Transformer } from "react-konva";

import { useEditor } from "../../context/EditorContext";

export default function SelectionTransformer({

  stageRef,

}) {

  const transformerRef =
    useRef();

  const {

    selectedObjectId,

  } = useEditor();

  useEffect(() => {

    const transformer =
      transformerRef.current;

    const stage =
      stageRef.current;

    if (
      !transformer ||
      !stage
    ) {

      return;

    }

    if (
      !selectedObjectId
    ) {

      transformer.nodes([]);

      transformer.getLayer()?.batchDraw();

      return;

    }

    const node =
      stage.findOne(

        `#${selectedObjectId}`

      );

    if (!node) {

      transformer.nodes([]);

      transformer.getLayer()?.batchDraw();

      return;

    }

    transformer.nodes([node]);

    transformer.getLayer()?.batchDraw();

  }, [

    selectedObjectId,

    stageRef,

  ]);

  return (

    <Transformer

      ref={transformerRef}

      rotateEnabled={false}

      keepRatio={false}

      anchorSize={8}

      borderStroke="#2563eb"

      borderStrokeWidth={1}

    />

  );

}