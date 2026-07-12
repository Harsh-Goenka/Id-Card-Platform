import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "react-router-dom";

import {
  getProject,
} from "../services/project.service";

import {
  EditorProvider,
  useEditor,
} from "../context/EditorContext";

import EditorHeader from "../components/editor/EditorHeader";
import LeftSidebar from "../components/editor/LeftSidebar";
import CanvasArea from "../components/editor/CanvasArea";
import RightSidebar from "../components/editor/RightSidebar";
import BottomStatusBar from "../components/editor/BottomStatusBar";
import { Loader2 } from "lucide-react";

function EditorContent() {
  const { projectId } = useParams();
  const {
    project,
    setProject,
    objects,
    selectedObjectId,
    updateObject,
    deleteSelectedObject,
  } = useEditor();

  const [loading, setLoading] = useState(true);
  
  // Progress tracking state for the global overlay freeze screen
  const [generationStatus, setGenerationStatus] = useState({
    isGenerating: false,
    completed: 0,
    total: 0
  });

  useEffect(() => {
    const fetchProject =
      async () => {
        try {
          const response =
            await getProject(
              projectId
            );
          setProject(
            response.data
          );
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };
    fetchProject();
  }, [projectId, setProject]);

  useEffect(() => {
    const handleKeyDown =
      (event) => {
        // Disable keyboard manipulation loops if an export generation job is executing
        if (generationStatus.isGenerating) return;

        if (!selectedObjectId) {
          return;
        }

        if (
          event.key ===
          "Delete"
        ) {
          deleteSelectedObject();
          return;
        }

        const object =
          objects.find(
            (o) =>
              o.id ===
              selectedObjectId
          );

        if (!object)
          return;

        const step =
          event.shiftKey
            ? 10
            : 1;

        switch (
          event.key
        ) {
          case "ArrowLeft":
            updateObject(
              object.id,
              {
                x:
                  object.x -
                  step,
              }
            );
            break;
          case "ArrowRight":
            updateObject(
              object.id,
              {
                x:
                  object.x +
                  step,
              }
            );
            break;
          case "ArrowUp":
            updateObject(
              object.id,
              {
                y:
                  object.y -
                  step,
              }
            );
            break;
          case "ArrowDown":
            updateObject(
              object.id,
              {
                y:
                  object.y +
                  step,
              }
            );
            break;
          default:
            return;
        }
      };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () =>
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
  }, [
    objects,
    selectedObjectId,
    updateObject,
    deleteSelectedObject,
    generationStatus.isGenerating
  ]);

  if (loading) {
    return (
      <div
        className="flex h-screen items-center justify-center"
        style={{
          background: "var(--background)",
          color: "var(--heading)",
        }}
      >
        <div className="text-lg font-medium">
          Loading Project...
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div
        className="flex h-screen items-center justify-center"
        style={{
          background: "var(--background)",
          color: "var(--heading)",
        }}
      >
        <div className="text-lg font-medium">
          Unable to load project.
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex h-screen flex-col relative overflow-hidden"
      style={{
        background: "var(--background)",
      }}
    >
      {/* Dynamic Background Blur Wrap Layer when generating */}
      <div className={`flex flex-col h-full flex-1 transition-all duration-300 ${generationStatus.isGenerating ? "blur-md pointer-events-none select-none" : ""}`}>
        <EditorHeader onGenerationChange={setGenerationStatus} />
        <div
          className="flex flex-1 overflow-hidden"
          style={{
            gap: "1px",
          }}
        >
          <LeftSidebar />
          <CanvasArea />
          <RightSidebar />
        </div>
        <BottomStatusBar />
      </div>

      {/* FULL FREEZE BLUR DIALOG LOADING SCREEN OVERLAY */}
      {generationStatus.isGenerating && (
        <div 
          className="absolute inset-0 z-50 flex flex-col items-center justify-center transition-all duration-200"
          style={{
            background: "rgba(236, 232, 226, 0.7)", // Matching your #ECE8E2 canvas background layout with alpha opacity
          }}
        >
          <div 
            className="flex flex-col items-center p-8 rounded-2xl max-w-sm w-full text-center"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              boxShadow: "var(--shadow-lg)",
            }}
          >
            <Loader2 className="animate-spin mb-4" size={40} color="var(--primary)" />
            
            <h3 
              className="text-xl font-bold tracking-tight mb-2"
              style={{ color: "var(--heading)" }}
            >
              Generating ID Cards
            </h3>
            
            <p 
              className="text-sm mb-4"
              style={{ color: "var(--muted)" }}
            >
              Please hold tight. Your print assets are compiling onto sheets.
            </p>

            {/* PROGRESS COUNTER CONTAINER CARD */}
            <div 
              className="rounded-xl px-6 py-3 w-full font-mono text-sm font-semibold flex items-center justify-center gap-2"
              style={{
                background: "rgba(198, 185, 167, 0.12)",
                color: "var(--primary)",
                border: "1px solid var(--border)"
              }}
            >
              <span>Processing:</span>
              <span className="text-base tracking-wider font-black">
                {generationStatus.completed > 0 
                  ? `${generationStatus.completed} / ${generationStatus.total}`
                  : "Initializing Engine..."
                }
              </span>
            </div>
            
            {/* Visual Mini Progress Bar indicator layout track */}
            {generationStatus.completed > 0 && (
              <div className="w-full bg-gray-200 h-1.5 rounded-full mt-4 overflow-hidden">
                <div 
                  className="h-full transition-all duration-300"
                  style={{
                    background: "var(--primary)",
                    width: `${Math.round((generationStatus.completed / generationStatus.total) * 100)}%`
                  }}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function ProjectEditorPage() {
  return (
    <EditorProvider>
      <EditorContent />
    </EditorProvider>
  );
}