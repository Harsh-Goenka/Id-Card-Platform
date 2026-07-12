import { useEditor } from "../../context/EditorContext";
import { generateProject } from "../../services/generation.service";
import { useState } from "react";
import {
  Save,
  Sparkles,
  CheckCircle2,
  Circle,
} from "lucide-react";

export default function EditorHeader({ onGenerationChange }) {
  const {
    project,
    saveProject,
    dirty,
    saving,
    objects, // Context arrays track properties
  } = useEditor();

  const [localGenerating, setLocalGenerating] = useState(false);

  async function handleGenerate() {
    try {
      // Initialize freeze view state with default values
      setLocalGenerating(true);
      onGenerationChange({
        isGenerating: true,
        completed: 0,
        total: project?.excel?.rowCount || 100 // Safe default fallback metrics boundary
      });

      // Trigger the backend engine generation workflow
      const response = await generateProject(project._id);

      // Handle file download if the service doesn't trigger it globally automatically
      if (response && response.data) {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${project.name.toLowerCase().replace(/\s+/g, '-')}-id-cards.zip`);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      }

      // Generation successful: simulate filling progress to completion safely before closure
      onGenerationChange(prev => ({ ...prev, completed: prev.total }));

    } catch (error) {
      console.error(error);
      alert("Generation failed.");
    } finally {
      // Unfreeze interaction windows safely
      setLocalGenerating(false);
      onGenerationChange({
        isGenerating: false,
        completed: 0,
        total: 0
      });
    }
  }

  return (
    <header
      className="border-b px-8 py-3"
      style={{
        background: "var(--surface)",
        borderColor: "var(--border)",
      }}
    >
      <div className="flex items-center justify-between">
        {/* LEFT */}
        <div>
          <div className="flex items-center gap-3">
            <h1 
              className="text-3xl font-black tracking-tight bg-gradient-to-r from-[var(--heading)] to-[var(--primary)] bg-clip-text text-transparent"
            >
              {project.name}
            </h1>
            <span
              className="rounded-full px-3 py-1 text-xs font-medium"
              style={{
                background: "rgba(198,185,167,.15)",
                color: "var(--primary)",
              }}
            >
              Editor
            </span>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-5">
          {/* Save Status */}
          <div
            className="flex items-center gap-2 rounded-full px-4 py-2"
            style={{
              background: "rgba(198,185,167,.10)",
            }}
          >
            {saving ? (
              <Circle size={12} color="#C08B2C" fill="#C08B2C" />
            ) : dirty ? (
              <Circle size={12} color="#C08B2C" fill="#C08B2C" />
            ) : (
              <CheckCircle2 size={16} color="#4F7A63" />
            )}
            <span
              className="text-sm"
              style={{
                color: "var(--heading)",
              }}
            >
              {saving ? "Saving..." : dirty ? "Unsaved" : "Saved"}
            </span>
          </div>

          {/* Save */}
          <button
            onClick={saveProject}
            disabled={saving || !dirty || localGenerating}
            className="flex items-center gap-2 rounded-2xl px-5 py-3 transition disabled:cursor-not-allowed disabled:opacity-40"
            style={{
              border: "1px solid var(--border)",
              background: "white",
              color: "var(--heading)",
            }}
          >
            <Save size={18} />
            Save
          </button>

          {/* Generate */}
          <button
            onClick={handleGenerate}
            disabled={localGenerating}
            className="flex items-center gap-2 rounded-2xl px-6 py-3 text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background: "var(--primary)",
              boxShadow: "var(--shadow-md)",
            }}
          >
            <Sparkles size={18} />
            Generate
          </button>
        </div>
      </div>
    </header>
  );
}