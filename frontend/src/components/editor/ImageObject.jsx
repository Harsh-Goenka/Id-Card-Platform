import {
  Rect,
  Text,
} from "react-konva";

import { useEditor } from "../../context/EditorContext";

export default function ImageObject({

  object,

}) {

  const {

    setSelectedObjectId,

    updateObject,

  } = useEditor();

  return (

    <>

      <Rect

        id={object.id}

        x={object.x}

        y={object.y}

        width={object.width}

        height={object.height}

        stroke="black"

        dash={[5, 5]}

        draggable

        onClick={() =>

          setSelectedObjectId(

            object.id

          )

        }

        onTap={() =>

          setSelectedObjectId(

            object.id

          )

        }

        onDragEnd={(event) => {

          updateObject(

            object.id,

            {

              x:
                event.target.x(),

              y:
                event.target.y(),

            }

          );

        }}

        onTransformEnd={(event) => {

          const node =
            event.target;

          const scaleX =
            node.scaleX();

          const scaleY =
            node.scaleY();

          updateObject(

            object.id,

            {

              x:
                node.x(),

              y:
                node.y(),

              width:
                Math.max(

                  30,

                  node.width() *
                  scaleX

                ),

              height:
                Math.max(

                  30,

                  node.height() *
                  scaleY

                ),

            }

          );

          node.scaleX(1);

          node.scaleY(1);

        }}

      />

      <Text

  listening={false}

  x={object.x}

  y={
    object.y +
    object.height / 2 -
    18
  }

  width={
    object.width
  }
  fontSize={18}

  align="center"

  fontStyle="bold"

  text="PHOTO"

/>

<Text

  listening={false}

  x={object.x}

  y={
    object.y +
    object.height / 2 +
    4
  }

  width={
    object.width
  }

  align="center"

  fontSize={18}

  fill="#2563eb"

  text={
    object.binding ||
    "Not Bound"
  }

/>

    </>

  );

}