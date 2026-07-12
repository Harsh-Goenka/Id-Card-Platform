import { motion } from "framer-motion";
import { Plus, FolderPlus } from "lucide-react";

export default function CreateProjectCard({

  onClick,

}) {

  return (

    <motion.div

      initial={{
        opacity:0,
        y:20,
      }}

      animate={{
        opacity:1,
        y:0,
      }}

      transition={{
        duration:.5,
      }}

      whileHover={{
        y:-4,
      }}

      className="mb-12"

    >

      <button

        onClick={onClick}

        className="group relative w-full overflow-hidden rounded-[30px] p-8 text-left transition-all duration-300"

        style={{

          background:"var(--surface)",

          border:"1px solid var(--border)",

          boxShadow:"var(--shadow-md)",

        }}

      >

        {/* Background Decoration */}

        <div

          className="absolute -right-10 -top-10 h-40 w-40 rounded-full blur-3xl"

          style={{
            background:"rgba(198,185,167,.18)",
          }}

        />

        <div className="relative flex items-center justify-between">

          {/* LEFT */}

          <div className="flex items-center gap-6">

            <div

              className="flex h-[72px] w-[72px] items-center justify-center rounded-3xl"

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

                className="text-2xl font-bold"

                style={{
                  color:"var(--heading)",
                }}

              >

                Create New Project

              </h2>

              <p

                className="mt-2"

                style={{
                  color:"var(--muted)",
                }}

              >

                Start a new ID card generation project
                with your own template, spreadsheet
                and photos.

              </p>

            </div>

          </div>

          {/* RIGHT */}

          <motion.div

            whileHover={{
              rotate:90,
            }}

            transition={{
              duration:.3,
            }}

            className="hidden lg:flex"

          >

            <div

              className="flex h-16 w-16 items-center justify-center rounded-full"

              style={{
                background:"var(--primary)",
                color:"white",
              }}

            >

              <Plus size={30}/>

            </div>

          </motion.div>

        </div>

      </button>

    </motion.div>

  );

}