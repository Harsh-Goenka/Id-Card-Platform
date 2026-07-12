import {
  Group,
  Rect,
  Text,
} from "react-konva";

import { useEditor } from "../../context/EditorContext";

export default function TextObject({

  object,

}) {

  const {

    setSelectedObjectId,

    updateObject,

  } = useEditor();

  const displayText =

    object.staticText?.trim()

      ? object.staticText

      : object.binding

      ? `{${object.binding}}`

      : "TEXT";

  let displayFontSize =
  object.fontSize;

if (
  object.textMode === "fit"
) {

  while (
    displayFontSize > 6
  ) {

    const temp =
      new window.Konva.Text({

        text: displayText,

        fontFamily:
          object.fontFamily,

        fontSize:
          displayFontSize,

        fontStyle:
          object.bold &&
          object.italic
            ? "bold italic"
            : object.bold
            ? "bold"
            : object.italic
            ? "italic"
            : "normal",

      });

    if (
      temp.width() <=
      object.width - 8
    ) {
      break;
    }

    displayFontSize--;

  }

}

  return (

    <Group
    
  clipX={0}
  clipY={0}
  clipWidth={object.width}
  clipHeight={object.height}

      id={object.id}

      x={object.x}

      y={object.y}

      rotation={

        object.rotation

      }

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

            x: event.target.x(),

            y: event.target.y(),

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

            x: node.x(),

            y: node.y(),

            width: Math.max(

              40,

              object.width *

                scaleX

            ),

            height: Math.max(

              30,

              object.height *

                scaleY

            ),

          }

        );

        node.scaleX(1);

        node.scaleY(1);

      }}

    >

      <Rect

        width={

          object.width

        }

        height={

          object.height

        }

        fill="transparent"

        stroke="#999"

        dash={[4, 4]}

      />

      <Text

        x={4}

        y={4}

        width={

          object.width - 8

        }

        height={

          object.height - 8

        }

        text={

          displayText

        }

        fontFamily={

          object.fontFamily

        }

        fontSize={

          displayFontSize

        }

        fill={

          object.color

        }

        fontStyle={

          object.bold &&

          object.italic

            ? "bold italic"

            : object.bold

            ? "bold"

            : object.italic

            ? "italic"

            : "normal"

        }

        textDecoration={

          object.underline

            ? "underline"

            : ""

        }

        align={object.textAlign}

        verticalAlign="top"

        wrap={
  object.textMode === "wrap"
    ? "word"
    : "none"
}

        ellipsis={false}

listening={false}

      />

    </Group>

  );

}