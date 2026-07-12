import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Trash2,
  Ruler,
  CircleDot,
} from "lucide-react";

export default function ProjectCard({

  project,

  onDelete,

}) {

  const navigate =
    useNavigate();

  const statusColor =

    project.status === "active"

      ? "#4F7A63"

      : "#A17C46";

  return (

    <motion.div

      whileHover={{
        y:-6,
      }}

      transition={{
        duration:.25,
      }}

      className="group overflow-hidden rounded-[28px]"

      style={{

        background:"var(--surface)",

        border:"1px solid var(--border)",

        boxShadow:"var(--shadow-sm)",

      }}

    >

      {/* Decorative Top */}

      <div

        className="h-2"

        style={{

          background:
            "linear-gradient(90deg,var(--primary),rgba(198,185,167,.55))",

        }}

      />

      <div className="p-7">

        {/* Header */}

        <div className="flex items-start justify-between">

          <div>

            <h2

              className="text-xl font-bold"

              style={{
                color:"var(--heading)",
              }}

            >

              {project.name}

            </h2>

            <p

              className="mt-2 flex items-center gap-2 text-sm capitalize"

              style={{
                color:statusColor,
              }}

            >

              <CircleDot size={12}/>

              {project.status}

            </p>

          </div>

        </div>

        {/* Description */}

        <p

          className="mt-6 line-clamp-2 text-sm leading-7"

          style={{
            color:"var(--muted)",
          }}

        >

          {

            project.description ||

            "No description provided."

          }

        </p>

        {/* Card Size */}

        <div

          className="mt-7 flex items-center gap-3 rounded-2xl px-4 py-4"

          style={{

            background:"rgba(198,185,167,.12)",

          }}

        >

          <Ruler

            size={18}

            color="var(--primary)"

          />

          <span

            style={{
              color:"var(--heading)",
            }}

          >

            {project.card.width}

            ×

            {project.card.height}

            {" "}

            {project.card.unit}

          </span>

        </div>

        {/* Buttons */}

        <div className="mt-8 flex gap-3">

          <button

            onClick={()=>

              navigate(

                `/projects/${project._id}`

              )

            }

            className="flex flex-1 items-center justify-center gap-2 rounded-2xl py-3 font-medium text-white transition-all duration-300 hover:-translate-y-0.5"

            style={{

              background:"var(--primary)",

            }}

          >

            Open

            <ArrowRight size={18}/>

          </button>

          <button

            onClick={()=>

              onDelete(

                project._id

              )

            }

            className="flex items-center justify-center rounded-2xl px-5 transition-all duration-300 hover:-translate-y-0.5"

            style={{

              border:"1px solid var(--border)",

              color:"#B54B4B",

            }}

          >

            <Trash2 size={18}/>

          </button>

        </div>

      </div>

    </motion.div>

  );

}