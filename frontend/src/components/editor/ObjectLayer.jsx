import TextObject from "./TextObject";
import ImageObject from "./ImageObject";

import { useEditor } from "../../context/EditorContext";

export default function ObjectLayer() {

  const { objects } =
    useEditor();

  return (

    <>

      {objects.map((object) => {

        switch (object.type) {

          case "text":

            return (

              <TextObject

                key={object.id}

                object={object}

              />

            );

          case "image":

            return (

              <ImageObject

                key={object.id}

                object={object}

              />

            );

          default:

            return null;

        }

      })}

    </>

  );

}