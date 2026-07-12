import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FolderPlus,
  Ruler,
  X,
} from "lucide-react";

export default function CreateProjectModal({

  open,

  onClose,

  onCreate,

}) {

  const [form, setForm] = useState({

    name: "",

    description: "",

    card: {

      width: 54,

      height: 86,

      dpi: 300,

      unit: "mm",

    },

  });

  if (!open) return null;

  const handleChange = (e) => {

    const { name, value } = e.target;

    if (

      ["width", "height", "dpi"].includes(name)

    ) {

      setForm({

        ...form,

        card: {

          ...form.card,

          [name]: Number(value),

        },

      });

    }

    else if (name === "unit") {

      setForm({

        ...form,

        card: {

          ...form.card,

          unit: value,

        },

      });

    }

    else {

      setForm({

        ...form,

        [name]: value,

      });

    }

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    onCreate(form);

  };
  const canCreate =
  form.name.trim().length > 0;

  return (

    <AnimatePresence>

      <motion.div

        initial={{
          opacity:0,
        }}

        animate={{
          opacity:1,
        }}

        exit={{
          opacity:0,
        }}

        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-6 backdrop-blur-sm"

      >

        <motion.div

          initial={{
            opacity:0,
            scale:.95,
            y:20,
          }}

          animate={{
            opacity:1,
            scale:1,
            y:0,
          }}

          exit={{
            opacity:0,
            scale:.95,
            y:20,
          }}

          transition={{
            duration:.25,
          }}

          className="relative w-full max-w-2xl overflow-hidden rounded-[32px]"

          style={{

            background:"var(--surface)",

            border:"1px solid var(--border)",

            boxShadow:"var(--shadow-lg)",

          }}

        >

          {/* Decoration */}

          <div

            className="absolute -right-20 -top-20 h-64 w-64 rounded-full blur-3xl"

            style={{
              background:"rgba(198,185,167,.18)",
            }}

          />

          <div className="relative p-10">

            {/* Header */}

            <div className="mb-10 flex items-start justify-between">

              <div className="flex items-center gap-5">

                <div

                  className="flex h-16 w-16 items-center justify-center rounded-3xl"

                  style={{

                    background:"rgba(89,99,87,.10)",

                  }}

                >

                  <FolderPlus

                    size={34}

                    color="var(--primary)"

                  />

                </div>

                <div>

                  <h2

                    className="text-3xl font-bold"

                    style={{
                      color:"var(--heading)",
                    }}

                  >

                    Create Project

                  </h2>

                  <p

                    className="mt-2"

                    style={{
                      color:"var(--muted)",
                    }}

                  >

                    Start a new ID card generation project.

                  </p>

                </div>

              </div>

              <button

                type="button"

                onClick={onClose}

                className="rounded-xl p-2 transition hover:bg-black/5"

              >

                <X size={20}/>

              </button>

            </div>

            <form

              onSubmit={handleSubmit}

              className="space-y-7"

            >

              {/* Name */}

              <div>

                <label

                  className="mb-2 block text-sm font-medium"

                  style={{
                    color:"var(--heading)",
                  }}

                >

                  Project Name

                </label>

                <input

                  name="name"

                  value={form.name}

                  onChange={handleChange}

                  required

                  placeholder="College ID Cards"

                  className="w-full rounded-2xl px-5 py-4 outline-none"

                  style={{

                    border:"1px solid var(--border)",

                    background:"white",

                  }}

                />

              </div>

              {/* Description */}

              <div>

                <label

                  className="mb-2 block text-sm font-medium"

                  style={{
                    color:"var(--heading)",
                  }}

                >

                  Description

                </label>

                <textarea

                  name="description"

                  value={form.description}

                  onChange={handleChange}

                  rows={4}

                  placeholder="Optional project description..."

                  className="w-full resize-none rounded-2xl px-5 py-4 outline-none"

                  style={{

                    border:"1px solid var(--border)",

                    background:"white",

                  }}

                />

              </div>

              {/* Card Settings */}

              <div

                className="rounded-2xl p-6"

                style={{

                  background:"rgba(198,185,167,.10)",

                }}

              >

                <div className="mb-5 flex items-center gap-3">

                  <Ruler

                    size={20}

                    color="var(--primary)"

                  />

                  <h3

                    className="font-semibold"

                    style={{
                      color:"var(--heading)",
                    }}

                  >

                    Card Settings

                  </h3>

                </div>

                <div className="grid grid-cols-2 gap-5">

                  <div>

                    <label className="mb-2 block text-sm">

                      Width

                    </label>

                    <input

                      type="number"

                      name="width"

                      value={form.card.width}

                      onChange={handleChange}

                      className="w-full rounded-xl border px-4 py-3"

                    />

                  </div>

                  <div>

                    <label className="mb-2 block text-sm">

                      Height

                    </label>

                    <input

                      type="number"

                      name="height"

                      value={form.card.height}

                      onChange={handleChange}

                      className="w-full rounded-xl border px-4 py-3"

                    />

                  </div>

                  <div>

                    <label className="mb-2 block text-sm">

                      Resolution (DPI)

                    </label>

                    <input

                      type="number"

                      name="dpi"

                      value={form.card.dpi}

                      onChange={handleChange}

                      className="w-full rounded-xl border px-4 py-3"

                    />

                  </div>

                  <div>

                    <label className="mb-2 block text-sm">

                      Unit

                    </label>

                    <select

                      name="unit"

                      value={form.card.unit}

                      onChange={handleChange}

                      className="w-full rounded-xl border px-4 py-3"

                    >

                      <option value="mm">

                        Millimetres (mm)

                      </option>

                      <option value="inch">

                        Inches

                      </option>

                    </select>

                  </div>

                </div>

              </div>

              {/* Buttons */}

              <div className="flex justify-end gap-4 pt-2">

                <button

                  type="button"

                  onClick={onClose}

                  className="rounded-2xl px-7 py-3"

                  style={{

                    border:"1px solid var(--border)",

                  }}

                >

                  Cancel

                </button>

                <button

  type="submit"

  disabled={!canCreate}

  className="rounded-2xl px-8 py-3 text-white transition-all duration-300 disabled:cursor-not-allowed"

  style={{

    background: canCreate
      ? "var(--primary)"
      : "#B9B9B9",

    boxShadow: canCreate
      ? "var(--shadow-md)"
      : "none",

    opacity: canCreate
      ? 1
      : .7,

  }}

>

  Create Project

</button>

              </div>

            </form>

          </div>

        </motion.div>

      </motion.div>

    </AnimatePresence>

  );

}