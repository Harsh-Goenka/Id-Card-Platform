import { useEditor } from "../../context/EditorContext";

export default function BottomStatusBar() {

  const {

    objects,

    scale,

  } = useEditor();

  return (

    <footer className="h-8 bg-gray-900 text-white flex items-center justify-between px-4 text-sm">

      <span>

        Objects:

        {" "}

        {objects.length}

      </span>

      <span>

        Zoom:

        {" "}

        {Math.round(scale * 100)}%

      </span>

    </footer>

  );

}