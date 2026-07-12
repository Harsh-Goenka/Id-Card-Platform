import { useEditor } from "../../context/EditorContext";

export default function RightSidebar() {
  const { project, objects, selectedObjectId, updateObject } = useEditor();
  const object = objects.find((o) => o.id === selectedObjectId);

  if (!object) {
    return (
      <aside
        className="w-80"
        style={{
          background: "var(--surface)",
          borderLeft: "1px solid var(--border)",
        }}
      >
        <div className="flex h-full items-center justify-center p-8">
          <div className="text-center">
            <h2
              className="text-xl font-semibold"
              style={{
                color: "var(--heading)",
              }}
            >
              No Selection
            </h2>
            <p
              className="mt-3"
              style={{
                color: "var(--muted)",
              }}
            >
              Select an object on the canvas to edit its properties.
            </p>
          </div>
        </div>
      </aside>
    );
  }

  const excelHeaders = project?.excel?.headers || [];

  const updateNumber = (field, value) => {
    updateObject(object.id, { [field]: Number(value) });
  };

  const updateString = (field, value) => {
    updateObject(object.id, { [field]: value });
  };

  const updateBoolean = (field) => {
    updateObject(object.id, { [field]: !object[field] });
  };

  const renderBinding = () => {
    if (object.type === "text") {
      return (
        <div>
          <label className="block mb-1 font-medium">Excel Binding</label>
          <select
            value={object.binding || ""}
            onChange={(e) => updateString("binding", e.target.value)}
            className="w-full rounded-xl px-4 py-3 transition-all duration-200 focus:outline-none focus:ring-2"
            style={{
              border: "1px solid var(--border)",
              background: "white",
              color: "var(--heading)",
              "--tw-ring-color": "var(--primary)",
            }}
          >
            <option value="">None</option>
            {excelHeaders.map((header) => (
              <option key={header} value={header}>
                {header}
              </option>
            ))}
          </select>
        </div>
      );
    }
    if (object.type === "image") {
      return (
        <div>
          <label className="block mb-1 font-medium">Image Binding</label>
          <select
            value={object.binding || ""}
            onChange={(e) => updateString("binding", e.target.value)}
            className="w-full rounded-xl px-4 py-3 transition-all duration-200 focus:outline-none focus:ring-2"
            style={{
              border: "1px solid var(--border)",
              background: "white",
              color: "var(--heading)",
              "--tw-ring-color": "var(--primary)",
            }}
          >
            <option value="">None</option>
            {excelHeaders.map((header) => (
              <option key={header} value={header}>
                {header}
              </option>
            ))}
          </select>
        </div>
      );
    }
    return null;
  };

  return (
    <aside
      className="w-80 overflow-y-auto"
      style={{
        background: "var(--surface)",
        borderLeft: "1px solid var(--border)",
      }}
    >
      <div
        className="sticky top-0 z-10 px-6 py-5"
        style={{
          background: "var(--surface)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <h2
          className="text-lg font-semibold"
          style={{
            color: "var(--heading)",
          }}
        >
          Properties
        </h2>
        <p
          className="mt-1 text-sm"
          style={{
            color: "var(--muted)",
          }}
        >
          Edit the selected object.
        </p>
      </div>

      <div className="space-y-6 p-6">
        <div
          className="rounded-2xl p-5"
          style={{
            background: "rgba(198,185,167,.08)",
            border: "1px solid var(--border)",
          }}
        >
          <h3
            className="mb-4 text-sm font-semibold uppercase tracking-wide"
            style={{
              color: "var(--muted)",
            }}
          >
            Position
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-sm">
                X
              </label>
              <input
                type="number"
                value={object.x}
                onChange={(e) =>
                  updateNumber("x", e.target.value)
                }
                className="w-full rounded-xl px-4 py-3"
                style={{
                  border: "1px solid var(--border)",
                  background: "white",
                }}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm">
                Y
              </label>
              <input
                type="number"
                value={object.y}
                onChange={(e) =>
                  updateNumber("y", e.target.value)
                }
                className="w-full rounded-xl px-4 py-3"
                style={{
                  border: "1px solid var(--border)",
                  background: "white",
                }}
              />
            </div>
          </div>
        </div>

        <div
          className="rounded-2xl p-5"
          style={{
            background: "rgba(198,185,167,.08)",
            border: "1px solid var(--border)",
          }}
        >
          <h3
            className="mb-4 text-sm font-semibold uppercase tracking-wide"
            style={{
              color: "var(--muted)",
            }}
          >
            Dimensions
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-sm">
                Width
              </label>
              <input
                type="number"
                value={object.width}
                onChange={(e) =>
                  updateNumber("width", e.target.value)
                }
                className="w-full rounded-xl px-4 py-3"
                style={{
                  border: "1px solid var(--border)",
                  background: "white",
                }}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm">
                Height
              </label>
              <input
                type="number"
                value={object.height}
                onChange={(e) =>
                  updateNumber("height", e.target.value)
                }
                className="w-full rounded-xl px-4 py-3"
                style={{
                  border: "1px solid var(--border)",
                  background: "white",
                }}
              />
            </div>
          </div>
        </div>

        <div
          className="rounded-2xl p-5"
          style={{
            background: "rgba(198,185,167,.08)",
            border: "1px solid var(--border)",
          }}
        >
          <h3
            className="mb-4 text-sm font-semibold uppercase tracking-wide"
            style={{
              color: "var(--muted)",
            }}
          >
            Transform
          </h3>
          <div>
            <label className="mb-1 block text-sm">
              Rotation (°)
            </label>
            <input
              type="number"
              value={object.rotation}
              onChange={(e) =>
                updateNumber("rotation", e.target.value)
              }
              className="w-full rounded-xl px-4 py-3 transition-all duration-200 focus:outline-none"
              style={{
                border: "1px solid var(--border)",
                background: "white",
              }}
            />
          </div>
        </div>

        <div
          className="my-2 h-px"
          style={{
            background: "var(--border)",
          }}
        />

        <div
          className="rounded-2xl p-5"
          style={{
            background: "rgba(198,185,167,.08)",
            border: "1px solid var(--border)",
          }}
        >
          <h3
            className="mb-4 text-sm font-semibold uppercase tracking-wide"
            style={{
              color: "var(--muted)",
            }}
          >
            Content
          </h3>
          <div className="space-y-4">
            {renderBinding()}
            {object.type === "text" && (
              <div>
                <label className="block mb-1">Static Text</label>
                <input
                  type="text"
                  value={object.staticText || ""}
                  onChange={(e) => updateString("staticText", e.target.value)}
                  className="w-full rounded-xl px-4 py-3 transition-all duration-200 focus:outline-none focus:ring-2"
                  style={{
                    border: "1px solid var(--border)",
                    background: "white",
                    color: "var(--heading)",
                    "--tw-ring-color": "var(--primary)",
                  }}
                />
              </div>
            )}
          </div>
        </div>

        {object.type === "text" && (
          <div
            className="rounded-2xl p-5"
            style={{
              background: "rgba(198,185,167,.08)",
              border: "1px solid var(--border)",
            }}
          >
            <h3
              className="mb-5 text-sm font-semibold uppercase tracking-wide"
              style={{
                color: "var(--muted)",
              }}
            >
              Typography
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block mb-1">Font Size</label>
                <input
                  type="number"
                  value={object.fontSize}
                  onChange={(e) => updateNumber("fontSize", e.target.value)}
                  className="w-full rounded-xl px-4 py-3 transition-all duration-200 focus:outline-none focus:ring-2"
                  style={{
                    border: "1px solid var(--border)",
                    background: "white",
                    color: "var(--heading)",
                    "--tw-ring-color": "var(--primary)",
                  }}
                />
              </div>
              <div>
                <label className="block mb-1">Font Family</label>
                <input
                  type="text"
                  value={object.fontFamily}
                  onChange={(e) => updateString("fontFamily", e.target.value)}
                  className="w-full rounded-xl px-4 py-3 transition-all duration-200 focus:outline-none focus:ring-2"
                  style={{
                    border: "1px solid var(--border)",
                    background: "white",
                    color: "var(--heading)",
                    "--tw-ring-color": "var(--primary)",
                  }}
                />
              </div>
              <div>
                <label className="block mb-1">Text Color</label>
                <input
                  type="color"
                  value={object.color}
                  onChange={(e) => updateString("color", e.target.value)}
                  className="h-12 w-full cursor-pointer rounded-xl"
                  style={{
                    border: "1px solid var(--border)",
                  }}
                />
              </div>
              <div>
                <label className="block mb-2">
                  Text Alignment
                </label>
                <div>
                  <label
                    className="mb-3 block text-sm font-semibold uppercase tracking-wide"
                    style={{
                      color: "var(--muted)",
                    }}
                  >
                    Alignment
                  </label>
                  <div
                    className="grid grid-cols-3 gap-2 rounded-2xl p-1"
                    style={{
                      background: "rgba(198,185,167,.12)",
                    }}
                  >
                    {["left", "center", "right"].map((align) => (
                      <button
                        key={align}
                        type="button"
                        onClick={() =>
                          updateString(
                            "textAlign",
                            align
                          )
                        }
                        className="rounded-xl py-2 text-sm font-medium transition-all duration-200"
                        style={
                          object.textAlign === align
                            ? {
                                background: "var(--primary)",
                                color: "white",
                                boxShadow: "var(--shadow-sm)",
                              }
                            : {
                                color: "var(--heading)",
                              }
                        }
                      >
                        {align.charAt(0).toUpperCase() + align.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label
                    className="mb-3 mt-3 block text-sm font-semibold uppercase tracking-wide"
                    style={{
                      color: "var(--muted)",
                    }}
                  >
                    Text Mode
                  </label>
                  <div
                    className="grid grid-cols-3 gap-2 rounded-2xl p-1"
                    style={{
                      background: "rgba(198,185,167,.12)",
                    }}
                  >
                    {["normal", "fit", "wrap"].map((mode) => (
                      <button
                        key={mode}
                        type="button"
                        onClick={() =>
                          updateString(
                            "textMode",
                            mode
                          )
                        }
                        className="rounded-xl py-2 text-sm font-medium transition-all duration-200"
                        style={
                          object.textMode === mode
                            ? {
                                background: "var(--primary)",
                                color: "white",
                              }
                            : {
                                color: "var(--heading)",
                              }
                        }
                      >
                        {mode.charAt(0).toUpperCase() + mode.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div
                className="grid grid-cols-3 gap-2 rounded-2xl p-1"
                style={{
                  background: "rgba(198,185,167,.12)",
                }}
              >
                {[
                  {
                    key: "bold",
                    label: "B",
                  },
                  {
                    key: "italic",
                    label: "I",
                  },
                  {
                    key: "underline",
                    label: "U",
                  },
                ].map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() =>
                      updateBoolean(
                        item.key
                      )
                    }
                    className="rounded-xl py-2 text-lg font-semibold transition-all duration-200"
                    style={
                      object[item.key]
                        ? {
                            background: "var(--primary)",
                            color: "white",
                          }
                        : {
                            color: "var(--heading)",
                          }
                    }
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {object.type === "image" && (
          <div
            className="rounded-2xl p-5"
            style={{
              background: "rgba(198,185,167,.08)",
              border: "1px solid var(--border)",
            }}
          >
            <h3
              className="mb-4 text-sm font-semibold uppercase tracking-wide"
              style={{
                color: "var(--muted)",
              }}
            >
              Fit Mode
            </h3>
            <select
              value={object.fitMode}
              onChange={(e) => updateString("fitMode", e.target.value)}
              className="w-full rounded-xl px-4 py-3 transition-all duration-200 focus:outline-none focus:ring-2"
              style={{
                border: "1px solid var(--border)",
                background: "white",
                color: "var(--heading)",
                "--tw-ring-color": "var(--primary)",
              }}
            >
              <option value="cover">Cover</option>
              <option value="contain">Contain</option>
              <option value="stretch">Stretch</option>
            </select>
          </div>
        )}

        {object.type === "text" && object.binding && (
          <div
            className="rounded-2xl p-5"
            style={{
              background: "rgba(89,99,87,.08)",
              border: "1px solid rgba(89,99,87,.18)",
              color: "var(--heading)",
            }}
          >
            Preview
            <div className="mt-2 font-semibold">
              {"{"}
              {object.binding}
              {"}"}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}