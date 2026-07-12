import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { saveLayout } from "../services/project.service";

const EditorContext = createContext();

export const EditorProvider = ({ children }) => {
  const [project, setProject] = useState(null);
  const [selectedObjectId, setSelectedObjectId] = useState(null);
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [clipboardObject, setClipboardObject] = useState(null);
  const timer = useRef(null);
  const objects = project?.layout?.objects ?? [];

  const updateProject = (callback) => {
    setProject((previous) => {
      if (!previous) return previous;
      return callback(previous);
    });
  };

  const addObject = (object) => {
    updateProject((previous) => ({
      ...previous,
      layout: {
        ...previous.layout,
        objects: [
          ...previous.layout.objects,
          object,
        ],
      },
    }));
    setDirty(true);
    setSelectedObjectId(object.id);
  };

  const updateObject = (id, updates) => {
    updateProject((previous) => ({
      ...previous,
      layout: {
        ...previous.layout,
        objects: previous.layout.objects.map((object) =>
          object.id === id
            ? {
                ...object,
                ...updates,
              }
            : object
        ),
      },
    }));
    setDirty(true);
  };

  const deleteSelectedObject = () => {
    if (!selectedObjectId) return;
    updateProject((previous) => ({
      ...previous,
      layout: {
        ...previous.layout,
        objects: previous.layout.objects.filter((object) =>
          object.id !== selectedObjectId
        ),
      },
    }));
    setDirty(true);
    setSelectedObjectId(null);
  };

  const clearSelection = () => {
    setSelectedObjectId(null);
  };

  const copySelectedObject = () => {
    if (!selectedObjectId) {
      return;
    }
    const object = objects.find(object => object.id === selectedObjectId);
    if (!object) {
      return;
    }
    setClipboardObject(structuredClone(object));
  };

  const pasteClipboard = () => {
    if (!clipboardObject) {
      return;
    }
    const object = structuredClone(clipboardObject);
    object.id = crypto.randomUUID();
    object.x += 15;
    object.y += 15;
    addObject(object);
  };

  const duplicateSelectedObject = () => {
    
  if (!selectedObjectId) {
    return;
  }
  const selected = objects.find(object => object.id === selectedObjectId);
  if (!selected) {
    return;
  }
  const object = structuredClone(selected);
  object.id = crypto.randomUUID();
  object.x = (object.x ?? 0) + 15;
  object.y = (object.y ?? 0) + 15;
  addObject(object);
};

  const saveProject = async () => {
    if (!project || saving || !dirty) return;
    try {
      setSaving(true);
      await saveLayout(project._id, project.layout.objects);
      setDirty(false);
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    if (!dirty || !project) return;
    clearTimeout(timer.current);
    timer.current = setTimeout(saveProject, 2000);
    return () => clearTimeout(timer.current);
  }, [dirty, project]);

  return (
    <EditorContext.Provider
      value={{
        project,
        setProject,
        objects,
        addObject,
        updateObject,
        selectedObjectId,
        setSelectedObjectId,
        deleteSelectedObject,
        clearSelection,
        saveProject,
        copySelectedObject,
        pasteClipboard,
        duplicateSelectedObject,
        dirty,
        saving,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};

export const useEditor = () => useContext(EditorContext);